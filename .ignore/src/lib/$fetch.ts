import { DOMAIN } from '@/lib/constants';

type ResponseType = {
	success: boolean;
	data: any;
};

export async function $fetch(
	method: 'GET' | 'POST' | 'PUT' | 'DELETE',
	path: string,
	data?: any,
) {
	const url = new URL(path, DOMAIN);
	const options = {
		body: method === 'GET' ? undefined : JSON.stringify(data),
		method,
	};
	if (method === 'GET') {
		for (const [key, value] of Object.entries(data)) {
			url.searchParams.set(key, String(value));
		}
	}

	const response = await fetch(url, options);
	const json = await response.json();
	// console.log({ url, ok: response.ok, json });
	return json as ResponseType;
}
