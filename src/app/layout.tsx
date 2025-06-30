import { Navigate, Outlet, useLocation } from 'react-router';
import './index.css';

import { SyncProvider, useDatabase } from '#letsync/client';
import { LocalClientProvider } from '#letsync/local-client';
import { useSession } from '@/lib/auth/client';
import { db } from '@/lib/db/client';

const postgres = { db, name: 'client-postgres' } as const;

export default function RootLayout() {
	const location = useLocation();
	const session = useSession();
	const database = useDatabase(postgres);

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
		<SyncProvider databases={[postgres]} method="websocket">
			<LocalClient>
				<Outlet />
			</LocalClient>
		</SyncProvider>
	);
}

function LocalClient({ children }: { children: React.ReactNode }) {
	const config = { port: 5000 };
	return <LocalClientProvider config={config}>{children}</LocalClientProvider>;
}
