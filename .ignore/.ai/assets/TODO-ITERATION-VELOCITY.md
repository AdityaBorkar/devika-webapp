I want to make a dashboard to track the progress of the team. The team currently consists of a solo developer assisted by AI.

The dashboard should be able to track the following metrics:

- Time spent by Autonomous AI Agents
- Time spent by Human Developers
- Daily AI-generated code (Suggested v/s. Accepted) (Lines of Code)
- Daily Manual Written Code (Lines of Code)
- PR Cycle Time (Time from starting a PR to deploying it)
    - Add bifurcation for each stages
- PR Size (LoC)
- Deployments
- AI Prompts
- Tasks Started, Completed
- Code Churn

Add two filters to all metrics:
- Time Period: Last 30 Days (default), Last 15 days, Last 7 days, Custom
- Repository: All Repositories (default), Specific Repository

---

My current tech stack and tools include:
- GitHub
- Cursor
- VS Code

- Coderabbit
- Wakatime
- GitHub Actions
