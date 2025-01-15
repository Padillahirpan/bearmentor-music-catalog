import { z } from 'zod'

export const NewArtistRequestSchema = z
  .object({
    name: z.string().min(1),
    bio: z.string(),
    image: z.string().optional()
})
export const validateArtist = (data: any) => {
   return NewArtistRequestSchema.parse(data);
};

export const ArtistRequestSchema = z
  .object({
    name: z.string().optional(),
    bio: z.string().optional(),
});

export const ArtistIdSchema = z.object({
   id: z.coerce.number().int().min(1),
});

export const GetArtistsWithQuerySchema = z.object({
  search: z.string().optional(),
  withAlbum: z.string().optional(),
});