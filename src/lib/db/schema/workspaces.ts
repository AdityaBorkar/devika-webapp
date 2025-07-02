import { pgTable, text } from 'drizzle-orm/pg-core';

import { CommonColumns, cuid2 } from './_utils';

export const workspaces = pgTable('workspaces', {
	...CommonColumns,
	description: text(),
	id: cuid2(),
	name: text().notNull(),
	slug: text().notNull(),
});

export type Workspace = typeof workspaces.$inferSelect;
