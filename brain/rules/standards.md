# Project standards

Universal rules for this repo. Stack, workflow, testing, UI, and deploy details live in sibling files under `brain/rules/`.

## Scope and quality

- Prefer the smallest correct change; do not refactor unrelated code.
- In code you touch: complete behavior, real data shapes, and sensible error handling — not mocks, TODO stubs, or placeholder APIs unless the user asked for a spike.
- Read surrounding code before editing; match naming, types, and patterns already in the repo.

## Project layout

- Never delete the `brain/` folder — project knowledge base.
- Use `temp/` for scratch scripts and downloads (gitignored).
- Update `brain/` and `brain/CHANGELOG.md` after meaningful changes; version changelog entries.

## Brain KB maintenance

- The project knowledge base lives under `brain/kb/` (numbered `00`–`11`, plus `features/` and `decisions/`).
- Before starting a non-trivial task, read the relevant KB files.
- After every meaningful feature, bug fix, refactor, workflow change, API change, DB change, UI change, or deployment/config change, update the relevant KB file.
- If the change adds a new feature, create or update `brain/kb/features/NNN-feature-name.md` and link it from `brain/kb/07-features.md`.
- If the change affects architecture, data model, auth, API, UI routes, deployment, or testing, update the matching numbered KB file.
- Update `brain/CHANGELOG.md` with what changed in the KB.
- **Code and KB move together** — undocumented feature changes are incomplete work.
- If unsure which file to update, update `brain/kb/07-features.md` and add a TODO under "Documentation gaps."

## Packages and docs

- Node.js: this repo uses **npm** (`package-lock.json`); do not switch package managers without explicit approval.
- Node engine: `>=22.12.0` per `package.json`.
- For unfamiliar APIs in this codebase, read project docs and source first; use external docs only when needed.

## Safety on changed code

- On files you modify: watch for null/undefined access, missing error handling, injection/XSS in user-facing paths, and leaked secrets in commits.
- Do not run broad "audit entire codebase" passes unless the user requests it.
