# Research: Data Import Module

All research for this spec is resolved from reading the existing codebase.
No NEEDS CLARIFICATION items remain from the spec.

---

## R1 — Import Type Card Grid

**Decision**: Use the existing `.type-grid` / `.type-card` pattern with `initSingleSelect()` already in `main.js`.

**Rationale**: The 8 import type cards (مبيعات, مصروفات, etc.) are a single-select group — exactly what `.type-grid`/`.type-card` was built for. `initSingleSelect()` already handles click-to-activate with `.active` class. No new CSS needed.

**Reference**: `pages/upload-document.html` — chart-of-accounts step uses `.type-grid` with 4 `.type-card` items.

**Alternatives considered**: `.seg` segmented control — rejected because it only fits 3–5 short labels horizontally; 8 icon+label cards need a grid layout.

---

## R2 — File Source Selector (Excel / CSV / PDF / نظام محاسبي سابق)

**Decision**: Use `.seg` (segmented control) for the 4 file source options.

**Rationale**: 4 mutually exclusive text options in a horizontal row; `.seg` provides the exact pattern. `initSingleSelect()` handles the toggle via `button[data-country]` — wait, actually `.seg` uses `qsa('.seg, .toggle-radio, .seg-tabs').forEach` so buttons inside `.seg` are auto-handled by `initSingleSelect()`. No new JS needed.

**Reference**: `pages/client-onboarding.html` — دورة الإقرار الضريبي uses `.seg` with 3 buttons.

**Alternatives considered**: `.type-grid` with 4 small cards — possible but `.seg` is more compact and appropriate for 4 text-only choices.

---

## R3 — KPI Summary Cards (4-card rows)

**Decision**: Use `.kpi-row` with `.card` children, each containing `.kpi-top`, `.kpi-ico`, `.kpi-num`, `.kpi-lbl`, `.kpi-help`.

**Rationale**: The 4-card KPI row pattern is used on both `accountant-inbox.html` and `admin-financial-dashboard.html`. Both import-history (4 KPIs) and import-preview (4 KPIs) and import-errors (4 KPIs) need exactly this. Use `.kpi-ico-green` / `.kpi-ico-amber` / `.kpi-ico-rose` / `.kpi-ico-primary` for color coding by type.

**Reference**: `pages/accountant-inbox.html` lines 258–310.

**Alternatives considered**: Stat cards in a different layout — no alternative needed; existing pattern is perfect.

---

## R4 — Data Tables with Filter Controls

**Decision**: Use `.filters` > `.filter` > `.filter-select` for filter bars; `.table-wrap` > `<table>` > `<thead>`/`<tbody>` for data tables; `.chip` for status badges; `.tbl-foot` for pagination area.

**Rationale**: The same pattern used in `accountant-inbox.html` and `clients.html`. Import history (10-column table + 4 filters) and import errors (5-column table) use this directly.

**Reference**: `pages/clients.html` lines 306–446; `pages/accountant-inbox.html` lines 312–506.

**Alternatives considered**: Card-based list view — rejected for import-history because the 10 data columns need horizontal tabular layout for scannability.

---

## R5 — Column Mapping Table (import-mapping.html)

**Decision**: Use the standard `.table-wrap` > `<table>` pattern; in the "الحقل المقابل في النظام" column, use inline `.select-wrap`/`.select` dropdowns inside `<td>`.

**Rationale**: Placing a `.select-wrap` inside a `<td>` is valid HTML. The select wraps are already styled to fit compactly. The status column uses `.chip` badges (`.chip.green` = mapped, `.chip.amber` = unmatched, `.chip.slate` = optional/skipped).

**New consideration**: The mapping table has a unique header with 5 columns. This is a standard table pattern. No new CSS needed.

**Alternatives considered**: An editable grid with JS-driven rows — rejected by Principle III (no JS-generated content); the rows are authored in HTML as static demo data.

---

## R6 — "What Happens Next" Steps Card (data-import.html)

**Decision**: Use a `.card` with a simple ordered steps layout using existing `.set-row`/`.info` structure OR a custom `<ol>` with inline flex and numbered circles styled with existing color variables.

**Rationale**: The page contracts call for a 5-step informational card. This is a read-only display — no interaction needed. A simple `<ol>` or flex column inside a `.card` with numbered step indicators reuses the existing color system without new CSS.

**Reference**: The `.stepper` in wizard pages shows numbered steps, but that's interactive. For static display, a simple numbered list in a card is cleaner.

**Alternatives considered**: Using `.stepper` component — rejected because `.stepper` is interactive and wired to `initWizard()`.

---

## R7 — Modals (import-templates.html)

**Decision**: Use the existing `.scrim` + `data-overlay` + `data-open`/`data-close` pattern from `main.js` `initOverlays()`.

**Rationale**: `initOverlays()` is already registered in `boot()`. The add-template modal uses `data-open="#addTemplateModal"` on the trigger button, and the modal itself gets `data-overlay` + `hidden` attribute + a `.scrim` wrapper. This is the same pattern as the add-client modal in `clients.html`.

**Reference**: `pages/clients.html` line 529 (`<div class="scrim" data-overlay id="addClientModal" hidden>`).

**Alternatives considered**: Drawer/slide-in panel — no reason to deviate from the modal pattern already established.

---

## R8 — "Import Preview" Table (import-preview.html)

**Decision**: Use `.table-wrap` > `<table>` with static demo rows showing mapped column headers and Arabic sample data. Row-level status is indicated by `.chip` badges in a status column.

**Rationale**: The preview table is a read-only display of the first N rows of imported data. Static HTML rows are sufficient for demo purposes. No JS needed.

**Alternatives considered**: A separate JS-rendered preview — rejected by Principle III.

---

## R9 — Sidebar Navigation Wiring

**Decision**: Convert all 6 `استيراد البيانات` coming-soon spans to live `<a>` links across all 23 existing pages (17 original + 6 new pages share the same sidebar). The new pages mark their own item `active`.

**Rationale**: The sidebar conversion pattern is already established from Spec 002 (T018). A Python script replaces the 6 `is-soon` spans with `<a>` tags across all existing pages.

**Sidebar HTML source for the 6 items** (verbatim from current `accountant-inbox.html`):
1. `استيراد البيانات` → upload icon → `data-import.html`
2. `مطابقة الحقول` → arrow-expand icon → `import-mapping.html`
3. `معاينة الاستيراد` → eye icon → `import-preview.html`
4. `سجل الاستيراد` → clock icon → `import-history.html`
5. `أخطاء الاستيراد` → triangle-warning icon → `import-errors.html`
6. `قوالب الاستيراد` → table-grid icon → `import-templates.html`

---

## R10 — Zero New CSS Goal

**Decision**: Target zero new CSS classes. All pages reuse existing Tailwind utilities and custom classes from `assets/css/input.css`.

**Rationale**: The design system (`.kpi-row`, `.kpi-top`, `.kpi-num`, `.kpi-lbl`, `.type-grid`, `.type-card`, `.filters`, `.filter`, `.filter-select`, `.table-wrap`, `.tbl-foot`, `.chip`, `.dropzone`, `.file-card`, `.fields-grid`, `.field`, `.input`, `.select-wrap`, `.select`, `.seg`, `.btn`, `.card`, `.card-head`, `.set-body`, `.set-row`, `.info`, `.ctrl`) covers all needs for these 6 pages.

**Exception**: If a minor structural gap appears during implementation, add a minimal inline `style=""` rather than a new CSS class — per the pattern already used in `client-tax-settings.html`.

---

## R11 — index.html Coming-Soon Count Update

**Decision**: After adding 6 live pages, update `index.html`:
- Footer: `17 شاشة مكتملة + 20 وحدة قادمة` → `23 شاشة مكتملة + 14 وحدة قادمة`
- Coming-soon chip: `20 وحدة` → `14 وحدة`
- 6 `استيراد البيانات` landing cards converted from `is-soon` divs to live `<a>` links.

**Reference**: Same pattern applied in Spec 002 T019 for 2 cards. Now 6 cards.
