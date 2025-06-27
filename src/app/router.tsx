import { BrowserRouter, Route, Routes } from 'react-router';

import WorkspacesPage from '@/app/~/workspaces/page';
import RootLayout from '@/app/layout';
import HomePage from '@/app/page';

export function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<RootLayout />}>
					<Route element={<HomePage />} index />
					<Route path="~">
						<Route element={<WorkspacesPage />} path="workspaces" />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
