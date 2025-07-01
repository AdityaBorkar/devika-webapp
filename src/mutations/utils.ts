import type { BunRequest } from 'bun';

import { ArkErrors, type Type } from 'arktype';

import { createMiddleware } from '#letsync/mutations/createMiddleware';

export const authHandler = createMiddleware({
	onClient: ({ setContext }) => {
		setContext();
	},
	onServer: (request: BunRequest, { setContext }) => {
		const session = getSession(request.headers);
		if (!session?.user?.id) throw new Error('User not authenticated');
		setContext({ session });
	},
});

export const schemaHandler = (schema: Type) =>
	createMiddleware({
		onClient: (data, { setContext }) => {
			const validatedData = schema(data);
			if (validatedData instanceof ArkErrors) {
				throw new Error('Invalid task data: ' + validatedData.toString());
			}
			setContext({ validatedData });
		},
		onServer: (data, { setContext }) => {
			const validatedData = schema(data);
			if (validatedData instanceof ArkErrors) {
				throw new Error('Invalid task data: ' + validatedData.toString());
			}
			setContext({ validatedData });
		},
	});

export const rateLimitHandler = (rpm: number) =>
	createMiddleware({
		onClient: () => {
			console.log({ rpm });
		},
		onServer: () => {
			console.log({ rpm });
		},
	});
