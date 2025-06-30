import type { ServerWebSocket } from 'bun';

import { sendMessage } from '#letsync/server/endpoints/ws/wsHandler';
import type { EnhancedWebSocketData } from '#letsync/types';

// TODO: [publish] mutation result

export async function handleMutation(
	ws: ServerWebSocket<EnhancedWebSocketData>,
	message: MutationMessage,
) {
	const { userId, tenant_id } = ws.data;

	// Validate mutation message
	const validationError = validateMutationMessage(message);
	if (validationError) {
		await sendErrorMessage(ws, validationError, 'VALIDATION_ERROR');
		return;
	}

	console.log(`Mutation from user ${userId} (tenant: ${tenant_id}):`, {
		operation: message.operation,
		table: message.table,
		temp_id: message.temp_id,
	});

	// TODO: Implement mutation processing pipeline
	// This is a placeholder for the mutation validator and processor that will be implemented by Agent 3
	try {
		// Placeholder: Always acknowledge success for now
		await sendMessage(ws, {
			server_timestamp: Date.now(),
			success: true,
			temp_id: message.temp_id,
			type: 'mutation_ack',
		});
	} catch (error) {
		console.error('Error handling mutation:', error);
		await sendMessage(ws, {
			error: error instanceof Error ? error.message : 'Unknown error',
			server_timestamp: Date.now(),
			success: false,
			temp_id: message.temp_id,
			type: 'mutation_ack',
		});
	}
}

// Utility functions
function validateMutationMessage(message: MutationMessage): string | null {
	if (!message.table || typeof message.table !== 'string') {
		return 'Missing or invalid table name';
	}

	if (
		!(
			message.operation &&
			['insert', 'update', 'delete'].includes(message.operation)
		)
	) {
		return 'Invalid operation type';
	}

	if (!message.data || typeof message.data !== 'object') {
		return 'Missing or invalid data object';
	}

	if (
		typeof message.client_timestamp !== 'number' ||
		message.client_timestamp <= 0
	) {
		return 'Missing or invalid client_timestamp';
	}

	return null;
}
