// ! WORKAROUND for BUG: https://github.com/oven-sh/bun/issues/20071 & https://github.com/oven-sh/bun/issues/15032
function handlePgliteFiles(req: Request) {
	const url = new URL(req.url);
	const filePath = url.pathname.replace('/pglite/', '');
	const file = Bun.file(`node_modules/@electric-sql/pglite/dist/${filePath}`);

	let contentType = 'application/octet-stream';
	if (filePath.endsWith('.wasm')) {
		contentType = 'application/wasm';
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
