import { sql } from 'drizzle-orm';
import {
	boolean,
	pgTable,
	serial,
	text,
	timestamp,
	unique,
	uniqueIndex,
	uuid,
} from 'drizzle-orm/pg-core';

export const account = pgTable('account', {
	accessToken: text(),
	accessTokenExpiresAt: timestamp({ mode: 'string' }),
	accountId: text().notNull(),
	createdAt: timestamp({ mode: 'string' }).notNull(),
	id: serial().primaryKey().notNull(),
	idToken: text(),
	password: text(),
	providerId: text().notNull(),
	refreshToken: text(),
	refreshTokenExpiresAt: timestamp({ mode: 'string' }),
	scope: text(),
	updatedAt: timestamp({ mode: 'string' }).notNull(),
	userId: text().notNull(),
});

export const session = pgTable(
	'session',
	{
		createdAt: timestamp({ mode: 'string' }).notNull(),
		expiresAt: timestamp({ mode: 'string' }).notNull(),
		id: serial().primaryKey().notNull(),
		ipAddress: text(),
		token: text().notNull(),
		updatedAt: timestamp({ mode: 'string' }).notNull(),
		userAgent: text(),
		userId: text().notNull(),
	},
	(table) => [unique('session_token_unique').on(table.token)],
);

export const user = pgTable(
	'user',
	{
		createdAt: timestamp({ mode: 'string' }).notNull(),
		email: text().notNull(),
		emailVerified: boolean().notNull(),
		id: serial().primaryKey().notNull(),
		image: text(),
		name: text().notNull(),
		updatedAt: timestamp({ mode: 'string' }).notNull(),
	},
	(table) => [unique('user_email_unique').on(table.email)],
);

export const verification = pgTable('verification', {
	createdAt: timestamp({ mode: 'string' }),
	expiresAt: timestamp({ mode: 'string' }).notNull(),
	id: serial().primaryKey().notNull(),
	identifier: text().notNull(),
	updatedAt: timestamp({ mode: 'string' }),
	value: text().notNull(),
});

export const posts = pgTable('posts', {
	authorId: serial('author_id').notNull(),
	content: text().notNull(),
	createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
	id: serial().primaryKey().notNull(),
	published: boolean().default(false).notNull(),
	title: text().notNull(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
});

export const users = pgTable(
	'users',
	{
		createdAt: timestamp('created_at', { mode: 'string' })
			.defaultNow()
			.notNull(),
		email: text().notNull(),
		id: serial().primaryKey().notNull(),
		isActive: boolean('is_active').default(true).notNull(),
		name: text().notNull(),
		updatedAt: timestamp('updated_at', { mode: 'string' })
			.defaultNow()
			.notNull(),
	},
	(table) => [unique('users_email_unique').on(table.email)],
);

export const tenants = pgTable(
	'tenants',
	{
		computeId: uuid('compute_id'),
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
