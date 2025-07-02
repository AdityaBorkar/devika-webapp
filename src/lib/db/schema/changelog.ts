import { pgTable, text } from 'drizzle-orm/pg-core';

import { CommonColumns, cuid2 } from './_utils';

export const changelog = pgTable('changelog', {
	...CommonColumns,
	cycleId: cuid2(),
	notes: text().notNull(),
	summary: text().notNull(),
});
