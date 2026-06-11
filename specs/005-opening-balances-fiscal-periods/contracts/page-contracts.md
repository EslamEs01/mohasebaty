# UI Page Contracts: Opening Balances & Fiscal Periods (Spec 005)

Each contract defines the required HTML structure, component classes (all confirmed in `output.css`), data attributes, and navigation links for one page. These are the authoritative contracts for implementation. **Use only the classes named here** (copy markup from the reference pages); inventing child classes is the exact defect Spec 004 caught.

---

## C1 — opening-balances.html (الأرصدة الافتتاحية)

**Shell**: `<html lang="ar" dir="rtl">`, `.app-shell`, full shared sidebar, `../assets/css/output.css`, `../assets/js/main.js`.

**Sidebar active**: `<a class="sidebar-link active" href="opening-balances.html" aria-current="page">الأرصدة الافتتاحية</a>` (the other import/period items live links).

**Header** (`.page-title-wrap`): eyebrow "الإعداد المحاسبي · أرصدة بداية التشغيل", title "الأرصدة الافتتاحية", subtitle "أدخل أو ارفع أرصدة بداية التشغيل وتأكد من توازن المدين والدائن". Header controls: client selector `.select-wrap`/`.select` (4 Arabic clients); start/go-live date `<input class="input" type="date">` (or a `.select-wrap` period). Header actions: "إضافة رصيد" `.btn.btn-primary` `data-open="#addBalanceModal"`, "رفع ملف أرصدة" `.btn.btn-outline`, "اعتماد الأرصدة" `.btn.btn-primary` (or `.btn-strong`), "تصدير" `.btn.btn-outline`.

**Balance status cards** (`.kpi-row`, 4 × `.card kpi`):
- إجمالي المدين — 580,000 ﷼ — `.kpi-ico-green`
- إجمالي الدائن — 580,000 ﷼ — `.kpi-ico-amber`
- الفرق — 0 ﷼ — `.kpi-ico-primary`
- الحالة — body shows `.chip.green` "متوازن" — `.kpi-ico-green` (or `.kpi-ico-rose` when غير متوازن)

**Validation card** (`.tip`): "يجب أن يكون إجمالي المدين مساويًا لإجمالي الدائن قبل اعتماد الأرصدة. لا يمكن الاعتماد مع وجود فرق."

**Opening-balances table** (`.card` > `.table-wrap` > `table.docs`): `<thead>` with 7 columns — كود الحساب، اسم الحساب، النوع، رصيد مدين، رصيد دائن، ملاحظات، الحالة. `<tbody>` with the 10 rows from `data-model.md` (`.acct-code` for code; `.acct-name`/`.acct-dot` for name; type/debit/credit/notes plain `<td>`; status `.chip.green` مطابق / `.chip.amber` يحتاج مراجعة). A `.tbl-foot` (or table-foot row) MAY show the totals (مدين 580,000 / دائن 580,000 / الفرق 0).

**Add-balance modal** (`<div class="scrim" data-overlay id="addBalanceModal" hidden>` > `.modal`): `.modal-head` "إضافة رصيد افتتاحي" + `data-close`; `.modal-body` `.fields-grid` with 4 `.field`s — الحساب (`.select-wrap`/`.select`), مدين (`<input class="input" type="number">`), دائن (`<input class="input" type="number">`), ملاحظات (`<textarea class="input">`); `.modal-foot` "حفظ الرصيد" `.btn.btn-primary` + "إلغاء" `.btn.btn-outline` `data-close`.

**Optional upload region**: a `.dropzone[data-zone-id="balances-file"]` + matching `.file-card[data-file-card-for="balances-file"]` (post-004 corrected markup) revealed by/near "رفع ملف أرصدة".

**Nav**: header "اعتماد الأرصدة" shows a confirmation state; breadcrumb/back → `chart-of-accounts.html`. Contextual inbound link added FROM `chart-of-accounts.html`.

---

## C2 — fiscal-periods.html (الفترات المالية)

**Shell**: same as C1.

**Sidebar active**: `<a class="sidebar-link active" href="fiscal-periods.html" aria-current="page">الفترات المالية</a>`

**Header**: eyebrow "الإعداد المحاسبي · السنة المالية والفترات", title "الفترات المالية", subtitle "إدارة السنة المالية وحالة الشهور وإغلاق الفترات بعد المراجعة". Header controls: client selector `.select-wrap`/`.select`. Header action: "إنشاء سنة مالية جديدة" `.btn.btn-primary` (`data-open="#newYearModal"` or link).

**Fiscal-year setup** (`.card` > `.set-body`): `.set-row` items for السنة المالية (2026), تاريخ البداية (01/01/2026), تاريخ النهاية (31/12/2026), العملة (ريال سعودي), الحالة (`.chip.green` نشطة). Each row: `.info` label + value or `.ctrl`.

**Period list** (`.card` > `.table-wrap` > `table.docs`): `<thead>` — الشهر، الحالة، مستندات غير مصنفة، قيود غير مرحلة، تقارير غير معتمدة، إجراء. `<tbody>` with the 12 month rows from `data-model.md`. Status chips: `.chip.green` مفتوحة / `.chip.amber` قيد المراجعة / `.chip.slate` مغلقة. إجراء cell: `.btn.btn-outline.btn-sm` — "إغلاق شهر" `data-open="#closePeriodModal"` for open/review rows; "فتح بصلاحية" `data-open="#reopenPeriodModal"` for مغلقة rows.

**Close-period modal** (`<div class="scrim" data-overlay id="closePeriodModal" hidden>`): `.modal-head` "إغلاق الفترة المالية" + `data-close`; `.modal-body` with a `.tip` warning ("سيتم إغلاق الفترة ومنع التعديل عليها — لا يمكن التراجع إلا بصلاحية مدير") and an incomplete-items summary for the month (مستندات غير مصنفة / قيود غير مرحلة / تقارير غير معتمدة counts); `.modal-foot` "تأكيد الإغلاق" `.btn.btn-rose` (or `.btn-primary`) + "إلغاء" `.btn.btn-outline` `data-close`.

**Reopen-period modal** (`<div class="scrim" data-overlay id="reopenPeriodModal" hidden>`): `.modal-head` "إعادة فتح فترة مغلقة" + `data-close`; `.modal-body` `.fields-grid` with 2 `.field`s — سبب إعادة الفتح (`<textarea class="input">` + `.req`) and موافقة مدير (`.select-wrap`/`.select` of manager names + `.req`); `.modal-foot` "تأكيد إعادة الفتح" `.btn.btn-primary` + "إلغاء" `.btn.btn-outline` `data-close`.

**Nav**: contextual inbound links added FROM `settings.html` and `reports.html`.

---

## C3 — Navigation Wiring (Cross-cutting)

**Sidebar**: in every project page, the 2 items become live `<a>` links (icons preserved from the existing `is-soon` spans):

```html
<a class="sidebar-link" href="opening-balances.html"><span class="sl-ico"><!-- grid icon --></span><span>الأرصدة الافتتاحية</span></a>
<a class="sidebar-link" href="fiscal-periods.html"><span class="sl-ico"><!-- calendar icon --></span><span>الفترات المالية</span></a>
```
Each new page marks its own item `active` + `aria-current="page"`; every page keeps exactly one active item.

**index.html**: convert the 2 `<div class="landing-card is-soon">` (الأرصدة الافتتاحية ~line 276, الفترات المالية ~line 283) to live `<a class="landing-card" href="pages/…html">` with a `.go "فتح الصفحة"`; chip `14 وحدة` → `12 وحدة`; footer `23 شاشة مكتملة + 14 وحدة قادمة` → `25 شاشة مكتملة + 12 وحدة قادمة`.

**Contextual links** (non-destructive, one small `<a>` each):
- `chart-of-accounts.html` → `opening-balances.html` (e.g., a header/secondary action "الأرصدة الافتتاحية").
- `settings.html` → `fiscal-periods.html` (accounting/fiscal-year section).
- `reports.html` → `fiscal-periods.html` (period-closing context).
