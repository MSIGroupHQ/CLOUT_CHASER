export function isOpportunityRoute(method: string, pathname: string): boolean {
  return method === "POST" && (pathname === "/opportunity" || pathname === "/api/clout/opportunity");
}
