import { createAuthClient } from 'better-auth/react';

import { BASE_URL } from '@/../env-constants';

export const authClient = createAuthClient({ baseURL: BASE_URL });

export const { useSession, signIn, signOut, signUp } = authClient;
