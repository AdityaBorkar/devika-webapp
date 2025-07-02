'use client';

import { Suspense } from 'react';

import { signOut, useSession } from '@/lib/auth/client';
import { $createTask } from '@/mutations/tasks';

export default function WorkspacesPage() {
	const session = useSession();
	const tenantId = session.data?.user?.id;
	if (!tenantId) throw new Error('Tenant ID is required');

	// const workspaces = db.query.workspaces.findMany({
	// 	where: (_, { eq }) => eq(_.tenantId, tenantId),
	// });

	return (
		<div>
			<form action={$createTask}>
				<input name="account_name" placeholder="AdityaBorkar" type="text" />
				<input name="repo_name" placeholder="devika-v2" type="text" />
				<button type="submit">Create Workspace</button>
			</form>

			<Suspense fallback={<div>Loading...</div>}>
				{/* <WorkspaceList list={workspaces} /> */}
			</Suspense>
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

// function WorkspaceList({ list }: { list: Promise<Workspace[]> }) {
// 	const data = use(list);
//  // TODO: Search, Filter, Views, Pagination, etc.
// 	return (
// 		<div>
// 			{data.map((item) => (
// 				<WorkspaceItem key={item.id} workspace={item} />
// 			))}
// 		</div>
// 	);
// }

// function WorkspaceItem({ workspace }: { workspace: Workspace }) {
// 	return <div>{workspace.name}</div>;
// }
