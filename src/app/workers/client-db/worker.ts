import { IdbFs, PGlite } from '@electric-sql/pglite';
import { worker } from '@electric-sql/pglite/worker';

worker({
	async init() {
		const pg = new PGlite({
			fs: new IdbFs('devika'),
			relaxedDurability: true,
		});
		// ? We are not waiting here because we want the main thread to do work faster.
		// await pg.waitReady;
		// TODO: Perform Sync
		return pg;
	},
});

// ! WORKAROUND for Web Workers
// async function handleWebWorkers(req: Request) {
// 	const url = new URL(req.url);
// 	const result = await build({
// 		entrypoints: [`./src/app/${url.pathname}`],
// 		format: 'esm',
// 		target: 'browser',
// 	});
// 	const output = await result.outputs[0].text();
// 	const headers = {
// 		'Content-Type': 'application/javascript',
// 		'Cross-Origin-Embedder-Policy': 'require-corp',
// 		'Cross-Origin-Opener-Policy': 'same-origin',
// 	};
// 	return new Response(output, { headers });
// }
