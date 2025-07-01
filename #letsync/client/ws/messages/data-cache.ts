import { type } from 'arktype';

const message = type({
	cache: 'object',
	refId: 'string',
	type: '"data_cache"',
});

function handler(ws: WebSocket, msg: typeof message.infer) {
	// TODO: Handle data cache
}

export const dataCache = { handler, message };
