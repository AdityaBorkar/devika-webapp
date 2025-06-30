import type { BunRequest } from 'bun';

import { type } from 'arktype';
import { desc, sql } from 'drizzle-orm';

import { clientSchemas } from '@/lib/db/schema/client.generated';
import { db } from '@/lib/db/server';

// TODO: Cache Requests for 7 days, if returns 200 (ISR)
// TODO: Cache Requests for 24hrs, if returns 404 (ISR)
// TODO: Protect Request using Rate Limit to avoid DDoS

const schema = type({
	name: 'string',
	'version?': 'number',
});

export async function getSchema(request: BunRequest) {
	// Request Validation
	const { searchParams } = new URL(request.url);
	const name = searchParams.get('name');
	const version = searchParams.get('version');
	const data = schema({ name, version });
	if ('error' in data) {
		return Response.json({ error: data.error }, { status: 400 });
	}

	// Return Schema
	const record = await _getSchema(version);
	return Response.json(record);
}

async function _getSchema(version: string | null) {
	const [record] = await db
		.select()
		.from(clientSchemas)
		.where(version ? sql`${clientSchemas.version} = ${version}` : undefined)
		.orderBy(desc(clientSchemas.createdAt))
		.limit(1);
	if (!record) {
		throw new Error(`Schema version ${version} not found`);
	}
	return record;
}
