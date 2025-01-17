import { number, z } from 'zod'

export const NewAlbumRequestSchema = z
  .object({
    title: z.string().min(1),
    artist_id: z.string().optional(),
    cover_art: z.string().optional(),
})

export const validateAlbum = (data: any) => {
   return NewAlbumRequestSchema.parse(data);
};

export const AlbumRequestSchema = z
  .object({
    title: z.string().optional(),
    cover_art: z.string().optional(),
    artist_id: z.coerce.number().optional(),
})

export const AlbumIdSchema = z.object({
   id: z.coerce.number().int().min(1),
})