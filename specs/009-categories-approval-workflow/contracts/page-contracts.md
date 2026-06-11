# UI Page Contracts: Document Categories & Approval Workflow (Spec 009)

Each contract defines the required HTML structure, component classes (all confirmed in `output.css`), data attributes, and navigation. **Use only the named classes** — copy markup from the reference pages. **Do NOT use `.btn-rose`** (purged → `.btn-amber`/`.btn-outline`). Sidebar wiring uses the **label-based line fixer** (no spanning regex).

---

## C1 — document-categories.html (تصنيفات المستندات)

**Shell**: `<html lang="ar" dir="rtl">`, `.app-shell`, full shared sidebar, `../assets/css/output.css`, `../assets/js/main.js`. Clone shell from `journal-entries.html`.

**Sidebar active**: `<a class="sidebar-link active" href="document-categories.html" aria-current="page">تصنيفات المستندات</a>`.

**Header** (`.page-title-wrap`): eyebrow "الإعداد المحاسبي · التصنيفات", title "تصنيفات المستندات", subtitle "اربط أنواع المستندات بالحسابات والضريبة وطريقة ظهورها للعميل". Header controls: client selector `.select-wrap`/`.select`; a `.seg` global-template toggle ("قالب عام" / "خاص بالعميل"). Header action: "إضافة تصنيف" `.btn.btn-primary` `data-open="#addCategoryModal"`.

**Layout** (`.layout`): MAIN = group `.seg`/`.seg-tabs` (الكل / إيرادات / مصروفات / قبض / صرف) + the categories `.card` table; SIDE (`.side`) = the usage card.

**Categories table** (`.card` > `.table-wrap` > `table.docs`): `<thead>` 8 columns — اسم التصنيف، النوع، الحساب المرتبط، خاضع للضريبة؟، نسبة الضريبة الافتراضية، يظهر للعميل؟، الحالة، إجراء. `<tbody>` the 12 rows from `data-model.md` (النوع `.chip`; خاضع/يظهر as `.chip.green` نعم / `.chip.slate` لا/مخفي; unlinked account "—" + `.chip.amber`; status chips; إجراء `.btn.btn-outline.btn-sm` تعديل).

**Usage card** (`.side`): `.card` `.card-head` "استخدام التصنيفات" + `.set-body` of 3 `.set-row` — أكثر التصنيفات استخدامًا (مبيعات خدمات · 312), تصنيفات غير مرتبطة بحساب (`.chip.amber` 2), تصنيفات تحتاج مراجعة ضريبية (`.chip.amber` 2), each with a small "عرض" link.

**Add-category modal** (`<div class="scrim" data-overlay id="addCategoryModal" hidden>`): `.modal-head` "إضافة تصنيف جديد" + `data-close`; `.fields-grid` with 7 `.field` — اسم التصنيف (`.input`), نوع الحركة (`.select-wrap`/`.select`: إيراد/مصروف/قبض/صرف), الحساب المرتبط (`.select-wrap`/`.select`), خاضع للضريبة (`.switch`), نسبة الضريبة (`.select-wrap`/`.select`: 15%/0%/غير خاضع), يظهر للعميل (`.switch`), ملاحظات (`<textarea class="input">`); `.modal-foot` "حفظ التصنيف" `.btn.btn-primary` + "إلغاء" `.btn.btn-outline` `data-close`.

---

## C2 — approval-workflow.html (مسار الاعتماد)

**Shell**: same. **Sidebar active**: `<a class="sidebar-link active" href="approval-workflow.html" aria-current="page">سير الاعتماد</a>` (sidebar label "سير الاعتماد" preserved; page title "مسار الاعتماد").

**Header**: eyebrow "الحوكمة · مسار الاعتماد", title "مسار الاعتماد", subtitle "حدد خطوات المراجعة والاعتماد قبل الترحيل أو إصدار التقارير". Header action: "إضافة قاعدة" `.btn.btn-primary` `data-open="#addRuleModal"`.

**Workflow toggles** (`.card` > `.set-body`): 3 `.set-row`, each `.info` (label + helper) + `.ctrl` `<label class="switch"><input type="checkbox"[ checked]><span class="track"></span></label>`: هل الترحيل يحتاج اعتماد؟ (checked), هل التقارير تحتاج اعتماد مدير؟ (checked), هل العميل يرى التقارير المبدئية؟ (unchecked).

**4-step workflow visual** (`.card` > `.steps`): 4 `.step-item` each `.si-num` + `<b>`/`<span>` — 1 رفع المستند، 2 مراجعة المحاسب، 3 اعتماد المدير، 4 الترحيل للحسابات (copy `.steps` markup from `data-import.html`).

**Layout** (`.layout`): MAIN = toggles card + workflow-visual card + the approval-rules table; SIDE (`.side`) = the pending-approvals card.

**Approval-rules table** (`.card` > `.table-wrap` > `table.docs`): `<thead>` 6 columns — نوع العملية، الشرط، المراجع الأول، المعتمد النهائي، الحالة، إجراء. `<tbody>` the 5 rows from `data-model.md` (status `.chip.green` مفعّلة / `.chip.slate` معطّلة / `.chip.amber` يحتاج إكمال; missing final approver shows "—"; إجراء `.btn.btn-outline.btn-sm` تعديل).

**Add-rule modal** (`#addRuleModal`): 5 `.field` — اسم القاعدة (`.input`), نوع العملية (`.select-wrap`/`.select`), الشرط المالي (`.input`), المستخدم/الدور المسؤول (`.select-wrap`/`.select`), الحالة (`.select-wrap`/`.select`: مفعّلة/معطّلة); `.modal-foot` "حفظ القاعدة" `.btn.btn-primary` + "إلغاء" `.btn.btn-outline` `data-close`.

**Pending-approvals card** (`.side`): `.card` `.card-head` "بانتظار الاعتماد" + `.set-body` of 3 `.set-row` — مستندات تنتظر اعتماد (`.chip.amber` 7 → accountant-inbox.html), تقارير تنتظر اعتماد (`.chip.amber` 2 → vat-report.html), فترات تنتظر إغلاق (`.chip.amber` 1 → fiscal-periods.html).

---

## C3 — Navigation Wiring (Cross-cutting)

**Sidebar** (label-based line fixer): in every page, the 2 items become live `<a>`:
```html
<a class="sidebar-link" href="document-categories.html"><span class="sl-ico"><!-- categories icon --></span><span>تصنيفات المستندات</span></a>
<a class="sidebar-link" href="approval-workflow.html"><span class="sl-ico"><!-- workflow icon --></span><span>سير الاعتماد</span></a>
```
Each new page marks its own item `active` + `aria-current="page"`; one active item per page.

**index.html**: convert the 2 `<div class="landing-card is-soon">` (تصنيفات المستندات ~line 290, سير الاعتماد ~line 437) to live `<a class="landing-card" href="pages/document-categories.html">` / `href="pages/approval-workflow.html">` with `.go "فتح الصفحة"`; chip `5 وحدة` → `3 وحدة`; footer `32 شاشة مكتملة + 5 وحدة قادمة` → `34 شاشة مكتملة + 3 وحدة قادمة`.

**Contextual links**: `settings.html` → `document-categories.html` AND `approval-workflow.html`; `document-review.html` → `document-categories.html`.
