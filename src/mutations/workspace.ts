import { type } from 'arktype';

import { MutationHandler } from '#letsync/mutations';
import { workspaces } from '@/lib/db/schema/workspaces';
import { authHandler } from '@/mutations/_middlewares';

const schema = type({
	account_name: 'string',
	repo_name: 'string',
});

export const $createWorkspace = MutationHandler()
	.setName('workspace:create')
	.setParams(schema)
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
