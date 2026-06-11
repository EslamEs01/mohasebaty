---
description: "Task list for Opening Balances & Fiscal Periods (Spec 005)"
---

# Tasks: Opening Balances & Fiscal Periods (Spec 005)

**Input**: Design documents from `specs/005-opening-balances-fiscal-periods/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/page-contracts.md, quickstart.md

**Tests**: Not requested. Verification is the documented manual + scriptable **audit** in `quickstart.md` §3–§5 (including check (j), the rogue-class sweep). No TDD/unit-test tasks are generated.

**Build type**: Net-new — both pages must be authored. **Hard rule (carried from Spec 004):** use only classes already defined in `assets/css/output.css`; copy component markup from the reference pages named in `contracts/page-contracts.md` and `research.md`. No new CSS classes.

**✅ Execution result (2026-06-11).** All 25 tasks executed. Both pages were authored by parallel build agents (each cloning the `journal-entries.html` shell and copying component markup from named reference pages) then **adversarially verified** by a 3-agent fan-out: **0 blocking issues** across `opening-balances.html`, `fiscal-periods.html`, and navigation. `opening-balances.html` (the priority page) returned **zero blocking AND zero minor** — 4 status cards balanced at 580,000 ﷼, `.tip` validation, 7-col table with 10 account rows, add-balance modal. `fiscal-periods.html`: `.set-body` year setup, 6-col × 12-month table covering all 3 statuses, 2 working modals (close + reopen). **Zero new CSS** — every class on both pages is defined in `output.css` (rogue-class sweep clean, the Spec 004 failure mode avoided). Navigation wired: 2 sidebar items live across all 25 pages, `index.html` 23→25 / 14→12, contextual links from chart-of-accounts/settings/reports. Note: a `.btn-rose` token in the spec was found purged from `output.css`, so the build agent correctly used `.btn-primary` instead.

**Organization**: Tasks grouped by the 5 user stories in spec.md. US1 builds `opening-balances.html`; US2 builds `fiscal-periods.html`; US3 and US4 add modals to `fiscal-periods.html` (same file → sequential, after US2); US5 wires navigation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: US1–US5 (Setup, Foundational, and Polish carry no story label)
- Exact file paths are included in every task

## Path Conventions

Static multi-page frontend at repository root: `index.html`, `pages/*.html`, `assets/css/input.css`, `assets/css/output.css`, `assets/js/main.js`. No `src/` or `tests/` trees.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Capture the exact approved component markup so both pages reuse shared classes (zero new CSS).

- [x] T001 [P] Read reference markup for the opening-balances components and copy the exact shared-class structure: `pages/journal-entries.html` (`.kpi-row`/`.card kpi` ~238–290; `table.docs` with مدين/دائن headers ~370–382; `#manualEntryModal` `.scrim`/`.modal-*`/`.field` ~549–630) and `pages/chart-of-accounts.html` (`.acct-code`/`.acct-name`/`.acct-dot` cells ~338–399) (read-only).
- [x] T002 [P] Read reference markup for the fiscal-periods components: `pages/settings.html` (`.set-body`/`.set-row`/`.info`/`.ctrl` ~323–345), a `table.docs` page (`pages/clients.html`/`pages/accountant-inbox.html`), and the `.tip` banner in `pages/client-tax-settings.html` (read-only).
- [x] T003 Confirm the zero-new-CSS catalog: grep `assets/css/output.css` for every class named in `contracts/page-contracts.md` C1–C3 (`.kpi-row`, `.card`, `.kpi`, `.table-wrap`, `.docs`, `.acct-code`, `.acct-name`, `.acct-dot`, `.chip`, `.tip`, `.scrim`, `.modal`, `.modal-head/-body/-foot`, `.field`, `.req`, `.select-wrap`, `.select`, `.chev`, `.input`, `.set-body`, `.set-row`, `.info`, `.ctrl`, `.dropzone`, `.dz-ico`, `.sub`, `.browse`, `.formats`, `.fmt`, `.file-card`, `.fc-ico`, `.fc-body`, `.icon-btn`, `.seg`, `.btn`, `.btn-primary`, `.btn-outline`, `.btn-rose`, `.btn-sm`, `.go`, `.landing-card`, `.sidebar-link`) — confirm each is defined; record any gap before authoring (read-only).

**Checkpoint**: Reference markup captured; class catalog confirmed; building can begin.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Confirm shared JS covers every interaction so no `main.js` change is needed.

**⚠️ CRITICAL**: Verify before authoring so a missing interaction is caught once.

- [x] T004 Confirm `assets/js/main.js` registers `initOverlays()` (`data-open`/`data-close`/`data-overlay` — add-balance, close, reopen modals), `initSingleSelect()` (`.seg`), `initDropzone()` (`data-zone-id`/`data-file-card-for` — balances upload), and `initFilterSelects()` in `boot()`. No changes if all present (read-only).

**Checkpoint**: JS foundation confirmed.

---

## Phase 3: User Story 1 - Enter and Balance Opening Balances (Priority: P1) 🎯 MVP

**Goal**: A complete `pages/opening-balances.html` per contract C1.

**Independent Test**: Open `pages/opening-balances.html`; pick client + go-live date; see 4 status cards (المدين 580,000 / الدائن 580,000 / الفرق 0 / الحالة متوازن); see the `.tip` validation card; see the 7-column table with 10 Arabic account rows; "إضافة رصيد" opens a 4-field modal; the four actions are present; no console errors.

**Depends on**: Phase 2.

- [x] T005 [P] [US1] Create `pages/opening-balances.html` shell per C1: `<html lang="ar" dir="rtl">`, `../assets/css/output.css`, `.app-shell`, full shared sidebar copied from an existing page with the 2 import/period items as live `<a>` links and `<a class="sidebar-link active" href="opening-balances.html" aria-current="page">الأرصدة الافتتاحية</a>` marked active; `<main class="main-area">`; `../assets/js/main.js` at end. Add the header (`.page-title-wrap` eyebrow/title/subtitle), client selector `.select-wrap`/`.select`, go-live date `<input class="input" type="date">`, and 4 header action buttons (إضافة رصيد `.btn.btn-primary` `data-open="#addBalanceModal"`, رفع ملف أرصدة `.btn.btn-outline`, اعتماد الأرصدة `.btn.btn-primary`, تصدير `.btn.btn-outline`).
- [x] T006 [US1] In `pages/opening-balances.html` add the 4 balance status cards as a `.kpi-row` of `.card kpi`: إجمالي المدين 580,000 ﷼ (`.kpi-ico-green`), إجمالي الدائن 580,000 ﷼ (`.kpi-ico-amber`), الفرق 0 ﷼ (`.kpi-ico-primary`), الحالة with a `.chip.green` "متوازن" in the card body (`.kpi-ico-green`).
- [x] T007 [US1] In `pages/opening-balances.html` add the `.tip` validation card: "يجب أن يكون إجمالي المدين مساويًا لإجمالي الدائن قبل اعتماد الأرصدة. لا يمكن الاعتماد مع وجود فرق."
- [x] T008 [US1] In `pages/opening-balances.html` add the opening-balances table (`.card` > `.table-wrap` > `table.docs`): `<thead>` with 7 columns (كود الحساب، اسم الحساب، النوع، رصيد مدين، رصيد دائن، ملاحظات، الحالة) and `<tbody>` with the 10 rows from `data-model.md` (use `.acct-code` for code and `.acct-name` for name; type/debit/credit/notes plain `<td>`; status `.chip.green` مطابق / `.chip.amber` يحتاج مراجعة for the المخزون row); add a totals foot row showing مدين 580,000 · دائن 580,000 · الفرق 0.
- [x] T009 [US1] In `pages/opening-balances.html` add the add-balance modal `<div class="scrim" data-overlay id="addBalanceModal" hidden>` > `.modal` (`.modal-head` "إضافة رصيد افتتاحي" + `data-close`; `.modal-body` `.fields-grid` with 4 `.field`s — الحساب `.select-wrap`/`.select`, مدين `<input class="input" type="number">`, دائن `<input class="input" type="number">`, ملاحظات `<textarea class="input">`; `.modal-foot` "حفظ الرصيد" `.btn.btn-primary` + "إلغاء" `.btn.btn-outline` `data-close`), and the optional `.dropzone[data-zone-id="balances-file"]` + `.file-card[data-file-card-for="balances-file" hidden]` upload region (post-004 corrected markup: `.dz-ico`/`.sub`/`.browse`/`.formats`; `.fc-ico`/`.fc-body`/`[data-file-name]`/`[data-file-clear]`).
- [x] T010 [US1] Verify `pages/opening-balances.html` per `quickstart.md` checks (a)(b)(e)(f)(h)(i)(j): RTL + local assets, exactly one active sidebar item, `data-overlay` present, 7 table columns, rogue-class sweep clean (every class defined in `output.css`), no console errors.

**Checkpoint**: US1 page complete and independently demoable.

---

## Phase 4: User Story 2 - Fiscal Year Setup & Period Statuses (Priority: P1)

**Goal**: A complete `pages/fiscal-periods.html` per contract C2 (year setup + 12-month period table).

**Independent Test**: Open `pages/fiscal-periods.html`; see the fiscal-year setup (2026, 01/01–31/12, ريال سعودي, نشطة); see 12 month rows with status badges covering مفتوحة/قيد المراجعة/مغلقة, the 3 readiness counts, and per-month actions; "إنشاء سنة مالية جديدة" present; no console errors.

**Depends on**: Phase 2. Independent of US1 (different file).

- [x] T011 [P] [US2] Create `pages/fiscal-periods.html` shell per C2 (same shell rules as T005), with `<a class="sidebar-link active" href="fiscal-periods.html" aria-current="page">الفترات المالية</a>` active. Add the header (eyebrow "الإعداد المحاسبي · السنة المالية والفترات", title "الفترات المالية", subtitle "إدارة السنة المالية وحالة الشهور وإغلاق الفترات بعد المراجعة"), client selector `.select-wrap`/`.select`, and "إنشاء سنة مالية جديدة" `.btn.btn-primary`.
- [x] T012 [US2] In `pages/fiscal-periods.html` add the fiscal-year setup `.card` with `.set-body` of `.set-row` items (`.info`): السنة المالية 2026, تاريخ البداية 01/01/2026, تاريخ النهاية 31/12/2026, العملة ريال سعودي, الحالة `.chip.green` نشطة.
- [x] T013 [US2] In `pages/fiscal-periods.html` add the 12-month period table (`.card` > `.table-wrap` > `table.docs`): `<thead>` with 6 columns (الشهر، الحالة، مستندات غير مصنفة، قيود غير مرحلة، تقارير غير معتمدة، إجراء) and `<tbody>` with the 12 rows from `data-model.md`; status chips `.chip.green` مفتوحة / `.chip.amber` قيد المراجعة / `.chip.slate` مغلقة; إجراء cell `.btn.btn-outline.btn-sm` = "إغلاق شهر" `data-open="#closePeriodModal"` for مفتوحة/قيد المراجعة rows and "فتح بصلاحية" `data-open="#reopenPeriodModal"` for مغلقة rows.
- [x] T014 [US2] Verify `pages/fiscal-periods.html` structure per `quickstart.md` checks (a)(b)(e)(f)(i)(j): RTL + local assets, one active sidebar item, 6 table columns, 12 rows covering all 3 statuses, rogue-class sweep clean.

**Checkpoint**: US2 page (year setup + period list) complete.

---

## Phase 5: User Story 3 - Close a Fiscal Month (Priority: P2)

**Goal**: A working close-period modal on `pages/fiscal-periods.html`.

**Independent Test**: On `pages/fiscal-periods.html`, click "إغلاق شهر" on an open/review month → close modal opens with a warning, the month's incomplete-items summary, and "تأكيد الإغلاق"; closes on إلغاء/Escape.

**Depends on**: US2 (T013 must exist — same file).

- [x] T015 [US3] In `pages/fiscal-periods.html` add the close-period modal `<div class="scrim" data-overlay id="closePeriodModal" hidden>`: `.modal-head` "إغلاق الفترة المالية" + `data-close`; `.modal-body` with a `.tip` warning ("سيتم إغلاق الفترة ومنع التعديل عليها — لا يمكن التراجع إلا بصلاحية مدير") and an incomplete-items summary for مايو 2026 (٤ مستندات غير مصنفة · قيدان غير مرحّلين · تقرير غير معتمد); `.modal-foot` "تأكيد الإغلاق" `.btn.btn-rose` + "إلغاء" `.btn.btn-outline` `data-close`. Confirm the open/review rows' "إغلاق شهر" buttons use `data-open="#closePeriodModal"`.
- [x] T016 [US3] Verify the close modal per `quickstart.md` check (h): it opens/closes via `initOverlays()`, and contains the warning + incomplete-items summary + confirm action.

**Checkpoint**: US3 close flow complete.

---

## Phase 6: User Story 4 - Reopen a Closed Month with Manager Approval (Priority: P2)

**Goal**: A working reopen-period modal on `pages/fiscal-periods.html`.

**Independent Test**: On `pages/fiscal-periods.html`, click "فتح بصلاحية" on a مغلقة month → reopen modal opens with a سبب field, a موافقة مدير field, and a confirm; closes on إلغاء/Escape.

**Depends on**: US2 (T013 must exist — same file). Independent of US3 (different modal).

- [x] T017 [US4] In `pages/fiscal-periods.html` add the reopen-period modal `<div class="scrim" data-overlay id="reopenPeriodModal" hidden>`: `.modal-head` "إعادة فتح فترة مغلقة" + `data-close`; `.modal-body` `.fields-grid` with 2 `.field`s — سبب إعادة الفتح (`<textarea class="input">` + `.req`, demo value "تصحيح قيد مصروفات مُدخل بالخطأ") and موافقة مدير (`.select-wrap`/`.select` of manager names incl. "خالد الرشيدي — مدير الحسابات" + `.req`); `.modal-foot` "تأكيد إعادة الفتح" `.btn.btn-primary` + "إلغاء" `.btn.btn-outline` `data-close`. Confirm the مغلقة rows' "فتح بصلاحية" buttons use `data-open="#reopenPeriodModal"`.
- [x] T018 [US4] Verify the reopen modal per `quickstart.md` check (h): the page now has ≥2 `data-overlay` modals; the reopen modal opens/closes and contains both required fields (reason + manager approval).

**Checkpoint**: US4 reopen flow complete; `fiscal-periods.html` fully done.

---

## Phase 7: User Story 5 - Integrate Pages into Navigation (Priority: P3)

**Goal**: Both pages are live across the project — sidebar, `index.html`, and contextual links.

**Independent Test**: From any page, both sidebar items are live links (no قريباً); `index.html` shows both as live cards with footer "25 شاشة مكتملة + 12 وحدة قادمة"; `settings.html`, `reports.html`, `chart-of-accounts.html` each link to the relevant new page; every page has exactly one active sidebar item.

**Depends on**: US1 + US2 (both pages must exist before links are valid).

- [x] T019 [US5] Convert the 2 `استيراد البيانات`-section coming-soon sidebar spans `الأرصدة الافتتاحية` (grid icon) and `الفترات المالية` (calendar icon) to live `<a class="sidebar-link" href="opening-balances.html">` / `href="fiscal-periods.html"` across all 23 existing `pages/*.html` via a Python script (same pattern as Spec 003/004): preserve each `.sl-ico` SVG, remove the `<span class="sl-soon">قريباً</span>`. Other coming-soon items unchanged.
- [x] T020 [P] [US5] In `index.html` convert the 2 `<div class="landing-card is-soon">` (الأرصدة الافتتاحية ~line 276, الفترات المالية ~line 283) to live `<a class="landing-card" href="pages/opening-balances.html">` / `href="pages/fiscal-periods.html">` with a `.go "فتح الصفحة"`; update the coming-soon chip `14 وحدة` → `12 وحدة` and the footer `23 شاشة مكتملة + 14 وحدة قادمة` → `25 شاشة مكتملة + 12 وحدة قادمة`.
- [x] T021 [US5] Add one non-destructive contextual `<a>` link each: in `pages/chart-of-accounts.html` → `opening-balances.html` ("الأرصدة الافتتاحية"), in `pages/settings.html` → `fiscal-periods.html` (fiscal-year/accounting section), and in `pages/reports.html` → `fiscal-periods.html` (period-closing context). Remove no existing content. (Runs after T019 since those 3 files are also touched by the sidebar script.)
- [x] T022 [US5] Verify navigation per `quickstart.md` checks (d)(g)(k): both modules are live links from all 25 pages, no `is-soon` element is an `<a>`, `index.html` shows "25 شاشة مكتملة" / "12 وحدة", page count = 25, and every page has exactly one active sidebar item.

**Checkpoint**: SC-007, SC-008 satisfied; both pages integrated; no regressions.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Full audit (incl. rogue-class sweep) + responsive QA + Definition of Done.

- [x] T023 [P] Run the complete static audit `quickstart.md` §3 checks (a)–(k), **including (j) the rogue-class sweep** — confirm zero undefined classes on both new pages.
- [x] T024 [P] Manual responsive QA on both pages at mobile width: sidebar toggles, status cards stack, tables scroll horizontally, the 3 modals fit and scroll, forms don't overflow, header actions wrap; no console errors.
- [x] T025 Final Definition of Done per `quickstart.md` §5: confirm SC-001…SC-008 hold; rebuild `npm run build:css` only if `assets/css/input.css` changed (none expected — zero new CSS); confirm no existing page, section, link, or asset path was removed or broken.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — read-only capture.
- **Foundational (Phase 2)**: After Phase 1. Confirms shared JS.
- **US1 (Phase 3)**: After Phase 2. Builds `opening-balances.html` — independent of US2.
- **US2 (Phase 4)**: After Phase 2. Builds `fiscal-periods.html` — independent of US1 (can run parallel with US1).
- **US3 (Phase 5)** and **US4 (Phase 6)**: After US2 (same file `fiscal-periods.html`); US3 and US4 add different modals and are mutually independent but edit the same file, so sequence them.
- **US5 (Phase 7)**: After US1 + US2 (both pages must exist). T019 → T021 (shared files); T020 is independent (`index.html`).
- **Polish (Phase 8)**: After US5.

### User Story Dependencies

- **US1 (P1)**: needs Phase 2. File `opening-balances.html`.
- **US2 (P1)**: needs Phase 2. File `fiscal-periods.html`. Independent of US1.
- **US3 (P2)**: needs US2 (close modal in the same file).
- **US4 (P2)**: needs US2 (reopen modal in the same file).
- **US5 (P3)**: needs US1 + US2.

### Parallel Opportunities

- T001 ∥ T002 (read-only).
- **T005 (US1) ∥ T011 (US2)** — the two page shells are different files and can be built concurrently; then each story's remaining tasks proceed within its own file.
- T020 (`index.html`) ∥ T019 (`pages/*.html` sidebars) within US5.
- T023 ∥ T024 in Polish.

```bash
# After Phase 2, build both pages concurrently:
Task: "Build pages/opening-balances.html (T005–T010)"   # US1
Task: "Build pages/fiscal-periods.html  (T011–T014)"    # US2
```

### Within Each Story

- US1: T005 (shell+header) → T006 (status cards) → T007 (validation tip) → T008 (table) → T009 (modal+upload) → T010 (verify)
- US2: T011 (shell+header) → T012 (year setup) → T013 (period table) → T014 (verify)
- US3: T015 (close modal) → T016 (verify)
- US4: T017 (reopen modal) → T018 (verify)
- US5: T019 (sidebars) → T020 (index, ∥) → T021 (contextual links) → T022 (verify)

---

## Implementation Strategy

### MVP First (US1 only)

1. Phase 1 → Phase 2 → Phase 3 (US1). Delivers `opening-balances.html` — the accountant can enter/review balances and see the balanced state.

### Incremental Delivery

1. Setup + Foundational.
2. US1 ∥ US2 → both P1 pages exist (year setup + period list + balances).
3. US3 + US4 → close and reopen flows on the periods page.
4. US5 → full navigation integration across all 25 pages.
5. Polish: full audit (incl. rogue-class sweep) + responsive QA + DoD.

### Notes

- **[P]** = different files, no dependencies.
- **Zero-new-CSS is mandatory** — copy markup from the reference pages in `contracts/page-contracts.md`; the Polish rogue-class sweep (T023/check j) is the gate that catches the Spec 004 failure mode.
- All content is static HTML; the 3 modals + upload + selects are handled by existing `boot()` functions — no `main.js` change.
- No real arithmetic — totals/difference/state and period counts are the static demo values in `data-model.md`.
- Rebuild `output.css` only if `input.css` changed (none expected).
