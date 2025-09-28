import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),

  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      cover: image(),

      link: z.string().url().optional(),
      repo: z.string().url().optional(),
    }),
});

const devlogs = defineCollection({
  loader: glob({ base: './src/content/devlogs', pattern: '**/*.{md,mdx}' }),

  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),

      cover: image(),
      project: reference('projects'),
      draft: z.boolean().default(false),
    }),
});

export const collections = { devlogs, projects };
