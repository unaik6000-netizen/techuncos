import { z } from "zod";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const articleFormSchema = z.object({
  title: z.string().trim().min(3, "Title is too short").max(200),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(SLUG_RE, "Use lowercase letters, numbers and hyphens only"),
  subtitle: z.string().trim().max(300).optional().or(z.literal("")),
  excerpt: z.string().trim().min(10, "Write a short excerpt").max(400),
  category: z.enum(["ai", "tech", "digital", "tutorials", "news"]),
  authorName: z.string().trim().min(1, "Author name is required").max(80),
  cover: z.string().trim().url("Must be a valid URL").optional().or(z.literal("")),
  lang: z.enum(["ml", "en", "hi"]).optional().or(z.literal("")),
  tags: z.string().trim().max(300).optional().or(z.literal("")),
  readTime: z.coerce.number().int().min(1).max(60).default(5),
  featured: z.coerce.boolean().default(false),
  trending: z.coerce.boolean().default(false),
  status: z.enum(["draft", "published"]),
  body: z.string().trim().min(1, "Write the article body"),
});

export type ArticleFormInput = z.infer<typeof articleFormSchema>;
