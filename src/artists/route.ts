import { OpenAPIHono } from "@hono/zod-openapi";
import * as artistService from './service'
import { PrismaClient } from "@prisma/client"
import { ArtistIdSchema, ArtistRequestSchema, GetArtistsWithQuerySchema, NewArtistRequestSchema } from "./schema";

const API_TAG = ['Artists']

const prisma = new PrismaClient();

export const artistRoute = new OpenAPIHono()
   // add new artist
   .openapi(
      {
         method: 'post',
         path: '/',
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
         const body = c.req.valid('json');

         const updatedArtist = await artistService.addArtist(body);

         return c.json(
            {
               status: "success",
               message: "Successfully add the artist",
               data: updatedArtist,
            }, 201);
       },  
   )
   // get all artists
   .openapi(
      {
         method: 'get',
         path: '/',
         description: 'Get all artists',
         request: {
            query: GetArtistsWithQuerySchema,
         },
         responses: {
           200: {
             description: 'List of artists',
           },
         },
         tags: API_TAG,
       },
       async (c) => {
         const search = c.req.query('search');
         const withAlbum = c.req.query('withAlbum');
         
         const isWithAlbum = withAlbum === 'true' ? true : false;

         const artists = await artistService.getArtists(
            search,
            isWithAlbum,
         );

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
         request: {
            params: ArtistIdSchema,
         },
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
   .openapi(
      {
         method: 'patch',
         path: '/{id}',
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

         await artistService.updateArtistById(artistId, body);

         const updatedArtist = await artistService.getArtistById(artistId);

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
         path: '/{id}',
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
               message: "Successfully delete artist with id " + artistId,
               data: true,
            }, 200);
       },   
   )