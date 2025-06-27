import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { env } from '@/lib/env';
// biome-ignore lint/performance/noNamespaceImport: WE NEED TO IMPORT ALL FILES
import * as schema from './schema/index';

export const client = new Pool({ connectionString: env.DATABASE_URL });
export const db = drizzle(client, { schema });
