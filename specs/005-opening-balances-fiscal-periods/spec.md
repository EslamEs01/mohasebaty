# Feature Specification: الأرصدة الافتتاحية والفترات المالية — Opening Balances & Fiscal Periods

**Feature Branch**: `005-opening-balances-fiscal-periods`  
**Created**: 2026-06-11  
**Status**: Draft  
**Input**: User description: "Spec 005 — Opening Balances & Fiscal Periods: internal/admin frontend pages for (1) entering or uploading a client's opening balances with debit/credit balance validation and approval, and (2) fiscal-year setup with monthly period open/review/close controls, including close and reopen modals. Two pages: opening-balances.html, fiscal-periods.html. Use the approved Mohasebaty design system; internal/admin only; no backend; no real calculations; add links from settings, reports, chart of accounts, and the sidebar."

## Overview

When an accounting firm onboards a client onto the platform, it must record the client's **opening balances** (the debit/credit position of every account at the go-live date) and confirm the books balance before any transactions are posted. It must also define the client's **fiscal year** and govern the lifecycle of each monthly **period** — keeping a month open while work continues, marking it under review, and closing it once documents are classified, entries are posted, and reports are approved (with a controlled reopen path requiring manager approval). This feature delivers the **frontend** of both capabilities as two complete Arabic/RTL Accountant/Admin pages built on the approved design system. This stage is presentation-only: all data is realistic static Arabic demo content, there is no backend, and no real arithmetic is performed (totals and statuses are illustrative).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Enter and Balance a Client's Opening Balances (Priority: P1)

An accountant selects a client and the go-live (start) date, then reviews the opening-balances table — each row an account with its code, name, type, debit balance, credit balance, notes, and status. Status cards show total debit, total credit, the difference, and whether the set is متوازن (balanced) or غير متوازن (unbalanced). The accountant can add a balance via a modal, upload a balances file, export, and — only when balanced — approve the opening balances. A validation card states the rule (total debit must equal total credit) and that approval is blocked while a difference exists.

**Why this priority**: Opening balances are the foundation of a client's books. Nothing downstream (entries, reports, period closing) is trustworthy until they are recorded and balanced. This page is the primary deliverable of the feature.

**Independent Test**: Open `pages/opening-balances.html`; pick a client and start date; see the four balance status cards; review the opening-balances table with all 7 columns and realistic Arabic rows; open the "إضافة رصيد" modal and see its 4 fields; see the validation card; see the four actions (إضافة رصيد، رفع ملف أرصدة، اعتماد الأرصدة، تصدير).

**Acceptance Scenarios**:

1. **Given** the page is open, **When** the accountant views the status cards, **Then** they see إجمالي المدين، إجمالي الدائن، الفرق، and a الحالة card reading متوازن or غير متوازن.
2. **Given** the balances are balanced (difference = 0), **When** the accountant views the approve action, **Then** "اعتماد الأرصدة" is available; **Given** a non-zero difference, **Then** the validation card explains that approval is blocked.
3. **Given** the accountant clicks "إضافة رصيد", **Then** a modal opens with fields: الحساب، مدين، دائن، ملاحظات.
4. **Given** the accountant clicks "رفع ملف أرصدة", **Then** a file-upload affordance is presented; **When** they click "تصدير", **Then** an export affordance is presented.

---

### User Story 2 - Set Up the Fiscal Year and View Period Statuses (Priority: P1)

An accountant or manager selects a client, reviews the fiscal-year setup (year, start date, end date, currency, status), and sees every month of the year with its status (مفتوحة / قيد المراجعة / مغلقة) plus readiness indicators — unclassified documents, unposted entries, unapproved reports — and a per-month action. They can also start a new fiscal year.

**Why this priority**: The fiscal-period view is how the firm tracks where each client stands month by month and decides what is ready to close. It is the entry point for both closing and reopening, so it is core to the feature.

**Independent Test**: Open `pages/fiscal-periods.html`; pick a client; see the fiscal-year setup block (السنة المالية، تاريخ البداية، تاريخ النهاية، العملة، الحالة); see 12 monthly periods each showing a status badge, the three readiness counts, and an action; see the "إنشاء سنة مالية جديدة" action.

**Acceptance Scenarios**:

1. **Given** the page is open, **When** the accountant views the fiscal-year setup, **Then** they see the year, start date, end date, currency, and status.
2. **Given** the period list, **When** the accountant reads any month, **Then** they see one of مفتوحة / قيد المراجعة / مغلقة, the counts for مستندات غير مصنفة، قيود غير مرحلة، تقارير غير معتمدة, and an action.
3. **Given** a month that is مفتوحة or قيد المراجعة, **Then** its action offers "إغلاق شهر"; **Given** a مغلقة month, **Then** its action offers "فتح شهر بصلاحية".
4. **Given** the accountant clicks "إنشاء سنة مالية جديدة", **Then** a fiscal-year creation affordance is presented.

---

### User Story 3 - Close a Fiscal Month with a Safety Check (Priority: P2)

From the fiscal-periods page, the accountant closes a month. A confirmation modal shows a clear warning, a summary of any incomplete items (unclassified documents, unposted entries, unapproved reports), and a confirm action. After confirming, the month is presented as مغلقة.

**Why this priority**: Closing a period is a consequential, semi-irreversible control. The warning + incomplete-items summary prevents premature closing — a key governance safeguard — but it depends on US2 existing first.

**Independent Test**: On `pages/fiscal-periods.html`, trigger "إغلاق شهر" for a month; see the close modal with a visible warning, a summary of incomplete items, and a "تأكيد الإغلاق" action; closing/cancelling returns to the period view.

**Acceptance Scenarios**:

1. **Given** the accountant clicks "إغلاق شهر", **Then** a modal opens with a clear warning message.
2. **Given** the close modal, **When** it is shown, **Then** it summarizes the incomplete items for that month (counts of unclassified documents, unposted entries, unapproved reports).
3. **Given** the close modal, **When** the accountant clicks "تأكيد الإغلاق", **Then** the action confirms the close; **When** they cancel, **Then** the month is unchanged.

---

### User Story 4 - Reopen a Closed Month with Manager Approval (Priority: P2)

A closed month sometimes needs corrections. An authorized user reopens it through a modal that requires a reason for reopening and a manager approval, then a confirmation.

**Why this priority**: Reopening undoes a control, so it must be gated by a documented reason and manager sign-off. It is important for real operations but secondary to the open/close flow.

**Independent Test**: On `pages/fiscal-periods.html`, trigger "فتح شهر بصلاحية" on a مغلقة month; see the reopen modal with a reason field, a manager-approval field, and a confirm action.

**Acceptance Scenarios**:

1. **Given** a مغلقة month, **When** the accountant clicks "فتح شهر بصلاحية", **Then** a reopen modal opens.
2. **Given** the reopen modal, **When** it is shown, **Then** it requires a سبب إعادة الفتح (reason) and a موافقة مدير (manager approval) before confirmation.
3. **Given** the reopen modal, **When** the user confirms, **Then** the reopen is presented as confirmed; **When** they cancel, **Then** the month stays مغلقة.

---

### User Story 5 - Reach the Pages from Existing Navigation (Priority: P3)

The two pages are wired into the product so the team can reach them: live links in the shared sidebar (replacing the existing "الأرصدة الافتتاحية" and "الفترات المالية" coming-soon items) and contextual links from settings, the reports center, and the chart of accounts, plus live cards on the index landing page.

**Why this priority**: Integration makes the pages discoverable and keeps the navigation consistent, but the pages deliver value on their own first, so this is P3.

**Independent Test**: From the sidebar of any page, the two items are live links (no قريباً); `settings.html`, `reports.html`, and `chart-of-accounts.html` each link to the relevant page; `index.html` shows both as live cards; every page still has exactly one active sidebar item.

**Acceptance Scenarios**:

1. **Given** any project page, **When** the accountant opens the sidebar, **Then** "الأرصدة الافتتاحية" and "الفترات المالية" are live links.
2. **Given** `settings.html`, `reports.html`, and `chart-of-accounts.html`, **When** viewed, **Then** each provides a working link to the relevant new page.
3. **Given** `index.html`, **When** viewed, **Then** both pages appear as live landing cards and the page/coming-soon counters stay consistent.

---

### Edge Cases

- **Unbalanced opening balances** (total debit ≠ total credit) → the difference card shows the non-zero amount, the status reads غير متوازن, and the validation card states approval is blocked until balanced.
- **Empty opening balances** (no rows yet) → the table shows an empty state and totals read zero; the set is treated as غير معتمد.
- **Closing a month with incomplete items** → the close modal still lists the incomplete counts so the user closes deliberately (the prototype does not hard-block, but the warning is explicit).
- **Reopening without a reason or manager approval** → the reopen modal presents both as required before the confirm action is meaningful.
- **A future month in the fiscal year** → shown as مفتوحة with zero or low readiness counts; closing it is allowed but visually discouraged.
- **Navigating to either page directly** → the page renders with its static demo data (frontend-only; no guard needed).

## Requirements *(mandatory)*

### Functional Requirements

**Page 1 — الأرصدة الافتتاحية (`pages/opening-balances.html`)**

- **FR-001**: The page MUST present a header with title "الأرصدة الافتتاحية" and subtitle "أدخل أو ارفع أرصدة بداية التشغيل وتأكد من توازن المدين والدائن".
- **FR-002**: The page MUST provide a client selector and a start/go-live date control.
- **FR-003**: The page MUST display four balance status summary cards: إجمالي المدين، إجمالي الدائن، الفرق، and الحالة (showing متوازن or غير متوازن).
- **FR-004**: The page MUST present an opening-balances table with seven columns: كود الحساب، اسم الحساب، النوع، رصيد مدين، رصيد دائن، ملاحظات، الحالة.
- **FR-005**: The table MUST contain realistic Arabic demo rows covering multiple account types (assets, liabilities, equity, etc.) with at least one row carrying each status value used.
- **FR-006**: The page MUST present four actions: إضافة رصيد، رفع ملف أرصدة، اعتماد الأرصدة، تصدير.
- **FR-007**: The page MUST display a validation card stating "يجب أن يكون إجمالي المدين مساويًا لإجمالي الدائن" and "لا يمكن الاعتماد مع وجود فرق".
- **FR-008**: The page MUST provide an "إضافة رصيد" modal with four fields: الحساب، مدين، دائن، ملاحظات.
- **FR-009**: When the demo set is balanced, "اعتماد الأرصدة" MUST be presented as available; when unbalanced, the validation card MUST make clear that approval is blocked (no real calculation is required — the state is illustrative).

**Page 2 — الفترات المالية (`pages/fiscal-periods.html`)**

- **FR-010**: The page MUST present a header with title "الفترات المالية" and subtitle "إدارة السنة المالية وحالة الشهور وإغلاق الفترات بعد المراجعة".
- **FR-011**: The page MUST provide a client selector.
- **FR-012**: The page MUST present a fiscal-year setup block showing: السنة المالية، تاريخ البداية، تاريخ النهاية، العملة، الحالة.
- **FR-013**: The page MUST present the twelve months of the fiscal year as cards or a table; each month MUST show a status (مفتوحة / قيد المراجعة / مغلقة), the three readiness counts (مستندات غير مصنفة، قيود غير مرحلة، تقارير غير معتمدة), and a per-month action.
- **FR-014**: The set of months MUST include realistic examples of all three statuses (at least one مفتوحة, one قيد المراجعة, and one مغلقة).
- **FR-015**: The page MUST present the actions: إغلاق شهر، فتح شهر بصلاحية، إنشاء سنة مالية جديدة (the first two contextual to a month's status, the last for the year).
- **FR-016**: The page MUST provide a "إغلاق شهر" (close period) modal containing a clear warning, a summary of the incomplete items for the month (the three readiness counts), and a "تأكيد الإغلاق" confirm action.
- **FR-017**: The page MUST provide a "فتح شهر بصلاحية" (reopen period) modal containing a سبب إعادة الفتح field, a موافقة مدير field, and a confirm action.

**Cross-cutting**

- **FR-018**: Both pages MUST be Accountant/Admin (internal) pages and MAY use accounting terminology (مدين، دائن، ترحيل، إقفال، شجرة الحسابات); they MUST NOT appear in the simplified Client portal.
- **FR-019**: Both pages MUST share the approved header and sidebar with exactly one active sidebar item highlighted per page, and MUST reuse the approved KPI/status cards, tables, forms, buttons, badges, filters, upload area, and modal components without introducing a new visual style.
- **FR-020**: The shared sidebar across all pages MUST present "الأرصدة الافتتاحية" and "الفترات المالية" as live links (replacing the current coming-soon items), and `index.html` MUST present both as live landing cards with its page/coming-soon counters kept consistent.
- **FR-021**: `settings.html`, `reports.html`, and `chart-of-accounts.html` MUST each provide a working contextual link to the relevant new page.
- **FR-022**: Every page MUST declare `<html lang="ar" dir="rtl">`, link the local compiled stylesheet via a correct relative path, use professional Arabic-only static demo data, and keep all content in HTML (JavaScript only for UI behavior such as modal open/close and active states — never to generate page content).

### Key Entities

- **Opening Balance Set**: The collection of opening balances for one client at a go-live date. Attributes: client, start/go-live date, total debit, total credit, difference, balance state (متوازن / غير متوازن), approval state (غير معتمد / معتمد).
- **Opening Balance**: One account's opening position. Attributes: account code, account name, account type, debit amount, credit amount, notes, row status.
- **Fiscal Year**: A client's accounting year. Attributes: year label, start date, end date, currency, status (نشطة / مغلقة / مسودة).
- **Fiscal Period (Month)**: One month within a fiscal year. Attributes: month label, status (مفتوحة / قيد المراجعة / مغلقة), unclassified-documents count, unposted-entries count, unapproved-reports count.
- **Period Action Record**: A close or reopen event. Close attributes: month, incomplete-items summary, confirmation. Reopen attributes: month, reopen reason, manager approval, confirmation.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: An accountant can open `pages/opening-balances.html`, read the four status cards, and tell at a glance whether the set is balanced — within seconds, without any explanation.
- **SC-002**: Both pages open with no console errors, display complete professional Arabic content (no placeholders, no Lorem ipsum, no untranslated English UI labels), and are reachable from the sidebar.
- **SC-003**: Each page declares RTL, links only local assets, and highlights exactly one active sidebar item — verifiable by static inspection.
- **SC-004**: The opening-balances table shows at least 8 realistic Arabic account rows spanning multiple account types, with debit/credit values and a visible balanced-vs-unbalanced state.
- **SC-005**: The fiscal-periods page shows all 12 months with status badges covering all three statuses (مفتوحة، قيد المراجعة، مغلقة) and the three readiness counts per month.
- **SC-006**: The close-period and reopen-period modals each open and close correctly and contain all their required fields (close: warning + incomplete-items summary + confirm; reopen: reason + manager approval + confirm).
- **SC-007**: The two pages are live links in the shared sidebar and `index.html`, and contextual links exist from `settings.html`, `reports.html`, and `chart-of-accounts.html`.
- **SC-008**: After adding the two pages and converting the two coming-soon sidebar items, no existing page, sidebar link, or asset path is broken.

## Assumptions

- Both pages are frontend-only: no backend, API, database, authentication, or real file processing; all data is hardcoded Arabic demo content.
- No real arithmetic is performed — totals, the difference, the balanced/unbalanced state, and the period readiness counts are illustrative static values chosen to demonstrate each state.
- "اعتماد الأرصدة" and "تأكيد الإغلاق"/reopen confirmations show a success/confirmation state visually without backend confirmation.
- The pages reuse the existing approved patterns — status/KPI cards, data tables, the upload area, segmented controls, and the shared modal — rather than introducing new components.
- This module belongs to the Accountant/Admin portal; accounting terminology is appropriate and the pages are not exposed to clients.
- The fiscal year demonstrated is a standard 12-month Gregorian/Hijri-labeled year using realistic Saudi-first context (currency shown in the year setup); exact calendar system is a demo styling choice, not a functional requirement.
- The sidebar already contains coming-soon entries for both features; this feature converts those two entries to live links across all pages and updates `index.html` counts accordingly.
- Contextual links from settings/reports/chart-of-accounts are added as small, non-disruptive entry points that do not remove or restructure existing content on those pages.
