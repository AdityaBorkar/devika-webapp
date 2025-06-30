import { useEffect, useState } from 'react';

import type { DatabaseListType } from '#letsync/types';
import { Logger } from '#letsync/utils/Logger';

// Constants:
const DOMAIN = 'localhost:3000';
const URL = '/api/sync';
// ---

type SyncState = {
	isPending: boolean;
	isSyncing: boolean;
	error: string | null;
};

export function useSync({
	databases,
	method = 'websocket',
}: {
	databases: DatabaseListType;
	method: 'websocket' | 'http-short-polling' | 'sse';
}) {
	const [sync, setSync] = useState<SyncState>({
		error: null,
		isPending: true,
		isSyncing: false,
	});

	useEffect(() => {
		const controller = new AbortController();
		const _PerfStart = performance.now();

		if (method === 'websocket') {
			syncData_WS({ databases, signal: controller.signal })
				.then(() => {
					setSync({ error: null, isPending: false, isSyncing: true });
					const _PerfEnd = performance.now();
					logger.log(`Sync data took ${_PerfEnd - _PerfStart}ms`);
				})
				.catch((error) => {
					setSync({ error: error.message, isPending: false, isSyncing: false });
				});
		}

		if (method === 'http-short-polling') {
			throw new Error('Not implemented');
		}

		if (method === 'sse') {
			throw new Error('Not implemented');
		}

		return () => controller.abort();
	}, [databases, method]);

	return sync;
}

// Sync user data from server
type WsMessage = {
	type: 'initial_sync' | 'mutation';
	[key: string]: unknown;
};

const logger = new Logger('SYNC');
async function syncData_WS({
	signal,
	databases,
}: {
	signal: AbortSignal;
	databases: DatabaseListType;
}): Promise<void> {
	const ws = new window.WebSocket(`wss://${DOMAIN}${URL}/ws`);
	const sendData = (data: WsMessage) => ws.send(JSON.stringify(data));

	ws.onopen = () => {
		logger.log('Connection Established');
		const cursors = databases.map(({ name }) => {
			// ! TODO: Fetch Cursor
			const cursor = undefined;
			return { cursor, name };
		});
		sendData({ cursors, type: 'initial_sync' });
	};
	ws.onmessage = (event) => {
		const data = JSON.parse(event.data);
		console.log({ data });
		// ! TODO: Handle `type`
		// sync_request
		// sync_data
		// mutation
		// mutation_ack
		if (data.type === 'initial_sync') {
			console.log(data);
		}
		if (data.type === 'mutation') {
			console.log(data);
		}
	};
	ws.onerror = (error) => {
		logger.error('Connection Error', error);
		// TODO: Handle UNAUTHORIZED
		// TODO: Report Status
	};
	ws.onclose = () => {
		logger.log('Connection Closed');
		// TODO: Report Status
	};
	signal.addEventListener('abort', () => {
		ws.close();
	});
}
