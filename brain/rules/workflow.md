# Development workflow

## Git branch policy

Protected **deployment branches** — pushing here usually triggers CI/CD. Do not commit or push directly unless a human explicitly approves and understands pipelines may run.

### Protected deployment branches

| Branch | Purpose | Direct commit/push |
| --- | --- | --- |
| `main` | Production CI/CD | no |
| `master` | Production CI/CD (legacy name) | no |
| `dev` | Test / staging CI/CD | no |
| `develop` | Test / staging CI/CD (legacy name) | no |
| `staging` | Staging environment CI/CD | no |
| `production` | Production environment CI/CD | no |

**Typical layouts:** `main` + `dev` only; or `production` + `develop`; or `main` + `staging` + `production`. Keep the table aligned with your remotes and CI config.

### Workflow

- Use feature branches for normal work (`feature/…`, `fix/…`, `docs/…`, `test/…`).
- Merge through PR/MR unless explicitly approved for direct push.
- **kenmark-commit** reads this section first; branches listed here override skill defaults.

### Explicit override

Direct commit/push to a protected branch only when the user explicitly says so (e.g. "commit directly to dev") and accepts that CI/CD may run.

## Planning

- Multi-file or ambiguous tasks: outline steps briefly before large edits (todo list optional — do not over-plan simple fixes).

## Scope

- Change only what the task requires; ask before expanding scope.
- When fixing one area, do not rewrite adjacent modules unless broken or requested.

## Local dev

- Before starting a dev server, check if one is already running and reuse it.
- On port conflict, stop the existing process on that port rather than spawning endless new ports.
- Default dev URL: `localhost:4321` (Astro).

## KB update requirement

For every meaningful change:

1. Identify impacted KB areas: feature behavior, route/page/component, API/integration, database/schema, auth/permissions, workflow/business logic, deployment/config, testing/quality.
2. Update existing KB files when the concept already exists.
3. Create a new feature file under `brain/kb/features/` when the feature is new.
4. Add a short entry to `brain/CHANGELOG.md`.
5. In the final response, mention: code files changed, KB files changed, tests/checks run.
