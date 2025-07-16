// import type { PGlite } from '@electric-sql/pglite';
// import { PGliteWorker } from '@electric-sql/pglite/worker';
// import { drizzle } from 'drizzle-orm/pglite';

// // biome-ignore lint/performance/noNamespaceImport: WE NEED TO IMPORT ALL FILES
// import * as schema from './schema/index';

// const worker = new Worker('/workers/client-db.ts', {
// 	name: 'db-worker',
// 	type: 'module',
// });

// worker.onerror = (_err) => {
// 	console.error('Worker Error', _err);
// };

// export const client = new PGliteWorker(worker) as unknown as PGlite;

// export const db = drizzle(client, { casing: 'snake_case', schema });
