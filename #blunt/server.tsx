import { build, serve } from 'bun';

import {
	handler as syncHandler,
	handler_ws as syncHandler_ws,
} from '#letsync/server';
import { handler as authHandler } from '@/lib/auth/server';
import { env } from '../src/env';
import index from './index.html';

// CLI Arguments:
const ENABLE_HTTPS = true;

// HTTPS configuration
const cert = Bun.file('./certs/cert.pem');
const key = Bun.file('./certs/key.pem');
if (ENABLE_HTTPS && !((await key.exists()) && (await cert.exists()))) {
	console.error('Certificate or key file does not exist');
	process.exit(1);
}

// Server configuration
const server = serve({
	development: env.NODE_ENV !== 'production' && {
		// console: true,
		hmr: true,
	},
	routes: {
		'/*': index,
		'/api/auth/*': authHandler,
		'/api/sync/*': syncHandler,
		// These are edge cases and a better solution is needed:
		'/pglite.data': handlePgliteFiles,
		'/pglite.wasm': handlePgliteFiles,
		'/workers/*': handleWebWorkers,
	},
	// @ts-expect-error
	tls: { cert, key },
	websocket: {
		close: syncHandler_ws.close,
		message: syncHandler_ws.message,
		open: syncHandler_ws.open,
	},
});

// ! WORKAROUND for Web Workers
async function handleWebWorkers(req: Request) {
	const url = new URL(req.url);
	const result = await build({
		entrypoints: [`./src/app/${url.pathname}`],
		format: 'esm',
		target: 'browser',
	});
	const output = await result.outputs[0].text();
	const headers = {
		'Content-Type': 'application/javascript',
		'Cross-Origin-Embedder-Policy': 'require-corp',
		'Cross-Origin-Opener-Policy': 'same-origin',
	};
	return new Response(output, { headers });
}

// ! WORKAROUND for BUG: https://github.com/oven-sh/bun/issues/20071 & https://github.com/oven-sh/bun/issues/15032
function handlePgliteFiles(req: Request) {
	const url = new URL(req.url);
	const filePath = url.pathname.replace('/pglite/', '');
	const file = Bun.file(`node_modules/@electric-sql/pglite/dist/${filePath}`);

	let contentType = 'application/octet-stream';
	if (filePath.endsWith('.wasm')) {
		contentType = 'application/wasm';
	} else if (filePath.endsWith('.js')) {
		contentType = 'application/javascript';
	} else if (filePath.endsWith('.data')) {
		contentType = 'application/octet-stream';
	}

	return new Response(file, {
		headers: {
			'Content-Type': contentType,
			'Cross-Origin-Embedder-Policy': 'require-corp',
			'Cross-Origin-Opener-Policy': 'same-origin',
		},
	});
}

console.log(`Listening on ${server.url}`);
