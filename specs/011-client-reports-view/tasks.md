---
description: "Task list for Client Reports View (Spec 011)"
---

# Tasks: Client Reports View (Spec 011)

**Input**: Design documents from `specs/011-client-reports-view/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/page-contracts.md, quickstart.md

**Tests**: Not requested. Verification is the documented manual + scriptable **audit** in `quickstart.md` §3–§5 (incl. (j) rogue-class sweep, (g) balanced-sidebar + zero-is-soon, (k) **client-internals keyword scan**, no-`.btn-rose`). No TDD/unit-test tasks.

**Build type**: Net-new — 1 **client-facing** page. **Hard rules (Specs 004–010 lessons):** use only classes defined in `assets/css/output.css`; **copy KPI / filter / form markup VERBATIM** from the named reference pages (the amber chip is `.chip.amber` NOT `.chip-amber`; the real card classes are `.kpi-num`/`.kpi-lbl`/`.kpi-help`); **do NOT use `.btn-rose`** (purged → `.btn-amber`/`.btn-outline`). **Sidebar wiring MUST use the label-based line fixer** — NEVER a spanning/DOTALL regex. **Principle V (defining):** clone the CLIENT shell (MOHASEBATY brand + `.client-pill`); ZERO accounting internals (no مدين/دائن/قيود/ترحيل/شجرة الحسابات/account codes); estimates labelled "تقديري".

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: US1–US2 (Setup, Foundational, Polish carry no story label)
- Exact file paths included in every task

## Path Conventions

Static multi-page frontend at repo root: `index.html`, `pages/*.html`, `assets/css/output.css`, `assets/js/main.js`. No `src/`/`tests/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Capture the exact approved markup so the page reuses shared classes (zero new CSS) and the correct CLIENT chrome.

- [x] T001 [P] Read reference markup: `pages/client-documents.html` (CLIENT shell: MOHASEBATY brand + `.header-right` `.client-pill`, `.page-title-wrap`), `pages/client-dashboard.html` (the `.kpi-grid` > `.card kpi` inner markup: `.kpi-top`/`.kpi-ico`/`.kpi-num`/`.kpi-lbl`/`.kpi-help`), `pages/accountant-inbox.html` (`.filters`/`.filter`/`.filter-select`), `pages/settings.html` (`.set-body`/`.set-row`/`.info`), `pages/client-onboarding.html` (`.field`/`.select-wrap`/`textarea` form), `pages/client-document-details.html` (the `.note` gold callout) (read-only).
- [x] T002 Confirm the zero-new-CSS catalog: grep `assets/css/output.css` for every class named in `contracts/page-contracts.md` C1 (esp. `.kpi-grid`, `.kpi-num`, `.kpi-lbl`, `.kpi-help`, `.filter-select`, `.client-pill`, `.note`, `.set-row`, `.select-wrap`, `.chip.amber`); confirm each is DEFINED and that **`.btn-rose` and `.chip-amber` are NOT used** (read-only).

**Checkpoint**: Reference markup captured; class catalog confirmed.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Confirm shared JS covers every interaction so no `main.js` change is needed.

- [x] T003 Confirm `assets/js/main.js` `boot()` registers `initFilterSelects()` (the 3 `.filter-select` dropdowns). The request form is static (`<select>`/`<textarea>`, no submit). No changes if present (read-only).

**Checkpoint**: JS foundation confirmed.

---

## Phase 3: User Story 1 - See My Simplified Reports & Summaries (Priority: P1) 🎯 MVP

**Goal**: A complete, client-facing `pages/client-reports.html` per contract C1.

**Independent Test**: Open `pages/client-reports.html`; CLIENT header (MOHASEBATY + client-pill) with title "تقاريري" + تحميل/طلب actions; 3 simple filters; 5 summary cards (estimates labelled "تقديري"); 5-column reports table with 4 example reports + 3 statuses; status-explanations card; gold `.note` tax disclaimer; request-report card; NO accounting jargon; no console errors.

**Depends on**: Phase 2.

- [x] T004 [US1] Create `pages/client-reports.html`: clone the CLIENT shell from `pages/client-documents.html` (doctype, head — `<title>تقاريري · منصة محاسبتي</title>` —, MOHASEBATY brand, full sidebar, `.header-right` `.client-pill`, closing `main.js`); deactivate the inherited client-documents active sidebar link; mark `<a class="sidebar-link active" href="client-reports.html" aria-current="page">تقارير العميل</a>`. Header (`.page-title-wrap` title "تقاريري", subtitle "ملخصات وتقارير مبسطة عن مستنداتك المالية") + actions "تحميل آخر تقرير" `.btn.btn-outline` + "طلب تقرير" `.btn.btn-primary` (href="#request"). Add the `.filters` bar with 3 `.filter` (`<label>` + `.filter-select` + `.chev`): الفترة (هذا الشهر), نوع التقرير (كل التقارير), الحالة (كل الحالات).
- [x] T005 [US1] In `pages/client-reports.html` add: (a) the summary `.kpi-grid` with 5 `.card kpi` copied from `client-dashboard.html` (`.kpi-top`/`.kpi-ico .kpi-ico-*` + `.kpi-num` + `<div>`(`.kpi-lbl` + `.kpi-help`)): إجمالي الإيرادات المرفوعة 512,000 ﷼ (green), إجمالي المصروفات المرفوعة 318,500 ﷼ (amber), صافي تقديري 193,500 ﷼ (primary, help "تقديري — قد يتغير بعد المراجعة"), الضريبة التقديرية 29,025 ﷼ (slate, help "تقديري حتى اعتماد التقرير"), مستندات قيد المراجعة 12 (amber, help "يراجعها فريق المحاسبة الآن"). (b) open the `.layout`; in MAIN add the reports `.card` > `.table-wrap` > `table.docs` with `<thead>` EXACTLY 5 columns (اسم التقرير، الفترة، الحالة، آخر تحديث، إجراء) and `<tbody>` the 5 rows from `data-model.md` (status `.chip`: مبدئي amber / معتمد green / يحتاج مستندات slate; إجراء = `.btn.btn-outline.btn-sm` "تحميل", or "رفع المستندات" → upload-document.html for the يحتاج-مستندات row).
- [x] T006 [US1] In `pages/client-reports.html`: (a) MAIN — add the status-explanations `.card` (`.card-head` "ماذا تعني حالات التقارير؟" + `.set-body` of 3 `.set-row`, each pairing a status `.chip` with its plain description: مبدئي→"قد يتغير بعد مراجعة المستندات", معتمد→"تمت مراجعته من فريق المحاسبة", يحتاج مستندات→"هناك مستندات مطلوبة لاستكمال التقرير") + the tax `.note` (info icon + "الأرقام الضريبية تقديرية حتى اعتماد التقرير من فريق المحاسبة."). (b) SIDE (`.side`) — add the request-report `.card` `id="request"` `.card-head` "طلب تقرير جديد" with 3 `.field`: نوع التقرير (`.select-wrap`/`.select`), الفترة (`.select-wrap`/`.select`), ملاحظات (`<textarea class="input">`) + an "إرسال الطلب" `.btn.btn-primary`.
- [x] T007 [US1] Verify `pages/client-reports.html` per `quickstart.md` checks (a)(b)(e)(f)(h: 5 `card kpi`, 5 `<th>`, 3 filters, textarea, .note)(i: client-pill + no btn-rose)(j rogue sweep)(**k client-internals keyword scan = ZERO**): RTL + assets, one active sidebar item, no undefined classes, no accounting-internal terms, no console errors.

**Checkpoint**: US1 client-reports page complete.

---

## Phase 4: User Story 2 - Reach My Reports from the Portal (Priority: P3)

**Goal**: The page reachable across the project — sidebar (last coming-soon → live) + `index.html` (0 coming-soon) + client dashboard/documents links.

**Independent Test**: From any page, "تقارير العميل" is a live sidebar link; `index.html` shows it as a live card with NO "قريباً" anywhere + footer "37 شاشة مكتملة"; `client-dashboard.html` and `client-documents.html` link to it; every page has exactly one active sidebar item; all sidebars tag-balanced.

**Depends on**: US1 (page must exist).

- [x] T008 [US2] Convert the LAST coming-soon sidebar span (تقارير العميل → `client-reports.html`) to a live `<a class="sidebar-link">` across all 36 existing `pages/*.html` using the **LABEL-BASED LINE FIXER** (Python: find the line equal to `<span>تقارير العميل</span>`, walk back to the nearest `class="sidebar-link"` wrapper line and rewrite to `<a class="sidebar-link" href="client-reports.html">`, walk forward to the nearest standalone `</a>`/`</span>` and rewrite to `</a>`, drop the `<span class="sl-soon">قريباً</span>` line, set active where href==basename). **Do NOT use a spanning/DOTALL regex.** Preserve the `.sl-ico` SVG. After this, ZERO is-soon sidebar items remain app-wide.
- [x] T009 [P] [US2] In `index.html` convert the LAST `<div class="landing-card is-soon">` (تقارير العميل ~line 398) to a live `<a class="landing-card" href="pages/client-reports.html">` with `.go "فتح الصفحة"`; remove `is-soon` from its `landing-grid` wrapper if present so the card is not dimmed; update the counter chip to `0 وحدة` (or remove it) and the footer `36 شاشة مكتملة + 1 وحدة قادمة` → `37 شاشة مكتملة` (drop the coming-soon clause). Confirm `grep -c 'landing-card is-soon' index.html` = 0 afterwards.
- [x] T010 [US2] Add non-destructive contextual `<a>` links → `client-reports.html` ("تقاريري") in `pages/client-dashboard.html` and `pages/client-documents.html` (header action or a relevant body card). Remove no existing content. (Runs after T008 since those files are also touched by the sidebar fixer.)
- [x] T011 [US2] Verify navigation per `quickstart.md` checks (d)(g)(l)(m): تقارير العميل linked from 37 pages, **all 37 sidebars tag-balanced and ZERO is-soon (g)**, no `is-soon` `<a>`, `index.html` shows "37 شاشة مكتملة" with 0 `landing-card is-soon`, page count = 37, contextual links resolve, one active sidebar item per page.

**Checkpoint**: SC-006, SC-007 satisfied; page integrated; app shows 0 coming-soon.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Full audit (incl. rogue + balanced-sidebar + client-internals) + responsive QA + Definition of Done.

- [x] T012 [P] Run the complete static audit `quickstart.md` §3 checks (a)–(m), **including (j) rogue-class sweep, (g) balanced sidebars + zero is-soon across all 37 pages, and (k) the client-internals keyword scan = ZERO** — confirm zero undefined classes, zero unbalanced sidebars, zero accounting internals.
- [x] T013 [P] Manual responsive QA on `pages/client-reports.html` at mobile width: sidebar toggles, the `.layout` collapses (request card stacks under main), the reports table scrolls, the 5 summary cards stack, the `.note` and form render; no console errors.
- [x] T014 Final Definition of Done per `quickstart.md` §5: confirm SC-001…SC-007 hold; rebuild `npm run build:css` only if `assets/css/input.css` changed (none expected); confirm no existing page, section, link, or asset path was removed or broken; confirm `index.html` shows NO "قريباً" anywhere and the app is at 37 complete screens / 0 coming-soon.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)** → **Foundational (Phase 2)** → **US1 (Phase 3)** → **US2 (Phase 4)** → **Polish (Phase 5)**.
- US1 builds the single page (sequential, same file). US2 wires navigation after the page exists. T009 (`index.html`) is `[P]` vs T008/T010 (pages).

### User Story Dependencies

- **US1 (P1)**: the page — independent, MVP.
- **US2 (P3)**: needs US1 (page must exist).

### Parallel Opportunities

Single page → US1 tasks are sequential (same file). In US2, T009 (index) ∥ T008 (sidebars). In Polish, T012 ∥ T013.

### Within Each Story

- US1: T004 (shell+header+filters) → T005 (summary + reports table) → T006 (status + note + request card) → T007 (verify incl. client-internals scan)
- US2: T008 (sidebars) → T009 (index, ∥) → T010 (contextual links) → T011 (verify)

---

## Implementation Strategy

### MVP First (US1 only)

1. Phase 1 → Phase 2 → Phase 3 (US1). Delivers `client-reports.html` — the client-facing reports page.

### Incremental Delivery

1. Setup + Foundational.
2. US1 → the page exists and passes the client-internals gate.
3. US2 → sidebar + index + contextual integration; app reaches 0 coming-soon.
4. Polish: full audit (incl. rogue + balanced-sidebar + client-internals) + responsive QA + DoD.

### Notes

- **Zero-new-CSS is mandatory**; copy KPI/filter/form markup verbatim; the amber chip is `.chip.amber`; do NOT use `.btn-rose`; the Polish rogue-class sweep (T012/check j) is the gate.
- **Sidebar fixer is label-based, never a spanning regex** — T011/T012 add the balanced-sidebar + zero-is-soon check (g).
- **Principle V is the defining gate**: clone the CLIENT shell; the client-internals keyword scan (T007 + T012/check k) MUST be zero.
- The request form and filters reuse existing JS; no `main.js`/CSS change.
- Rebuild `output.css` only if `input.css` changed (none expected).
