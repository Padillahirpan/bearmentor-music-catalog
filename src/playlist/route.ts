import { OpenAPIHono } from "@hono/zod-openapi";
import * as playlistService from './service';
import { GetPlaylistWithQuerySchema, NewPlaylistTrackRequestSchema, PlaylistIdSchema, PlaylistRequestSchema } from "./schema";

const API_TAG = ['Playlists'];

export const playlistRoute = new OpenAPIHono()
   // insert playlist and track
   .openapi(
      {
         method: 'post',
         path: '/',
         description: 'Create a new playlist in the database',
         request: {
            body: {
               content: {
                  'application/json': {
                     schema: NewPlaylistTrackRequestSchema,
                  },
               },
            },
         },
         responses: {
         201: {
            description: 'Playlist track successfully added',
         },
         404: {
            description: 'Link not found',
         }
         },
         tags: API_TAG,
      },
      async (c) => {
         const body = c.req.valid('json');
         const newPlaylist = await playlistService.addPlaylistTrack(body);

         return c.json(
            {
               status: "success",
               message: "Successfully add the playlist track",
               data: newPlaylist,
            }, 200
         );
      },  
   )
   // get Playlists With Tracks
   .openapi(
      {
         method: 'get',
         path: '/',
         description: 'Get all playlist',
         request: {
            query: GetPlaylistWithQuerySchema,
         },
         responses: {
           200: {
             description: 'List of playlist',
           },
         },
         tags: API_TAG,
       },
       async (c) => {
         const search = c.req.query('search');
         const withTracks = c.req.query('withTracks') === 'true';
         const sortBy = c.req.query('sortBy');
         const sortOrder = c.req.query('sortOrder') ? 'asc' : 'desc';


         const playlists = await playlistService.getPlaylistsWithTracks(
            search, withTracks, sortBy, sortOrder
         );

         return c.json(
            {
               status: "success",
               message: "Successfully get playlist with track",
               data: playlists,
            }, 200);
       },   
   )
   // get playlist by id
   .openapi(
      {
         method: 'get',
         path: '/{id}',
         description: 'Get playlist by id',
         request: {
            params: PlaylistIdSchema,
         },
         responses: {
           200: {
             description: 'Data of playlist detail',
           },
         },
         tags: API_TAG,
       },
       async (c) => {
         const playlistId = Number(c.req.param('id'));
         const playlistDetail = await playlistService.getPlaylistById(playlistId);

         if(!playlistDetail) {
            return c.json({ message: 'Playlist not found' }, 404);
         }

         return c.json(
            {
               status: "success",
               message: "Successfully get playlist",
               data: playlistDetail,
            }, 200);
       },   
   )
   // update playlist
   .openapi(
      {
         method: 'patch',
         path: '/{id}',
         description: 'Update playlist by id',
         request: {
            params: PlaylistIdSchema,
            body: {
               content: {
                  'application/json': {
                     schema: PlaylistRequestSchema,
                  },
               },
            },
         },
         responses: {
           200: {
             description: 'Playlist updated',
           },
           404: {
            description: 'Playlist not found',
           },
         },
         tags: API_TAG,
       },
       async (c) => {
         const body = c.req.valid('json')
         const playlistId = Number(c.req.param('id'));

         const exists = await playlistService.isExists(playlistId)

         if (!exists) {
            return c.json({ message: 'Playlist not found' }, 404);
         }

         const updatedPlaylist = playlistService.updatePlaylistById(playlistId, body);

         return c.json(
            {
               status: "success",
               message: "Successfully update the playlist",
               data: updatedPlaylist,
            }, 200);
       },   
   )
   // delete playlist by id
   .openapi(
      {
         method: 'delete',
         path: '/{id}',
         description: 'Delete album by id',
         request: {
            params: PlaylistIdSchema,
         },
         responses: {
           200: {
             description: 'Playlist deleted',
           },
           404: {
            description: 'Playlist not found',
           },
         },
         tags: API_TAG,
       },
       async (c) => {
         const playlistId = Number(c.req.param('id'));

         const exists = await playlistService.isExists(playlistId)

         if (!exists) {
            return c.json({ message: 'Playlist not found' }, 404);
         }

         const deletedPlaylist = await playlistService.deletePlaylistById(playlistId);

         return c.json(
            {
               status: "success",
               message: "Successfully delete playlist",
               data: deletedPlaylist,
            }, 200);
       },   
   )