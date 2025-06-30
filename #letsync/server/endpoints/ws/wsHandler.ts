import type { ServerWebSocket } from 'bun';

import { ArkErrors } from 'arktype';

import { handleData } from '#letsync/server/endpoints/ws/messages/data';
import { handleMutation } from '#letsync/server/endpoints/ws/messages/mutation';
import { handlePing } from '#letsync/server/endpoints/ws/messages/ping';
import { MessageType } from '#letsync/server/endpoints/ws/messages/types';
import type { EnhancedWebSocketData } from '#letsync/types';

export const wsHandler = {
	close: (ws: ServerWebSocket<EnhancedWebSocketData>) => {
		const { userId, tenant_id } = ws.data;
		console.log(`WebSocket closed for user: ${userId} (tenant: ${tenant_id})`);
		// TODO: Cleanup any active sync subscriptions
	},
	message: async (
		ws: ServerWebSocket<EnhancedWebSocketData>,
		message: string,
	) => {
		const data = MessageType(message);
		if (data instanceof ArkErrors) {
			throw new Error('Invalid message format');
		}

		if (data.type === 'ping') await handlePing(ws, data);
		if (data.type === 'data') await handleData(ws, data);
		if (data.type === 'mutation') await handleMutation(ws, data);

		// TODO: How to cache? When to cache?
		// Store changes, Cache changes.
		// CRON JOB: Store CDC in Redis.
		// Every 5 hours -> Group CDC by tenantId and startingCursor, and store in cdcCache. Update cdcCache.updatedAt and bucket.
	},
	open: async (ws: ServerWebSocket<EnhancedWebSocketData>) => {
		const { userId, connectionTime, session } = ws.data;

		const cursor = undefined; // TODO: Change this.
		ws.data.tenant_id = session?.tenant_id || userId;
		ws.data.last_sync_timestamp = Date.now();
		ws.data.active_subscriptions = [];

		// TODO - get cursor pointer, get all changes since cursor
		// TODO: Return data for initial sync.
		// TODO: Sync ahead of time ? or on demand?
		// Indexing: Add composite indexes (e.g., (tenant_id, created_at)) to avoid full scans during CDC polling 1011.
		// Partitioning: Use PostgreSQL partitioning by tenant_id to isolate large tenants and speed up CDC queries 211.

		await sendMessage(ws, {
			timestamp: connectionTime,
			type: 'connected',
			userId,
		});
	},
};

async function sendMessage(
	ws: ServerWebSocket<EnhancedWebSocketData>,
	message: Record<string, unknown>,
) {
	try {
		ws.send(JSON.stringify(message));
	} catch (error) {
		console.error('Error sending WebSocket message:', error);
	}
}

async function sendErrorMessage(
	ws: ServerWebSocket<EnhancedWebSocketData>,
	message: string,
	code?: string,
) {
	await sendMessage(ws, {
		code,
		message,
		timestamp: Date.now(),
		type: 'error',
	});
}

// Export utility functions for use by other modules
export { sendMessage, sendErrorMessage };
