import { sql } from 'drizzle-orm';
import {
	boolean,
	foreignKey,
	index,
	integer,
	jsonb,
	pgTable,
	serial,
	text,
	timestamp,
	unique,
	uniqueIndex,
	uuid,
} from 'drizzle-orm/pg-core';

export const session = pgTable(
	'session',
	{
		createdAt: timestamp('created_at', { mode: 'string' }).notNull(),
		expiresAt: timestamp('expires_at', { mode: 'string' }).notNull(),
		id: text().primaryKey().notNull(),
		ipAddress: text('ip_address'),
		token: text().notNull(),
		updatedAt: timestamp('updated_at', { mode: 'string' }).notNull(),
		userAgent: text('user_agent'),
		userId: text('user_id').notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: 'session_user_id_user_id_fk',
		}).onDelete('cascade'),
		unique('session_token_unique').on(table.token),
	],
);

export const posts = pgTable(
	'posts',
	{
		authorId: serial('author_id').notNull(),
		content: text().notNull(),
		createdAt: timestamp('created_at', { mode: 'string' })
			.defaultNow()
			.notNull(),
		id: serial().primaryKey().notNull(),
		published: boolean().default(false).notNull(),
		title: text().notNull(),
		updatedAt: timestamp('updated_at', { mode: 'string' })
			.defaultNow()
			.notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.authorId],
			foreignColumns: [users.id],
			name: 'posts_author_id_users_id_fk',
		}),
	],
);

export const verification = pgTable('verification', {
	createdAt: timestamp('created_at', { mode: 'string' }),
	expiresAt: timestamp('expires_at', { mode: 'string' }).notNull(),
	id: text().primaryKey().notNull(),
	identifier: text().notNull(),
	updatedAt: timestamp('updated_at', { mode: 'string' }),
	value: text().notNull(),
});

export const clientSchemas = pgTable('client_schemas', {
	checksum: text().notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	id: serial().primaryKey().notNull(),
	isRolledBack: boolean().default(false).notNull(),
	snapshot: text().notNull(),
	sql: text().notNull(),
	tag: text(),
	version: text().notNull(),
});

export const localMetadata = pgTable('local_metadata', {
	key: text().primaryKey().notNull(),
	value: text().notNull(),
});

export const user = pgTable(
	'user',
	{
		createdAt: timestamp('created_at', { mode: 'string' }).notNull(),
		email: text().notNull(),
		emailVerified: boolean('email_verified').notNull(),
		id: text().primaryKey().notNull(),
		image: text(),
		name: text().notNull(),
		updatedAt: timestamp('updated_at', { mode: 'string' }).notNull(),
	},
	(table) => [unique('user_email_unique').on(table.email)],
);

export const account = pgTable(
	'account',
	{
		accessToken: text('access_token'),
		accessTokenExpiresAt: timestamp('access_token_expires_at', {
			mode: 'string',
		}),
		accountId: text('account_id').notNull(),
		createdAt: timestamp('created_at', { mode: 'string' }).notNull(),
		id: text().primaryKey().notNull(),
		idToken: text('id_token'),
		password: text(),
		providerId: text('provider_id').notNull(),
		refreshToken: text('refresh_token'),
		refreshTokenExpiresAt: timestamp('refresh_token_expires_at', {
			mode: 'string',
		}),
		scope: text(),
		updatedAt: timestamp('updated_at', { mode: 'string' }).notNull(),
		userId: text('user_id').notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: 'account_user_id_user_id_fk',
		}).onDelete('cascade'),
	],
);

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

export const mutationQueue = pgTable(
	'mutation_queue',
	{
		createdAt: timestamp('created_at', { mode: 'string' })
			.defaultNow()
			.notNull(),
		error: text(),
		id: uuid().default(sql`public.uuid_generate_v7()`).notNull(),
		mutationData: jsonb('mutation_data').notNull(),
		processedAt: timestamp('processed_at', { mode: 'string' }),
		retryCount: integer('retry_count').default(0).notNull(),
		status: text().default('pending').notNull(),
		tenantId: uuid('tenant_id').notNull(),
		userId: uuid('user_id').notNull(),
	},
	(table) => [
		index('mutation_queue_pending_idx').using(
			'btree',
			table.status.asc().nullsLast().op('text_ops'),
			table.createdAt.asc().nullsLast().op('timestamp_ops'),
		),
		uniqueIndex('mutation_queue_pkey').using(
			'btree',
			table.tenantId.asc().nullsLast().op('uuid_ops'),
			table.id.asc().nullsLast().op('uuid_ops'),
		),
		index('mutation_queue_tenant_status_idx').using(
			'btree',
			table.tenantId.asc().nullsLast().op('uuid_ops'),
			table.status.asc().nullsLast().op('uuid_ops'),
		),
		index('mutation_queue_user_idx').using(
			'btree',
			table.tenantId.asc().nullsLast().op('uuid_ops'),
			table.userId.asc().nullsLast().op('uuid_ops'),
		),
	],
);

export const changeLog = pgTable(
	'change_log',
	{
		changeData: jsonb('change_data'),
		id: uuid().default(sql`public.uuid_generate_v7()`).notNull(),
		operation: text().notNull(),
		recordId: uuid('record_id').notNull(),
		tableName: text('table_name').notNull(),
		tenantId: uuid('tenant_id').notNull(),
		timestamp: timestamp({ mode: 'string' }).defaultNow().notNull(),
		userId: uuid('user_id').notNull(),
	},
	(table) => [
		uniqueIndex('change_log_pkey').using(
			'btree',
			table.tenantId.asc().nullsLast().op('uuid_ops'),
			table.id.asc().nullsLast().op('uuid_ops'),
		),
		index('change_log_record_idx').using(
			'btree',
			table.tenantId.asc().nullsLast().op('text_ops'),
			table.tableName.asc().nullsLast().op('uuid_ops'),
			table.recordId.asc().nullsLast().op('uuid_ops'),
		),
		index('change_log_table_idx').using(
			'btree',
			table.tenantId.asc().nullsLast().op('text_ops'),
			table.tableName.asc().nullsLast().op('uuid_ops'),
			table.timestamp.asc().nullsLast().op('uuid_ops'),
		),
		index('change_log_tenant_timestamp_idx').using(
			'btree',
			table.tenantId.asc().nullsLast().op('timestamp_ops'),
			table.timestamp.asc().nullsLast().op('uuid_ops'),
		),
		index('change_log_user_idx').using(
			'btree',
			table.tenantId.asc().nullsLast().op('uuid_ops'),
			table.userId.asc().nullsLast().op('uuid_ops'),
		),
	],
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
