namespace Prd {
	export type Version = {
		id: string;
		name: string;
	};
}

type TabType = {
	id: string;
	name: string;
	type: 'doc' | 'chat';
};
