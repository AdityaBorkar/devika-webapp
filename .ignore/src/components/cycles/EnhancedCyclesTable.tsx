import {
	type ColumnDef,
	type ColumnFiltersState,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import type { Cycle } from './types';
import { formatDate } from './utils';

interface EnhancedCyclesTableProps {
	cycles: Cycle[];
	sorting: SortingState;
	setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
	columnFilters: ColumnFiltersState;
	searchQuery: string;
}

export const EnhancedCyclesTable: React.FC<EnhancedCyclesTableProps> = ({
	cycles,
	sorting,
	setSorting,
	columnFilters,
	searchQuery,
}) => {
	const columnHelper = createColumnHelper<Cycle>();

	// Local column filters state
	const [localColumnFilters, setLocalColumnFilters] =
		useState<ColumnFiltersState>(columnFilters);

	// Update local filters when props change
	useEffect(() => {
		setLocalColumnFilters(columnFilters);
	}, [columnFilters]);

	// Update local filters when search query changes
	useEffect(() => {
		if (searchQuery) {
			setLocalColumnFilters((prev) => {
				// Remove any existing name filter
				const filtered = prev.filter((filter) => filter.id !== 'name');
				// Add the new search filter
				return [...filtered, { id: 'name', value: searchQuery }];
			});
		} else {
			// Remove name filter if search query is empty
			setLocalColumnFilters((prev) =>
				prev.filter((filter) => filter.id !== 'name'),
			);
		}
	}, [searchQuery]);

	// Define status badge styles
	const getStatusColor = (status: string) => {
		switch (status) {
			case 'Not Started':
				return 'bg-bg-primary border-zinc-200 text-text-primary';
			case 'In Progress':
				return 'bg-blue-50 border-blue-200 text-blue-700';
			case 'Completed':
				return 'bg-green-50 border-green-200 text-green-700';
			case 'Cancelled':
				return 'bg-red-50 border-red-200 text-red-700';
			default:
				return 'bg-bg-primary border-zinc-200 text-text-primary';
		}
	};

	// Define columns
	const columns = useMemo<ColumnDef<Cycle>[]>(
		() => [
			columnHelper.accessor('name', {
				cell: (info) => (
					<span className="font-medium text-primary">{info.getValue()}</span>
				),
				// Add filter function for name search
				filterFn: (row, columnId, filterValue) => {
					const value = row.getValue(columnId) as string;
					return value
						.toLowerCase()
						.includes((filterValue as string).toLowerCase());
				},
				header: 'Name',
			}),
			columnHelper.accessor('startDate', {
				cell: (info) => (
					<span className="text-muted-foreground text-sm">
						{formatDate(info.getValue())}
					</span>
				),
				header: 'Start Date',
			}),
			columnHelper.accessor('endDate', {
				cell: (info) => (
					<span className="text-muted-foreground text-sm">
						{formatDate(info.getValue())}
					</span>
				),
				header: 'End Date',
			}),
			columnHelper.accessor('status', {
				cell: (info) => (
					<Badge
						className={`border ${getStatusColor(info.getValue())} px-2 py-0.5 font-medium text-xs`}
					>
						{info.getValue()}
					</Badge>
				),
				// Add filter function for status
				filterFn: (row, columnId, filterValue) => {
					const value = row.getValue(columnId) as string;
					return filterValue === 'All' || value === filterValue;
				},
				header: 'Status',
			}),
			columnHelper.accessor((row) => row.tasks.length, {
				cell: (info) => (
					<span className="font-medium text-sm">{info.getValue()}</span>
				),
				header: 'Tasks',
				id: 'tasks',
			}),
			columnHelper.accessor((row) => row.progress.percentComplete, {
				cell: (info) => (
					<div className="flex items-center gap-2">
						<div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-primary">
							<div
								className="h-1.5 rounded-full bg-bg-primary transition-all duration-300"
								style={{ width: `${info.getValue()}%` }}
							/>
						</div>
						<span className="font-medium text-muted-foreground text-xs">
							{info.getValue()}%
						</span>
					</div>
				),
				header: 'Progress',
				id: 'progress',
			}),
		],
		[columnHelper, getStatusColor],
	);

	// Initialize the table
	const table = useReactTable({
		columns,
		data: cycles,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setLocalColumnFilters,
		onSortingChange: setSorting,
		state: {
			columnFilters: localColumnFilters,
			sorting,
		},
	});

	const navigate = useNavigate();

	// Handle row click
	const handleRowClick = (id: string) => {
		navigate(`/cycles/${id}`);
	};

	// Show empty state if no cycles after filtering
	if (table.getFilteredRowModel().rows.length === 0) {
		return (
			<div className="flex flex-grow flex-col items-center justify-center py-16">
				<p className="mb-2 text-muted-foreground">No cycles found</p>
				<p className="text-muted-foreground/80 text-sm">
					Try adjusting your filters or search criteria
				</p>
			</div>
		);
	}

	return (
		<div className="flex-grow overflow-auto rounded-md border bg-white shadow-sm dark:bg-background">
			<Table>
				<TableHeader className="bg-bg-primary dark:bg-bg-primary">
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow
							className="border-zinc-200 border-b hover:bg-transparent dark:border-zinc-800"
							key={headerGroup.id}
						>
							{headerGroup.headers.map((header) => (
								<TableHead
									className="cursor-pointer py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider"
									key={header.id}
									onClick={header.column.getToggleSortingHandler()}
								>
									<div className="flex items-center">
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
										<span className="ml-1 flex items-center">
											{header.column.getIsSorted() ? (
												header.column.getIsSorted() === 'asc' ? (
													<ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
												) : (
													<ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
												)
											) : null}
										</span>
									</div>
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows.map((row) => (
						<TableRow
							className="cursor-pointer border-zinc-100 border-b transition-colors hover:bg-bg-primary/50 dark:border-zinc-800 dark:hover:bg-bg-primary/50"
							key={row.id}
							onClick={() => handleRowClick(row.original.id)}
						>
							{row.getVisibleCells().map((cell) => (
								<TableCell className="py-3" key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
			<div className="flex items-center justify-between border-zinc-100 border-t bg-bg-primary/50 p-3 dark:border-zinc-800 dark:bg-bg-primary/50">
				<div className="text-muted-foreground text-xs">
					Showing {table.getFilteredRowModel().rows.length} of {cycles.length}{' '}
					cycles
				</div>
			</div>
		</div>
	);
};
