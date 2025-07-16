// createProjectStructure.ts

import * as child_process from 'node:child_process';
import * as fs from 'node:fs';

// Function to get package.json dependencies
function getDependencies() {
	try {
		const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
		return {
			dependencies: packageJson.dependencies || {},
			devDependencies: packageJson.devDependencies || {},
		};
	} catch (_error) {
		return { dependencies: {}, devDependencies: {} };
	}
}

// Function to get project structure using tree command
function getProjectStructure() {
	try {
		// Check if tree command exists
		const treeExists = child_process.spawnSync('which', ['tree']).status === 0;

		if (treeExists) {
			// Exclude node_modules, .git, and other unnecessary directories
			return child_process.execSync(
				'tree -I "node_modules|.git|dist|.next|out" --dirsfirst -L 3',
				{ encoding: 'utf8' },
			);
		}
		return 'Tree command not found. Please install it or use manual project structure documentation.';
	} catch (_error) {
		return 'Error getting project structure.';
	}
}

// Create the project documentation
function createProjectDoc() {
	const { dependencies, devDependencies } = getDependencies();
	const structure = getProjectStructure();

	const content = `# Project Documentation

## Project Structure
\`\`\`
${structure}
\`\`\`

## Tech Stack
${Object.entries(dependencies)
	.map(([name, version]) => `- ${name}: ${version}`)
	.join('\n')}

## Development Dependencies
${Object.entries(devDependencies)
	.map(([name, version]) => `- ${name}: ${version}`)
	.join('\n')}

## Infrastructure
<!-- Add your infrastructure details manually here -->
- Deployment: <!-- e.g., Vercel, Netlify, AWS -->
- Database: <!-- e.g., MongoDB, PostgreSQL -->
- Authentication: <!-- e.g., Auth0, NextAuth.js -->
- Other Services: <!-- e.g., Stripe, Algolia -->

`;

	fs.writeFileSync('PROJECT_STRUCTURE.md', content);
	console.log('Project documentation created successfully!');
}

createProjectDoc();
