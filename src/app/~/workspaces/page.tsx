import { signOut } from '@/lib/auth/client';

export default function WorkspacesPage() {
	return (
		<div>
			<button
				onClick={() => {
					signOut();
				}}
				type="button"
			>
				Sign out
			</button>
		</div>
	);
}
