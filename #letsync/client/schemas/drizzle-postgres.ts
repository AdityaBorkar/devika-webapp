import { boolean, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const clientSchemas = pgTable('client_schemas', {
	checksum: text('checksum').notNull(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	id: serial('id').primaryKey(),
	isRolledBack: boolean('isRolledBack').default(false).notNull(),
	snapshot: text('snapshot').notNull(),
	sql: text('sql').notNull(),
	tag: text('tag'),
	version: text('version').notNull(),
});

export const clientMetadata = pgTable('client_metadata', {
	key: text('key').primaryKey(),
	value: text('value').notNull(),
});

export const clientMutations = pgTable('client_mutations', {
	createdAt: timestamp('created_at').defaultNow().notNull(),
	id: serial('id').primaryKey(),
	tableName: text('table_name').notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const cdc = pgTable('cdc', {
	createdAt: timestamp('created_at').defaultNow().notNull(),
	id: serial('id').primaryKey(),
	tableName: text('table_name').notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const cdcCache = pgTable('cdc_cache', {
	bucket: text('bucket').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	cursor: text('cursor').notNull(),
	endingCursor: text('ending_cursor').notNull(),
	id: serial('id').primaryKey(),
	startingCursor: text('starting_cursor').notNull(), // TODO: Add tenantId
	tenantId: text('tenant_id').notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
