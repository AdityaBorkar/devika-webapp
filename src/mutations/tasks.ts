import { type } from 'arktype';

import { MutationHandler } from '#letsync/mutations';
import { tasks } from '@/lib/db/schema/tasks';
import { authHandler } from '@/mutations/_middlewares';

const schema = type({
	description: 'string',
	name: 'string',
});

export const $createTask = MutationHandler()
	.setName('task:create')
	.setParams(schema)
	.middleware(authHandler)
	.handler(async ({ validatedData, db }) => {
		const [task] = await db
			.insert(tasks)
			.values({
				...validatedData,
				createdAt: new Date(),
				id: crypto.randomUUID(),
				updatedAt: new Date(),
			})
			.returning();
		return task;
	});
