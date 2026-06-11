# Feature Specification: تصنيفات المستندات ومسار الاعتماد — Document Categories & Approval Workflow

**Feature Branch**: `009-categories-approval-workflow`  
**Created**: 2026-06-11  
**Status**: Draft  
**Input**: User description: "Spec 008 (numbered 009) — Categories & Approval Workflow: internal admin/accounting frontend pages to (1) manage document/accounting categories — mapping each category to a linked account, VAT treatment, and client visibility — and (2) configure the approval workflow (rules + steps) required before posting or issuing reports. Two pages: document-categories.html, approval-workflow.html. Internal admin/accounting; no backend; reuse existing modal styles; add links from settings and document review."

## Overview

Before documents can be classified and posted consistently, the firm needs a governed setup layer: **document/accounting categories** that map each kind of transaction to the right account, VAT treatment, and what the client is allowed to see; and an **approval workflow** that defines who reviews and approves what (and under which conditions) before entries are posted or reports issued. This feature delivers the **frontend** of both as Arabic/RTL Accountant/Admin pages on the approved Mohasebaty design system. This stage is presentation-only: all data is realistic static Arabic demo content, there is no backend, the toggles/rules do not enforce anything, and the add modals are authored in HTML (reusing the existing modal pattern).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Manage Document/Accounting Categories (Priority: P1)

An accountant picks a client (or switches to the global template) and reviews the categories grouped by movement type (تصنيفات الإيرادات، المصروفات، القبض، الصرف). A table maps each category to its linked account, whether it is taxable and at what default VAT rate, whether it shows to the client, and its status. An "إضافة تصنيف" button opens a modal to create a new category. A usage card surfaces the most-used categories, categories not linked to an account, and categories needing a tax review.

**Why this priority**: Categories are the backbone of consistent classification — every document and entry depends on them. This page is the primary setup deliverable.

**Independent Test**: Open `pages/document-categories.html`; pick a client or toggle the global template; see the 4 category groups; scan the categories table with all 8 columns and realistic Arabic rows; open the "إضافة تصنيف" modal and see its 7 fields; see the usage card with its 3 insights.

**Acceptance Scenarios**:

1. **Given** the page is open, **When** the accountant views the header, **Then** they see a client selector and a global-template toggle (categories can be per-client or a shared global template).
2. **Given** the category groups, **When** viewed, **Then** they cover تصنيفات الإيرادات، تصنيفات المصروفات، تصنيفات القبض، تصنيفات الصرف.
3. **Given** the categories table, **When** the accountant reads a row, **Then** they see: اسم التصنيف، النوع، الحساب المرتبط، خاضع للضريبة؟، نسبة الضريبة الافتراضية، يظهر للعميل؟، الحالة، إجراء.
4. **Given** the accountant clicks "إضافة تصنيف", **Then** a modal opens with fields: اسم التصنيف، نوع الحركة، الحساب المرتبط، خاضع للضريبة، نسبة الضريبة، يظهر للعميل، ملاحظات; it closes on cancel/escape.
5. **Given** the usage card, **When** viewed, **Then** it shows أكثر التصنيفات استخدامًا، تصنيفات غير مرتبطة بحساب، تصنيفات تحتاج مراجعة ضريبية.

---

### User Story 2 - Configure the Approval Workflow (Priority: P1)

An admin defines the review/approval steps that gate posting and reporting. Workflow toggles control whether posting needs approval, whether reports need manager approval, and whether the client sees preliminary reports. An approval-rules table lists each rule (operation type, condition, first reviewer, final approver, status), with realistic example rules. A visual shows the 4-step flow (upload → accountant review → manager approval → posting). An "إضافة قاعدة" button opens a modal. A pending-approvals section summarizes what is currently awaiting approval.

**Why this priority**: The approval workflow is the governance control that protects data integrity before posting. It is the second core deliverable and is independent of the categories page.

**Independent Test**: Open `pages/approval-workflow.html`; see the 3 workflow toggles; scan the approval-rules table with all 6 columns and the example rules; see the 4-step workflow visual; open the "إضافة قاعدة" modal and see its 5 fields; see the pending-approvals section with its 3 counts.

**Acceptance Scenarios**:

1. **Given** the page is open, **When** the admin views the toggles, **Then** they see: هل الترحيل يحتاج اعتماد؟، هل التقارير تحتاج اعتماد مدير؟، هل العميل يرى التقارير المبدئية؟ (each a switch).
2. **Given** the approval-rules table, **When** the admin reads a row, **Then** they see: نوع العملية، الشرط، المراجع الأول، المعتمد النهائي، الحالة، إجراء, with realistic example rules (مستندات أكبر من 10,000، ترحيل القيود، اعتماد تقرير VAT، إغلاق فترة مالية، إعادة فتح فترة مغلقة).
3. **Given** the workflow visual, **When** viewed, **Then** it shows the 4 steps: رفع المستند، مراجعة المحاسب، اعتماد المدير، الترحيل للحسابات.
4. **Given** the admin clicks "إضافة قاعدة", **Then** a modal opens with fields: اسم القاعدة، نوع العملية، الشرط المالي، المستخدم/الدور المسؤول، الحالة; it closes on cancel/escape.
5. **Given** the pending-approvals section, **When** viewed, **Then** it shows مستندات تنتظر اعتماد، تقارير تنتظر اعتماد، فترات تنتظر إغلاق.

---

### User Story 3 - Reach the Pages from Existing Navigation & Related Screens (Priority: P3)

The two pages are wired so the team can reach them: live links in the shared sidebar (replacing the existing "تصنيفات المستندات" and "سير الاعتماد" coming-soon items), live cards on the index landing page, and contextual links from `settings.html` and `document-review.html`.

**Why this priority**: Integration makes the setup pages discoverable, but each page delivers value on its own first.

**Independent Test**: From any page, the two items are live sidebar links (no قريباً); `index.html` shows both as live cards; `settings.html` and `document-review.html` each link to the relevant page; every page still has exactly one active sidebar item.

**Acceptance Scenarios**:

1. **Given** any project page, **When** the accountant opens the sidebar, **Then** "تصنيفات المستندات" and "سير الاعتماد" are live links to the respective pages.
2. **Given** `settings.html` and `document-review.html`, **When** viewed, **Then** each provides a working contextual link to the relevant new page.
3. **Given** `index.html`, **When** viewed, **Then** both pages appear as live landing cards and the page/coming-soon counters stay consistent.

---

### Edge Cases

- **A category not linked to an account** → its linked-account cell shows a clear empty/warning state and it is counted in the "تصنيفات غير مرتبطة بحساب" usage insight; it cannot be relied on for posting.
- **A taxable category with no default rate** → flagged for "تحتاج مراجعة ضريبية".
- **A category hidden from the client** → its "يظهر للعميل؟" cell shows a distinct "مخفي" state (client-portal rule: clients never see accounting internals).
- **All approval toggles off** → the workflow visual still shows the steps but indicates that approval is not enforced (informational); the rules table may show rules as معطّلة.
- **A rule with no final approver** → flagged in its status (يحتاج إكمال) so it is not relied upon.
- **Navigating to either page directly** → it renders with its static demo data (frontend-only; no guard needed).

## Requirements *(mandatory)*

### Functional Requirements

**Page 1 — تصنيفات المستندات (`pages/document-categories.html`)**

- **FR-001**: The page MUST present a header with title "تصنيفات المستندات" and subtitle "اربط أنواع المستندات بالحسابات والضريبة وطريقة ظهورها للعميل".
- **FR-002**: The page MUST provide a client selector and a global-template toggle (categories are managed per-client or as a shared global template).
- **FR-003**: The page MUST present the four category groups: تصنيفات الإيرادات، تصنيفات المصروفات، تصنيفات القبض، تصنيفات الصرف.
- **FR-004**: The page MUST present a categories table with eight columns: اسم التصنيف، النوع، الحساب المرتبط، خاضع للضريبة؟، نسبة الضريبة الافتراضية، يظهر للعميل؟، الحالة، إجراء, with realistic Arabic demo rows across the four groups.
- **FR-005**: The page MUST provide an "إضافة تصنيف" action opening a modal with seven fields: اسم التصنيف، نوع الحركة، الحساب المرتبط، خاضع للضريبة، نسبة الضريبة، يظهر للعميل، ملاحظات.
- **FR-006**: The page MUST present a usage card with three insights: أكثر التصنيفات استخدامًا، تصنيفات غير مرتبطة بحساب، تصنيفات تحتاج مراجعة ضريبية.

**Page 2 — مسار الاعتماد (`pages/approval-workflow.html`)**

- **FR-007**: The page MUST present a header with title "مسار الاعتماد" and subtitle "حدد خطوات المراجعة والاعتماد قبل الترحيل أو إصدار التقارير".
- **FR-008**: The page MUST present three workflow toggles (switches): هل الترحيل يحتاج اعتماد؟، هل التقارير تحتاج اعتماد مدير؟، هل العميل يرى التقارير المبدئية؟.
- **FR-009**: The page MUST present an approval-rules table with six columns: نوع العملية، الشرط، المراجع الأول، المعتمد النهائي، الحالة، إجراء, including the example rules: مستندات أكبر من 10,000، ترحيل القيود، اعتماد تقرير VAT، إغلاق فترة مالية، إعادة فتح فترة مغلقة.
- **FR-010**: The page MUST present a workflow visual with four steps: رفع المستند، مراجعة المحاسب، اعتماد المدير، الترحيل للحسابات.
- **FR-011**: The page MUST provide an "إضافة قاعدة" action opening a modal with five fields: اسم القاعدة، نوع العملية، الشرط المالي، المستخدم/الدور المسؤول، الحالة.
- **FR-012**: The page MUST present a pending-approvals section with three items: مستندات تنتظر اعتماد، تقارير تنتظر اعتماد، فترات تنتظر إغلاق.

**Cross-cutting**

- **FR-013**: Both pages MUST be Accountant/Admin (internal) pages and MUST NOT appear in the simplified Client portal; client-visibility settings on the categories page are an internal control over what clients see.
- **FR-014**: Each page MUST share the approved header and sidebar with exactly one active sidebar item highlighted, and MUST reuse the approved cards, tables, switches/toggles, badges, forms, buttons, step/visual, and modal components without introducing a new visual style.
- **FR-015**: Each add modal MUST be authored in HTML and reuse the existing modal styles; JavaScript MAY be used ONLY for UI behavior (modal open/close, switch/toggle states, global-template toggle) — never to generate page content.
- **FR-016**: The shared sidebar across all pages MUST present "تصنيفات المستندات" and "سير الاعتماد" as live links (replacing the current coming-soon items), and `index.html` MUST present both as live landing cards with its page/coming-soon counters kept consistent.
- **FR-017**: `settings.html` and `document-review.html` MUST each provide a working contextual link to the relevant new page.
- **FR-018**: Every page MUST declare `<html lang="ar" dir="rtl">`, link the local compiled stylesheet via a correct relative path, and use professional Arabic-only static demo data.

### Key Entities

- **Document Category (تصنيف)**: A classification mapping. Attributes: name, movement type (إيرادات / مصروفات / قبض / صرف), linked account (or unlinked), taxable flag, default VAT rate, client-visible flag, status (نشط / معطّل / يحتاج مراجعة), usage count.
- **Approval Rule (قاعدة اعتماد)**: A governance rule. Attributes: name, operation type (ترحيل / تقرير / إقفال فترة / إعادة فتح / مستند فوق حد), condition (e.g., amount > 10,000), first reviewer, final approver, status (مفعّلة / معطّلة / يحتاج إكمال).
- **Workflow Setting (إعداد المسار)**: A boolean control. Attributes: key (posting-needs-approval / reports-need-manager-approval / client-sees-preliminary), enabled flag.
- **Pending Approval (بند بانتظار الاعتماد)**: A queued item. Attributes: kind (مستند / تقرير / فترة), count.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: An accountant can open `pages/document-categories.html`, switch between a client and the global template, and understand each category's account/VAT/visibility mapping at a glance within seconds.
- **SC-002**: Both pages open with no console errors, display complete professional Arabic content (no placeholders, no Lorem ipsum, no untranslated English UI labels), and are reachable from the sidebar.
- **SC-003**: Each page declares RTL, links only local assets, and highlights exactly one active sidebar item — verifiable by static inspection.
- **SC-004**: The categories table shows at least 10 realistic rows spanning all four groups, including at least one unlinked-to-account row, one hidden-from-client row, and one needs-tax-review row.
- **SC-005**: The approval-rules table shows at least the 5 example rules, each with a first reviewer and a final approver (or a clear "needs completion" status), and the 3 workflow toggles render as switches.
- **SC-006**: The workflow visual shows all 4 steps in order, and the pending-approvals section shows the 3 counts; each add modal opens and closes correctly with all its required fields.
- **SC-007**: The two pages are live links in the shared sidebar and `index.html`, and contextual links exist from `settings.html` and `document-review.html`.
- **SC-008**: After adding the two pages and converting the two coming-soon sidebar items, no existing page, sidebar link, or asset path is broken.

## Assumptions

- Both pages are frontend-only: no backend, API, database, authentication, or enforcement; all data is hardcoded Arabic demo content.
- Toggles, rules, modal "save", and row actions are presented visually but do not enforce or persist anything (no real workflow execution).
- The global-template toggle switches the displayed demo data between a "global template" view and a client-specific view visually; the linked-account dropdown references demo accounts from the chart of accounts.
- Default VAT rates reference the Saudi-first 15% (and 0% for zero-rated), consistent with the tax module; categories can be marked non-taxable.
- The workflow visual reuses an existing approved step/sequence component; the 3 toggles reuse the approved switch component.
- These are Accountant/Admin pages; the "يظهر للعميل؟" control governs client-portal visibility but the pages themselves are not shown to clients.
- The sidebar already contains coming-soon entries "تصنيفات المستندات" and "سير الاعتماد"; this feature converts them to live links across all pages and updates `index.html` counts accordingly.
- This feature configures categories and approval rules only; it does not perform posting, classification, or report generation (those are separate features) — it is the setup/governance layer that precedes them.
