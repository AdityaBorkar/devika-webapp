import {
	type ColumnFiltersState,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';

import type { Task } from '../../../../types/types';
import { TaskPriorityBadge } from '../../tasks/TaskPriorityBadge';
import { TaskStatusBadge } from '../../tasks/TaskStatusBadge';
import { Button } from '../../ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../../ui/table';

interface ListTableProps {
	tasks: Task[];
	sorting: SortingState;
	setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
	columnFilters: ColumnFiltersState;
	searchQuery: string;
}

export const ListTable: React.FC<ListTableProps> = ({
	tasks,
	sorting,
	setSorting,
	columnFilters,
	searchQuery,
}) => {
	const columnHelper = createColumnHelper<Task>();

	// Define columns - memoized for performance
	const columns = useMemo(
		() => [
			columnHelper.accessor('id', {
				cell: (info) => <span className="font-medium">{info.getValue()}</span>,
				header: 'ID',
				size: 80,
			}),
			columnHelper.accessor('title', {
				cell: (info) => <span>{info.getValue()}</span>,
				header: 'Title',
			}),
			columnHelper.accessor('status', {
				cell: (info) => <TaskStatusBadge status={info.getValue()} />,
				header: 'Status',
				size: 120,
			}),
			columnHelper.accessor('priority', {
				cell: (info) => <TaskPriorityBadge priority={info.getValue()} />,
				header: 'Priority',
				size: 100,
			}),
			columnHelper.accessor('assignee', {
				cell: (info) => (
					<span className="text-muted-foreground">{info.getValue()}</span>
				),
				header: 'Assignee',
				size: 150,
			}),
			columnHelper.accessor('due', {
				cell: (info) => (
					<span className="text-muted-foreground">{info.getValue()}</span>
				),
				header: 'Due Date',
				size: 120,
			}),
		],
		[columnHelper],
	);

	// Initialize the table - tasks are already filtered at atom level
	const table = useReactTable({
		columns,
		data: tasks, // Use tasks directly as they're already filtered by the atom
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		state: {
			sorting,
		},
	});

	const navigate = useNavigate();

	// Handle row click
	const handleRowClick = (id: string) => {
		navigate(`/tasks/${id}`);
	};

	// Show empty state if no tasks
	if (tasks.length === 0) {
		return (
			<div className="flex flex-grow flex-col items-center justify-center py-16">
				<p className="mb-2 text-muted-foreground">No tasks found</p>
				<p className="text-muted-foreground/80 text-sm">
					Try adjusting your filters or search criteria
				</p>
			</div>
		);
	}

	return (
		<div className="flex-grow overflow-auto">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id} style={{ width: header.getSize() }}>
									<Button
										className="h-8 whitespace-nowrap px-0 font-medium text-muted-foreground"
										onClick={header.column.getToggleSortingHandler()}
										variant="ghost"
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
										{header.column.getIsSorted() && (
											<span className="ml-1">
												{header.column.getIsSorted() === 'asc' ? (
													<ArrowUp className="h-4 w-4" />
												) : (
													<ArrowDown className="h-4 w-4" />
												)}
											</span>
										)}
									</Button>
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows.map((row) => (
						<TableRow
							aria-label={`View task ${row.original.id}`}
							className="cursor-pointer hover:bg-muted/50"
							data-state={row.getIsSelected() ? 'selected' : undefined}
							key={row.id}
							onClick={() => handleRowClick(row.original.id)}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									handleRowClick(row.original.id);
								}
							}}
							tabIndex={0}
						>
							{row.getVisibleCells().map((cell) => (
								<TableCell key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
