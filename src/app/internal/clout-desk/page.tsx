import type { Metadata } from "next";
import { OperatorDesk } from "@/components/operator-desk";

export const metadata: Metadata = {
  title: "Clout Desk",
  robots: { index: false, follow: false, noarchive: true, noimageindex: true },
};

export default function CloutDeskPage() {
  return (
    <main className="subpage-main internal-main">
      <div className="section-shell">
        <OperatorDesk />
      </div>
    </main>
  );
}

