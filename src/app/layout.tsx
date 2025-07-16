import { Navigate, Outlet } from 'react-router';
import './index.css';

import { Toaster } from '@/components/Toaster';
import { useSession } from '@/lib/auth/client';

// const postgres = { client, name: 'client-postgres' } as const;

export default function RootLayout() {
	// const location = useLocation();
	const session = useSession();
	console.log(session);
	// const database = useDatabase(postgres);

	if (
		session.isPending
		// || database.isPending
	) {
		return <div>Loading...</div>;
	}
	if (location.pathname !== '/' && !session.data?.user?.id) {
		return <Navigate replace to="/" />;
	}
	// if (session.error || database.error) {
	// 	return (
	// 		<div>
	// 			Auth Error: {session.error?.message}
	// 			<br />
	// 			Database Error: {database.error?.message}
	// 		</div>
	// 	);
	// }

	return (
		// <SyncProvider
		// 	databases={[postgres]}
		// 	method="websocket"
		// 	server={{ endpoint: 'localhost:3000/api/sync', https: true }}
		// >
		// 	<LocalClient>
		<>
			<Outlet />
			<Toaster />
		</>
		// 	</LocalClient>
		// </SyncProvider>
	);
}

// function LocalClient({ children }: { children: React.ReactNode }) {
// 	// TODO - Work on this
// 	const config = { port: 5000 };
// 	return <LocalClientProvider config={config}>{children}</LocalClientProvider>;
// }
