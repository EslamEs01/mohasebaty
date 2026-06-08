---
description: "Task list for Client Onboarding & Tax Profile"
---

# Tasks: Client Onboarding & Tax Profile

**Input**: Design documents from `specs/002-client-onboarding-tax-profile/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/page-contracts.md, quickstart.md

**Tests**: Not requested in the spec. Verification is the documented manual + scriptable **audit**
(see `quickstart.md` §3–§5). No TDD/unit-test tasks are generated.

**Organization**: Tasks are grouped by user story. US1 (onboarding page) and US2 (tax page) build separate
new files and can run in parallel after the shared JS foundation; US3 wires navigation across existing
pages and depends on the two pages existing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: US1 / US2 / US3 (Setup, Foundational, Polish carry no story label)
- Exact file paths are included in every task

## Path Conventions

Static multi-page frontend at repository root: `index.html`, `pages/*.html`, `assets/css/input.css`,
`assets/css/output.css`, `assets/js/main.js`. No `src/` or `tests/` trees.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Capture the approved patterns to reuse so both new pages match the design system exactly.

- [x] T001 Capture the canonical internal page shell + reusable component snippets for reuse: the `.app`/shell wrapper, full shared sidebar, and `.header` from `pages/settings.html`; the `.stepper`/`.step`/`.stepper-flex`/`.ln`, `.section`/`.section-head`/`.stamp`, `.type-grid`/`.type-card`, `.dropzone`/`.file-card`, and `.fields-grid`/`.field`/`.input`/`.input-wrap`/`.seg` from `pages/upload-document.html`; and `.settings-layout`/`.set-nav`/`.set-main`/`.set-row`/`.info`/`.ctrl`/`.switch`/`.track`/`.select-wrap`/`.select`/`.chev`/`.tip`/`.chip` from `pages/settings.html`. Record reference line ranges (read-only; no file changes).

**Checkpoint**: Reuse sources identified; building can begin without inventing new components.

---

## Phase 2: Foundational (Blocking Prerequisites for US1 & US2)

**Purpose**: Add the two shared UI-only helpers used by the wizard (US1) and the country presets (US1+US2).
US3 does NOT depend on this phase.

**⚠️ CRITICAL**: US1 and US2 verification cannot pass until T004 is complete.

- [x] T002 Add `initWizard()` to `assets/js/main.js`: guard on `[data-wizard]` (return if absent); on boot show the active `.wizard-panel` and add native `hidden` to the others; wire `[data-wizard-prev]`/`[data-wizard-next]` and clickable `.step[data-step]` to change the active index and update `.step.active`. Must only toggle `hidden`/classes — never inject content.
- [x] T003 Add `initCountryPreset()` to `assets/js/main.js`: for each `[data-country-select]`, on button click set `.active` on the chosen `[data-country]` button and show the matching `[data-country-block]` while hiding the others via the native `hidden` attribute. Never inject content.
- [x] T004 Register `initWizard()` and `initCountryPreset()` in `boot()` in `assets/js/main.js`; confirm they are no-ops on the existing 15 pages (open any existing page → no console errors, behavior unchanged).

**Checkpoint**: Wizard + country-preset interactions available; both helpers inert where their hooks are absent.

---

## Phase 3: User Story 1 - Onboard a new client through the wizard (Priority: P1) 🎯 MVP

**Goal**: A complete 8-step onboarding wizard at `pages/client-onboarding.html` with all specified Arabic
fields, country-driven tax preview, COA options, initial-file uploads, and a final review.

**Independent Test**: Open `pages/client-onboarding.html`; all 8 steps present and navigable; each step
shows its fields; السعودية/مصر switches the tax preview; COA options, uploads, and review render; header
actions present; no console errors; JS-off shows all panels stacked.

**Depends on**: Phase 2 (T004) for wizard + country preset behavior.

- [x] T005 [US1] Create `pages/client-onboarding.html` with the internal page shell (head linking `../assets/css/output.css`; `.app` wrapper; full shared sidebar; `.header` with `.mobile-nav-toggle`, crumb, `.page-title`; `../assets/js/main.js`). In this page's sidebar, render تهيئة عميل جديد and إعدادات ضريبة العميل as live `<a>` links (no `is-soon`/`.sl-soon`) and mark تهيئة عميل جديد as `active` + `aria-current="page"` (exactly one active item).
- [x] T006 [US1] In `pages/client-onboarding.html`, add the header content: `.page-title` إعداد عميل جديد + subtitle "جهّز بيانات العميل، الضريبة، شجرة الحسابات، والملفات الأولية قبل بدء العمل", and the three actions حفظ كمسودة (`.btn-outline`), إنشاء العميل (`.btn-primary`), رجوع إلى العملاء (`href="clients.html"`).
- [x] T007 [US1] In `pages/client-onboarding.html`, add the `.stepper` (with `data-wizard`) containing the 8 steps in order with `data-step` 1–8: بيانات الشركة، بيانات التواصل، الدولة والعملة، إعدادات الضريبة، المحاسب المسؤول، شجرة الحسابات، الملفات الأولية، مراجعة نهائية; first step `active`.
- [x] T008 [US1] In `pages/client-onboarding.html`, add 8 `.wizard-panel` blocks (visible by default, `data-panel` 1–8) each with `.section`/`.section-head`/`.stamp`; populate steps 1–3 (بيانات الشركة، بيانات التواصل، الدولة والعملة) using `.fields-grid`/`.field`/`.input`/`.select-wrap`/`.seg` with realistic Arabic sample data per `data-model.md`.
- [x] T009 [US1] In `pages/client-onboarding.html`, populate step 4 (إعدادات الضريبة) with the country preset control + blocks: `<div class="seg" data-country-select>` (السعودية active / مصر) and `data-country-block="sa"` (visible: VAT 15% · SAR · ZATCA Ready · QR/e-invoice) + `data-country-block="eg"` (`hidden`: VAT 14% · EGP · ETA Ready · UUID/e-signature), using `.chip` pills.
- [x] T010 [US1] In `pages/client-onboarding.html`, populate steps 5–8: المحاسب المسؤول (selects + "هل يحتاج اعتماد قبل الترحيل؟" `.seg`), شجرة الحسابات (`.type-grid` with 4 `.type-card`: استخدام شجرة افتراضية/نسخ من عميل مشابه/رفع شجرة حسابات/إعداد لاحقًا), الملفات الأولية (5 `.dropzone` with unique `data-zone-id` + a ملاحظات `textarea`), مراجعة نهائية (read-only summary card); append `.wizard-nav` with `[data-wizard-prev]` السابق and `[data-wizard-next]` التالي buttons.
- [x] T011 [US1] Verify `pages/client-onboarding.html` per `quickstart.md`: `lang="ar" dir="rtl"`, correct relative asset paths, exactly one `sidebar-link active`, no `.wizard-panel[hidden]` in source, 2 `data-country-block`, stepper switches panels and country toggle swaps the preset, no console errors.

**Checkpoint**: Onboarding wizard complete and independently demoable.

---

## Phase 4: User Story 2 - Configure a client's tax profile (Priority: P1)

**Goal**: A complete per-client tax settings page at `pages/client-tax-settings.html` with identity, VAT
config, period, country readiness, client-display toggles, and the warning note.

**Independent Test**: Open `pages/client-tax-settings.html`; client selector + Save present; all sections
render with realistic data; السعودية/مصر swaps the readiness preset; warning note visible; no console errors.

**Depends on**: Phase 2 (T004) for country preset behavior. Independent of US1.

- [x] T012 [P] [US2] Create `pages/client-tax-settings.html` with the internal page shell (same shell rules as T005). In this page's sidebar, render the two target items as live `<a>` links and mark إعدادات ضريبة العميل as `active` + `aria-current="page"` (exactly one active item).
- [x] T013 [US2] In `pages/client-tax-settings.html`, add the header: `.page-title` إعدادات الضريبة للعميل + subtitle "إعداد الدولة، الرقم الضريبي، نسبة الضريبة، وفترة الإقرار لكل عميل", a client selector (`.select-wrap`/`.select` with realistic sample clients, one selected), and a حفظ `.btn-primary`.
- [x] T014 [US2] In `pages/client-tax-settings.html`, add the `.settings-layout` with `.set-nav` anchors (الهوية الضريبية، إعداد الضريبة، فترة الإقرار، الجاهزية، عرض العميل) + `.set-main` container.
- [x] T015 [US2] In `pages/client-tax-settings.html`, build the tax identity card (`#identity`: العميل، الدولة as `.seg data-country-select`، الرقم الضريبي، هل العميل مسجل ضريبيًا؟ `.switch`، تاريخ التسجيل الضريبي، نوع النشاط الضريبي) and the VAT configuration card (`#vat`: نسبة الضريبة الافتراضية `.input mono %`، الأسعار تشمل الضريبة؟ `.switch`، حساب الضريبة تلقائيًا؟ `.switch`، ضريبة المخرجات/المدخلات/المستحقة `.select`، الحسابات المرتبطة) per `data-model.md`.
- [x] T016 [US2] In `pages/client-tax-settings.html`, build the tax period card (`#period`: `.seg` شهري/ربع سنوي/سنوي + start/end `date`), the country readiness card (`#readiness`: `data-country-block="sa"` visible + `="eg"` hidden with VAT/e-invoice/planned-fields chips), the client-display card (`#display`: 3 `.switch` rows), and the `.tip` warning note "الإعدادات تؤثر على تقارير الضريبة والقيود المحاسبية المستقبلية.".
- [x] T017 [US2] Verify `pages/client-tax-settings.html` per `quickstart.md`: RTL + asset paths, exactly one active sidebar item, 2 `data-country-block`, all 7 required sections present, country toggle swaps readiness, no console errors.

**Checkpoint**: Tax settings page complete and independently demoable.

---

## Phase 5: User Story 3 - Reach the new pages from existing entry points (Priority: P2)

**Goal**: The two modules become live (not "قريباً") in the sidebar and on the landing page, and are
linked from clients.html and settings.html, with no regressions.

**Independent Test**: From clients.html, settings.html, index.html, and the sidebar on any page, confirm
working links to the new pages; the two modules are no longer coming-soon; every page has one active item.

**Depends on**: US1 + US2 (the target pages must exist).

- [x] T018 [US3] Across all 15 existing `pages/*.html`, convert the two coming-soon sidebar items to live links: تهيئة عميل جديد → `<a class="sidebar-link" href="client-onboarding.html">` and إعدادات ضريبة العميل → `<a class="sidebar-link" href="client-tax-settings.html">`, removing the `is-soon` class and the `<span class="sl-soon">قريباً</span>` for those two only (keep their icons); do not change any existing active state.
- [x] T019 [P] [US3] In `index.html`, convert the two `.landing-card.is-soon` divs (تهيئة عميل جديد، إعدادات ضريبة العميل) to `<a class="landing-card" href="pages/client-onboarding.html">` / `pages/client-tax-settings.html` with a `.go` "فتح الصفحة" affordance, remove the `is-soon` class and the قريباً chip; decrement the الإعداد والتهيئة and الضرائب group count chips by 1, change the COMING SOON count 22→20, and update the footer to "منصة محاسبتي · جميع الحقوق محفوظة 2026 · 17 شاشة مكتملة + 20 وحدة قادمة".
- [x] T020 [P] [US3] In `pages/clients.html`, add a working primary action `<a class="btn btn-primary" href="client-onboarding.html">إعداد عميل جديد</a>` near the existing add-client control; keep the existing `data-open="#addClientModal"` button and the modal intact.
- [x] T021 [P] [US3] In `pages/settings.html`, add a working link to `client-tax-settings.html` from the tax area (the `#tax` card header or `.set-nav`), e.g. a `.btn-outline` "إعدادات ضريبة العميل"; do not remove any existing settings section.
- [x] T022 [US3] Verify wiring per `quickstart.md`: 17 pages contain `href="client-onboarding.html"` and `href="client-tax-settings.html"`; no `is-soon` remains for the two modules; no `<a>` carries `is-soon`; every `pages/*.html` has exactly one `sidebar-link active`; index footer shows 17+20. (Depends on T018–T021.)

**Checkpoint**: SC-005, SC-006, SC-007 satisfied; pages fully integrated.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final full-project QA (constitution Quality Gates).

- [x] T023 [P] Run the full static audit suite from `quickstart.md` §3 (a–j) across the project; all expectations clean.
- [x] T024 [P] Manual responsive + graceful-degradation QA: both new pages at mobile width (sidebar toggle opens/closes, forms/cards stack, no overflow); with JavaScript disabled, all 8 wizard panels render stacked and both country blocks are visible (page still complete); no console errors anywhere.
- [x] T025 Final Definition-of-Done per `quickstart.md` §5: rebuild `npm run build:css` only if `assets/css/input.css` was changed; confirm SC-001…SC-009 hold; confirm no existing section/page/link/asset path was removed or broken.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: no dependencies.
- **Foundational (Phase 2)**: depends on Phase 1. Blocks US1 and US2 verification (NOT US3).
- **US1 (Phase 3)**: depends on Phase 2.
- **US2 (Phase 4)**: depends on Phase 2; independent of US1 (different file).
- **US3 (Phase 5)**: depends on US1 + US2 (target pages must exist).
- **Polish (Phase 6)**: depends on US1, US2, US3.

### User Story Dependencies

- **US1 (P1)**: needs shared JS (Phase 2). Builds `client-onboarding.html`.
- **US2 (P1)**: needs shared JS (Phase 2). Builds `client-tax-settings.html`. Independent of US1.
- **US3 (P2)**: needs both pages to exist; wires existing pages + index/clients/settings.

### Within Each Story

- US1: T005 (create shell) → T006–T010 (same file, sequential) → T011 (verify).
- US2: T012 (create shell) → T013–T016 (same file, sequential) → T017 (verify).
- US3: T018 (sidebar across existing pages) → T019/T020/T021 (parallel, different files) → T022 (verify).

### Parallel Opportunities

- After Phase 2, **US1 and US2 can be built in parallel** (separate new files). T005 and T012 are [P].
- US3: T019, T020, T021 touch different files and run in parallel after T018.
- Polish: T023 and T024 run in parallel.

---

## Parallel Example: US1 ∥ US2 (after Phase 2)

```bash
# Two separate new files — build concurrently:
Task: "Create + populate pages/client-onboarding.html (T005–T011)"
Task: "Create + populate pages/client-tax-settings.html (T012–T017)"
```

---

## Implementation Strategy

### MVP First

1. Phase 1 → Phase 2 → Phase 3 (US1). Delivers the onboarding wizard — the highest-value entry point.

### Incremental Delivery

1. Setup + Foundational JS.
2. US1 onboarding wizard → demo.
3. US2 tax settings → demo.
4. US3 wiring (sidebar/index/clients/settings go live) → full integration.
5. Polish: full QA + graceful-degradation + final build.

### Notes

- [P] = different files, no dependencies.
- Both new pages are complete (no skeleton sections) and reuse approved components only.
- New JS only toggles `hidden`/`active`; it never generates content.
- Rebuild `assets/css/output.css` only if `input.css` changed (the plan targets zero new CSS).
- Do not remove the clients.html add-client modal or any settings section; convert only the two named
  coming-soon items.
