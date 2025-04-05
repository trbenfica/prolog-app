import { z } from "zod";

const envSchema = z.object({
  VITE_API_SECRET: z.string().min(1),
  VITE_BRANCH_OFFICES_ID: z.string().transform((val) => {
    try {
      const parsed = JSON.parse(val);
      if (
        !Array.isArray(parsed) ||
        !parsed.every((n) => typeof n === "number")
      ) {
        throw new Error();
      }
      return parsed as number[];
    } catch {
      throw new Error("VITE_BRANCH_OFFICES_ID must be a JSON array of numbers");
    }
  }),
  VITE_COMPANY_ID: z.coerce.number(),
  VITE_API_BASE_URL: z.string().url(),
});

export const env = envSchema.parse(import.meta.env);
