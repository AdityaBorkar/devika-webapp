import { createId } from '@paralleldrive/cuid2';
import { text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const cuid2 = () => text().$defaultFn(createId);

export const CommonColumns = {
	createdAt: timestamp().notNull(),
	tenantId: uuid().notNull(),
	updatedAt: timestamp().notNull(),
};
