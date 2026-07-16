export function isReceiptCreateRoute(method: string, pathname: string): boolean {
  return method === "POST" && (pathname === "/receipt" || pathname === "/api/clout/receipt");
}

export function receiptIdFromRoute(method: string, pathname: string): string | null {
  if (method !== "GET") return null;
  return /^\/(?:receipt|api\/clout\/receipts)\/([^/]+)$/u.exec(pathname)?.[1] ?? null;
}
