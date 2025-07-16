// import {
// 	type ColumnDef,
// 	type ColumnFiltersState,
// 	flexRender,
// 	getCoreRowModel,
// 	getExpandedRowModel,
// 	getFacetedRowModel,
// 	getFacetedUniqueValues,
// 	getFilteredRowModel,
// 	getGroupedRowModel,
// 	getSortedRowModel,
// 	type SortingState,
// 	useReactTable,
// 	type VisibilityState,
// } from '@tanstack/react-table';
// import { formatDistanceToNow } from 'date-fns';
// import {
// 	ChevronDown,
// 	ChevronRight,
// 	ExternalLink,
// 	MoreHorizontal,
// 	Search,
// } from 'lucide-react';
// import { useMemo, useState } from 'react';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuItem,
// 	DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { Input } from '@/components/ui/input';
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from '@/components/ui/select';
// import type { Package, PackageCategory } from '@/types/tech-stack';

// // Badge color mapping
// const getBadgeStyles = (color: Label['color']) => {
// 	const colorMap: Record<Label['color'], string> = {
// 		amber: 'bg-amber-100 text-amber-800 border-amber-200',
// 		blue: 'bg-blue-100 text-blue-800 border-blue-200',
// 		cyan: 'bg-cyan-100 text-cyan-800 border-cyan-200',
// 		emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200',
// 		green: 'bg-green-100 text-green-800 border-green-200',
// 		indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
// 		orange: 'bg-orange-100 text-orange-800 border-orange-200',
// 		pink: 'bg-pink-100 text-pink-800 border-pink-200',
// 		purple: 'bg-purple-100 text-purple-800 border-purple-200',
// 		red: 'bg-red-100 text-red-800 border-red-200',
// 		violet: 'bg-violet-100 text-violet-800 border-violet-200',
// 		yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
// 	};

// 	return colorMap[color];
// };

// const columns: ColumnDef<Package>[] = [
// 	{
// 		accessorKey: 'name',
// 		cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
// 		header: 'Name',
// 	},
// 	{
// 		accessorKey: 'version',
// 		header: 'Version',
// 	},
// 	{
// 		accessorKey: 'labels',
// 		cell: ({ row }) => (
// 			<div className="flex flex-wrap gap-1">
// 				{row.original.labels.map((label) => (
// 					<Badge
// 						className={getBadgeStyles(label.color)}
// 						key={`${row.original.name}-${label.name}`}
// 						variant="outline"
// 					>
// 						{label.name}
// 					</Badge>
// 				))}
// 			</div>
// 		),
// 		enableSorting: false,
// 		header: 'Labels',
// 	},
// 	{
// 		accessorKey: 'docLink',
// 		cell: ({ row }) => (
// 			<>
// 				{row.original.docLink && (
// 					<a
// 						className="inline-flex items-center text-blue-600 hover:underline"
// 						href={row.original.docLink}
// 						rel="noopener noreferrer"
// 						target="_blank"
// 					>
// 						Docs <ExternalLink className="ml-1 h-3 w-3" />
// 					</a>
// 				)}
// 			</>
// 		),
// 		enableSorting: false,
// 		header: 'Documentation',
// 	},
// 	{
// 		accessorKey: 'lastUpdated',
// 		cell: ({ row }) =>
// 			formatDistanceToNow(row.original.lastUpdated, { addSuffix: true }),
// 		header: 'Last Updated',
// 		sortingFn: 'datetime',
// 	},
// 	{
// 		accessorKey: 'category',
// 		header: 'Category',
// 	},
// 	{
// 		cell: () => (
// 			<div className="text-right">
// 				<DropdownMenu>
// 					<DropdownMenuTrigger asChild>
// 						<Button size="icon" variant="ghost">
// 							<MoreHorizontal className="h-4 w-4" />
// 							<span className="sr-only">Actions</span>
// 						</Button>
// 					</DropdownMenuTrigger>
// 					<DropdownMenuContent align="end">
// 						<DropdownMenuItem>Edit</DropdownMenuItem>
// 						<DropdownMenuItem className="text-red-600">
// 							Disable
// 						</DropdownMenuItem>
// 					</DropdownMenuContent>
// 				</DropdownMenu>
// 			</div>
// 		),
// 		id: 'actions',
// 	},
// ];

// export default function PackageList({ project }: { project: any }) {
// 	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
// 	const [globalFilter, setGlobalFilter] = useState('');
// 	const [sorting, setSorting] = useState<SortingState>([]);
// 	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
// 	const [grouping, setGrouping] = useState<string[]>(['category']);

// 	// Setup table data
// 	const table = useReactTable({
// 		columns,
// 		data: project.packages,
// 		enableGrouping: true,
// 		getCoreRowModel: getCoreRowModel(),
// 		getExpandedRowModel: getExpandedRowModel(),
// 		getFacetedRowModel: getFacetedRowModel(),
// 		getFacetedUniqueValues: getFacetedUniqueValues(),
// 		getFilteredRowModel: getFilteredRowModel(),
// 		getGroupedRowModel: getGroupedRowModel(),
// 		getSortedRowModel: getSortedRowModel(),
// 		onColumnFiltersChange: setColumnFilters,
// 		onColumnVisibilityChange: setColumnVisibility,
// 		onGlobalFilterChange: setGlobalFilter,
// 		onSortingChange: setSorting,
// 		state: {
// 			columnFilters,
// 			columnVisibility,
// 			globalFilter,
// 			grouping,
// 			sorting,
// 		},
// 	});

// 	const selectedApp = project;

// 	// Get available categories for grouping/filtering
// 	const categories = useMemo(() => {
// 		const categories = new Set<PackageCategory>();
// 		selectedApp.packages.forEach((pkg) => categories.add(pkg.category));
// 		return Array.from(categories);
// 	}, [selectedApp]);

// 	return (
// 		<div>
// 			<div>
// 				{/* Table Controls */}
// 				<div className="flex flex-col gap-4 py-4 md:flex-row">
// 					<div className="flex flex-1 items-center space-x-2">
// 						<Search className="h-4 w-4 text-muted-foreground" />
// 						<Input
// 							className="h-8 w-full md:w-[250px]"
// 							onChange={(e) => setGlobalFilter(e.target.value)}
// 							placeholder="Search packages..."
// 							value={globalFilter}
// 						/>
// 					</div>
// 					<div className="flex flex-wrap gap-2">
// 						<div>
// 							<Select
// 								onValueChange={(value) => {
// 									if (value === 'none') {
// 										setGrouping([]);
// 									} else {
// 										setGrouping([value]);
// 									}
// 								}}
// 								value={grouping[0] || 'none'}
// 							>
// 								<SelectTrigger className="h-8 w-[150px]">
// 									<SelectValue placeholder="Group by" />
// 								</SelectTrigger>
// 								<SelectContent>
// 									<SelectItem value="none">No Grouping</SelectItem>
// 									<SelectItem value="category">Category</SelectItem>
// 								</SelectContent>
// 							</Select>
// 						</div>
// 						<div>
// 							<Select
// 								onValueChange={(value) => {
// 									if (value === 'all') {
// 										setColumnFilters(
// 											columnFilters.filter((f) => f.id !== 'category'),
// 										);
// 									} else {
// 										setColumnFilters([
// 											...columnFilters.filter((f) => f.id !== 'category'),
// 											{
// 												id: 'category',
// 												value: value,
// 											},
// 										]);
// 									}
// 								}}
// 								value={
// 									(columnFilters.find((f) => f.id === 'category')
// 										?.value as string) || 'all'
// 								}
// 							>
// 								<SelectTrigger className="h-8 w-[150px]">
// 									<SelectValue placeholder="Filter by category" />
// 								</SelectTrigger>
// 								<SelectContent>
// 									<SelectItem value="all">All Categories</SelectItem>
// 									{categories.map((category) => (
// 										<SelectItem key={category} value={category}>
// 											{category}
// 										</SelectItem>
// 									))}
// 								</SelectContent>
// 							</Select>
// 						</div>
// 					</div>
// 				</div>

// 				{/* Table */}
// 				<div className="rounded-md border">
// 					<table className="w-full">
// 						<thead>
// 							{table.getHeaderGroups().map((headerGroup) => (
// 								<tr className="border-b bg-muted/50" key={headerGroup.id}>
// 									{headerGroup.headers.map((header) => (
// 										<th
// 											className="px-4 py-3 text-left font-medium text-muted-foreground text-sm"
// 											key={header.id}
// 											style={{ width: header.getSize() }}
// 										>
// 											{header.isPlaceholder ? null : (
// 												<div
// 													className={
// 														header.column.getCanSort()
// 															? 'flex cursor-pointer select-none items-center space-x-1'
// 															: ''
// 													}
// 													onClick={header.column.getToggleSortingHandler()}
// 													onKeyDown={(e) => {
// 														if (e.key === 'Enter' || e.key === ' ') {
// 															e.preventDefault();
// 															header.column.toggleSorting();
// 														}
// 													}}
// 													role={
// 														header.column.getCanSort() ? 'button' : undefined
// 													}
// 													tabIndex={header.column.getCanSort() ? 0 : undefined}
// 												>
// 													{flexRender(
// 														header.column.columnDef.header,
// 														header.getContext(),
// 													)}
// 													{{
// 														asc: <ChevronDown className="h-3 w-3" />,
// 														desc: (
// 															<ChevronDown className="h-3 w-3 rotate-180" />
// 														),
// 													}[header.column.getIsSorted() as string] ?? null}
// 												</div>
// 											)}
// 										</th>
// 									))}
// 								</tr>
// 							))}
// 						</thead>
// 						<tbody>
// 							{table.getRowModel().rows.length > 0 ? (
// 								table.getRowModel().rows.map((row) => {
// 									return (
// 										<tr
// 											className={`border-b ${
// 												row.getIsGrouped() ? 'bg-muted/50 font-medium' : ''
// 											}`}
// 											data-state={row.getIsSelected() ? 'selected' : undefined}
// 											key={row.id}
// 										>
// 											{row.getVisibleCells().map((cell) => {
// 												return (
// 													<td
// 														className="px-4 py-3 text-sm"
// 														key={cell.id}
// 														style={{
// 															paddingLeft:
// 																cell.getIsGrouped() || cell.row.getIsGrouped()
// 																	? `${row.depth * 16 + 16}px`
// 																	: undefined,
// 														}}
// 													>
// 														{cell.getIsGrouped() ? (
// 															<div className="flex items-center gap-1">
// 																<Button
// 																	onClick={row.getToggleExpandedHandler()}
// 																	size="icon"
// 																	variant="ghost"
// 																>
// 																	{row.getIsExpanded() ? (
// 																		<ChevronDown className="h-4 w-4" />
// 																	) : (
// 																		<ChevronRight className="h-4 w-4" />
// 																	)}
// 																</Button>
// 																{flexRender(
// 																	cell.column.columnDef.cell,
// 																	cell.getContext(),
// 																)}{' '}
// 																({row.subRows.length})
// 															</div>
// 														) : cell.getIsAggregated() ? (
// 															flexRender(
// 																cell.column.columnDef.aggregatedCell ??
// 																	cell.column.columnDef.cell,
// 																cell.getContext(),
// 															)
// 														) : cell.getIsPlaceholder() ? null : (
// 															flexRender(
// 																cell.column.columnDef.cell,
// 																cell.getContext(),
// 															)
// 														)}
// 													</td>
// 												);
// 											})}
// 										</tr>
// 									);
// 								})
// 							) : (
// 								<tr>
// 									<td
// 										className="py-6 text-center text-muted-foreground"
// 										colSpan={columns.length}
// 									>
// 										No packages found
// 									</td>
// 								</tr>
// 							)}
// 						</tbody>
// 					</table>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
