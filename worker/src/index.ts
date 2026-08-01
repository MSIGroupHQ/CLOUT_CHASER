import { WorkflowEntrypoint } from "cloudflare:workers";
import type { WorkflowEvent, WorkflowStep } from "cloudflare:workers";
import { NonRetryableError } from "cloudflare:workflows";
import { DELIVERY_TOKEN_TTL_MS, MAX_JSON_BYTES, MAX_MULTIPART_BYTES, MAX_SOURCE_FILE_BYTES } from "./lib/policies";
import type { WhopStubQueueMessage } from "./lib/queues";
import { r2Keys } from "./lib/r2";
import { MANUAL_PACKAGE_SCHEMA, PUBLIC_RECEIPT_SCHEMA } from "./lib/receipt";
import { assertPublicPayloadSafe } from "./lib/sanitize";
import { createIngestMessage } from "./lib/workflow";
import { OpportunitySession } from "./opportunity-session";
import { isInternalApproveRoute } from "./routes/internal-approve";
import { isOpportunityRoute } from "./routes/opportunity";
import { isPackageRoute } from "./routes/package";
import { isReceiptCreateRoute, receiptIdFromRoute } from "./routes/receipt";
import { opportunityHashFromShareRoute } from "./routes/share";
import { isSourceRoute } from "./routes/source";
import { isWhopWebhookRoute } from "./routes/webhook-whop";
import { isStripeWebhookRoute } from "./routes/webhook-stripe";
import { initTrident, validateTransition, validTransitions, validatePacket, classifyPacket } from "./trident";
import {
  InputValidationError,
  canonicalJson,
  createDeliveryToken,
  createDeterministicId,
  createOpportunityHash,
  deliveryTokenFromAuthorization,
  hashDeliveryToken,
  isIngestQueueMessage,
  isOpportunityHash,
  sha256ArrayBufferHex,
  sha256Hex,
  validateCloutAnalyticsEvent,
  validateCrmTrialRequest,
  validateIdempotencyKey,
  validateManualApproveInput,
  validateManualCompileInput,
  validateSourceSubmission,
  type IngestQueueMessage,
  type ManualApproveInput,
  type ManualCompileInput,
  type SourceSubmission,
} from "./core";

export { OpportunitySession };

interface ErrorEnvelope {
  error: string;
  code: string;
  request_id: string;
  issues?: string[];
}

interface IdempotencyRow {
  key_hash: string;
  scope: string;
  request_hash: string;
  subject_id: string;
  state: "IN_PROGRESS" | "COMPLETE" | "FAILED_RETRYABLE";
  status_code: number | null;
  response_json: string | null;
  created_at: string;
  updated_at: string;
}

interface OpportunityRow {
  id: string;
  opp_hash: string;
  source_id: string;
  title: string;
  niche: string;
  platform: string;
  language_mode: string;
  creator_type: string;
  status: string;
  is_demo: number;
  created_at: string;
  queued_at: string | null;
  compiled_at: string | null;
  approved_at: string | null;
}

interface PackageRow {
  id: string;
  opportunity_id: string;
  output_json: string;
  artifact_key: string;
  status: string;
  compiler_mode: string;
  created_at: string;
}

interface PublicReceiptRow {
  opp_hash: string;
  creator_type: string;
  receipt_id: string;
  receipt_hash: string;
  public_payload_json: string;
  created_at: string;
}

interface PrivatePackageRow {
  package_id: string;
  package_status: string;
  output_json: string;
  receipt_id: string;
  receipt_hash: string;
  opp_hash: string;
  grant_id: string;
  expires_at: string;
}

interface SourceFileArtifact {
  file: File;
  content_hash: string;
  size: number;
  content_type: "video/mp4";
}

interface ParsedSourceRequest {
  submission: SourceSubmission;
  sourceFile?: SourceFileArtifact;
}

interface SourceRequestRow {
  id: string;
  source_url: string | null;
  niche: string;
  platform: string;
  language_mode: string;
  creator_type: string;
  created_at: string;
}

interface WebhookReceiptRow {
  event_hash: string;
  provider_event_id: string;
  status: "RECEIVED" | "ENQUEUEING" | "ENQUEUED";
}

class HttpError extends Error {
  readonly status: number;
  readonly code: string;
  readonly issues: string[] | undefined;

  constructor(status: number, code: string, message: string, issues?: string[]) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.code = code;
    this.issues = issues;
  }
}

function nowIso(): string {
  return new Date().toISOString();
}

function log(level: "info" | "warn" | "error", event: string, data: Record<string, unknown>): void {
  console.log(JSON.stringify({ level, event, timestamp: nowIso(), ...data }));
}

function allowedOrigins(env: Env): Set<string> {
  return new Set(
    env.CLOUT_ALLOWED_ORIGINS.split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  );
}

function corsHeaders(request: Request, env: Env): Headers {
  const headers = new Headers({ Vary: "Origin" });
  const origin = request.headers.get("Origin");
  if (origin && allowedOrigins(env).has(origin)) headers.set("Access-Control-Allow-Origin", origin);
  return headers;
}

function assertOriginAllowed(request: Request, env: Env): void {
  const origin = request.headers.get("Origin");
  if (origin && !allowedOrigins(env).has(origin)) {
    throw new HttpError(403, "ORIGIN_NOT_ALLOWED", "This origin is not permitted to call the Clout Chaser API");
  }
}

function securityHeaders(headers: Headers, cacheControl = "no-store"): Headers {
  headers.set("Cache-Control", cacheControl);
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.set("Referrer-Policy", "no-referrer");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  return headers;
}

function jsonResponse(
  request: Request,
  env: Env,
  body: unknown,
  status = 200,
  cacheControl = "no-store",
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: securityHeaders(corsHeaders(request, env), cacheControl),
  });
}

function errorResponse(request: Request, env: Env, requestId: string, error: unknown): Response {
  const httpError =
    error instanceof HttpError
      ? error
      : error instanceof InputValidationError
        ? new HttpError(422, "INVALID_REQUEST", error.message, error.issues)
        : new HttpError(500, "INTERNAL_ERROR", "The request could not be completed");
  const envelope: ErrorEnvelope = {
    error: httpError.message,
    code: httpError.code,
    request_id: requestId,
    ...(httpError.issues === undefined ? {} : { issues: httpError.issues }),
  };
  return jsonResponse(request, env, envelope, httpError.status);
}

async function readJsonBody(request: Request): Promise<unknown> {
  const contentType = request.headers.get("Content-Type")?.split(";", 1)[0]?.trim().toLowerCase();
  if (contentType !== "application/json") {
    throw new HttpError(415, "UNSUPPORTED_MEDIA_TYPE", "Content-Type must be application/json");
  }
  const contentLength = request.headers.get("Content-Length");
  if (contentLength && Number(contentLength) > MAX_JSON_BYTES) {
    throw new HttpError(413, "REQUEST_TOO_LARGE", `JSON body must not exceed ${MAX_JSON_BYTES} bytes`);
  }
  if (!request.body) throw new HttpError(400, "EMPTY_BODY", "A JSON request body is required");

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > MAX_JSON_BYTES) {
      await reader.cancel();
      throw new HttpError(413, "REQUEST_TOO_LARGE", `JSON body must not exceed ${MAX_JSON_BYTES} bytes`);
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  } catch {
    throw new HttpError(400, "INVALID_JSON", "Request body must contain valid UTF-8 JSON");
  }
}

async function readJsonBodyWithRaw(request: Request): Promise<{ value: unknown; raw: string }> {
  const contentType = request.headers.get("Content-Type")?.split(";", 1)[0]?.trim().toLowerCase();
  if (contentType !== "application/json") {
    throw new HttpError(415, "UNSUPPORTED_MEDIA_TYPE", "Content-Type must be application/json");
  }
  const contentLength = request.headers.get("Content-Length");
  if (contentLength && Number(contentLength) > MAX_JSON_BYTES) {
    throw new HttpError(413, "REQUEST_TOO_LARGE", `JSON body must not exceed ${MAX_JSON_BYTES} bytes`);
  }
  if (!request.body) throw new HttpError(400, "EMPTY_BODY", "A JSON request body is required");

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > MAX_JSON_BYTES) {
      await reader.cancel();
      throw new HttpError(413, "REQUEST_TOO_LARGE", `JSON body must not exceed ${MAX_JSON_BYTES} bytes`);
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  let raw: string;
  try {
    raw = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    return { value: JSON.parse(raw), raw };
  } catch {
    throw new HttpError(400, "INVALID_JSON", "Request body must contain valid UTF-8 JSON");
  }
}

function recordValue(value: unknown): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new HttpError(422, "INVALID_REQUEST", "Request must be a JSON object");
  }
  return value as Record<string, unknown>;
}

function normalizeSourceRequestShape(value: unknown, filePresent: boolean): Record<string, unknown> {
  const input = recordValue(value);
  const languageMap: Record<string, string> = { english: "en", spanish: "es", bilingual: "bilingual" };
  const sourceType = filePresent ? "mp4" : input.sourceType ?? input.source_type;
  return {
    name_or_handle: input.name ?? input.name_or_handle,
    email: input.email,
    platform: input.platform,
    creator_type: input.creatorType ?? input.creator_type,
    niche: input.niche,
    source_url: input.sourceUrl ?? input.source_url,
    source_type: sourceType,
    language: languageMap[String(input.language ?? "")] ?? input.language,
    intent: input.intent,
  };
}

async function parseSourceRequest(request: Request): Promise<ParsedSourceRequest> {
  const contentType = request.headers.get("Content-Type")?.toLowerCase() ?? "";
  if (contentType.startsWith("application/json")) {
    const submission = validateSourceSubmission(normalizeSourceRequestShape(await readJsonBody(request), false));
    if (submission.source_type === "mp4") {
      throw new HttpError(422, "SOURCE_FILE_REQUIRED", "source_file is required when source_type is mp4");
    }
    return { submission };
  }
  if (!contentType.startsWith("multipart/form-data")) {
    throw new HttpError(415, "UNSUPPORTED_MEDIA_TYPE", "Use application/json or multipart/form-data");
  }
  const contentLength = Number(request.headers.get("Content-Length"));
  if (!Number.isFinite(contentLength) || contentLength <= 0) {
    throw new HttpError(411, "CONTENT_LENGTH_REQUIRED", "Multipart requests require Content-Length");
  }
  if (contentLength > MAX_MULTIPART_BYTES) {
    throw new HttpError(413, "REQUEST_TOO_LARGE", `Multipart body must not exceed ${MAX_MULTIPART_BYTES} bytes`);
  }
  const form = await request.formData();
  const keys = new Set(Array.from(form.keys()));
  for (const key of keys) {
    if (key !== "request" && key !== "source_file") {
      throw new HttpError(422, "UNKNOWN_MULTIPART_FIELD", `Unknown multipart field: ${key}`);
    }
    if (form.getAll(key).length !== 1) {
      throw new HttpError(422, "DUPLICATE_MULTIPART_FIELD", `Multipart field must occur once: ${key}`);
    }
  }
  const requestPart = form.get("request");
  if (typeof requestPart !== "string") {
    throw new HttpError(422, "REQUEST_PART_REQUIRED", "Multipart field request must contain JSON text");
  }
  let requestValue: unknown;
  try {
    requestValue = JSON.parse(requestPart);
  } catch {
    throw new HttpError(400, "INVALID_REQUEST_JSON", "Multipart request field must contain valid JSON");
  }
  const filePart = form.get("source_file");
  const file = filePart instanceof File && filePart.size > 0 ? filePart : undefined;
  if (file && file.type !== "video/mp4") {
    throw new HttpError(415, "UNSUPPORTED_SOURCE_FILE", "source_file must be an MP4 with video/mp4 media type");
  }
  if (file && file.size > MAX_SOURCE_FILE_BYTES) {
    throw new HttpError(413, "SOURCE_FILE_TOO_LARGE", `source_file must not exceed ${MAX_SOURCE_FILE_BYTES} bytes`);
  }
  const submission = validateSourceSubmission(normalizeSourceRequestShape(requestValue, file !== undefined));
  if (submission.source_type === "mp4" && !file) {
    throw new HttpError(422, "SOURCE_FILE_REQUIRED", "source_file is required when source_type is mp4");
  }
  if (!file) return { submission };
  const contentHash = await sha256ArrayBufferHex(await file.arrayBuffer());
  return {
    submission,
    sourceFile: { file, content_hash: contentHash, size: file.size, content_type: "video/mp4" },
  };
}

async function secureTokenEquals(candidate: string, expected: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const [candidateDigest, expectedDigest] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(candidate)),
    crypto.subtle.digest("SHA-256", encoder.encode(expected)),
  ]);
  const candidateBytes = new Uint8Array(candidateDigest);
  const expectedBytes = new Uint8Array(expectedDigest);
  let difference = 0;
  for (let index = 0; index < candidateBytes.length; index += 1) {
    difference |= candidateBytes[index]! ^ expectedBytes[index]!;
  }
  return difference === 0;
}

async function requireOperator(request: Request, env: Env): Promise<void> {
  if (!env.CLOUT_OPERATOR_TOKEN) {
    throw new HttpError(503, "OPERATOR_AUTH_NOT_CONFIGURED", "Operator access is not configured");
  }
  const authorization = request.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) {
    throw new HttpError(401, "OPERATOR_AUTH_REQUIRED", "Operator bearer token required");
  }
  const valid = await secureTokenEquals(authorization.slice(7), env.CLOUT_OPERATOR_TOKEN);
  if (!valid) throw new HttpError(403, "OPERATOR_AUTH_DENIED", "Operator credentials were not accepted");
}

async function eventStatement(
  env: Env,
  eventType: string,
  actorType: string,
  subjectType: string,
  subjectId: string,
  payload: Record<string, unknown>,
  createdAt: string,
): Promise<D1PreparedStatement> {
  const payloadJson = canonicalJson(payload);
  const eventId = await createDeterministicId("evt", `${eventType}\n${subjectId}\n${createdAt}\n${payloadJson}`);
  const payloadHash = await sha256Hex(payloadJson);
  return env.CLOUT_DB.prepare(
    `INSERT INTO events
      (id, event_type, actor_type, subject_type, subject_id, payload_hash, payload_json, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  ).bind(eventId, eventType, actorType, subjectType, subjectId, payloadHash, payloadJson, createdAt);
}

async function claimIdempotency(
  env: Env,
  scope: string,
  rawKey: string,
  requestHash: string,
  subjectId: string,
): Promise<{ keyHash: string; row: IdempotencyRow; proceed: boolean; replay?: Response }> {
  const keyHash = await sha256Hex(`${scope}\n${rawKey}`);
  const timestamp = nowIso();
  const insertion = await env.CLOUT_DB.prepare(
    `INSERT OR IGNORE INTO idempotency_keys
      (key_hash, scope, request_hash, subject_id, state, created_at, updated_at)
     VALUES (?, ?, ?, ?, 'IN_PROGRESS', ?, ?)`,
  )
    .bind(keyHash, scope, requestHash, subjectId, timestamp, timestamp)
    .run();
  const row = await env.CLOUT_DB.prepare("SELECT * FROM idempotency_keys WHERE key_hash = ?")
    .bind(keyHash)
    .first<IdempotencyRow>();
  if (!row) throw new Error("Idempotency row was not persisted");
  if (row.scope !== scope || row.request_hash !== requestHash) {
    throw new HttpError(409, "IDEMPOTENCY_CONFLICT", "This Idempotency-Key was already used for different input");
  }
  if (insertion.meta.changes === 1) return { keyHash, row, proceed: true };
  if (row.state === "COMPLETE" && row.response_json && row.status_code) {
    return {
      keyHash,
      row,
      proceed: false,
      replay: new Response(row.response_json, {
        status: row.status_code,
        headers: { "Content-Type": "application/json; charset=utf-8", "Idempotency-Replayed": "true" },
      }),
    };
  }
  if (row.state === "FAILED_RETRYABLE") {
    await env.CLOUT_DB.prepare(
      "UPDATE idempotency_keys SET state = 'IN_PROGRESS', updated_at = ? WHERE key_hash = ? AND state = 'FAILED_RETRYABLE'",
    )
      .bind(timestamp, keyHash)
      .run();
    return { keyHash, row: { ...row, state: "IN_PROGRESS", updated_at: timestamp }, proceed: true };
  }
  throw new HttpError(409, "REQUEST_IN_PROGRESS", "A request with this Idempotency-Key is already in progress");
}

async function completeIdempotency(
  env: Env,
  keyHash: string,
  responseBody: unknown,
  statusCode: number,
): Promise<void> {
  await completeIdempotencyStatement(env, keyHash, responseBody, statusCode).run();
}

function completeIdempotencyStatement(
  env: Env,
  keyHash: string,
  responseBody: unknown,
  statusCode: number,
): D1PreparedStatement {
  return env.CLOUT_DB.prepare(
    `UPDATE idempotency_keys
     SET state = 'COMPLETE', status_code = ?, response_json = ?, updated_at = ?
     WHERE key_hash = ? AND state = 'IN_PROGRESS'`,
  )
    .bind(statusCode, JSON.stringify(responseBody), nowIso(), keyHash);
}

async function failIdempotency(env: Env, keyHash: string): Promise<void> {
  await env.CLOUT_DB.prepare(
    "UPDATE idempotency_keys SET state = 'FAILED_RETRYABLE', updated_at = ? WHERE key_hash = ?",
  )
    .bind(nowIso(), keyHash)
    .run();
}

function wrapReplay(request: Request, env: Env, replay: Response): Response {
  const headers = securityHeaders(corsHeaders(request, env));
  headers.set("Idempotency-Replayed", "true");
  return new Response(replay.body, { status: replay.status, headers });
}

async function ensureSourceRecords(
  env: Env,
  submission: SourceSubmission,
  sourceFile: SourceFileArtifact | undefined,
  sourceArtifactKey: string | null,
  requestHash: string,
  sourceId: string,
  opportunityId: string,
  oppHash: string,
  createdAt: string,
): Promise<void> {
  const existing = await env.CLOUT_DB.prepare("SELECT id FROM opportunities WHERE id = ?")
    .bind(opportunityId)
    .first<{ id: string }>();
  if (existing) return;
  const sourceType = submission.source_type;
  const sourceHash = sourceFile?.content_hash ?? await sha256Hex(canonicalJson({
    source_url: submission.source_url ?? null,
    source_type: sourceType,
    niche: submission.niche,
    platform: submission.platform,
    language: submission.language,
  }));
  const sourceEvent = await eventStatement(
    env,
    "source_record.created",
    "PUBLIC_USER",
    "source_request",
    sourceId,
    {
      request_hash: requestHash,
      source_type: sourceType,
      platform: submission.platform,
      language: submission.language,
    },
    createdAt,
  );
  const opportunityEvent = await eventStatement(
    env,
    "opportunity.created",
    "PUBLIC_USER",
    "opportunity",
    opportunityId,
    {
      opp_hash: oppHash,
      status: "OPERATOR_REVIEW_REQUIRED",
      automation_state: "NOT_INVOKED",
    },
    createdAt,
  );
  await env.CLOUT_DB.batch([
    env.CLOUT_DB.prepare(
      `INSERT INTO source_requests
        (id, name_or_handle, email, platform, creator_type, niche, source_url, source_type, language_mode, intent,
         source_artifact_key, source_content_type, source_size, source_file_hash, request_hash, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).bind(
      sourceId,
      submission.name_or_handle,
      submission.email,
      submission.platform,
      submission.creator_type,
      submission.niche,
      submission.source_url ?? null,
      sourceType,
      submission.language,
      submission.intent,
      sourceArtifactKey,
      sourceFile?.content_type ?? null,
      sourceFile?.size ?? null,
      sourceFile?.content_hash ?? null,
      requestHash,
      createdAt,
    ),
    env.CLOUT_DB.prepare(
      `INSERT OR IGNORE INTO source_records
        (id, user_id, source_url, source_type, source_hash, source_language, collection_policy, r2_key, created_at)
       VALUES (?, NULL, ?, ?, ?, ?, 'user_submitted', ?, ?)`,
    ).bind(
      sourceId,
      submission.source_url ?? null,
      sourceType,
      sourceHash,
      submission.language,
      sourceArtifactKey,
      createdAt,
    ),
    env.CLOUT_DB.prepare(
      `INSERT INTO opportunities
        (id, opp_hash, source_id, title, niche, platform, language_mode, creator_type, status, is_demo, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'OPERATOR_REVIEW_REQUIRED', 0, ?)`,
    ).bind(
      opportunityId,
      oppHash,
      sourceId,
      `${submission.niche} opportunity request`,
      submission.niche,
      submission.platform,
      submission.language,
      submission.creator_type,
      createdAt,
    ),
    sourceEvent,
    opportunityEvent,
  ]);
}

async function startCreateOpportunityWorkflow(env: Env, message: IngestQueueMessage): Promise<WorkflowInstance> {
  try {
    return await env.CREATE_OPPORTUNITY_WORKFLOW.create({
      id: message.opportunity_id,
      params: message,
      retention: { successRetention: "30 days", errorRetention: "30 days" },
    });
  } catch (createError) {
    try {
      const existing = await env.CREATE_OPPORTUNITY_WORKFLOW.get(message.opportunity_id);
      const status = await existing.status();
      if (status.status !== "unknown") return existing;
    } catch {
      // The original create error is the authoritative failure.
    }
    throw createError;
  }
}

async function handleSourceSubmission(request: Request, env: Env): Promise<Response> {
  assertOriginAllowed(request, env);
  const parsed = await parseSourceRequest(request);
  const submission = parsed.submission;
  const requestHash = await sha256Hex(
    canonicalJson({
      submission,
      source_file: parsed.sourceFile
        ? {
            content_hash: parsed.sourceFile.content_hash,
            content_type: parsed.sourceFile.content_type,
            size: parsed.sourceFile.size,
          }
        : null,
    }),
  );
  const suppliedIdempotencyKey = request.headers.get("Idempotency-Key");
  const idempotencyKey = validateIdempotencyKey(suppliedIdempotencyKey ?? `web:${requestHash.slice(0, 48)}`);
  const keyHash = await sha256Hex(`source\n${idempotencyKey}`);
  const opportunityId = await createDeterministicId("opp", `${keyHash}\n${requestHash}`);
  const sourceId = await createDeterministicId("src", `${opportunityId}\nsource`);
  const ccid = await createDeterministicId("ccid", `${opportunityId}\nidentity`);
  const oppHash = await createOpportunityHash({
    ...(submission.source_url === undefined ? {} : { sourceUrl: submission.source_url }),
    niche: submission.niche,
    platform: submission.platform,
    languageMode: submission.language,
    packageType: "sample",
    dateBucket: new Date().toISOString().slice(0, 10),
  });
  const claim = await claimIdempotency(env, "source", idempotencyKey, requestHash, opportunityId);
  if (!claim.proceed && claim.replay) return wrapReplay(request, env, claim.replay);
  const createdAt = claim.row.created_at;
  const sourceArtifactKey = parsed.sourceFile ? r2Keys.source(oppHash, sourceId) : null;
  let recordsPersisted = false;

  try {
    if (parsed.sourceFile && sourceArtifactKey) {
      await env.CLOUT_SOURCES.put(sourceArtifactKey, parsed.sourceFile.file.stream(), {
        httpMetadata: { contentType: parsed.sourceFile.content_type },
        customMetadata: {
          visibility: "private",
          sha256: parsed.sourceFile.content_hash,
          source_type: "mp4",
        },
      });
    }
    await ensureSourceRecords(
      env,
      submission,
      parsed.sourceFile,
      sourceArtifactKey,
      requestHash,
      sourceId,
      opportunityId,
      oppHash,
      createdAt,
    );
    recordsPersisted = true;
    const message = createIngestMessage(opportunityId, oppHash, createdAt);
    const workflow = await startCreateOpportunityWorkflow(env, message);
    const body = {
      request_id: sourceId,
      ccid,
      opp_hash: oppHash,
      status: "OPERATOR_REVIEW_REQUIRED",
      workflow_instance_id: workflow.id,
    };
    await completeIdempotency(env, claim.keyHash, body, 202);
    return jsonResponse(request, env, body, 202);
  } catch (error) {
    if (recordsPersisted) {
      const failureAt = nowIso();
      const failureEvent = await eventStatement(
        env,
        "opportunity.queue_delivery_failed",
        "SYSTEM",
        "opportunity",
        opportunityId,
        { opp_hash: oppHash, status: "QUEUE_DELIVERY_FAILED" },
        failureAt,
      );
      await env.CLOUT_DB.batch([
        env.CLOUT_DB.prepare(
          "UPDATE opportunities SET status = 'QUEUE_DELIVERY_FAILED' WHERE id = ? AND status = 'OPERATOR_REVIEW_REQUIRED'",
        ).bind(opportunityId),
        failureEvent,
      ]);
    } else if (sourceArtifactKey) {
      await env.CLOUT_SOURCES.delete(sourceArtifactKey);
    }
    await failIdempotency(env, claim.keyHash);
    log("error", "source_submission_failed", { opportunity_id: opportunityId, opp_hash: oppHash });
    throw error;
  }
}

async function handleOpportunityAlias(request: Request, env: Env): Promise<Response> {
  assertOriginAllowed(request, env);
  const input = recordValue(await readJsonBody(request));
  assertObjectKeys(input, ["source_id", "package_type"]);
  const sourceId = typeof input.source_id === "string" ? input.source_id.trim() : "";
  if (!/^src_[0-9a-z_]{4,80}$/u.test(sourceId)) {
    throw new HttpError(422, "INVALID_SOURCE_ID", "source_id is invalid");
  }
  const packageType = typeof input.package_type === "string" ? input.package_type.trim() : "sample";
  if (!["sample", "creator", "clipper", "business"].includes(packageType)) {
    throw new HttpError(422, "INVALID_PACKAGE_TYPE", "package_type is not supported");
  }
  const source = await env.CLOUT_DB.prepare(
    `SELECT id, source_url, niche, platform, language_mode, creator_type, created_at
     FROM source_requests WHERE id = ? LIMIT 1`,
  )
    .bind(sourceId)
    .first<SourceRequestRow>();
  if (!source) throw new HttpError(404, "SOURCE_NOT_FOUND", "Source record not found");
  const existing = await env.CLOUT_DB.prepare(
    `SELECT id, opp_hash, status, created_at FROM opportunities
     WHERE source_id = ? ORDER BY created_at ASC LIMIT 1`,
  )
    .bind(sourceId)
    .first<Pick<OpportunityRow, "id" | "opp_hash" | "status" | "created_at">>();
  if (existing) {
    const body = {
      opportunity_id: existing.id,
      opp_hash: existing.opp_hash,
      status: existing.status,
      created_at: existing.created_at,
      replayed: true,
    };
    assertPublicPayloadSafe(body);
    return jsonResponse(request, env, body, 200);
  }

  const requestHash = await sha256Hex(canonicalJson({ source_id: sourceId, package_type: packageType }));
  const rawIdempotencyKey = request.headers.get("Idempotency-Key") ?? `opp:${requestHash.slice(0, 48)}`;
  const idempotencyKey = validateIdempotencyKey(rawIdempotencyKey);
  const opportunityId = await createDeterministicId("opp", `${sourceId}\n${packageType}`);
  const oppHash = await createOpportunityHash({
    ...(source.source_url === null ? {} : { sourceUrl: source.source_url }),
    niche: source.niche,
    platform: source.platform,
    languageMode: source.language_mode,
    packageType,
    dateBucket: source.created_at.slice(0, 10),
  });
  const claim = await claimIdempotency(
    env,
    `opportunity:${sourceId}`,
    idempotencyKey,
    requestHash,
    opportunityId,
  );
  if (!claim.proceed && claim.replay) return wrapReplay(request, env, claim.replay);
  try {
    const createdAt = claim.row.created_at;
    const event = await eventStatement(
      env,
      "opportunity.created",
      "PUBLIC_USER",
      "opportunity",
      opportunityId,
      { opp_hash: oppHash, status: "OPERATOR_REVIEW_REQUIRED" },
      createdAt,
    );
    await env.CLOUT_DB.batch([
      env.CLOUT_DB.prepare(
        `INSERT INTO opportunities
          (id, opp_hash, source_id, title, niche, platform, language_mode, creator_type, status, is_demo, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'OPERATOR_REVIEW_REQUIRED', 0, ?)`,
      ).bind(
        opportunityId,
        oppHash,
        sourceId,
        `${source.niche} opportunity request`,
        source.niche,
        source.platform,
        source.language_mode,
        source.creator_type,
        createdAt,
      ),
      event,
    ]);
    const message = createIngestMessage(opportunityId, oppHash, createdAt);
    const workflow = await startCreateOpportunityWorkflow(env, message);
    const body = {
      opportunity_id: opportunityId,
      opp_hash: oppHash,
      status: "OPERATOR_REVIEW_REQUIRED",
      workflow_instance_id: workflow.id,
      created_at: createdAt,
    };
    assertPublicPayloadSafe(body);
    await completeIdempotency(env, claim.keyHash, body, 201);
    return jsonResponse(request, env, body, 201);
  } catch (error) {
    await failIdempotency(env, claim.keyHash);
    throw error;
  }
}

async function handlePublicReceipt(request: Request, env: Env, oppHash: string): Promise<Response> {
  assertOriginAllowed(request, env);
  if (!isOpportunityHash(oppHash)) throw new HttpError(404, "RECEIPT_NOT_FOUND", "Receipt not found");
  const row = await env.CLOUT_DB.prepare(
    `SELECT o.opp_hash, o.creator_type, r.id AS receipt_id, r.receipt_hash, r.public_payload_json, r.created_at
     FROM share_surfaces s
     JOIN opportunities o ON o.opp_hash = s.opp_hash
     JOIN receipts r ON r.id = s.receipt_id
     WHERE s.opp_hash = ? AND s.visibility = 'public_preview' AND r.public_visibility = 'public_preview'
     LIMIT 1`,
  )
    .bind(oppHash)
    .first<PublicReceiptRow>();
  if (!row) throw new HttpError(404, "RECEIPT_NOT_FOUND", "Receipt not found");
  const payload = JSON.parse(row.public_payload_json) as Record<string, unknown>;
  const opportunity = payload.opportunity as Record<string, unknown> | undefined;
  const preview = payload.package_preview as Record<string, unknown> | undefined;
  const receipt = payload.receipt as Record<string, unknown> | undefined;
  if (!opportunity || !preview || !receipt) {
    throw new HttpError(503, "RECEIPT_UNAVAILABLE", "Receipt data is not available in the public schema");
  }
  const countLabels: Array<[string, string, string]> = [
    ["hooks", "hook", "hooks"],
    ["captions", "caption", "captions"],
    ["short_scripts", "short script", "short scripts"],
    ["clip_targets", "clip target", "clip targets"],
    ["export_specs", "export spec", "export specs"],
    ["bilingual_variants", "bilingual variant", "bilingual variants"],
  ];
  const packagePreview = countLabels.flatMap(([key, singular, plural]) => {
    const count = Number(preview[key] ?? 0);
    return Number.isInteger(count) && count > 0 ? [`${count} ${count === 1 ? singular : plural}`] : [];
  });
  const sourceNotes = Array.isArray(preview.source_notes) ? preview.source_notes.filter((item): item is string => typeof item === "string") : [];
  const riskNotes = Array.isArray(preview.risk_notes) ? preview.risk_notes.filter((item): item is string => typeof item === "string") : [];
  const platforms = Array.isArray(opportunity.platform_fit)
    ? opportunity.platform_fit.filter((item): item is string => typeof item === "string")
    : [];
  const body = {
    oppHash,
    receiptId: row.receipt_id,
    title: String(opportunity.title ?? ""),
    whyNow: String(opportunity.why_now ?? ""),
    platforms,
    languageLane: String(opportunity.language_lane ?? "Not stated"),
    packagePreview,
    sourceNote: sourceNotes[0] ?? "No public source note was provided.",
    riskNote: riskNotes[0] ?? "Review source rights before publishing.",
    createdAt: String(receipt.created_at ?? row.created_at),
    ...(payload.demo === true ? { scoreBand: "Demonstration" } : {}),
    crmTrialEligible: ["business", "agency"].includes(row.creator_type),
  };
  assertPublicPayloadSafe(body);
  return jsonResponse(request, env, body, 200, "public, max-age=60, s-maxage=300, stale-while-revalidate=60");
}

async function handlePrivatePackage(request: Request, env: Env, packageId: string): Promise<Response> {
  assertOriginAllowed(request, env);
  if (!/^pkg_[0-9a-f]{24}$/u.test(packageId)) {
    throw new HttpError(404, "PACKAGE_ACCESS_DENIED", "Private package access was not accepted");
  }
  const deliveryToken = deliveryTokenFromAuthorization(request.headers.get("Authorization"));
  if (!deliveryToken) {
    throw new HttpError(401, "PACKAGE_DELIVERY_TOKEN_REQUIRED", "A package delivery token is required");
  }
  const tokenSha256 = await hashDeliveryToken(deliveryToken);
  const row = await env.CLOUT_DB.prepare(
    `SELECT p.id AS package_id, p.status AS package_status, p.output_json,
            r.id AS receipt_id, r.receipt_hash, o.opp_hash,
            g.id AS grant_id, g.expires_at
     FROM package_delivery_grants g
     JOIN packages p ON p.id = g.package_id
     JOIN receipts r ON r.id = g.receipt_id
       AND r.package_id = p.id AND r.opportunity_id = p.opportunity_id
     JOIN opportunities o ON o.id = p.opportunity_id
     WHERE p.id = ? AND g.token_sha256 = ? AND g.status = 'active'
       AND p.status = 'APPROVED'
       AND r.public_visibility = 'public_preview'
       AND julianday(g.expires_at) > julianday(?)
     LIMIT 1`,
  )
    .bind(packageId, tokenSha256, nowIso())
    .first<PrivatePackageRow>();
  if (!row) {
    throw new HttpError(404, "PACKAGE_ACCESS_DENIED", "Private package access was not accepted");
  }
  const output = JSON.parse(row.output_json) as Record<string, unknown>;
  return jsonResponse(request, env, {
    package_id: row.package_id,
    status: row.package_status,
    opportunity: { opp_hash: row.opp_hash },
    package_type: output.package_type,
    package: output.package,
    receipt: {
      receipt_id: row.receipt_id,
      receipt_hash: row.receipt_hash,
      public_url: `https://clout.prime88.studio/r/${row.opp_hash}`,
    },
    delivery: { expires_at: row.expires_at },
  });
}

async function handleOperatorList(request: Request, env: Env): Promise<Response> {
  await requireOperator(request, env);
  assertOriginAllowed(request, env);
  const url = new URL(request.url);
  const requestedLimit = Number(url.searchParams.get("limit") ?? "25");
  if (!Number.isInteger(requestedLimit) || requestedLimit < 1 || requestedLimit > 50) {
    throw new HttpError(422, "INVALID_LIMIT", "limit must be an integer between 1 and 50");
  }
  const allowedStatuses = new Set([
    "OPERATOR_REVIEW_REQUIRED",
    "QUEUED_FOR_MANUAL_REVIEW",
    "MANUAL_PACKAGE_DRAFTED",
    "PUBLIC_RECEIPT_READY",
    "QUEUE_DELIVERY_FAILED",
  ]);
  const status = url.searchParams.get("status");
  if (status && !allowedStatuses.has(status)) throw new HttpError(422, "INVALID_STATUS", "Unsupported status filter");
  const statement = status
    ? env.CLOUT_DB.prepare(
        `SELECT o.id, o.opp_hash, o.title, o.niche, o.platform, o.language_mode, o.creator_type, o.status,
                o.created_at, o.queued_at, o.compiled_at, o.approved_at,
                s.id AS source_id, s.name_or_handle, s.email, s.source_url, s.source_type, s.intent,
                s.source_artifact_key, s.source_content_type, s.source_size, s.source_file_hash,
                p.id AS package_id, p.status AS package_status, r.id AS receipt_id
         FROM opportunities o
         JOIN source_requests s ON s.id = o.source_id
         LEFT JOIN packages p ON p.opportunity_id = o.id
         LEFT JOIN receipts r ON r.opportunity_id = o.id
         WHERE o.status = ? ORDER BY o.created_at ASC LIMIT ?`,
      ).bind(status, requestedLimit)
    : env.CLOUT_DB.prepare(
        `SELECT o.id, o.opp_hash, o.title, o.niche, o.platform, o.language_mode, o.creator_type, o.status,
                o.created_at, o.queued_at, o.compiled_at, o.approved_at,
                s.id AS source_id, s.name_or_handle, s.email, s.source_url, s.source_type, s.intent,
                s.source_artifact_key, s.source_content_type, s.source_size, s.source_file_hash,
                p.id AS package_id, p.status AS package_status, r.id AS receipt_id
         FROM opportunities o
         JOIN source_requests s ON s.id = o.source_id
         LEFT JOIN packages p ON p.opportunity_id = o.id
         LEFT JOIN receipts r ON r.opportunity_id = o.id
         ORDER BY o.created_at ASC LIMIT ?`,
      ).bind(requestedLimit);
  const result = await statement.all<Record<string, unknown>>();
  const opportunities = result.results.map((row) => ({
    id: row.id,
    opp_hash: row.opp_hash,
    title: row.title,
    niche: row.niche,
    platform: row.platform,
    language_mode: row.language_mode,
    creator_type: row.creator_type,
    status: row.status,
    created_at: row.created_at,
    queued_at: row.queued_at,
    compiled_at: row.compiled_at,
    approved_at: row.approved_at,
    requester: {
      name_or_handle: row.name_or_handle,
      email: row.email,
    },
    source: {
      id: row.source_id,
      type: row.source_type,
      url: row.source_url,
      intent: row.intent,
      upload: row.source_artifact_key
        ? {
            available: true,
            content_type: row.source_content_type,
            size: row.source_size,
            sha256: row.source_file_hash,
          }
        : { available: false },
    },
    package: row.package_id
      ? { id: row.package_id, status: row.package_status, receipt_id: row.receipt_id }
      : null,
  }));
  return jsonResponse(request, env, {
    ok: true,
    data: { opportunities, count: opportunities.length },
  });
}

async function handleManualCompile(
  request: Request,
  env: Env,
  oppHash: string,
  packageType = "creator",
): Promise<Response> {
  await requireOperator(request, env);
  assertOriginAllowed(request, env);
  if (!isOpportunityHash(oppHash)) throw new HttpError(404, "OPPORTUNITY_NOT_FOUND", "Opportunity not found");
  const idempotencyKey = validateIdempotencyKey(request.headers.get("Idempotency-Key"));
  const input = validateManualCompileInput(await readJsonBody(request));
  const requestHash = await sha256Hex(canonicalJson({ package_type: packageType, package: input }));
  const packageId = await createDeterministicId("pkg", `${oppHash}\ncompile\n${idempotencyKey}\n${requestHash}`);
  const claim = await claimIdempotency(env, `compile:${oppHash}`, idempotencyKey, requestHash, packageId);
  if (!claim.proceed && claim.replay) return wrapReplay(request, env, claim.replay);
  let artifactKey: string | null = null;
  let deleteArtifactOnFailure = false;
  try {
    const opportunity = await env.CLOUT_DB.prepare("SELECT * FROM opportunities WHERE opp_hash = ?")
      .bind(oppHash)
      .first<OpportunityRow>();
    if (!opportunity) throw new HttpError(404, "OPPORTUNITY_NOT_FOUND", "Opportunity not found");
    const existingPackage = await env.CLOUT_DB.prepare("SELECT id, status FROM packages WHERE opportunity_id = ?")
      .bind(opportunity.id)
      .first<{ id: string; status: string }>();
    const body = {
      opp_hash: oppHash,
      package_id: packageId,
      status: "MANUAL_PACKAGE_DRAFTED",
      compiler_mode: "MANUAL_OPERATOR",
      automation_state: "NOT_INVOKED",
    };
    if (existingPackage?.id === packageId && existingPackage.status === "DRAFT") {
      await completeIdempotency(env, claim.keyHash, body, 201);
      return jsonResponse(request, env, body, 201);
    }
    if (!["OPERATOR_REVIEW_REQUIRED", "QUEUED_FOR_MANUAL_REVIEW"].includes(opportunity.status)) {
      throw new HttpError(409, "OPPORTUNITY_NOT_COMPILABLE", `Opportunity is in state ${opportunity.status}`);
    }
    if (existingPackage) {
      throw new HttpError(409, "PACKAGE_ALREADY_EXISTS", "This V0 opportunity already has a package draft");
    }

    const createdAt = claim.row.created_at;
    const output = {
      schema_version: MANUAL_PACKAGE_SCHEMA,
      compiler_mode: "MANUAL_OPERATOR",
      automation_state: "NOT_INVOKED",
      package_type: packageType,
      opportunity: { opp_hash: oppHash },
      package: input,
      created_at: createdAt,
    };
    const outputJson = canonicalJson(output);
    artifactKey = r2Keys.package(oppHash, packageId);
    await env.CLOUT_PACKAGES.put(artifactKey, outputJson, {
      httpMetadata: { contentType: "application/json; charset=utf-8" },
      customMetadata: { schema_version: MANUAL_PACKAGE_SCHEMA, visibility: "private" },
    });
    deleteArtifactOnFailure = true;
    const compileEvent = await eventStatement(
      env,
      "package.manual_compiled",
      "OPERATOR",
      "package",
      packageId,
      {
        opp_hash: oppHash,
        compiler_mode: "MANUAL_OPERATOR",
        automation_state: "NOT_INVOKED",
        artifact_hash: await sha256Hex(outputJson),
      },
      createdAt,
    );
    await env.CLOUT_DB.batch([
      env.CLOUT_DB.prepare(
        `INSERT INTO packages
          (id, opportunity_id, output_json, artifact_key, status, compiler_mode, created_at)
         VALUES (?, ?, ?, ?, 'DRAFT', 'MANUAL_OPERATOR', ?)`,
      ).bind(packageId, opportunity.id, outputJson, artifactKey, createdAt),
      env.CLOUT_DB.prepare(
        "UPDATE opportunities SET status = 'MANUAL_PACKAGE_DRAFTED', compiled_at = ? WHERE id = ?",
      ).bind(createdAt, opportunity.id),
      compileEvent,
      completeIdempotencyStatement(env, claim.keyHash, body, 201),
    ]);
    deleteArtifactOnFailure = false;
    return jsonResponse(request, env, body, 201);
  } catch (error) {
    if (artifactKey && deleteArtifactOnFailure) await env.CLOUT_PACKAGES.delete(artifactKey);
    await failIdempotency(env, claim.keyHash);
    throw error;
  }
}

function packageCounts(input: ManualCompileInput): Record<string, number> {
  return {
    hooks: input.hooks.length,
    captions: input.captions.length,
    short_scripts: input.short_scripts.length,
    clip_targets: input.clip_targets.length,
    export_specs: input.export_specs.length,
    bilingual_variants: input.bilingual_variants.length,
  };
}

async function handleManualApprove(request: Request, env: Env, oppHash: string): Promise<Response> {
  await requireOperator(request, env);
  assertOriginAllowed(request, env);
  if (!isOpportunityHash(oppHash)) throw new HttpError(404, "OPPORTUNITY_NOT_FOUND", "Opportunity not found");
  const idempotencyKey = validateIdempotencyKey(request.headers.get("Idempotency-Key"));
  const input: ManualApproveInput = validateManualApproveInput(await readJsonBody(request));
  const requestHash = await sha256Hex(canonicalJson(input));
  const receiptId = await createDeterministicId("rcpt", `${oppHash}\napprove\n${idempotencyKey}\n${requestHash}`);
  const claim = await claimIdempotency(env, `approve:${oppHash}`, idempotencyKey, requestHash, receiptId);
  if (!claim.proceed && claim.replay) return wrapReplay(request, env, claim.replay);
  let publicArtifactKey: string | null = null;
  let publicShareKey: string | null = null;
  let deleteArtifactOnFailure = false;
  try {
    const opportunity = await env.CLOUT_DB.prepare("SELECT * FROM opportunities WHERE opp_hash = ?")
      .bind(oppHash)
      .first<OpportunityRow>();
    if (!opportunity) throw new HttpError(404, "OPPORTUNITY_NOT_FOUND", "Opportunity not found");
    const packageRow = await env.CLOUT_DB.prepare("SELECT * FROM packages WHERE id = ? AND opportunity_id = ?")
      .bind(input.package_id, opportunity.id)
      .first<PackageRow>();
    if (!packageRow) throw new HttpError(404, "PACKAGE_NOT_FOUND", "Package not found");
    if (packageRow.status !== "DRAFT") {
      throw new HttpError(409, "PACKAGE_NOT_APPROVABLE", `Package is in state ${packageRow.status}`);
    }
    const packageOutput = JSON.parse(packageRow.output_json) as { package: ManualCompileInput };
    const createdAt = claim.row.created_at;
    const deliveryToken = createDeliveryToken();
    const deliveryTokenSha256 = await hashDeliveryToken(deliveryToken);
    const deliveryGrantId = await createDeterministicId("grant", `${receiptId}\n${packageRow.id}`);
    const deliveryExpiresAt = new Date(new Date(createdAt).getTime() + DELIVERY_TOKEN_TTL_MS).toISOString();
    const publicPayload = {
      schema_version: PUBLIC_RECEIPT_SCHEMA,
      demo: false,
      opportunity: {
        opp_hash: oppHash,
        title: input.public_title,
        why_now: input.why_now,
        platform_fit: input.platform_fit,
        language_lane: input.language_lane,
      },
      package_preview: {
        ...packageCounts(packageOutput.package),
        source_notes: input.source_notes,
        risk_notes: input.risk_notes,
      },
      receipt: {
        receipt_id: receiptId,
        created_at: createdAt,
        approval_mode: "MANUAL_OPERATOR",
      },
    };
    const publicPayloadJson = canonicalJson(publicPayload);
    const receiptHash = await sha256Hex(publicPayloadJson);
    publicArtifactKey = r2Keys.receipt(oppHash, receiptId);
    assertPublicPayloadSafe(publicPayload);
    await env.CLOUT_RECEIPTS.put(publicArtifactKey, publicPayloadJson, {
      httpMetadata: { contentType: "application/json; charset=utf-8" },
      customMetadata: { schema_version: PUBLIC_RECEIPT_SCHEMA, visibility: "public_preview" },
    });
    deleteArtifactOnFailure = true;
    publicShareKey = r2Keys.share(oppHash);
    await env.CLOUT_PUBLIC.put(publicShareKey, publicPayloadJson, {
      httpMetadata: { contentType: "application/json; charset=utf-8" },
      customMetadata: { schema_version: PUBLIC_RECEIPT_SCHEMA, visibility: "public" },
    });
    const approveEvent = await eventStatement(
      env,
      "receipt.manual_approved",
      "OPERATOR",
      "receipt",
      receiptId,
      { opp_hash: oppHash, receipt_hash: receiptHash, approval_mode: "MANUAL_OPERATOR" },
      createdAt,
    );
    const replayBody = {
      opp_hash: oppHash,
      package_id: packageRow.id,
      receipt_id: receiptId,
      receipt_hash: receiptHash,
      status: "PUBLIC_RECEIPT_READY",
      public_url: `https://clout.prime88.studio/r/${oppHash}`,
      private_package_url: `https://clout.prime88.studio/p/${packageRow.id}`,
      delivery_token_issued: true,
      delivery_token_expires_at: deliveryExpiresAt,
      approval_mode: "MANUAL_OPERATOR",
    };
    await env.CLOUT_DB.batch([
      env.CLOUT_DB.prepare(
        `INSERT INTO receipts
          (id, opportunity_id, package_id, receipt_hash, public_payload_json, public_artifact_key,
           public_visibility, approval_mode, created_at)
         VALUES (?, ?, ?, ?, ?, ?, 'public_preview', 'MANUAL_OPERATOR', ?)`,
      ).bind(receiptId, opportunity.id, packageRow.id, receiptHash, publicPayloadJson, publicArtifactKey, createdAt),
      env.CLOUT_DB.prepare(
        `INSERT INTO share_surfaces (id, opp_hash, package_id, receipt_id, visibility, created_at)
         VALUES (?, ?, ?, ?, 'public_preview', ?)`,
      ).bind(`share_${receiptId}`, oppHash, packageRow.id, receiptId, createdAt),
      env.CLOUT_DB.prepare("UPDATE packages SET status = 'APPROVED' WHERE id = ? AND status = 'DRAFT'").bind(packageRow.id),
      env.CLOUT_DB.prepare(
        `INSERT INTO package_delivery_grants
          (id, package_id, receipt_id, token_sha256, status, created_at, expires_at)
         VALUES (?, ?, ?, ?, 'active', ?, ?)`,
      ).bind(
        deliveryGrantId,
        packageRow.id,
        receiptId,
        deliveryTokenSha256,
        createdAt,
        deliveryExpiresAt,
      ),
      env.CLOUT_DB.prepare(
        "UPDATE opportunities SET status = 'PUBLIC_RECEIPT_READY', approved_at = ? WHERE id = ?",
      ).bind(createdAt, opportunity.id),
      approveEvent,
      completeIdempotencyStatement(env, claim.keyHash, replayBody, 201),
    ]);
    deleteArtifactOnFailure = false;
    return jsonResponse(request, env, { ...replayBody, delivery_token: deliveryToken }, 201);
  } catch (error) {
    if (publicArtifactKey && deleteArtifactOnFailure) await env.CLOUT_RECEIPTS.delete(publicArtifactKey);
    if (publicShareKey && deleteArtifactOnFailure) await env.CLOUT_PUBLIC.delete(publicShareKey);
    await failIdempotency(env, claim.keyHash);
    throw error;
  }
}

function assertObjectKeys(value: Record<string, unknown>, allowed: readonly string[]): void {
  const allow = new Set(allowed);
  const unknown = Object.keys(value).filter((key) => !allow.has(key));
  if (unknown.length > 0) throw new HttpError(422, "UNKNOWN_FIELDS", `Unknown fields: ${unknown.join(", ")}`);
}

async function syntheticOperatorRequest(
  request: Request,
  body: unknown,
  scope: string,
): Promise<Request> {
  const headers = new Headers(request.headers);
  headers.set("Content-Type", "application/json");
  if (!headers.has("Idempotency-Key")) {
    const requestHash = await sha256Hex(canonicalJson(body));
    headers.set("Idempotency-Key", `ui:${scope}:${requestHash.slice(0, 40)}`);
  }
  return new Request(request.url, { method: "POST", headers, body: JSON.stringify(body) });
}

async function handleOperatorSession(request: Request, env: Env): Promise<Response> {
  await requireOperator(request, env);
  assertOriginAllowed(request, env);
  return jsonResponse(request, env, { authorized: true, operator: "Prime 88 operator" });
}

async function handlePackageAlias(request: Request, env: Env): Promise<Response> {
  await requireOperator(request, env);
  assertOriginAllowed(request, env);
  const body = recordValue(await readJsonBody(request));
  assertObjectKeys(body, ["opp_hash", "package_type", "operator_note"]);
  const oppHash = typeof body.opp_hash === "string" ? body.opp_hash.trim().toUpperCase() : "";
  if (!isOpportunityHash(oppHash)) throw new HttpError(422, "INVALID_OPPORTUNITY_HASH", "opp_hash is invalid");
  const packageType = typeof body.package_type === "string" ? body.package_type : "";
  if (!["creator", "clipper", "business", "owned_brand"].includes(packageType)) {
    throw new HttpError(422, "INVALID_PACKAGE_TYPE", "package_type is not supported");
  }
  if (typeof body.operator_note !== "string" || body.operator_note.trim().length === 0) {
    throw new HttpError(422, "MANUAL_PACKAGE_REQUIRED", "operator_note must contain the complete manual package JSON");
  }
  let manualInput: unknown;
  try {
    manualInput = JSON.parse(body.operator_note);
  } catch {
    throw new HttpError(
      422,
      "MANUAL_PACKAGE_REQUIRED",
      "operator_note must be a JSON object containing title, why_now, hooks, captions, scripts, export specs, source notes, risk notes, and next action",
    );
  }
  const validated = validateManualCompileInput(manualInput);
  const forwarded = await syntheticOperatorRequest(request, validated, `compile:${oppHash}`);
  return handleManualCompile(forwarded, env, oppHash, packageType);
}

function platformLabel(platform: string): "TikTok" | "Reels" | "Shorts" | "X" | "YouTube" | "Other" {
  const labels: Record<string, "TikTok" | "Reels" | "Shorts" | "X" | "YouTube" | "Other"> = {
    tiktok: "TikTok",
    reels: "Reels",
    shorts: "Shorts",
    x: "X",
    youtube: "YouTube",
    other: "Other",
  };
  return labels[platform] ?? "Other";
}

async function handleReceiptAlias(request: Request, env: Env): Promise<Response> {
  await requireOperator(request, env);
  assertOriginAllowed(request, env);
  const body = recordValue(await readJsonBody(request));
  assertObjectKeys(body, ["opp_hash", "package_id"]);
  const oppHash = typeof body.opp_hash === "string" ? body.opp_hash.trim().toUpperCase() : "";
  const packageId = typeof body.package_id === "string" ? body.package_id.trim() : "";
  if (!isOpportunityHash(oppHash)) throw new HttpError(422, "INVALID_OPPORTUNITY_HASH", "opp_hash is invalid");
  if (packageId.length < 8 || packageId.length > 80) throw new HttpError(422, "INVALID_PACKAGE_ID", "package_id is invalid");
  const opportunity = await env.CLOUT_DB.prepare("SELECT * FROM opportunities WHERE opp_hash = ?")
    .bind(oppHash)
    .first<OpportunityRow>();
  if (!opportunity) throw new HttpError(404, "OPPORTUNITY_NOT_FOUND", "Opportunity not found");
  const packageRow = await env.CLOUT_DB.prepare("SELECT * FROM packages WHERE id = ? AND opportunity_id = ?")
    .bind(packageId, opportunity.id)
    .first<PackageRow>();
  if (!packageRow) throw new HttpError(404, "PACKAGE_NOT_FOUND", "Package not found");
  const output = JSON.parse(packageRow.output_json) as { package?: ManualCompileInput };
  if (!output.package) throw new HttpError(409, "PACKAGE_CONTENT_REQUIRED", "Package has no manually compiled content");
  const approval: ManualApproveInput = {
    package_id: packageId,
    public_title: output.package.title,
    why_now: output.package.why_now,
    platform_fit: [platformLabel(opportunity.platform)],
    language_lane:
      opportunity.language_mode === "es" || opportunity.language_mode === "bilingual"
        ? opportunity.language_mode
        : "en",
    source_notes: output.package.source_notes.slice(0, 5),
    risk_notes: output.package.risk_notes.slice(0, 5),
  };
  const forwarded = await syntheticOperatorRequest(request, approval, `approve:${oppHash}`);
  return handleManualApprove(forwarded, env, oppHash);
}

async function handleReceiptById(request: Request, env: Env, receiptId: string): Promise<Response> {
  assertOriginAllowed(request, env);
  const normalized = receiptId.trim().toUpperCase();
  if (isOpportunityHash(normalized)) return handlePublicReceipt(request, env, normalized);
  if (!/^rcpt_[0-9a-z_]{4,80}$/u.test(receiptId)) {
    throw new HttpError(404, "RECEIPT_NOT_FOUND", "Receipt not found");
  }
  const row = await env.CLOUT_DB.prepare(
    `SELECT o.opp_hash
     FROM receipts r
     JOIN opportunities o ON o.id = r.opportunity_id
     WHERE r.id = ? AND r.public_visibility = 'public_preview'
     LIMIT 1`,
  )
    .bind(receiptId)
    .first<{ opp_hash: string }>();
  if (!row) throw new HttpError(404, "RECEIPT_NOT_FOUND", "Receipt not found");
  return handlePublicReceipt(request, env, row.opp_hash);
}

async function handleInternalApproveAlias(request: Request, env: Env): Promise<Response> {
  await requireOperator(request, env);
  assertOriginAllowed(request, env);
  const body = recordValue(await readJsonBody(request));
  assertObjectKeys(body, [
    "opp_hash",
    "package_id",
    "public_title",
    "why_now",
    "platform_fit",
    "language_lane",
    "source_notes",
    "risk_notes",
  ]);
  const oppHash = typeof body.opp_hash === "string" ? body.opp_hash.trim().toUpperCase() : "";
  if (!isOpportunityHash(oppHash)) {
    throw new HttpError(422, "INVALID_OPPORTUNITY_HASH", "opp_hash is invalid");
  }
  const approval = {
    package_id: body.package_id,
    public_title: body.public_title,
    why_now: body.why_now,
    platform_fit: body.platform_fit,
    language_lane: body.language_lane,
    source_notes: body.source_notes,
    risk_notes: body.risk_notes,
  };
  validateManualApproveInput(approval);
  const token = crypto.randomUUID();
  const session = env.OPPORTUNITY_SESSION.getByName(oppHash);
  const lock = await session.acquire("approve", token, 30_000);
  if (!lock.acquired) {
    throw new HttpError(409, "APPROVAL_IN_PROGRESS", "This opportunity already has an approval in progress");
  }
  try {
    const forwarded = await syntheticOperatorRequest(request, approval, `approve:${oppHash}`);
    return await handleManualApprove(forwarded, env, oppHash);
  } finally {
    try {
      await session.release("approve", token);
    } catch (error) {
      log("warn", "approval_lock_release_failed", {
        opp_hash: oppHash,
        error_name: error instanceof Error ? error.name : "UnknownError",
      });
    }
  }
}

function arrayBufferToBase64(value: ArrayBuffer): string {
  let binary = "";
  for (const byte of new Uint8Array(value)) binary += String.fromCharCode(byte);
  return btoa(binary);
}

async function webhookSignature(secret: string, signedPayload: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return arrayBufferToBase64(await crypto.subtle.sign("HMAC", key, encoder.encode(signedPayload)));
}

async function handleWhopWebhook(request: Request, env: Env): Promise<Response> {
  if (!env.CLOUT_WHOP_WEBHOOK_SECRET) {
    throw new HttpError(503, "WEBHOOK_NOT_CONFIGURED", "Payment webhooks are not enabled in this pilot");
  }
  const webhookId = request.headers.get("webhook-id")?.trim() ?? "";
  const timestampHeader = request.headers.get("webhook-timestamp")?.trim() ?? "";
  const signatureHeader = request.headers.get("webhook-signature")?.trim() ?? "";
  if (!/^[A-Za-z0-9._:-]{8,160}$/u.test(webhookId)) {
    throw new HttpError(400, "INVALID_WEBHOOK_ID", "Webhook ID is missing or invalid");
  }
  const timestampSeconds = Number(timestampHeader);
  if (!Number.isInteger(timestampSeconds)) {
    throw new HttpError(400, "INVALID_WEBHOOK_TIMESTAMP", "Webhook timestamp is missing or invalid");
  }
  if (Math.abs(Date.now() - timestampSeconds * 1_000) > 5 * 60 * 1_000) {
    throw new HttpError(401, "STALE_WEBHOOK", "Webhook timestamp is outside the accepted window");
  }
  if (!signatureHeader) throw new HttpError(401, "WEBHOOK_SIGNATURE_REQUIRED", "Webhook signature is required");
  const { value, raw } = await readJsonBodyWithRaw(request);
  const payload = recordValue(value);
  const eventType = typeof payload.type === "string" ? payload.type.trim() : "";
  if (!/^[A-Za-z0-9._:-]{3,120}$/u.test(eventType)) {
    throw new HttpError(422, "INVALID_WEBHOOK_EVENT", "Webhook event type is missing or invalid");
  }
  const expected = await webhookSignature(
    env.CLOUT_WHOP_WEBHOOK_SECRET,
    `${webhookId}.${timestampHeader}.${raw}`,
  );
  const candidates = signatureHeader
    .split(/\s+/u)
    .map((candidate) => candidate.replace(/^v1,/u, ""))
    .filter(Boolean);
  let verified = false;
  for (const candidate of candidates) {
    if (await secureTokenEquals(candidate, expected)) {
      verified = true;
      break;
    }
  }
  if (!verified) throw new HttpError(401, "INVALID_WEBHOOK_SIGNATURE", "Webhook signature was not accepted");

  const receivedAt = nowIso();
  const eventHash = await sha256Hex(`${webhookId}\n${timestampHeader}\n${raw}`);
  const internalEventId = await createDeterministicId("evt", `whop\n${eventHash}`);
  const metadata = canonicalJson({
    provider_event_id: webhookId,
    provider_event_type: eventType,
    event_hash: eventHash,
    payment_logic: "DISABLED_V0",
  });
  await env.CLOUT_DB.batch([
    env.CLOUT_DB.prepare(
      `INSERT OR IGNORE INTO webhook_receipts
        (event_hash, provider_event_id, provider_event_type, status, received_at)
       VALUES (?, ?, ?, 'RECEIVED', ?)`,
    ).bind(eventHash, webhookId, eventType, receivedAt),
    env.CLOUT_DB.prepare(
      `INSERT OR IGNORE INTO events
        (id, event_type, actor_type, subject_type, subject_id, payload_hash, payload_json, created_at)
       VALUES (?, 'whop.webhook_received', 'SYSTEM', 'whop_webhook', ?, ?, ?, ?)`,
    ).bind(internalEventId, webhookId, eventHash, metadata, receivedAt),
  ]);
  const row = await env.CLOUT_DB.prepare(
    `SELECT event_hash, provider_event_id, status FROM webhook_receipts WHERE event_hash = ? LIMIT 1`,
  )
    .bind(eventHash)
    .first<WebhookReceiptRow>();
  if (!row) throw new Error("Webhook receipt was not persisted");
  if (row.provider_event_id !== webhookId) {
    throw new HttpError(409, "WEBHOOK_ID_CONFLICT", "Webhook ID was already used for different content");
  }
  if (row.status === "ENQUEUED") {
    return jsonResponse(request, env, {
      accepted: true,
      replayed: true,
      event_id: internalEventId,
      payment_logic: "DISABLED_V0",
    }, 202);
  }
  const claimed = await env.CLOUT_DB.prepare(
    `UPDATE webhook_receipts SET status = 'ENQUEUEING'
     WHERE event_hash = ? AND status = 'RECEIVED'`,
  )
    .bind(eventHash)
    .run();
  if (claimed.meta.changes !== 1) {
    return jsonResponse(request, env, {
      accepted: true,
      replayed: true,
      event_id: internalEventId,
      payment_logic: "DISABLED_V0",
    }, 202);
  }
  try {
    const queueMessage: WhopStubQueueMessage = {
      schema_version: "clout.whop.stub.v1",
      event_id: internalEventId,
      event_hash: eventHash,
      provider_event_id: webhookId,
      provider_event_type: eventType,
      received_at: receivedAt,
    };
    await env.CLOUT_NOTIFY_QUEUE.send(queueMessage, { contentType: "json" });
    await env.CLOUT_DB.prepare(
      `UPDATE webhook_receipts SET status = 'ENQUEUED', enqueued_at = ? WHERE event_hash = ?`,
    )
      .bind(nowIso(), eventHash)
      .run();
  } catch (error) {
    await env.CLOUT_DB.prepare(
      `UPDATE webhook_receipts SET status = 'RECEIVED' WHERE event_hash = ? AND status = 'ENQUEUEING'`,
    )
      .bind(eventHash)
      .run();
    throw error;
  }
  return jsonResponse(request, env, {
    accepted: true,
    event_id: internalEventId,
    payment_logic: "DISABLED_V0",
  }, 202);
}

async function handleStripeWebhook(request: Request, env: Env): Promise<Response> {
  const secret = (env as any).CLOUT_STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    throw new HttpError(503, "WEBHOOK_NOT_CONFIGURED", "Stripe payment webhooks are not configured in this environment");
  }
  const signatureHeader = request.headers.get("Stripe-Signature")?.trim() ?? "";
  if (!signatureHeader) {
    throw new HttpError(401, "WEBHOOK_SIGNATURE_REQUIRED", "Stripe-Signature header is required");
  }

  const signaturePairs = signatureHeader.split(",").reduce<Record<string, string>>((acc, item) => {
    const [k, v] = item.split("=", 2);
    if (k && v) acc[k.trim()] = v.trim();
    return acc;
  }, {});

  const timestamp = signaturePairs["t"];
  const signatureV1 = signaturePairs["v1"];
  if (!timestamp || !signatureV1) {
    throw new HttpError(400, "INVALID_WEBHOOK_SIGNATURE_HEADER", "Stripe-Signature format is invalid");
  }

  const timestampSeconds = Number(timestamp);
  if (!Number.isInteger(timestampSeconds) || Math.abs(Date.now() - timestampSeconds * 1_000) > 5 * 60 * 1_000) {
    throw new HttpError(401, "STALE_WEBHOOK", "Stripe webhook timestamp is outside the accepted window");
  }

  const { value, raw } = await readJsonBodyWithRaw(request);
  const payload = recordValue(value);
  const eventId = typeof payload.id === "string" ? payload.id.trim() : "";
  const eventType = typeof payload.type === "string" ? payload.type.trim() : "";

  if (!eventId || !eventType) {
    throw new HttpError(422, "INVALID_WEBHOOK_EVENT", "Stripe webhook event ID and type are required");
  }

  const expectedSignature = await webhookSignature(secret, `${timestamp}.${raw}`);
  if (!(await secureTokenEquals(signatureV1, expectedSignature))) {
    throw new HttpError(401, "INVALID_WEBHOOK_SIGNATURE", "Stripe webhook signature verification failed");
  }

  const receivedAt = nowIso();
  const eventHash = await sha256Hex(`stripe\n${eventId}\n${raw}`);
  const internalEventId = await createDeterministicId("evt", `stripe\n${eventHash}`);
  const metadata = canonicalJson({
    provider: "stripe",
    provider_event_id: eventId,
    provider_event_type: eventType,
    event_hash: eventHash,
    payment_status: eventType.includes("succeeded") ? "PAID" : "PENDING",
  });

  await env.CLOUT_DB.batch([
    env.CLOUT_DB.prepare(
      `INSERT OR IGNORE INTO webhook_receipts
        (event_hash, provider_event_id, provider_event_type, status, received_at)
       VALUES (?, ?, ?, 'RECEIVED', ?)`,
    ).bind(eventHash, eventId, eventType, receivedAt),
    env.CLOUT_DB.prepare(
      `INSERT OR IGNORE INTO events
        (id, event_type, actor_type, subject_type, subject_id, payload_hash, payload_json, created_at)
       VALUES (?, 'stripe.webhook_received', 'SYSTEM', 'stripe_webhook', ?, ?, ?, ?)`,
    ).bind(internalEventId, eventId, eventHash, metadata, receivedAt),
  ]);

  return jsonResponse(request, env, {
    accepted: true,
    event_id: internalEventId,
    provider: "stripe",
    provider_event_type: eventType,
  }, 202);
}


async function handleAnalyticsEvent(request: Request, env: Env): Promise<Response> {
  assertOriginAllowed(request, env);
  const analytics = validateCloutAnalyticsEvent(await readJsonBody(request));
  const receivedAt = nowIso();
  const suppliedEventId = analytics.event_id;
  const eventId = suppliedEventId
    ? await createDeterministicId("evt", `analytics\n${suppliedEventId}`)
    : `evt_${crypto.randomUUID()}`;
  const subjectId =
    analytics.properties.opp_hash ??
    analytics.properties.receipt_id ??
    analytics.properties.ccid ??
    eventId;
  const payload = {
    properties: analytics.properties,
    ...(analytics.occurred_at === undefined ? {} : { occurred_at: analytics.occurred_at }),
    ...(analytics.path === undefined ? {} : { path: analytics.path }),
    received_at: receivedAt,
  };
  const payloadJson = canonicalJson(payload);
  try {
    await env.CLOUT_DB.prepare(
      `INSERT INTO events
        (id, event_type, actor_type, subject_type, subject_id, payload_hash, payload_json, created_at)
       VALUES (?, ?, 'PUBLIC_USER', 'analytics_event', ?, ?, ?, ?)`,
    )
      .bind(eventId, analytics.name, subjectId, await sha256Hex(payloadJson), payloadJson, receivedAt)
      .run();
  } catch (error) {
    if (suppliedEventId) {
      const existing = await env.CLOUT_DB.prepare("SELECT id FROM events WHERE id = ? AND event_type = ?")
        .bind(eventId, analytics.name)
        .first<{ id: string }>();
      if (existing) return jsonResponse(request, env, { accepted: true, event_id: eventId, replayed: true }, 202);
    }
    throw error;
  }
  return jsonResponse(request, env, { accepted: true, event_id: eventId }, 202);
}

async function handleCrmTrialRequest(request: Request, env: Env): Promise<Response> {
  assertOriginAllowed(request, env);
  const input = validateCrmTrialRequest(await readJsonBody(request));
  const opportunity = await env.CLOUT_DB.prepare(
    `SELECT id, opp_hash, creator_type, status, is_demo
     FROM opportunities
     WHERE opp_hash = ? AND status = 'PUBLIC_RECEIPT_READY' AND is_demo = 0
     LIMIT 1`,
  )
    .bind(input.opp_hash)
    .first<Pick<OpportunityRow, "id" | "opp_hash" | "creator_type" | "status" | "is_demo">>();
  if (!opportunity || !["business", "agency"].includes(opportunity.creator_type)) {
    throw new HttpError(403, "CRM_TRIAL_NOT_ELIGIBLE", "This opportunity is not eligible for a CRM trial offer");
  }
  const idempotencyKey = validateIdempotencyKey(request.headers.get("Idempotency-Key"));
  const requestHash = await sha256Hex(canonicalJson(input));
  const offerId = await createDeterministicId("offer", `${opportunity.id}\ncrm-trial`);
  const claim = await claimIdempotency(
    env,
    `crm-trial:${input.opp_hash}`,
    idempotencyKey,
    requestHash,
    offerId,
  );
  if (!claim.proceed && claim.replay) return wrapReplay(request, env, claim.replay);
  try {
    const createdAt = claim.row.created_at;
    const clicked = 1;
    const started = input.action === "started" ? 1 : 0;
    const eventType = input.action === "started" ? "cc_crm_trial_started" : "cc_crm_trial_clicked";
    const trialEvent = await eventStatement(
      env,
      eventType,
      "PUBLIC_USER",
      "crm_trial_offer",
      offerId,
      {
        opp_hash: input.opp_hash,
        action: input.action,
        crm_trial_eligible: true,
      },
      createdAt,
    );
    const body = {
      offer_id: offerId,
      opp_hash: input.opp_hash,
      action: input.action,
      eligible: true,
      recorded_at: createdAt,
    };
    await env.CLOUT_DB.batch([
      env.CLOUT_DB.prepare(
        `INSERT INTO crm_trial_offers
          (id, opportunity_id, opp_hash, eligible, clicked, started,
           first_clicked_at, started_at, created_at, updated_at)
         VALUES (?, ?, ?, 1, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(opportunity_id) DO UPDATE SET
           clicked = 1,
           started = max(crm_trial_offers.started, excluded.started),
           first_clicked_at = coalesce(crm_trial_offers.first_clicked_at, excluded.first_clicked_at),
           started_at = coalesce(crm_trial_offers.started_at, excluded.started_at),
           updated_at = excluded.updated_at`,
      ).bind(
        offerId,
        opportunity.id,
        input.opp_hash,
        clicked,
        started,
        createdAt,
        started ? createdAt : null,
        createdAt,
        createdAt,
      ),
      trialEvent,
      completeIdempotencyStatement(env, claim.keyHash, body, 202),
    ]);
    return jsonResponse(request, env, body, 202);
  } catch (error) {
    await failIdempotency(env, claim.keyHash);
    throw error;
  }
}

async function processIngestMessage(message: Message<unknown>, env: Env): Promise<void> {
  if (!isIngestQueueMessage(message.body)) {
    log("error", "ingest_message_rejected", { message_id: message.id, reason: "INVALID_SCHEMA" });
    message.ack();
    return;
  }
  const payload = message.body;
  try {
    const opportunity = await env.CLOUT_DB.prepare("SELECT * FROM opportunities WHERE id = ? AND opp_hash = ?")
      .bind(payload.opportunity_id, payload.opp_hash)
      .first<OpportunityRow>();
    if (!opportunity) {
      log("error", "ingest_opportunity_missing", { message_id: message.id, opp_hash: payload.opp_hash });
      message.ack();
      return;
    }
    if (["QUEUED_FOR_MANUAL_REVIEW", "MANUAL_PACKAGE_DRAFTED", "PUBLIC_RECEIPT_READY"].includes(opportunity.status)) {
      message.ack();
      return;
    }
    if (opportunity.status !== "OPERATOR_REVIEW_REQUIRED") {
      log("warn", "ingest_state_not_advanceable", {
        message_id: message.id,
        opportunity_id: opportunity.id,
        status: opportunity.status,
      });
      message.ack();
      return;
    }
    const queuedAt = nowIso();
    const queuedEvent = await eventStatement(
      env,
      "opportunity.queued_for_manual_review",
      "SYSTEM",
      "opportunity",
      opportunity.id,
      {
        opp_hash: opportunity.opp_hash,
        status: "QUEUED_FOR_MANUAL_REVIEW",
        automation_state: "NOT_INVOKED",
      },
      queuedAt,
    );
    await env.CLOUT_DB.batch([
      env.CLOUT_DB.prepare(
        `UPDATE opportunities SET status = 'QUEUED_FOR_MANUAL_REVIEW', queued_at = ?
         WHERE id = ? AND status = 'OPERATOR_REVIEW_REQUIRED'`,
      ).bind(queuedAt, opportunity.id),
      queuedEvent,
    ]);
    log("info", "opportunity_queued_for_manual_review", {
      message_id: message.id,
      opportunity_id: opportunity.id,
      opp_hash: opportunity.opp_hash,
    });
    message.ack();
  } catch (error) {
    log("error", "ingest_processing_failed", {
      message_id: message.id,
      error_name: error instanceof Error ? error.name : "UnknownError",
    });
    message.retry();
  }
}

export class CreateOpportunityWorkflow extends WorkflowEntrypoint<Env, IngestQueueMessage> {
  override async run(
    event: Readonly<WorkflowEvent<IngestQueueMessage>>,
    step: WorkflowStep,
  ): Promise<Record<string, string>> {
    if (!isIngestQueueMessage(event.payload)) {
      throw new NonRetryableError("CreateOpportunityWorkflow received an invalid bounded message");
    }
    const message: IngestQueueMessage = {
      schema_version: event.payload.schema_version,
      opportunity_id: event.payload.opportunity_id,
      opp_hash: event.payload.opp_hash,
      requested_at: event.payload.requested_at,
    };
    return step.do(
      "enqueue operator review",
      {
        retries: { limit: 3, delay: "5 seconds", backoff: "exponential" },
        timeout: "30 seconds",
      },
      async () => {
        await this.env.CLOUT_INGEST_QUEUE.send(message, { contentType: "json" });
        return {
          workflow_instance_id: event.instanceId,
          opp_hash: message.opp_hash,
          status: "QUEUED_FOR_MANUAL_REVIEW",
        };
      },
    );
  }
}

async function routeRequest(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  if (request.method === "OPTIONS") {
    assertOriginAllowed(request, env);
    const headers = corsHeaders(request, env);
    headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Authorization,Content-Type,Idempotency-Key");
    headers.set("Access-Control-Max-Age", "600");
    return new Response(null, { status: 204, headers });
  }
  if (request.method === "GET" && url.pathname === "/health") {
    return jsonResponse(request, env, {
      ok: true,
      data: { service: "clout-chaser-v0-api", state: "READY_FOR_MANUAL_REVIEW_FLOW" },
    });
  }
  if (isSourceRoute(request.method, url.pathname)) {
    return handleSourceSubmission(request, env);
  }
  if (isOpportunityRoute(request.method, url.pathname)) {
    return handleOpportunityAlias(request, env);
  }
  if (isWhopWebhookRoute(request.method, url.pathname)) {
    return handleWhopWebhook(request, env);
  }
  if (isStripeWebhookRoute(request.method, url.pathname)) {
    return handleStripeWebhook(request, env);
  }
  if (request.method === "POST" && url.pathname === "/api/clout/events") {
    return handleAnalyticsEvent(request, env);
  }
  if (request.method === "POST" && url.pathname === "/api/clout/crm-trial") {
    return handleCrmTrialRequest(request, env);
  }
  const publicReceipt = url.pathname.match(/^\/api\/clout\/r\/([^/]+)$/u);
  if (request.method === "GET" && publicReceipt?.[1]) {
    return handlePublicReceipt(request, env, decodeURIComponent(publicReceipt[1]));
  }
  const receiptId = receiptIdFromRoute(request.method, url.pathname);
  if (receiptId) {
    return handleReceiptById(request, env, decodeURIComponent(receiptId));
  }
  const sharedOpportunityHash = opportunityHashFromShareRoute(request.method, url.pathname);
  if (sharedOpportunityHash) {
    return handlePublicReceipt(request, env, decodeURIComponent(sharedOpportunityHash).toUpperCase());
  }
  const privatePackage = url.pathname.match(/^\/api\/clout\/packages\/([^/]+)$/u);
  if (request.method === "GET" && privatePackage?.[1]) {
    return handlePrivatePackage(request, env, decodeURIComponent(privatePackage[1]));
  }
  if (request.method === "GET" && url.pathname === "/api/internal/opportunities") {
    return handleOperatorList(request, env);
  }
  if (request.method === "GET" && url.pathname === "/api/internal/operator/session") {
    return handleOperatorSession(request, env);
  }
  if (isPackageRoute(request.method, url.pathname)) {
    return handlePackageAlias(request, env);
  }
  if (isReceiptCreateRoute(request.method, url.pathname)) {
    return handleReceiptAlias(request, env);
  }
  if (isInternalApproveRoute(request.method, url.pathname)) {
    return handleInternalApproveAlias(request, env);
  }
  const compile = url.pathname.match(/^\/api\/internal\/opportunities\/([^/]+)\/compile$/u);
  if (request.method === "POST" && compile?.[1]) {
    return handleManualCompile(request, env, decodeURIComponent(compile[1]));
  }
  const approve = url.pathname.match(/^\/api\/internal\/opportunities\/([^/]+)\/approve$/u);
  if (request.method === "POST" && approve?.[1]) {
    return handleManualApprove(request, env, decodeURIComponent(approve[1]));
  }
  if (request.method === "GET" && url.pathname === "/api/trident/states") {
    const states = ["draft", "generated", "review_required", "approved", "issued", "held", "superseded", "archived"];
    return jsonResponse(request, env, { states });
  }
  if (request.method === "POST" && url.pathname === "/api/trident/validate-transition") {
    const body = await request.json() as { current_state: string; target_state: string };
    const outcome = validateTransition(body.current_state, body.target_state);
    return jsonResponse(request, env, outcome);
  }
  if (request.method === "POST" && url.pathname === "/api/trident/valid-transitions") {
    const body = await request.json() as { state: string };
    const transitions = validTransitions(body.state);
    return jsonResponse(request, env, { state: body.state, transitions });
  }
  if (request.method === "POST" && url.pathname === "/api/trident/validate-packet") {
    const body = await request.json();
    const result = validatePacket(body);
    return jsonResponse(request, env, result);
  }
  if (request.method === "POST" && url.pathname === "/api/trident/classify") {
    const body = await request.json() as { title: string; description: string };
    const classification = classifyPacket(body.title, body.description);
    return jsonResponse(request, env, { classification });
  }
  throw new HttpError(404, "ROUTE_NOT_FOUND", "Route not found");
}

export default {
  async fetch(request, env): Promise<Response> {
    const requestId = crypto.randomUUID();
    try {
      await initTrident();
      const response = await routeRequest(request, env);
      response.headers.set("X-Request-ID", requestId);
      return response;
    } catch (error) {
      log(error instanceof HttpError && error.status < 500 ? "warn" : "error", "http_request_failed", {
        request_id: requestId,
        method: request.method,
        path: new URL(request.url).pathname,
        error_code: error instanceof HttpError ? error.code : error instanceof InputValidationError ? "INVALID_REQUEST" : "INTERNAL_ERROR",
      });
      const response = errorResponse(request, env, requestId, error);
      response.headers.set("X-Request-ID", requestId);
      return response;
    }
  },

  async queue(batch, env): Promise<void> {
    await Promise.all(batch.messages.map((message) => processIngestMessage(message, env)));
  },
} satisfies ExportedHandler<Env, IngestQueueMessage>;
