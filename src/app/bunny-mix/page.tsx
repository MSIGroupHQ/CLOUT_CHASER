import MixPage, { metadata } from "../mix/page";
import { assertPublicRouteSafe } from "@/lib/clout/public-route-safety";

export { metadata };

export default function BunnyMixPage() {
  assertPublicRouteSafe("/bunny-mix", { aliasOf: "/mix" });
  return <MixPage />;
}

