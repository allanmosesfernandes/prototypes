import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';

const client = postgres('postgres://bookmark_user:bookmark_pass@localhost:5432/bookmark_db');

export const db = drizzle(client, { schema });