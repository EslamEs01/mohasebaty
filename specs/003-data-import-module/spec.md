# Feature Specification: وحدة استيراد البيانات — Data Import Module

**Feature Branch**: `003-data-import-module`  
**Created**: 2026-06-08  
**Status**: Draft  
**Input**: User description: "Spec 004 — Data Import Module"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Upload a File and Initiate Import (Priority: P1)

An accountant selects a client, chooses the import type (e.g., مبيعات), picks the file source format (Excel/CSV/PDF/نظام محاسبي سابق), uploads the file, selects the period, adds optional notes, then clicks "رفع وتحليل" to begin the import workflow. They can also save as a draft without uploading.

**Why this priority**: This is the entry point of the entire import workflow. Without it, no subsequent step is reachable. It delivers visible value immediately — the accounting team can finally upload client files through the product UI.

**Independent Test**: Open `pages/data-import.html`; select a client; choose an import type card; choose a file format; upload a file; see the "رفع وتحليل" and "حفظ كمسودة" actions; view the "ما الذي سيحدث بعد ذلك" steps card.

**Acceptance Scenarios**:

1. **Given** the accountant opens the import page, **When** they select an import type card and a file format, **Then** exactly one card is highlighted as active in each group.
2. **Given** a file is uploaded, **When** the accountant clicks "رفع وتحليل", **Then** they are directed to the mapping page with import context visible.
3. **Given** the accountant clicks "حفظ كمسودة", **Then** the page state is preserved (draft) without navigating away.
4. **Given** the accountant clicks "إلغاء", **Then** the form is reset.

---

### User Story 2 - Map File Columns to System Fields (Priority: P1)

The accountant reviews the automatically detected columns from the uploaded file, maps each source column to the correct system field using dropdown selectors, sees sample data for each column, and identifies any missing required fields before proceeding to preview.

**Why this priority**: Column mapping is the critical bridge between raw file data and structured accounting data. Incorrect mapping produces bad imports; the UI must make this step clear, visual, and verifiable.

**Independent Test**: Open `pages/import-mapping.html`; see the import context summary (client, file name, row count); view the mapping table with source columns, sample data, and system field selectors; see required/optional status and validation state per row; use the action buttons.

**Acceptance Scenarios**:

1. **Given** the mapping page opens, **When** the accountant views the table, **Then** each row shows the source column name, a sample data value, a system field dropdown, a required indicator, and a status badge.
2. **Given** a required field is not mapped, **When** the accountant tries to proceed, **Then** a warning is shown and "متابعة للمعاينة" is blocked.
3. **Given** all required fields are mapped, **When** the accountant clicks "حفظ قالب الربط", **Then** the mapping is saved as a reusable template.
4. **Given** the accountant clicks "متابعة للمعاينة", **Then** they navigate to the preview page.

---

### User Story 3 - Preview Mapped Data Before Import (Priority: P2)

The accountant sees a preview of the first rows of data as they will be imported, along with summary cards showing row counts (total, ready, warnings, errors). They can review warnings before deciding to execute the import or go back to fix mapping.

**Why this priority**: Preview prevents costly mistakes. It gives the accountant a final checkpoint to catch data quality issues before committing data to the system.

**Independent Test**: Open `pages/import-preview.html`; see 4 KPI summary cards; view the data preview table with mapped column headers; see a warnings card with listed issues; use the three action buttons.

**Acceptance Scenarios**:

1. **Given** the preview page opens, **When** the accountant views it, **Then** summary cards show total rows, ready rows, warning rows, and error rows with counts.
2. **Given** rows with warnings exist, **When** the accountant views the warnings card, **Then** each warning is described clearly with row reference.
3. **Given** the accountant clicks "تنفيذ الاستيراد", **Then** they are shown a confirmation state and redirected to the history page on success.
4. **Given** the accountant clicks "رجوع للربط", **Then** they return to the mapping page with context preserved.

---

### User Story 4 - View Import History and Track Past Imports (Priority: P2)

The accountant or manager views a complete log of all import operations for all clients, filtered by client, type, status, and period. They can drill into errors, retry failed imports, or download a report for any historical import.

**Why this priority**: Traceability and audit support are core to a bookkeeping platform. The history page is how the team tracks what was imported, when, and by whom.

**Independent Test**: Open `pages/import-history.html`; see 4 KPI cards; apply filter controls; view the data table with all required columns; use inline action buttons.

**Acceptance Scenarios**:

1. **Given** the history page opens, **When** the accountant views the KPI cards, **Then** they see counts for: عمليات هذا الشهر, مكتملة, مكتملة مع أخطاء, فاشلة.
2. **Given** the accountant applies a filter (e.g., client or status), **Then** the table reflects the filter visually.
3. **Given** an import has errors, **When** the accountant clicks "عرض الأخطاء", **Then** they navigate to the import errors page for that import.
4. **Given** the accountant clicks "تحميل التقرير", **Then** a download is initiated for that import's report.

---

### User Story 5 - Review and Handle Import Errors (Priority: P2)

The accountant reviews a detailed breakdown of errors from a specific import operation — grouped by error type (amount errors, date errors, missing fields) — and chooses to download the error file, re-upload a corrected file, skip erroneous rows and continue, or go back.

**Why this priority**: Errors are inevitable in real-world data imports. The error page is the resolution mechanism that prevents the accounting team from being blocked on imperfect client data.

**Independent Test**: Open `pages/import-errors.html`; see 4 error summary cards; view the error table with all 5 columns; use the 4 action buttons.

**Acceptance Scenarios**:

1. **Given** the errors page opens, **When** the accountant views it, **Then** error summary cards show: إجمالي الأخطاء, أخطاء مبالغ, أخطاء تواريخ, حقول مفقودة.
2. **Given** the error table is shown, **When** the accountant reviews a row, **Then** they see: رقم الصف, العمود, القيمة الخاطئة, سبب الخطأ, الإجراء المقترح.
3. **Given** the accountant clicks "تجاهل الصفوف الخاطئة واستكمال", **Then** a confirmation is shown before proceeding.
4. **Given** the accountant clicks "إعادة رفع الملف", **Then** they return to the data import page.

---

### User Story 6 - Manage Saved Import Templates (Priority: P3)

The accountant or manager views all saved column-mapping templates, adds new ones via a modal, edits existing ones, or disables outdated templates. Templates can be marked as global (shared across all clients) or client-specific.

**Why this priority**: Templates save time on recurring imports from the same client or same system. They reduce re-mapping effort on every import. P3 because core import workflow works without them.

**Independent Test**: Open `pages/import-templates.html`; view the templates table/cards with all required columns; open the "إضافة قالب" modal; see all 4 modal fields; use inline action buttons.

**Acceptance Scenarios**:

1. **Given** the templates page opens, **When** the accountant views it, **Then** they see a table/card list with: اسم القالب, نوع الملف, العميل/عام, آخر استخدام, عدد الحقول, الحالة, إجراء.
2. **Given** the accountant clicks "إضافة قالب", **Then** a modal opens with fields: اسم القالب, نوع الملف, الحقول, هل هو قالب عام؟.
3. **Given** the accountant clicks "تعطيل" on a template, **Then** its status badge changes to disabled.
4. **Given** the accountant clicks "استخدام القالب", **Then** they are taken to the import page with that template pre-selected.

---

### Edge Cases

- What happens when a file has no recognizable columns? → Mapping table shows all columns as unmatched, all system fields empty; user must map manually.
- What happens when 100% of rows have errors? → Preview shows 0 ready rows; "تنفيذ الاستيراد" is disabled; user must fix or skip.
- What happens when the same file is uploaded twice? → History shows both entries independently (no dedup in UI).
- What happens when a template is applied to a file with different columns? → Unmatched columns show "غير مربوط" status; user must remap missing fields.
- What happens when the user navigates directly to mapping/preview without uploading? → Page renders with demo static data (frontend-only; no guard needed for static pages).

---

## Requirements *(mandatory)*

### Functional Requirements

**Page 1 — استيراد بيانات العميل (data-import.html)**

- **FR-001**: The page MUST display a client selector allowing the accountant to choose which client's data is being imported.
- **FR-002**: The page MUST display 8 import-type cards (مبيعات, مصروفات, عملاء تجاريون, موردون, قيود محاسبية, أرصدة افتتاحية, شجرة حسابات, كشف حساب بنكي) with single-select behavior.
- **FR-003**: The page MUST display 4 file source options (Excel, CSV, PDF, نظام محاسبي سابق) with single-select behavior.
- **FR-004**: The page MUST include a file upload area (dropzone) accepting common file types.
- **FR-005**: The page MUST provide a period selector (fiscal period/date range).
- **FR-006**: The page MUST include a notes textarea for optional context.
- **FR-007**: The page MUST include 3 action buttons: "رفع وتحليل" (primary), "حفظ كمسودة" (outline), "إلغاء" (outline).
- **FR-008**: The page MUST display a "what happens next" informational card showing the 5-step import workflow.

**Page 2 — ربط أعمدة الملف (import-mapping.html)**

- **FR-009**: The page MUST show an import context summary (العميل, نوع الملف, اسم الملف, عدد الصفوف).
- **FR-010**: The page MUST display a mapping table with 5 columns: العمود في الملف, مثال من البيانات, الحقل المقابل في النظام, مطلوب؟, الحالة.
- **FR-011**: The mapping table MUST include at least 7 sample rows: تاريخ الفاتورة, رقم الفاتورة, اسم العميل, المبلغ, الضريبة, الإجمالي, ملاحظات.
- **FR-012**: The page MUST display a data preview of the first 10 rows from the source file.
- **FR-013**: The page MUST show a missing-fields warning when required mappings are absent.
- **FR-014**: The page MUST include 3 action buttons: "حفظ قالب الربط" (outline), "متابعة للمعاينة" (primary), "رجوع" (outline).

**Page 3 — معاينة الاستيراد (import-preview.html)**

- **FR-015**: The page MUST show 4 summary KPI cards: إجمالي الصفوف, صفوف جاهزة, صفوف بها تحذيرات, صفوف بها أخطاء.
- **FR-016**: The page MUST display a preview table of mapped data with realistic sample rows.
- **FR-017**: The page MUST show a warnings card listing specific warnings by row.
- **FR-018**: The page MUST include 3 action buttons: "تنفيذ الاستيراد" (primary), "رجوع للربط" (outline), "تحميل نسخة مراجعة" (outline).

**Page 4 — سجل الاستيراد (import-history.html)**

- **FR-019**: The page MUST show 4 KPI cards: عمليات هذا الشهر, مكتملة, مكتملة مع أخطاء, فاشلة.
- **FR-020**: The page MUST include filter controls: العميل, نوع الملف, الحالة, الفترة.
- **FR-021**: The page MUST display a table with 10 columns: اسم العميل, نوع الملف, اسم الملف, عدد الصفوف, الناجح, الأخطاء, من رفع, التاريخ, الحالة, إجراء.
- **FR-022**: Each table row MUST have inline action buttons: عرض التفاصيل, عرض الأخطاء, إعادة المحاولة, تحميل التقرير.

**Page 5 — أخطاء الاستيراد (import-errors.html)**

- **FR-023**: The page MUST show 4 error-summary KPI cards: إجمالي الأخطاء, أخطاء مبالغ, أخطاء تواريخ, حقول مفقودة.
- **FR-024**: The page MUST display an error table with 5 columns: رقم الصف, العمود, القيمة, سبب الخطأ, الإجراء المقترح.
- **FR-025**: The page MUST include 4 action buttons: "تحميل ملف الأخطاء" (outline), "إعادة رفع الملف" (outline), "تجاهل الصفوف الخاطئة واستكمال" (warning/outline), "رجوع للسجل" (outline).

**Page 6 — قوالب الاستيراد (import-templates.html)**

- **FR-026**: The page MUST display templates in a table or card list with 7 columns/fields: اسم القالب, نوع الملف, العميل/عام, آخر استخدام, عدد الحقول, الحالة, إجراء.
- **FR-027**: The page MUST have an "إضافة قالب" button that opens a modal with 4 fields: اسم القالب, نوع الملف, الحقول, هل هو قالب عام؟ (toggle).
- **FR-028**: Each template MUST have 3 inline actions: "استخدام القالب", "تعديل", "تعطيل".

**Cross-cutting**

- **FR-029**: All 6 pages MUST include the full shared sidebar with the import workflow pages wired as live links (not coming-soon) in a dedicated "استيراد البيانات" section.
- **FR-030**: All 6 pages MUST include navigation links connecting the import workflow (data-import → import-mapping → import-preview; import-history ↔ import-errors; import-mapping → import-templates).
- **FR-031**: `index.html` MUST be updated to link the 6 new pages as live landing cards (converting coming-soon entries for the import section).
- **FR-032**: All pages MUST use `lang="ar" dir="rtl"`, local Tailwind CSS, and Arabic-only static demo data.

### Key Entities

- **Import Operation**: A single file upload event tied to a client, import type, file source, period, and notes. Has states: draft, processing, complete, complete-with-errors, failed.
- **Column Mapping**: A link between a source file column and a system field. Attributes: source column name, sample value, mapped system field, required flag, validation status.
- **Import Template**: A saved collection of column mappings for reuse. Attributes: name, import type, client (or global), field count, active/disabled status, last-used date.
- **Import Error**: A specific data quality issue in a single row. Attributes: row number, column, bad value, error type (amount/date/missing), suggested action.
- **Import History Record**: A log entry for a completed import operation. Attributes: client, type, file name, row count, success count, error count, uploaded-by, date, status.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: An accountant can initiate a new file import from selection to the preview step in under 3 minutes using the 3-page workflow.
- **SC-002**: All 6 import workflow pages open without console errors, display complete Arabic content, and are navigable via sidebar and internal links.
- **SC-003**: Every page passes the static audit: RTL declared, local assets only, no CDN/framework, exactly one active sidebar item per page.
- **SC-004**: The mapping table displays at least 7 realistic Arabic column-mapping rows with status badges, making required vs. optional fields immediately distinguishable.
- **SC-005**: The history page displays a filterable table with at least 5 realistic import records covering all status types (مكتملة, مكتملة مع أخطاء, فاشلة).
- **SC-006**: The error page displays at least 8 realistic error rows covering all 3 error types (amount, date, missing field), each with an Arabic suggested action.
- **SC-007**: The templates page shows at least 4 saved templates (mix of global and client-specific) with all inline actions visible.
- **SC-008**: The sidebar and `index.html` are updated so the 6 import pages are live links across all pages in the project.
- **SC-009**: No existing page, sidebar link, or asset path is broken after adding the 6 new pages.

---

## Assumptions

- All 6 pages are static frontend only — no backend API calls; data is hardcoded Arabic demo content.
- The import workflow is linear for demo purposes: data-import → import-mapping → import-preview; real branching (retry, error-fix loops) is shown via links but not enforced by JS logic.
- File format detection and column auto-detection are simulated visually (the mapping table shows pre-filled demo data as if detection happened).
- The "تنفيذ الاستيراد" action on the preview page shows a success state visually (e.g., a completion message or redirect to history) without backend confirmation.
- The modal on import-templates.html uses the existing `data-open`/`data-overlay` pattern from main.js.
- The import type cards use the `.type-grid`/`.type-card` single-select pattern already implemented in the design system.
- The file source selector uses `.seg` (segmented control) or `.type-grid` depending on visual fit.
- "نظام محاسبي سابق" as a file source implies a generic legacy system export (no specific format required in the UI).
- All 6 pages will be added to the sidebar under a "استيراد البيانات" section label that replaces the current coming-soon items for that section.
- The count of coming-soon units in `index.html` will decrease by 6 (from 20 → 14) after implementing this spec.
- The page count in `index.html` footer will increase from 17 → 23.
