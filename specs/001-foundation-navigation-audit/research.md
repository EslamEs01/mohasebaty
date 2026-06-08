# Phase 0 Research: Foundation / Navigation / Audit

All decisions below resolve the spec's open choices. No `NEEDS CLARIFICATION` items remain.

## R1. How to represent upcoming (not-yet-built) modules without 404s or empty pages

- **Decision**: Render each upcoming module as a non-navigating element — a `<span class="sidebar-link is-soon" aria-disabled="true">` in the sidebar (NOT an `<a href>`), and a `<div class="landing-card is-soon">` (NOT an `<a>`) on `index.html`. Each carries the existing `sl-ico`/icon plus a small "قريباً" pill.
- **Rationale**: An element without an `href` cannot navigate, so there is no broken link, no 404, and no console error — satisfying FR-008/FR-013 and the constitution's "no skeleton/empty pages" and "preserve existing work" rules. It keeps the item visible and discoverable (FR-006/FR-007) while clearly communicating it is not ready.
- **Alternatives considered**:
  - *Link to a placeholder page* — rejected: violates "no empty/skeleton pages" (FR-015).
  - *`<a href="#">`* — rejected: still focusable/clickable as a link, can jump the scroll, and reads as a working link.
  - *Hide upcoming items until built* — rejected: the explicit goal is to make the full scope visible now (US2/US3).

## R2. Where to place the new groups (portal routing)

- **Decision**: Append all seven new groups (and their 22 items) to the internal sidebar only, after the existing `إدارة` group. The client-portal group (`لوحات العميل`) is left exactly as-is.
- **Rationale**: Every upcoming module is an accountant/admin concern (setup, taxes, import, accounting ops, banks, review/approval, system). Constitution Principle V requires the client portal to stay simple and non-technical. `client-onboarding`, `client-tax-settings`, and `client-reports` are accountant-side management of client data, not client-facing screens.
- **Alternatives considered**: Splitting some items into the client sidebar — rejected as it would leak internal complexity into the client experience.

## R3. Group → module mapping

- **Decision**: Use the mapping fixed in spec FR-007:
  - الإعداد والتهيئة → client-onboarding, opening-balances, fiscal-periods, document-categories
  - الضرائب → client-tax-settings, vat-report, tax-documents
  - استيراد البيانات → data-import, import-mapping, import-preview, import-history, import-errors, import-templates
  - العمليات المحاسبية → vendors, commercial-customers, client-reports
  - البنوك → bank-accounts, bank-statement-import, bank-reconciliation
  - المراجعة والاعتماد → approval-workflow, audit-log
  - النظام → notifications
- **Rationale**: Mapping follows the module names and the seven provided Arabic group labels; balances group sizes and matches the pre-backend roadmap order in the constitution.
- **Alternatives considered**: A dedicated "master data" group for vendors/customers/banks — rejected because only the seven provided labels may be used; `العمليات المحاسبية` and `البنوك` absorb those items naturally.

## R4. Managing the duplicated sidebar across 15 pages

- **Decision**: Treat the nav block in `contracts/navigation-contract.md` as the single canonical source and apply it identically to all 15 pages, changing only which existing link carries `active`/`aria-current="page"`. Verify byte-identical group/label/order across pages after editing.
- **Rationale**: The project has no server-side or JS includes (by rule), so consistency must be enforced by applying the same markup everywhere. A canonical contract prevents drift (FR-009, SC-003).
- **Alternatives considered**:
  - *Introduce JS/templating to inject the sidebar* — rejected: violates Principle III (no JS-rendered content).
  - *Build-time HTML partials/includes* — rejected: would add a build framework beyond local Tailwind (Principle II) and change the static MPA model.

## R5. Whether a new CSS utility is needed (and where)

- **Decision**: Add one small component block to `assets/css/input.css` (Tailwind `@layer components`): `.sidebar-link.is-soon` (dimmed, `cursor: default`, no hover lift) and a compact `.sl-soon` pill for the "قريباً" label; analogously a `.landing-card.is-soon` dim modifier. Reuse existing theme tokens (`ink.4`, `bg.2`, `line`, `slate`). Then rebuild `output.css` via `npm run build:css`.
- **Rationale**: No existing class expresses a disabled/coming-soon sidebar item, so FR-016 permits a minimal addition. Building on existing tokens keeps it within the approved visual language (Principle I) and local stack (Principle II).
- **Alternatives considered**:
  - *Reuse `.chip.slate` only, inline-dim with utilities* — partially viable, but a named modifier keeps markup clean and consistent across 22 items × multiple pages.
  - *Inline `style="..."`* — rejected: rule forbids scattered inline styles.

## R6. Audit method and pass/fail criteria

- **Decision**: Manual, repeatable audit of all 16 entry points using a fixed checklist: (a) `lang="ar" dir="rtl"` present; (b) `output.css` + `main.js` resolve via correct relative path; (c) no CDN/framework/external template references; (d) all internal links resolve to existing files; (e) correct single active state; (f) consistent sidebar/header; (g) no console errors. Static checks (a–d) are also scriptable via grep over the repo to make them fast and objective.
- **Rationale**: No automated test framework exists or is warranted for a static prototype; a documented checklist + grep gives objective, reproducible pass/fail (FR-001–FR-004, SC-001/SC-002).
- **Alternatives considered**: Adding a headless-browser test harness — rejected: adds tooling/dependencies disproportionate to a static prototype and outside the frontend-only scope.

## R7. `index.html` scope representation and counts

- **Decision**: Keep the existing four screen sections unchanged and append an "upcoming modules" area grouped to match the seven sidebar groups, each item a `landing-card is-soon` with a "قريباً" pill. Update the footer scope text from "15 شاشة" to reflect 15 live + 22 upcoming (37 total).
- **Rationale**: Communicates the full roadmap (US3, FR-012–FR-014, SC-006) while preserving the approved landing layout.
- **Alternatives considered**: Rewriting the landing grid — rejected: would redesign approved content (Principle I).
