// import { workspace } from 'drizzle/schema/workspace';
// import { eq } from 'drizzle-orm';
// import db from '@/lib/server-db';

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
