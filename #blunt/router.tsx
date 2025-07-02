import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

import WorkspacesPage from '@/app/~/workspaces/page';
import RootLayout from '@/app/layout';
import HomePage from '@/app/page';
// import LogoutPage from '@/app/(app)/logout/page';
// import ChatPage from '@/app/(workspace)/chat/page';
// import CycleDetailPage from '@/app/(workspace)/cycles/[id]/page';
// import CyclesViewPage from '@/app/(workspace)/cycles/page';
// import DashboardPage from '@/app/(workspace)/dashboard/page';
// import DeploymentsPage from '@/app/(workspace)/deployments/page';
// import EditorPage from '@/app/(workspace)/editor/page';
// import { PrdDocPage } from '@/app/(workspace)/prd/[pageId]/page';
// import PrdLayout from '@/app/(workspace)/prd/layout';
// import PrdDefaultPage from '@/app/(workspace)/prd/page';
// import AIModelsSettings from '@/app/(workspace)/settings/ai-models/page';
// import ConnectedAppsSettings from '@/app/(workspace)/settings/connected-apps/page';
// import SettingsLayout from '@/app/(workspace)/settings/layout';
// import SettingsDefaultPage from '@/app/(workspace)/settings/page';
// import SupportSettings from '@/app/(workspace)/settings/support/page';
// import WorkspaceSettings from '@/app/(workspace)/settings/workspace/page';
// import StatsPage from '@/app/(workspace)/stats/page';
// import TaskPage from '@/app/(workspace)/tasks/[id]/page';
// import TaskViewPage from '@/app/(workspace)/tasks/page';
// import VersionsPage from '@/app/(workspace)/versions/page';
// import OnboardingPage from '@/app/new/page';
// import { Error404 } from '@/app/not-found';
// import HomePage from '@/app/page';
// import PrivacyPage from '@/app/privacy/page';
// import TermsPage from '@/app/terms/page';
// import Loading from '@/components/Loading';
// import AppLayout from './app/(app)/layout';
// import WorkspacesPage from './app/(app)/workspaces/page';
// import WorkspaceLayout from './app/(workspace)/layout';
// import AccountSettings from './app/(workspace)/settings/account/page';
// import RootLayout from './app/layout';

export function Router() {
	return (
		<BrowserRouter>
			<Routes>
				{/* <Route element={<RootLayout />}>
					<Route element={<HomePage />} index />
					<Route path="/privacy" element={<PrivacyPage />} />
					<Route path="/terms" element={<TermsPage />} />
					<Route path="*" element={<Error404 />} />
				</Route> */}
				<Route element={<RootLayout />}>
					<Route element={<HomePage />} index />
					{/* <Route element={<LogoutPage />} path="logout" /> */}
					<Route path="~">
						<Route
							element={
								<Suspense fallback={<LoadingComponent />}>
									<WorkspacesPage />
								</Suspense>
							}
							path="workspaces"
						/>
					</Route>
					{/*
					<Route
						element={
							<Suspense fallback={<Loading />}>
								<WorkspaceLayout />
							</Suspense>
						}
						path="/:userSlug/:workspaceSlug"
					>
						<Route element={<DashboardPage />} path="dashboard" />
						<Route element={<ChatPage />} path="chat" />
						<Route path="cycles">
							<Route element={<CyclesViewPage />} index />
							<Route element={<CycleDetailPage />} path=":cycleId" />
						</Route>
						<Route element={<PrdLayout />} path="prd">
							<Route element={<PrdDefaultPage />} index />
							<Route
								element={
									<Suspense fallback={<Loading />}>
										<PrdDocPage />
									</Suspense>
								}
								path=":pageId"
							/>
						</Route>
						<Route path="tasks">
							<Route element={<TaskViewPage />} index />
							<Route element={<TaskPage />} path=":taskId" />
						</Route>
						<Route element={<EditorPage />} path="workspace" />
						<Route element={<VersionsPage />} path="versions" />
						<Route element={<DeploymentsPage />} path="deployments" />
						<Route element={<StatsPage />} path="stats" />
						<Route element={<SettingsLayout />} path="settings">
							<Route element={<SettingsDefaultPage />} index />
							<Route path="repo" element={<RepoSettings />} />
							<Route element={<AccountSettings />} path="account" />
							<Route element={<WorkspaceSettings />} path="workspace" />
							<Route element={<AIModelsSettings />} path="ai-models" />
							<Route element={<ConnectedAppsSettings />} path="connected-apps" />
							<Route element={<SupportSettings />} path="support" />
						</Route>
					</Route>
					*/}
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

function LoadingComponent() {
	return <div>Loading...</div>;
}
