// import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

// import { CommonColumns } from './_utils';

// export const prd = pgTable('prd', {
// 	...CommonColumns,
// 	closedAt: timestamp(),
// 	id: text().primaryKey(),
// 	name: text().notNull(),
// 	version: text().notNull(),
// });

// export const prdChanges = pgTable('prd_changes', {
// 	...CommonColumns,
// 	approvedAt: timestamp(),
// 	changes: text().notNull(),
// 	id: text().primaryKey(),
// 	notes: text().notNull(),
// 	prdId: text().notNull(),
// });

// export const prdFile = pgTable('prd_file', {
// 	...CommonColumns,
// 	bucket: text().notNull(),
// 	id: text().primaryKey(),
// 	prdId: text().notNull(),
// 	title: text().notNull(),
// });

// export const prdChat = pgTable('prd_chat', {
// 	...CommonColumns,
// 	bucket: text().notNull(),
// 	id: text().primaryKey(),
// 	prdId: text().notNull(),
// 	title: text().notNull(),
// });
