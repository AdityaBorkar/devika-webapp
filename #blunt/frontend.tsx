import { createRoot } from 'react-dom/client';

import { Router } from '#blunt/router';

function start() {
	const element = document.getElementById('root');
	if (!element) {
		throw new Error('Root element not found');
	}
	const root = createRoot(element);
	root.render(<Router />);
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', start);
} else {
	start();
}
