import { Provider as JotaiProvider } from 'jotai';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';

import Logo from '@/../public/logo.svg';
import { TextShimmer } from '@/components/animations/TextShimmer';
import { DialogProvider } from '@/contexts/DialogContext';
import {
	ClientSyncProvider,
	useClientSync,
} from '@/lib/server-sync/ServerSync';

import './globals.css';

export default function RootLayout() {
	useEffect(() => {
		document.addEventListener('contextmenu', (e) => e.preventDefault());
	}, []);
	return (
		<NuqsAdapter>
			<JotaiProvider>
				<DialogProvider>
					<ClientSyncProvider>
						<Children />
					</ClientSyncProvider>
				</DialogProvider>
			</JotaiProvider>
		</NuqsAdapter>
	);
}

function Children() {
	// TODO: Check for AUTHENTICATION
	const session = useSession();
	const db = useDatabase();
	const client = useClientSync();
	// TODO: DATABASE CONNECTION
	// TODO: DB-SYNC CONNECTION

	const _location = useLocation();

	if (session.isPending || db.isPending || client.isPending)
		return <LoadingPlaceholder />;
	if (!session.data.user) return <Navigate to="/login" />;
	if (db.error) return <LoadingPlaceholder message={db.error.message} />;
	return <Outlet />;

	// if (
	// 	location.pathname === '/new' ||
	// 	(client.status.success && db.status.success)
	// )
	// if (message === "INVALID") return <ReinitializeProjectPlaceholder />;
	// if (client.status.message === 'NOT_FOUND') return <Navigate to="/new" />;
}

function LoadingPlaceholder({ message }: { message?: string }) {
	return (
		<div className="flex h-screen w-screen select-none flex-col items-center justify-center gap-4">
			<img alt="Logo" className="w-48" draggable={false} src={Logo} />
			<div className="border-border border-t px-8 py-4 text-sm">
				{message ? (
					<span className="text-rose-500">{message}</span>
				) : (
					<TextShimmer
						className="[--base-color:var(--color-text-tertiary)] [--base-gradient-color:var(--color-text-primary)]"
						duration={2}
						spread={2}
					>
						Loading Workspace
					</TextShimmer>
				)}
			</div>
		</div>
	);
}
