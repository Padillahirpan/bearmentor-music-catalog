import { OpenAPIHono } from "@hono/zod-openapi";
import * as artistService from './service'
import { PrismaClient } from "@prisma/client"
import { ArtistIdSchema, ArtistRequestSchema, NewArtistRequestSchema } from "./schema";

const API_TAG = ['Artists']

const prisma = new PrismaClient();

export const artistRoute = new OpenAPIHono()
   // seed artists
   .openapi(
      {
         method: 'post',
         path: 'seed',
         description: 'Create a dummy artist in the database',
         responses: {
         201: {
            description: 'Artist successfully added',
         },
         },
         tags: API_TAG,
      },
      async (c) => {
         const artists = await prisma.artist.createMany({
            data: [
               { name: "Sheila On 7", bio: "A fresh band from YK"},
               { name: "SAMSONS", bio: "New mind",},
               { name: "Perterpan", bio: "Bandung pride",},
               { name: "Repvblik", bio: "Cinta sempurna",},
            ]
         })
         return c.json(artists, 201);
      },
   )
   // add new artist
   .openapi(
      {
         method: 'post',
         path: '/add',
         description: 'Create a new artist in the database',
         request: {
            body: {
               content: {
                  'application/json': {
                     schema: NewArtistRequestSchema,
                  },
               },
            },
         },
         responses: {
           201: {
             description: 'Artist successfully added',
           },
         },
         tags: API_TAG,
       },
       async (c) => {
         const body = c.req.valid('json')

         const updatedArtist = artistService.addArtist(body);

         return c.json(
            {
               status: "success",
               message: "Successfully add the artist",
               data: updatedArtist,
            }, 200);
       },  
   )
   // get all artists
   .openapi(
      {
         method: 'get',
         path: '/',
         description: 'Get all artists',
         responses: {
           200: {
             description: 'List of artists',
           },
         },
         tags: API_TAG,
       },
       async (c) => {
         const artists = await prisma.artist.findMany()

         return c.json(
            {
               status: "success",
               message: "Successfully get artists",
               data: artists,
            }, 200);
       },   
   )
   // get artist by id
   .openapi(
      {
         method: 'get',
         path: '/{id}',
         description: 'Get artist by id',
         responses: {
           200: {
             description: 'Data of artist',
           },
         },
         tags: API_TAG,
       },
       async (c) => {
         const artistId = Number(c.req.param('id'));
         const artist = await artistService.getArtistById(artistId);

         if(!artist) {
            return c.json({ message: 'Artist not found' }, 404);
         }

         return c.json(
            {
               status: "success",
               message: "Successfully get artist",
               data: artist,
            }, 200);
       },   
   )
   // update artist
   .openapi(
      {
         method: 'put',
         path: 'update/{id}',
         description: 'Update artist by id',
         request: {
            params: ArtistIdSchema,
            body: {
               content: {
                  'application/json': {
                     schema: ArtistRequestSchema,
                  },
               },
            },
         },
         responses: {
           200: {
             description: 'Artist updated',
           },
           404: {
            description: 'Artist not found',
           },
         },
         tags: API_TAG,
       },
       async (c) => {
         const body = c.req.valid('json')
         const artistId = Number(c.req.param('id'));

         const exists = await artistService.isExists(artistId)

         if (!exists) {
            return c.json({ message: 'Artist not found' }, 404);
         }

         const updatedArtist = artistService.updateArtistById(artistId, body);

         return c.json(
            {
               status: "success",
               message: "Successfully update the artist",
               data: updatedArtist,
            }, 200);
       },   
   )
   // delete artist by id
   .openapi(
      {
         method: 'delete',
         path: 'delete/{id}',
         description: 'Delete artist by id',
         request: {
            params: ArtistIdSchema,
         },
         responses: {
           200: {
             description: 'Artist deleted',
           },
           404: {
            description: 'Artist not found',
           },
         },
         tags: API_TAG,
       },
       async (c) => {
         const artistId = Number(c.req.param('id'));

         const exists = await artistService.isExists(artistId)

         if (!exists) {
            return c.json({ message: 'Artist not found' }, 404);
         }

         const deletedArtist = artistService.deleteArtistById(artistId);

         return c.json(
            {
               status: "success",
               message: "Successfully delete artist",
               data: deletedArtist,
            }, 200);
       },   
   )