import { NextResponse } from "next/server";
import { proxyCloutRequest, validatedOpportunityId } from "@/lib/clout/server-proxy";

export function GET(request: Request) {
  const opportunityId = validatedOpportunityId(
    new URL(request.url).searchParams.get("opp_hash"),
  );
  return opportunityId
    ? proxyCloutRequest(request, `/api/clout/r/${encodeURIComponent(opportunityId)}`)
    : NextResponse.json({ error: "A valid Opportunity ID is required." }, { status: 400 });
}
