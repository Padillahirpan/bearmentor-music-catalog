import { OpenAPIHono } from "@hono/zod-openapi";
import { WelcomePage } from "./welcome";
import { trackRoute } from "./tracks/route";
import { artistRoute } from "./artists/route";
import { albumRoute } from "./albums/route";
import { playlistRoute } from "./playlist/route";
import { swaggerUI } from "@hono/swagger-ui";

export default new OpenAPIHono()
  .route("api/artists", artistRoute)
  .route("api/tracks", trackRoute)
  .route("api/albums", albumRoute)
  .route("api/playlists", playlistRoute)

  .doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Music Hits 2000s API",
      description:
        "Music REST API is a web service that provides music collections. Search Artist, Album, Track, Playlist.",
    },
  })
  .get("/docs", swaggerUI({ url: "/doc" }))
  .get("/", (c) => {
    return c.html(
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Welcome to MusicHits2000 REST API</title>
          <meta name="description" content="Web API about movies" />
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          <WelcomePage />
        </body>
      </html>
    );
  });
