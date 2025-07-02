import { boolean, pgEnum, pgTable, text } from 'drizzle-orm/pg-core';

import { CommonColumns, cuid2 } from './_utils';

export const taskStatus = pgEnum('task_status', [
	'pending',
	'in_progress',
	'completed',
	'cancelled',
	'failed',
]);

export const tasks = pgTable('tasks', {
	...CommonColumns,
	description: text(),
	id: cuid2(),
	isRunning: boolean().default(false).notNull(),
	name: text().notNull(),
	status: taskStatus().default('pending').notNull(),
	// blocking: text().array(),
	// dependsOn: text().array(),
	// subTasks: text().array(),
});
