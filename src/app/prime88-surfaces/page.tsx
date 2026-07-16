import type { Metadata } from "next";
import {
  PRIME88_SURFACES_COPY,
  Prime88Surfaces,
  prime88SurfaceCards,
} from "@/components/clout/Prime88Surfaces";
import { assertPublicRouteSafe } from "@/lib/clout/public-route-safety";

export const metadata: Metadata = {
  title: "Prime 88 operating surfaces",
  description: "Public-facing operating surfaces launched from Prime 88.",
};

export default function Prime88SurfacesPage() {
  assertPublicRouteSafe("/prime88-surfaces", {
    metadata,
    copy: PRIME88_SURFACES_COPY,
    cards: prime88SurfaceCards.map(({ title, body }) => ({ title, body })),
  });
  return (
    <main className="subpage-main">
      <section className="section-shell prime88-surfaces-page">
        <Prime88Surfaces />
      </section>
    </main>
  );
}
