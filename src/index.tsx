import { OpenAPIHono } from "@hono/zod-openapi";
import { getTrackById, getTracks } from "./tracks/service";
import { WelcomePage } from "./welcome";
import { trackRoute } from "./tracks/route";

export default new OpenAPIHono({ strict: false })
  .use("*", async (c, next) => {
    console.log(`Request: ${c.req.method} ${c.req.url}`);
    await next();
  })
  .get("/tracks", async (c) => {
    const track_list = await getTracks();
    return c.json(track_list);
  })
  .get("/tracks/:id", async (c) => {
    const id = Number(c.req.param("id"));

    console.log("this is data track: ", id);
    if (!id) return c.json({ message: "There is no track ID" });

    const track = await getTrackById(id);

    console.log("this is data track 2: ", track);

    if (!track) {
      c.status(400);
      return c.json({
        message: "Track no found!",
      });
    }

    return c.json(track);
  })
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
