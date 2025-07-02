import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Router } from '#blunt/router';

function start() {
	const element = document.getElementById('root');
	if (!element) {
		throw new Error('Root element not found');
	}
	const root = createRoot(element);
	root.render(
		<StrictMode>
			<Router />
		</StrictMode>,
	);
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', start);
} else {
	start();
}
