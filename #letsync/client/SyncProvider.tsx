import { createContext } from 'react';

import { useSync } from '#letsync/client/useSync';
import type { DatabaseListType } from '#letsync/types';

export function SyncProvider({
	databases,
	method = 'websocket',
	children,
}: {
	databases: DatabaseListType;
	method: 'websocket' | 'http-short-polling' | 'sse';
	children: React.ReactNode;
}) {
	const sync = useSync({ databases, method });
	return <SyncContext.Provider value={sync}>{children}</SyncContext.Provider>;
}

export const SyncContext = createContext<ReturnType<typeof useSync>>({
	error: null,
	isPending: true,
	isSyncing: false,
});
