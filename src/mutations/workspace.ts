import { type } from 'arktype';

import { MutationHandler } from '#letsync/mutations';
import { workspaces } from '@/lib/db/schema/workspaces';
import { authHandler, schemaHandler } from '@/mutations/_middlewares';

const NewWorkspaceSchema = type({
	account_name: 'string',
	repo_name: 'string',
});

const workspaceMutation = new MutationHandler()
	.setName('workspace:create')
	.middleware(authHandler)
	.handler(async ({ validatedData, db }) => {
		const [workspace] = await db
			.insert(workspaces)
			.values({
				...validatedData,
				createdAt: new Date(),
				id: `${validatedData.account_name}/${validatedData.repo_name}`,
				updatedAt: new Date(),
			})
			.returning();
		return workspace;
	});

// Add schema middleware
const schemaMiddleware = schemaHandler(NewWorkspaceSchema);
workspaceMutation.middleware(schemaMiddleware);

export const $createWorkspace = workspaceMutation.toCallable();
