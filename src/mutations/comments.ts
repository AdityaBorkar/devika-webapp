// import { workspace } from 'drizzle/schema/workspace';
// import { eq } from 'drizzle-orm';
// import db from '@/lib/server-db';

// export async function POST(req: Request) {
// 	const user = { slug: 'adityaborkar' };

// 	const { name, tdd, ide: IDE } = await req.json();
// 	const ide = IDE.sort((a: string, b: string) => a.localeCompare(b)).join(',');
// 	const slug = `${user.slug}/${name.toLowerCase().trim().replace(/ /g, '-')}`;
// 	const data = { name, tdd, ide, slug };
// 	const ws = await db.insert(workspace).values(data);
// 	return new Response(JSON.stringify({ success: true, data: ws }));
// }

// export async function GET(req: Request) {
// 	const { searchParams } = new URL(req.url);
// 	const slug = searchParams.get('slug');
// 	if (!slug)
// 		return new Response(
// 			JSON.stringify({ success: false, error: 'Slug is required' }),
// 		);

// 	const [ws] = await db
// 		.select()
// 		.from(workspace)
// 		.where(eq(workspace.slug, slug));
// 	if (!ws)
// 		return new Response(
// 			JSON.stringify({ success: false, error: 'Workspace not found' }),
// 		);

// 	return new Response(JSON.stringify({ success: true, data: ws }));
// }

// // Update task mutation
// const UpdateTaskSchema = type({
// 	description: 'string?',
// 	id: 'string',
// 	name: 'string?',
// 	status: '"pending" | "in_progress" | "completed"?',
// });

// export const $updateTask = mutation<typeof UpdateTaskSchema.infer, Task>()
// 	.rateLimit({ rpm: 120 })
// 	.auth(({ session }) => !!session?.user?.id)
// 	.handler(async (data, { db }) => {
// 		const validatedData = UpdateTaskSchema(data);
// 		if (validatedData instanceof ArkErrors) {
// 			throw new Error('Invalid task update data: ' + validatedData.toString());
// 		}

// 		const { id, ...updateData } = validatedData;
// 		const updatePayload = {
// 			...updateData,
// 			updatedAt: new Date(),
// 		};

// 		const [updatedTask] = await db
// 			.update(tasks)
// 			.set(updatePayload)
// 			.where(eq(tasks.id, id))
// 			.returning();

// 		if (!updatedTask) {
// 			throw new Error('Task not found');
// 		}

// 		// TODO: Add optimistic updates
// 		// TODO: Add WebSocket broadcast for real-time updates
// 		// TODO: Add conflict resolution

// 		return updatedTask;
// 	})
// 	.onSuccess(({ data }) => {
// 		console.log('Task updated:', data);
// 	})
// 	.onError(({ error }) => {
// 		console.error('Task update failed:', error);
// 	});

// // Delete task mutation
// const DeleteTaskSchema = type({
// 	id: 'string',
// });

// export const $deleteTask = mutation<
// 	typeof DeleteTaskSchema.infer,
// 	{ id: string }
// >()
// 	.rateLimit({ rpm: 30 })
// 	.auth(({ session }) => !!session?.user?.id)
// 	.handler(async (data, { db }) => {
// 		const validatedData = DeleteTaskSchema(data);
// 		if (validatedData instanceof ArkErrors) {
// 			throw new Error('Invalid task delete data: ' + validatedData.toString());
// 		}

// 		const deletedRows = await db
// 			.delete(tasks)
// 			.where(eq(tasks.id, validatedData.id))
// 			.returning();

// 		const deletedTask = deletedRows[0];

// 		if (!deletedTask) {
// 			throw new Error('Task not found');
// 		}

// 		// TODO: Add soft delete support
// 		// TODO: Add WebSocket broadcast for real-time updates
// 		// TODO: Add undo functionality

// 		return { id: deletedTask.id };
// 	})
// 	.onSuccess(({ data }) => {
// 		console.log('Task deleted:', data);
// 	})
// 	.onError(({ error }) => {
// 		console.error('Task deletion failed:', error);
// 	});

// Enhanced validation with sanitization
// function validateAndSanitizeTask(taskData: Task): Task | null {
// 	const TaskIdRegex = /^[a-zA-Z0-9_-]+$/;
// 	// ID validation
// 	if (
// 		!taskData.id ||
// 		typeof taskData.id !== 'string' ||
// 		!TaskIdRegex.test(taskData.id)
// 	) {
// 		console.error(
// 			'Invalid task ID: must be alphanumeric with hyphens/underscores only',
// 		);
// 		return null;
// 	}

// 	// Name validation and sanitization
// 	if (!taskData.name || typeof taskData.name !== 'string') {
// 		console.error('Task name is required and must be a string');
// 		return null;
// 	}

// 	const sanitizedName = taskData.name.trim().slice(0, 255); // Limit length, trim whitespace
// 	if (sanitizedName.length === 0) {
// 		console.error('Task name cannot be empty');
// 		return null;
// 	}

// 	// Sanitize optional fields
// 	const sanitizedTask: Task = {
// 		createdAt: taskData.createdAt || new Date(),
// 		description: taskData.description?.trim().slice(0, 1000) || null,
// 		id: taskData.id,
// 		name: sanitizedName,
// 		status: ['pending', 'in_progress', 'completed'].includes(
// 			taskData.status || '',
// 		)
// 			? (taskData.status as 'pending' | 'in_progress' | 'completed')
// 			: 'pending',
// 		updatedAt: taskData.updatedAt || new Date(),
// 	};

// 	return sanitizedTask;
// }

// const toastId = toast.loading('Creating workspace...', {
// 	description: `Creating workspace ${validatedData.account_name}/${validatedData.repo_name}`,
// });
// toast.success('Workspace created', {
// 	description: `Workspace ${workspace.id} created`,
// 	id: toastId,
// });
// .onSuccess(({ data }) => {
// 	console.log('Task created:', data);
// })
// .onError(({ error }) => {
// 	console.error('Task creation failed:', error);
// });

// TODO: Add conflict resolution
