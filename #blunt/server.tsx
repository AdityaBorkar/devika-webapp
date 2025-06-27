import { serve } from 'bun';

import { handler } from '@/lib/auth/server';
import { env } from '@/lib/env';
import index from './index.html';

const server = serve({
	development: env.NODE_ENV !== 'production' && {
		console: true,
		hmr: true,
	},
	routes: {
		'/*': index,
		'/api/auth/*': handler,
		'/pglite.data': handlePgliteFiles,
		'/pglite.wasm': handlePgliteFiles,
	},
});

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
