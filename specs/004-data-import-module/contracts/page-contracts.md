# UI Page Contracts: Data Import Module (Spec 004)

Each contract defines the required HTML structure, component classes, data attributes, and navigation links for one page. These are the authoritative contracts for the implementation and match the pages already built under Spec 003. Use these for the conformance re-audit.

---

## C1 — data-import.html (استيراد بيانات العميل)

**Shell**: `<html lang="ar" dir="rtl">`, `.app-shell`, full shared sidebar, `../assets/css/output.css`, `../assets/js/main.js`.

**Sidebar active**: `<a class="sidebar-link active" href="data-import.html" aria-current="page">استيراد البيانات</a>`

**Header**: `.mobile-nav-toggle`; `.page-title-wrap` (eyebrow "استيراد البيانات · رفع ملف جديد", title "استيراد بيانات العميل", subtitle "ارفع ملفات العملاء من الأنظمة القديمة وجهّزها للمراجعة والاستيراد"); client selector `.select-wrap`>`.select`; actions "رفع وتحليل" `.btn.btn-primary` (→ `import-mapping.html`), "حفظ كمسودة" `.btn.btn-outline`, "إلغاء" `.btn.btn-outline`.

**Main**:
1. **Import type** (`.card-head` "نوع البيانات المستوردة"): `.type-grid` of 8 `.type-card` (مبيعات active, مصروفات, عملاء تجاريون, موردون, قيود محاسبية, أرصدة افتتاحية, شجرة حسابات, كشف حساب بنكي), each with an SVG icon + Arabic label.
2. **File source** ("مصدر الملف"): `.seg` with 4 buttons — Excel (active), CSV, PDF, نظام محاسبي سابق.
3. **Upload**: `.dropzone[data-zone-id="import-file"]` (title "اسحب الملف هنا أو اضغط للتحديد", sub "Excel · CSV · PDF — حجم أقصى 50 MB"), `<input type="file" accept=".xlsx,.csv,.pdf">`, matching `.file-card[data-file-card-for="import-file"]` (hidden until pick).
4. **Period + Notes** (`.fields-grid`): الفترة المحاسبية `.select-wrap`/`.select`; ملاحظات `<textarea class="input">`.
5. **"ما الذي سيحدث بعد ذلك؟"** card: 5 numbered steps — رفع الملف · معاينة البيانات · ربط الأعمدة · معالجة الأخطاء · تنفيذ الاستيراد (each with a short Arabic description).

**Nav**: "رفع وتحليل" → `import-mapping.html`; "حفظ كمسودة" stays; "إلغاء"/back → `clients.html`.

---

## C2 — import-mapping.html (ربط أعمدة الملف)

**Sidebar active**: `…href="import-mapping.html"…>مطابقة الحقول</a>`

**Header**: title "ربط أعمدة الملف", subtitle "حدّد الحقل المقابل لكل عمود في ملف الاستيراد"; actions "حفظ قالب الربط" `.btn.btn-outline`, "متابعة للمعاينة" `.btn.btn-primary` (→ `import-preview.html`), "رجوع" `.btn.btn-outline` (→ `data-import.html`).

**Import summary** (`.card`>`.set-body`): 4 `.set-row` — العميل, نوع الملف, اسم الملف, عدد الصفوف (شركة النور للتجارة / مبيعات / مبيعات_Q1_2026.xlsx / 248 صف).

**Warning banner** (`.tip`): "3 حقول مطلوبة لم يتم ربطها — يجب ربطها قبل المتابعة".

**Mapping table** (`.card`): `.table-wrap`>`<table>`, 5 columns — العمود في الملف · مثال من البيانات (`.chip.slate`) · الحقل المقابل في النظام (`.select-wrap`/`.select`) · مطلوب؟ (`.chip.rose`/`.chip.slate`) · الحالة (`.chip.green`/`.amber`/`.rose`). 7 rows: Invoice Date, Invoice Number, Customer Name, Amount, VAT, Total, Notes.

**Data preview** (`.card`): "معاينة أول 10 صفوف من الملف" — `.table-wrap`>`<table>`, 7 source columns × 10 Arabic demo rows.

**Nav**: "متابعة للمعاينة" → `import-preview.html`; "رجوع" → `data-import.html`; "حفظ قالب الربط" → save-template affordance / `import-templates.html`.

---

## C3 — import-preview.html (معاينة الاستيراد)

**Sidebar active**: `…href="import-preview.html"…>معاينة الاستيراد</a>`

**Header**: title "معاينة الاستيراد", subtitle "راجع البيانات قبل تنفيذ الاستيراد النهائي"; actions "تنفيذ الاستيراد" `.btn.btn-primary` (→ `import-history.html`), "رجوع للربط" `.btn.btn-outline` (→ `import-mapping.html`), "تحميل نسخة مراجعة" `.btn.btn-outline`.

**KPI row** (4 cards): إجمالي الصفوف 248 (primary) · صفوف جاهزة 235 (green) · صفوف بها تحذيرات 8 (amber) · صفوف بها أخطاء 5 (rose).

**Preview table** (`.card`): "معاينة البيانات المستوردة", chip "235 صف جاهز"; `.table-wrap`>`<table>`, 7 mapped columns + status column × 10 rows; status `.chip.green` (جاهز)/`.amber` (تحذير)/`.rose` (خطأ).

**Warnings card** (`.card`): warning icon, "تحذيرات (8 صفوف)", 3 Arabic warnings with row numbers.

**Nav**: as header actions above.

---

## C4 — import-history.html (سجل الاستيراد)

**Sidebar active**: `…href="import-history.html"…>سجل الاستيراد</a>`

**Header**: title "سجل الاستيراد", subtitle "تتبع جميع عمليات استيراد البيانات لكل العملاء"; action "استيراد جديد" `.btn.btn-primary` (→ `data-import.html`).

**KPI row** (4 cards): عمليات هذا الشهر 12 (primary) · مكتملة 8 (green) · مكتملة مع أخطاء 3 (amber) · فاشلة 1 (rose).

**Filter bar** (`.card`>`.filters`): 4 `.filter`>`.filter-select` — كل العملاء, كل الأنواع, كل الحالات, هذا الشهر.

**Table** (`.card`>`.table-wrap`): 10 columns — اسم العميل, نوع الملف, اسم الملف, عدد الصفوف, الناجح, الأخطاء, من رفع, التاريخ, الحالة, إجراء; 5 rows (data-model); status `.chip.green`/`.amber`/`.rose`; إجراء column has 4 inline `.btn.btn-outline.btn-sm` (عرض التفاصيل, عرض الأخطاء → `import-errors.html`, إعادة المحاولة, تحميل التقرير).

**Pagination** (`.tbl-foot`): row count + controls.

---

## C5 — import-errors.html (أخطاء الاستيراد)

**Sidebar active**: `…href="import-errors.html"…>أخطاء الاستيراد</a>`

**Header**: eyebrow "استيراد IMP-0041 · شركة النور للتجارة", title "أخطاء الاستيراد", subtitle "8 أخطاء تمنع اكتمال الاستيراد أو تؤثر على الدقة"; action "رجوع للسجل" `.btn.btn-outline` (→ `import-history.html`).

**KPI row** (4 cards): إجمالي الأخطاء 8 (rose) · أخطاء مبالغ 3 (amber) · أخطاء تواريخ 2 (amber) · حقول مفقودة 2 (slate/primary).

**Error table** (`.card`>`.table-wrap`): 5 columns — رقم الصف, العمود, القيمة, سبب الخطأ, الإجراء المقترح; 8 rows (data-model).

**Action bar**: "تحميل ملف الأخطاء" `.btn.btn-outline`; "إعادة رفع الملف" `.btn.btn-outline` (→ `data-import.html`); "تجاهل الصفوف الخاطئة واستكمال" `.btn.btn-outline` (warning styling); "رجوع للسجل" `.btn.btn-outline` (→ `import-history.html`).

---

## C6 — import-templates.html (قوالب الاستيراد)

**Sidebar active**: `…href="import-templates.html"…>قوالب الاستيراد</a>`

**Header**: title "قوالب الاستيراد المحفوظة", subtitle "أعِد استخدام إعدادات ربط الأعمدة في عمليات استيراد مستقبلية"; action "إضافة قالب" `.btn.btn-primary` `data-open="#addTemplateModal"`.

**Templates table** (`.card`>`.table-wrap`): 7 columns — اسم القالب, نوع الملف, العميل/عام, آخر استخدام, عدد الحقول, الحالة, إجراء; 4 rows (data-model); status `.chip.green` نشط / `.chip.slate` معطّل; scope `.chip.primary` عام / `.chip.slate` client; إجراء — استخدام القالب (→ `data-import.html`), تعديل, تعطيل.

**Add Template modal** (`<div class="scrim" data-overlay id="addTemplateModal" hidden>`): header "إضافة قالب استيراد جديد" + `data-close`; 4 fields in `.fields-grid` — اسم القالب `<input class="input">`, نوع الملف `.select-wrap`/`.select` (8 types), الحقول `<textarea class="input">`, هل هو قالب عام؟ `<label class="switch">`; footer "حفظ القالب" `.btn.btn-primary` + "إلغاء" `.btn.btn-outline` `data-close`.

---

## C7 — Navigation Wiring (Cross-cutting)

**Sidebar**: in every project page, the 6 `استيراد البيانات` items are live `<a>` links:

```html
<a class="sidebar-link" href="data-import.html"><span class="sl-ico"><!-- upload --></span><span>استيراد البيانات</span></a>
<a class="sidebar-link" href="import-mapping.html"><span class="sl-ico"><!-- arrow-expand --></span><span>مطابقة الحقول</span></a>
<a class="sidebar-link" href="import-preview.html"><span class="sl-ico"><!-- eye --></span><span>معاينة الاستيراد</span></a>
<a class="sidebar-link" href="import-history.html"><span class="sl-ico"><!-- clock --></span><span>سجل الاستيراد</span></a>
<a class="sidebar-link" href="import-errors.html"><span class="sl-ico"><!-- triangle-warning --></span><span>أخطاء الاستيراد</span></a>
<a class="sidebar-link" href="import-templates.html"><span class="sl-ico"><!-- table-grid --></span><span>قوالب الاستيراد</span></a>
```

**index.html**: 6 `استيراد البيانات` landing cards are live `<a class="landing-card" href="pages/…html">`; chip "14 وحدة"; footer "23 شاشة مكتملة + 14 وحدة قادمة".

**Orphan to remove**: `pages/import-template.html` (singular) is NOT part of this contract. The canonical templates page is the plural `import-templates.html`. The singular file must be deleted (see research R12); no contract references it.
