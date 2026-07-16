export function isWhopWebhookRoute(method: string, pathname: string): boolean {
  return method === "POST" && pathname === "/webhooks/whop";
}
