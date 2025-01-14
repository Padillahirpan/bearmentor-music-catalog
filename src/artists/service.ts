import { PrismaClient } from "@prisma/client"
import { z } from 'zod'
import { ArtistRequestSchema, NewArtistRequestSchema, validateArtist } from "./schema";

const prisma = new PrismaClient();


export async function seedArtists() {
   const artists = await prisma.artist.createMany({
      data: [
         { id: 1, name: "Sheila On 7", bio: "A fresh band from YK", },
         { id: 2, name: "SAMSONS", bio: "New mind", },
         { id: 3, name: "Perterpan", bio: "Bandung pride", },
         { id: 4, name: "Repvblik", bio: "Cinta sempurna", },
      ]
   });

   return artists;
}

export async function getArtists(search?: string) {
   const artists = await prisma.artist.findMany({
      where: search ? {
         OR: [
            {
               name: {
                  contains: search,
                  mode: 'insensitive',
               },
            },
            {
               bio: {
                  contains: search,
                  mode: 'insensitive',
               },
            }
         ],
      } : {},
      orderBy: {
         id: 'asc',
      },
   });

   return artists;
}

export async function getArtistsWithAlbums() {
   const artists = await prisma.artist.findMany({
      include: {
         album: true
      }
   })

   return artists;
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

export async function deleteAllArtists() {
   const deletedData = await prisma.artist.deleteMany();

   return deletedData;
}