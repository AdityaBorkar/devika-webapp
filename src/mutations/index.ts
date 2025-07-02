import { MutationList } from '#letsync/mutations';
import { $createTask } from './tasks';
import { $createWorkspace } from './workspace';

export const mutations = new MutationList([$createTask, $createWorkspace]);
