import type { PgliteDatabase } from 'drizzle-orm/pglite';
import { useState } from 'react';

// 1. Websocket Connection for sync
// 2. HTTP Polling / SSE for sync

type SyncState = {
	isPending: boolean;
	isSyncing: boolean;
	error: Error | null;
};

// biome-ignore lint/suspicious/noExplicitAny: WE NEED TO SUPPORT ANY DATABASE TYPE
export function useSync<DbType extends PgliteDatabase<any>>({
	db,
	method,
}: {
	db: DbType;
	method: 'websocket' | 'http-short-polling' | 'sse';
}) {
	const [sync, setSync] = useState<SyncState>({
		error: null,
		isPending: true,
		isSyncing: false,
	});

	// // biome-ignore lint/correctness/useExhaustiveDependencies: EFFECT DEPENDENCIES ARE NOT RELEVANT HERE
	// useEffect(() => {
	// 	if (db.error) {
	// 		setSync({ error: null, isPending: false, isSyncing: false });
	// 		return;
	// 	}

	// 	setSync({ error: null, isPending: true, isSyncing: false });

	// 	const { signal, abort } = new AbortController();
	// 	tryCatch(_syncData({ signal })).then(({ error }) => {
	// 		const isSyncing = !error; // TODO: check if sync is complete
	// 		setSync({ error, isPending: false, isSyncing });
	// 	});
	// 	return () => abort();
	// }, [db.isPending, db.error]);

	return sync;
}
