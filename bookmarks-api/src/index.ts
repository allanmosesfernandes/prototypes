import { Hono } from 'hono';
import { serve } from '@hono/node-server'
import auth from './routes/auth.js';
const app = new Hono();

app.get('/', (c) => {
    return c.json({ message: 'Bookmarks API is running'})
})

app.route('/api/auth', auth);

serve({ fetch: app.fetch, port: 8000 }, () => {
    console.log('Server listening on port 8000');
});