import { join } from 'node:path';
import { file } from 'bun';

import { type } from 'arktype';

import { ProjectConfig } from '@/schema/ProjectConfig';

const REPO_BASE_PATH = '.';
const CONFIG_FILE_NAME = 'devika.json';

export async function start() {
	// const pkgPath = join(process.cwd(), REPO_BASE_PATH, PACKAGE_FILE_NAME);
	// const pkgFile = file(pkgPath);
	// const pkg = await pkgFile.json();
	// console.log({ pkg });

	const configPath = join(process.cwd(), REPO_BASE_PATH, CONFIG_FILE_NAME);
	const configFile = file(configPath);

	const exists = await configFile.exists();
	if (!exists) {
		return { errors: 'NOT_FOUND', success: false };
	}

	const config = await configFile.json().catch((_error) => 'INVALID');
	if (config === 'INVALID') {
		// TODO: AI Suggestions to fix the file
		return { errors: 'INVALID', success: false };
	}

	const validation = ProjectConfig(config);
	if (validation instanceof type.errors) {
		// TODO: AI Suggestions to fix the file
		return { errors: validation.summary, success: false };
	}

	// TODO: START NODE SERVER

	return { config, success: true };
}
