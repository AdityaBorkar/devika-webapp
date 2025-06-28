import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

// biome-ignore lint/performance/noNamespaceImport: WE NEED TO IMPORT ALL FILES
import * as schema from '@/lib/db/schema';
import { db } from '@/lib/db/server';
import { env } from '../../env';

export const auth = betterAuth({
	database: drizzleAdapter(db, { provider: 'pg', schema }),
	session: {
		expiresIn: 60 * 60 * 24 * 7, // 7 days
		updateAge: 60 * 60 * 24, // 1 day
	},
	socialProviders: {
		github: {
			clientId: env.GITHUB_CLIENT_ID,
			clientSecret: env.GITHUB_CLIENT_SECRET,
		},
	},
	user: {
		changeEmail: { enabled: true },
		deleteUser: { enabled: true },
		// additionalFields: {
		// }
	},
});

export type Session = typeof auth.$Infer.Session;
