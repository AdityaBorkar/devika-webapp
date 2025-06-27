#!/usr/bin/env bun

import { existsSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import path from 'node:path';
import { type BuildConfig, build } from 'bun';

import plugin from 'bun-plugin-tailwind';

// Print help text if requested
if (process.argv.includes('--help') || process.argv.includes('-h')) {
	process.exit(0);
}

// Helper function to convert kebab-case to camelCase
const toCamelCase = (str: string): string => {
	return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
};

const INTEGER_REGEX = /^\d+$/;
const FLOAT_REGEX = /^\d*\.\d+$/;

// Helper function to parse a value into appropriate type
const parseValue = (value: string): string | number | boolean | string[] => {
	// Handle true/false strings
	if (value === 'true') {
		return true;
	}
	if (value === 'false') {
		return false;
	}

	// Handle numbers
	if (INTEGER_REGEX.test(value)) {
		return Number.parseInt(value, 10);
	}
	if (FLOAT_REGEX.test(value)) {
		return Number.parseFloat(value);
	}

	// Handle arrays (comma-separated)
	if (value.includes(',')) {
		return value.split(',').map((v) => v.trim());
	}

	// Default to string
	return value;
};

// Magical argument parser that converts CLI args to BuildConfig
function parseArgs(): Partial<BuildConfig> {
	const config: Record<string, unknown> = {};
	const args = process.argv.slice(2);

	for (let i = 0; i < args.length; i++) {
		const arg = args[i];
		if (!arg.startsWith('--')) {
			continue;
		}

		// Handle --no-* flags
		if (arg.startsWith('--no-')) {
			const key = toCamelCase(arg.slice(5));
			config[key] = false;
			continue;
		}

		// Handle --flag (boolean true)
		if (
			!arg.includes('=') &&
			(i === args.length - 1 || args[i + 1].startsWith('--'))
		) {
			const key = toCamelCase(arg.slice(2));
			config[key] = true;
			continue;
		}

		// Handle --key=value or --key value
		let key: string;
		let value: string;

		if (arg.includes('=')) {
			[key, value] = arg.slice(2).split('=', 2);
		} else {
			key = arg.slice(2);
			value = args[++i];
		}

		// Convert kebab-case key to camelCase
		key = toCamelCase(key);

		// Handle nested properties (e.g. --minify.whitespace)
		if (key.includes('.')) {
			const [parentKey, childKey] = key.split('.');
			const parentObj = (config[parentKey] as Record<string, unknown>) || {};
			parentObj[childKey] = parseValue(value);
			config[parentKey] = parentObj;
		} else {
			config[key] = parseValue(value);
		}
	}

	return config as Partial<BuildConfig>;
}

// Helper function to format file sizes
const formatFileSize = (bytes: number): string => {
	const units = ['B', 'KB', 'MB', 'GB'];
	let size = bytes;
	let unitIndex = 0;

	while (size >= 1024 && unitIndex < units.length - 1) {
		size /= 1024;
		unitIndex++;
	}

	return `${size.toFixed(2)} ${units[unitIndex]}`;
};

// Parse CLI arguments with our magical parser
const cliConfig = parseArgs();
const outdir = cliConfig.outdir || path.join(process.cwd(), 'dist');

if (existsSync(outdir)) {
	await rm(outdir, { force: true, recursive: true });
}

const start = performance.now();

// Scan for all HTML files in the project
const entrypoints = [...new Bun.Glob('**.html').scanSync('src')]
	.map((a) => path.resolve('src', a))
	.filter((dir) => !dir.includes('node_modules'));

// Build all the HTML files
const result = await build({
	define: {
		'process.env.NODE_ENV': JSON.stringify('production'),
	},
	entrypoints,
	minify: true,
	outdir,
	plugins: [plugin],
	sourcemap: 'linked',
	target: 'browser',
	...cliConfig, // Merge in any CLI-provided options
});

// Print the results
const end = performance.now();

const _outputTable = result.outputs.map((output) => ({
	File: path.relative(process.cwd(), output.path),
	Size: formatFileSize(output.size),
	Type: output.kind,
}));
const _buildTime = (end - start).toFixed(2);
