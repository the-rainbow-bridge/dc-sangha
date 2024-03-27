import { defineCollection, z } from "astro:content"

// this type is for the frontmatter of each content file, its the same for ALL types of resources and is used to populate other parts of the code that reference each individual item. In the markdown/content section of each file, you can add any information you want.
const resources = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    type: z.string(),
    summary: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
  }),
})

const legal = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
  }),
})

export const collections = { resources, legal }
