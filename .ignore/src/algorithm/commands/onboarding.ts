import { join } from 'node:path';
import { file, type ServerWebSocket } from 'bun';

import { type } from 'arktype';

import { ProjectOnboarding } from '@/schema/ProjectOnboarding';

const PROJECT_PATH = process.cwd();
const CONFIG_FILE_NAME = 'devika.json';

// TODO: Make a REST Endpoint

export function onboarding(input: unknown, ws: ServerWebSocket<unknown>) {
	const data = ProjectOnboarding(input);
	if (data instanceof type.errors) {
		return { errors: data.summary, success: false };
	}

	const configFile = file(join(PROJECT_PATH, CONFIG_FILE_NAME));
	configFile.write(JSON.stringify(data, null, 2));

	ws.send(
		JSON.stringify({
			command: 'SET-DATA',
			result: { data, path: 'config' },
		}),
	);

	// TODO: Do this step after "PRD Creation"
	ws.send(
		JSON.stringify({
			command: 'START',
			result: { message: '', success: true },
		}),
	);

	return { success: true };
}
