import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';

import { _setupDb } from '#letsync/client/_setupDb';
import { _syncData } from '#letsync/client/_syncData';
import { client, db } from '@/lib/db/client';
import { tryCatch } from '@/lib/tryCatch';

const DATABASE_NAME = 'client-postgres';

type SyncStatus = 'not-started' | 'in-progress' | 'in-sync' | 'error';
type DbStatus = 'initializing' | 'ready' | 'error';

interface DatabaseState {
	isPending: boolean;
	dbStatus: DbStatus;
	error: Error | null;
}

// Global state management for database
let dbState: DatabaseState = {
	dbStatus: 'initializing',
	error: null,
	isPending: true,
};
let listeners: (() => void)[] = [];
let initPromise: Promise<void> | null = null;

function notifyListeners() {
	for (const callback of listeners) {
		callback();
	}
}

function updateDbState(newState: Partial<DatabaseState>) {
	dbState = { ...dbState, ...newState };
	notifyListeners();
}

async function initializeDatabase() {
	if (initPromise) {
		return initPromise;
	}

	initPromise = (async () => {
		try {
			updateDbState({ dbStatus: 'initializing', error: null, isPending: true });

			const _PerfStart = performance.now();
			const { error } = await tryCatch(_setupDb({ name: DATABASE_NAME }));
			const _PerfEnd = performance.now();

			if (error) {
				updateDbState({ dbStatus: 'error', error, isPending: false });
			} else {
				updateDbState({ dbStatus: 'ready', error: null, isPending: false });
			}
		} catch (err) {
			updateDbState({
				dbStatus: 'error',
				error:
					err instanceof Error
						? err
						: new Error('Database initialization failed'),
				isPending: false,
			});
		}
	})();

	return initPromise;
}

// External store for database state
const databaseStore = {
	getServerSnapshot: () => dbState,
	getSnapshot: (): DatabaseState => dbState,
	subscribe: (callback: () => void) => {
		listeners.push(callback);

		// Start initialization if not already started
		if (!initPromise) {
			initializeDatabase().catch((err) => console.error({ err }));
		}

		return () => {
			listeners = listeners.filter((l) => l !== callback);
		};
	},
};

export function useDatabase() {
	const [sync, setSync] = useState<{ status: SyncStatus; error: Error | null }>(
		{
			error: null,
			status: 'not-started',
		},
	);

	const state = useSyncExternalStore(
		databaseStore.subscribe,
		databaseStore.getSnapshot,
		databaseStore.getServerSnapshot,
	);

	client
		?.query('SELECT 1')
		.then((res) => console.log({ res }))
		.catch((err) => console.error({ err }));

	useEffect(() => {
		if (state.dbStatus !== 'ready') {
			setSync({ error: null, status: 'not-started' });
			return;
		}

		let cancelled = false;

		async function syncData() {
			if (cancelled) {
				return;
			}

			setSync({ error: null, status: 'in-progress' });

			const { error } = await tryCatch(_syncData());

			if (!cancelled) {
				const status = error ? 'error' : 'in-sync';
				setSync({ error, status });
			}
		}

		syncData().catch((err) => console.error({ err }));

		return () => {
			cancelled = true;
		};
	}, [state.dbStatus]);

	return useMemo(
		() => ({
			db: state.dbStatus === 'ready' ? db : null,
			dbStatus: state.dbStatus,
			error: state.error || sync.error,
			isPending: state.dbStatus !== 'ready' || sync.status === 'in-progress',
			isReady: state.dbStatus === 'ready' && sync.status === 'in-sync',
			syncStatus: sync.status,
		}),
		[state, sync],
	);
}
