import { PrismaClient } from "@prisma/client"
import { z } from 'zod'
import { ArtistRequestSchema, NewArtistRequestSchema, validateArtist } from "./schema";

const prisma = new PrismaClient();

export interface Artist {
   id: number,
   name: string,
   createdAt: string,
   updatedAt: string,
   bio: string,
   image: string,
}

export let artistsDummy: Artist[] = [
   {
      id: 1,
      name: "Lady Lala",
      bio: "I'm the number one",
      image: "",
      createdAt: "",
      updatedAt: "",
   },
   {
      id: 2,
      name: "One Republic",
      bio: "The greatest band",
      image: "",
      createdAt: "",
      updatedAt: "",
   },
]

export function getArtists() {
   return artistsDummy;
}

export async function getArtistById(artistId: number) {
   const artist = await prisma.artist.findUnique({
      where: {
         id: artistId
      }
   });

   return artist;
}

export async function addArtist(
   data: Partial<z.infer<typeof NewArtistRequestSchema>>
) {

   const validateData = validateArtist(data)
   const newArtist = await prisma.artist.create({
      data: {
         name: validateData.name,
         bio: validateData.bio,
         image: validateData.image,
      },
   })
   return newArtist;
}

export async function updateArtistById(
   id: number, data: Partial<z.infer<typeof ArtistRequestSchema>>
) {
   return await prisma.artist.update({
      where: {
         id: id
      },
      data: data
   })
}

export async function isExists(id: number) {
   const exists = await prisma.artist.findFirst({
     where: {
      id: id,
     },
   })
 
   return Boolean(exists)
}

export async function deleteArtistById(id: number) {
   const deletedArtist = await prisma.artist.delete({
      where: {
         id: id
      },
   });

   return deletedArtist;
}