import { z } from "zod";

const optionalUrl = z.union([
  z.literal(""),
  z.string().trim().url("Enter a complete public URL, including https://."),
]);

export const sampleRequestSchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  email: z.string().trim().email("Enter a valid email address."),
  handle: z.string().trim().max(80).optional().default(""),
  platform_target: z.enum(["tiktok", "reels", "shorts", "x", "youtube", "other"]),
  creator_type: z.enum(["clipper", "creator", "fan_page", "business", "agency", "other"]),
  niche: z.string().trim().min(2, "Tell us which niche you are chasing.").max(120),
  source_url: optionalUrl.default(""),
  language_mode: z.enum(["english", "spanish", "bilingual"]),
  goal: z.string().trim().min(12, "Tell us a little more about what you want to make.").max(1200),
});

export type SampleRequestValues = z.infer<typeof sampleRequestSchema>;

export function sampleRequestFromFormData(form: FormData) {
  return sampleRequestSchema.safeParse({
    name: form.get("name"),
    email: form.get("email"),
    handle: form.get("handle") ?? "",
    platform_target: form.get("platform_target"),
    creator_type: form.get("creator_type"),
    niche: form.get("niche"),
    source_url: form.get("source_url") ?? "",
    language_mode: form.get("language_mode"),
    goal: form.get("goal"),
  });
}
