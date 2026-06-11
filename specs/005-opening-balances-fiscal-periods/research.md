# Research: Opening Balances & Fiscal Periods (Spec 005)

All research is resolved from reading the existing codebase. No NEEDS CLARIFICATION items remain from the spec. Every decision names an existing component confirmed present in `assets/css/output.css`.

---

## R1 — Balance Status Cards (debit / credit / difference / state)

**Decision**: Use `.kpi-row` with 4 `.card kpi` children (`.kpi-top`/`.kpi-ico`/`.kpi-num`/`.kpi-lbl`/`.kpi-help`), color-coded via `.kpi-ico-green` (إجمالي المدين), `.kpi-ico-amber` (إجمالي الدائن), `.kpi-ico-rose`/`.kpi-ico-primary` (الفرق), and a state card whose body carries a `.chip.green` متوازن / `.chip.rose` غير متوازن.

**Rationale**: This is the established 4-KPI row used on `journal-entries.html` and the dashboards. The الحالة card reuses the same `.card kpi` shell with a chip in place of a trend.

**Reference**: `journal-entries.html` lines ~238–290 (it even shows a `مدين = دائن` trend label).

**Alternatives considered**: Bespoke stat band — rejected; the KPI row already fits exactly.

---

## R2 — Opening-Balances Table (account code/name/type + debit/credit)

**Decision**: Use `.table-wrap` > `table.docs` with `<thead>`/`<tbody>`. Account code uses `.acct-code`; account name uses `.acct-name` (with `.acct-name.child` + `.acct-dot` for sub-accounts); type/debit/credit/notes are plain `<td>`; the row الحالة uses `.chip`.

**Rationale**: Combines the debit/credit table from `journal-entries.html` with the account-code/name cell styling from `chart-of-accounts.html` — both already defined. No new CSS.

**Reference**: `journal-entries.html` (~370–382 headers مدين/دائن), `chart-of-accounts.html` (~338–399 `.acct-code`/`.acct-name`/`.acct-dot`).

**Alternatives considered**: Editable grid with JS rows — rejected by Principle III (rows are static HTML demo data).

---

## R3 — Validation Card

**Decision**: Use the `.tip` banner to state the balance rule ("يجب أن يكون إجمالي المدين مساويًا لإجمالي الدائن") and the approval constraint ("لا يمكن الاعتماد مع وجود فرق").

**Rationale**: `.tip` is the approved inline note/warning component. Read-only informational content fits it exactly.

**Reference**: `client-tax-settings.html`, `import-mapping.html`.

---

## R4 — Add-Balance Modal

**Decision**: Use `.scrim`[`data-overlay` id="addBalanceModal" hidden] + `.modal` (`.modal-head`/`.modal-body`/`.modal-foot`), opened by a header button `data-open="#addBalanceModal"`, with 4 `.field`s: الحساب (`.select-wrap`/`.select`), مدين (`.input` number), دائن (`.input` number), ملاحظات (`.input` textarea). Footer: حفظ `.btn.btn-primary` + إلغاء `.btn.btn-outline` `data-close`.

**Rationale**: Identical to the `#manualEntryModal` pattern in `journal-entries.html`, handled by `initOverlays()`. No new JS/CSS.

**Reference**: `journal-entries.html` ~549–630.

---

## R5 — Balances File Upload ("رفع ملف أرصدة")

**Decision**: Reuse the approved dropzone: `.dropzone`[`data-zone-id="balances-file"`] + `.dz-ico` + `<b>` + `.sub` + `.browse` + `.formats`/`.fmt`, with a matching `.file-card`[`data-file-card-for="balances-file"` hidden] using `.fc-ico` + `.fc-body` (`<b data-file-name>` + `<span data-file-size>`) + `.icon-btn`[`data-file-clear`].

**Rationale**: This is the exact corrected pattern from the Spec 004 fix — it both styles correctly and works with `initDropzone()` (`[data-file-name]`/`[data-file-clear]`). Avoids the rogue-class trap.

**Reference**: `upload-document.html` (~359–387), `data-import.html` (post-004-fix).

---

## R6 — Fiscal-Year Setup Block

**Decision**: Use a `.card` with `.set-body` of `.set-row` items (`.info` label + value/`.ctrl`) for: السنة المالية، تاريخ البداية، تاريخ النهاية، العملة، الحالة. The الحالة value uses a `.chip` (نشطة `.chip.green`).

**Rationale**: `settings.html` uses exactly this `.set-body`/`.set-row`/`.info`/`.ctrl` pattern for configuration rows. Reusing it keeps the fiscal-year block on-design.

**Reference**: `settings.html` ~323–345.

**Alternatives considered**: `.fields-grid`/`.field` editable form — viable, but `.set-row` reads better for a mostly-read setup summary; either is approved. Implementer may use `.fields-grid` if edit affordances are emphasized.

---

## R7 — Fiscal-Period List (12 months)

**Decision**: Use `.table-wrap` > `table.docs` with columns: الشهر، الحالة، مستندات غير مصنفة، قيود غير مرحلة، تقارير غير معتمدة، إجراء. Status chips: مفتوحة `.chip.green`, قيد المراجعة `.chip.amber`, مغلقة `.chip.slate`. The إجراء cell holds a `.btn.btn-outline.btn-sm` that is "إغلاق شهر" for open/review rows and "فتح بصلاحية" for closed rows.

**Rationale**: A 12-row table is the most scannable layout for monthly status + 3 counts + an action. `table.docs` + `.chip` are the approved table/badge components.

**Reference**: `clients.html`, `journal-entries.html`, `accountant-inbox.html` tables.

**Alternatives considered**: A 12-card grid — acceptable per the spec ("cards/table") but harder to scan for counts; table chosen. (Implementer may use a `.card` grid if visually preferred, still with shared classes.)

---

## R8 — Close-Period and Reopen-Period Modals

**Decision**: Two `.scrim`[`data-overlay`] modals.
- **Close** (`#closePeriodModal`): `.modal-body` contains a `.tip` (warning style) "سيتم إغلاق الفترة ومنع أي تعديل عليها بعد الإغلاق", a short summary list of the month's incomplete items (the 3 counts), and `.modal-foot` with "تأكيد الإغلاق" `.btn.btn-rose`/`.btn-primary` + "إلغاء" `.btn.btn-outline` `data-close`.
- **Reopen** (`#reopenPeriodModal`): `.modal-body` with 2 `.field`s — سبب إعادة الفتح (`.input` textarea, `.req`) and موافقة مدير (`.select-wrap`/`.select` of manager names, `.req`) — and `.modal-foot` "تأكيد إعادة الفتح" `.btn.btn-primary` + "إلغاء" `.btn.btn-outline` `data-close`.

**Rationale**: Both are standard `initOverlays()` modals; the warning reuses `.tip`, the fields reuse `.field`/`.select-wrap`. No new components.

**Reference**: `journal-entries.html` / `chart-of-accounts.html` modals; `.tip` from `client-tax-settings.html`.

---

## R9 — Sidebar / index / Contextual Link Wiring

**Decision**: Convert the 2 `is-soon` spans (`الأرصدة الافتتاحية` grid icon; `الفترات المالية` calendar icon) to live `<a class="sidebar-link">` across all pages via one Python script. New pages mark their own item `active` + `aria-current="page"`. In `index.html`, convert the 2 `is-soon` landing cards (lines ~276/283) to live `<a class="landing-card">`, update chip `14 وحدة`→`12 وحدة` and footer counts `23`→`25` / `14`→`12`. Add one contextual `<a>` to each new page in `settings.html`, `reports.html`, `chart-of-accounts.html`.

**Rationale**: Same sidebar/index conversion pattern proven in Specs 002–004. Contextual links improve discoverability per the spec without restructuring those pages.

**Reference**: Spec 003/004 wiring; sidebar block at `accountant-inbox.html` ~82–91; index cards ~268–290.

---

## R10 — Zero New CSS (hard rule, carried from Spec 004)

**Decision**: Use only classes already defined in `assets/css/output.css`. Confirmed-present classes for this feature: `.kpi-row`, `.card`, `.kpi`, `.kpi-top`, `.kpi-ico*`, `.kpi-num`, `.kpi-lbl`, `.kpi-help`, `.table-wrap`, `.docs`, `.acct`, `.acct-code`, `.acct-name`, `.acct-dot`, `.chip`, `.tip`, `.scrim`, `.modal`, `.modal-head`, `.modal-body`, `.modal-foot`, `.field`, `.req`, `.select-wrap`, `.select`, `.chev`, `.input`, `.set-body`, `.set-row`, `.info`, `.ctrl`, `.switch`, `.track`, `.dropzone`, `.dz-ico`, `.sub`, `.browse`, `.formats`, `.fmt`, `.file-card`, `.fc-ico`, `.fc-body`, `.icon-btn`, `.seg`, `.btn`, `.btn-primary`, `.btn-outline`, `.btn-rose`, `.btn-amber`, `.btn-sm`, `.page-title-wrap`, `.eyebrow`, `.page-sub`, `.go`, `.landing-card`, `.sidebar-link`.

**Rationale**: The Spec 004 verification proved that inventing child class names produces off-design, unstyled components. Reusing only confirmed classes guarantees parity. Verified by `quickstart.md` check (j).

**Exception**: A minimal inline `style=""` is acceptable for a one-off structural gap (precedent: `client-tax-settings.html`), never a new CSS class.
