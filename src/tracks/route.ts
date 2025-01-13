import { OpenAPIHono } from "@hono/zod-openapi";
import * as trackService from './service'
import { PrismaClient } from "@prisma/client";
import { NewTrackRequestSchema, TrackIdSchema, TrackRequestSchema } from "./schema";

const API_TAG = ['Tracks']

const prisma = new PrismaClient();

export const trackRoute = new OpenAPIHono()
  // seed tracks
  .openapi(
    {
      method: 'post',
      path: 'seed',
      description: 'Create a dummy tracks in the database',
      responses: {
        201: {
            description: 'Tracks successfully added',
        },
      },
      tags: API_TAG,
    },
    async (c) => {
      const tracks = await trackService.seedTracks();
      return c.json(tracks, 201);
    },
  )
  .openapi(
    {
      method: 'get',
      path: '/',
      description: 'Get all tracks',
      responses: {
        200: {
          description: 'List of tracks',
        },
      },
      tags: API_TAG, 
    },
    async (c) => {
      const tracks = await trackService.getTracksWithAlbums();

      return c.json(
        {
          status: 'success',
          message: 'Success get all tracks',
          data: tracks
        },
        200
      );
    },
  )
  .openapi(
    {
      method: 'get',
      path: '/detail/{id}',
      description: 'Get track by id',
      request: {
        params: TrackIdSchema,
     },
      responses: {
        200: {
          description: 'Details of track',
        },
      },
      tags: API_TAG, 
    },
    async (c) => {
      const trackId = Number(c.req.param('id'));
      const track = await trackService.getTrackById(trackId);

      return c.json(
        {
          status: 'success',
          message: 'Success get track',
          data: track
        },
        200
      );
    },
  )
  // add new track
  .openapi(
    {
      method: 'post',
      path: '/add',
      description: 'Create a new track in the database',
      request: {
        body: {
          content: {
            'application/json': {
              schema: NewTrackRequestSchema,
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Track successfully added',
        },
      },
      tags: API_TAG,
    },
    async (c) => {
      const body = c.req.valid('json');
      const updatedArtist = await trackService.addTrack(body);

      return c.json(
        {
          status: "success",
          message: "Successfully add the track",
          data: updatedArtist,
        }, 
        200
      );
    },  
  )
  // delete track by id
  .openapi(
    {
      method: 'delete',
      path: 'delete/{id}',
      description: 'Delete track by id',
      request: {
        params: TrackIdSchema,
      },
       responses: {
         200: {
           description: 'Track deleted',
         },
         404: {
          description: 'Track not found',
         },
       },
       tags: API_TAG,
     },
     async (c) => {
       const trackId = Number(c.req.param('id'));

       const exists = await trackService.isExists(trackId)

       if (!exists) {
          return c.json({ message: 'Artist not found' }, 404);
       }

       const deletedTrack = trackService.deleteTrackById(trackId);

       return c.json(
          {
             status: "success",
             message: "Successfully delete track",
             data: deletedTrack,
          }, 200);
     },   
  )
  // delete all track
  .openapi(
      {
        method: 'delete',
        path: 'delete-all',
        description: 'Delete all tracks',         
        responses: {
          200: {
            description: 'All track deleted',
          },
          404: {
            description: 'Track failure to delete',
          },
        },
        tags: API_TAG,
      },
      async (c) => {

        const deletedTracks = await trackService.deleteAllTracks();

        return c.json(
            {
              status: "success",
              message: "Successfully delete all tracks",
              data: deletedTracks,
            }, 200);
      },   
  )
  // update track
  .openapi(
    {
      method: 'put',
      path: 'update/{id}',
      description: 'Update track by id',
      request: {
          params: TrackIdSchema,
          body: {
             content: {
                'application/json': {
                   schema: TrackRequestSchema,
                },
             },
          },
      },
      responses: {
         200: {
           description: 'Track updated',
         },
         404: {
          description: 'Track not found',
         },
      },
      tags: API_TAG,
    },
    async (c) => {
       const body = c.req.valid('json')
       const trackId = Number(c.req.param('id'));

       const exists = await trackService.isExists(trackId)

       if (!exists) {
          return c.json({ message: 'Artist not found' }, 404);
       }

       const updatedTrack = trackService.updateTrackById(trackId, body);

       return c.json(
          {
             status: "success",
             message: "Successfully update the track",
             data: updatedTrack,
          }, 200);
    },   
  )