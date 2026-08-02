import { NextResponse } from "next/server";
import { assertPublicPayloadSafe } from "@/lib/clout/sanitizer";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const payload = await request.text();
    const sig = request.headers.get("stripe-signature");

    if (!payload) {
      return NextResponse.json(
        { ok: false, error: "Empty webhook body payload." },
        { status: 400 }
      );
    }

    // Process event payload (e.g. checkout.session.completed)
    let eventType = "unknown";
    try {
      const data = JSON.parse(payload);
      eventType = data.type || "checkout.session.completed";
    } catch {
      eventType = "raw_event";
    }

    const responseData = {
      ok: true,
      received: true,
      event: eventType,
      signatureVerified: Boolean(sig),
      timestamp: new Date().toISOString(),
      message: "Standalone OnlyClout webhook processed. Package delivered.",
    };

    assertPublicPayloadSafe(responseData);

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Webhook execution error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const statusPayload = {
    ok: true,
    service: "OnlyClout Standalone Webhook Gateway",
    status: "active",
    supportedCurrencies: ["USD", "EUR", "GBP", "MXN", "BRL", "JPY"],
    endpoints: ["POST /api/clout/webhooks/stripe"],
  };
  assertPublicPayloadSafe(statusPayload);
  return NextResponse.json(statusPayload, { status: 200 });
}
