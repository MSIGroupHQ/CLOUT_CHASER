import { assertPublicSafe } from "./sanitizer";

/**
 * Server-render boundary for route-owned public copy.
 *
 * Public page modules call this during render with the route pattern and the
 * exact copy/data payload they are about to expose. Dynamic public payloads
 * still keep their narrower receipt/package assertions at their data boundary.
 */
export function assertPublicRouteSafe<T>(route: string, payload: T): T {
  assertPublicSafe(route);
  assertPublicSafe(JSON.stringify(payload) ?? "");
  return payload;
}
