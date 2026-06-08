# Implementation Plan: Client Onboarding & Tax Profile

**Branch**: `002-client-onboarding-tax-profile` | **Date**: 2026-06-08 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/002-client-onboarding-tax-profile/spec.md`

## Summary

Create two complete internal (accountant/admin) pages using the approved design system:
`pages/client-onboarding.html` (an 8-step setup wizard) and `pages/client-tax-settings.html` (per-client
tax configuration). Onboarding reuses the `upload-document.html` pattern (`.stepper` indicator + numbered
`.section` blocks, `.type-grid`, `.dropzone`, `.field`/`.seg`). Tax settings reuses the `settings.html`
pattern (`.settings-layout` + `.set-nav` + `.set-main`, `.set-row`/`.switch`, `.select`, `.card`). Both
pages carry the shared sidebar/header, Saudi (VAT 15% / SAR / ZATCA) and Egypt (VAT 14% / EGP / ETA)
preset blocks shown via JS show/hide, and realistic static Arabic data. Two small UI-only helpers
(`initWizard`, `initCountryPreset`) are added to `assets/js/main.js` as progressive enhancements (all
content lives in HTML; JS only toggles visibility). Finally, the two existing Spec 001 "قريباً" entries
(sidebar + landing cards) are converted to live links across all pages, and links are added from
`clients.html` and `settings.html`; the landing scope recount becomes 17 live + 20 upcoming.

## Technical Context

**Language/Version**: HTML5, CSS3, vanilla JavaScript (ES5-style IIFE, matching existing `main.js`)
**Primary Dependencies**: Tailwind CSS 3.4 built locally (`npm run build:css`); local IBM Plex fonts. No
CDN, no framework.
**Storage**: N/A — static prototype; all data hardcoded in HTML.
**Testing**: Manual + scriptable audit (grep checks + browser pass), same approach as Spec 001.
**Target Platform**: Modern evergreen browsers; desktop-first, responsive to tablet/mobile.
**Project Type**: Static multi-page web frontend (MPA). No SPA, no backend, no JS-rendered content.
**Performance Goals**: Instant static loads; zero runtime content generation.
**Constraints**: Arabic-only RTL (`lang="ar" dir="rtl"`); reuse approved components, no redesign; do not
break/remove existing pages, sections, links, or asset paths; complete pages only (no skeletons);
country presets must stay internally consistent; JS for UI behavior only.
**Scale/Scope**: 2 new pages; sidebar updated on 17 pages (15 existing + 2 new) to convert 2 coming-soon
items to live links; `index.html` 2 cards converted + count updated; `clients.html` + `settings.html`
each gain 1 link; `main.js` gains 2 small UI helpers; `input.css` gains styles only if an existing class
cannot express a needed state, then rebuild `output.css`.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Evaluated against `.specify/memory/constitution.md` v1.0.0:

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Approved Design Is the Source of Truth | ✅ PASS | Both pages reuse existing components from `upload-document.html` and `settings.html`; no new UI style. |
| II. Local, Static, Framework-Free Stack | ✅ PASS | Pure HTML + local Tailwind; any CSS added to `input.css` then rebuilt; no CDN/framework. |
| III. JavaScript for Interaction Only — Never Content | ✅ PASS | `initWizard`/`initCountryPreset` only show/hide pre-existing HTML; all content authored in HTML. |
| IV. Arabic-First, RTL-Native | ✅ PASS | Both pages `lang="ar" dir="rtl"`, professional Arabic copy, realistic Arabic sample data. |
| V. Two Audiences, Calibrated Detail | ✅ PASS | Both are internal accountant/admin pages; client-portal navigation untouched. |
| VI. Complete Pages Only — No Skeletons | ✅ PASS | Both pages delivered fully populated; no placeholder sections. |
| VII. Preserve Existing Work | ✅ PASS | Additive: keeps clients.html modal; nav edits convert only the 2 intended coming-soon items; new JS is no-op where its hooks are absent. |

**Result**: PASS — no violations. Complexity Tracking not required.

## Project Structure

### Documentation (this feature)

```text
specs/002-client-onboarding-tax-profile/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0 — decisions & rationale
├── data-model.md        # Phase 1 — onboarding/tax entities
├── quickstart.md        # Phase 1 — build + manual verification
├── contracts/
│   └── page-contracts.md   # Structure of both pages + reused components + JS hooks + nav wiring
└── checklists/
    └── requirements.md  # Spec quality checklist
```

### Source Code (repository root)

```text
pages/client-onboarding.html      # NEW — 8-step wizard (reuses upload-document.html patterns)
pages/client-tax-settings.html    # NEW — tax config (reuses settings.html patterns)
pages/*.html (15 existing)        # EDIT sidebar: convert 2 coming-soon items → live links
index.html                        # EDIT: 2 cards → live links; footer count 17 live + 20 upcoming
pages/clients.html                # EDIT: add link/action to client-onboarding.html (keep modal)
pages/settings.html               # EDIT: add link to client-tax-settings.html (keep sections)
assets/js/main.js                 # EDIT: add initWizard() + initCountryPreset() (UI-only, guarded)
assets/css/input.css              # EDIT only if needed (e.g. wizard panel/readiness helpers); then rebuild
assets/css/output.css             # rebuilt via npm run build:css if input.css changes
```

**Structure Decision**: Reuse the two closest approved templates as structural blueprints — the upload
wizard shell for onboarding and the settings layout for tax. The shared sidebar (duplicated per page) is
edited identically across the 17 pages to convert exactly the two target coming-soon items to live links;
each new page additionally marks its own item `active`. New JS is gated on page-specific hooks
(`[data-wizard]`, `[data-country-select]`) so it is inert on all other pages.

## Complexity Tracking

> No constitution violations — section intentionally empty.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| (none)    | —          | —                                    |
