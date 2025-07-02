import type { BunRequest } from 'bun';

import { ArkErrors, type Type } from 'arktype';

import { MiddlewareHandler, middlewareToMutation } from '#letsync/mutations';
import { getSession as getSessioOnClient } from '@/lib/auth/client';
import { getSession as getSessionOnServer } from '@/lib/auth/server';

const authMiddleware = new MiddlewareHandler()
	.onClient(async (data, { setContext }) => {
		const { data: session } = await getSessioOnClient();
		setContext({ session });
	})
	.onServer(async (request: BunRequest, { setContext }) => {
		const session = await getSessionOnServer({ headers: request.headers });
		if (!session?.user?.id) throw new Error('User not authenticated');
		setContext({ session });
	});

export const authHandler = middlewareToMutation(authMiddleware);

export const schemaHandler = (schema: Type) => {
	const schemaMiddleware = new MiddlewareHandler()
		.onClient((data, { setContext }) => {
			const validatedData = schema(data);
			if (validatedData instanceof ArkErrors) {
				throw new Error(`Invalid task data: ${validatedData.toString()}`);
			}
			setContext({ validatedData });
		})
		.onServer((data, { setContext }) => {
			const validatedData = schema(data);
			if (validatedData instanceof ArkErrors) {
				throw new Error(`Invalid task data: ${validatedData.toString()}`);
			}
			setContext({ validatedData });
		});
	
	return middlewareToMutation(schemaMiddleware);
};
