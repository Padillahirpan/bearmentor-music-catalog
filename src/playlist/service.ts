import { PrismaClient } from "@prisma/client";
import { NewPlaylistRequestSchema, NewPlaylistTrackRequestSchema, PlaylistRequestSchema, validateNewPlaylist, validateNewPlaylistTrack } from "./schema";
import { z } from "zod";

const prisma = new PrismaClient();

export async function seedPlaylist() {
   const artists = await prisma.playlist.createMany({
      data: [
        { id: 1, title: "Indo Hits 2000an", description: "Top songs Indonesia 2000an. Dengarkan lagu Indo favorit dari band dan penyanyi solo populer sambil nostalgia."},
        { id: 2, title: "Hip Hop 2000s Music", description: "Find our playlist with these keywords: best 2000s hip hop music - 2000s hip hop music - 2000 hip hop."},
        { id: 3, title: "Terbaik 2000an", description: "Lagu Indonesia kesayangan kamu sepanjang era 2000an. Cover: Reza Artamevia"}
        
      ]
   });

  return artists;
}

export async function getPlaylists() {
   const playlists = await prisma.playlist.findMany();

   return playlists;
}

export async function getPlaylistById(id: number) {
   const playlist = await prisma.playlist.findUnique({
      where: {
         id: id
      }
   });
   return playlist;
}

export async function deletePlaylistById(id: number) {
   const deletedPlaylist = await prisma.playlist.delete({
      where: {
         id: id,
      },
   });

   return deletedPlaylist;
}

export async function deleteAllPlaylist() {
   const deletedPlaylist = await prisma.playlist.deleteMany();
   return deletedPlaylist;
}

export async function updatePlaylistById(
   id: number, data: Partial<z.infer<typeof PlaylistRequestSchema>>
) {
   return await prisma.playlist.update({
      where: {
         id: id,
      },
      data: {
         title: data.title,
         description: data.description,
      },
   })
}

export async function addPlaylist(
   data: Partial<z.infer<typeof NewPlaylistRequestSchema>>
) {
   const validateData = validateNewPlaylist(data);
   const newPlaylist = await prisma.playlist.create({
      data: {
         title: validateData.title,
         description: validateData.description,
      },
   });
   return newPlaylist;
}

export async function isExists(id: number) {
   const exists = await prisma.playlist.findFirst({
     where: {
      id: id,
     },
   })
 
   return Boolean(exists)
}

export async function getPlaylistsWithTracks(
   search?: string,
   withTracks?: boolean,
   sortBy?: string,
   sortOrder?: string 
) {

   // Define the include object for related tracks
   const includeTracks = withTracks ? true : false;

   // Fetch playlists from the database
   const playlists = await prisma.playlist.findMany({
      include: {
         playlist_track: { 
            include: {
               track: includeTracks,
            } 
         },
      },
      where: search ? {
         OR: [
            {
               title: {
                  contains: search,
                  mode: 'insensitive',
               },
            },
         ],
      }: {},
      orderBy: sortBy
      ? {
           [sortBy]: sortOrder || 'asc',
      }
      : {
         id: 'asc',
      },
   });

   const formattedPlaylists = playlists.map(playlist => ({
      id: playlist.id,
      title: playlist.title,
      description: playlist.description,
      created_at: playlist.created_at,
      updated_at: playlist.updated_at,
      ...withTracks && {
         tracks: playlist.playlist_track.map(pt => ({
            id: pt.track.id,
            title: pt.track.title,
            created_at: pt.track.created_at,
            updated_at: pt.track.updated_at,
         })),
      },
   }))

   return formattedPlaylists;
}


export async function addPlaylistTrack(
   data: Partial<z.infer<typeof NewPlaylistTrackRequestSchema>>
) {
   const validateData = validateNewPlaylistTrack(data);

   const newPlaylist = await prisma.playlist.create({
      data: {
         title: validateData.title,
         description: validateData.description,
      }
   });

   const playlistId = newPlaylist.id;

   await Promise.all(
      validateData.trackIds.map(trackId => 
         prisma.playlistTrack.create({
            data: {
               playlistId: Number(playlistId),
               trackId: trackId,
            },
         })
      )
   );

   return playlistId;
}