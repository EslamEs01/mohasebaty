# Research: Audit Log & Notifications Center (Spec 010)

All research is resolved from reading the existing codebase. No NEEDS CLARIFICATION items remain. Every decision names a component confirmed present in `assets/css/output.css`.

---

## R1 — Page Layout (both pages)

**Decision**: Use `.layout` (main 1fr + `.side`). audit-log: MAIN = filters + KPI band + event table; SIDE = before/after details panel. notifications: MAIN = filter chips + notification list; SIDE = preferences card.

**Rationale**: `vat-report.html`/`tax-documents.html` use `.layout`/`.side` for main-content + side-summary — the exact archetype. Responsive, approved.

**Reference**: `vat-report.html`.

---

## R2 — Filter Bar (audit-log, 5 filters)

**Decision**: `.filters` > five `.filter`, each `<label>` + a `.filter-select` button (`<span class="placeholder">…</span>` + `.chev`): المستخدم، العميل، نوع الإجراء، الفترة، المستند المرتبط. Handled by `initFilterSelects()` (visual only).

**Rationale**: `accountant-inbox.html`/`bank-accounts.html` use exactly this `.filters`/`.filter`/`.filter-select` pattern. No new CSS.

---

## R3 — KPI Band (audit-log, 4 cards)

**Decision**: `.kpi-row` of four `.card kpi`, each copied VERBATIM from `vat-report.html`: `.kpi-top` (`.kpi-ico .kpi-ico-{primary,amber,green,rose}` + `.kpi-trend`) + `.kpi-num` + `.kpi-lbl` + `.kpi-help`. Cards: أحداث اليوم (primary), تعديلات حساسة (amber), عمليات اعتماد (green), عمليات فشل (rose).

**Rationale**: The KPI card's inner classes are `.kpi-num`/`.kpi-lbl`/`.kpi-help` (NOT `.kpi-val`/`.kpi-label`, which do not exist). Copying the known-good markup avoids rogue classes.

**Reference**: `vat-report.html` (`.card kpi`), `accountant-inbox.html`.

---

## R4 — Event Table (audit-log, 9 columns)

**Decision**: `.table-wrap` > `table.docs`, 9 columns — الوقت، المستخدم، الدور، الإجراء، العميل، العنصر المرتبط، قبل/بعد، IP، تفاصيل. Severity via `.chip` (اعتماد green / تعديل حساس amber / فشل rose / عادي slate); "قبل/بعد" cell = a `.chip` "تغيير" when values changed else "—"; تفاصيل = `.btn-outline.btn-sm` "عرض" (highlights the side panel).

**Rationale**: `table.docs` is the approved data table; chips are scannable. Static HTML rows.

**Reference**: `clients.html`, `journal-entries.html`.

---

## R5 — Before/After Side Panel (audit-log `.side`)

**Decision**: A `.card` "تفاصيل الحدث" in `.side` with: a small event summary, then a `.set-body` of `.set-row` showing القيم قبل التعديل (old) vs القيم بعد التعديل (new) for a representative selected event (e.g., منى عدّلت نسبة الضريبة: 14% → 15%), then a `.tip` "ملاحظات النظام".

**Rationale**: `.set-body`/`.set-row`/`.info` is the approved key-value pattern; `.tip` is the approved note callout. Fits the side column.

**Reference**: `client-document-details.html`, `settings.html`.

---

## R6 — Notification Filter Chips (notifications, 6)

**Decision**: A `.seg-tabs` single-select row: الكل (active) / مستندات / رسائل / تقارير / استيراد بيانات / اعتماد. Handled by `initSingleSelect()` (visual only).

**Rationale**: `accountant-inbox.html` uses `.seg-tabs` for tab filtering — same pattern. No new CSS.

---

## R7 — Notification List (notifications)

**Decision**: A `.card` containing a list of `.notif-item` rows (reusing the bell-dropdown component), each: `.nico`(`.amber`/`.rose`/default) icon + `<div><b>title</b><span>desc · time</span></div>` + a trailing `.chip` status (جديد `.chip.primary` / مقروء `.chip.slate`) + a `.btn-outline.btn-sm` action. The 6 items: مستند جديد، مطلوب توضيح (rose), رد جديد من العميل، تقرير جاهز (green), ملف استيراد فشل (rose), فترة مالية ستغلق (amber/warning).

**Rationale**: `.notif-item`/`.nico` already exist (used in the header bell dropdown) — reusing them scales the dropdown's row into a full list with no new CSS. `.notif-list` does NOT exist, so the container is a plain `.card`.

**Reference**: bell dropdown markup in `accountant-inbox.html`.

---

## R8 — Preferences Card (notifications `.side`)

**Decision**: A `.card` "تفضيلات الإشعارات" with a `.set-body` of 4 `.set-row` (`.info` label+helper + `.ctrl` `.switch`/`.track`): إشعارات داخل النظام (on), إشعارات البريد (on), تنبيه قبل إغلاق الفترة (on), تنبيه عند فشل الاستيراد (on).

**Rationale**: Reuses the approved `settings.html` switch-row pattern. Static checkboxes.

**Reference**: `settings.html`.

---

## R9 — Sidebar / index / Bell / Contextual + Zero New CSS

**Decision**: Convert the 2 `is-soon` spans (`سجل التدقيق` → `audit-log.html`; `الإشعارات` → `notifications.html`) across all existing pages with the **label-based line fixer** proven in Specs 008–009 (locate the `<span>LABEL</span>` line, rewrite its immediate wrapper open/close, remove `.sl-soon`) — **never a spanning/DOTALL regex**. New pages mark their own item `active` + `aria-current="page"`. `index.html`: convert 2 `is-soon` cards to live, chip `3`→`1`, footer `34`→`36`/`3`→`1`. **Header bell** (11 pages): in each `.notif-panel`, repoint the footer `<a href="#">عرض الكل …</a>` to `href="notifications.html"` (or insert one before the panel's closing `</div>` if absent) — preserve the dropdown and its items. `settings.html`: add contextual links → audit-log + notifications.

**Zero New CSS**: Use only classes already in `output.css`. Confirmed-present for this feature: `.layout`, `.side`, `.kpi-row`, `.card`, `.kpi`, `.kpi-top`, `.kpi-ico`, `.kpi-ico-primary/amber/green/rose`, `.kpi-trend`, `.kpi-num`, `.ccy`, `.kpi-lbl`, `.kpi-help`, `.filters`, `.filter`, `.filter-select`, `.placeholder`, `.chev`, `.table-wrap`, `.docs`, `.chip`, `.seg-tabs`, `.notif-panel`, `.notif-head`, `.notif-item`, `.nico`, `.set-body`, `.set-row`, `.info`, `.ctrl`, `.switch`, `.track`, `.tip`, `.card-head`, `.ch-ico`, `.btn`, `.btn-primary`, `.btn-outline`, `.btn-amber`, `.btn-sm`, `.page-title-wrap`, `.go`, `.landing-card`, `.icon-btn`, `.badge`, `.sidebar-link`. **`.btn-rose` is purged — do NOT use** (failures use `.chip.rose`/`.nico.rose`, not buttons). Verified by `quickstart.md` check (j).
