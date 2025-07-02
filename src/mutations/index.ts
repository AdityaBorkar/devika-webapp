import { MutationList } from '#letsync/mutations';
import { $createTask } from '@/mutations/tasks';
import { $createWorkspace } from './workspace';

export const mutations = new MutationList({
	createTask: $createTask,
	createWorkspace: $createWorkspace,
});
