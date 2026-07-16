import { proxyCloutRequest } from "@/lib/clout/server-proxy";

export function POST(request: Request) {
  return proxyCloutRequest(request, "/api/clout/source", { maxBytes: 4_000_000 });
}
