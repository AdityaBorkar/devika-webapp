import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const tasks = pgTable('tasks', {
	createdAt: timestamp('created_at').defaultNow().notNull(),
	description: text('description'),
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	status: text('status', { enum: ['pending', 'in_progress', 'completed'] }).default('pending').notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
