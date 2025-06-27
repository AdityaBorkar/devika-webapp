'use client';

import { FaGithub } from 'react-icons/fa';

import { signIn } from '@/lib/auth/client';

export default function LoginPage() {
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
					onClick={() =>
						signIn.social({
							callbackURL: '/~/workspaces',
							provider: 'github',
						})
					}
					type="button"
				>
					<FaGithub className="mr-2 h-5 w-5" />
					Sign in with GitHub
				</button>
			</div>
		</div>
	);
}
