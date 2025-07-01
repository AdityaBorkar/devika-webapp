import { sql } from 'drizzle-orm';
import {
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
} from 'drizzle-orm/pg-core';

export const tenants = pgTable(
	'tenants',
	{
		computeId: uuid(),
		created: timestamp({ mode: 'string' })
			.default(sql`LOCALTIMESTAMP`)
			.notNull(),
		deleted: timestamp({ mode: 'string' }),
		id: uuid().default(sql`public.uuid_generate_v7()`).notNull(),
		name: text(),
		updated: timestamp({ mode: 'string' })
			.default(sql`LOCALTIMESTAMP`)
			.notNull(),
	},
	(table) => [
		uniqueIndex('tenants_pkey').using(
			'btree',
			table.id.asc().nullsLast().op('uuid_ops'),
		),
	],
);
