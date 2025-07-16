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


## Baby Steps
---
1. Create a workspace on the multitenant system. The project can contain multiple people with RBAC. Sync permissions with GitHub. ADD PEOPLE.
2. Connect to GitHub (via App)
2. Task Management can happen on GitHub Projects / Devika / Linear. SELECT TASK STORAGE.
3. Select your IDE (for opening the code editor).
4. Create a Workspace.
5. Integrate with WakeTime API and ccusage and Cursor Analytics and gemini analytics

clause # use shadcn/ui components and motion.dev library for animations.

https://kiro.dev/blog/introducing-kiro/

https://repost.aws/articles/AROjWKtr5RTjy6T2HbFJD_Mw/%F0%9F%91%BB-kiro-agentic-ai-ide-beyond-a-coding-assistant-full-stack-software-development-with-spec-driven-ai

https://www.reddit.com/r/ClaudeAI/comments/1lwjebe/v2_release_claude_code_development_kit_now_with/

https://github.com/davidkimai/Context-Engineering

https://bearclaude.specstory.com/
