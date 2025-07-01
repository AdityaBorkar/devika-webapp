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
	execute?: (
		data: any,
		context: MutationContext,
	) => Promise<{ success: boolean; data?: any; error?: any }>;
}

export type Middleware = (
	request: BunRequest,
	{ setContext }: { setContext: (updates: Partial<MutationContext>) => void },
) => void | Promise<void>;

export class Mutation implements MutationChain {
	private middlewares: Array<
		(
			data: any,
			context: MutationContext & {
				setContext: (updates: Partial<MutationContext>) => void;
			},
		) => void | Promise<void>
	> = [];
	private _handler?: (
		context: MutationContext & { data: any },
	) => any | Promise<any>;
	private _onSuccess?: (result: { data: any }) => void;
	private _onError?: (error: { error: any }) => void;

	middleware(
		fn: (
			data: any,
			context: MutationContext & {
				setContext: (updates: Partial<MutationContext>) => void;
			},
		) => void | Promise<void>,
	): MutationChain {
		this.middlewares.push(fn);
		return this;
	}

	handler(
		fn: (context: MutationContext & { data: any }) => any | Promise<any>,
	): MutationChain {
		this._handler = fn;
		return this;
	}

	onSuccess(fn: (result: { data: any }) => void): MutationChain {
		this._onSuccess = fn;
		return this;
	}

	onError(fn: (error: { error: any }) => void): MutationChain {
		this._onError = fn;
		return this;
	}

	async execute(
		data: any,
		baseContext: MutationContext,
	): Promise<{ success: boolean; data?: any; error?: any }> {
		try {
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
	}
}

export function createMutation(params?: any): MutationChain {
	return new Mutation();

	// export const cdc = pgTable('cdc', {
	// 	createdAt: timestamp().defaultNow().notNull(),
	// 	id: serial().primaryKey(),
	// 	tableName: text().notNull(),
	// 	tenantId: uuid().notNull(),
	// 	updatedAt: timestamp().defaultNow().notNull(),
	// });

	// export const cdcCache = pgTable('cdc_cache', {
	// 	_clientAppliedAt: timestamp(),
	// 	bucket: text().notNull(), // Rename to storageUrl
	// 	end: text().notNull(),
	// 	id: serial().primaryKey(),
	// 	start: text().notNull(),
	// 	tenantId: uuid().notNull(),
	// 	updatedAt: timestamp().defaultNow().notNull(),
	// });
}
