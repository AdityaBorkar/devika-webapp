// import { IdbFs, PGlite } from '@electric-sql/pglite';

import { PGliteWorker } from '@electric-sql/pglite/worker';
import { drizzle } from 'drizzle-orm/pglite';

// biome-ignore lint/performance/noNamespaceImport: WE NEED TO IMPORT ALL FILES
import * as schema from './schema/index';

// TODO: Add worker support
const worker = new Worker(
	// new URL('./client-worker.ts', import.meta.url).href,
	'./client-worker.ts',
	{ name: 'db-worker', type: 'module' },
);
worker.onerror = (_err) => {};
export const client = new PGliteWorker(worker);

// export const client = new PGlite({
// 	fs: new IdbFs('devika'),
// 	relaxedDurability: true,
// });

export const db = drizzle(client, { schema });
