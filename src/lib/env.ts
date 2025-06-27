import { createEnv } from '@t3-oss/env-core';
import { type } from 'arktype';

export const env = createEnv({
	emptyStringAsUndefined: true,
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
		GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
		NODE_ENV: process.env.NODE_ENV || 'development',
	},
	server: {
		DATABASE_URL: type('string.url'),
		GITHUB_CLIENT_ID: type('string > 0'),
		GITHUB_CLIENT_SECRET: type('string > 0'),
		NODE_ENV: type('"development" | "production"'),
	},
});
