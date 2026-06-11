# Research: Document Categories & Approval Workflow (Spec 009)

All research is resolved from reading the existing codebase. No NEEDS CLARIFICATION items remain. Every decision names a component confirmed present in `assets/css/output.css`.

---

## R1 — Page Layout (both pages)

**Decision**: Use `.layout` (main 1fr + `.side` 320px) — main column = the primary content (groups + table / toggles + rules + visual), side column = the secondary card (usage card / pending-approvals).

**Rationale**: `client-tax-settings.html` uses `.layout`/`.side` for a settings-style screen with a main config area + side summary — the exact archetype for these governance pages. Responsive (collapses on mobile) and approved.

**Reference**: `client-tax-settings.html`.

---

## R2 — Client Selector + Global-Template Toggle (document-categories)

**Decision**: Header has a `.select-wrap`/`.select` client selector plus a `.seg` toggle "قالب عام / خاص بالعميل" (handled by `initSingleSelect()`), demonstrating that categories can be a shared global template or client-specific.

**Rationale**: Reuses the `.seg` single-select pattern (e.g., the `data-country-select` toggle in `client-tax-settings.html`). Switching is visual-only.

---

## R3 — Category Groups (document-categories)

**Decision**: A `.seg`/`.seg-tabs` row above the table to filter by group: الكل / تصنيفات الإيرادات / المصروفات / القبض / الصرف. The table shows all categories (demo data spans the 4 groups); the seg is a visual filter.

**Rationale**: `accountant-inbox.html` uses `.seg-tabs` to filter a table by status — the same pattern fits group filtering. No new CSS.

**Alternatives considered**: 4 separate sub-tables under section headers — heavier; a single table + group seg is cleaner and matches the design system.

---

## R4 — Categories Table (8 columns)

**Decision**: `.table-wrap` > `table.docs`, 8 columns — اسم التصنيف، النوع، الحساب المرتبط، خاضع للضريبة؟، نسبة الضريبة الافتراضية، يظهر للعميل؟، الحالة، إجراء. Flags rendered as `.chip` (نعم `.chip.green` / لا `.chip.slate`); النوع as a `.chip` (إيراد/مصروف/قبض/صرف); الحالة as `.chip` (نشط green / معطّل slate / يحتاج مراجعة amber); unlinked account shows "—" with a subtle `.chip.amber`.

**Rationale**: `table.docs` is the approved data table; flags as chips are scannable. Static HTML rows.

**Reference**: `clients.html`, `chart-of-accounts.html`.

---

## R5 — Add-Category & Add-Rule Modals

**Decision**: Each page has one `.scrim`[`data-overlay` id hidden] + `.modal` (`.modal-head`/`.modal-body`/`.modal-foot`), opened by a header button `data-open="#id"`. Category modal: 7 `.field`s (اسم التصنيف `.input`, نوع الحركة `.select-wrap`/`.select`, الحساب المرتبط `.select-wrap`/`.select`, خاضع للضريبة `.switch`, نسبة الضريبة `.input`/`.select`, يظهر للعميل `.switch`, ملاحظات `<textarea>`). Rule modal: 5 `.field`s (اسم القاعدة, نوع العملية `.select`, الشرط المالي `.input`, المستخدم/الدور `.select`, الحالة `.select`/`.switch`).

**Rationale**: Reuses the approved `#manualEntryModal`/`#addClientModal` pattern handled by `initOverlays()`. Modals authored in HTML (FR-015). No new JS/CSS.

**Reference**: `journal-entries.html` `#manualEntryModal`, `clients.html` `#addClientModal`; `.switch` from `settings.html`.

---

## R6 — Usage Card (document-categories `.side`)

**Decision**: A `.card` with `.card-head` "استخدام التصنيفات" + a `.set-body` of 3 `.set-row` insights: أكثر التصنيفات استخدامًا (with the top category name + count), تصنيفات غير مرتبطة بحساب (count `.chip.amber`), تصنيفات تحتاج مراجعة ضريبية (count `.chip.amber`), each with a small drill link.

**Rationale**: `.set-body`/`.set-row`/`.info` is the approved key-value/insight pattern. Fits the side column.

**Reference**: `settings.html`.

---

## R7 — Workflow Toggles + Rules Table + 4-Step Visual (approval-workflow)

**Decision**: (a) 3 toggles via `.card` > `.set-body` of `.set-row` (`.info` label + `.ctrl` `.switch`/`.track`) — copied from `settings.html` (~319–326). (b) Rules table `.table-wrap` > `table.docs`, 6 columns (نوع العملية، الشرط، المراجع الأول، المعتمد النهائي، الحالة، إجراء) with the 5 example rules; status `.chip` (مفعّلة green / معطّلة slate / يحتاج إكمال amber). (c) 4-step visual via `.steps`/`.step-item`/`.si-num` (copied from `data-import.html`): رفع المستند → مراجعة المحاسب → اعتماد المدير → الترحيل للحسابات.

**Rationale**: All three are approved components used elsewhere. The `.steps` visual is read-only.

**Reference**: `settings.html` (switches), `clients.html`/`journal-entries.html` (table), `data-import.html` (`.steps`).

---

## R8 — Pending Approvals (approval-workflow `.side`)

**Decision**: A `.card` (in `.side`) titled "بانتظار الاعتماد" with 3 `.set-row` (or 3 mini-stats): مستندات تنتظر اعتماد (count), تقارير تنتظر اعتماد (count), فترات تنتظر إغلاق (count), each `.chip` colored + a drill link to the relevant existing page (accountant-inbox / vat-report / fiscal-periods).

**Rationale**: Reuses `.set-body`/`.set-row` (or `.kpi-row`); links the governance view to its queues.

---

## R9 — Sidebar / index / Contextual + Zero New CSS

**Decision**: Convert the 2 `is-soon` spans (`تصنيفات المستندات` → `document-categories.html`; `سير الاعتماد` → `approval-workflow.html`) across all 32 existing pages with the **label-based line fixer** proven in the Spec 008 sidebar repair (locate the `<span>LABEL</span>` line, rewrite its immediate wrapper open/close, remove `.sl-soon`) — **never a spanning/DOTALL regex**. New pages mark their own item `active` + `aria-current="page"`. `index.html`: convert 2 `is-soon` cards to live, chip `5`→`3`, footer `32`→`34`/`5`→`3`. Add contextual `<a>` in `settings.html` (→ both) and `document-review.html` (→ document-categories).

**Zero New CSS**: Use only classes already in `output.css`. Confirmed-present for this feature: `.layout`, `.side`, `.kpi-row`, `.card`, `.kpi`, `.card-head`, `.ch-ico`, `.seg`, `.seg-tabs`, `.switch`, `.track`, `.set-body`, `.set-row`, `.info`, `.ctrl`, `.table-wrap`, `.docs`, `.chip`, `.scrim`, `.modal`, `.modal-head/-body/-foot`, `.field`, `.select-wrap`, `.select`, `.chev`, `.input`, `.steps`, `.step-item`, `.si-num`, `.tip`, `.btn`, `.btn-primary`, `.btn-outline`, `.btn-amber`, `.btn-sm`, `.page-title-wrap`, `.go`, `.landing-card`, `.sidebar-link`. **`.btn-rose` is purged — do NOT use.** Verified by `quickstart.md` check (j).
