import { useCallback, useEffect, useMemo, useState } from 'react';

import { useDbConnection } from '#letsync/client/useDatabase';
import { db as clientDb } from '@/lib/db/client';

type QueryFunction<T> = (db: typeof clientDb) => Promise<T>;

export function useDbQuery<T>(queryFn: QueryFunction<T>, deps: unknown[] = []) {
	const { isReady, isPending: dbPending } = useDbConnection();
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [isPending, setIsPending] = useState(true);

	const executeQuery = useCallback(async () => {
		if (!(isReady && clientDb)) {
			return;
		}

		try {
			setIsPending(true);
			setError(null);
			const result = await queryFn(clientDb);
			setData(result);
		} catch (err) {
			setError(err instanceof Error ? err : new Error('Query failed'));
		} finally {
			setIsPending(false);
		}
	}, [queryFn, isReady]);

	useEffect(() => {
		executeQuery();
	}, [executeQuery, ...deps]);

	return useMemo(
		() => ({
			data,
			error,
			isPending: dbPending || isPending,
			refetch: executeQuery,
		}),
		[data, error, dbPending, isPending, executeQuery],
	);
}
