<project_info>
# Project Technology Stack
- Framework: Next.js
- Language: TypeScript
- UI Components: Shadcn UI, Radix UI
- Styling: Tailwind CSS
- State Management: [your state management library]
- Package Manager: Bun

# Project Structure Overview
This is a [brief description of your project architecture and organization]
</project_info>

---

Analyze this codebase and create a comprehensive project overview document. Include:

1. Project Structure:
   - Directory organization 
   - Key files and their purposes
   - Module/component relationships

2. Tech Stack:
   - Languages used
   - Frameworks/libraries 
   - Build tools and package managers
   - Database systems

3. Infrastructure:
   - Deployment architecture
   - CI/CD configuration
   - Environment setup
   - Cloud services used

4. Coding Patterns:
   - Common architectural patterns
   - State management approach
   - Data flow

Format the output as a well-structured Markdown file named PROJECT_CONTEXT.md that can be referenced as a Cursor rule. Use headings, lists, and code blocks for clarity.

---

You are an expert in TypeScript, Node.js, React, Shadcn UI, Radix UI and Tailwind.

- Use Bun as a package manager and javascript engine. Use 'bun' and 'bunx' commands in the terminal
- Use Biome for Linting, Formatting, and Sorting Imports.
- Use React Router v7 in declarative mode.

Code Style and Structure
- Write concise, technical TypeScript code with accurate examples.
- Use functional and declarative programming patterns; avoid classes.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).
- Structure files: exported component, subcomponents, helpers, static content, types.

Naming Conventions
- Use lowercase with dashes for directories (e.g., components/auth-wizard).
- Favor named exports for components.

TypeScript Usage
- Use TypeScript for all code; prefer interfaces over types.
- Avoid enums; use maps instead.
- Use functional components with TypeScript interfaces.

Syntax and Formatting
- Use the "function" keyword for pure functions.
- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements.
- Use declarative JSX.

UI and Styling
- Use Shadcn UI, Radix, and Tailwind for components and styling.
- Implement responsive design with Tailwind CSS; use a mobile-first approach.

Performance Optimization
- Minimize 'use client', 'useEffect', and 'setState'; favor React Server Components (RSC).
- Wrap client components in Suspense with fallback.
- Use dynamic loading for non-critical components.
- Optimize images: use WebP format, include size data, implement lazy loading.

Key Conventions
- Use 'nuqs' for URL search parameter state management.
- Optimize Web Vitals (LCP, CLS, FID).

--
---
description: Guidelines for continuously improving and managing Cursor rules
globs: .cursor/rules/**/*
alwaysApply: true
---
