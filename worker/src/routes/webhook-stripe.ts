export function isStripeWebhookRoute(method: string, pathname: string): boolean {
  return method === "POST" && pathname === "/webhooks/stripe";
}
