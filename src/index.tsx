import { OpenAPIHono } from "@hono/zod-openapi";
import { getTrackById, getTracks } from "./tracks/service";
import { WelcomePage } from "./welcome";
import { trackRoute } from "./tracks/route";

export default new OpenAPIHono({ strict: false })
  .use("*", async (c, next) => {
    console.log(`Request: ${c.req.method} ${c.req.url}`);
    await next();
  })
  .route("api/tracks", trackRoute)
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
