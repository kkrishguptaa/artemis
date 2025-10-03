import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '*.{md,yaml}' }),

  schema: () =>
    z.object({
      name: z.string(),
      description: z.string(),

      website: z.nullable(z.string().url()),

      git: z.string().transform(value => {
        const [name, host] = value.split(':').reverse()
        // biome-ignore lint/style/noNonNullAssertion: <when the split value is reverse, host can never be null, because the first value will always be something!>
        const [repo, owner] = name!.split('/').reverse()

        return {
          host: host ? `https://${host}.com` : 'https://github.com',
          owner: owner ?? 'kkrishguptaa',
          // biome-ignore lint/style/noNonNullAssertion: <same as above>
          repo: repo!
        }
      })
    })
});

const devlogs = defineCollection({
  loader: glob({ base: './src/content/devlogs', pattern: '**/*.md' }),

  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),

      date: z.coerce.date(),
      draft: z.boolean().default(false),

      project: reference('projects'),
    }),
});

export const collections = { devlogs, projects };
