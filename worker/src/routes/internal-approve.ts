export function isInternalApproveRoute(method: string, pathname: string): boolean {
  return method === "POST" && pathname === "/internal/approve";
}
