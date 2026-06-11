# Research: Bank Statement Import & Reconciliation (Spec 007)

All research is resolved from reading the existing codebase. No NEEDS CLARIFICATION items remain. Every decision names a component confirmed present in `assets/css/output.css`.

---

## R1 — Split Two-Panel Workspace (bank-reconciliation.html) — THE key decision

**Decision**: Use the existing `.workspace` grid (`grid-template-columns: 1fr 1fr`, defined in `input.css` ~1827) with column 1 = a `.card` (bank transactions) and column 2 = a `.left-col` flex stack holding the suggested-documents `.card` + the match-details `.card` + the action buttons.

**Rationale**: `document-review.html` already uses `.workspace` + `.left-col` for a two-panel "main + side stack" review screen — the exact archetype for reconciliation. It is approved, responsive (collapses to one column on mobile via the `.workspace` breakpoint ~line 2378), and RTL-correct (the first grid column renders on the right, matching the spec's "right panel = bank transactions"). **Zero new CSS.**

**Reference**: `pages/document-review.html` (~line 237 `.workspace`, `.left-col` ~362).

**Alternatives considered**: `.msg-workspace` (3-pane messaging grid) — rejected; it is a 3-column conversation layout, heavier than needed. `.layout`/`.layout-wide` (1fr 320px) — rejected; the second column is a narrow sidebar, not an equal panel. A bespoke grid — rejected; `.workspace` already fits.

---

## R2 — KPI Cards (reconciliation)

**Decision**: `.kpi-row` with 4 `.card kpi`: معاملات البنك (`.kpi-ico-primary`), مطابق تلقائيًا (`.kpi-ico-green`), يحتاج مراجعة (`.kpi-ico-amber`), غير مطابق (`.kpi-ico-rose`).

**Rationale**: The standard 4-KPI band. Reconciliation state maps directly to the four icon colors.

**Reference**: `journal-entries.html`, `clients.html`.

---

## R3 — Bank Transactions & Suggested Documents Tables

**Decision**: Both panels use `.table-wrap` > `table.docs`. Transaction status via `.chip` (مطابق تلقائيًا `.chip.green` / يحتاج مراجعة `.chip.amber` / غير مطابق `.chip.rose` / مطابق يدويًا `.chip.primary`); type via `.chip` (إيداع/سحب/رسوم); نسبة التطابق shown as a value with a `.chip` color band (high green / mid amber). Action cells use `.btn.btn-outline.btn-sm` / `.icon-btn`.

**Rationale**: `table.docs` is the approved data table; both panels are scannable lists. Static HTML rows.

**Reference**: `clients.html`, `journal-entries.html`.

---

## R4 — Match-Details Card

**Decision**: A `.card` with `.card-head` + a `.set-body` of `.set-row`/`.info` rows: معاملة البنك المحددة, المستند المقترح, الفرق, ملاحظات. The الفرق row uses a `.chip` (0 → green; non-zero → amber/rose). Below it, the 4 action buttons (مطابقة `.btn.btn-primary`, تجاهل `.btn.btn-outline`, إنشاء مستند جديد من المعاملة `.btn.btn-outline`, طلب توضيح `.btn.btn-amber` or `.btn-outline`).

**Rationale**: `.set-body`/`.set-row`/`.info` is the approved key-value summary pattern (settings, client-document-details). The card lives in the `.left-col` stack under the suggested-documents card.

**Reference**: `settings.html`, `client-document-details.html`.

---

## R5 — Bank Statement Import Page Layout

**Decision**: Header (client + bank-account + period selectors via `.select-wrap`/`.select`); a `.dropzone[data-zone-id="bank-statement"]` + `.file-card` upload region (the post-004-fix corrected markup); a mapping-summary block (a `.tip` confirmation + a compact `.set-body` or chip list of the 6 mapped columns: التاريخ، الوصف، المدين، الدائن، الرصيد، رقم العملية); a preview `.table-wrap` > `table.docs` with 6 columns (التاريخ، الوصف، مدين، دائن، الرصيد، الحالة); and 3 actions (رفع وتحليل `.btn.btn-primary`, متابعة للمطابقة `.btn.btn-primary` → `bank-reconciliation.html`, حفظ كمسودة `.btn.btn-outline`).

**Rationale**: This mirrors `data-import.html` (upload + sections) and `import-mapping.html` (mapping summary + preview table) — both approved import-flow pages. Reuse their exact markup.

**Reference**: `data-import.html` (dropzone/file-card), `import-mapping.html` (mapping summary + preview table).

---

## R6 — File Upload (corrected markup)

**Decision**: Reuse the corrected dropzone+file-card: `.dropzone`[`data-zone-id="bank-statement"`] + `.dz-ico` + `<b>` + `.sub` + `.browse` + `.formats`/`.fmt`, with `.file-card`[`data-file-card-for="bank-statement"` hidden] using `.fc-ico` + `.fc-body` (`<b data-file-name>` + `<span data-file-size>`) + `.icon-btn`[`data-file-clear`].

**Rationale**: This is the corrected pattern from the Spec 004 fix — it styles correctly AND works with `initDropzone()`. Avoids the rogue-class trap.

**Reference**: `upload-document.html`, `data-import.html` (post-004-fix).

---

## R7 — Selectors (client / bank account / period)

**Decision**: Three `.select-wrap`/`.select`/`.chev` dropdowns in the header (or a `.fields-grid`). Bank-account options reference the demo accounts from Spec 006 (الراجحي/الأهلي/الإنماء/الخزينة…); period options are quarterly/monthly.

**Rationale**: The approved selector component; consistent with `client-tax-settings.html`/`settings.html`.

---

## R8 — Sidebar / index / Contextual Link Wiring

**Decision**: Convert the 2 `is-soon` spans (`استيراد كشف الحساب` upload-out icon → `bank-statement-import.html`; `التسوية البنكية` check-circle icon → `bank-reconciliation.html`) to live `<a class="sidebar-link">` across all 28 existing pages via one Python script. New pages mark their own item `active` + `aria-current="page"`. In `index.html`, convert the 2 `is-soon` landing cards (~lines 419, 426) to live `<a class="landing-card">`, update chip `9 وحدة`→`7 وحدة` and footer `28`→`30` / `9`→`7`. Add a contextual `<a>` in `bank-accounts.html` and `data-import.html` to `bank-statement-import.html`.

**Rationale**: Same proven sidebar/index conversion from Specs 003–006.

---

## R9 — Zero New CSS (hard rule)

**Decision**: Use only classes already in `assets/css/output.css`. Confirmed-present for this feature: `.workspace`, `.left-col`, `.kpi-row`, `.card`, `.kpi`, `.kpi-ico*`, `.kpi-num`, `.kpi-lbl`, `.card-head`, `.ch-ico`, `.table-wrap`, `.docs`, `.chip`, `.set-body`, `.set-row`, `.info`, `.tip`, `.dropzone`, `.dz-ico`, `.sub`, `.browse`, `.formats`, `.fmt`, `.file-card`, `.fc-ico`, `.fc-body`, `.icon-btn`, `.select-wrap`, `.select`, `.chev`, `.fields-grid`, `.field`, `.input`, `.split-bar`, `.seg-in`, `.seg-out`, `.btn`, `.btn-primary`, `.btn-outline`, `.btn-amber`, `.btn-sm`, `.page-title-wrap`, `.eyebrow`, `.page-sub`, `.go`, `.landing-card`, `.sidebar-link`.

**Rationale**: Spec 004 proved inventing child classes yields off-design unstyled components. **`.btn-rose` is purged from `output.css` — do NOT use it** (use `.btn-amber`/`.btn-outline` for the "danger-ish" actions). Verified by `quickstart.md` check (j).

**Exception**: A minimal inline `style=""` is acceptable for a one-off structural gap (precedent: `client-tax-settings.html`), never a new CSS class.
