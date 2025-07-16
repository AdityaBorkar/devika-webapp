'use client';

import {
	PiClockCountdown,
	PiCodeBlock,
	PiGitCommit,
	PiRadioButton,
	PiTimer,
	PiWarningCircle,
} from 'react-icons/pi';
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Legend,
	Line,
	LineChart,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data - would be replaced with actual data from API
const stats = {
	cycles: {
		averageCommits: 14,
		averageLOC: 780, // hours
		averageTime: 10,
		averageTokens: 206250,
		count: 12,
		data: [
			{
				commits: 16,
				id: 1,
				loc: 850,
				reprompts: 3.1,
				time: 12,
				tokens: 220000,
			},
			{ commits: 12, id: 2, loc: 720, reprompts: 2.3, time: 9, tokens: 190000 },
			{
				commits: 15,
				id: 3,
				loc: 820,
				reprompts: 2.7,
				time: 11,
				tokens: 240000,
			},
			{ commits: 11, id: 4, loc: 650, reprompts: 1.9, time: 8, tokens: 180000 },
			{
				commits: 14,
				id: 5,
				loc: 790,
				reprompts: 2.2,
				time: 10,
				tokens: 210000,
			},
			{
				commits: 13,
				id: 6,
				loc: 760,
				reprompts: 2.0,
				time: 10,
				tokens: 200000,
			},
			{ commits: 12, id: 7, loc: 730, reprompts: 2.1, time: 9, tokens: 195000 },
			{
				commits: 15,
				id: 8,
				loc: 800,
				reprompts: 2.6,
				time: 11,
				tokens: 220000,
			},
			{
				commits: 14,
				id: 9,
				loc: 770,
				reprompts: 2.4,
				time: 10,
				tokens: 210000,
			},
			{
				commits: 13,
				id: 10,
				loc: 740,
				reprompts: 2.2,
				time: 9,
				tokens: 195000,
			},
			{
				commits: 16,
				id: 11,
				loc: 830,
				reprompts: 2.8,
				time: 12,
				tokens: 230000,
			},
			{
				commits: 14,
				id: 12,
				loc: 780,
				reprompts: 2.3,
				time: 10,
				tokens: 205000,
			},
		], // average reprompts per task
		repromptRate: 2.4,
	},
	errors: {
		byType: [
			{ name: 'Syntax', value: 42 },
			{ name: 'Logic', value: 38 },
			{ name: 'Integration', value: 26 },
			{ name: 'Performance', value: 15 },
			{ name: 'Other', value: 35 },
		],
		resolved: 142,
		total: 156,
		trend: [
			{ reported: 28, resolved: 24, week: 'W1' },
			{ reported: 32, resolved: 30, week: 'W2' },
			{ reported: 36, resolved: 32, week: 'W3' },
			{ reported: 30, resolved: 27, week: 'W4' },
			{ reported: 22, resolved: 21, week: 'W5' },
			{ reported: 8, resolved: 8, week: 'W6' },
		],
	},
	time: {
		average: 25, // hours
		byPhase: [
			{ name: 'Planning', value: 30 },
			{ name: 'Development', value: 65 },
			{ name: 'Testing', value: 15 },
			{ name: 'Refinement', value: 10 },
		], // minutes per task
		monthly: [
			{ hours: 15, month: 'Jan' },
			{ hours: 18, month: 'Feb' },
			{ hours: 22, month: 'Mar' },
			{ hours: 25, month: 'Apr' },
			{ hours: 20, month: 'May' },
			{ hours: 20, month: 'Jun' },
		],
		total: 120,
	},
	tokens: {
		average: 7500,
		byModel: [
			{ name: 'Claude 3 Opus', value: 1200000 },
			{ name: 'Claude 3 Sonnet', value: 875000 },
			{ name: 'GPT-4', value: 400000 },
		],
		lastMonth: 850000,
		monthly: [
			{ month: 'Jan', tokens: 320000 },
			{ month: 'Feb', tokens: 290000 },
			{ month: 'Mar', tokens: 330000 },
			{ month: 'Apr', tokens: 450000 },
			{ month: 'May', tokens: 560000 },
			{ month: 'Jun', tokens: 525000 },
		],
		total: 2475000,
	},
};

// Custom chart colors from CSS variables
const chartColors = [
	'var(--chart-1)',
	'var(--chart-2)',
	'var(--chart-3)',
	'var(--chart-4)',
	'var(--chart-5)',
];

export default function StatsPage() {
	return (
		<div className="space-y-6 p-6">
			<h1 className="font-bold text-3xl tracking-tight">Usage Statistics</h1>

			<Tabs className="space-y-6" defaultValue="overview">
				<TabsList>
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="tokens">Tokens</TabsTrigger>
					<TabsTrigger value="time">Time</TabsTrigger>
					<TabsTrigger value="errors">Errors</TabsTrigger>
					<TabsTrigger value="cycles">Cycles</TabsTrigger>
				</TabsList>

				{/* Overview Tab */}
				<TabsContent className="space-y-6" value="overview">
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
						<Card>
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle className="font-medium text-sm">
									Total Tokens
								</CardTitle>
								<PiCodeBlock className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="font-bold text-2xl">
									{stats.tokens.total.toLocaleString()}
								</div>
								<p className="mt-1 text-muted-foreground text-xs">
									~{stats.tokens.average.toLocaleString()} per task
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle className="font-medium text-sm">
									Development Time
								</CardTitle>
								<PiTimer className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="font-bold text-2xl">
									{stats.time.total} hours
								</div>
								<p className="mt-1 text-muted-foreground text-xs">
									{stats.time.average} min average per task
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle className="font-medium text-sm">Errors</CardTitle>
								<PiWarningCircle className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="font-bold text-2xl">{stats.errors.total}</div>
								<p className="mt-1 text-muted-foreground text-xs">
									{stats.errors.resolved} resolved (
									{Math.round(
										(stats.errors.resolved / stats.errors.total) * 100,
									)}
									%)
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle className="font-medium text-sm">
									Development Cycles
								</CardTitle>
								<PiClockCountdown className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="font-bold text-2xl">{stats.cycles.count}</div>
								<p className="mt-1 text-muted-foreground text-xs">
									{stats.cycles.averageLOC.toLocaleString()} lines of code on
									average
								</p>
							</CardContent>
						</Card>
					</div>

					<div className="grid gap-6 md:grid-cols-2">
						<Card>
							<CardHeader>
								<CardTitle>Time Allocation</CardTitle>
								<CardDescription>Development hours by phase</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="h-[300px]">
									<ResponsiveContainer height="100%" width="100%">
										<PieChart>
											<Pie
												cx="50%"
												cy="50%"
												data={stats.time.byPhase}
												dataKey="value"
												innerRadius={60}
												label={({ name, percent }) =>
													`${name} (${percent ? (percent * 100).toFixed(0) : '0'}%)`
												}
												labelLine={false}
												outerRadius={100}
												paddingAngle={2}
											>
												{stats.time.byPhase.map((entry, index) => (
													<Cell
														fill={chartColors[index % chartColors.length]}
														key={`cell-time-${entry.name}`}
													/>
												))}
											</Pie>
											<Tooltip
												formatter={(value) => [`${value} hours`, 'Time']}
											/>
											<Legend />
										</PieChart>
									</ResponsiveContainer>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Token Usage</CardTitle>
								<CardDescription>Distribution by model</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="h-[300px]">
									<ResponsiveContainer height="100%" width="100%">
										<PieChart>
											<Pie
												cx="50%"
												cy="50%"
												data={stats.tokens.byModel}
												dataKey="value"
												innerRadius={60}
												label={({ name, percent }) =>
													`${name} (${percent ? (percent * 100).toFixed(0) : '0'}%)`
												}
												labelLine={false}
												outerRadius={100}
												paddingAngle={2}
											>
												{stats.tokens.byModel.map((entry, index) => (
													<Cell
														fill={chartColors[index % chartColors.length]}
														key={`cell-token-${entry.name}`}
													/>
												))}
											</Pie>
											<Tooltip
												formatter={(value: number) => [
													`${(value / 1000000).toFixed(1)}M`,
													'Tokens',
												]}
											/>
											<Legend />
										</PieChart>
									</ResponsiveContainer>
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				{/* Tokens Tab */}
				<TabsContent className="space-y-6" value="tokens">
					<div className="grid gap-6 md:grid-cols-3">
						<Card>
							<CardHeader>
								<CardTitle>Token Usage</CardTitle>
								<CardDescription>Total and average consumption</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div>
									<h3 className="mb-2 font-medium text-muted-foreground text-sm">
										Total Used
									</h3>
									<p className="font-bold text-3xl">
										{stats.tokens.total.toLocaleString()}
									</p>
								</div>
								<div>
									<h3 className="mb-2 font-medium text-muted-foreground text-sm">
										Last Month
									</h3>
									<p className="font-bold text-3xl">
										{stats.tokens.lastMonth.toLocaleString()}
									</p>
								</div>
								<div>
									<h3 className="mb-2 font-medium text-muted-foreground text-sm">
										Average Per Task
									</h3>
									<p className="font-bold text-3xl">
										{stats.tokens.average.toLocaleString()}
									</p>
								</div>
							</CardContent>
						</Card>

						<Card className="md:col-span-2">
							<CardHeader>
								<CardTitle>Token Distribution by Model</CardTitle>
								<CardDescription>
									Usage across different AI models
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="h-[300px]">
									<ResponsiveContainer height="100%" width="100%">
										<BarChart data={stats.tokens.byModel}>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis dataKey="name" />
											<YAxis tickFormatter={(value) => `${value / 1000000}M`} />
											<Tooltip
												formatter={(value: number) => [
													`${(value / 1000000).toFixed(1)}M tokens`,
													'Usage',
												]}
											/>
											<Bar
												dataKey="value"
												fill="var(--chart-1)"
												radius={[4, 4, 0, 0]}
											>
												{stats.tokens.byModel.map((entry, index) => (
													<Cell
														fill={chartColors[index % chartColors.length]}
														key={`cell-bar-${entry.name}`}
													/>
												))}
											</Bar>
										</BarChart>
									</ResponsiveContainer>
								</div>
							</CardContent>
						</Card>
					</div>

					<Card>
						<CardHeader>
							<CardTitle>Token Usage Over Time</CardTitle>
							<CardDescription>Monthly consumption trends</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-[300px]">
								<ResponsiveContainer height="100%" width="100%">
									<AreaChart data={stats.tokens.monthly}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="month" />
										<YAxis tickFormatter={(value) => `${value / 1000}k`} />
										<Tooltip
											formatter={(value: number) => [
												`${(value / 1000).toFixed(0)}k tokens`,
												'Usage',
											]}
										/>
										<Area
											dataKey="tokens"
											fill="var(--chart-1)"
											fillOpacity={0.2}
											stroke="var(--chart-1)"
											type="monotone"
										/>
									</AreaChart>
								</ResponsiveContainer>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{/* Time Tab */}
				<TabsContent className="space-y-6" value="time">
					<div className="grid gap-6 md:grid-cols-3">
						<Card>
							<CardHeader>
								<CardTitle>Time Metrics</CardTitle>
								<CardDescription>Development time statistics</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div>
									<h3 className="mb-2 font-medium text-muted-foreground text-sm">
										Total Hours
									</h3>
									<p className="font-bold text-3xl">{stats.time.total}</p>
								</div>
								<div>
									<h3 className="mb-2 font-medium text-muted-foreground text-sm">
										Average per Task
									</h3>
									<p className="font-bold text-3xl">{stats.time.average} min</p>
								</div>
								<div>
									<h3 className="mb-2 font-medium text-muted-foreground text-sm">
										Cycle Average
									</h3>
									<p className="font-bold text-3xl">
										{stats.cycles.averageTime} hours
									</p>
								</div>
							</CardContent>
						</Card>

						<Card className="md:col-span-2">
							<CardHeader>
								<CardTitle>Time Distribution by Phase</CardTitle>
								<CardDescription>
									Hours spent in each development phase
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="h-[300px]">
									<ResponsiveContainer height="100%" width="100%">
										<BarChart data={stats.time.byPhase} layout="vertical">
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis type="number" />
											<YAxis dataKey="name" type="category" width={100} />
											<Tooltip
												formatter={(value) => [`${value} hours`, 'Time']}
											/>
											<Bar dataKey="value" radius={[0, 4, 4, 0]}>
												{stats.time.byPhase.map((entry, index) => (
													<Cell
														fill={chartColors[index % chartColors.length]}
														key={`cell-time-bar-${entry.name}`}
													/>
												))}
											</Bar>
										</BarChart>
									</ResponsiveContainer>
								</div>
							</CardContent>
						</Card>
					</div>

					<Card>
						<CardHeader>
							<CardTitle>Time Spent Over Time</CardTitle>
							<CardDescription>Monthly development hours</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-[300px]">
								<ResponsiveContainer height="100%" width="100%">
									<LineChart data={stats.time.monthly}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="month" />
										<YAxis />
										<Tooltip
											formatter={(value) => [
												`${value} hours`,
												'Development Time',
											]}
										/>
										<Line
											activeDot={{ r: 6 }}
											dataKey="hours"
											dot={{ r: 4, strokeWidth: 1 }}
											stroke="var(--chart-2)"
											strokeWidth={2}
											type="monotone"
										/>
									</LineChart>
								</ResponsiveContainer>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{/* Errors Tab */}
				<TabsContent className="space-y-6" value="errors">
					<div className="grid gap-6 md:grid-cols-3">
						<Card>
							<CardHeader>
								<CardTitle>Error Analysis</CardTitle>
								<CardDescription>Bug and error metrics</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div>
									<h3 className="mb-2 font-medium text-muted-foreground text-sm">
										Total Errors
									</h3>
									<p className="font-bold text-3xl">{stats.errors.total}</p>
								</div>
								<div>
									<h3 className="mb-2 font-medium text-muted-foreground text-sm">
										Resolved
									</h3>
									<p className="font-bold text-3xl">
										{stats.errors.resolved}{' '}
										<span className="text-muted-foreground text-sm">
											(
											{Math.round(
												(stats.errors.resolved / stats.errors.total) * 100,
											)}
											%)
										</span>
									</p>
								</div>
								<div>
									<h3 className="mb-2 font-medium text-muted-foreground text-sm">
										Outstanding
									</h3>
									<p className="font-bold text-3xl">
										{stats.errors.total - stats.errors.resolved}
									</p>
								</div>
							</CardContent>
						</Card>

						<Card className="md:col-span-2">
							<CardHeader>
								<CardTitle>Error Types</CardTitle>
								<CardDescription>
									Distribution of errors by category
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="h-[300px]">
									<ResponsiveContainer height="100%" width="100%">
										<BarChart data={stats.errors.byType}>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis dataKey="name" />
											<YAxis />
											<Tooltip
												formatter={(value) => [`${value} errors`, 'Count']}
											/>
											<Bar dataKey="value" radius={[4, 4, 0, 0]}>
												{stats.errors.byType.map((entry, index) => (
													<Cell
														fill={chartColors[index % chartColors.length]}
														key={`cell-error-${entry.name}`}
													/>
												))}
											</Bar>
										</BarChart>
									</ResponsiveContainer>
								</div>
							</CardContent>
						</Card>
					</div>

					<Card>
						<CardHeader>
							<CardTitle>Error Resolution Trend</CardTitle>
							<CardDescription>Weekly reported vs. resolved</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-[300px]">
								<ResponsiveContainer height="100%" width="100%">
									<LineChart data={stats.errors.trend}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="week" />
										<YAxis />
										<Tooltip />
										<Legend />
										<Line
											dataKey="reported"
											dot={{ r: 4, strokeWidth: 1 }}
											name="Reported Errors"
											stroke="var(--chart-3)"
											strokeWidth={2}
											type="monotone"
										/>
										<Line
											dataKey="resolved"
											dot={{ r: 4, strokeWidth: 1 }}
											name="Resolved Errors"
											stroke="var(--chart-1)"
											strokeWidth={2}
											type="monotone"
										/>
									</LineChart>
								</ResponsiveContainer>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{/* Cycles Tab */}
				<TabsContent className="space-y-6" value="cycles">
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
						<Card>
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle className="font-medium text-sm">
									Average Time
								</CardTitle>
								<PiTimer className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="font-bold text-2xl">
									{stats.cycles.averageTime} hours
								</div>
								<p className="mt-1 text-muted-foreground text-xs">
									Per development cycle
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle className="font-medium text-sm">
									Average Tokens
								</CardTitle>
								<PiCodeBlock className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="font-bold text-2xl">
									{stats.cycles.averageTokens.toLocaleString()}
								</div>
								<p className="mt-1 text-muted-foreground text-xs">
									Per development cycle
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle className="font-medium text-sm">
									Average Commits
								</CardTitle>
								<PiGitCommit className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="font-bold text-2xl">
									{stats.cycles.averageCommits}
								</div>
								<p className="mt-1 text-muted-foreground text-xs">
									Per development cycle
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle className="font-medium text-sm">
									Re-prompt Rate
								</CardTitle>
								<PiRadioButton className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="font-bold text-2xl">
									{stats.cycles.repromptRate}
								</div>
								<p className="mt-1 text-muted-foreground text-xs">
									Average re-prompts per task
								</p>
							</CardContent>
						</Card>
					</div>

					<Card>
						<CardHeader>
							<CardTitle>Cycle Comparison</CardTitle>
							<CardDescription>
								Time and token usage across cycles
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-[350px]">
								<ResponsiveContainer height="100%" width="100%">
									<BarChart
										data={stats.cycles.data}
										margin={{ bottom: 20, left: 20, right: 30, top: 20 }}
									>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis
											dataKey="id"
											label={{
												offset: -10,
												position: 'insideBottom',
												value: 'Cycle #',
											}}
										/>
										<YAxis
											label={{
												angle: -90,
												position: 'insideLeft',
												value: 'Time (hours)',
											}}
											orientation="left"
											yAxisId="left"
										/>
										<YAxis
											label={{
												angle: 90,
												position: 'insideRight',
												value: 'Tokens',
											}}
											orientation="right"
											tickFormatter={(value) => `${value / 1000}k`}
											yAxisId="right"
										/>
										<Tooltip />
										<Legend />
										<Bar
											dataKey="time"
											fill="var(--chart-1)"
											name="Time (hours)"
											yAxisId="left"
										/>
										<Bar
											dataKey="tokens"
											fill="var(--chart-2)"
											name="Tokens"
											yAxisId="right"
										/>
									</BarChart>
								</ResponsiveContainer>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Cycle Efficiency</CardTitle>
							<CardDescription>Metrics for development cycles</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid gap-6 md:grid-cols-2">
								<div>
									<h3 className="mb-4 font-medium text-sm">
										Time vs Output Ratio
									</h3>
									<div className="space-y-4">
										<div className="space-y-2">
											<div className="flex justify-between text-sm">
												<span>Time per 1k lines</span>
												<span className="font-medium">
													{(
														(stats.cycles.averageTime /
															stats.cycles.averageLOC) *
														1000
													).toFixed(2)}{' '}
													hours
												</span>
											</div>
											<div className="space-y-2">
												<div className="flex justify-between text-sm">
													<span>Tokens per 1k lines</span>
													<span className="font-medium">
														{(
															(stats.cycles.averageTokens /
																stats.cycles.averageLOC) *
															1000
														).toFixed(0)}
													</span>
												</div>
											</div>
											<div className="space-y-2">
												<div className="flex justify-between text-sm">
													<span>Commits per 1k lines</span>
													<span className="font-medium">
														{(
															(stats.cycles.averageCommits /
																stats.cycles.averageLOC) *
															1000
														).toFixed(2)}
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div>
									<h3 className="mb-4 font-medium text-sm">
										Re-prompt Analysis
									</h3>
									<div className="space-y-4">
										<ResponsiveContainer height={100} width="100%">
											<BarChart
												data={[
													{
														name: 'Re-prompts',
														value: stats.cycles.repromptRate,
													},
												]}
												layout="vertical"
												margin={{ bottom: 5, left: 5, right: 5, top: 5 }}
											>
												<XAxis domain={[0, 5]} hide type="number" />
												<Tooltip
													formatter={(value) => [
														`${value} per task`,
														'Re-prompt Rate',
													]}
												/>
												<Bar
													dataKey="value"
													fill="var(--chart-1)"
													radius={[0, 4, 4, 0]}
												>
													<Cell fill="var(--chart-1)" />
													{/* Add industry average reference line */}
													<Cell
														fill="var(--chart-3)"
														radius={0}
														width={0.5}
														x={3.5}
													/>
												</Bar>
											</BarChart>
										</ResponsiveContainer>
										<p className="mt-2 text-muted-foreground text-xs">
											Scale: 0-5 re-prompts per task (industry average ~3.5)
										</p>
										<div className="mt-6 space-y-2">
											<div className="flex justify-between text-sm">
												<span>Time lost to re-prompting</span>
												<span className="font-medium">
													{(
														stats.cycles.repromptRate *
														stats.time.average *
														0.3
													).toFixed(0)}{' '}
													min/task
												</span>
											</div>
											<p className="mt-2 text-muted-foreground text-xs">
												Estimated based on average task time and re-prompt rate
											</p>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
