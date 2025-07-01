import type { BunRequest } from 'bun';

export const createMiddleware = (params: any) => {
	return {
		onClient: (
			request: BunRequest,
			{ setContext }: { setContext: (updates: any) => void },
		) => {
			setContext({ request });
		},
		onServer: (
			request: BunRequest,
			{ setContext }: { setContext: (updates: any) => void },
		) => {
			setContext({ request });
		},
	};
};

// execute = (
// 	request: BunRequest,
// 	{ setContext }: { setContext: (updates: any) => void },
// ) => {
// 	setContext({ request });
// };
