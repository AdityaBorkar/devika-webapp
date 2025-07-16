import { atom } from 'jotai';

export const workspaceIdAtom = atom<string>('g11q2tpg4jqxpfhfri7cbuxa');

export const userAtom = atom({
	avatar: 'https://example.com/avatar.png',
	createdAt: new Date(),
	email: 'john.doe@example.com',
	id: 'g11q2tpg4jqxpfhfri7cbuxa',
	name: 'John Doe',
	updatedAt: new Date(),
});
