export function isPackageRoute(method: string, pathname: string): boolean {
  return method === "POST" && (pathname === "/package" || pathname === "/api/clout/package");
}
