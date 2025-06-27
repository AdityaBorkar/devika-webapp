import { signOut, useSession } from '../lib/auth/client';

export function UserProfile() {
	const { data: session, isPending } = useSession();

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (!session) {
		return null;
	}

	return (
		<div className="rounded-lg bg-white p-6 shadow-md">
			<div className="mb-4 flex items-center gap-4">
				{/* <img
					alt={session.user.name || 'User'}
					className="h-16 w-16 rounded-full"
					src={session.user.image || ''}
				/> */}
				<div>
					<h2 className="font-semibold text-xl">{session.user.name}</h2>
					<p className="text-gray-600">{session.user.email}</p>
				</div>
			</div>

			<button
				className="rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
				onClick={() => signOut()}
				type="button"
			>
				Sign Out
			</button>
		</div>
	);
}
