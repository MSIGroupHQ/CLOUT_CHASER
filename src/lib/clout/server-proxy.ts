import { NextResponse } from "next/server";

const FORWARDED_REQUEST_HEADERS = [
  "accept",
  "authorization",
  "content-type",
  "idempotency-key",
] as const;

function workerBase() {
  return (
    process.env.CLOUT_API_BASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_CLOUT_API_BASE_URL?.trim() ||
    ""
  ).replace(/\/+$/u, "");
}

function forwardedHeaders(request: Request) {
  const headers = new Headers();
  for (const name of FORWARDED_REQUEST_HEADERS) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  headers.set("x-clout-surface", "clout.prime88.studio");
  return headers;
}

export function validatedOpportunityId(value: string | null) {
  const normalized = value?.trim().toUpperCase() ?? "";
  return /^CC-[A-Z0-9-]{3,72}$/u.test(normalized) ? normalized : null;
}

export function validatedReceiptId(value: string | null) {
  const normalized = value?.trim() ?? "";
  return /^[A-Za-z0-9_-]{6,100}$/u.test(normalized) ? normalized : null;
}

export async function proxyCloutRequest(
  request: Request,
  path: string,
  options: { maxBytes?: number } = {},
) {
  const base = workerBase();
  if (!base) {
    return NextResponse.json(
      { error: "The Clout Chaser backend is not configured." },
      { status: 503 },
    );
  }

  const maxBytes = options.maxBytes ?? 2_000_000;
  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    return NextResponse.json(
      { error: "The request is larger than this endpoint accepts." },
      { status: 413 },
    );
  }

  const method = request.method.toUpperCase();
  const body = method === "GET" || method === "HEAD"
    ? undefined
    : await request.arrayBuffer();
  if (body && body.byteLength > maxBytes) {
    return NextResponse.json(
      { error: "The request is larger than this endpoint accepts." },
      { status: 413 },
    );
  }

  try {
    const upstream = await fetch(`${base}${path}`, {
      method,
      headers: forwardedHeaders(request),
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    const headers = new Headers();
    const contentType = upstream.headers.get("content-type");
    if (contentType) headers.set("content-type", contentType);
    headers.set("cache-control", "no-store");
    return new Response(upstream.body, { status: upstream.status, headers });
  } catch {
    return NextResponse.json(
      { error: "The Clout Chaser backend could not be reached." },
      { status: 502 },
    );
  }
}
