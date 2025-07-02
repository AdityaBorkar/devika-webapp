import type { BunRequest } from 'bun';

import type { MutationContext, MutationMiddleware } from '#letsync/mutations';
import { getSession as getSessionOnClient } from '@/lib/auth/client';
import { getSession as getSessionOnServer } from '@/lib/auth/server';

// Simplified auth middleware - works directly with MutationHandler

export const authHandler = async (data, { setContext }) => {
	// Detect environment
	const env = typeof window !== 'undefined' ? 'client' : 'server';

	if (env === 'client') {
		const { data: session } = await getSessionOnClient();
		setContext({ session: session || undefined });
	}
};

// Server-specific auth middleware that can access request
export const serverAuthHandler = (
	request: BunRequest,
): MutationMiddleware<any, MutationContext> => {
	return async (data, { setContext }) => {
		const session = await getSessionOnServer({ headers: request.headers });
		if (!session?.user?.id) {
			throw new Error('User not authenticated');
		}
		setContext({ session: session || undefined });
	};
};

// Enhanced auth middleware that works in both environments
export const universalAuthHandler: MutationMiddleware<
	any,
	MutationContext
> = async (data, context) => {
	const actual_env = typeof window !== 'undefined' ? 'client' : 'server';
	const env = context.env || actual_env;
	console.warn('detected env', actual_env, 'forced env', env);

	if (env === 'client') {
		const { data: session } = await getSessionOnClient();
		context.setContext({ session: session || undefined });
	} else {
		// For server-side, try to get session without request (will be limited)
		// In a real server environment, this should be provided via context
		try {
			const session = await getSessionOnServer({ headers: new Headers() });
			if (session?.user?.id) {
				context.setContext({ session: session || undefined });
			}
		} catch (_error) {
			// Auth failed on server - this is expected without proper request context
			throw new Error('Authentication required');
		}
	}
};
