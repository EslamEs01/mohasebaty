# UI Page Contracts: Data Import Module

Each contract defines the required HTML structure, component classes, data attributes, and
navigation links for one page. These are the authoritative contracts for implementation.

---

## C1 — data-import.html (استيراد بيانات العميل)

**Shell**: `<html lang="ar" dir="rtl">`, `<div class="app-shell">`, full shared sidebar,
`../assets/css/output.css`, `../assets/js/main.js`.

**Sidebar active**: `<a class="sidebar-link active" href="data-import.html" aria-current="page">استيراد البيانات</a>`

**Header**:
- `.mobile-nav-toggle`
- `.page-title-wrap`: eyebrow "استيراد البيانات · رفع ملف جديد", title "استيراد بيانات العميل", subtitle "ارفع ملفات العملاء من الأنظمة القديمة وجهّزها للمراجعة والاستيراد"
- Client selector: `.select-wrap` > `.select` (dropdown with 4 sample clients)
- Action buttons: "رفع وتحليل" `.btn.btn-primary` (href to `import-mapping.html`), "حفظ كمسودة" `.btn.btn-outline`, "إلغاء" `.btn.btn-outline`

**Main content** (inside `.card`):

1. **Import type section** (`.card-head` label "نوع البيانات المستوردة"):
   - `.type-grid` with 8 `.type-card` items: مبيعات (active), مصروفات, عملاء تجاريون, موردون, قيود محاسبية, أرصدة افتتاحية, شجرة حسابات, كشف حساب بنكي
   - Each `.type-card` has a relevant SVG icon and Arabic label

2. **File source section** (label "مصدر الملف"):
   - `<div class="seg">` with 4 buttons: Excel (active), CSV, PDF, نظام محاسبي سابق

3. **File upload**:
   - `.dropzone[data-zone-id="import-file"]` with upload icon, title "اسحب الملف هنا أو اضغط للتحديد", sub "Excel · CSV · PDF — حجم أقصى 50 MB"
   - `<input type="file" accept=".xlsx,.csv,.pdf">` inside dropzone
   - Matching `.file-card[data-file-card-for="import-file"]` (hidden initially, shown after pick)

4. **Period + Notes** (`.fields-grid`):
   - Period: `.field` > label "الفترة المحاسبية" + `.select-wrap`/`.select` with quarterly periods
   - Notes: `.field` > label "ملاحظات" + `<textarea class="input">` (placeholder "أي ملاحظات خاصة بهذا الاستيراد...")

5. **"ما الذي سيحدث بعد ذلك؟"** card (separate `.card` below or inlined):
   - `.card-head` with title
   - Ordered list of 5 steps, each with a numbered circle + Arabic label + short description:
     1. رفع الملف — تحليل الملف وكشف الأعمدة تلقائياً
     2. معاينة البيانات — فحص أولي للصفوف والقيم
     3. ربط الأعمدة — ربط أعمدة الملف بحقول النظام
     4. معالجة الأخطاء — مراجعة وتصحيح الصفوف بها مشاكل
     5. تنفيذ الاستيراد — استيراد الصفوف المقبولة إلى النظام

**Navigation links in body**:
- "رفع وتحليل" → `import-mapping.html`
- "حفظ كمسودة" → stays on same page
- "إلغاء" → `clients.html`
- Breadcrumb/back link → `clients.html`

---

## C2 — import-mapping.html (ربط أعمدة الملف)

**Shell**: Same as C1. `../assets/css/output.css`, `../assets/js/main.js`.

**Sidebar active**: `<a class="sidebar-link active" href="import-mapping.html" aria-current="page">مطابقة الحقول</a>`

**Header**:
- Title "ربط أعمدة الملف", subtitle "حدّد الحقل المقابل لكل عمود في ملف الاستيراد"
- Action buttons: "حفظ قالب الربط" `.btn.btn-outline`, "متابعة للمعاينة" `.btn.btn-primary` href→`import-preview.html`, "رجوع" `.btn.btn-outline` href→`data-import.html`

**Import context summary** (`.card` with `.set-body`):
- 4 `.set-row` rows: العميل, نوع الملف, اسم الملف, عدد الصفوف
- Values from demo: شركة النور للتجارة, مبيعات, مبيعات_Q1_2026.xlsx, 248 صف

**Warning banner** (`.tip` with rose/warning style):
- "3 حقول مطلوبة لم يتم ربطها — يجب ربطها قبل المتابعة"

**Mapping table** (`.card`):
- `.card-head`: title "جدول ربط الأعمدة", subtitle "7 أعمدة تم اكتشافها في الملف"
- `.table-wrap` > `<table>` with 5 columns:
  - `العمود في الملف` — source column name (text)
  - `مثال من البيانات` — sample value (`.chip.slate` styled text)
  - `الحقل المقابل في النظام` — `.select-wrap`/`.select` dropdown with system fields
  - `مطلوب؟` — "مطلوب" `.chip.rose` or "اختياري" `.chip.slate`
  - `الحالة` — `.chip.green` مربوط / `.chip.amber` غير مربوط / `.chip.rose` مطلوب — غير مربوط
- 7 rows per data-model.md mapping (Invoice Date, Invoice Number, Customer Name, Amount, VAT, Total, Notes)

**Data preview** (`.card`):
- `.card-head`: title "معاينة أول 10 صفوف من الملف"
- `.table-wrap` > `<table>` with 7 source columns and 10 data rows of Arabic demo data

**Bottom navigation**:
- "حفظ قالب الربط" `.btn.btn-outline` (opens save-template mini-form or links to `import-templates.html`)
- "متابعة للمعاينة" `.btn.btn-primary` → `import-preview.html`
- "رجوع" `.btn.btn-outline` → `data-import.html`

---

## C3 — import-preview.html (معاينة الاستيراد)

**Shell**: Same as C1.

**Sidebar active**: `<a class="sidebar-link active" href="import-preview.html" aria-current="page">معاينة الاستيراد</a>`

**Header**:
- Title "معاينة الاستيراد", subtitle "راجع البيانات قبل تنفيذ الاستيراد النهائي"
- Action buttons: "تنفيذ الاستيراد" `.btn.btn-primary` href→`import-history.html`, "رجوع للربط" `.btn.btn-outline` href→`import-mapping.html`, "تحميل نسخة مراجعة" `.btn.btn-outline`

**KPI row** (`.kpi-row` with 4 `.card` children):
- إجمالي الصفوف: 248 (`.kpi-ico.kpi-ico-primary`)
- صفوف جاهزة: 235 (`.kpi-ico.kpi-ico-green`)
- صفوف بها تحذيرات: 8 (`.kpi-ico.kpi-ico-amber`)
- صفوف بها أخطاء: 5 (`.kpi-ico.kpi-ico-rose`)

**Preview table** (`.card`):
- `.card-head`: title "معاينة البيانات المستوردة", chip "235 صف جاهز"
- `.table-wrap` > `<table>` with 7 mapped column headers + status column; 10 rows of demo data
- Status column uses `.chip.green` (جاهز), `.chip.amber` (تحذير), `.chip.rose` (خطأ)

**Warnings card** (`.card`):
- `.card-head` with warning icon, title "تحذيرات (8 صفوف)"
- List of 3 Arabic warning descriptions with row numbers

**Bottom navigation**:
- "تنفيذ الاستيراد" `.btn.btn-primary` → `import-history.html`
- "رجوع للربط" `.btn.btn-outline` → `import-mapping.html`
- "تحميل نسخة مراجعة" `.btn.btn-outline`

---

## C4 — import-history.html (سجل الاستيراد)

**Shell**: Same as C1.

**Sidebar active**: `<a class="sidebar-link active" href="import-history.html" aria-current="page">سجل الاستيراد</a>`

**Header**:
- Title "سجل الاستيراد", subtitle "تتبع جميع عمليات استيراد البيانات لكل العملاء"
- Action buttons: "استيراد جديد" `.btn.btn-primary` href→`data-import.html`

**KPI row** (`.kpi-row` with 4 `.card` children):
- عمليات هذا الشهر: 12 (`.kpi-ico.kpi-ico-primary`)
- مكتملة: 8 (`.kpi-ico.kpi-ico-green`)
- مكتملة مع أخطاء: 3 (`.kpi-ico.kpi-ico-amber`)
- فاشلة: 1 (`.kpi-ico.kpi-ico-rose`)

**Filter bar** (`.card` > `.filters`):
- 4 `.filter` > `.filter-select`: كل العملاء, كل الأنواع, كل الحالات, هذا الشهر

**Table** (`.card` > `.table-wrap`):
- 10 columns: اسم العميل, نوع الملف, اسم الملف, عدد الصفوف, الناجح, الأخطاء, من رفع, التاريخ, الحالة, إجراء
- 5 rows per data-model.md demo data
- Status badges: `.chip.green` مكتمل, `.chip.amber` مكتمل مع أخطاء, `.chip.rose` فاشل
- Actions column: 4 inline `.btn.btn-outline.btn-sm` buttons per row

**Pagination** (`.tbl-foot`):
- Row count text + pagination controls

---

## C5 — import-errors.html (أخطاء الاستيراد)

**Shell**: Same as C1.

**Sidebar active**: `<a class="sidebar-link active" href="import-errors.html" aria-current="page">أخطاء الاستيراد</a>`

**Header**:
- Eyebrow "استيراد IMP-0041 · شركة النور للتجارة"
- Title "أخطاء الاستيراد", subtitle "8 أخطاء تمنع اكتمال الاستيراد أو تؤثر على الدقة"
- Action buttons: "رجوع للسجل" `.btn.btn-outline` href→`import-history.html`

**KPI row** (`.kpi-row` with 4 `.card` children):
- إجمالي الأخطاء: 8 (`.kpi-ico.kpi-ico-rose`)
- أخطاء مبالغ: 3 (`.kpi-ico.kpi-ico-amber`)
- أخطاء تواريخ: 2 (`.kpi-ico.kpi-ico-amber`)
- حقول مفقودة: 2 (`.kpi-ico.kpi-ico-slate` or primary)

**Error table** (`.card` > `.table-wrap`):
- 5 columns: رقم الصف, العمود, القيمة, سبب الخطأ, الإجراء المقترح
- 8 rows per data-model.md error inventory
- Error type chips in the سبب الخطأ column header area OR row-level color

**Action bar** (bottom of page or sticky `.action-bar`):
- "تحميل ملف الأخطاء" `.btn.btn-outline`
- "إعادة رفع الملف" `.btn.btn-outline` href→`data-import.html`
- "تجاهل الصفوف الخاطئة واستكمال" `.btn.btn-outline` (with warning color styling)
- "رجوع للسجل" `.btn.btn-outline` href→`import-history.html`

---

## C6 — import-templates.html (قوالب الاستيراد)

**Shell**: Same as C1.

**Sidebar active**: `<a class="sidebar-link active" href="import-templates.html" aria-current="page">قوالب الاستيراد</a>`

**Header**:
- Title "قوالب الاستيراد المحفوظة", subtitle "أعِد استخدام إعدادات ربط الأعمدة في عمليات استيراد مستقبلية"
- Action button: "إضافة قالب" `.btn.btn-primary` `data-open="#addTemplateModal"`

**Templates table** (`.card` > `.table-wrap`):
- 7 columns: اسم القالب, نوع الملف, العميل/عام, آخر استخدام, عدد الحقول, الحالة, إجراء
- 4 rows per data-model.md template inventory
- Status badges: `.chip.green` نشط, `.chip.slate` معطّل
- Scope badges: `.chip.primary` عام, `.chip.slate` client name
- Actions per row: "استخدام القالب" (→`data-import.html`), "تعديل" (opens modal or links), "تعطيل"

**Add Template Modal** (`<div class="scrim" data-overlay id="addTemplateModal" hidden>`):
- Modal header: "إضافة قالب استيراد جديد" + close button `data-close`
- 4 fields in `.fields-grid`:
  1. اسم القالب — `<input class="input">` (placeholder "مثال: قالب مبيعات شركة النور")
  2. نوع الملف — `.select-wrap`/`.select` (8 import types)
  3. الحقول — `<textarea class="input">` (list mapped fields, one per line)
  4. هل هو قالب عام؟ — `<label class="switch"><input type="checkbox" /><span class="track"></span></label>`
- Modal footer: "حفظ القالب" `.btn.btn-primary`, "إلغاء" `.btn.btn-outline` `data-close`

---

## C7 — Navigation Wiring (Cross-cutting)

**Sidebar conversion**: In ALL 23 pages (17 existing + 6 new), the 6 `استيراد البيانات` items are live `<a>` links:

```html
<a class="sidebar-link" href="data-import.html">
  <span class="sl-ico"><!-- upload icon --></span>
  <span>استيراد البيانات</span>
</a>
<a class="sidebar-link" href="import-mapping.html">
  <span class="sl-ico"><!-- arrow-expand icon --></span>
  <span>مطابقة الحقول</span>
</a>
<a class="sidebar-link" href="import-preview.html">
  <span class="sl-ico"><!-- eye icon --></span>
  <span>معاينة الاستيراد</span>
</a>
<a class="sidebar-link" href="import-history.html">
  <span class="sl-ico"><!-- clock icon --></span>
  <span>سجل الاستيراد</span>
</a>
<a class="sidebar-link" href="import-errors.html">
  <span class="sl-ico"><!-- triangle-warning icon --></span>
  <span>أخطاء الاستيراد</span>
</a>
<a class="sidebar-link" href="import-templates.html">
  <span class="sl-ico"><!-- table-grid icon --></span>
  <span>قوالب الاستيراد</span>
</a>
```

**index.html** updates:
- 6 `استيراد البيانات` landing cards: `<div class="landing-card is-soon">` → `<a class="landing-card" href="pages/data-import.html">` etc.
- Chip count: `<span class="chip slate">20 وحدة</span>` → `14 وحدة`
- Footer: `17 شاشة مكتملة + 20 وحدة قادمة` → `23 شاشة مكتملة + 14 وحدة قادمة`
