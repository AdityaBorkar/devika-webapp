import type { ServerWebSocket } from 'bun';

import { ArkErrors } from 'arktype';

import { mutation } from '#letsync/server/endpoints/web-sockets/messages/mutation';
import { ping } from '#letsync/server/endpoints/web-sockets/messages/ping';
import { syncRequest } from '#letsync/server/endpoints/web-sockets/messages/syncRequest';

export interface WebsocketData {
	tenantId: string;
	userId: string;
}

const MessageType = syncRequest.message.or(mutation.message).or(ping.message);

export const wsHandler = {
	close: (ws: ServerWebSocket<WebsocketData>) => {
		const { userId, tenantId } = ws.data;
		console.log(`WebSocket closed for user: ${userId} (tenant: ${tenantId})`);
	},
	message: async (ws: ServerWebSocket<WebsocketData>, message: string) => {
		const data = MessageType(JSON.parse(message));
		if (data instanceof ArkErrors) {
			console.log({ data, message });
			throw new Error('Invalid message format');
		}

		// TODO: Use AsyncLocalStorage for `ws` and `data`
		if (data.type === 'ping') await ping.handler(ws, data);
		if (data.type === 'mutation') await mutation.handler(ws, data);
		if (data.type === 'sync_request') await syncRequest.handler(ws, data);
	},
	// open: async (ws: ServerWebSocket<WebsocketData>) => {
	// 	const { userId } = ws.data;
	// 	ws.send(JSON.stringify({ type: 'connected', userId }));
	// },
};
