import { OpenAPIHono } from "@hono/zod-openapi";
import * as trackService from './service'

const API_TAG = ['Tracks']

export const trackRoute = new OpenAPIHono()
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
         const tracks = await trackService.getTracks()
   
         return c.json({
           message: 'Success',
           data: tracks,
         })
       },   
   )
   .openapi(
      {
         method: 'get',
         path: '/{id}',
         description: 'Get track by id',
         responses: {
           200: {
             description: 'Track details',
           },
           404: {
            description: 'Track not found',
           }
         },
         tags: API_TAG,
       },
       async (c) => {
         const id = Number(c.req.param('id'));
         if(!id) {
            return c.json({message: 'There is no track ID'}, 404)
         }

         const track = await trackService.getTrackById(id)

         if(!track) {
            return c.json({message: 'Track not found'}, 404)
         }
   
         return c.json({
           message: 'Success',
           data: track,
         })
       },   
   )