import type { ServerWebSocket } from 'bun';

import {
	sendErrorMessage,
	sendMessage,
} from '#letsync/server/endpoints/ws/wsHandler';
import type { EnhancedWebSocketData } from '#letsync/types';

export async function handleData(
	ws: ServerWebSocket<EnhancedWebSocketData>,
	message: DataMessage,
) {
	const { userId, tenant_id } = ws.data;

	// Validate sync request
	if (
		typeof message.since_timestamp !== 'number' ||
		message.since_timestamp < 0
	) {
		await sendErrorMessage(ws, 'Invalid since_timestamp', 'INVALID_TIMESTAMP');
		return;
	}

	console.log(
		`Sync request from user ${userId} (tenant: ${tenant_id}) since ${message.since_timestamp}`,
	);

	// TODO: Implement sync engine integration
	// This is a placeholder for the sync engine that will be implemented by Agent 3
	try {
		// Update subscription filters if provided
		if (message.table_filters) {
			ws.data.active_subscriptions = message.table_filters;
		}

		// Placeholder: Send empty sync data for now
		await sendMessage(ws, {
			changes: [],
			timestamp: Date.now(), // Will be populated by sync engine
			type: 'sync_data',
		});

		// Update last sync timestamp
		ws.data.last_sync_timestamp = Date.now();
	} catch (error) {
		console.error('Error handling sync request:', error);
		await sendErrorMessage(ws, 'Failed to process sync request', 'SYNC_ERROR');
	}
}
