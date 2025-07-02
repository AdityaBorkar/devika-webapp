import type { BunRequest } from 'bun';

export class MiddlewareHandler {
	private clientFn?: (
		data: any,
		{ setContext }: { setContext: (updates: any) => void },
	) => void | Promise<void>;
	private serverFn?: (
		request: BunRequest,
		{ setContext }: { setContext: (updates: any) => void },
	) => void | Promise<void>;

	onClient(
		fn: (
			data: any,
			{ setContext }: { setContext: (updates: any) => void },
		) => void | Promise<void>,
	) {
		this.clientFn = fn;
		return this;
	}

	onServer(
		fn: (
			request: BunRequest,
			{ setContext }: { setContext: (updates: any) => void },
		) => void | Promise<void>,
	) {
		this.serverFn = fn;
		return this;
	}

	async execute(
		data: any,
		context: { setContext: (updates: any) => void },
		env: 'client' | 'server' = typeof window !== 'undefined' ? 'client' : 'server',
		request?: BunRequest,
	): Promise<void> {
		if (env === 'client' && this.clientFn) {
			await this.clientFn(data, context);
		} else if (env === 'server' && this.serverFn && request) {
			await this.serverFn(request, context);
		}
	}
}

// Helper function to convert MiddlewareHandler to mutation middleware
export function middlewareToMutation(
	middlewareHandler: MiddlewareHandler,
): (
	data: any,
	context: { setContext: (updates: any) => void },
) => Promise<void> {
	return async (data, context) => {
		const env = typeof window !== 'undefined' ? 'client' : 'server';
		await middlewareHandler.execute(data, context, env);
	};
}
