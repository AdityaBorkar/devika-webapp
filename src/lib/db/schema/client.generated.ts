import { boolean, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Client schema versions table for tracking migrations
export const clientSchemaVersions = pgTable('client_schema_versions', {
	checksum: text('checksum').notNull(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	id: serial('id').primaryKey(),
	isRolledBack: boolean('isRolledBack').default(false).notNull(),
	snapshot: text('snapshot').notNull(),
	sql: text('sql').notNull(),
	tag: text('tag'),
	version: text('version').notNull(),
});

// Example users table schema
export const users = pgTable('users', {
	createdAt: timestamp('created_at').defaultNow().notNull(),
	email: text('email').notNull().unique(),
	id: serial('id').primaryKey(),
	isActive: boolean('is_active').default(true).notNull(),
	name: text('name').notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Example posts table schema
export const posts = pgTable('posts', {
	authorId: serial('author_id').references(() => users.id),
	content: text('content').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	id: serial('id').primaryKey(),
	published: boolean('published').default(false).notNull(),
	title: text('title').notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
