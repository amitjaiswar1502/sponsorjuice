# Auth and Permissions

Last updated: 2026-07-12
Status: reviewed

## Confirmed facts

- **No authentication system** — no login, sessions, OAuth, or role-based access.
- Site is fully public; calculator and blog require no account.
- User data (calculation history) stays in browser localStorage only; not uploaded to a server per privacy claims in schema and `llms.txt`.
- No middleware or protected routes found.

## Important files inspected

- `src/lib/localStorage.ts` — client-only persistence
- `src/pages/privacy.astro` — privacy policy page (not fully read at init)
- `public/llms.txt` — states no server upload of metrics

## Assumptions

- Privacy policy page describes AdSense and local storage practices.

## Unknowns / documentation gaps

- Full text of privacy policy and cookie/consent behavior for AdSense (GDPR/CCPA).

## Maintenance notes

- If auth is ever added, replace this file entirely and update `04`/`05`/`08` KB files.
