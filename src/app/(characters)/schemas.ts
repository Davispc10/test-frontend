import { z } from 'zod'

export const orderBySchema = z.enum(['name', '-name', 'modified', '-modified'])
export type OrderBy = z.infer<typeof orderBySchema>

const characterItemSchema = z.object({
  resourceURI: z.string(),
  name: z.string(),
  type: z.string().optional(),
})

export const characterSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  modified: z.string(),
  thumbnail: z.object({
    path: z.string(),
    extension: z.string(),
  }),
  resourceURI: z.string(),
  comics: z.object({
    available: z.number(),
    collectionURI: z.string(),
    items: z.array(characterItemSchema),
    returned: z.number(),
  }),
  series: z.object({
    available: z.number(),
    collectionURI: z.string(),
    items: z.array(characterItemSchema),
    returned: z.number(),
  }),
  stories: z.object({
    available: z.number(),
    collectionURI: z.string(),
    items: z.array(characterItemSchema),
    returned: z.number(),
  }),
  events: z.object({
    available: z.number(),
    collectionURI: z.string(),
    items: z.array(characterItemSchema),
    returned: z.number(),
  }),
  urls: z.array(
    z.object({
      type: z.string(),
      url: z.string(),
    }),
  ),
})

export type Character = z.infer<typeof characterSchema>

export const itemSchema = z.object({
  resourceURI: z.string(),
  name: z.string(),
  role: z.string().optional(),
  type: z.string().optional(),
})

export const comicSchema = z.object({
  id: z.number(),
  title: z.string(),
  thumbnail: z.object({
    path: z.string(),
    extension: z.string(),
  }),
})

export type Comic = z.infer<typeof comicSchema>
