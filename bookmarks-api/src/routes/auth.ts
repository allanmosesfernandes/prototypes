import { Hono } from 'hono';
import { users } from '../db/schema.js';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db } from '../db/index.js'
const auth = new Hono();

auth.post('/register', async (c) => {
    const { email, password } = await c.req.json();
    if (!email || !password) {
        return c.json({ error: 'Email and password are required' }, 400);
    }

    // Check if user exists
    const existing = await db.select().from(users).where(eq(users.email, email));

    if (existing.length > 0) {
        return c.json({error: 'Email already registered'}, 400)
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [user] = await db.insert(users).values({
        email,
        password: hashedPassword
    }).returning({ id: users.id, email: users.email });

    return c.json({ user }, 201);
});

auth.post('/login', async (c) => {
  const { email, password } = await c.req.json();
  if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
  }
  const [user] = await db.select().from(users).where(eq(users.email, email));
  if (!user) {
    return c.json({ error: 'User does not exist' }, 400);
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return c.json({ error: 'invalid password' }, 404)
  }

  return c.json({ message: 'Login successful', email });
})

export default auth;

/*
import { Hono } from 'hono';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

const auth = new Hono();

auth.post('/register', async (c) => {
  const { email, password } = await c.req.json();

  if (!email || !password) {
    return c.json({ error: 'Email and password are required' }, 400);
  }

  // Check if user already exists
  const existing = await db.select().from(users).where(eq(users.email, email));

  if (existing.length > 0) {
    return c.json({ error: 'Email already registered' }, 409);
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user
  const [user] = await db.insert(users).values({
    email,
    password: hashedPassword,
  }).returning({ id: users.id, email: users.email });

  return c.json({ user }, 201);
});

export default auth;
```

Test it:
```
curl -X POST http://localhost:8000/api/auth/register -H "Content-Type: application/json" -d "{\"email\": \"allan@test.com\", \"password\": \"test123\"}"
*/
