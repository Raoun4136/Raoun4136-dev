import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const hasDatabaseUrl = () => Boolean(process.env.DATABASE_URL);

const createDb = () => {
  const sql = neon(process.env.DATABASE_URL!);
  return drizzle({ client: sql, schema });
};

type Database = ReturnType<typeof createDb>;

let dbInstance: Database | null = null;

export const getDb = (): Database | null => {
  if (!hasDatabaseUrl()) return null;
  if (!dbInstance) dbInstance = createDb();
  return dbInstance;
};

export const isDatabaseEnabled = hasDatabaseUrl;
