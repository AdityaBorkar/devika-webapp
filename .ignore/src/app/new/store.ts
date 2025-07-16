import type { Workspace } from '@prisma/client';
import { atom } from 'jotai';

export const workspaceAtom = atom<Workspace | null>(null);
