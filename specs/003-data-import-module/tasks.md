---
description: "Task list for Data Import Module"
---

# Tasks: Data Import Module

**Input**: Design documents from `specs/003-data-import-module/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/page-contracts.md, quickstart.md

**Tests**: Not requested in the spec. Verification is the documented manual + scriptable **audit**
(see `quickstart.md` §3–§5). No TDD/unit-test tasks are generated.

**Organization**: Tasks are grouped by user story. US1 (data-import.html) and US2
(import-mapping.html) are P1 and can run in parallel after Setup. US3–US5 are P2 and each
builds a self-contained page. US6 is P3. US7 wires all 6 pages into navigation and requires
all new pages to exist first.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: US1–US7 (Setup and Polish carry no story label)
- Exact file paths are included in every task

## Path Conventions

Static multi-page frontend at repository root: `index.html`, `pages/*.html`,
`assets/css/input.css`, `assets/css/output.css`, `assets/js/main.js`.
No `src/` or `tests/` trees.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Capture the approved component patterns that all 6 new pages will reuse, so
implementation is consistent and requires no new CSS.

- [x] T001 Read `pages/upload-document.html` to capture `.type-grid`/`.type-card`, `.dropzone`/`.file-card`, `.dropzone[data-zone-id]`, `.fields-grid`/`.field`/`.input`, `.seg`, `.section`/`.section-head` line ranges for reuse reference (read-only, no changes)
- [x] T002 Read `pages/accountant-inbox.html` lines 258–510 to capture `.kpi-row`, `.kpi-top`/`.kpi-num`/`.kpi-lbl`/`.kpi-help`/`.kpi-ico-*`, `.filters`/`.filter`/`.filter-select`, `.table-wrap`/`thead`/`tbody`/`.tbl-foot` patterns (read-only, no changes)
- [x] T003 Read `pages/clients.html` lines 305–450 to capture table, `.chip` badge variants, and inline action button patterns; read `pages/client-tax-settings.html` for `.set-body`/`.set-row`/`.info` context-summary pattern; read `pages/clients.html` around line 529 for the `<div class="scrim" data-overlay id="..." hidden>` modal pattern (read-only, no changes)

**Checkpoint**: Component reuse sources identified; zero new CSS confirmed; building all 6 pages can begin.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Confirm that all interactive behaviors on the 6 new pages are already handled
by existing `boot()` functions in `assets/js/main.js` — no additions needed.

**⚠️ CRITICAL**: Verify this before building any page to avoid discovering a missing
interaction mid-implementation.

- [x] T004 Verify `assets/js/main.js` — confirm these 4 functions exist in `boot()` and handle the needed interactions: `initSingleSelect()` (`.type-grid`/`.type-card` + `.seg`), `initDropzone()` (`.dropzone[data-zone-id]`), `initOverlays()` (`data-open`/`data-close`/`data-overlay`), `initFilterSelects()` (`.filter-select`). No changes needed if all 4 are present.

**Checkpoint**: JS foundation confirmed; all 6 pages can rely on existing `boot()` with no new functions.

---

## Phase 3: User Story 1 - Upload a File and Initiate Import (Priority: P1) 🎯 MVP

**Goal**: A complete file-upload entry point at `pages/data-import.html` with 8 import type
cards, 4 file source options, dropzone, period + notes, and a "what happens next" steps card.

**Independent Test**: Open `pages/data-import.html`; select an import type card (single-select
works); choose a file source (seg works); see the dropzone, period selector, notes textarea;
see the 5-step "ما الذي سيحدث بعد ذلك؟" card; click "رفع وتحليل" → goes to `import-mapping.html`;
no console errors.

**Depends on**: Phase 2 (T004) verification only. Independent of all other user stories.

- [x] T005 [US1] Create `pages/data-import.html` with the internal page shell: `<html lang="ar" dir="rtl">`, `../assets/css/output.css`, `<div class="app-shell">`, full shared sidebar (copy from any existing page), `<main class="main-area">`, `../assets/js/main.js` at end. In this page's sidebar, mark `<a class="sidebar-link active" href="data-import.html" aria-current="page">استيراد البيانات</a>` as the active item; render all other 5 import items as live `<a>` links (not is-soon).
- [x] T006 [US1] In `pages/data-import.html`, add the header block: `.mobile-nav-toggle`, `.page-title-wrap` with eyebrow "استيراد البيانات · رفع ملف جديد", title "استيراد بيانات العميل", subtitle "ارفع ملفات العملاء من الأنظمة القديمة وجهّزها للمراجعة والاستيراد"; client selector `.select-wrap`/`.select` with 4 sample Arabic clients (one selected); 3 header action buttons: "رفع وتحليل" `.btn.btn-primary` `href="import-mapping.html"`, "حفظ كمسودة" `.btn.btn-outline`, "إلغاء" `.btn.btn-outline` `href="clients.html"`.
- [x] T007 [US1] In `pages/data-import.html`, inside a `.card`, add: (a) import type section with `.card-head` label "نوع البيانات المستوردة" + `.type-grid` containing 8 `.type-card` items each with a distinct SVG icon and Arabic label (مبيعات active; مصروفات, عملاء تجاريون, موردون, قيود محاسبية, أرصدة افتتاحية, شجرة حسابات, كشف حساب بنكي); (b) file source section with label "مصدر الملف" + `<div class="seg">` with 4 buttons: Excel (active), CSV, PDF, نظام محاسبي سابق.
- [x] T008 [US1] In `pages/data-import.html`, add: (a) `.dropzone[data-zone-id="import-file"]` with upload SVG, title "اسحب الملف هنا أو اضغط للتحديد", sub-label "Excel · CSV · PDF — حجم أقصى 50 MB"; hidden matching `.file-card[data-file-card-for="import-file"]`; (b) `.fields-grid` with 2 `.field` items: period `.select-wrap` with الربع الأول/الثاني/الثالث/الرابع 2026 + labels, and notes `<textarea class="input" placeholder="أي ملاحظات خاصة بهذا الاستيراد...">`.
- [x] T009 [US1] In `pages/data-import.html`, add a second `.card` below the main form titled "ما الذي سيحدث بعد ذلك؟" with `.card-head`; inside, author a 5-step ordered list where each step has a numbered circle `<span>`, an Arabic step title (رفع الملف, معاينة البيانات, ربط الأعمدة, معالجة الأخطاء, تنفيذ الاستيراد), and a one-line Arabic description of what happens at that step; use inline `style=""` for the numbered circle — no new CSS class.
- [x] T010 [US1] Verify `pages/data-import.html` per `quickstart.md` checks (a)(b)(e)(f)(j): `lang="ar" dir="rtl"`, correct relative asset paths, exactly one `sidebar-link active`, `.type-grid` present, "رفع وتحليل" links to `import-mapping.html`, no console errors.

**Checkpoint**: US1 entry-point page complete and independently demoable.

---

## Phase 4: User Story 2 - Map File Columns to System Fields (Priority: P1)

**Goal**: A complete column-mapping page at `pages/import-mapping.html` with an import context
summary, a 7-row mapping table with inline system field selectors, status chips, a data
preview table, and a missing-fields warning.

**Independent Test**: Open `pages/import-mapping.html`; see context summary (4 rows); see
warning banner; see mapping table with 7 rows, each having a dropdown, a required chip, and
a status chip; see 10-row data preview table; "متابعة للمعاينة" → `import-preview.html`;
"رجوع" → `data-import.html`; no console errors.

**Depends on**: Phase 2 (T004). Independent of US1 (different file).

- [x] T011 [P] [US2] Create `pages/import-mapping.html` with the internal page shell (same rules as T005). Mark `<a class="sidebar-link active" href="import-mapping.html" aria-current="page">مطابقة الحقول</a>` as active. All other 5 import sidebar items are live `<a>` links. Add header: title "ربط أعمدة الملف", subtitle "حدّد الحقل المقابل لكل عمود في ملف الاستيراد"; action buttons: "حفظ قالب الربط" `.btn.btn-outline`, "متابعة للمعاينة" `.btn.btn-primary` `href="import-preview.html"`, "رجوع" `.btn.btn-outline` `href="data-import.html"`.
- [x] T012 [US2] In `pages/import-mapping.html`, add: (a) import context summary `.card` with `.card-head` "ملخص عملية الاستيراد" + `.set-body` with 4 `.set-row` items: العميل (شركة النور للتجارة), نوع الملف (مبيعات), اسم الملف (مبيعات_Q1_2026.xlsx), عدد الصفوف (248 صف); (b) `.tip` warning banner with warning SVG icon and text "3 حقول مطلوبة لم يتم ربطها — يجب ربطها قبل المتابعة للمعاينة".
- [x] T013 [US2] In `pages/import-mapping.html`, add the mapping table `.card` with `.card-head` "جدول ربط الأعمدة" + chip "7 أعمدة مكتشفة"; `.table-wrap` > `<table>` with `<thead>` (5 columns: العمود في الملف, مثال من البيانات, الحقل المقابل في النظام, مطلوب؟, الحالة) and `<tbody>` with exactly 7 rows from `data-model.md`: Invoice Date→تاريخ الفاتورة (`.chip.green` مربوط), Invoice Number→رقم الفاتورة (`.chip.green`), Customer Name→اسم العميل (`.chip.rose` مطلوب—غير مربوط), Amount→المبلغ (`.chip.rose`), VAT→الضريبة (`.chip.rose`), Total→الإجمالي (`.chip.amber` غير مربوط), Notes→ملاحظات (`.chip.slate` متجاهل, اختياري); each row's third column contains a `.select-wrap[style="width:180px"]` with `.select` showing the mapped system field name as the selected option.
- [x] T014 [US2] In `pages/import-mapping.html`, add the data preview `.card` with `.card-head` "معاينة أول 10 صفوف من الملف"; `.table-wrap` > `<table>` with 7 source column headers (Invoice Date, Invoice Number, Customer Name, Amount, VAT, Total, Notes) and 10 rows of realistic Arabic demo data (dates in DD/MM/YYYY, Arabic client names, numeric amounts with 2 decimals, VAT at 15%, matching totals).
- [x] T015 [US2] Verify `pages/import-mapping.html` per quickstart checks (a)(b)(e)(f)(k): RTL + assets, one active sidebar item, 7 `.select-wrap` in tbody, warning tip visible, navigation links correct, no console errors.

**Checkpoint**: US2 mapping page complete and independently demoable.

---

## Phase 5: User Story 3 - Preview Mapped Data Before Import (Priority: P2)

**Goal**: A complete preview page at `pages/import-preview.html` with 4 KPI cards, a data
preview table with row-level status, and a warnings card.

**Independent Test**: Open `pages/import-preview.html`; see 4 KPI cards with counts (248, 235, 8, 5);
see preview table with 10 rows and status chips; see warnings card with 3 warnings; "تنفيذ الاستيراد"
→ `import-history.html`; "رجوع للربط" → `import-mapping.html`; no console errors.

**Depends on**: Phase 2 (T004). Independent of US1 and US2 (different file).

- [x] T016 [P] [US3] Create `pages/import-preview.html` with the internal page shell (same rules as T005). Mark `<a class="sidebar-link active" href="import-preview.html" aria-current="page">معاينة الاستيراد</a>` as active. Add header: title "معاينة الاستيراد", subtitle "راجع البيانات قبل تنفيذ الاستيراد النهائي"; action buttons: "تنفيذ الاستيراد" `.btn.btn-primary` `href="import-history.html"`, "رجوع للربط" `.btn.btn-outline` `href="import-mapping.html"`, "تحميل نسخة مراجعة" `.btn.btn-outline`.
- [x] T017 [US3] In `pages/import-preview.html`, add the `.kpi-row` with 4 `.card` children using `.kpi-top`/`.kpi-ico`/`.kpi-num`/`.kpi-lbl`/`.kpi-help` structure: إجمالي الصفوف 248 (`.kpi-ico-primary`), صفوف جاهزة 235 (`.kpi-ico-green`), صفوف بها تحذيرات 8 (`.kpi-ico-amber`), صفوف بها أخطاء 5 (`.kpi-ico-rose`).
- [x] T018 [US3] In `pages/import-preview.html`, add: (a) preview data `.card` with `.card-head` "معاينة البيانات المستوردة" + chip "235 صف جاهز"; `.table-wrap` > `<table>` with 7 mapped Arabic column headers + status column; 10 rows — 7 `.chip.green` جاهز rows, 2 `.chip.amber` تحذير rows, 1 `.chip.rose` خطأ row; (b) warnings `.card` with `.card-head` "تحذيرات (8 صفوف)" + warning SVG; list of 3 Arabic warnings referencing specific row numbers (e.g. "الصف 47 — المبلغ يحتوي على رمز عملة يجب إزالته قبل الاستيراد").
- [x] T019 [US3] Verify `pages/import-preview.html` per quickstart checks (a)(b)(e)(f)(l kpi-row): RTL + assets, one active sidebar item, KPI row present, navigation links correct, no console errors.

**Checkpoint**: US3 preview page complete and independently demoable.

---

## Phase 6: User Story 4 - View Import History and Track Past Imports (Priority: P2)

**Goal**: A complete import history log at `pages/import-history.html` with 4 KPI cards,
4 filter controls, and a 10-column table with 5 realistic Arabic records.

**Independent Test**: Open `pages/import-history.html`; see 4 KPI cards; see 4 filter selects;
see table with 5 rows (all 3 status types: مكتمل, مكتمل مع أخطاء, فاشل); inline action buttons
visible on each row; "عرض الأخطاء" on IMP-0041 links to `import-errors.html`; "استيراد جديد"
→ `data-import.html`; no console errors.

**Depends on**: Phase 2 (T004). Independent of US1–US3 (different file).

- [x] T020 [P] [US4] Create `pages/import-history.html` with the internal page shell (same rules as T005). Mark `<a class="sidebar-link active" href="import-history.html" aria-current="page">سجل الاستيراد</a>` as active. Add header: title "سجل الاستيراد", subtitle "تتبع جميع عمليات استيراد البيانات لكل العملاء"; action button: "استيراد جديد" `.btn.btn-primary` `href="data-import.html"`.
- [x] T021 [US4] In `pages/import-history.html`, add `.kpi-row` with 4 `.card` children: عمليات هذا الشهر 12 (`.kpi-ico-primary`), مكتملة 8 (`.kpi-ico-green`), مكتملة مع أخطاء 3 (`.kpi-ico-amber`), فاشلة 1 (`.kpi-ico-rose`).
- [x] T022 [US4] In `pages/import-history.html`, add a `.card` with: (a) `.filters` bar with 4 `.filter`/`.filter-select` controls: كل العملاء, كل الأنواع, كل الحالات (active: كل الحالات), هذا الشهر; (b) `.table-wrap` > `<table>` with `<thead>` (10 columns: اسم العميل, نوع الملف, اسم الملف, عدد الصفوف, الناجح, الأخطاء, من رفع, التاريخ, الحالة, إجراء) and `<tbody>` with 5 rows from `data-model.md` demo history inventory; status chips: `.chip.green` مكتمل, `.chip.amber` مكتمل مع أخطاء, `.chip.rose` فاشل; actions column: 4 `.btn.btn-outline.btn-sm` buttons per row (عرض التفاصيل, عرض الأخطاء → `href="import-errors.html"` on rows with errors, إعادة المحاولة, تحميل التقرير); `.tbl-foot` pagination area.
- [x] T023 [US4] Verify `pages/import-history.html` per quickstart checks (a)(b)(e)(f)(l kpi-row): RTL + assets, one active sidebar item, KPI row present, table has 5 rows, "عرض الأخطاء" links to `import-errors.html`, "استيراد جديد" links to `data-import.html`, no console errors.

**Checkpoint**: US4 history page complete and independently demoable.

---

## Phase 7: User Story 5 - Review and Handle Import Errors (Priority: P2)

**Goal**: A complete error detail page at `pages/import-errors.html` with 4 error KPI cards,
an 8-row error table with 5 columns, and 4 action buttons.

**Independent Test**: Open `pages/import-errors.html`; see 4 KPI cards (8, 3, 2, 2 or similar);
see error table with 8 rows covering خطأ مبلغ, خطأ تاريخ, حقل مفقود, قيمة مكررة; all 4 action
buttons visible; "إعادة رفع الملف" → `data-import.html`; "رجوع للسجل" → `import-history.html`;
no console errors.

**Depends on**: Phase 2 (T004). Independent of US1–US4 (different file).

- [x] T024 [P] [US5] Create `pages/import-errors.html` with the internal page shell (same rules as T005). Mark `<a class="sidebar-link active" href="import-errors.html" aria-current="page">أخطاء الاستيراد</a>` as active. Add header: eyebrow "استيراد IMP-0041 · شركة النور للتجارة", title "أخطاء الاستيراد", subtitle "8 أخطاء تمنع اكتمال الاستيراد أو تؤثر على دقة البيانات"; action button: "رجوع للسجل" `.btn.btn-outline` `href="import-history.html"`.
- [x] T025 [US5] In `pages/import-errors.html`, add `.kpi-row` with 4 `.card` children: إجمالي الأخطاء 8 (`.kpi-ico-rose`), أخطاء مبالغ 3 (`.kpi-ico-amber`), أخطاء تواريخ 2 (`.kpi-ico-amber`), حقول مفقودة 2 (`.kpi-ico-primary` or slate).
- [x] T026 [US5] In `pages/import-errors.html`, add a `.card` with `.card-head` "جدول الأخطاء" + chip "8 أخطاء"; `.table-wrap` > `<table>` with `<thead>` (5 columns: رقم الصف, العمود, القيمة, سبب الخطأ, الإجراء المقترح) and `<tbody>` with 8 rows from `data-model.md` error inventory; الصف 47 (المبلغ, ١٢٣٫٠٠ج.م), الصف 63 (المبلغ, parenthesized), الصف 12 (تاريخ الفاتورة, 31/02/2026), الصف 89 (تاريخ, Jan-2026), الصف 5 (رقم الفاتورة, فارغ), الصف 78 (اسم العميل, فارغ), الصف 101 (رقم الفاتورة, مكرر), الصف 134 (الإجمالي, خطأ حساب); سبب الخطأ cells use `.chip` coloring where appropriate.
- [x] T027 [US5] In `pages/import-errors.html`, add a sticky or bottom-of-page action row with 4 `.btn` buttons: "تحميل ملف الأخطاء" `.btn.btn-outline`, "إعادة رفع الملف" `.btn.btn-outline` `href="data-import.html"`, "تجاهل الصفوف الخاطئة واستكمال" `.btn.btn-outline` (styled with amber/warning border), "رجوع للسجل" `.btn.btn-outline` `href="import-history.html"`.
- [x] T028 [US5] Verify `pages/import-errors.html` per quickstart checks (a)(b)(e)(f)(l kpi-row): RTL + assets, one active sidebar item, KPI row present, table has 8 rows, action buttons link correctly, no console errors.

**Checkpoint**: US5 error page complete and independently demoable.

---

## Phase 8: User Story 6 - Manage Saved Import Templates (Priority: P3)

**Goal**: A complete templates manager at `pages/import-templates.html` with a 4-row
templates table, inline action buttons, and a working add-template modal.

**Independent Test**: Open `pages/import-templates.html`; see 4 template rows in a table
(mix of global and client-specific, active and disabled); "إضافة قالب" button opens the
modal with 4 fields; modal closes on "إلغاء" or Escape; "استخدام القالب" links to
`data-import.html`; no console errors.

**Depends on**: Phase 2 (T004). Independent of US1–US5 (different file).

- [x] T029 [P] [US6] Create `pages/import-templates.html` with the internal page shell (same rules as T005). Mark `<a class="sidebar-link active" href="import-templates.html" aria-current="page">قوالب الاستيراد</a>` as active. Add header: title "قوالب الاستيراد المحفوظة", subtitle "أعِد استخدام إعدادات ربط الأعمدة في عمليات استيراد مستقبلية"; action button: "إضافة قالب" `.btn.btn-primary` `data-open="#addTemplateModal"`.
- [x] T030 [US6] In `pages/import-templates.html`, add a `.card` with `.card-head` "القوالب المحفوظة" + chip "4 قوالب"; `.table-wrap` > `<table>` with `<thead>` (7 columns: اسم القالب, نوع الملف, النطاق, آخر استخدام, عدد الحقول, الحالة, إجراء) and `<tbody>` with 4 rows from `data-model.md` template inventory: (1) قالب مبيعات النور, مبيعات, `.chip.slate` شركة النور للتجارة, 14 مايو 2026, 6, `.chip.green` نشط; (2) قالب مصروفات عام, مصروفات, `.chip.primary` عام, 10 مايو 2026, 5, `.chip.green` نشط; (3) قالب قيود SAP, قيود محاسبية, `.chip.primary` عام, 2 مايو 2026, 8, `.chip.green` نشط; (4) قالب موردون قديم, موردون, `.chip.slate` مؤسسة السلام, 1 مارس 2026, 4, `.chip.slate` معطّل. Actions column per row: "استخدام القالب" `.btn.btn-outline.btn-sm` `href="data-import.html"`, "تعديل" `.btn.btn-outline.btn-sm`, "تعطيل" `.btn.btn-outline.btn-sm`.
- [x] T031 [US6] In `pages/import-templates.html`, add the add-template modal: `<div class="scrim" data-overlay id="addTemplateModal" hidden>` containing a modal card with header "إضافة قالب استيراد جديد" + close button `<button data-close>`; `.fields-grid` with 4 `.field` items: (1) اسم القالب `<input class="input" placeholder="مثال: قالب مبيعات شركة النور">`, (2) نوع الملف `.select-wrap`/`.select` with all 8 import types, (3) الحقول `<textarea class="input" placeholder="أدخل الحقول المربوطة — حقل في كل سطر">`, (4) هل هو قالب عام؟ `<label class="switch"><input type="checkbox"><span class="track"></span></label>`; modal footer: "حفظ القالب" `.btn.btn-primary`, "إلغاء" `.btn.btn-outline` `data-close`.
- [x] T032 [US6] Verify `pages/import-templates.html` per quickstart checks (a)(b)(e)(f)(h): RTL + assets, one active sidebar item, `data-overlay` modal present (count=1), modal triggered by `data-open="#addTemplateModal"`, "استخدام القالب" links to `data-import.html`, no console errors.

**Checkpoint**: US6 templates page complete and independently demoable.

---

## Phase 9: User Story 7 - Integrate All Import Pages into Navigation (Priority: P2)

**Goal**: All 6 import module pages are live (not coming-soon) in the sidebar across all 23
pages; `index.html` landing cards are converted; counts updated to 23+14.

**Independent Test**: Open any of the 17 pre-existing pages and verify the 6 import sidebar
links are live `<a>` elements (not `<span class="is-soon">`); check `index.html` footer shows
"23 شاشة مكتملة + 14 وحدة قادمة"; no `is-soon` appears for any of the 6 import module names.

**Depends on**: US1–US6 (all 6 new pages must exist before this wiring step).

- [x] T033 [US7] In all 17 existing `pages/*.html` (accountant-inbox, admin-financial-dashboard, chart-of-accounts, client-dashboard, client-document-details, client-documents, client-onboarding, client-profile, clients, client-tax-settings, document-review, journal-entries, messages, reports, settings, upload-document, users-permissions), convert the 6 `استيراد البيانات` coming-soon sidebar spans to live `<a>` links using a Python script (same pattern as Spec 002 T018): replace `<span class="sidebar-link is-soon" aria-disabled="true">...</span>` with `<a class="sidebar-link" href="[filename].html">...</a>` for each of the 6 import items, removing `<span class="sl-soon">قريباً</span>` from each. All other coming-soon items remain unchanged.
- [x] T034 [US7] In `index.html`, convert the 6 استيراد البيانات `<div class="landing-card is-soon">` cards to live `<a class="landing-card">` links with `href="pages/[filename].html"` and a `.go "فتح الصفحة"` span (same pattern as Spec 002 T019 for each of the 6 cards); update the coming-soon chip from `20 وحدة` → `14 وحدة`; update the footer from `17 شاشة مكتملة + 20 وحدة قادمة` → `23 شاشة مكتملة + 14 وحدة قادمة`.
- [x] T035 [US7] Verify navigation wiring per quickstart checks (d)(e)(g)(i): all 23 pages have live links to each of the 6 import pages; no `is-soon` for the 6 import modules anywhere; no `<a>` carries `is-soon`; every `pages/*.html` has exactly one `sidebar-link active`; index footer correct.

**Checkpoint**: SC-008, SC-009 satisfied; all 23 pages fully integrated; no regressions.

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Full static audit + manual responsive QA + final Definition of Done.

- [x] T036 [P] Run the complete static audit suite from `quickstart.md` §3 checks (a)–(l): all 12 checks pass with the expected results (no output for "expect none" checks; correct counts for file/KPI checks).
- [x] T037 [P] Manual responsive QA on both new pages and existing pages: at mobile width, sidebar toggle opens/closes, import type grid stacks to 2 columns, tables scroll horizontally, forms don't overflow, KPI cards stack, action buttons wrap; no console errors; no visual overflow.
- [x] T038 Final Definition of Done per `quickstart.md` §5: confirm SC-001…SC-009 hold; rebuild `npm run build:css` only if `assets/css/input.css` changed (zero new classes target); confirm no existing section, page, link, or asset path was removed or broken.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — read-only pattern capture.
- **Foundational (Phase 2)**: Depends on Phase 1. Confirms no new JS needed before building.
- **US1 (Phase 3)**: Depends on Phase 2. Independent of all other stories.
- **US2 (Phase 4)**: Depends on Phase 2. Independent of US1 (different file). Can run in parallel with US1.
- **US3 (Phase 5)**: Depends on Phase 2. Independent of US1, US2 (different file). Can run in parallel.
- **US4 (Phase 6)**: Depends on Phase 2. Independent of US1–US3 (different file). Can run in parallel.
- **US5 (Phase 7)**: Depends on Phase 2. Independent of US1–US4 (different file). Can run in parallel.
- **US6 (Phase 8)**: Depends on Phase 2. Independent of US1–US5 (different file). Can run in parallel.
- **US7 (Phase 9)**: Depends on ALL of US1–US6 (target pages must exist for links to be valid).
- **Polish (Phase 10)**: Depends on US7 completion.

### User Story Dependencies

- **US1 (P1)**: needs Phase 2. Builds `data-import.html`.
- **US2 (P1)**: needs Phase 2. Builds `import-mapping.html`. Independent of US1.
- **US3 (P2)**: needs Phase 2. Builds `import-preview.html`. Independent of US1–US2.
- **US4 (P2)**: needs Phase 2. Builds `import-history.html`. Independent of US1–US3.
- **US5 (P2)**: needs Phase 2. Builds `import-errors.html`. Independent of US1–US4.
- **US6 (P3)**: needs Phase 2. Builds `import-templates.html`. Independent of US1–US5.
- **US7 (P2)**: needs all 6 pages to exist (US1–US6 complete).

### Within Each Story

- US1: T005 (shell) → T006 (header) → T007 (type cards + source) → T008 (dropzone + fields) → T009 (steps card) → T010 (verify)
- US2: T011 (shell + header) → T012 (context summary + warning) → T013 (mapping table) → T014 (data preview) → T015 (verify)
- US3: T016 (shell + header) → T017 (KPI row) → T018 (preview table + warnings) → T019 (verify)
- US4: T020 (shell + header) → T021 (KPI row) → T022 (filters + table) → T023 (verify)
- US5: T024 (shell + header) → T025 (KPI row) → T026 (error table) → T027 (action bar) → T028 (verify)
- US6: T029 (shell + header) → T030 (templates table) → T031 (modal) → T032 (verify)
- US7: T033 (Python script, 17 existing pages) → T034 (index.html) → T035 (verify)

### Parallel Opportunities

After Phase 2, all of US1–US6 touch different files and can run in parallel:

```bash
# All 6 pages can be built concurrently after Phase 2:
Task: "Build pages/data-import.html (T005–T010)"        # US1
Task: "Build pages/import-mapping.html (T011–T015)"     # US2
Task: "Build pages/import-preview.html (T016–T019)"     # US3
Task: "Build pages/import-history.html (T020–T023)"     # US4
Task: "Build pages/import-errors.html (T024–T028)"      # US5
Task: "Build pages/import-templates.html (T029–T032)"   # US6
```

Within US7 (Phase 9), T033 and T034 touch different files (17 existing pages vs index.html) and can run in parallel once all 6 new pages exist.

---

## Parallel Example: US1 ∥ US2 ∥ US3 (all P1 and P2 after Phase 2)

```bash
# Launch concurrently (different files, no shared state):
Task: "Create data-import.html with shell, type cards, dropzone, steps card (T005–T010)"
Task: "Create import-mapping.html with mapping table, inline selects, data preview (T011–T015)"
Task: "Create import-preview.html with KPI row, preview table, warnings (T016–T019)"
```

---

## Implementation Strategy

### MVP First (US1 Only)

1. Phase 1 → Phase 2 → Phase 3 (US1). Delivers the import entry point — the accountant can see the full import form, type cards, and "what happens next" guide.

### Incremental Delivery

1. Setup + Foundational (read-only pattern capture, 4 tasks).
2. US1 + US2 in parallel → demo the complete upload-to-mapping flow.
3. US3 → full 3-step workflow (upload → map → preview) demoable end-to-end.
4. US4 + US5 in parallel → import history and error review complete.
5. US6 → template manager complete.
6. US7 → full navigation integration across all 23 pages.
7. Polish: full audit + QA + final DoD.

### Notes

- **[P]** = different files, no dependencies.
- US1–US6 are pure HTML authoring — each page is self-contained.
- The Python script for T033 replaces exactly 6 `is-soon` patterns; all other sidebar items remain unchanged.
- Rebuild `output.css` only if `input.css` changed (zero new CSS class target means no rebuild expected).
- The modal on `import-templates.html` uses `data-open`/`data-overlay`/`data-close` — all handled by `initOverlays()` already in `boot()`.
