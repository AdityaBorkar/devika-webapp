import { createAuthClient } from 'better-auth/react';

import { env_workaround } from '@/env-workaround';

export const authClient = createAuthClient({
	baseURL: env_workaround.BASE_URL,
});

export const { useSession, signIn, signOut, signUp, getSession } = authClient;
