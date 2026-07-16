export const SOURCE_PLATFORMS = ["tiktok", "reels", "shorts", "x", "youtube", "other"] as const;
export const CREATOR_TYPES = ["clipper", "creator", "fan_page", "business", "agency", "studio", "other"] as const;
export const LANGUAGE_MODES = ["en", "es", "bilingual"] as const;
export const SOURCE_TYPES = ["url", "mp4", "trend", "description"] as const;
export const PUBLIC_PLATFORM_LABELS = ["TikTok", "Reels", "Shorts", "X", "YouTube", "Other"] as const;
export const CLOUT_EVENT_NAMES = [
  "cc_landing_view",
  "cc_sample_requested",
  "cc_source_submitted",
  "cc_opportunity_created",
  "cc_package_compile_started",
  "cc_package_compiled",
  "cc_receipt_created",
  "cc_receipt_viewed",
  "cc_share_clicked",
  "cc_sample_cta_clicked",
  "cc_make_own_clicked",
  "cc_checkout_started",
  "cc_purchase_completed",
  "cc_crm_trial_clicked",
  "cc_crm_trial_started",
  "cc_export_created",
  "cc_package_feedback",
] as const;

export type SourcePlatform = (typeof SOURCE_PLATFORMS)[number];
export type CreatorType = (typeof CREATOR_TYPES)[number];
export type LanguageMode = (typeof LANGUAGE_MODES)[number];
export type SourceType = (typeof SOURCE_TYPES)[number];
export type PublicPlatformLabel = (typeof PUBLIC_PLATFORM_LABELS)[number];
export type CloutEventName = (typeof CLOUT_EVENT_NAMES)[number];

export interface SourceSubmission {
  name_or_handle: string;
  email: string;
  platform: SourcePlatform;
  creator_type: CreatorType;
  niche: string;
  language: LanguageMode;
  intent: string;
  source_type: SourceType;
  source_url?: string;
}

export interface CloutAnalyticsEvent {
  name: CloutEventName;
  properties: Record<string, string | boolean>;
  event_id?: string;
  occurred_at?: string;
  path?: string;
}

export interface IngestQueueMessage {
  schema_version: "clout.ingest.v1";
  opportunity_id: string;
  opp_hash: string;
  requested_at: string;
}

export interface CrmTrialRequest {
  opp_hash: string;
  action: "clicked" | "started";
}

export interface ManualCompileInput {
  title: string;
  why_now: string;
  hooks: string[];
  captions: string[];
  short_scripts: string[];
  clip_targets: string[];
  export_specs: string[];
  bilingual_variants: string[];
  source_notes: string[];
  risk_notes: string[];
  next_action: string;
}

export interface ManualApproveInput {
  package_id: string;
  public_title: string;
  why_now: string;
  platform_fit: PublicPlatformLabel[];
  language_lane: LanguageMode;
  source_notes: string[];
  risk_notes: string[];
}

export class InputValidationError extends Error {
  readonly issues: string[];

  constructor(issues: string[]) {
    super("Request validation failed");
    this.name = "InputValidationError";
    this.issues = issues;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function rejectUnknownKeys(value: Record<string, unknown>, allowed: readonly string[], issues: string[]): void {
  const allowedSet = new Set(allowed);
  for (const key of Object.keys(value)) {
    if (!allowedSet.has(key)) issues.push(`Unknown field: ${key}`);
  }
}

function normalizedString(
  value: unknown,
  field: string,
  min: number,
  max: number,
  issues: string[],
): string {
  if (typeof value !== "string") {
    issues.push(`${field} must be a string`);
    return "";
  }
  const normalized = value.normalize("NFKC").trim();
  if (normalized.length < min || normalized.length > max) {
    issues.push(`${field} must contain between ${min} and ${max} characters`);
  }
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/u.test(normalized)) {
    issues.push(`${field} contains prohibited control characters`);
  }
  return normalized;
}

function optionalNormalizedString(
  value: unknown,
  field: string,
  max: number,
  issues: string[],
): string | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  return normalizedString(value, field, 1, max, issues);
}

function enumValue<T extends readonly string[]>(
  value: unknown,
  field: string,
  choices: T,
  issues: string[],
): T[number] {
  if (typeof value !== "string" || !choices.includes(value)) {
    issues.push(`${field} must be one of: ${choices.join(", ")}`);
    return choices[0]!;
  }
  return value as T[number];
}

function stringArray(
  value: unknown,
  field: string,
  minItems: number,
  maxItems: number,
  maxItemLength: number,
  issues: string[],
): string[] {
  if (!Array.isArray(value)) {
    issues.push(`${field} must be an array`);
    return [];
  }
  if (value.length < minItems || value.length > maxItems) {
    issues.push(`${field} must contain between ${minItems} and ${maxItems} items`);
  }
  return value.map((item, index) => normalizedString(item, `${field}[${index}]`, 1, maxItemLength, issues));
}

export function validateSourceSubmission(value: unknown): SourceSubmission {
  const issues: string[] = [];
  if (!isRecord(value)) throw new InputValidationError(["Body must be a JSON object"]);
  rejectUnknownKeys(
    value,
    [
      "name_or_handle",
      "email",
      "platform",
      "creator_type",
      "niche",
      "source_url",
      "source_type",
      "language",
      "intent",
    ],
    issues,
  );

  const nameOrHandle = normalizedString(value.name_or_handle, "name_or_handle", 1, 80, issues);
  const email = normalizedString(value.email, "email", 3, 254, issues).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email)) issues.push("email must be a valid address");
  const niche = normalizedString(value.niche, "niche", 2, 120, issues);
  const intent = normalizedString(value.intent, "intent", 3, 600, issues);
  const sourceUrl = optionalNormalizedString(value.source_url, "source_url", 2048, issues);
  if (sourceUrl !== undefined) {
    try {
      const parsed = new URL(sourceUrl);
      if (parsed.protocol !== "https:") issues.push("source_url must use HTTPS");
      if (!parsed.hostname || parsed.username || parsed.password) issues.push("source_url must be a public HTTPS URL without credentials");
    } catch {
      issues.push("source_url must be a valid URL");
    }
  }

  const platform = enumValue(value.platform, "platform", SOURCE_PLATFORMS, issues);
  const creatorType = enumValue(value.creator_type, "creator_type", CREATOR_TYPES, issues);
  const language = enumValue(value.language, "language", LANGUAGE_MODES, issues);
  const inferredSourceType = sourceUrl === undefined ? "description" : "url";
  const sourceType = enumValue(value.source_type ?? inferredSourceType, "source_type", SOURCE_TYPES, issues);
  if (sourceType === "url" && sourceUrl === undefined) issues.push("source_url is required when source_type is url");
  if (sourceType === "mp4" && sourceUrl !== undefined) issues.push("source_url is not accepted when source_type is mp4");

  if (issues.length > 0) throw new InputValidationError(issues);
  return {
    name_or_handle: nameOrHandle,
    email,
    platform,
    creator_type: creatorType,
    niche,
    language,
    intent,
    source_type: sourceType,
    ...(sourceUrl === undefined ? {} : { source_url: sourceUrl }),
  };
}

const EVENT_STRING_FIELDS = new Set([
  "opp_hash",
  "ccid",
  "receipt_id",
  "source_type",
  "niche",
  "platform",
  "language",
  "persona",
  "score_band",
  "saturation_state",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "ref",
  "company_id",
  "offer_id",
  "experiment_variant",
]);
const EVENT_BOOLEAN_FIELDS = new Set(["crm_trial_eligible", "authenticated"]);

export function validateCloutAnalyticsEvent(value: unknown): CloutAnalyticsEvent {
  const issues: string[] = [];
  if (!isRecord(value)) throw new InputValidationError(["Body must be a JSON object"]);
  rejectUnknownKeys(value, ["name", "event_type", "properties", "event_id", "occurred_at", "path"], issues);
  const rawName = value.name ?? value.event_type;
  const name = enumValue(rawName, "name", CLOUT_EVENT_NAMES, issues);
  if (value.name !== undefined && value.event_type !== undefined && value.name !== value.event_type) {
    issues.push("name and event_type must match when both are present");
  }
  const eventId = optionalNormalizedString(value.event_id, "event_id", 128, issues);
  const occurredAt = optionalNormalizedString(value.occurred_at, "occurred_at", 40, issues);
  if (occurredAt !== undefined && Number.isNaN(Date.parse(occurredAt))) issues.push("occurred_at must be an ISO-8601 timestamp");
  const path = optionalNormalizedString(value.path, "path", 512, issues);
  if (path !== undefined && (!path.startsWith("/") || path.includes("?") || path.includes("#"))) {
    issues.push("path must be a pathname beginning with / and must not contain a query or fragment");
  }
  if (!isRecord(value.properties)) {
    issues.push("properties must be an object");
  }
  const properties: Record<string, string | boolean> = {};
  if (isRecord(value.properties)) {
    for (const [key, propertyValue] of Object.entries(value.properties)) {
      if (EVENT_STRING_FIELDS.has(key)) {
        properties[key] = normalizedString(propertyValue, `properties.${key}`, 1, key === "niche" ? 120 : 160, issues);
      } else if (EVENT_BOOLEAN_FIELDS.has(key)) {
        if (typeof propertyValue !== "boolean") issues.push(`properties.${key} must be a boolean`);
        else properties[key] = propertyValue;
      } else {
        issues.push(`Unknown analytics property: ${key}`);
      }
    }
  }
  if (issues.length > 0) throw new InputValidationError(issues);
  return {
    name,
    properties,
    ...(eventId === undefined ? {} : { event_id: eventId }),
    ...(occurredAt === undefined ? {} : { occurred_at: occurredAt }),
    ...(path === undefined ? {} : { path }),
  };
}

export function isIngestQueueMessage(value: unknown): value is IngestQueueMessage {
  if (!isRecord(value)) return false;
  const keys = Object.keys(value).sort();
  if (keys.join("|") !== "opp_hash|opportunity_id|requested_at|schema_version") return false;
  return (
    value.schema_version === "clout.ingest.v1" &&
    typeof value.opportunity_id === "string" &&
    /^opp_[0-9a-f]{24}$/u.test(value.opportunity_id) &&
    typeof value.opp_hash === "string" &&
    isOpportunityHash(value.opp_hash) &&
    typeof value.requested_at === "string" &&
    !Number.isNaN(Date.parse(value.requested_at))
  );
}

export function validateCrmTrialRequest(value: unknown): CrmTrialRequest {
  const issues: string[] = [];
  if (!isRecord(value)) throw new InputValidationError(["Body must be a JSON object"]);
  rejectUnknownKeys(value, ["opp_hash", "action"], issues);
  const oppHash = normalizedString(value.opp_hash, "opp_hash", 12, 32, issues).toUpperCase();
  if (!isOpportunityHash(oppHash)) issues.push("opp_hash must be a valid Clout Chaser opportunity hash");
  const action = enumValue(value.action, "action", ["clicked", "started"] as const, issues);
  if (issues.length > 0) throw new InputValidationError(issues);
  return { opp_hash: oppHash, action };
}

export function validateManualCompileInput(value: unknown): ManualCompileInput {
  const issues: string[] = [];
  if (!isRecord(value)) throw new InputValidationError(["Body must be a JSON object"]);
  rejectUnknownKeys(
    value,
    [
      "title",
      "why_now",
      "hooks",
      "captions",
      "short_scripts",
      "clip_targets",
      "export_specs",
      "bilingual_variants",
      "source_notes",
      "risk_notes",
      "next_action",
    ],
    issues,
  );

  const result: ManualCompileInput = {
    title: normalizedString(value.title, "title", 3, 160, issues),
    why_now: normalizedString(value.why_now, "why_now", 10, 1000, issues),
    hooks: stringArray(value.hooks, "hooks", 1, 10, 300, issues),
    captions: stringArray(value.captions, "captions", 1, 10, 1200, issues),
    short_scripts: stringArray(value.short_scripts, "short_scripts", 0, 3, 4000, issues),
    clip_targets: stringArray(value.clip_targets, "clip_targets", 0, 10, 500, issues),
    export_specs: stringArray(value.export_specs, "export_specs", 1, 10, 1000, issues),
    bilingual_variants: stringArray(value.bilingual_variants, "bilingual_variants", 0, 10, 1200, issues),
    source_notes: stringArray(value.source_notes, "source_notes", 1, 10, 1000, issues),
    risk_notes: stringArray(value.risk_notes, "risk_notes", 1, 10, 1000, issues),
    next_action: normalizedString(value.next_action, "next_action", 3, 500, issues),
  };
  if (issues.length > 0) throw new InputValidationError(issues);
  return result;
}

export function validateManualApproveInput(value: unknown): ManualApproveInput {
  const issues: string[] = [];
  if (!isRecord(value)) throw new InputValidationError(["Body must be a JSON object"]);
  rejectUnknownKeys(
    value,
    ["package_id", "public_title", "why_now", "platform_fit", "language_lane", "source_notes", "risk_notes"],
    issues,
  );
  const platformFitRaw = value.platform_fit;
  const platformFit = stringArray(platformFitRaw, "platform_fit", 1, 6, 20, issues);
  for (const platform of platformFit) {
    if (!PUBLIC_PLATFORM_LABELS.includes(platform as PublicPlatformLabel)) {
      issues.push(`platform_fit contains unsupported value: ${platform}`);
    }
  }
  const result: ManualApproveInput = {
    package_id: normalizedString(value.package_id, "package_id", 8, 80, issues),
    public_title: normalizedString(value.public_title, "public_title", 3, 160, issues),
    why_now: normalizedString(value.why_now, "why_now", 10, 800, issues),
    platform_fit: platformFit as PublicPlatformLabel[],
    language_lane: enumValue(value.language_lane, "language_lane", LANGUAGE_MODES, issues),
    source_notes: stringArray(value.source_notes, "source_notes", 1, 5, 500, issues),
    risk_notes: stringArray(value.risk_notes, "risk_notes", 1, 5, 500, issues),
  };
  if (issues.length > 0) throw new InputValidationError(issues);
  return result;
}

export function validateIdempotencyKey(value: string | null): string {
  if (value === null || value.length < 8 || value.length > 128 || !/^[A-Za-z0-9._:-]+$/u.test(value)) {
    throw new InputValidationError([
      "Idempotency-Key must contain 8 to 128 letters, numbers, periods, underscores, colons, or hyphens",
    ]);
  }
  return value;
}

export function canonicalJson(value: unknown): string {
  if (value === null || typeof value === "boolean" || typeof value === "number" || typeof value === "string") {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map((item) => canonicalJson(item)).join(",")}]`;
  if (isRecord(value)) {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`)
      .join(",")}}`;
  }
  throw new TypeError("Canonical JSON supports only JSON values");
}

export async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function sha256ArrayBufferHex(value: ArrayBuffer): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", value);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/gu, "-").replace(/\//gu, "_").replace(/=+$/u, "");
}

export function createDeliveryToken(randomBytes?: Uint8Array): string {
  const bytes = randomBytes === undefined
    ? crypto.getRandomValues(new Uint8Array(32))
    : new Uint8Array(randomBytes);
  if (bytes.byteLength !== 32) {
    throw new InputValidationError(["Delivery token entropy must contain exactly 32 bytes"]);
  }
  return `ccpkg_${bytesToBase64Url(bytes)}`;
}

export function isDeliveryToken(value: string): boolean {
  return /^ccpkg_[A-Za-z0-9_-]{43}$/u.test(value);
}

export function deliveryTokenFromAuthorization(value: string | null): string | null {
  if (value === null) return null;
  const match = /^Bearer (ccpkg_[A-Za-z0-9_-]{43})$/u.exec(value);
  return match?.[1] ?? null;
}

export async function hashDeliveryToken(value: string): Promise<string> {
  if (!isDeliveryToken(value)) {
    throw new InputValidationError(["Delivery token is invalid"]);
  }
  return sha256Hex(value);
}

export interface OpportunityHashInput {
  sourceUrl?: string;
  niche?: string;
  platform?: string;
  languageMode?: string;
  packageType?: string;
  dateBucket?: string;
}

export async function createOpportunityHash(input: OpportunityHashInput): Promise<string> {
  const canonical = [
    input.sourceUrl ?? "",
    input.niche ?? "",
    input.platform ?? "",
    input.languageMode ?? "",
    input.packageType ?? "sample",
    input.dateBucket ?? new Date().toISOString().slice(0, 10),
  ]
    .map((value) => value.trim().toLowerCase())
    .join("|");
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(canonical));
  const hex = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
  const short = hex.slice(0, 7).toUpperCase();
  const niche = input.niche?.toLowerCase() ?? "";
  const prefix = niche.includes("drake")
    ? "DRK"
    : niche.includes("car")
      ? "MOTO"
      : niche.includes("ice")
        ? "ICE"
        : "SIG";
  return `CC-${prefix}-${short}`;
}

export async function createDeterministicId(prefix: string, seed: string): Promise<string> {
  return `${prefix}_${(await sha256Hex(seed)).slice(0, 24)}`;
}

export function isOpportunityHash(value: string): boolean {
  return (
    /^CC-(?:DRK|MOTO|ICE|SIG)-[0-9A-F]{7}$/u.test(value) ||
    /^CC-[A-Z0-9]{4}-[A-Z2-7]{4,10}$/u.test(value)
  );
}
