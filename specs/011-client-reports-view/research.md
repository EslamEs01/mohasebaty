# Research: Client Reports View (Spec 011)

All research is resolved from reading the existing codebase. No NEEDS CLARIFICATION items remain. Every decision names a component confirmed present in `assets/css/output.css`.

---

## R1 — Client Shell (the defining choice)

**Decision**: Clone the full page shell from a **client portal** page (`client-documents.html`) — MOHASEBATY brand badge, the shared sidebar, and the `.header-right` `.client-pill` ("متصل بـ شركة النور للتجارة"), NOT the accountant `.avatar-btn` chrome.

**Rationale**: This is a client-facing page (Principle V). Cloning a client page guarantees the right brand/header chrome and simple framing. The sidebar is the same shared 35-item sidebar across all pages; only the active item differs.

**Reference**: `client-documents.html`, `client-dashboard.html`.

---

## R2 — Header + Actions

**Decision**: `.page-title-wrap` with title "تقاريري" + subtitle "ملخصات وتقارير مبسطة عن مستنداتك المالية"; two header actions — "تحميل آخر تقرير" (`.btn.btn-outline`, download icon) and "طلب تقرير" (`.btn.btn-primary`, links to the request-report card anchor `#request`).

**Rationale**: Matches the client-documents header pattern (title + a primary action). Both actions are visual/anchor only.

---

## R3 — Simple Filters (3)

**Decision**: `.filters` > 3 `.filter`, each `<label>` + a `.filter-select` button (`.placeholder` + `.chev`): الفترة (هذا الشهر), نوع التقرير (كل التقارير), الحالة (كل الحالات). Handled by `initFilterSelects()` (visual only).

**Rationale**: The approved `.filters`/`.filter-select` pattern; simple and client-friendly.

**Reference**: `accountant-inbox.html`.

---

## R4 — Summary Cards (5)

**Decision**: `.kpi-grid` with 5 `.card kpi` copied from `client-dashboard.html`: `.kpi-top`(`.kpi-ico .kpi-ico-*` + optional `.kpi-trend`) + `.kpi-num` + `<div>`(`.kpi-lbl` + `.kpi-help`). Cards: إجمالي الإيرادات المرفوعة (green), إجمالي المصروفات المرفوعة (amber), صافي تقديري (primary, `.kpi-help` = "تقديري"), الضريبة التقديرية (slate, `.kpi-help` = "تقديري حتى الاعتماد"), مستندات قيد المراجعة (amber, count).

**Rationale**: `.kpi-grid` is exactly what the client dashboard uses (responsive, 5 cards wrap cleanly). Estimates are flagged via `.kpi-help` "تقديري" so clients never read them as final (FR-009).

**Reference**: `client-dashboard.html`.

---

## R5 — Reports Table (5 columns)

**Decision**: `.table-wrap` > `table.docs`, 5 columns — اسم التقرير، الفترة، الحالة، آخر تحديث، إجراء. Status via `.chip`: مبدئي `.chip.amber` / معتمد `.chip.green` / يحتاج مستندات `.chip.slate`. إجراء = `.btn.btn-outline.btn-sm` (تحميل for معتمد/مبدئي, رفع المستندات for يحتاج مستندات → links to upload-document.html).

**Rationale**: `table.docs` is the approved table; chips are scannable and client-friendly. Static rows. No internal columns (no debit/credit).

**Reference**: `client-documents.html`, `clients.html`.

---

## R6 — Status Explanations

**Decision**: A `.card` "ماذا تعني حالات التقارير؟" with a `.set-body` of 3 `.set-row`, each = a status `.chip` + a plain-language description: مبدئي → "قد يتغير بعد مراجعة المستندات", معتمد → "تمت مراجعته من فريق المحاسبة", يحتاج مستندات → "هناك مستندات مطلوبة لاستكمال التقرير".

**Rationale**: `.set-body`/`.set-row`/`.info` is the approved explanatory key-value pattern; pairing the actual status chip with its meaning is clear and consistent with the table.

**Reference**: `settings.html`.

---

## R7 — Tax-Estimate Note + Request-Report Card

**Decision**: (a) The tax note uses `.note` (gold callout, background #f4ecda) with an info icon: "الأرقام الضريبية تقديرية حتى اعتماد التقرير من فريق المحاسبة." (b) The request-report card (`.side`, anchor `#request`) is a `.card` "طلب تقرير جديد" with 3 `.field`: نوع التقرير (`.select-wrap`/`.select`), الفترة (`.select-wrap`/`.select`), ملاحظات (`<textarea class="input">`) + an "إرسال الطلب" `.btn.btn-primary`.

**Rationale**: `.note` is the approved gold "heads-up" callout — perfect for the estimates disclaimer. The request card reuses the approved `.field`/`.select`/`textarea` form pattern inline (no modal needed). Static — no submit.

**Reference**: `client-document-details.html` (`.note`), `client-onboarding.html`/`document-categories.html` (form fields).

---

## R8 — Layout, Sidebar/index/Contextual + Zero New CSS

**Decision**: `.layout`: full-width header + filters + summary `.kpi-grid` above; then `.layout` with MAIN = reports table + status-explanations card + tax `.note`; SIDE (`.side`) = request-report card. Convert the 1 `is-soon` span (`تقارير العميل` → `client-reports.html`) across all pages via the **label-based line fixer** (never a spanning regex). New page marks its own item `active` + `aria-current`. `index.html`: convert the last `is-soon` card to live; update counters so **0 coming-soon** remain (37 screens). Contextual links from `client-dashboard.html` + `client-documents.html`.

**Zero New CSS**: Use only classes already in `output.css`. Confirmed-present: `.page-title-wrap`, `.client-pill`, `.dot`, `.filters`, `.filter`, `.filter-select`, `.placeholder`, `.chev`, `.kpi-grid`, `.card`, `.kpi`, `.kpi-top`, `.kpi-ico`, `.kpi-ico-{primary,green,amber,slate,rose}`, `.kpi-trend`, `.kpi-num`, `.kpi-lbl`, `.kpi-help`, `.layout`, `.side`, `.table-wrap`, `.docs`, `.chip`, `.chip.green/.amber/.slate`, `.set-body`, `.set-row`, `.info`, `.note`, `.tip`, `.card-head`, `.field`, `.select-wrap`, `.select`, `.input`, `.btn`, `.btn-primary`, `.btn-outline`, `.btn-sm`, `.go`, `.landing-card`, `.sidebar-link`. **The amber chip is `.chip.amber`, NOT `.chip-amber`. `.btn-rose` is purged — do NOT use.** Verified by `quickstart.md` check (j). **Client-internals keyword scan** (check k) must be empty.
