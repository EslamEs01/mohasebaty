# Feature Specification: بيانات أساسية — الموردون، عملاء الشركة، الحسابات البنكية (Master Data: Vendors / Commercial Customers / Bank Accounts)

**Feature Branch**: `006-vendors-customers-banks`  
**Created**: 2026-06-11  
**Status**: Draft  
**Input**: User description: "Spec 006 — Vendors / Commercial Customers / Bank Accounts: master-data frontend pages (vendors.html, commercial-customers.html, bank-accounts.html) required before backend implementation. Each has a client selector, KPI cards, a data table, and an add modal. Commercial customers are the client company's own business customers (not Mohasebaty platform clients). Internal/admin only; no backend; modals in HTML; JS only opens/closes modals; add sidebar and index links; keep design consistent."

## Overview

Before the platform can record expenses, sales invoices, and bank movements for a client, it needs the client's **master data**: the suppliers it buys from (الموردون), the business customers it sells to (عملاء الشركة), and the bank/cash/wallet accounts it transacts through (الحسابات البنكية والخزنة). This feature delivers the **frontend** of all three as complete Arabic/RTL Accountant/Admin pages built on the approved Mohasebaty design system. Each page lets an accountant pick a client, see at-a-glance KPI counts, filter/scan a records table, and add a new record through a modal. This stage is presentation-only: all data is realistic static Arabic demo content, there is no backend, and the add modals are authored in HTML (JavaScript only opens and closes them).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Manage a Client's Vendors (Priority: P1)

An accountant selects a client and reviews its suppliers: KPI cards summarize total vendors, active vendors, this month's invoices, and vendors missing a tax number. A filter bar (search, status, country, taxable) narrows a table that lists each vendor's name, tax number, country, phone, email, total invoices, last activity, status, and an action. An "إضافة مورد" button opens a modal to capture a new vendor.

**Why this priority**: Vendors are required before any expense/purchase invoice can be classified. This is the first and representative master-data page; the other two follow the same pattern.

**Independent Test**: Open `pages/vendors.html`; pick a client; see the 4 KPI cards; use the 4 filters; scan the 9-column vendors table with realistic Arabic rows; open the "إضافة مورد" modal and see its 7 fields.

**Acceptance Scenarios**:

1. **Given** the page is open, **When** the accountant views the KPI cards, **Then** they see: إجمالي الموردين، موردون نشطون، فواتير هذا الشهر، موردون بدون رقم ضريبي.
2. **Given** the filter bar, **When** the accountant uses بحث / الحالة / الدولة / خاضع للضريبة, **Then** the controls are present and the table presents results consistent with them.
3. **Given** the vendors table, **When** the accountant reads a row, **Then** they see: اسم المورد، الرقم الضريبي، الدولة، الهاتف، البريد، إجمالي الفواتير، آخر تعامل، الحالة، إجراء.
4. **Given** the accountant clicks "إضافة مورد", **Then** a modal opens with fields: اسم المورد، الرقم الضريبي، الدولة، الهاتف، البريد، العنوان، ملاحظات; it closes on cancel/escape.

---

### User Story 2 - Manage the Client Company's Commercial Customers (Priority: P2)

An accountant manages the **business customers of the client company** (the people/companies the client sells to — not Mohasebaty platform clients). KPI cards summarize total commercial customers, active customers, this month's sales, and customers missing a tax number. A table lists each customer's name, tax number, country, phone, email, total sales, last invoice, status, and an action. An "إضافة عميل" button opens a modal.

**Why this priority**: Commercial customers are required before sales invoices can be classified. It mirrors the vendors page and reinforces the master-data pattern.

**Independent Test**: Open `pages/commercial-customers.html`; pick a client; see the 4 KPI cards; scan the 9-column customers table; open the "إضافة عميل" modal and see its 6 fields.

**Acceptance Scenarios**:

1. **Given** the page is open, **When** the accountant views the KPI cards, **Then** they see: إجمالي العملاء التجاريين، عملاء نشطون، مبيعات هذا الشهر، عملاء بدون رقم ضريبي.
2. **Given** the table, **When** the accountant reads a row, **Then** they see: اسم العميل التجاري، الرقم الضريبي، الدولة، الهاتف، البريد، إجمالي المبيعات، آخر فاتورة، الحالة، إجراء.
3. **Given** the accountant clicks "إضافة عميل", **Then** a modal opens with fields: الاسم، الرقم الضريبي، الدولة، الهاتف، البريد، العنوان; it closes on cancel/escape.
4. **Given** the page header, **When** read, **Then** the wording makes clear these are the client company's customers (عملاء الشركة المرتبطون بفواتير المبيعات), distinct from platform clients.

---

### User Story 3 - Manage a Client's Bank, Cash & Wallet Accounts (Priority: P2)

An accountant manages the client's money accounts — banks, cash boxes (خزائن), and e-wallets. KPI cards summarize total accounts, banks, cash boxes, and e-wallets. A table lists each account's name, type, bank, IBAN/account number, currency, opening balance, last statement date, status, and an action. An "إضافة حساب" button opens a modal that includes an account-type choice (بنك / خزنة / محفظة إلكترونية).

**Why this priority**: Bank/cash accounts are required before bank statements and reconciliation. It completes the master-data set.

**Independent Test**: Open `pages/bank-accounts.html`; pick a client; see the 4 KPI cards (إجمالي الحسابات، بنوك، خزائن، محافظ إلكترونية); scan the 9-column accounts table covering all three account types; open the "إضافة حساب" modal and see its 8 fields incl. the type choice.

**Acceptance Scenarios**:

1. **Given** the page is open, **When** the accountant views the KPI cards, **Then** they see: إجمالي الحسابات، بنوك، خزائن، محافظ إلكترونية.
2. **Given** the table, **When** the accountant reads a row, **Then** they see: اسم الحساب، النوع، البنك، IBAN / رقم الحساب، العملة، الرصيد الافتتاحي، آخر كشف حساب، الحالة، إجراء.
3. **Given** the table rows, **When** scanned, **Then** they cover all three types (بنك، خزنة، محفظة إلكترونية).
4. **Given** the accountant clicks "إضافة حساب", **Then** a modal opens with fields: اسم الحساب، النوع (بنك / خزنة / محفظة إلكترونية)، البنك، رقم الحساب / IBAN، العملة، الرصيد الافتتاحي، تاريخ الرصيد، ملاحظات; it closes on cancel/escape.

---

### User Story 4 - Reach the Pages from Existing Navigation (Priority: P3)

The three pages are wired so the team can reach them: live links in the shared sidebar (replacing the existing "الموردون", "العملاء التجاريون", and "الحسابات البنكية" coming-soon items) and live cards on the index landing page.

**Why this priority**: Integration makes the pages discoverable and keeps navigation consistent, but each page delivers value on its own first.

**Independent Test**: From any page, the three items are live sidebar links (no قريباً); `index.html` shows all three as live cards; every page still has exactly one active sidebar item.

**Acceptance Scenarios**:

1. **Given** any project page, **When** the accountant opens the sidebar, **Then** "الموردون", "العملاء التجاريون", and "الحسابات البنكية" are live links to the respective pages.
2. **Given** `index.html`, **When** viewed, **Then** all three pages appear as live landing cards and the page/coming-soon counters stay consistent.

---

### Edge Cases

- **A record missing a tax number** → it is counted in the "بدون رقم ضريبي" KPI and its tax-number cell shows a clear empty indicator (e.g., "—" with a subtle warning chip).
- **A suspended/inactive record** → its status cell shows a distinct badge (موقوف / غير نشط) so active vs inactive is scannable.
- **An empty filter result** → the table area shows an empty state rather than stale rows (demonstrated visually; filters are not functionally wired).
- **A foreign vendor/customer** → the country column shows a non-Saudi country and the taxable indicator reflects it.
- **A cash box (خزنة) or wallet with no IBAN** → the IBAN/account-number cell shows "—" or the wallet identifier, not a fabricated IBAN.
- **Navigating to a page directly** → it renders with its static demo data (frontend-only; no guard needed).

## Requirements *(mandatory)*

### Functional Requirements

**Page 1 — الموردون (`pages/vendors.html`)**

- **FR-001**: The page MUST present a header with title "الموردون" and subtitle "إدارة الموردين المرتبطين بمصروفات وفواتير العملاء", plus a client selector.
- **FR-002**: The page MUST present four KPI cards: إجمالي الموردين، موردون نشطون، فواتير هذا الشهر، موردون بدون رقم ضريبي.
- **FR-003**: The page MUST present a filter bar with four controls: بحث، الحالة، الدولة، خاضع للضريبة.
- **FR-004**: The page MUST present a vendors table with nine columns: اسم المورد، الرقم الضريبي، الدولة، الهاتف، البريد، إجمالي الفواتير، آخر تعامل، الحالة، إجراء, with realistic Arabic demo rows.
- **FR-005**: The page MUST provide an "إضافة مورد" action that opens a modal with seven fields: اسم المورد، الرقم الضريبي، الدولة، الهاتف، البريد، العنوان، ملاحظات.

**Page 2 — عملاء الشركة (`pages/commercial-customers.html`)**

- **FR-006**: The page MUST present a header with title "عملاء الشركة" and subtitle "إدارة العملاء التجاريين المرتبطين بفواتير المبيعات", plus a client selector; the wording MUST make clear these are the client company's customers, not platform clients.
- **FR-007**: The page MUST present four KPI cards: إجمالي العملاء التجاريين، عملاء نشطون، مبيعات هذا الشهر، عملاء بدون رقم ضريبي.
- **FR-008**: The page MUST present a customers table with nine columns: اسم العميل التجاري، الرقم الضريبي، الدولة، الهاتف، البريد، إجمالي المبيعات، آخر فاتورة، الحالة، إجراء, with realistic Arabic demo rows.
- **FR-009**: The page MUST provide an "إضافة عميل" action that opens a modal with six fields: الاسم، الرقم الضريبي، الدولة، الهاتف، البريد، العنوان.

**Page 3 — الحسابات البنكية والخزنة (`pages/bank-accounts.html`)**

- **FR-010**: The page MUST present a header with title "الحسابات البنكية والخزنة" and subtitle "إدارة حسابات البنوك والخزائن والمحافظ الإلكترونية لكل عميل", plus a client selector.
- **FR-011**: The page MUST present four KPI cards: إجمالي الحسابات، بنوك، خزائن، محافظ إلكترونية.
- **FR-012**: The page MUST present an accounts table with nine columns: اسم الحساب، النوع، البنك، IBAN / رقم الحساب، العملة، الرصيد الافتتاحي، آخر كشف حساب، الحالة، إجراء, with rows covering all three account types (بنك، خزنة، محفظة إلكترونية).
- **FR-013**: The page MUST provide an "إضافة حساب" action that opens a modal with eight fields: اسم الحساب، النوع (بنك / خزنة / محفظة إلكترونية)، البنك، رقم الحساب / IBAN، العملة، الرصيد الافتتاحي، تاريخ الرصيد، ملاحظات.

**Cross-cutting**

- **FR-014**: All three pages MUST be Accountant/Admin (internal) pages and MUST NOT appear in the simplified Client portal.
- **FR-015**: Each page MUST share the approved header and sidebar with exactly one active sidebar item highlighted, and MUST reuse the approved KPI cards, filters, tables, badges, forms, buttons, and modal components without introducing a new visual style.
- **FR-016**: The shared sidebar across all pages MUST present "الموردون", "العملاء التجاريون", and "الحسابات البنكية" as live links (replacing the current coming-soon items), and `index.html` MUST present all three as live landing cards with its page/coming-soon counters kept consistent.
- **FR-017**: Each add modal MUST be authored entirely in HTML; JavaScript MAY be used ONLY to open and close the modal (and other minimal UI states) — never to generate page content, table rows, or modal fields.
- **FR-018**: Every page MUST declare `<html lang="ar" dir="rtl">`, link the local compiled stylesheet via a correct relative path, and use professional Arabic-only static demo data.

### Key Entities

- **Vendor (مورد)**: A supplier the client company buys from. Attributes: name, tax number (may be empty), country, phone, email, address, notes, total invoices, last-activity date, status (نشط / موقوف), taxable flag.
- **Commercial Customer (عميل تجاري)**: A business customer of the client company (not a platform client). Attributes: name, tax number (may be empty), country, phone, email, address, total sales, last-invoice date, status (نشط / موقوف).
- **Bank/Cash Account (حساب بنكي/خزنة/محفظة)**: A money account of the client. Attributes: account name, type (بنك / خزنة / محفظة إلكترونية), bank name (or —), IBAN/account number (or — for cash/wallet), currency, opening balance, opening-balance date, last-statement date, status (نشط / مغلق).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: An accountant can open any of the three pages, read its 4 KPI cards, and understand the state of that master-data set within seconds, without explanation.
- **SC-002**: All three pages open with no console errors, display complete professional Arabic content (no placeholders, no Lorem ipsum, no untranslated English UI labels), and are reachable from the sidebar.
- **SC-003**: Each page declares RTL, links only local assets, and highlights exactly one active sidebar item — verifiable by static inspection.
- **SC-004**: The vendors table shows at least 8 realistic Arabic rows including at least one missing-tax-number row and one inactive row; the commercial-customers table shows at least 8 realistic rows; the bank-accounts table shows at least 6 rows covering all three account types.
- **SC-005**: Each page's add modal opens and closes correctly and contains exactly its required fields (vendors 7, customers 6, accounts 8 incl. the type choice).
- **SC-006**: The three pages are live links in both the shared sidebar and `index.html` across the project.
- **SC-007**: After adding the three pages and converting the three coming-soon sidebar items, no existing page, sidebar link, or asset path is broken.

## Assumptions

- All three pages are frontend-only: no backend, API, database, authentication, or real persistence; all data is hardcoded Arabic demo content.
- Filters (search/status/country/taxable) and the "إجراء" row actions are presented visually but are not functionally wired (no real filtering or CRUD); the "save" action in each modal shows a visual state only.
- The add modals are authored in HTML and toggled open/closed by the existing shared modal interaction; no fields are generated by JavaScript.
- KPI numbers, totals, and "this month" figures are illustrative static values, not computed.
- "عملاء الشركة" (page title) are the client company's business customers; the existing sidebar label for this item is "العملاء التجاريون" and is preserved — it links to `commercial-customers.html`. These are explicitly NOT Mohasebaty platform clients (which live in `clients.html`).
- Saudi-first context: demo includes Saudi tax numbers/currency (ريال سعودي) with at least one foreign record; IBANs are realistic-looking but fictional.
- The sidebar already contains coming-soon entries for all three items; this feature converts them to live links across all pages and updates `index.html` counts accordingly.
- Bank/cash/wallet accounts here are master-data records; this page does not perform reconciliation or import statements (those are separate features).
