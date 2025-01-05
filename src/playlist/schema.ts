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

export const QueryPlaylistSchema = z.object({
  title: z.string().optional(),
  sortBy: z.enum(['title', 'created_at', 'updated_at']).optional(),
  sortOrder: z.enum(['asc', 'desc']),
});

export const NewPlaylistTrackRequestSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().optional(),
    trackIds: z.array(z.coerce.number().min(1)),
});

export const validateNewPlaylistTrack = (data: any) => {
  return NewPlaylistTrackRequestSchema.parse(data);
};