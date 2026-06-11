# Feature Specification: وحدة استيراد البيانات — Data Import Module

**Feature Branch**: `004-data-import-module`  
**Created**: 2026-06-11  
**Status**: Draft  
**Input**: User description: "Spec 004 — Data Import Module: complete frontend module for importing client data files (Excel/CSV/PDF/legacy-system exports) received from clients' old accounting systems — upload & analyze, map columns, preview, review history, resolve errors, and manage saved import templates. Use the approved Mohasebaty design system; do not redesign. Six pages: data-import, import-mapping, import-preview, import-history, import-errors, import-templates."

## Overview

The accounting firm regularly receives data files (Excel, CSV, PDF, or exports from clients' previous accounting systems) and needs to bring that data into the platform. This feature delivers the **frontend** of that workflow as six complete, linked Arabic/RTL pages built on the approved design system. It lets an accountant upload a client's file, map the file's columns to the system's fields, preview the result, execute the import, track the history of all imports, resolve data errors, and reuse saved column-mapping templates. This stage is presentation-only: all data is realistic static Arabic demo content; there is no backend, API, or real file processing.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Upload a Client File and Start an Import (Priority: P1)

An accountant opens the import page, selects the client whose data is being imported, picks the import type (e.g., مبيعات), chooses the source format (Excel / CSV / PDF / نظام محاسبي سابق), uploads the file into the upload area, selects the period, optionally adds notes, then clicks "رفع وتحليل" to move into the mapping step. They can instead click "حفظ كمسودة" to keep the entry as a draft, or "إلغاء" to clear the form.

**Why this priority**: This is the entry point of the whole module — no later step is reachable without it. It delivers immediate, visible value: the firm can finally bring client files into the product through a real UI.

**Independent Test**: Open `pages/data-import.html`; choose a client; select one import-type card; select one file-source option; use the upload area; pick a period; see the three action buttons and the "ما الذي سيحدث بعد ذلك" steps card.

**Acceptance Scenarios**:

1. **Given** the accountant opens the import page, **When** they select an import-type card and a file-source option, **Then** exactly one card is highlighted as active within each group.
2. **Given** a file is selected in the upload area, **When** the accountant clicks "رفع وتحليل", **Then** they are taken to the mapping page with the import context (client, type, file name) visible.
3. **Given** the form is filled, **When** the accountant clicks "حفظ كمسودة", **Then** the entry is presented as a saved draft without leaving the workflow.
4. **Given** the form has values, **When** the accountant clicks "إلغاء", **Then** the form is cleared back to its empty state.

---

### User Story 2 - Map File Columns to System Fields (Priority: P1)

The accountant reviews the columns detected from the uploaded file, maps each source column to the correct system field, sees a sample value for each column, and is warned about any required field that is still unmapped before continuing to preview. They can save the current mapping as a reusable template.

**Why this priority**: Column mapping is the bridge between a raw file and structured accounting data. Wrong mapping means wrong data; the UI must make this step clear, visual, and verifiable. It is the second half of the minimum viable import path.

**Independent Test**: Open `pages/import-mapping.html`; read the import summary (العميل، نوع الملف، اسم الملف، عدد الصفوف); view the mapping table with source column, sample value, system-field selector, required indicator, and status; see the first-10-rows preview; trigger the missing-fields warning; use the three action buttons.

**Acceptance Scenarios**:

1. **Given** the mapping page opens, **When** the accountant views the table, **Then** each row shows the file column name, a data sample, a system-field selector, a "مطلوب؟" indicator, and a status badge.
2. **Given** at least one required field is unmapped, **When** the accountant tries to continue, **Then** a missing-fields warning is shown and progressing to preview is blocked.
3. **Given** all required fields are mapped, **When** the accountant clicks "حفظ قالب الربط", **Then** the mapping is presented as saved for reuse.
4. **Given** all required fields are mapped, **When** the accountant clicks "متابعة للمعاينة", **Then** they navigate to the preview page; **When** they click "رجوع", **Then** they return to the import page.

---

### User Story 3 - Preview Mapped Data Before Importing (Priority: P2)

Before committing, the accountant sees a preview of the mapped data alongside summary cards counting total rows, ready rows, rows with warnings, and rows with errors. They review listed warnings, then either execute the import, go back to fix the mapping, or download a review copy.

**Why this priority**: Preview is the final checkpoint that prevents costly bad imports. It gives the accountant one clear place to catch data-quality issues before data is committed.

**Independent Test**: Open `pages/import-preview.html`; see four summary cards (إجمالي الصفوف، صفوف جاهزة، صفوف بها تحذيرات، صفوف بها أخطاء); view the mapped-data preview table; read the warnings card; use the three action buttons.

**Acceptance Scenarios**:

1. **Given** the preview page opens, **When** the accountant views it, **Then** the four summary cards show total, ready, warning, and error row counts.
2. **Given** rows with warnings exist, **When** the accountant reads the warnings card, **Then** each warning is described clearly with a row reference.
3. **Given** the accountant clicks "تنفيذ الاستيراد", **Then** a success/confirmation state is shown and the flow leads to the import history page.
4. **Given** the accountant clicks "رجوع للربط", **Then** they return to the mapping page; **When** they click "تحميل نسخة مراجعة", **Then** a review-copy download is presented.

---

### User Story 4 - Track Import History (Priority: P2)

An accountant or manager reviews a log of all import operations across all clients, filtered by client, file type, status, and period. From any record they can open details, view errors, retry, or download a report.

**Why this priority**: Traceability and audit are core to a bookkeeping platform. History is how the team answers what was imported, when, by whom, and with what outcome.

**Independent Test**: Open `pages/import-history.html`; see four KPI cards (عمليات هذا الشهر، مكتملة، مكتملة مع أخطاء، فاشلة); use the filter controls; view the records table with all required columns; use the per-row actions.

**Acceptance Scenarios**:

1. **Given** the history page opens, **When** the accountant views the KPI cards, **Then** they see counts for: عمليات هذا الشهر، مكتملة، مكتملة مع أخطاء، فاشلة.
2. **Given** the filter controls (العميل، نوع الملف، الحالة، الفترة), **When** the accountant uses them, **Then** the table presents results consistent with the selected filters.
3. **Given** a record has errors, **When** the accountant clicks "عرض الأخطاء", **Then** they navigate to the import errors page for that operation.
4. **Given** any record, **When** the accountant clicks "تحميل التقرير", **Then** a report download is presented; **When** they click "إعادة المحاولة", **Then** a retry action is offered.

---

### User Story 5 - Review and Resolve Import Errors (Priority: P2)

The accountant reviews a breakdown of errors from a specific import, grouped by type (amount errors, date errors, missing fields), inspects each erroneous row with its column, value, reason, and suggested fix, then chooses to download the error file, re-upload a corrected file, skip the erroneous rows and continue, or return to the history.

**Why this priority**: Real-world client data is imperfect. The error page is the resolution path that keeps the team from being blocked on flawed files.

**Independent Test**: Open `pages/import-errors.html`; see four error-summary cards (إجمالي الأخطاء، أخطاء مبالغ، أخطاء تواريخ، حقول مفقودة); view the error table with all five columns; use the four action buttons.

**Acceptance Scenarios**:

1. **Given** the errors page opens, **When** the accountant views it, **Then** the summary cards show: إجمالي الأخطاء، أخطاء مبالغ، أخطاء تواريخ، حقول مفقودة.
2. **Given** the error table, **When** the accountant reads a row, **Then** they see: رقم الصف، العمود، القيمة، سبب الخطأ، الإجراء المقترح.
3. **Given** the accountant clicks "تجاهل الصفوف الخاطئة واستكمال", **Then** a confirmation is presented before continuing.
4. **Given** the accountant clicks "إعادة رفع الملف", **Then** they return to the import page; **When** they click "رجوع للسجل", **Then** they return to the history page.

---

### User Story 6 - Manage Saved Import Templates (Priority: P3)

An accountant or manager views all saved column-mapping templates, adds new ones through a modal, uses a template to start an import, edits an existing template, or disables an outdated one. A template can be marked as global (shared across clients) or tied to a specific client.

**Why this priority**: Templates remove repeat effort for recurring imports from the same client or system. They are an efficiency layer — the core workflow works without them — hence P3.

**Independent Test**: Open `pages/import-templates.html`; view the templates list with all required fields; open the "إضافة قالب" modal and see its four fields; use the per-row actions.

**Acceptance Scenarios**:

1. **Given** the templates page opens, **When** the accountant views it, **Then** each template shows: اسم القالب، نوع الملف، العميل/عام، آخر استخدام، عدد الحقول، الحالة، إجراء.
2. **Given** the accountant clicks "إضافة قالب", **Then** a modal opens with fields: اسم القالب، نوع الملف، الحقول، هل هو قالب عام؟.
3. **Given** a template row, **When** the accountant clicks "تعطيل", **Then** its status badge reflects a disabled state.
4. **Given** a template row, **When** the accountant clicks "استخدام القالب", **Then** they are taken to the import page associated with that template; **When** they click "تعديل", **Then** an edit affordance is presented.

---

### Edge Cases

- **No recognizable columns in the file** → the mapping table shows every column as unmatched with empty system-field selectors; the accountant must map manually.
- **Every row has errors (0 ready)** → preview shows 0 ready rows and "تنفيذ الاستيراد" is unavailable until errors are fixed or rows are skipped.
- **Same file uploaded twice** → history lists both operations independently (no deduplication in the prototype).
- **A template applied to a file with different columns** → unmatched columns show a "غير مربوط" status; the accountant remaps the missing fields.
- **Navigating directly to mapping/preview/errors without uploading** → pages render with their static demo data (frontend-only prototype; no navigation guard required).

## Requirements *(mandatory)*

### Functional Requirements

**Page 1 — استيراد بيانات العميل (`pages/data-import.html`)**

- **FR-001**: The page MUST present a header with title "استيراد بيانات العميل" and subtitle "ارفع ملفات العملاء من الأنظمة القديمة وجهّزها للمراجعة والاستيراد".
- **FR-002**: The page MUST provide a client selector for choosing which client's data is being imported.
- **FR-003**: The page MUST present eight import-type cards (مبيعات، مصروفات، عملاء تجاريون، موردون، قيود محاسبية، أرصدة افتتاحية، شجرة حسابات، كشف حساب بنكي) with single-select behavior.
- **FR-004**: The page MUST present four file-source options (Excel، CSV، PDF، نظام محاسبي سابق) with single-select behavior.
- **FR-005**: The page MUST include a file upload area consistent with the approved upload UI, with accepted-file helper text and a selected-file visual state.
- **FR-006**: The page MUST provide a period selector (fiscal period or date range).
- **FR-007**: The page MUST include a notes field for optional context.
- **FR-008**: The page MUST include three action buttons: "رفع وتحليل" (primary), "حفظ كمسودة", and "إلغاء".
- **FR-009**: The page MUST display a "ما الذي سيحدث بعد ذلك" card listing the five workflow steps: رفع الملف، معاينة البيانات، ربط الأعمدة، معالجة الأخطاء، تنفيذ الاستيراد.

**Page 2 — ربط أعمدة الملف (`pages/import-mapping.html`)**

- **FR-010**: The page MUST show an import summary: العميل، نوع الملف، اسم الملف، عدد الصفوف.
- **FR-011**: The page MUST present a mapping table with five columns: العمود في الملف، مثال من البيانات، الحقل المقابل في النظام، مطلوب؟، الحالة.
- **FR-012**: The mapping table MUST include at least the seven example mappings: Invoice Date → تاريخ الفاتورة، Invoice Number → رقم الفاتورة، Customer Name → اسم العميل، Amount → المبلغ، VAT → الضريبة، Total → الإجمالي، Notes → ملاحظات.
- **FR-013**: The page MUST display a preview of the first 10 rows of the source data.
- **FR-014**: The page MUST show a missing-required-fields warning when one or more required mappings are absent.
- **FR-015**: The page MUST include three action buttons: "حفظ قالب الربط", "متابعة للمعاينة" (primary), and "رجوع".

**Page 3 — معاينة الاستيراد (`pages/import-preview.html`)**

- **FR-016**: The page MUST show four summary cards: إجمالي الصفوف، صفوف جاهزة، صفوف بها تحذيرات، صفوف بها أخطاء, each with a count.
- **FR-017**: The page MUST display a preview table of the mapped data with realistic sample rows.
- **FR-018**: The page MUST present a warnings card listing specific warnings with row references.
- **FR-019**: The page MUST include three action buttons: "تنفيذ الاستيراد" (primary), "رجوع للربط", and "تحميل نسخة مراجعة".

**Page 4 — سجل الاستيراد (`pages/import-history.html`)**

- **FR-020**: The page MUST show four KPI cards: عمليات هذا الشهر، مكتملة، مكتملة مع أخطاء، فاشلة.
- **FR-021**: The page MUST provide filter controls: العميل، نوع الملف، الحالة، الفترة.
- **FR-022**: The page MUST present a records table with ten columns: اسم العميل، نوع الملف، اسم الملف، عدد الصفوف، الناجح، الأخطاء، من رفع، التاريخ، الحالة، إجراء.
- **FR-023**: Each record MUST expose actions: عرض التفاصيل، عرض الأخطاء، إعادة المحاولة، تحميل التقرير.

**Page 5 — أخطاء الاستيراد (`pages/import-errors.html`)**

- **FR-024**: The page MUST show four error-summary cards: إجمالي الأخطاء، أخطاء مبالغ، أخطاء تواريخ، حقول مفقودة.
- **FR-025**: The page MUST present an error table with five columns: رقم الصف، العمود، القيمة، سبب الخطأ، الإجراء المقترح.
- **FR-026**: The page MUST include four action buttons: "تحميل ملف الأخطاء", "إعادة رفع الملف", "تجاهل الصفوف الخاطئة واستكمال", and "رجوع للسجل".

**Page 6 — قوالب الاستيراد المحفوظة (`pages/import-templates.html`)**

- **FR-027**: The page MUST present saved templates (table or cards) with the fields: اسم القالب، نوع الملف، العميل/عام، آخر استخدام، عدد الحقول، الحالة، إجراء.
- **FR-028**: The page MUST provide an "إضافة قالب" action that opens a modal with four fields: اسم القالب، نوع الملف، الحقول، هل هو قالب عام؟.
- **FR-029**: Each template MUST expose actions: استخدام القالب، تعديل، تعطيل.

**Cross-cutting**

- **FR-030**: All six pages MUST share the approved header and sidebar, with the import workflow pages wired as live links within a dedicated "استيراد البيانات" sidebar section, and exactly one active sidebar item highlighted per page.
- **FR-031**: The pages MUST be linked into a coherent workflow: data-import → import-mapping → import-preview → (execute) → import-history; import-history ↔ import-errors; import-mapping ↔ import-templates; with "back" links honoring the reverse direction.
- **FR-032**: `index.html` MUST link all six pages as live entries (replacing any coming-soon placeholders for the import section), keeping its page/section counters consistent.
- **FR-033**: Every page MUST declare `<html lang="ar" dir="rtl">`, link the local compiled stylesheet via a correct relative path, use professional Arabic-only static demo data, and reuse the approved cards, KPI cards, tables, forms, buttons, badges, filters, upload area, and modal components without introducing a new visual style.
- **FR-034**: All page content MUST exist in HTML; JavaScript MAY be used only for UI behavior (single-select active states, modal open/close, selected-file preview) and MUST NOT generate page content.

### Key Entities

- **Import Operation**: A single file-upload event for a client. Attributes: client, import type, file source/format, period, notes, status (مسودة، قيد المعالجة، مكتملة، مكتملة مع أخطاء، فاشلة).
- **Column Mapping**: A link from a source file column to a system field. Attributes: source column name, sample value, mapped system field, required flag, validation status (مربوط، غير مربوط، تحذير).
- **Import Template**: A saved, reusable set of column mappings. Attributes: name, import type, scope (عام أو عميل محدد), field count, status (نشط، معطّل), last-used date.
- **Import Error**: A data-quality issue in one row. Attributes: row number, column, offending value, error type (مبلغ، تاريخ، حقل مفقود), suggested action.
- **Import History Record**: A log entry for a completed operation. Attributes: client, file type, file name, row count, success count, error count, uploaded-by, date, status.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: An accountant can move from selecting a client to reaching the preview step in under 3 minutes using the data-import → mapping → preview path.
- **SC-002**: All six pages open with no console errors, display complete Arabic content (no placeholders, no Lorem ipsum, no untranslated English UI labels), and are reachable from the sidebar.
- **SC-003**: Each page declares RTL, links only local assets, and highlights exactly one active sidebar item — verifiable by static inspection.
- **SC-004**: The mapping table shows at least the seven required example mappings with sample values and status badges, making required vs. optional fields immediately distinguishable.
- **SC-005**: The history table shows at least five realistic records covering all status types (مكتملة، مكتملة مع أخطاء، فاشلة) and responds to its filters.
- **SC-006**: The errors page shows at least eight realistic error rows covering all three error types (مبلغ، تاريخ، حقل مفقود), each with an Arabic suggested action.
- **SC-007**: The templates page shows at least four saved templates mixing global and client-specific scope, each with all three actions visible, and an "إضافة قالب" modal containing all four fields.
- **SC-008**: The six pages are live links in both the shared sidebar and `index.html` across the project.
- **SC-009**: After adding/confirming the six pages, no existing page, sidebar link, or asset path is broken.

## Assumptions

- The module is frontend-only: no backend, API, database, authentication, or real file processing; all data is hardcoded Arabic demo content.
- The workflow is presented linearly for the demo (data-import → mapping → preview → history); branching paths (retry, fix-error loops) are expressed through links rather than enforced logic.
- File-format detection and column auto-detection are simulated visually — the mapping and preview tables show pre-filled demo data as if detection had already run.
- "تنفيذ الاستيراد" shows a success/confirmation state and leads to history without any backend confirmation.
- "نظام محاسبي سابق" as a source means a generic legacy-system export; no specific file format is required in the UI.
- The pages reuse the existing approved patterns — single-select cards, KPI cards, data tables, filter bars, the upload area, and the shared modal — rather than introducing new components.
- This module is the Accountant/Admin portal experience (it uses accounting terminology such as قيود محاسبية، شجرة حسابات، أرصدة افتتاحية) and is not exposed in the simplified Client portal.

## Notes — Relationship to Existing Spec 003

- Spec `003-data-import-module` covers the same module and its six pages (`pages/data-import.html`, `import-mapping.html`, `import-preview.html`, `import-history.html`, `import-errors.html`, `import-templates.html`) are already implemented in the repository.
- This spec (004) restates and refines the same scope on its own feature branch. It is non-destructive: it adds no requirement that breaks or removes existing pages, sidebar links, or assets (Constitution Principle VII). Confirm with the project owner whether 004 is intended to **supersede/refine** 003 or to be archived in favor of 003 before proceeding to `/speckit-plan`.
