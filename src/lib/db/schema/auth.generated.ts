import { boolean, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const account = pgTable('account', {
	accessToken: text('accessToken'),
	accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
	accountId: text('accountId').notNull(),
	createdAt: timestamp('createdAt').notNull(),
	id: serial('id').primaryKey(),
	idToken: text('idToken'),
	password: text('password'),
	providerId: text('providerId').notNull(),
	refreshToken: text('refreshToken'),
	refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
	scope: text('scope'),
	updatedAt: timestamp('updatedAt').notNull(),
	userId: text('userId')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
});

export const user = pgTable('user', {
	createdAt: timestamp('createdAt').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('emailVerified').notNull(),
	id: serial('id').primaryKey(),
	image: text('image'),
	name: text('name').notNull(),
	updatedAt: timestamp('updatedAt').notNull(),
});

export const session = pgTable('session', {
	createdAt: timestamp('createdAt').notNull(),
	expiresAt: timestamp('expiresAt').notNull(),
	id: serial('id').primaryKey(),
	ipAddress: text('ipAddress'),
	token: text('token').notNull().unique(),
	updatedAt: timestamp('updatedAt').notNull(),
	userAgent: text('userAgent'),
	userId: text('userId')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
});

export const verification = pgTable('verification', {
	createdAt: timestamp('createdAt'),
	expiresAt: timestamp('expiresAt').notNull(),
	id: serial('id').primaryKey(),
	identifier: text('identifier').notNull(),
	updatedAt: timestamp('updatedAt'),
	value: text('value').notNull(),
});
