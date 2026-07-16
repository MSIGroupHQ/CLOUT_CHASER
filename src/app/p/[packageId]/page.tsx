import type { Metadata } from "next";
import { PrivatePackageView } from "@/components/private-package-view";
import { TokenScrubber } from "@/components/token-scrubber";
import { getPrivatePackage } from "@/lib/clout/api";
import type { ApiResult, PrivatePackage } from "@/lib/clout/types";

export const metadata: Metadata = {
  title: "Private package delivery",
  description: "Authorized Clout Chaser package delivery.",
  robots: { index: false, follow: false, noarchive: true, noimageindex: true },
  referrer: "no-referrer",
};

export default async function PackagePage({
  params,
  searchParams,
}: {
  params: Promise<{ packageId: string }>;
  searchParams: Promise<{ token?: string | string[] }>;
}) {
  const { packageId } = await params;
  const query = await searchParams;
  const token = typeof query.token === "string" ? query.token.trim() : "";
  const result: ApiResult<PrivatePackage> = token
    ? await getPrivatePackage(packageId, token)
    : { ok: false, kind: "unauthorized", message: "This private package requires an authorized delivery link." };
  return (
    <main className="subpage-main private-package-page">
      {token ? <TokenScrubber /> : null}
      <PrivatePackageView packageId={packageId} result={result} />
    </main>
  );
}
