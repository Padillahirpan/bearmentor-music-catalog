import { z } from "zod";

export const PlaylistIdSchema = z.object({
  id: z.coerce.number().int().min(1),
});

export const PlaylistRequestSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().optional()
  });

export const NewPlaylistRequestSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().optional(),
})

export const validateNewPlaylist = (data: any) => {
   return NewPlaylistRequestSchema.parse(data);
};
