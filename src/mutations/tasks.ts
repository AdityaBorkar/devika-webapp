import { type } from 'arktype';

import { MutationHandler } from '#letsync/mutations';
import { tasks } from '@/lib/db/schema/tasks';
import { authHandler, schemaHandler } from '@/mutations/_middlewares';

const NewTaskSchema = type({
	description: 'string',
	name: 'string',
});

const taskMutation = new MutationHandler()
	.setName('task:create')
	.middleware(authHandler)
	.middleware(schemaHandler(NewTaskSchema))
	.handler(async ({ validatedData, db }) => {
		const task = {
			...validatedData,
			createdAt: new Date(),
			id: crypto.randomUUID(),
			updatedAt: new Date(),
		};
		const [insertedTask] = await db.insert(tasks).values(task).returning();
		return insertedTask;
	});

export const $createTask = taskMutation.toCallable();
