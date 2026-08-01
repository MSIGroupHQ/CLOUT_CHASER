/**
 * OPENALEX OPEN SCIENCE CITATION COLLECTOR
 * Queries api.openalex.org for primary academic literature, paper citations, and author credentials
 * to ground Clout Chaser intelligence briefs in peer-reviewed scientific sources.
 */

export interface OpenAlexPaper {
  id: string;
  doi?: string;
  title: string;
  publicationYear: number;
  authors: string[];
  citedByCount: number;
  primaryConcept?: string;
  abstractSnippet?: string;
  landingPageUrl?: string;
}

export interface OpenAlexQueryResult {
  query: string;
  totalWorks: number;
  papers: OpenAlexPaper[];
  citationsFormattedText: string;
}

/**
 * Searches OpenAlex works API for top academic papers matching a topic query
 * @param query Search query string (e.g. "viral attention decay" or "machine learning optimization")
 * @param limit Maximum number of papers to return (default 3)
 */
export async function fetchOpenAlexCitations(
  query: string,
  limit: number = 3
): Promise<OpenAlexQueryResult> {
  const cleanQuery = encodeURIComponent(query.trim());
  const url = `https://api.openalex.org/works?search=${cleanQuery}&per_page=${limit}&sort=cited_by_count:desc`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "CloutChaser-ScienceEngine/1.0 (mailto:admin@msigroup.io)"
      }
    });

    if (!res.ok) {
      throw new Error(`OpenAlex API returned status ${res.status}`);
    }

    const data = (await res.json()) as any;
    const results = data.results || [];

    const papers: OpenAlexPaper[] = results.map((item: any) => {
      const authorships = item.authorships || [];
      const authorNames = authorships
        .slice(0, 3)
        .map((a: any) => a.author?.display_name || "Unknown Author");

      const primaryConcept = item.concepts?.[0]?.display_name ?? "General Science";
      const doi = item.doi ?? undefined;
      const landingPageUrl = doi ?? item.id;

      return {
        id: item.id,
        doi,
        title: item.title ?? "Untitled Scientific Work",
        publicationYear: item.publication_year ?? new Date().getFullYear(),
        authors: authorNames,
        citedByCount: item.cited_by_count ?? 0,
        primaryConcept,
        landingPageUrl
      };
    });

    const citationLines = papers.map((p, idx) => {
      const authorStr = p.authors.join(", ");
      return `${idx + 1}. "${p.title}" — ${authorStr} (${p.publicationYear}). Citations: ${p.citedByCount}. [Link: ${p.landingPageUrl}]`;
    });

    const citationsFormattedText = citationLines.join("\n");

    return {
      query,
      totalWorks: data.meta?.count ?? papers.length,
      papers,
      citationsFormattedText
    };
  } catch (err: any) {
    console.error("OpenAlex fetch error:", err);
    return {
      query,
      totalWorks: 0,
      papers: [],
      citationsFormattedText: "OpenAlex primary citation index unavailable."
    };
  }
}
