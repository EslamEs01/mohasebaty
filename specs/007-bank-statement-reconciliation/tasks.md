---
description: "Task list for Bank Statement Import & Reconciliation (Spec 007)"
---

# Tasks: Bank Statement Import & Reconciliation (Spec 007)

**Input**: Design documents from `specs/007-bank-statement-reconciliation/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/page-contracts.md, quickstart.md

**Tests**: Not requested. Verification is the documented manual + scriptable **audit** in `quickstart.md` §3–§5 (including check (j) rogue-class sweep and check (h) `.workspace`/no-`.btn-rose`). No TDD/unit-test tasks.

**Build type**: Net-new — 2 pages. The import page mirrors `data-import.html`/`import-mapping.html`; the reconciliation page's split workspace reuses the approved `.workspace`/`.left-col` layout from `document-review.html`. **Hard rule (Specs 004–006 lesson):** use only classes defined in `assets/css/output.css`; copy markup from the named reference pages; **do NOT use `.btn-rose`** (purged — use `.btn-amber`/`.btn-outline`).

**✅ Execution result (2026-06-11).** All 18 tasks executed. The 2 pages were authored by parallel build agents (cloning the `data-import.html` shell) then **adversarially verified** by a 3-agent fan-out: **0 blocking issues** across `bank-statement-import.html`, `bank-reconciliation.html`, and navigation — clean on the first build, both pages **0 blocking AND 0 minor**. `bank-statement-import.html` (priority): 3 selectors, dropzone+file-card upload, mapping summary (.tip + 6 مربوط columns), 6-col preview table × 9 rows (7 مقروء / 2 تحذير), 3 actions. `bank-reconciliation.html`: KPIs 9/4/3/2, the split workspace reuses the **approved `.workspace` (1fr 1fr) + `.left-col`** from `document-review.html` (verified — not a new grid), column 1 = 9-txn table covering all 3 states, column 2 = suggested-docs (4 rows, descending نسبة التطابق 98/92/64/41) + match-details (الفرق 0 ﷼) + 4 actions ("طلب توضيح" uses `.btn-amber`, not the purged `.btn-rose`). **Zero new CSS** — every class on both pages defined in `output.css` (rogue-class sweep clean). Navigation: 2 sidebar items live across all 30 pages, `index.html` 28→30 / 9→7, contextual links from `bank-accounts.html` + `data-import.html`; prior 005/006 contextual links intact.

**Organization**: Tasks grouped by the 3 user stories. US1/US2 each build a different page file (parallelizable); US3 wires navigation (needs both).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: US1–US3 (Setup, Foundational, Polish carry no story label)
- Exact file paths are included in every task

## Path Conventions

Static multi-page frontend at repository root: `index.html`, `pages/*.html`, `assets/css/output.css`, `assets/js/main.js`. No `src/` or `tests/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Capture exact reference markup so both pages reuse shared classes (zero new CSS).

- [x] T001 [P] Read reference markup: `pages/document-review.html` (the `.workspace` grid + `.left-col` two-panel layout ~line 237), `pages/data-import.html` (corrected `.dropzone`/`.file-card`), `pages/import-mapping.html` (mapping-summary `.tip` + preview `table.docs` ~232–252), and `pages/clients.html`/`journal-entries.html` (`.kpi-row`, `table.docs`) (read-only).
- [x] T002 Confirm the zero-new-CSS catalog: grep `assets/css/output.css` for every class named in `contracts/page-contracts.md` C1–C3 (esp. `.workspace`, `.left-col`, `.set-body`, `.set-row`, `.info`, `.tip`, `.dropzone`, `.file-card`, `.kpi-row`, `.docs`, `.chip`, `.btn-amber`); confirm each is DEFINED and that **`.btn-rose` is NOT used** (purged from `output.css`) (read-only).

**Checkpoint**: Reference markup captured; class catalog confirmed.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Confirm shared JS covers every interaction so no `main.js` change is needed.

- [x] T003 Confirm `assets/js/main.js` registers `initDropzone()` (`data-zone-id`/`data-file-card-for`), `initOverlays()` (`data-open`/`data-overlay`/`data-close`), and `initSingleSelect()`/`initFilterSelects()` in `boot()`. No changes if present (read-only).

**Checkpoint**: JS foundation confirmed.

---

## Phase 3: User Story 1 - Import a Bank Statement (Priority: P1) 🎯 MVP

**Goal**: A complete `pages/bank-statement-import.html` per contract C1.

**Independent Test**: Open `pages/bank-statement-import.html`; pick client + bank account + period; see the upload area + selected-file state; see the mapping summary (6 mapped columns); see the 6-column preview table with 9 Arabic rows; the 3 actions; "متابعة للمطابقة" → `bank-reconciliation.html`; no console errors.

**Depends on**: Phase 2.

- [x] T004 [P] [US1] Create `pages/bank-statement-import.html`: clone the shell from `pages/data-import.html` (doctype, head — `<title>استيراد كشف حساب بنكي · منصة محاسبتي</title> —, full sidebar, `.mobile-nav-toggle`, closing `main.js`); convert the 2 bank coming-soon sidebar items (استيراد كشف الحساب, التسوية البنكية) to live `<a>` links and mark `<a class="sidebar-link active" href="bank-statement-import.html" aria-current="page">استيراد كشف الحساب</a>` active. Header (`.page-title-wrap` eyebrow "البنوك · استيراد كشف", title "استيراد كشف حساب بنكي", subtitle "ارفع كشف الحساب البنكي واربط أعمدته لتجهيزه للمطابقة"); 3 selectors (client, bank account, period) via `.select-wrap`/`.select`; 3 header actions: "رفع وتحليل" `.btn.btn-primary`, "متابعة للمطابقة" `.btn.btn-primary` `href="bank-reconciliation.html"`, "حفظ كمسودة" `.btn.btn-outline`.
- [x] T005 [US1] In `pages/bank-statement-import.html` add: (a) the upload region — `.dropzone[data-zone-id="bank-statement"]` (`.dz-ico`/`<b>`/`.sub`/`.browse`/`.formats`/`.fmt` — CSV·Excel·PDF) + a matching `.file-card[data-file-card-for="bank-statement" hidden]` (`.fc-ico` "CSV" + `.fc-body` `<b data-file-name>كشف_الراجحي_Q2_2026.csv</b>` + `<span data-file-size>` + `.icon-btn[data-file-clear]`); (b) the mapping-summary `.card` — a `.tip` confirmation + a `.set-body` (or chip list) of the 6 mapped columns (التاريخ، الوصف، المدين، الدائن، الرصيد، رقم العملية) each `.chip.green` مربوط.
- [x] T006 [US1] In `pages/bank-statement-import.html` add the preview `.card` > `.table-wrap` > `table.docs`: `<thead>` 6 columns (التاريخ، الوصف، مدين، دائن، الرصيد، الحالة) and `<tbody>` the 9 rows from `data-model.md` (مقروء `.chip.green` / تحذير `.chip.amber`). Optional `.tbl-foot`.
- [x] T007 [US1] Verify `pages/bank-statement-import.html` per `quickstart.md` checks (a)(b)(e)(f)(i 6 th)(j rogue sweep): RTL + assets, one active sidebar item, 6 columns, no undefined classes, no console errors.

**Checkpoint**: US1 import page complete and independently demoable.

---

## Phase 4: User Story 2 - Reconcile Bank Transactions with Documents (Priority: P1)

**Goal**: A complete `pages/bank-reconciliation.html` per contract C2 — KPIs + the two-panel `.workspace` + match-details + actions.

**Independent Test**: Open `pages/bank-reconciliation.html`; 4 KPI cards (9/4/3/2); the two-panel `.workspace` (bank transactions right, suggested docs + match-details left); transactions table 6 cols × 9 rows covering all 3 states; suggested-docs table 6 cols × 4 rows with descending نسبة التطابق; match-details card + 4 actions; mobile stacks to one column; no console errors.

**Depends on**: Phase 2. Independent of US1 (different file).

- [x] T008 [P] [US2] Create `pages/bank-reconciliation.html` (clone shell as in T004), sidebar `<a class="sidebar-link active" href="bank-reconciliation.html" aria-current="page">التسوية البنكية</a>` active. Header: eyebrow "البنوك · التسوية", title "مطابقة البنك والمستندات", subtitle "طابق معاملات البنك مع المستندات والفواتير المرفوعة"; 3 selectors (client, bank account, period). Add the `.kpi-row` of 4 `.card kpi`: معاملات البنك 9 (`.kpi-ico-primary`), مطابق تلقائيًا 4 (`.kpi-ico-green`), يحتاج مراجعة 3 (`.kpi-ico-amber`), غير مطابق 2 (`.kpi-ico-rose`).
- [x] T009 [US2] In `pages/bank-reconciliation.html` add `<div class="workspace">` (copy the grid usage from `document-review.html`): column 1 = a `.card` with `.card-head` "معاملات البنك" + chip, and a `.table-wrap` > `table.docs` with 6 columns (التاريخ، الوصف، المبلغ، النوع، الحالة، إجراء) and the 9 transaction rows from `data-model.md` (status chips `.chip.green`/`.amber`/`.rose`; type chips إيداع/سحب/رسوم; إجراء `.btn.btn-outline.btn-sm`); visually highlight the representative selected row.
- [x] T010 [US2] In `pages/bank-reconciliation.html` add column 2 as a `.left-col` stack containing: (a) a suggested-documents `.card` (`.card-head` "مستندات مقترحة للمطابقة"; `.table-wrap` > `table.docs` 6 columns — المستند، النوع، المبلغ، التاريخ، نسبة التطابق، إجراء — and the 4 rows from `data-model.md`, نسبة التطابق as `.chip.green`/`.amber`/`.slate` by band, descending; إجراء "اختيار" `.btn.btn-outline.btn-sm`); (b) a match-details `.card` (`.card-head` "تفاصيل المطابقة"; `.set-body` with 4 `.set-row`/`.info` — معاملة البنك المحددة، المستند المقترح، الفرق (`.chip.green` "0 ﷼ — متطابق")، ملاحظات); (c) the 4 action buttons: "مطابقة" `.btn.btn-primary`، "تجاهل" `.btn.btn-outline`، "إنشاء مستند جديد من المعاملة" `.btn.btn-outline`، "طلب توضيح" `.btn.btn-amber` (NOT `.btn-rose`).
- [x] T011 [US2] Verify `pages/bank-reconciliation.html` per `quickstart.md` checks (a)(b)(e)(f)(h `.workspace`=1 & `.btn-rose`=0)(i 12 th)(j rogue sweep): RTL + assets, one active sidebar item, the split workspace present, all 3 transaction states represented, no undefined classes, no `.btn-rose`, no console errors.

**Checkpoint**: US2 reconciliation page complete.

---

## Phase 5: User Story 3 - Integrate Pages into Navigation (Priority: P3)

**Goal**: Both pages live across the project — sidebar + `index.html` + contextual links.

**Independent Test**: From any page, the 2 sidebar items are live links; `index.html` shows both as live cards with footer "30 شاشة مكتملة + 7 وحدة قادمة"; `bank-accounts.html` and `data-import.html` each link to `bank-statement-import.html`; every page has exactly one active sidebar item.

**Depends on**: US1 + US2 (both pages must exist).

- [x] T012 [US3] Convert the 2 coming-soon sidebar spans (استيراد كشف الحساب → `bank-statement-import.html`, التسوية البنكية → `bank-reconciliation.html`) to live `<a class="sidebar-link">` across all 28 existing `pages/*.html` via a Python script (same pattern as Spec 006): preserve each `.sl-ico` SVG, remove the `<span class="sl-soon">قريباً</span>`.
- [x] T013 [P] [US3] In `index.html` convert the 2 `<div class="landing-card is-soon">` (استيراد كشف الحساب ~line 419, التسوية البنكية ~426) to live `<a class="landing-card" href="pages/bank-statement-import.html|bank-reconciliation.html">` with a `.go "فتح الصفحة"`; update chip `9 وحدة` → `7 وحدة` and footer `28 شاشة مكتملة + 9 وحدة قادمة` → `30 شاشة مكتملة + 7 وحدة قادمة`.
- [x] T014 [US3] Add one non-destructive contextual `<a>` link each: in `pages/bank-accounts.html` → `bank-statement-import.html` ("استيراد كشف حساب") and in `pages/data-import.html` → `bank-statement-import.html` ("استيراد كشف بنكي"). Remove no existing content. (Runs after T012 since those files are also touched by the sidebar script.)
- [x] T015 [US3] Verify navigation per `quickstart.md` checks (d)(g)(k): both modules linked from 30 pages, no `is-soon` element is an `<a>`, `index.html` shows "30 شاشة مكتملة" / "7 وحدة", page count = 30, contextual links resolve, one active sidebar item per page.

**Checkpoint**: SC-007, SC-008 satisfied; both pages integrated.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Full audit (incl. rogue-class sweep) + responsive QA + Definition of Done.

- [x] T016 [P] Run the complete static audit `quickstart.md` §3 checks (a)–(k), **including (j) the rogue-class sweep and (h) `.workspace`=1 / `.btn-rose`=0** — confirm zero undefined classes on both pages.
- [x] T017 [P] Manual responsive QA on both pages at mobile width: sidebar toggles, KPI cards stack, the reconciliation `.workspace` collapses to one column (suggested-docs + match-details stack under the transactions table), tables scroll, upload + modals fit, forms don't overflow; no console errors.
- [x] T018 Final Definition of Done per `quickstart.md` §5: confirm SC-001…SC-008 hold; rebuild `npm run build:css` only if `assets/css/input.css` changed (none expected); confirm no existing page, section, link, or asset path was removed or broken.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)** → **Foundational (Phase 2)** → user stories.
- **US1 (Phase 3) ∥ US2 (Phase 4)**: different page files → parallelizable after Phase 2.
- **US3 (Phase 5)**: after US1 + US2 (both pages must exist). T012 (sidebars) → T014 (contextual links, same files); T013 (`index.html`) is `[P]`.
- **Polish (Phase 6)**: after US3.

### User Story Dependencies

- **US1 (P1)**, **US2 (P1)**: independent — each one page file.
- **US3 (P3)**: needs US1 + US2.

### Parallel Opportunities

```bash
# After Phase 2, build both pages concurrently (different files):
Task: "Build pages/bank-statement-import.html (T004–T007)"   # US1
Task: "Build pages/bank-reconciliation.html  (T008–T011)"    # US2
```
Within each story the tasks are sequential (same file). T016 ∥ T017 in Polish.

### Within Each Story

- US1: T004 (shell+header+selectors) → T005 (upload+mapping) → T006 (preview table) → T007 (verify)
- US2: T008 (shell+header+KPIs) → T009 (workspace col1 txns) → T010 (col2 left-col docs+match+actions) → T011 (verify)
- US3: T012 (sidebars) → T013 (index, ∥) → T014 (contextual links) → T015 (verify)

---

## Implementation Strategy

### MVP First (US1 only)

1. Phase 1 → Phase 2 → Phase 3 (US1). Delivers `bank-statement-import.html` — the statement entry point.

### Incremental Delivery

1. Setup + Foundational.
2. US1 ∥ US2 → both pages exist (import + reconciliation workspace).
3. US3 → navigation integration across all 30 pages.
4. Polish: full audit (incl. rogue-class sweep) + responsive QA + DoD.

### Notes

- **[P]** = different files, no dependencies.
- **Zero-new-CSS is mandatory** — the split workspace reuses `.workspace`/`.left-col`; do NOT use `.btn-rose`; the Polish rogue-class sweep (T016/check j) + check (h) are the gates.
- All content is static HTML; no matching computed; row selection is a visual highlight; upload/modal via existing `boot()`. No `main.js`/CSS change.
- Rebuild `output.css` only if `input.css` changed (none expected).
