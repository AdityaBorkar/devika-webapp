'use client';

import { atom } from 'jotai';

const data = atom({
	activeTabId: '',
	changesNotes: 0,
	leftOpenTabId: '',
	leftTabs: [],
	rightOpenTabId: '',
	rightTabs: [],
	rightTabWidth: 0,
	searchQuery: '',
	section: 'files',
	versionId: '',
	versionName: '',
	versionTarget: '',
});

export const PrdVersionAtom = atom<Prd.Version>((get) => {
	const { versionId: id, versionName: name, versionTarget: target } = get(data);
	return { id, name, target };
});

export const PrdSectionAtom = atom(
	(get) => get(data).section,
	(get, set, value: string) => set(data, { ...get(data), section: value }),
);

export const PrdSearchQueryAtom = atom(
	(get) => get(data).searchQuery,
	(get, set, value: string) => set(data, { ...get(data), searchQuery: value }),
);

export const PrdActiveTabIdAtom = atom(
	(get) => {
		const { activeTabId } = get(data);
		if (activeTabId) return activeTabId;

		const path = window.location.pathname.split('/');
		const currentDoc = path[2];
		return currentDoc;
	},
	(get, set, value: string) => set(data, { ...get(data), activeTabId: value }),
);

export const PrdRightTabsAtom = atom(
	async () => {
		const openTabId = 'chatbot';
		const tabs: TabType[] = [
			{ id: 'chatbot', name: 'Chatterbox', type: 'chat' },
		];
		await sleep(500);
		return { openTabId, tabs };
	},
	(get, set, value: string) => set(data, { ...get(data), rightTabs: value }),
);

export const PrdRightWidthAtom = atom(0);

export const PrdLeftTabsAtom = atom(async (get) => {
	let openTabId = 'list-of-docs';
	const tabs: TabType[] = [
		{ id: 'list-of-docs', name: 'List of Docs', type: 'doc' },
	];

	// const currentDoc = get(PrdActiveTabIdAtom);
	// const containsCurrentDoc = tabs.some((tab) => tab.id === currentDoc);
	// if (!containsCurrentDoc && currentDoc)
	// 	tabs.push({ id: currentDoc, name: currentDoc, type: 'doc' });

	const right = await get(PrdRightTabsAtom);
	if (tabs.length === 0 && right.tabs.length > 0) {
		tabs.push(...right.tabs);
		openTabId = right.openTabId;
	}

	await sleep(500);
	return { openTabId, tabs };
});

export const PrdChangelogAtom = atom<string>('');

const sleep = (ms: number) =>
	new Promise((resolve) => setTimeout(() => resolve(true), ms));
