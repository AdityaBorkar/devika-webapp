import { pgTable, text } from 'drizzle-orm/pg-core';

import { CommonColumns, cuid2 } from './_utils';

export const cycle = pgTable('cycle', {
	...CommonColumns,
	id: cuid2(),
	name: text().notNull(),
	versionPrefix: text().notNull(),
});

// Actual Version = 10.2.1-cycledId
