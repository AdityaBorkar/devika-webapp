// Simplified mutation system based on middleware pattern
/** biome-ignore-all lint/suspicious/noExplicitAny: THIS IS A LIBRARY */

import type { BunRequest } from 'bun';

export interface MutationContext {
	db: any;
	session?: any;
	validatedData?: any;
	[key: string]: any;
}

export interface MutationChain {
	setName: (name: string) => MutationChain;
	middleware: (
		fn: (
			data: any,
			context: MutationContext & {
				setContext: (updates: Partial<MutationContext>) => void;
			},
		) => void | Promise<void>,
	) => MutationChain;
	handler: (
		fn: (context: MutationContext & { data: any }) => any | Promise<any>,
	) => MutationChain;
	onSuccess: (fn: (result: { data: any }) => void) => MutationChain;
	onError: (fn: (error: { error: any }) => void) => MutationChain;
	execute: (
		data?: any,
		options?: { env?: 'client' | 'server'; context?: Partial<MutationContext> },
	) => Promise<{ success: boolean; data?: any; error?: any }>;
	// Make it callable
	(
		data?: any,
		options?: { env?: 'client' | 'server'; context?: Partial<MutationContext> },
	): Promise<{ success: boolean; data?: any; error?: any }>;
}

export type Middleware = (
	request: BunRequest,
	{ setContext }: { setContext: (updates: Partial<MutationContext>) => void },
) => void | Promise<void>;

// Helper functions for database access
async function getServerDb() {
	try {
		// Dynamically import server database
		const { db } = await import('@/lib/db/server');
		return db;
	} catch (error) {
		console.warn('Could not load server database:', error);
		return null;
	}
}

async function getClientDb() {
	try {
		// Dynamically import client database  
		const { db } = await import('@/lib/db/client');
		return db;
	} catch (error) {
		console.warn('Could not load client database:', error);
		return null;
	}
}

// Create a callable MutationHandler function
export function MutationHandler(): MutationChain {
	const handler = function(
		data?: any,
		options?: { env?: 'client' | 'server'; context?: Partial<MutationContext> },
	): Promise<{ success: boolean; data?: any; error?: any }> {
		return handler.execute(data, options);
	} as any;

	// Add all the properties and methods
	handler.name = '';
	handler.middlewares = [];
	handler._handler = undefined;
	handler._onSuccess = undefined;
	handler._onError = undefined;

	handler.setName = function(name: string) {
		this.name = name;
		return this;
	};

	handler.middleware = function(fn: any) {
		this.middlewares.push(fn);
		return this;
	};

	handler.handler = function(fn: any) {
		this._handler = fn;
		return this;
	};

	handler.onSuccess = function(fn: any) {
		this._onSuccess = fn;
		return this;
	};

	handler.onError = function(fn: any) {
		this._onError = fn;
		return this;
	};

	handler.execute = async function(
		data?: any,
		options?: { env?: 'client' | 'server'; context?: Partial<MutationContext> },
	): Promise<{ success: boolean; data?: any; error?: any }> {
		try {
			// Get the environment context
			const env = options?.env || (typeof window !== 'undefined' ? 'client' : 'server');
			
			// Create base context with database
			let baseContext: MutationContext = {
				db: null, // Will be injected based on environment
				...options?.context,
			};

			// Inject database based on environment
			if (env === 'server') {
				// Server-side database injection
				baseContext.db = await getServerDb();
			} else {
				// Client-side database injection
				baseContext.db = await getClientDb();
			}

			const context = { ...baseContext };
			const contextWithSetter = {
				...context,
				setContext: (updates: Partial<MutationContext>) => {
					Object.assign(context, updates);
				},
			};

			// Run middleware chain
			for (const middleware of this.middlewares) {
				await middleware(data, contextWithSetter);
			}

			// Execute handler
			if (!this._handler) {
				throw new Error('No handler defined for mutation');
			}

			const result = await this._handler({ ...context, data });
			this._onSuccess?.({ data: result });
			return { data: result, success: true };
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);
			this._onError?.({ error: errorMessage });
			return { error: errorMessage, success: false };
		}
	};

	return handler;
}

export function createMutation(params?: any): MutationChain {
	return MutationHandler();
}