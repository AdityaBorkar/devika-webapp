import { Navigate, Outlet, useLocation } from 'react-router';
import './index.css';

import { useDatabase } from '#letsync/client';
import { useSession } from '@/lib/auth/client';

export default function RootLayout() {
	const location = useLocation();
	const session = useSession();
	const db = useDatabase();

	console.log({ session });

	if (session.isPending || db.isPending) {
		return <div>Loading...</div>;
	}
	if (location.pathname !== '/' && !session.data?.user) {
		return <Navigate to="/" />;
	}
	if (session.error || db.error) {
		return (
			<div>
				Auth Error: {session.error?.message}
				<br />
				Database Error: {db.error?.message}
			</div>
		);
	}
	return <Outlet />;
}
