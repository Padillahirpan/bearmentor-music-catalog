import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import { getUserById, getUsers } from './users'

const app = new Hono()
app.use(prettyJSON())

app.get('/users', async (c) => {
  const users = await getUsers();
  return c.json(users);
});

app.get('/users/:id', async (c) => {
  const id = c.req.param('id');
  const user = await getUserById(+id);

  return c.json(user);
});

app.get('/test-error', (c) => {
  c.status(400)
  return c.json({error: "Please try again!"})
})

export default app
