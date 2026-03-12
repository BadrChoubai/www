import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

const schema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string().optional(),
  published: z.coerce.date(),
  updated: z.coerce.date().optional(),
  tags: z.array(z.string()),
  draft: z.boolean(),
});

// 3. Define your collection(s)
const blog = defineCollection({
  loader: glob({
    pattern: "*.mdx",
    base: "./src/content/blog",
  }),
  schema,
});

const series = defineCollection({
  loader: glob({
    pattern: "**/*.mdx",
    base: "./src/content/blog/series",
  }),
  schema,
});

export const collections = { blog, series };
