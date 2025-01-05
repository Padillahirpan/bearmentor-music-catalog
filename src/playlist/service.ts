import { PrismaClient } from "@prisma/client";
import { NewPlaylistRequestSchema, PlaylistRequestSchema, validateNewPlaylist } from "./schema";
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