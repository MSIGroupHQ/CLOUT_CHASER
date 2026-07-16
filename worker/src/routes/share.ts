export function opportunityHashFromShareRoute(method: string, pathname: string): string | null {
  if (method !== "GET") return null;
  return /^\/(?:share|api\/clout\/share)\/([^/]+)$/u.exec(pathname)?.[1] ?? null;
}
