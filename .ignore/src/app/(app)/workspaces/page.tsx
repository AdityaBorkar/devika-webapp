import { workspace } from 'drizzle/schema';

import { db } from '@/lib/client-db';

const workspaces = db.select().from(workspace).limit(10);
workspaces.then((data) => console.log({ data }));

export default function WorkspacesPage() {
	console.log({ workspace, workspaces });
	return <div>{/* Project Name, GitHub, isRunning, IDE, LOGO */}</div>;
}
