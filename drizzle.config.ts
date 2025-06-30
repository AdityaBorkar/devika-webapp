import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dbCredentials: {
		url: process.env.DATABASE_URL as string, // env.DATABASE_URL,
	},
	dialect: 'postgresql',
	out: './drizzle',
	schema: './src/lib/db/schema/index.ts',
});
