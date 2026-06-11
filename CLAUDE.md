Before executing any task in this project, ALWAYS read and follow, in this order:
1. `.specify/memory/constitution.md` — the supreme, non-negotiable project constitution.
2. `CLAUDE_FRONTEND_RULES.md` — the detailed frontend execution rules.

These rules override any casual instruction unless I explicitly say otherwise. Where the
constitution and any other file conflict, the stricter constraint wins. Non-negotiables:
local static HTML/CSS/Tailwind only (no CDN, Bootstrap, or React/Vue/Angular/Next); JS for
UI interaction only (never page content); Arabic-only and RTL-first with `lang="ar"
dir="rtl"`; do not redesign the approved style; do not break or remove existing pages or
sections; never ship skeleton or placeholder pages — every page must be complete, linked,
responsive, and consistent with the 15 approved pages.

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan:
`specs/009-categories-approval-workflow/plan.md`
(see also its `research.md`, `data-model.md`, `contracts/page-contracts.md`, and `quickstart.md`).
Prior features: `specs/008-vat-tax-documents/spec.md`, `specs/007-bank-statement-reconciliation/plan.md`, `specs/006-vendors-customers-banks/plan.md`, `specs/005-opening-balances-fiscal-periods/plan.md`, `specs/004-data-import-module/plan.md`, `specs/003-data-import-module/plan.md`, `specs/002-client-onboarding-tax-profile/plan.md`.
<!-- SPECKIT END -->
