# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `bun run dev:server` (runs `#blunt/server.tsx` with hot reload using `--hot`)
- **Start local database**: `bun run dev:db` (starts a local Nile database instance using Docker)
- **Production server**: `bun start` (runs `#blunt/server.tsx` in production mode with NODE_ENV=production)
- **Build for production**: `bun run build` (uses custom `#blunt/build.ts` script with CLI argument parsing)
- **Install dependencies**: `bun install`
- **Lint and format**: `bun run check:lint` (runs Biome with --write flag)
- **Type checking**: `bun run check:types` (runs TypeScript compiler without emitting files)
- **Database operations**: `bun run db` (runs Drizzle Kit with environment variables)
- **Auth code generation**: `bun run build:auth` (generates Better Auth schema files)

## Architecture Overview

This is a Bun-based React application with a unique architecture using the `#blunt/` pattern for server-side code:

### Server Architecture (`#blunt/`)
- **Entry point**: `#blunt/server.tsx` - Main server file using `Bun.serve()` with custom routes
- **HTML template**: `#blunt/index.html` - Serves as the main HTML entry point with direct `.tsx` imports
- **Frontend entry**: `#blunt/frontend.tsx` - React app initialization with DOM ready state handling
- **Build system**: `#blunt/build.ts` - Advanced build script with CLI argument parsing and HTML file scanning

### Frontend Architecture (`src/`)
- **App component**: `src/app/page.tsx` - Main login page with GitHub OAuth using Better Auth
- **Router**: `src/app/router.tsx` - React Router 7 configuration with nested routes and layouts
- **Layout**: `src/app/layout.tsx` - Root layout component with Outlet for nested routing
- **Components**: `src/components/` - Reusable React components
- **Library utilities**: `src/lib/` - Shared utility functions including auth, database, and server utilities
- **Path aliases**: `@/*` maps to `src/*` (configured in `tsconfig.json`)

### Database & Authentication Stack
- **Database**: PostgreSQL with Drizzle ORM and Drizzle Kit for migrations
- **Authentication**: Better Auth with GitHub OAuth provider and Drizzle adapter
- **Database client**: Server-side database connection with schema management
- **Auth configuration**: `src/lib/auth/config.ts` with session management and social providers

### Build System & Bundling
- **Custom build script**: `#blunt/build.ts` with magical CLI argument parser and HTML file scanning
- **Plugins**: Uses `bun-plugin-tailwind` for Tailwind CSS processing
- **Output**: Builds HTML files from `src/` directory to `dist/` with minification and source maps
- **Environment**: Supports `.env.local` files for environment variables

## Technology Stack

- **Runtime**: Bun (not Node.js) with built-in bundler and hot reload
- **Frontend**: React 19, TypeScript with strict mode
- **Routing**: React Router 7 with BrowserRouter and nested routes
- **Styling**: Tailwind CSS 4.0 with sorted classes plugin
- **Database**: PostgreSQL with Drizzle ORM (`drizzle-orm`, `drizzle-kit`)
- **Authentication**: Better Auth with GitHub OAuth and session management
- **Linting**: Biome (@biomejs/biome) 2.0 beta with import organization and sorted classes
- **Icons**: React Icons (react-icons) for UI components

## Key Patterns & Conventions

### React Router 7 Patterns
- Uses `BrowserRouter` with nested `<Route>` elements
- Layouts with `<Outlet />` for nested routing
- Path structure: `~` prefix for authenticated routes (e.g., `/~/workspaces`)

### Better Auth Integration
- Server-side auth configuration with Drizzle adapter
- Client-side auth hooks with social sign-in
- Session management with 7-day expiration and 1-day update age
- GitHub OAuth with environment variable configuration

### Biome Configuration Highlights
- Import organization with specific groups: server directives, URLs, Node/Bun, packages, local imports
- Sorted attributes and keys for consistent code formatting
- Tailwind class sorting with `clsx` and custom functions support
- Single quote preference for JavaScript/TypeScript

### Server-Side Rendering
- Custom server routes with catch-all SPA routing (`"/*": index`)
- Authentication API routes (`"/api/auth/*": handler`)
- PGLite WebAssembly serving for client-side PostgreSQL
- Development mode with HMR and console logging

## Database Operations

- **Schema location**: `./src/lib/db/schema/index.ts`
- **Migration output**: `./drizzle` directory
- **Database URL**: Uses `process.env.DATABASE_URL`
- **Dialect**: PostgreSQL with Drizzle Kit configuration

## Quality Assurance Commands

Always run these commands before committing:
- `bun run check:lint` - Lint and auto-fix code formatting
- `bun run check:types` - Ensure TypeScript types are correct

## Bun-Specific Guidelines

- Use `Bun.serve()` for server functionality with built-in route handling
- HTML files can directly import `.tsx/.jsx` files (unique to Bun)
- Environment variables auto-loaded from `.env.local` (no dotenv needed)
- Use `Bun.file()` for file operations instead of Node.js fs methods
- Built-in WebSocket and HTTP server capabilities
- Use `bunx` for package execution (equivalent to `npx`)