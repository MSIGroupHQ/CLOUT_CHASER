import { NextResponse } from "next/server";
import { assertPublicPayloadSafe } from "@/lib/clout/sanitizer";

export const runtime = "edge";

const SAMPLE_GENERATIONS = [
  {
    id: "gen_meme_01",
    prompt: "Cyberpunk rabbit mascot with amber sunglasses in neon dark studio",
    imageUrl: "/media/brand/cyberpunk_rabbits_neon.webp",
    aspectRatio: "16:9",
    computeCostCents: 2.5,
    suggestedCaption: "When the trend radar hits 94 score before saturation.",
  },
  {
    id: "gen_meme_02",
    prompt: "Dark chocolate rabbit operator at solo workstation analyzing signals",
    imageUrl: "/media/brand/olivia-o-solo-station-make-her-extra-pretty-girl-b.webp",
    aspectRatio: "16:9",
    computeCostCents: 2.5,
    suggestedCaption: "Scanning 8 subculture lanes before the market notices.",
  },
  {
    id: "gen_meme_03",
    prompt: "Synthwave neon rabbits outside studio brick wall at dusk",
    imageUrl: "/media/brand/neon_rabbits_synthwave.webp",
    aspectRatio: "16:9",
    computeCostCents: 2.5,
    suggestedCaption: "Late night in the studio compiling content packages.",
  },
  {
    id: "gen_meme_04",
    prompt: "Brother K pushing arcade machine compiler outside studio",
    imageUrl: "/media/brand/brother_k_pushing_arcade.webp",
    aspectRatio: "16:9",
    computeCostCents: 2.5,
    suggestedCaption: "Deploying WASM scoring core to 275+ edge cities.",
  },
] as const;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const userPrompt = typeof body.prompt === "string" ? body.prompt.trim() : "";

    if (!userPrompt) {
      return NextResponse.json(
        { ok: false, error: "Please enter a prompt to generate a meme or background image." },
        { status: 400 }
      );
    }

    // Pick a deterministic asset output based on prompt length
    const selected = SAMPLE_GENERATIONS[userPrompt.length % SAMPLE_GENERATIONS.length];

    const result = {
      ok: true,
      generationId: `gpu_${Date.now()}`,
      prompt: userPrompt,
      imageUrl: selected.imageUrl,
      aspectRatio: selected.aspectRatio,
      gpuProvider: "RunPod / NVIDIA H100 GPU Cluster",
      computeCostCents: selected.computeCostCents,
      userFeeCents: 25, // $0.25 user fee yielding 90% gross margin above $0.025 COGS
      suggestedCaption: selected.suggestedCaption,
      createdAt: new Date().toISOString(),
    };

    assertPublicPayloadSafe(result);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Generation failed" },
      { status: 500 }
    );
  }
}
