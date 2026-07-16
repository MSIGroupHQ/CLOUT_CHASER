import Link from "next/link";
import { assertPublicRouteSafe } from "@/lib/clout/public-route-safety";

export default function NotFound() {
  assertPublicRouteSafe("/_not-found", [
    "404 / outside the signal",
    "This surface does not exist.",
    "Return to the opportunity layer or send a source for a free content package.",
    "Return home",
    "Get a free sample",
  ]);
  return (
    <main className="subpage-main receipt-page">
      <section className="receipt-unavailable section-shell">
        <span className="eyebrow">404 / outside the signal</span>
        <h1>This surface does not exist.</h1>
        <p>Return to the opportunity layer or send a source for a free content package.</p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/">Return home</Link>
          <Link className="button button-secondary" href="/sample">Get a free sample</Link>
        </div>
      </section>
    </main>
  );
}
