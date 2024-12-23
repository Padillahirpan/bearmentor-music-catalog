import { z } from 'zod'

export const NewArtistRequestSchema = z
  .object({
    name: z.string().min(1),
    bio: z.string(),
    image: z.string()
})
export const validateArtist = (data: any) => {
   return NewArtistRequestSchema.parse(data);
};

export const ArtistRequestSchema = z
  .object({
    name: z.string().min(1),
    bio: z.string().min(1)
  })

export const ArtistIdSchema = z.object({
   id: z.coerce.number().int().min(1),
 })