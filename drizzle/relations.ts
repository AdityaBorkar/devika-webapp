import { relations } from 'drizzle-orm/relations';

import { account, posts, session, user, users } from './schema';

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id],
	}),
}));

export const userRelations = relations(user, ({ many }) => ({
	accounts: many(account),
	sessions: many(session),
}));

export const postsRelations = relations(posts, ({ one }) => ({
	user: one(users, {
		fields: [posts.authorId],
		references: [users.id],
	}),
}));

export const usersRelations = relations(users, ({ many }) => ({
	posts: many(posts),
}));

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id],
	}),
}));
