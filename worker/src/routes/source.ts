export function isSourceRoute(method: string, pathname: string): boolean {
  return method === "POST" && (pathname === "/source" || pathname === "/api/clout/source");
}
