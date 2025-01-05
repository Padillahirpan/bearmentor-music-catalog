import { z } from "zod";

export const TrackIdSchema = z.object({
  id: z.coerce.number().int().min(1),
});

export const TrackRequestSchema = z
  .object({
    title: z.string().min(1),
    album_id: z.string().optional()
  });

export const NewTrackRequestSchema = z
  .object({
    title: z.string().min(1),
    album_id: z.string().optional(),
})

export const validateTrack = (data: any) => {
   return NewTrackRequestSchema.parse(data);
};
