import { NextResponse } from "next/server";
import { proxyCloutRequest, validatedReceiptId } from "@/lib/clout/server-proxy";

export function POST(request: Request) {
  return proxyCloutRequest(request, "/api/clout/receipt");
}

export function GET(request: Request) {
  const receiptId = validatedReceiptId(new URL(request.url).searchParams.get("id"));
  return receiptId
    ? proxyCloutRequest(request, `/api/clout/receipts/${encodeURIComponent(receiptId)}`)
    : NextResponse.json({ error: "A valid receipt ID is required." }, { status: 400 });
}
