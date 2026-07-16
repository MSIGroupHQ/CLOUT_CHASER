import type {
  ApiResult,
  ManualPackageInput,
  OperatorOpportunity,
  PrivatePackage,
  PublicReceipt,
  ReceiptLookup,
  SampleRequest,
  SampleSubmission,
} from "./types";

function apiBase() {
  return process.env.NEXT_PUBLIC_CLOUT_API_BASE_URL?.trim().replace(/\/+$/, "");
}

export function hasCloutApi() {
  return Boolean(apiBase());
}

function endpoint(path: string) {
  const base = apiBase();
  return base ? `${base}${path.startsWith("/") ? path : `/${path}`}` : null;
}

function recordValue(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function stringValue(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function stringList(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

async function responseMessage(response: Response) {
  try {
    const body = (await response.json()) as { error?: string; message?: string };
    return body.error || body.message || `Request failed with ${response.status}`;
  } catch {
    return `Request failed with ${response.status}`;
  }
}

function failureKind(status: number) {
  if (status === 401 || status === 403) return "unauthorized" as const;
  if (status === 404) return "not_found" as const;
  return "server" as const;
}

export async function submitSampleRequest(
  request: SampleRequest,
  sourceFile?: File,
): Promise<ApiResult<SampleSubmission>> {
  const url = endpoint("/api/clout/source");
  if (!url) {
    return {
      ok: false,
      kind: "not_configured",
      message: "The live intake rail is not connected yet. Nothing was sent.",
    };
  }

  try {
    const body = sourceFile
      ? (() => {
          const form = new FormData();
          form.set("request", JSON.stringify(request));
          form.set("source_file", sourceFile);
          return form;
        })()
      : JSON.stringify(request);
    const response = await fetch(url, {
      method: "POST",
      body,
      headers: {
        Accept: "application/json",
        ...(sourceFile ? {} : { "Content-Type": "application/json" }),
      },
    });
    if (!response.ok) {
      return {
        ok: false,
        kind: failureKind(response.status),
        status: response.status,
        message: await responseMessage(response),
      };
    }

    const data = (await response.json()) as SampleSubmission;
    if (!data.request_id && !data.opp_hash && !data.ccid) {
      return {
        ok: false,
        kind: "invalid_response",
        message: "The intake response did not include a request record.",
      };
    }
    return { ok: true, data };
  } catch {
    return {
      ok: false,
      kind: "network",
      message: "The intake rail could not be reached. Nothing was confirmed.",
    };
  }
}

function normalizeReceipt(input: Partial<PublicReceipt>, oppHash: string): PublicReceipt | null {
  if (
    !input.receiptId ||
    !input.title ||
    !input.whyNow ||
    !Array.isArray(input.platforms) ||
    !Array.isArray(input.packagePreview) ||
    !input.createdAt
  ) {
    return null;
  }

  return {
    oppHash,
    receiptId: input.receiptId,
    title: input.title,
    entity: input.entity,
    lane: input.lane,
    score: input.score,
    recommendation: input.recommendation,
    whyNow: input.whyNow,
    platforms: input.platforms,
    languageLane: input.languageLane || "Not stated",
    packagePreview: input.packagePreview,
    hook: input.hook,
    caption: input.caption,
    script: input.script,
    titleOptions: input.titleOptions,
    carouselOutline: input.carouselOutline,
    exportSpecs: input.exportSpecs,
    recommendedFormats: input.recommendedFormats,
    sourceNote: input.sourceNote || "No public source note was provided.",
    riskNote: input.riskNote || "Review source rights before publishing.",
    createdAt: input.createdAt,
    scoreBand: input.scoreBand,
    crmTrialEligible: Boolean(input.crmTrialEligible),
    mode: "live",
  };
}

export async function getLivePublicReceipt(oppHash: string): Promise<ReceiptLookup> {
  const normalizedHash = oppHash.trim().toUpperCase();
  const url = endpoint(`/api/clout/r/${encodeURIComponent(normalizedHash)}`);
  if (!url) return { state: "pending", receipt: null };

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (response.status === 404) return { state: "not_found", receipt: null };
    if (!response.ok) return { state: "unavailable", receipt: null };

    const receipt = normalizeReceipt(
      (await response.json()) as Partial<PublicReceipt>,
      normalizedHash,
    );
    return receipt
      ? { state: "ready", receipt }
      : { state: "unavailable", receipt: null };
  } catch {
    return { state: "unavailable", receipt: null };
  }
}

async function operatorRequest<T>(
  path: string,
  token: string,
  init: RequestInit = {},
): Promise<ApiResult<T>> {
  const url = endpoint(path);
  if (!url) {
    return {
      ok: false,
      kind: "not_configured",
      message: "The operator API is not configured. Access remains closed.",
    };
  }

  try {
    const response = await fetch(url, {
      ...init,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...(init.body ? { "Content-Type": "application/json" } : {}),
        ...init.headers,
      },
      cache: "no-store",
    });
    if (!response.ok) {
      return {
        ok: false,
        kind: failureKind(response.status),
        status: response.status,
        message: await responseMessage(response),
      };
    }
    return { ok: true, data: (await response.json()) as T };
  } catch {
    return {
      ok: false,
      kind: "network",
      message: "The operator API could not be reached. Access remains closed.",
    };
  }
}

export function verifyOperatorToken(token: string) {
  return operatorRequest<{ authorized: true; operator?: string }>(
    "/api/internal/operator/session",
    token,
  );
}

export async function getOperatorQueue(token: string): Promise<ApiResult<OperatorOpportunity[]>> {
  const result = await operatorRequest<unknown>("/api/internal/opportunities?limit=25", token);
  if (!result.ok) return result;

  const envelope = recordValue(result.data);
  const data = recordValue(envelope?.data) ?? envelope;
  const opportunities = data?.opportunities;
  if (!Array.isArray(opportunities)) {
    return {
      ok: false,
      kind: "invalid_response",
      message: "The operator queue response did not include an opportunities list.",
    };
  }
  return { ok: true, data: opportunities as OperatorOpportunity[] };
}

export function compileOperatorPackage(
  token: string,
  payload: { opp_hash: string; package_type: string; package: ManualPackageInput },
) {
  return operatorRequest<{ package_id: string; status: string }>(
    "/api/clout/package",
    token,
    {
      method: "POST",
      body: JSON.stringify({
        opp_hash: payload.opp_hash,
        package_type: payload.package_type,
        operator_note: JSON.stringify(payload.package),
      }),
    },
  );
}

export function issueOperatorReceipt(
  token: string,
  payload: { opp_hash: string; package_id: string },
) {
  return operatorRequest<{
    receipt_id: string;
    public_url?: string;
    status: string;
    delivery_token?: string;
    private_package_url?: string;
    delivery_token_expires_at?: string;
  }>(
    "/api/clout/receipt",
    token,
    { method: "POST", body: JSON.stringify(payload) },
  );
}

function normalizePrivatePackage(input: unknown, packageId: string): PrivatePackage | null {
  const envelope = recordValue(input);
  const data = recordValue(envelope?.data) ?? envelope;
  const packageRecord = recordValue(data?.package) ?? data;
  if (!packageRecord) return null;

  const normalizedPackageId = stringValue(data?.package_id, stringValue(packageRecord.package_id, packageId));
  const opportunity = recordValue(data?.opportunity);
  const receipt = recordValue(data?.receipt);
  const opportunityHash = stringValue(
    data?.opp_hash,
    stringValue(opportunity?.opp_hash, stringValue(packageRecord.opp_hash)),
  ).toUpperCase();
  const title = stringValue(packageRecord.title, stringValue(data?.title));
  const whyNow = stringValue(packageRecord.why_now, stringValue(data?.why_now));

  if (normalizedPackageId !== packageId || !opportunityHash || !title || !whyNow) return null;
  return {
    packageId: normalizedPackageId,
    opportunityHash,
    status: stringValue(data?.status, "PRIVATE_READY"),
    title,
    whyNow,
    packageType: stringValue(data?.package_type, stringValue(packageRecord.package_type)) || undefined,
    recommendedAction: stringValue(packageRecord.next_action, "Review the package before publishing."),
    primaryPlatform: stringValue(data?.primary_platform) || undefined,
    secondaryPlatforms: stringList(data?.secondary_platforms),
    language: stringValue(data?.language) || undefined,
    contentType: stringValue(data?.content_type) || undefined,
    hooks: stringList(packageRecord.hooks),
    captions: stringList(packageRecord.captions),
    scripts: stringList(packageRecord.short_scripts ?? packageRecord.scripts),
    clipTargets: stringList(packageRecord.clip_targets),
    exportSpecs: stringList(packageRecord.export_specs),
    bilingualVariants: stringList(packageRecord.bilingual_variants),
    sourceNotes: stringList(packageRecord.source_notes),
    riskNotes: stringList(packageRecord.risk_notes),
    receiptId: stringValue(data?.receipt_id, stringValue(receipt?.receipt_id)) || undefined,
  };
}

export async function getPrivatePackage(
  packageId: string,
  token: string,
): Promise<ApiResult<PrivatePackage>> {
  const normalizedId = packageId.trim();
  const normalizedToken = token.trim();
  if (!normalizedId || !normalizedToken) {
    return { ok: false, kind: "unauthorized", message: "An authorized package link is required." };
  }
  const url = endpoint(
    `/api/clout/packages/${encodeURIComponent(normalizedId)}`,
  );
  if (!url) {
    return {
      ok: false,
      kind: "not_configured",
      message: "Private package delivery is not connected in this build.",
    };
  }

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json", Authorization: `Bearer ${normalizedToken}` },
      cache: "no-store",
    });
    if (!response.ok) {
      return {
        ok: false,
        kind: failureKind(response.status),
        status: response.status,
        message: response.status === 401 || response.status === 403
          ? "This package link is not authorized."
          : await responseMessage(response),
      };
    }
    const packageRecord = normalizePrivatePackage(await response.json(), normalizedId);
    return packageRecord
      ? { ok: true, data: packageRecord }
      : { ok: false, kind: "invalid_response", message: "The private package response was incomplete." };
  } catch {
    return { ok: false, kind: "network", message: "The private package could not be verified right now." };
  }
}

export async function recordCrmTrialIntent(payload: {
  opp_hash: string;
  action: "clicked" | "started";
}): Promise<ApiResult<{ accepted?: boolean; event_id?: string }>> {
  const url = endpoint("/api/clout/crm-trial");
  if (!url) {
    return { ok: false, kind: "not_configured", message: "The trial receipt endpoint is not connected." };
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Idempotency-Key": `crm:${payload.action}:${crypto.randomUUID()}`,
      },
      body: JSON.stringify({
        opp_hash: payload.opp_hash.slice(0, 80),
        action: payload.action,
      }),
      keepalive: true,
    });
    if (!response.ok) {
      return { ok: false, kind: failureKind(response.status), status: response.status, message: await responseMessage(response) };
    }
    return { ok: true, data: await response.json() as { accepted?: boolean; event_id?: string } };
  } catch {
    return { ok: false, kind: "network", message: "The trial receipt attempt could not be confirmed." };
  }
}
