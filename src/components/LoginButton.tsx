import { signIn, useSession } from '../lib/auth/client';

export function LoginButton() {
	const { data: session, isPending } = useSession();

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (session) {
		return (
			<div className="flex items-center gap-4">
				{/* <img
					alt={session.user.name || 'User'}
					className="h-8 w-8 rounded-full"
					src={session.user.image || 'https://github.com/shadcn.png'}
				/> */}
				<span>Welcome, {session.user.name}!</span>
			</div>
		);
	}

	return (
		<button
			className="rounded-md bg-gray-900 px-4 py-2 text-white transition-colors hover:bg-gray-800"
			onClick={() => signIn.social({ provider: 'github' })}
			type="button"
		>
			Sign in with GitHub
		</button>
	);
}
