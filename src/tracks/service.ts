import { PrismaClient } from "@prisma/client"
import { NewTrackRequestSchema, TrackRequestSchema, validateTrack } from "./schema";
import { z } from "zod";

const prisma = new PrismaClient();

export async function seedTracks() {
   const artists = await prisma.track.createMany({
      data: [
        { id: 1, title: "Tertatih", album_id: 1},
        { id: 2, title: "Kita", album_id: 1},
        { id: 3, title: "J.A.P", album_id: 1},
        { id: 4, title: "Anugrah Terindah Yang Pernah Kumiliki", album_id: 1},
        { id: 5, title: "Pede", album_id: 1},
        { id: 6, title: "Dan...", album_id: 1},
        { id: 7, title: "Have Fun", album_id: 2},
        { id: 8, title: "Pasti Ku Bisa", album_id: 2},
        { id: 9, title: "Hujan Turun", album_id: 2},
        { id: 10, title: "On The Phone", album_id: 2},
        { id: 11, title: "Hari Bersamanya", album_id: 2},
        { id: 12, title: "Kehadiranmu", album_id: 3},
        { id: 13, title: "Yang T'lah Lalu", album_id: 3},
        { id: 14, title: "Naluri Lelaki", album_id: 3},
        { id: 15, title: "Cinta", album_id: 3},
        { id: 16, title: "Dengan Nafasmu", album_id: 3},
        { id: 17, title: "Menghapus Jejakmu", album_id: 4},
        { id: 18, title: "Hari Yang Cerah Untuk Jiwa Yang Sepi", album_id: 4},
        { id: 19, title: "Di Balik Awan", album_id: 4},
        { id: 20, title: "Kota Mati", album_id: 4},
        { id: 21, title: "Melawan Dunia", album_id: 4},
        { id: 22, title: "Jika Aku Mati", album_id: 5},
        { id: 23, title: "Tentangmu", album_id: 5},
        { id: 24, title: "Hanya Ingin Kau Tahu", album_id: 5},
        { id: 25, title: "Biarkan Ku Melihat Surga", album_id: 5},
        { id: 26, title: "Kasih Dengarkanlah", album_id: 5},
      ]
   });

  return artists;
}

export async function getTracksWithAlbums() {
   const tracks = await prisma.track.findMany({
      include: {
         album: true,
      },
   });

   return tracks;
}

export async function getTrackById(id: number) {
   const track = await prisma.track.findUnique({
      where: {
         id: id
      }
   });

   return track;
}

export async function deleteAllTracks() {
   const deletedData = await prisma.track.deleteMany()

   return deletedData;
}

export async function deleteTrackById(id: number) {
   const deletedTrack = await prisma.track.delete({
      where: {
         id: id,
      },
   });

   return deletedTrack;
}

export async function updateTrackById(
   id: number, data: Partial<z.infer<typeof TrackRequestSchema>>
) {
   return await prisma.track.update({
      where: {
         id: id,
      },
      data: {
         title: data.title,
         album_id: data.album_id ? Number(data.album_id) : -1
      }
   })
}

export async function addTrack(
   data: Partial<z.infer<typeof NewTrackRequestSchema>>
) {

   const validateData = validateTrack(data)
   const newAlbum = await prisma.track.create({
      data: {
         title: validateData.title,
         album_id: Number(validateData.album_id),
      },
   })
   return newAlbum;
}

export async function isExists(id: number) {
   const exists = await prisma.track.findFirst({
     where: {
      id: id,
     },
   })
 
   return Boolean(exists)
}
