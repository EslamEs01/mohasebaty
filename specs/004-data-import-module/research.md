# Research: Data Import Module (Spec 004)

All research is resolved from reading the existing codebase and auditing the already-built pages. No NEEDS CLARIFICATION items remain from the spec.

---

## R1 — Import Type Card Grid

**Decision**: Use the existing `.type-grid` / `.type-card` pattern with `initSingleSelect()` from `main.js`.

**Rationale**: The 8 import-type cards (مبيعات, مصروفات, …) are a single-select group — exactly what `.type-grid`/`.type-card` provides. `initSingleSelect()` handles click-to-activate via `.active`. No new CSS.

**Reference**: `pages/upload-document.html` (`.type-grid` with `.type-card` items).

**Alternatives considered**: `.seg` — rejected; it only fits 3–5 short labels, while 8 icon+label cards need a grid.

---

## R2 — File Source Selector (Excel / CSV / PDF / نظام محاسبي سابق)

**Decision**: Use `.seg` (segmented control) for the 4 file-source options.

**Rationale**: 4 mutually exclusive text options in a row; `.seg` buttons are auto-handled by `initSingleSelect()`. No new JS.

**Reference**: `pages/client-onboarding.html` (`.seg` with multiple buttons).

**Alternatives considered**: `.type-grid` with 4 small cards — possible but `.seg` is more compact for text-only choices.

---

## R3 — KPI Summary Cards (4-card rows)

**Decision**: Use `.kpi-row` with `.card` children, each `.kpi-top` / `.kpi-ico` / `.kpi-num` / `.kpi-lbl` / `.kpi-help`, color-coded via `.kpi-ico-green/-amber/-rose/-primary`.

**Rationale**: This is the established 4-KPI pattern on `accountant-inbox.html` and `admin-financial-dashboard.html`. preview, history, and errors each need exactly this.

**Reference**: `pages/accountant-inbox.html`.

---

## R4 — Data Tables with Filter Controls

**Decision**: `.filters` > `.filter` > `.filter-select` for filter bars; `.table-wrap` > `<table>` for data; `.chip` for status; `.tbl-foot` for pagination.

**Rationale**: Same pattern as `accountant-inbox.html` and `clients.html`. History (10 columns + 4 filters) and errors (5 columns) use it directly.

**Reference**: `pages/clients.html`, `pages/accountant-inbox.html`.

**Alternatives considered**: Card-list view — rejected for history; 10 columns need tabular layout for scannability.

---

## R5 — Column Mapping Table (import-mapping.html)

**Decision**: Standard `.table-wrap` > `<table>`; in the "الحقل المقابل في النظام" column use inline `.select-wrap`/`.select` dropdowns inside `<td>`; status column uses `.chip` (green = مربوط, amber = غير مربوط, rose = مطلوب — غير مربوط, slate = optional/skipped).

**Rationale**: `.select-wrap` inside `<td>` is valid and already styled compactly. Audit confirms 7 `select-wrap` cells in the built page (one per mapping row). No new CSS.

**Alternatives considered**: JS-driven editable grid — rejected by Principle III (no JS-generated content); rows are static HTML demo data.

---

## R6 — "What Happens Next" Steps Card (data-import.html)

**Decision**: A read-only `.card` containing a numbered 5-step list reusing existing color variables.

**Rationale**: The card is informational, not interactive. A static numbered list in a `.card` reuses the design system without new CSS.

**Alternatives considered**: The interactive `.stepper` (wired to `initWizard()`) — rejected; this display is static.

---

## R7 — Modals (import-templates.html)

**Decision**: Use the `.scrim` + `data-overlay` + `data-open`/`data-close` pattern handled by `initOverlays()`.

**Rationale**: `initOverlays()` is already registered in `boot()`. Audit confirms `import-templates.html` has exactly one `data-overlay` modal. Same pattern as the add-client modal in `clients.html`.

**Reference**: `pages/clients.html` (`<div class="scrim" data-overlay … hidden>`).

---

## R8 — Import Preview Table (import-preview.html)

**Decision**: `.table-wrap` > `<table>` with static demo rows of mapped columns + a status column using `.chip` badges.

**Rationale**: Read-only display of the first N mapped rows; static HTML suffices for the prototype.

**Alternatives considered**: JS-rendered preview — rejected by Principle III.

---

## R9 — Sidebar Navigation Wiring

**Decision**: The 6 `استيراد البيانات` items are live `<a>` links in every page; each of the 6 pages marks its own item `active`.

**Rationale**: Audit confirms the wiring is complete (each of the 6 links appears across the project; one active item per page). The pattern follows Spec 002's sidebar conversion.

**Sidebar items**:
1. `استيراد البيانات` → upload icon → `data-import.html`
2. `مطابقة الحقول` → arrow-expand icon → `import-mapping.html`
3. `معاينة الاستيراد` → eye icon → `import-preview.html`
4. `سجل الاستيراد` → clock icon → `import-history.html`
5. `أخطاء الاستيراد` → triangle-warning icon → `import-errors.html`
6. `قوالب الاستيراد` → table-grid icon → `import-templates.html`

---

## R10 — Zero New CSS Goal

**Decision**: Reuse existing classes only (`.kpi-row`, `.type-grid`, `.filters`, `.table-wrap`, `.chip`, `.dropzone`, `.file-card`, `.fields-grid`, `.field`, `.input`, `.select-wrap`, `.select`, `.seg`, `.btn`, `.card`, `.set-body`, `.set-row`, `.info`, `.tip`, `.scrim`, …).

**Rationale**: The design system already covers every need. Audit shows no new CSS was required. If a minor structural gap appears, prefer a minimal inline `style=""` over a new class (the `client-tax-settings.html` precedent).

---

## R11 — index.html Coming-Soon Count

**Decision**: 6 `استيراد البيانات` landing cards are live `<a>` links; footer reads "23 شاشة مكتملة + 14 وحدة قادمة"; coming-soon chip reads "14 وحدة".

**Rationale**: Audit confirms `index.html` already shows "23 شاشة مكتملة" and "14 وحدة". Done.

---

## R12 — Orphan File Reconciliation (`import-template.html`, singular)

**Decision**: Remove `pages/import-template.html` (singular). The canonical page is `pages/import-templates.html` (plural), which all sidebars and `index.html` link to.

**Rationale**: The singular file is an earlier authoring artifact: ~25 KB, dated 2026-06-08, with its own sidebar whose active link points back to itself. No other page references it. It is unreachable via navigation and inflates the page count to 24 (vs the intended 23 that `index.html` advertises). Deleting it is non-destructive — no inbound links break — and restores count parity.

**Verification before deletion**: `grep -rn 'import-template\.html' index.html pages/*.html | grep -v 'import-templates'` must return only the file's self-reference (confirmed in the 2026-06-11 audit).

**Alternatives considered**:
- *Keep both* — rejected; a dead duplicate violates Principle VI (complete, intentional pages) and confuses the page inventory.
- *Redirect the singular to the plural* — rejected; no routing layer exists in a static prototype, and nothing links to the singular to begin with.
