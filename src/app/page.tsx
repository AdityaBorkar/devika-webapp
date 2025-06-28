'use client';

import { FaGithub } from 'react-icons/fa';
import { Navigate } from 'react-router';

import { signIn, useSession } from '@/lib/auth/client';

export default function LoginPage() {
	const session = useSession();

	if (session.data?.user?.id) {
		return <Navigate to="/~/workspaces" />;
	}
	return (
		<div className="flex min-h-screen flex-col items-center justify-center ">
			<div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
				<h1 className="mb-6 text-center font-bold text-3xl text-gray-900">
					Sign in
				</h1>
				<p className="mb-8 text-center text-gray-600">
					to continue to our awesome app
				</p>
				<button
					className="flex w-full items-center justify-center rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
					onClick={async () => {
						try {
							console.log('Starting GitHub sign in...');
							const result = await signIn.social({
								callbackURL: `${window.location.origin}/~/workspaces`,
								provider: 'github',
							});
							console.log('Sign in result:', result);
						} catch (error) {
							console.error('Sign in error:', error);
						}
					}}
					type="button"
				>
					<FaGithub className="mr-2 h-5 w-5" />
					Sign in with GitHub
				</button>
			</div>
		</div>
	);
}
