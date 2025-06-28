## BUN BUGS - The following bugs in bun are blocking us:
---
1. Failure to import.meta.env in client.
    - Possibily failing Pglite.
    - Possibily failing @/lib/auth/client.ts
    - https://github.com/oven-sh/bun/issues/20071
2. Framework API is coming soon.


## hooop-actions
---
- separate package for github actions
- replace lint-staged & husky with biome & github-actions trigger (that saves formatting and outputs errors)
- Write a SCRIPT to stash&merge using AI and deploy to PROD. Ask AI to generate a PR for Preview Deployment. (Using Hooop.cloud)
- support copilot / code-rabbit / cursor bugbot / claude agents / gemini agents
- separate dashboard
- slack integration


## t3-env
---
1. Add Client-Side Environment Support
    - Add client section for public environment variables
    - Add clientPrefix configuration for client-safe vars
    - Enable client-side access to non-sensitive config (like API endpoints)
2. Enhance Environment Schema
    - Add more comprehensive validation rules
    - Add optional environment variables with defaults
    - Improve error messages for validation failures
3. Add Development Enhancements
    - Add .env.example file for documentation
    - Add environment variable documentation
    - Ensure proper TypeScript integration
4. Optional: Runtime Environment Detection
    - Add better runtime environment detection
    - Add environment-specific configurations
    - Improve build-time vs runtime environment handling
5. https://env.t3.gg/docs/core#validate-schema-on-build-(recommended)


## bluntjs
---
- Make a codemod for Next -> Blunt migration.
- Make a MIGRATION-NEXT-TO-BLUNT.md for the migration notes for AI to make certain changes.
- Make a codemod for Blunt -> Next migration.
- Make a MIGRATION-BLUNT-TO-NEXT.md for the migration notes for AI to make certain changes.
- Support for (https:)//localhost.devika.com and (https:)//devika.localhost:3000


## Baby Steps
---
1. Create a workspace on the multitenant system. The project can contain multiple people with RBAC. Sync permissions with GitHub. ADD PEOPLE.
2. Connect to GitHub (via App)
2. Task Management can happen on GitHub Projects / Devika / Linear. SELECT TASK STORAGE.
3. Select your IDE (for opening the code editor).
4. Create a Workspace.
