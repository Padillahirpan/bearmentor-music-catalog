import { z } from "zod";
import { AlbumRequestSchema, NewAlbumRequestSchema, validateAlbum } from "./schema";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function seedAlbums() {
   const albums = await prisma.album.createMany({
      data: [
         { id: 1, title: "Sheila On 7", artist_id: 1},
         { id: 2, title: "Berlayar", artist_id: 1},
         { id: 3, title: "Naluri Lelaki(Special Edition)", artist_id: 2},
         { id: 4, title: "Hari Yang Cerah", artist_id: 3},
         { id: 5, title: "Punya Arti", artist_id: 4},
      ]
   });

   return albums;

}

export async function getAlbumsWithArtists() {
   const artistsWithAlbums = await prisma.album.findMany({
      include: {
         artist: true
      }
   });

   return artistsWithAlbums;
}

export async function getAlbumById(albumId: number) {
   const artist = await prisma.album.findUnique({
      where: {
         id: albumId
      }
   });

   return artist;
}

export async function addAlbum(
   data: Partial<z.infer<typeof NewAlbumRequestSchema>>
) {

   const validateData = validateAlbum(data)
   const newAlbum = await prisma.album.create({
      data: {
         title: validateData.title,
         cover_art: validateData.cover_art,
         artist_id: Number(validateData.artist_id),
      },
   })
   return newAlbum;
}

export async function updateAlbumById(
   id: number, data: Partial<z.infer<typeof AlbumRequestSchema>>
) {
   const validatedData = AlbumRequestSchema.parse(data);
   return await prisma.album.update({
      where: {
         id: id
      },
      data: validatedData
   })
}

export async function isExists(id: number) {
   const exists = await prisma.album.findFirst({
     where: {
      id: id,
     },
   })
 
   return Boolean(exists)
}

export async function deleteAlbumById(id: number) {
   const deletedAlbum = await prisma.album.delete({
      where: {
         id: id
      },
   });

   return deletedAlbum;
}

export async function deleteAllAlbums() {
   const deletedData = await prisma.album.deleteMany();

   return deletedData;
}