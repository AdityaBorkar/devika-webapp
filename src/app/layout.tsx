import { Navigate, Outlet, useLocation } from 'react-router';
import './index.css';

import { SyncProvider, useDatabase, useSync } from '#letsync/client';
import { LocalClientProvider, useLocalClient } from '#letsync/local-client';
import { useSession } from '@/lib/auth/client';
import { db } from '@/lib/db/client';

export default function RootLayout() {
	const location = useLocation();
	const database = useDatabase({ db, name: 'client-postgres' });
	const client = useLocalClient();
	const session = useSession();
	const sync = useSync({ db, method: 'websocket' });

	if (session.isPending || database.isPending) {
		return <div>Loading...</div>;
	}
	if (location.pathname !== '/' && !session.data?.user?.id) {
		return <Navigate replace to="/" />;
	}
	if (session.error || database.error) {
		return (
			<div>
				Auth Error: {session.error?.message}
				<br />
				Database Error: {database.error?.message}
			</div>
		);
	}
	return (
		<SyncProvider sync={sync}>
			<LocalClientProvider client={client}>
				<Outlet />
			</LocalClientProvider>
		</SyncProvider>
	);
}
