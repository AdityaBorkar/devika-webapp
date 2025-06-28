import { createEnv } from '@t3-oss/env-core';
import { type } from 'arktype';

export const env = createEnv({
	client: {
		BUN_PUBLIC_BASE_URL: type('string.url'),
	},
	clientPrefix: 'BUN_PUBLIC_',
	emptyStringAsUndefined: true,
	runtimeEnv: {
		NODE_ENV: import.meta.env.NODE_ENV || 'development',
		...(import.meta.env || {}),
	},
	server: {
		DATABASE_URL: type('string.url'),
		GITHUB_CLIENT_ID: type('string > 0'),
		GITHUB_CLIENT_SECRET: type('string > 0'),
		NODE_ENV: type('"development" | "production"'),
	},
});
