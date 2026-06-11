---
description: "Task list for Document Categories & Approval Workflow (Spec 009)"
---

# Tasks: Document Categories & Approval Workflow (Spec 009)

**Input**: Design documents from `specs/009-categories-approval-workflow/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/page-contracts.md, quickstart.md

**Tests**: Not requested. Verification is the documented manual + scriptable **audit** in `quickstart.md` §3–§5 (incl. check (j) rogue-class sweep, (g) balanced-sidebar-tags, (h) steps/switch/no-`.btn-rose`). No TDD/unit-test tasks.

**Build type**: Net-new — 2 pages. **Hard rule (Specs 004–008 lessons):** use only classes defined in `assets/css/output.css`; copy markup from the named reference pages; **do NOT use `.btn-rose`** (purged → `.btn-amber`/`.btn-outline`). **Sidebar wiring MUST use the label-based line fixer** (locate the `<span>LABEL</span>` line, rewrite its immediate wrapper) — NEVER a spanning/DOTALL regex (that bug scrambled the sidebar in Spec 008 and had to be reverted).

**Organization**: Tasks grouped by the 3 user stories. US1/US2 each build a different page file (parallelizable); US3 wires navigation (needs both).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: US1–US3 (Setup, Foundational, Polish carry no story label)
- Exact file paths included in every task

## Path Conventions

Static multi-page frontend at repo root: `index.html`, `pages/*.html`, `assets/css/output.css`, `assets/js/main.js`. No `src/`/`tests/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Capture the exact approved markup so both pages reuse shared classes (zero new CSS).

- [x] T001 [P] Read reference markup: `pages/client-tax-settings.html` (`.layout`/`.side` + the `.seg`/`data-country-select` toggle pattern), `pages/settings.html` (`.set-body`/`.set-row`/`.ctrl` + `.switch`/`.track` ~319–326), `pages/data-import.html` (the `.steps`/`.step-item`/`.si-num` 4-step visual), `pages/journal-entries.html` (`#manualEntryModal` `.scrim`/`.modal-*`/`.field`), and `pages/clients.html` (`table.docs`, `.kpi-row`) (read-only).
- [x] T002 Confirm the zero-new-CSS catalog: grep `assets/css/output.css` for every class named in `contracts/page-contracts.md` C1–C3 (esp. `.layout`, `.side`, `.seg`, `.seg-tabs`, `.switch`, `.track`, `.set-row`, `.steps`, `.step-item`, `.si-num`, `.scrim`, `.docs`, `.chip`, `.btn-amber`); confirm each is DEFINED and that **`.btn-rose` is NOT used** (purged) (read-only).

**Checkpoint**: Reference markup captured; class catalog confirmed.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Confirm shared JS covers every interaction so no `main.js` change is needed.

- [x] T003 Confirm `assets/js/main.js` registers `initOverlays()` (`data-open`/`data-close`/`data-overlay` — the 2 add modals) and `initSingleSelect()` (`.seg` group + global-template toggles) in `boot()`. Switches are static checkboxes. No changes if present (read-only).

**Checkpoint**: JS foundation confirmed.

---

## Phase 3: User Story 1 - Manage Document Categories (Priority: P1) 🎯 MVP

**Goal**: A complete `pages/document-categories.html` per contract C1.

**Independent Test**: Open `pages/document-categories.html`; client selector + global-template `.seg` toggle; group `.seg` filter (الكل/إيرادات/مصروفات/قبض/صرف); 8-column table with 12 rows incl. an unlinked "—" row, a "مخفي" row, a "يحتاج مراجعة" row; "إضافة تصنيف" opens a 7-field modal; usage card with 3 insights; no console errors.

**Depends on**: Phase 2.

- [x] T004 [P] [US1] Create `pages/document-categories.html`: clone the shell from `pages/journal-entries.html` (doctype, head — title "تصنيفات المستندات · منصة محاسبتي" —, full sidebar, `.mobile-nav-toggle`, closing `main.js`); convert the 2 governance coming-soon sidebar items (تصنيفات المستندات, سير الاعتماد) to live `<a>` links and mark `<a class="sidebar-link active" href="document-categories.html" aria-current="page">تصنيفات المستندات</a>` active. Header (`.page-title-wrap` eyebrow "الإعداد المحاسبي · التصنيفات", title "تصنيفات المستندات", subtitle "اربط أنواع المستندات بالحسابات والضريبة وطريقة ظهورها للعميل"), client selector `.select-wrap`/`.select`, a `.seg` global-template toggle (قالب عام / خاص بالعميل), and "إضافة تصنيف" `.btn.btn-primary` `data-open="#addCategoryModal"`. Wrap the body in `.layout`.
- [x] T005 [US1] In `pages/document-categories.html` (`.layout` MAIN) add a group `.seg`/`.seg-tabs` (الكل / تصنيفات الإيرادات / المصروفات / القبض / الصرف) and the categories `.card` > `.table-wrap` > `table.docs`: `<thead>` 8 columns (اسم التصنيف، النوع، الحساب المرتبط، خاضع للضريبة؟، نسبة الضريبة الافتراضية، يظهر للعميل؟، الحالة، إجراء) and `<tbody>` the 12 rows from `data-model.md` (النوع `.chip`; خاضع/يظهر `.chip.green` نعم / `.chip.slate` لا/مخفي; unlinked account "—" + `.chip.amber`; status `.chip.green` نشط / `.chip.slate` معطّل / `.chip.amber` يحتاج مراجعة; إجراء `.btn.btn-outline.btn-sm` تعديل).
- [x] T006 [US1] In `pages/document-categories.html` add: (a) the usage card in `.layout` `.side` (`.card` `.card-head` "استخدام التصنيفات" + `.set-body` of 3 `.set-row`: أكثر التصنيفات استخدامًا "مبيعات خدمات · 312", تصنيفات غير مرتبطة بحساب `.chip.amber` 2, تصنيفات تحتاج مراجعة ضريبية `.chip.amber` 2, each + "عرض" link); (b) the add-category modal `<div class="scrim" data-overlay id="addCategoryModal" hidden>` with 7 `.field` (اسم التصنيف `.input`, نوع الحركة `.select-wrap`/`.select`, الحساب المرتبط `.select-wrap`/`.select`, خاضع للضريبة `<label class="switch"><input type="checkbox"><span class="track"></span></label>`, نسبة الضريبة `.select-wrap`/`.select` [15%/0%/غير خاضع], يظهر للعميل `.switch`, ملاحظات `<textarea class="input">`) + `.modal-foot` "حفظ التصنيف" `.btn.btn-primary` + "إلغاء" `.btn.btn-outline` `data-close`.
- [x] T007 [US1] Verify `pages/document-categories.html` per `quickstart.md` checks (a)(b)(e)(f)(i 8 `<th>`)(j rogue sweep): RTL + assets, one active sidebar item, 8 columns, no undefined classes, no `.btn-rose`, no console errors.

**Checkpoint**: US1 categories page complete.

---

## Phase 4: User Story 2 - Configure the Approval Workflow (Priority: P1)

**Goal**: A complete `pages/approval-workflow.html` per contract C2.

**Independent Test**: Open `pages/approval-workflow.html`; 3 workflow switches (2 on, 1 off); the 4-step `.steps` visual; 6-column rules table with the 5 example rules (incl. a "يحتاج إكمال" rule with "—" final approver); "إضافة قاعدة" opens a 5-field modal; pending-approvals side card (7/2/1); no console errors.

**Depends on**: Phase 2. Independent of US1 (different file).

- [x] T008 [P] [US2] Create `pages/approval-workflow.html` (clone shell as in T004), sidebar `<a class="sidebar-link active" href="approval-workflow.html" aria-current="page">سير الاعتماد</a>` active. Header: eyebrow "الحوكمة · مسار الاعتماد", title "مسار الاعتماد", subtitle "حدد خطوات المراجعة والاعتماد قبل الترحيل أو إصدار التقارير", "إضافة قاعدة" `.btn.btn-primary` `data-open="#addRuleModal"`. Wrap body in `.layout`. In MAIN add: (a) the workflow-toggles `.card` > `.set-body` with 3 `.set-row` (`.info` + `.ctrl` `.switch`/`.track`): هل الترحيل يحتاج اعتماد؟ (checked), هل التقارير تحتاج اعتماد مدير؟ (checked), هل العميل يرى التقارير المبدئية؟ (unchecked); (b) the 4-step `.card` > `.steps` visual (copy markup from `data-import.html`): 1 رفع المستند، 2 مراجعة المحاسب، 3 اعتماد المدير، 4 الترحيل للحسابات.
- [x] T009 [US2] In `pages/approval-workflow.html` (`.layout` MAIN) add the approval-rules `.card` > `.table-wrap` > `table.docs`: `<thead>` 6 columns (نوع العملية، الشرط، المراجع الأول، المعتمد النهائي، الحالة، إجراء) and `<tbody>` the 5 rows from `data-model.md` (status `.chip.green` مفعّلة / `.chip.slate` معطّلة / `.chip.amber` يحتاج إكمال; the إعادة فتح rule shows "—" final approver + يحتاج إكمال; إجراء `.btn.btn-outline.btn-sm` تعديل).
- [x] T010 [US2] In `pages/approval-workflow.html` add: (a) the pending-approvals card in `.layout` `.side` (`.card` `.card-head` "بانتظار الاعتماد" + `.set-body` of 3 `.set-row`: مستندات تنتظر اعتماد `.chip.amber` 7 → accountant-inbox.html, تقارير تنتظر اعتماد `.chip.amber` 2 → vat-report.html, فترات تنتظر إغلاق `.chip.amber` 1 → fiscal-periods.html); (b) the add-rule modal `<div class="scrim" data-overlay id="addRuleModal" hidden>` with 5 `.field` (اسم القاعدة `.input`, نوع العملية `.select-wrap`/`.select`, الشرط المالي `.input`, المستخدم/الدور المسؤول `.select-wrap`/`.select`, الحالة `.select-wrap`/`.select`) + `.modal-foot` "حفظ القاعدة" `.btn.btn-primary` + "إلغاء" `.btn.btn-outline` `data-close`.
- [x] T011 [US2] Verify `pages/approval-workflow.html` per `quickstart.md` checks (a)(b)(e)(f)(h `.steps`=1 & `.switch`>=3 & `.btn-rose`=0)(i 6 `<th>`)(j rogue sweep): RTL + assets, one active sidebar item, the 4-step visual + 3 switches present, no undefined classes, no console errors.

**Checkpoint**: US2 approval-workflow page complete.

---

## Phase 5: User Story 3 - Integrate Pages into Navigation (Priority: P3)

**Goal**: Both pages live across the project — sidebar + `index.html` + contextual links.

**Independent Test**: From any page, the 2 sidebar items are live links; `index.html` shows both as live cards with footer "34 شاشة مكتملة + 3 وحدة قادمة"; `settings.html` and `document-review.html` link to the new pages; every page has exactly one active sidebar item; all sidebars are tag-balanced.

**Depends on**: US1 + US2 (both pages must exist).

- [x] T012 [US3] Convert the 2 coming-soon sidebar spans (تصنيفات المستندات → `document-categories.html`, سير الاعتماد → `approval-workflow.html`) to live `<a class="sidebar-link">` across all 32 existing `pages/*.html` using the **LABEL-BASED LINE FIXER** (Python: for each page, find the line equal to `<span>LABEL</span>`, walk back to the nearest preceding `class="sidebar-link"` wrapper line and rewrite it to `<a class="sidebar-link" href="HREF">`, walk forward to the nearest standalone `</a>`/`</span>` and rewrite to `</a>`, and drop the `<span class="sl-soon">قريباً</span>` line). **Do NOT use a spanning/DOTALL regex** (it over-matches and scrambles the sidebar). Preserve each `.sl-ico` SVG.
- [x] T013 [P] [US3] In `index.html` convert the 2 `<div class="landing-card is-soon">` (تصنيفات المستندات ~line 290, سير الاعتماد ~line 437) to live `<a class="landing-card" href="pages/document-categories.html|approval-workflow.html">` with `.go "فتح الصفحة"`; update chip `5 وحدة` → `3 وحدة` and footer `32 شاشة مكتملة + 5 وحدة قادمة` → `34 شاشة مكتملة + 3 وحدة قادمة`.
- [x] T014 [US3] Add non-destructive contextual `<a>` links: in `pages/settings.html` → `document-categories.html` ("تصنيفات المستندات") AND `approval-workflow.html` ("مسار الاعتماد"); in `pages/document-review.html` → `document-categories.html` ("تصنيفات المستندات"). Remove no existing content. (Runs after T012 since those files are also touched by the sidebar fixer.)
- [x] T015 [US3] Verify navigation per `quickstart.md` checks (d)(g)(k): both modules linked from 34 pages, **all 34 sidebars tag-balanced (g)**, no `is-soon` `<a>`, `index.html` shows "34 شاشة مكتملة" / "3 وحدة", page count = 34, contextual links resolve, one active sidebar item per page.

**Checkpoint**: SC-007, SC-008 satisfied; both pages integrated; sidebar still well-formed.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Full audit (incl. rogue-class sweep + balanced-sidebar) + responsive QA + Definition of Done.

- [x] T016 [P] Run the complete static audit `quickstart.md` §3 checks (a)–(k), **including (j) rogue-class sweep, (g) balanced sidebars across all 34 pages, and (h) `.steps`/`.switch`/no-`.btn-rose`** — confirm zero undefined classes and zero unbalanced sidebars.
- [x] T017 [P] Manual responsive QA on both pages at mobile width: sidebar toggles, the `.layout` collapses (side card stacks under main), tables scroll, the `.steps` visual stacks, switches and modals render, forms don't overflow; no console errors.
- [x] T018 Final Definition of Done per `quickstart.md` §5: confirm SC-001…SC-008 hold; rebuild `npm run build:css` only if `assets/css/input.css` changed (none expected); confirm no existing page, section, link, or asset path was removed or broken.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)** → **Foundational (Phase 2)** → user stories.
- **US1 (Phase 3) ∥ US2 (Phase 4)**: different page files → parallelizable after Phase 2.
- **US3 (Phase 5)**: after US1+US2 (both pages exist). T012 (sidebars) → T014 (contextual links, same files); T013 (`index.html`) is `[P]`.
- **Polish (Phase 6)**: after US3.

### User Story Dependencies

- **US1 (P1)**, **US2 (P1)**: independent — each one page file.
- **US3 (P3)**: needs US1 + US2.

### Parallel Opportunities

```bash
# After Phase 2, build both pages concurrently (different files):
Task: "Build pages/document-categories.html (T004–T007)"   # US1
Task: "Build pages/approval-workflow.html  (T008–T011)"     # US2
```
Within each story the tasks are sequential (same file). T016 ∥ T017 in Polish.

### Within Each Story

- US1: T004 (shell+header+toggle) → T005 (group seg + table) → T006 (usage card + modal) → T007 (verify)
- US2: T008 (shell+header+toggles+steps) → T009 (rules table) → T010 (pending card + modal) → T011 (verify)
- US3: T012 (sidebars, label-based fixer) → T013 (index, ∥) → T014 (contextual links) → T015 (verify)

---

## Implementation Strategy

### MVP First (US1 only)

1. Phase 1 → Phase 2 → Phase 3 (US1). Delivers `document-categories.html` — the classification setup page.

### Incremental Delivery

1. Setup + Foundational.
2. US1 ∥ US2 → both governance pages exist.
3. US3 → navigation integration across all 34 pages.
4. Polish: full audit (incl. rogue + balanced-sidebar) + responsive QA + DoD.

### Notes

- **[P]** = different files, no dependencies.
- **Zero-new-CSS is mandatory**; do NOT use `.btn-rose`; the Polish rogue-class sweep (T016/check j) is the gate.
- **Sidebar fixer is label-based, never a spanning regex** — and T015/T016 add the balanced-sidebar check (g) to catch any recurrence of the Spec 008 corruption.
- Modals are HTML-authored, toggled by existing `initOverlays()`; switches are static checkboxes; the `.steps` visual is read-only. No `main.js`/CSS change.
- Rebuild `output.css` only if `input.css` changed (none expected).
