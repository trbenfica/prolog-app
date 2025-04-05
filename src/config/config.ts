import { z } from "zod";

const envSchema = z.object({
  VITE_API_SECRET: z.string().min(1),
  VITE_BRANCH_OFFICES_ID: z.coerce.number().int().positive(),
  VITE_COMPANY_ID: z.coerce.number().int().positive(),
  VITE_API_BASE_URL: z.string().url(),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.format());
  throw new Error("Invalid environment variables.");
}

export const env = parsed.data;
