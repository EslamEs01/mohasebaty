---
description: "Task list for Master Data — Vendors / Commercial Customers / Bank Accounts (Spec 006)"
---

# Tasks: Master Data — Vendors / Commercial Customers / Bank Accounts (Spec 006)

**Input**: Design documents from `specs/006-vendors-customers-banks/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/page-contracts.md, quickstart.md

**Tests**: Not requested. Verification is the documented manual + scriptable **audit** in `quickstart.md` §3–§5 (including check (j), the rogue-class sweep). No TDD/unit-test tasks.

**Build type**: Net-new — 3 pages must be authored. All three are the **same archetype as `pages/clients.html`** (KPI row + filter bar + table + add modal). **Hard rule (Specs 004–005 lesson):** use only classes defined in `assets/css/output.css`; copy markup from `clients.html`; **do NOT use `.btn-rose`** (purged from `output.css` — use `.btn-primary`/`.btn-outline`/`.btn-amber`).

**✅ Execution result (2026-06-11).** All 21 tasks executed. The 3 pages were authored by parallel build agents (each cloning the `clients.html` archetype) then **adversarially verified** by a 4-agent fan-out: **0 blocking issues** across `vendors.html`, `commercial-customers.html`, `bank-accounts.html`, and navigation — clean on the first build. `vendors.html` (priority): 4 KPIs 34/29/18/3, filter bar, 9-col table with 8 rows (2 missing-tax `.chip.amber`, foreign Egypt row, 2 موقوف), add-vendor modal 7 fields. `commercial-customers.html`: header disambiguates client-company customers vs platform clients, KPIs 52/47/26/5, modal 6 fields. `bank-accounts.html`: KPIs 9/5/2/2, 7 rows across all 3 types (خزنة/wallet show "—"), modal 8 fields. **Zero new CSS** — every class on all 3 pages defined in `output.css` (rogue-class sweep clean; `.btn-rose` correctly avoided). Navigation: 3 sidebar items live across all 28 pages, `index.html` 25→28 / 12→9, the 005 contextual links intact.

**Organization**: Tasks grouped by the 4 user stories. US1/US2/US3 each build a different page file (parallelizable); US4 wires navigation (needs all 3).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: US1–US4 (Setup, Foundational, Polish carry no story label)
- Exact file paths are included in every task

## Path Conventions

Static multi-page frontend at repository root: `index.html`, `pages/*.html`, `assets/css/output.css`, `assets/js/main.js`. No `src/` or `tests/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Capture the exact `clients.html` markup so all 3 pages reuse shared classes (zero new CSS).

- [x] T001 [P] Read `pages/clients.html` and capture the exact markup for: the `.page-title-wrap` header + client selector + header action button; the `.kpi-row` of 4 `.card kpi` (~line 257); the `.filters`/`.filter`/`.filter-select` bar incl. the search input (~298–320); the `.table-wrap` > `table.docs` with action column (~344–520); and the `#addClientModal` `.scrim`/`.modal-head`/`.modal-body`/`.modal-foot`/`.field` pattern (~525–582) (read-only).
- [x] T002 Confirm the zero-new-CSS catalog: grep `assets/css/output.css` for every class named in `contracts/page-contracts.md` C1–C4; confirm each is DEFINED; explicitly confirm `.btn-rose` is NOT used anywhere (it is purged from `output.css`) (read-only).

**Checkpoint**: Reference markup captured; class catalog confirmed.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Confirm shared JS covers every interaction so no `main.js` change is needed.

- [x] T003 Confirm `assets/js/main.js` registers `initOverlays()` (`data-open`/`data-close`/`data-overlay` — the 3 add modals) and `initFilterSelects()` (`.filter-select`) in `boot()`. No changes if present (read-only).

**Checkpoint**: JS foundation confirmed.

---

## Phase 3: User Story 1 - Manage Vendors (Priority: P1) 🎯 MVP

**Goal**: A complete `pages/vendors.html` per contract C1.

**Independent Test**: Open `pages/vendors.html`; pick a client; see 4 KPI cards (34/29/18/3); use the filter bar (بحث/الحالة/الدولة/خاضع للضريبة); scan the 9-column table with 8 Arabic rows (incl. a "—" tax row and a موقوف row); "إضافة مورد" opens a 7-field modal; no console errors.

**Depends on**: Phase 2.

- [x] T004 [P] [US1] Create `pages/vendors.html`: clone the shell from `pages/clients.html` (doctype, head — change `<title>` to "الموردون · منصة محاسبتي" —, full sidebar, `.mobile-nav-toggle`, closing `main.js`); in the sidebar convert the 3 master-data coming-soon items (الموردون, العملاء التجاريون, الحسابات البنكية) to live `<a>` links and mark `<a class="sidebar-link active" href="vendors.html" aria-current="page">الموردون</a>` active. Add the header (`.page-title-wrap` eyebrow "البيانات الأساسية · الموردون", title "الموردون", subtitle "إدارة الموردين المرتبطين بمصروفات وفواتير العملاء"), client selector `.select-wrap`/`.select` (4 Arabic clients), and "إضافة مورد" `.btn.btn-primary` `data-open="#addVendorModal"`. Add the `.kpi-row` of 4 `.card kpi`: إجمالي الموردين 34 (`.kpi-ico-primary`), موردون نشطون 29 (`.kpi-ico-green`), فواتير هذا الشهر 18 (`.kpi-ico-amber`), موردون بدون رقم ضريبي 3 (`.kpi-ico-rose`).
- [x] T005 [US1] In `pages/vendors.html` add the filter bar (`.filters`: a search input labelled بحث + 3 `.filter`/`.filter-select` — الحالة، الدولة، خاضع للضريبة) and the vendors table (`.card` > `.table-wrap` > `table.docs`): `<thead>` 9 columns (اسم المورد، الرقم الضريبي، الدولة، الهاتف، البريد، إجمالي الفواتير، آخر تعامل، الحالة، إجراء) and `<tbody>` the 8 rows from `data-model.md` (status `.chip.green` نشط / `.chip.slate` موقوف; "—" + subtle `.chip.amber` for the 2 missing-tax rows; إجراء = `.btn.btn-outline.btn-sm` عرض/تعديل). Optional `.tbl-foot`.
- [x] T006 [US1] In `pages/vendors.html` add the add-vendor modal `<div class="scrim" data-overlay id="addVendorModal" hidden>` > `.modal` (`.modal-head` "إضافة مورد جديد" + `data-close`; `.modal-body` `.fields-grid` with 7 `.field` — اسم المورد `.input`, الرقم الضريبي `.input`, الدولة `.select-wrap`/`.select`, الهاتف `.input`, البريد `.input` type=email, العنوان `.input`, ملاحظات `<textarea class="input">`; `.modal-foot` "حفظ المورد" `.btn.btn-primary` + "إلغاء" `.btn.btn-outline` `data-close`).
- [x] T007 [US1] Verify `pages/vendors.html` per `quickstart.md` checks (a)(b)(e)(f)(h)(i)(j): RTL + assets, one active sidebar item, ≥1 `data-overlay`, 9 `<th>`, rogue-class sweep clean, no console errors.

**Checkpoint**: US1 vendors page complete and independently demoable.

---

## Phase 4: User Story 2 - Manage Commercial Customers (Priority: P2)

**Goal**: A complete `pages/commercial-customers.html` per contract C2.

**Independent Test**: Open `pages/commercial-customers.html`; header makes clear these are the client company's customers; 4 KPI cards (52/47/26/5); 9-column table with 8 rows; "إضافة عميل" opens a 6-field modal; no console errors.

**Depends on**: Phase 2. Independent of US1/US3 (different file).

- [x] T008 [P] [US2] Create `pages/commercial-customers.html` (clone shell as in T004), sidebar `<a class="sidebar-link active" href="commercial-customers.html" aria-current="page">العملاء التجاريون</a>` active. Header: eyebrow "البيانات الأساسية · عملاء الشركة", title "عملاء الشركة", subtitle "إدارة العملاء التجاريين المرتبطين بفواتير المبيعات" (wording must make clear these are the client company's customers, not platform clients); client selector; "إضافة عميل" `.btn.btn-primary` `data-open="#addCustomerModal"`. `.kpi-row` of 4: إجمالي العملاء التجاريين 52 (`.kpi-ico-primary`), عملاء نشطون 47 (`.kpi-ico-green`), مبيعات هذا الشهر 26 (`.kpi-ico-amber`), عملاء بدون رقم ضريبي 5 (`.kpi-ico-rose`).
- [x] T009 [US2] In `pages/commercial-customers.html` add an (optional, for consistency) filter bar (search + الحالة + الدولة `.filter-select`) and the customers table (`table.docs`): 9 columns (اسم العميل التجاري، الرقم الضريبي، الدولة، الهاتف، البريد، إجمالي المبيعات، آخر فاتورة، الحالة، إجراء) and the 8 rows from `data-model.md` (status chips; "—" tax rows; إجراء buttons).
- [x] T010 [US2] In `pages/commercial-customers.html` add the add-customer modal `<div class="scrim" data-overlay id="addCustomerModal" hidden>` with 6 `.field` (الاسم، الرقم الضريبي، الدولة `.select-wrap`/`.select`، الهاتف، البريد، العنوان) + `.modal-foot` "حفظ العميل" `.btn.btn-primary` + "إلغاء" `.btn.btn-outline` `data-close`.
- [x] T011 [US2] Verify `pages/commercial-customers.html` per `quickstart.md` checks (a)(b)(e)(f)(h)(i)(j): RTL + assets, one active sidebar item, ≥1 `data-overlay`, 9 `<th>`, rogue-class sweep clean.

**Checkpoint**: US2 commercial-customers page complete.

---

## Phase 5: User Story 3 - Manage Bank / Cash / Wallet Accounts (Priority: P2)

**Goal**: A complete `pages/bank-accounts.html` per contract C3.

**Independent Test**: Open `pages/bank-accounts.html`; 4 KPI cards (9/5/2/2); 9-column table with 7 rows covering بنك/خزنة/محفظة إلكترونية (cash/wallet show "—" for bank/IBAN); "إضافة حساب" opens an 8-field modal incl. the النوع choice; no console errors.

**Depends on**: Phase 2. Independent of US1/US2 (different file).

- [x] T012 [P] [US3] Create `pages/bank-accounts.html` (clone shell as in T004), sidebar `<a class="sidebar-link active" href="bank-accounts.html" aria-current="page">الحسابات البنكية</a>` active. Header: eyebrow "البنوك · الحسابات والخزائن", title "الحسابات البنكية والخزنة", subtitle "إدارة حسابات البنوك والخزائن والمحافظ الإلكترونية لكل عميل"; client selector; "إضافة حساب" `.btn.btn-primary` `data-open="#addAccountModal"`. `.kpi-row` of 4: إجمالي الحسابات 9 (`.kpi-ico-primary`), بنوك 5 (`.kpi-ico-green`), خزائن 2 (`.kpi-ico-amber`), محافظ إلكترونية 2 (`.kpi-ico-slate`).
- [x] T013 [US3] In `pages/bank-accounts.html` add the accounts table (`table.docs`): 9 columns (اسم الحساب، النوع، البنك، IBAN / رقم الحساب، العملة، الرصيد الافتتاحي، آخر كشف حساب، الحالة، إجراء) and the 7 rows from `data-model.md` covering all 3 types; النوع chips `.chip.green` بنك / `.chip.amber` خزنة / `.chip.slate` محفظة إلكترونية; cash/wallet rows show "—" for البنك and IBAN; status `.chip.green` نشط / `.chip.slate` مغلق; إجراء buttons.
- [x] T014 [US3] In `pages/bank-accounts.html` add the add-account modal `<div class="scrim" data-overlay id="addAccountModal" hidden>` with 8 `.field`: اسم الحساب `.input`, النوع `.select-wrap`/`.select` (بنك / خزنة / محفظة إلكترونية), البنك `.input`, رقم الحساب / IBAN `.input`, العملة `.select-wrap`/`.select`, الرصيد الافتتاحي `.input` type=number, تاريخ الرصيد `.input` type=date, ملاحظات `<textarea class="input">`; `.modal-foot` "حفظ الحساب" `.btn.btn-primary` + "إلغاء" `.btn.btn-outline` `data-close`.
- [x] T015 [US3] Verify `pages/bank-accounts.html` per `quickstart.md` checks (a)(b)(e)(f)(h)(i)(j): RTL + assets, one active sidebar item, ≥1 `data-overlay`, 9 `<th>`, all 3 account types present, rogue-class sweep clean.

**Checkpoint**: US3 bank-accounts page complete.

---

## Phase 6: User Story 4 - Integrate Pages into Navigation (Priority: P3)

**Goal**: All 3 pages live across the project — sidebar + `index.html`.

**Independent Test**: From any page, the 3 sidebar items are live links; `index.html` shows all 3 as live cards with footer "28 شاشة مكتملة + 9 وحدة قادمة"; every page has exactly one active sidebar item.

**Depends on**: US1 + US2 + US3 (all 3 pages must exist before links are valid).

- [x] T016 [US4] Convert the 3 coming-soon sidebar spans (الموردون, العملاء التجاريون, الحسابات البنكية) to live `<a class="sidebar-link" href="vendors.html|commercial-customers.html|bank-accounts.html">` across all 25 existing `pages/*.html` via a Python script (same pattern as Spec 005): preserve each `.sl-ico` SVG, remove the `<span class="sl-soon">قريباً</span>`. Other coming-soon items unchanged.
- [x] T017 [P] [US4] In `index.html` convert the 3 `<div class="landing-card is-soon">` (الموردون ~line 384, العملاء التجاريون ~391, الحسابات البنكية ~412) to live `<a class="landing-card" href="pages/vendors.html|commercial-customers.html|bank-accounts.html">` with a `.go "فتح الصفحة"`; update chip `12 وحدة` → `9 وحدة` and footer `25 شاشة مكتملة + 12 وحدة قادمة` → `28 شاشة مكتملة + 9 وحدة قادمة`.
- [x] T018 [US4] Verify navigation per `quickstart.md` checks (d)(g)(k): all 3 modules linked from 28 pages, no `is-soon` element is an `<a>`, `index.html` shows "28 شاشة مكتملة" / "9 وحدة", page count = 28, one active sidebar item per page.

**Checkpoint**: SC-006, SC-007 satisfied; all 3 pages integrated.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Full audit (incl. rogue-class sweep) + responsive QA + Definition of Done.

- [x] T019 [P] Run the complete static audit `quickstart.md` §3 checks (a)–(k), **including (j) the rogue-class sweep** — confirm zero undefined classes on all 3 pages.
- [x] T020 [P] Manual responsive QA on all 3 pages at mobile width: sidebar toggles, KPI cards stack, tables scroll horizontally, filter bar wraps, modals fit and scroll, forms don't overflow; no console errors.
- [x] T021 Final Definition of Done per `quickstart.md` §5: confirm SC-001…SC-007 hold; rebuild `npm run build:css` only if `assets/css/input.css` changed (none expected); confirm no existing page, section, link, or asset path was removed or broken.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)** → **Foundational (Phase 2)** → user stories.
- **US1 (Phase 3) ∥ US2 (Phase 4) ∥ US3 (Phase 5)**: each builds a different page file → fully parallelizable after Phase 2.
- **US4 (Phase 6)**: after US1+US2+US3 (all pages must exist). T016 (sidebars) and T017 (`index.html`) touch different files → T017 is `[P]`.
- **Polish (Phase 7)**: after US4.

### User Story Dependencies

- **US1 (P1)**, **US2 (P2)**, **US3 (P2)**: independent — each one page file.
- **US4 (P3)**: needs US1 + US2 + US3.

### Parallel Opportunities

```bash
# After Phase 2, build all 3 pages concurrently (different files):
Task: "Build pages/vendors.html (T004–T007)"               # US1
Task: "Build pages/commercial-customers.html (T008–T011)"  # US2
Task: "Build pages/bank-accounts.html (T012–T015)"         # US3
```
Within each story the 4 tasks are sequential (same file). T019 ∥ T020 in Polish.

### Within Each Story

- US1: T004 (shell+header+KPIs) → T005 (filters+table) → T006 (modal) → T007 (verify)
- US2: T008 (shell+header+KPIs) → T009 (table) → T010 (modal) → T011 (verify)
- US3: T012 (shell+header+KPIs) → T013 (table) → T014 (modal) → T015 (verify)
- US4: T016 (sidebars) → T017 (index, ∥) → T018 (verify)

---

## Implementation Strategy

### MVP First (US1 only)

1. Phase 1 → Phase 2 → Phase 3 (US1). Delivers `vendors.html` — the representative master-data page.

### Incremental Delivery

1. Setup + Foundational.
2. US1 ∥ US2 ∥ US3 → all 3 master-data pages exist (build `vendors.html` fully first, then derive the other two by swapping KPIs/columns/data/modal fields).
3. US4 → navigation integration across all 28 pages.
4. Polish: full audit (incl. rogue-class sweep) + responsive QA + DoD.

### Notes

- **[P]** = different files, no dependencies.
- **Zero-new-CSS is mandatory** — copy markup from `clients.html`; do NOT use `.btn-rose`; the Polish rogue-class sweep (T019/check j) is the gate.
- Modals are authored in HTML; JS only opens/closes them (FR-017) — handled by existing `initOverlays()`; filters are visual-only via `initFilterSelects()`. No `main.js`/CSS change.
- All KPI numbers/totals are static demo values (no computation).
- Rebuild `output.css` only if `input.css` changed (none expected).
