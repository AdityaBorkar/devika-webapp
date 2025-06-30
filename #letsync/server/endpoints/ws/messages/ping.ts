import type { ServerWebSocket } from 'bun';

import { sendMessage } from '#letsync/server/endpoints/ws/wsHandler';
import type { EnhancedWebSocketData } from '#letsync/types';

export async function handlePing(
	ws: ServerWebSocket<EnhancedWebSocketData>,
	_message: PingMessage,
) {
	await sendMessage(ws, { timestamp: Date.now(), type: 'pong' });
}
