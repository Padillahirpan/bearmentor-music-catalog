import { OpenAPIHono } from "@hono/zod-openapi";
import * as albumService from './service'
import { AlbumIdSchema, AlbumRequestSchema, NewAlbumRequestSchema } from "./schema";

const API_TAG = ['Albums']

export const albumRoute = new OpenAPIHono()
   // add new album
   .openapi(
      {
         method: 'post',
         path: '/',
         description: 'Create a new album in the database',
         request: {
            body: {
               content: {
                  'application/json': {
                     schema: NewAlbumRequestSchema,
                  },
               },
            },
         },
         responses: {
           201: {
             description: 'Album successfully added',
           },
         },
         tags: API_TAG,
       },
       async (c) => {
         const body = c.req.valid('json');
         const updatedArtist = await albumService.addAlbum(body);

         return c.json(
            {
               status: "success",
               message: "Successfully add the album",
               data: updatedArtist,
            }, 201);
       },  
   )
   // get all albums
   .openapi(
      {
         method: 'get',
         path: '/',
         description: 'Get all albums',
         responses: {
           200: {
             description: 'List of albums',
           },
         },
         tags: API_TAG,
       },
       async (c) => {
         const albums = await albumService.getAlbumsWithArtists();

         return c.json(
            {
               status: "success",
               message: "Successfully get albums",
               data: albums,
            }, 200);
       },   
   )
   // get album by id
   .openapi(
      {
         method: 'get',
         path: '/{id}',
         description: 'Get album by id from the database',
         request: {
            params: AlbumIdSchema,
         },
         responses: {
           200: {
             description: 'Data of album detail',
           },
         },
         tags: API_TAG,
       },
       async (c) => {
         const albumId = Number(c.req.param('id'));
         const album = await albumService.getAlbumById(albumId);

         if(!album) {
            return c.json({ message: 'Album not found' }, 404);
         }

         return c.json(
            {
               status: "success",
               message: "Successfully get album",
               data: album,
            }, 200);
       },   
   )
   // update album
   .openapi(
      {
         method: 'patch',
         path: '/{id}',
         description: 'Update album by id',
         request: {
            params: AlbumIdSchema,
            body: {
               content: {
                  'application/json': {
                     schema: AlbumRequestSchema,
                  },
               },
            },
         },
         responses: {
           200: {
             description: 'Album updated',
           },
           404: {
            description: 'Album not found',
           },
         },
         tags: API_TAG,
       },
       async (c) => {
         const body = c.req.valid('json')
         const albumId = Number(c.req.param('id'));

         const exists = await albumService.isExists(albumId)

         if (!exists) {
            return c.json({ message: 'Album not found' }, 404);
         }

         await albumService.updateAlbumById(albumId, body);

         const updatedAlbum = await albumService.getAlbumById(albumId);

         return c.json(
            {
               status: "success",
               message: "Successfully update the album",
               data: updatedAlbum,
            }, 200);
       },   
   )
   // delete album by id
   .openapi(
      {
         method: 'delete',
         path: 'delete/{id}',
         description: 'Delete album by id',
         request: {
            params: AlbumIdSchema,
         },
         responses: {
           200: {
             description: 'Album deleted',
           },
           404: {
            description: 'Album not found',
           },
         },
         tags: API_TAG,
       },
       async (c) => {
         const albumId = Number(c.req.param('id'));

         const exists = await albumService.isExists(albumId)

         if (!exists) {
            return c.json({ message: 'Album not found' }, 404);
         }

         const deletedAlbum = await albumService.deleteAlbumById(albumId);

         return c.json(
            {
               status: "success",
               message: "Successfully delete album",
               data: deletedAlbum,
            }, 200);
       },   
   )