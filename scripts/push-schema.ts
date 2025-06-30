import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { file } from 'bun';

import { eq } from 'drizzle-orm';

import { clientSchemas } from '../src/lib/db/schema';
import { db } from '../src/lib/db/server';

// ANSI color codes for better console output
const colors = {
	blue: '\x1b[34m',
	bright: '\x1b[1m',
	cyan: '\x1b[36m',
	dim: '\x1b[2m',
	gray: '\x1b[90m',
	green: '\x1b[32m',
	magenta: '\x1b[35m',
	red: '\x1b[31m',
	reset: '\x1b[0m',
	yellow: '\x1b[33m',
};

// Logging utility functions
const log = {
	error: (message: string, error?: unknown) => {
		console.error(`${colors.red}❌${colors.reset} ${message}`);
		if (error) console.error(`${colors.dim}${error}${colors.reset}`);
	},
	info: (message: string) =>
		console.log(`${colors.cyan}ℹ️${colors.reset} ${message}`),
	progress: (message: string) =>
		console.log(`${colors.blue}🔄${colors.reset} ${message}`),
	success: (message: string) =>
		console.log(`${colors.green}✅${colors.reset} ${message}`),
	warning: (message: string) =>
		console.log(`${colors.yellow}⚠️${colors.reset} ${message}`),
};

interface JournalEntry {
	idx: number;
	tag: string;
	version: string;
	when: number;
	breakpoints: boolean;
}

interface JournalData {
	version: string;
	dialect: string;
	entries: JournalEntry[];
}

interface SchemaSnapshot {
	id: string;
	prevId: string;
	version: string;
	dialect: string;
	tables: Record<string, unknown>;
	enums: Record<string, unknown>;
	schemas: Record<string, unknown>;
	sequences: Record<string, unknown>;
	roles: Record<string, unknown>;
	policies: Record<string, unknown>;
	_meta: {
		schemas: Record<string, unknown>;
		tables: Record<string, unknown>;
		columns: Record<string, unknown>;
	};
}

async function validateDatabaseConnection(): Promise<void> {
	try {
		// Test database connection by querying a simple table
		await db.select().from(clientSchemas).limit(1);
		log.info('Database connection validated');
	} catch (error) {
		throw new Error(`Database connection failed: ${error}`);
	}
}

async function readJournalData(): Promise<JournalData> {
	const journalPath = resolve('./drizzle/meta/_journal.json');
	const journalFile = file(journalPath);

	if (!(await journalFile.exists())) {
		throw new Error(`Journal file not found at: ${journalPath}`);
	}

	try {
		const data = await journalFile.json();
		if (!data || typeof data !== 'object') {
			throw new Error('Invalid journal file format');
		}
		return data as JournalData;
	} catch (error) {
		throw new Error(`Failed to parse journal file: ${error}`);
	}
}

async function readSnapshotData(idx: number): Promise<SchemaSnapshot> {
	const snapshotPath = resolve(
		`./drizzle/meta/${String(idx).padStart(4, '0')}_snapshot.json`,
	);
	const snapshotFile = file(snapshotPath);

	if (!(await snapshotFile.exists())) {
		throw new Error(`Snapshot file not found at: ${snapshotPath}`);
	}

	try {
		const data = await snapshotFile.json();
		if (!data || typeof data !== 'object') {
			throw new Error('Invalid snapshot file format');
		}
		return data as SchemaSnapshot;
	} catch (error) {
		throw new Error(`Failed to parse snapshot file: ${error}`);
	}
}

async function readSqlData(tag: string): Promise<string> {
	const sqlPath = resolve(`./drizzle/${tag}.sql`);
	const sqlFile = file(sqlPath);

	if (!(await sqlFile.exists())) {
		throw new Error(`SQL file not found at: ${sqlPath}`);
	}

	try {
		const content = await sqlFile.text();
		if (typeof content !== 'string') {
			throw new Error('Invalid SQL file content');
		}
		return content;
	} catch (error) {
		throw new Error(`Failed to read SQL file: ${error}`);
	}
}

async function pushSchema() {
	const startTime = Date.now();

	try {
		log.progress('Starting schema push process...');

		// Validate database connection first
		log.progress('Validating database connection...');
		await validateDatabaseConnection();

		// Read the journal file to get the latest migration
		log.progress('Reading migration journal...');
		const journalData = await readJournalData();

		if (!journalData.entries || journalData.entries.length === 0) {
			log.info('No migrations found in journal - nothing to push');
			return;
		}

		// Get the latest migration entry
		const latestEntry = journalData.entries[journalData.entries.length - 1];
		const { tag, version, idx } = latestEntry;

		log.info(
			`Latest migration: ${colors.bright}${tag}${colors.reset} (version ${colors.bright}${version}${colors.reset}, idx ${colors.bright}${idx}${colors.reset})`,
		);

		// Read migration files
		log.progress('Reading schema snapshot...');
		const snapshot = await readSnapshotData(idx);

		log.progress('Reading SQL migration...');
		const sqlContent = await readSqlData(tag);

		// Generate checksum of the snapshot content
		log.progress('Generating schema checksum...');
		const snapshotString = JSON.stringify(snapshot, null, 2);
		const checksum = createHash('sha256').update(snapshotString).digest('hex');

		log.info(
			`Generated checksum: ${colors.bright}${checksum.substring(0, 8)}...${colors.reset}`,
		);

		// Check if this version already exists
		log.progress('Checking for existing schema version...');
		const existingRecord = await db
			.select()
			.from(clientSchemas)
			.where(eq(clientSchemas.version, version))
			.limit(1);

		if (existingRecord.length > 0) {
			log.warning(
				`Schema version ${colors.bright}${version}${colors.reset} already exists in database`,
			);
			console.log(
				`   ${colors.dim}Existing checksum: ${existingRecord[0].checksum.substring(0, 8)}...${colors.reset}`,
			);
			console.log(
				`   ${colors.dim}New checksum:      ${checksum.substring(0, 8)}...${colors.reset}`,
			);

			if (existingRecord[0].checksum === checksum) {
				log.success('Schema is already up to date - no changes needed');
				const endTime = Date.now();
				log.info(
					`Completed in ${colors.bright}${endTime - startTime}ms${colors.reset}`,
				);
				return;
			}

			log.progress('Updating existing record with new schema...');

			// Update existing record
			try {
				await db
					.update(clientSchemas)
					.set({
						checksum,
						createdAt: new Date(),
						isRolledBack: false,
						snapshot: snapshotString,
						sql: sqlContent,
						tag,
					})
					.where(eq(clientSchemas.version, version));

				log.success(
					`Schema record updated successfully for version ${colors.bright}${version}${colors.reset}`,
				);
			} catch (error) {
				throw new Error(`Failed to update schema record: ${error}`);
			}
		} else {
			log.progress('Inserting new schema record...');

			// Insert new record
			try {
				await db.insert(clientSchemas).values({
					checksum,
					createdAt: new Date(),
					isRolledBack: false,
					snapshot: snapshotString,
					sql: sqlContent,
					tag,
					version,
				});

				log.success(
					`Schema record inserted successfully for version ${colors.bright}${version}${colors.reset}`,
				);
			} catch (error) {
				throw new Error(`Failed to insert schema record: ${error}`);
			}
		}

		const endTime = Date.now();
		log.success(
			`🎉 Schema push completed for version ${colors.bright}${version}${colors.reset}`,
		);
		log.info(
			`Total execution time: ${colors.bright}${endTime - startTime}ms${colors.reset}`,
		);
		process.exit(0);
	} catch (error) {
		log.error('Schema push failed', error);
		process.exit(1);
	}
}

// Run the script
pushSchema().catch(console.error);
