import type { MutationChain } from '#letsync/mutations';

export class MutationList {
	list: Record<string, MutationChain>;

	constructor(private readonly mutations: Record<string, MutationChain>) {
		this.list = {};
		for (const [name, handler] of Object.entries(mutations)) {
			this.list[name] = handler;
		}
	}

	getHandler(name: string) {
		return this.mutations[name];
	}
}
