import { z } from "zod";

export const commentSchema = z.object({
  articleSlug: z.string().min(1),
  name: z.string().trim().min(1).max(60).optional().or(z.literal("")),
  body: z.string().trim().min(3, "Write at least a few words").max(2000),
});

export const newsletterSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
});
