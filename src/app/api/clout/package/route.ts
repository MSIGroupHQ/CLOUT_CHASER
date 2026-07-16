import { proxyCloutRequest } from "@/lib/clout/server-proxy";

export function POST(request: Request) {
  return proxyCloutRequest(request, "/api/clout/package");
}
