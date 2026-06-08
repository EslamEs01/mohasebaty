---
description: "Task list for Foundation / Navigation / Audit"
---

# Tasks: Foundation / Navigation / Audit

**Input**: Design documents from `specs/001-foundation-navigation-audit/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/navigation-contract.md, quickstart.md

**Tests**: Not requested in the spec. This is a static frontend prototype; verification is the
documented manual + scriptable **audit** (see `quickstart.md` §3–§5), not an automated test framework.
No TDD/unit-test tasks are generated.

**Organization**: Tasks are grouped by user story. US1 (baseline audit) is read-only and independent of
the CSS foundation; US2 and US3 both depend on the shared CSS foundation and are independent of each other.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: US1 / US2 / US3 (Setup, Foundational, and Polish tasks carry no story label)
- Exact file paths are included in every task

## Path Conventions

Static multi-page frontend at repository root: `index.html`, `pages/*.html`, `assets/css/input.css`,
`assets/css/output.css`, `assets/js/main.js` (unchanged). No `src/` or `tests/` trees.

---

## Phase 1: Setup (Shared Infrastructure) ✅

**Purpose**: Confirm the local, offline toolchain works (no CDN, no network dependency).

- [x] T001 Verify local toolchain at repo root: ensure `node_modules/` is present (run `npm install` only if missing), then confirm `npm run build:css` produces `assets/css/output.css` and `npm run serve` serves the site locally; record any issue. No new dependencies may be added.

**Checkpoint**: Build + serve work locally and offline.

---

## Phase 2: Foundational (Blocking Prerequisites for US2 & US3) ✅

**Purpose**: Add the single shared "coming soon" style used by both the sidebar (US2) and the landing
cards (US3). US1 does NOT depend on this phase.

**⚠️ CRITICAL**: US2 and US3 must not begin until T003 is complete.

- [x] T002 Add the component styles `.sidebar-link.is-soon`, `.sidebar-link.is-soon:hover`, `.sidebar-link.is-soon .sl-ico`, `.sl-soon`, and `.landing-card.is-soon` to `assets/css/input.css` inside `@layer components`, exactly per `specs/001-foundation-navigation-audit/contracts/navigation-contract.md` §C5/§C6, reusing existing theme tokens only (no new colors, no inline styles).
- [x] T003 Rebuild the stylesheet by running `npm run build:css` at repo root and confirm `assets/css/output.css` now contains `.is-soon` and `.sl-soon` rules (e.g. `grep -c 'is-soon' assets/css/output.css`).

**Checkpoint**: Coming-soon styles exist in the compiled CSS; navigation and landing work can begin.

---

## Phase 3: User Story 1 - Baseline audit confirms all current pages work (Priority: P1) 🎯 MVP ✅

**Goal**: Establish a documented known-good baseline that all 16 entry points open correctly in Arabic
RTL with working local assets and no broken internal links.

**Independent Test**: Open `index.html` + the 15 `pages/*.html` and confirm each loads with correct RTL,
working `output.css`/`main.js`, consistent header/sidebar, correct single active state, no console
errors, and no broken internal links. (Independent of Phase 2 — may be run first to capture the
pre-change baseline.)

- [x] T004 [P] [US1] Audit Arabic RTL declaration across all 16 entry points: `grep -L 'lang="ar" dir="rtl"' index.html pages/*.html` (expect no output); record results per `quickstart.md` §3a.
- [x] T005 [P] [US1] Audit asset paths for the 15 pages: `grep -L '../assets/css/output.css' pages/*.html` and `grep -L '../assets/js/main.js' pages/*.html` (expect no output), and confirm `index.html` uses `assets/css/output.css` + `assets/js/main.js`; per `quickstart.md` §3b.
- [x] T006 [P] [US1] Audit for forbidden dependencies across `index.html` + `pages/*.html`: `grep -rniE 'cdn|bootstrap|react|vue|angular|next|unpkg|jsdelivr|googleapis'` (expect no output); per `quickstart.md` §3c.
- [x] T007 [P] [US1] Audit internal links: extract every `href` in the 16 entry points and confirm each resolves to an existing file (no broken links); note any miss.
- [x] T008 [P] [US1] Audit active state: confirm each of the 15 `pages/*.html` has exactly one `sidebar-link active` (`for f in pages/*.html; do grep -c 'sidebar-link active' "$f"; done` → all = 1); per `quickstart.md` §3e.
- [x] T009 [US1] Manual browser pass of all 16 entry points (console clean, RTL render, consistent header/sidebar) and compile a per-page **Audit Result** table (pass/fail + defects) per `data-model.md` §Audit Result, saved to `specs/001-foundation-navigation-audit/audit-results.md`. (Depends on T004–T008.)

**Checkpoint**: Baseline documented; SC-001/SC-002 verifiable for the pre-change state.

---

## Phase 4: User Story 2 - Navigation prepared for the 22 upcoming modules (Priority: P1) ✅

**Goal**: The internal sidebar shows the 3 existing groups plus 7 new groups containing all 22 upcoming
modules as non-navigating "قريباً" items, identical across all 15 pages, with no existing link or active
state changed.

**Independent Test**: On any page, the sidebar shows 10 groups; every upcoming item shows a "قريباً"
pill and does not navigate; existing links and the page's active state still work.

**Depends on**: Phase 2 (T003).

- [x] T010 [US2] Author the canonical nav block (the 7 `sidebar-section-label` groups + 22 coming-soon `<span class="sidebar-link is-soon" aria-disabled="true">` items with a 16×16 inline SVG in `.sl-ico`, an Arabic label, and a `<span class="sl-soon">قريباً</span>`) using the labels/mapping in `data-model.md` and the exact shapes in `contracts/navigation-contract.md` §C3/§C4. Capture the finished snippet in `specs/001-foundation-navigation-audit/contracts/navigation-contract.md` (replace the `<!-- … -->` placeholders with the real items) so all 15 insertions are byte-identical.
- [x] T011 [P] [US2] Insert the canonical nav block into `pages/client-dashboard.html` immediately after the `إدارة` group's `settings.html` link and immediately before `<div class="sidebar-foot">`; do not touch the existing `لوحات العميل` group or this page's active link.
- [x] T012 [P] [US2] Insert the canonical nav block into `pages/upload-document.html` (same placement and rules as T011).
- [x] T013 [P] [US2] Insert the canonical nav block into `pages/client-documents.html` (same placement and rules).
- [x] T014 [P] [US2] Insert the canonical nav block into `pages/client-document-details.html` (same placement and rules).
- [x] T015 [P] [US2] Insert the canonical nav block into `pages/messages.html` (same placement and rules).
- [x] T016 [P] [US2] Insert the canonical nav block into `pages/accountant-inbox.html` (same placement and rules).
- [x] T017 [P] [US2] Insert the canonical nav block into `pages/document-review.html` (same placement and rules).
- [x] T018 [P] [US2] Insert the canonical nav block into `pages/client-profile.html` (same placement and rules).
- [x] T019 [P] [US2] Insert the canonical nav block into `pages/admin-financial-dashboard.html` (same placement and rules).
- [x] T020 [P] [US2] Insert the canonical nav block into `pages/clients.html` (same placement and rules).
- [x] T021 [P] [US2] Insert the canonical nav block into `pages/chart-of-accounts.html` (same placement and rules).
- [x] T022 [P] [US2] Insert the canonical nav block into `pages/journal-entries.html` (same placement and rules).
- [x] T023 [P] [US2] Insert the canonical nav block into `pages/reports.html` (same placement and rules).
- [x] T024 [P] [US2] Insert the canonical nav block into `pages/users-permissions.html` (same placement and rules).
- [x] T025 [P] [US2] Insert the canonical nav block into `pages/settings.html` (same placement and rules).
- [x] T026 [US2] Verify cross-page consistency after insertion: the 7 new group labels each appear in all 15 pages (`for g in "الإعداد والتهيئة" "الضرائب" "استيراد البيانات" "العمليات المحاسبية" "البنوك" "المراجعة والاعتماد" "النظام"; do grep -l "$g" pages/*.html | wc -l; done` → 15 each); no coming-soon item is a link or active (`grep -n 'is-soon' pages/*.html | grep '<a '` and `grep -n 'sidebar-link is-soon active' pages/*.html` → no output); each page still has exactly one active link; inserted region is identical across pages. (Depends on T010–T025.)

**Checkpoint**: SC-003, SC-004, SC-008 satisfied; navigation ready with no broken links.

---

## Phase 5: User Story 3 - index.html communicates the complete product scope (Priority: P2) ✅

**Goal**: The landing page shows the existing screens plus the 22 upcoming modules grouped to match the
sidebar, each marked "قريباً" and non-linking, with an accurate scope count.

**Independent Test**: Open `index.html`; existing sections are intact; an upcoming-modules area lists 22
cards in 7 groups marked "قريباً" that do not navigate; the footer scope reflects 15 + 22.

**Depends on**: Phase 2 (T003). Independent of US2.

- [x] T027 [US3] In `index.html`, append an "الوحدات القادمة" area after the existing System section: 7 sub-sections matching the new group labels, each containing `landing-card is-soon` cards (a `<div>`, NOT an `<a>`; no `href`) with icon, Arabic title/description, and a `<span class="chip slate">قريباً</span>`, covering all 22 modules per `data-model.md`. Do not alter the existing 4 screen sections. Follow `contracts/navigation-contract.md` §C6.
- [x] T028 [US3] In `index.html`, update the footer scope text (currently `... · 15 شاشة`) to reflect 15 live + 22 upcoming (37 total) and confirm the displayed count matches the cards rendered (SC-006).

**Checkpoint**: SC-006 satisfied; full product scope visible on the landing page.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final full-project QA after all changes (constitution Quality Gates).

- [x] T029 [P] Re-run the full static audit suite from `quickstart.md` §3 across all entry points after changes (RTL, asset paths, no-CDN, no soon-as-link, single active, 7 groups ×15); all expectations clean. Update `specs/001-foundation-navigation-audit/audit-results.md`.
- [ ] T030 [P] Manual responsive QA at mobile width on a client page, an internal page, and `index.html`: the expanded sidebar opens/closes via the existing `.mobile-nav-toggle` and scrolls without clipping; coming-soon items do not navigate; landing cards stack cleanly; no console errors.
- [x] T031 Final Definition-of-Done check per `quickstart.md` §"Done": run `npm run build:css` once more, confirm `assets/css/output.css` is rebuilt and staged, and confirm all acceptance criteria (SC-001…SC-008) hold.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: no dependencies.
- **Foundational (Phase 2)**: depends on T001. Blocks US2 and US3 (NOT US1).
- **US1 (Phase 3)**: depends on T001 only — independent of Phase 2; may run first to capture the pre-change baseline.
- **US2 (Phase 4)**: depends on Phase 2 (T003).
- **US3 (Phase 5)**: depends on Phase 2 (T003); independent of US2.
- **Polish (Phase 6)**: depends on US1, US2, and US3 being complete.

### User Story Dependencies

- **US1 (P1)**: standalone read-only audit. No dependency on other stories.
- **US2 (P1)**: needs the shared CSS (Phase 2). No dependency on US1 or US3.
- **US3 (P2)**: needs the shared CSS (Phase 2). No dependency on US1 or US2.

### Within Each Story

- US2: author canonical block (T010) → insert into 15 files (T011–T025, parallel) → consistency verify (T026).
- US3: add cards (T027) → update count (T028).

### Parallel Opportunities

- US1 static checks T004–T008 run in parallel (read-only, independent checks).
- US2 insertions T011–T025 run in parallel (15 different files).
- After Phase 2, US2 and US3 can proceed in parallel.
- Polish T029 and T030 run in parallel.

---

## Parallel Example: User Story 2

```bash
# After T010 (canonical block authored), insert into all 15 pages in parallel:
Task: "Insert canonical nav block into pages/client-dashboard.html"
Task: "Insert canonical nav block into pages/accountant-inbox.html"
Task: "Insert canonical nav block into pages/admin-financial-dashboard.html"
# ... through all 15 pages/*.html (T011–T025)
```

---

## Implementation Strategy

### MVP First

1. Phase 1 (Setup) → Phase 3 (US1 baseline audit). Delivers a documented known-good baseline — valuable on its own.

### Incremental Delivery

1. Setup → US1 baseline audit (capture pre-change state).
2. Foundational CSS (Phase 2) → US2 navigation (the core deliverable: nav ready, no broken links).
3. US3 landing scope (full roadmap visible).
4. Polish: full-project QA + final CSS rebuild.

### Notes

- [P] tasks = different files, no dependencies.
- No new HTML pages are created (FR-015): upcoming modules exist only as coming-soon nav/landing entries.
- `assets/js/main.js` is not modified.
- Rebuild `assets/css/output.css` whenever `input.css` changes; it is committed for GitHub Pages.
