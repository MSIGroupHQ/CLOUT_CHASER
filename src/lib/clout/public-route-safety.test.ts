import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { assertPublicRouteSafe } from "./public-route-safety";

const appRoot = new URL("../../app/", import.meta.url);
const nonPublicPages = new Set([
  "internal/clout-desk/page.tsx",
  "p/[packageId]/page.tsx",
]);

function findPageSources(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return findPageSources(path);
    return entry.name === "page.tsx" ? [path] : [];
  });
}

describe("public route safety boundary", () => {
  it("rejects forbidden copy at the route render boundary", () => {
    expect(() =>
      assertPublicRouteSafe("/sample", { heading: "private kernel" }),
    ).toThrow("Public copy contains forbidden internal terms");
  });

  it("is invoked explicitly by every public page source", () => {
    const rootPath = appRoot.pathname.replace(/^\/(?:[A-Za-z]:)/u, (match) => match.slice(1));
    const publicPages = findPageSources(rootPath).filter((path) => {
      const routePath = relative(rootPath, path).replaceAll("\\", "/");
      return !nonPublicPages.has(routePath);
    });

    expect(publicPages.length).toBeGreaterThan(0);
    for (const page of publicPages) {
      const source = readFileSync(page, "utf8");
      expect(source, relative(rootPath, page)).toContain("assertPublicRouteSafe(");
    }
  });

  it("guards the public not-found surface", () => {
    const rootPath = appRoot.pathname.replace(/^\/(?:[A-Za-z]:)/u, (match) => match.slice(1));
    const source = readFileSync(join(rootPath, "not-found.tsx"), "utf8");
    expect(source).toContain("assertPublicRouteSafe(");
  });
});
