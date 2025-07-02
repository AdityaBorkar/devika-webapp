const cache = new Map();

// export default function use<R>(promise: Promise<R>) {
// 	if (!promiseCache.has(promise)) {

// 		promiseCache.set(promise, () => {
// 			if (status === 'pending') throw suspender;
// 			if (status === 'rejected') throw result;
// 			return result;
// 		});
// 	}

// 	return promiseCache.get(promise)();
// }

export function unstable_use<R>(promise: () => Promise<R>) {
	return new Promise<R>((resolve, _reject) => {
		if (cache.has(promise)) {
			const result = cache.get(promise)();
			return resolve(result);
		}

		promise()
			.then((result) => {
				cache.set(promise, () => result);
				resolve(result);
			})
			.catch((error) => {
				throw error;
			});
	});
}
