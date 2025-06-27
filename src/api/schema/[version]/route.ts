import { file } from 'bun';

// TODO: ISR.
// TODO: Write a script that can generate these JSON easily
// https://biomejs.dev/schemas/2.0.0-beta.6/schema.json

export function GET() {
	// const {version} = usePath
	const version = '';
	const json = file(`./${version}.json`).json();
	return Response.json(json);
}
