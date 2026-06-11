# Feature Specification: استيراد كشف الحساب والتسوية البنكية — Bank Statement Import & Reconciliation

**Feature Branch**: `007-bank-statement-reconciliation`  
**Created**: 2026-06-11  
**Status**: Draft  
**Input**: User description: "Spec 007 — Bank Statement Import & Reconciliation: internal accountant frontend screens to (1) upload and map a bank statement and preview its rows, and (2) reconcile bank transactions against uploaded documents/invoices in a split workspace with suggested matches and a match-details panel. Two pages: bank-statement-import.html, bank-reconciliation.html. No backend, no actual matching logic; static realistic data; add links from bank accounts and data import."

## Overview

Once a client's bank/cash accounts exist, the firm needs to bring in the bank's transactions and reconcile them against the documents the client uploaded (invoices, vouchers, receipts). This feature delivers the **frontend** of that two-step flow as Arabic/RTL Accountant/Admin pages on the approved Mohasebaty design system: (1) **استيراد كشف حساب بنكي** — pick a client + bank account + period, upload the statement file, confirm a column-mapping summary, and preview the parsed rows; (2) **مطابقة البنك والمستندات** — a split workspace that lists bank transactions on one side and suggested matching documents on the other, with a match-details panel and reconcile/ignore/create/clarify actions. This stage is presentation-only: all data is realistic static Arabic demo content, there is no backend, and **no actual matching is computed** — suggested matches and match percentages are illustrative.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Import a Bank Statement (Priority: P1)

An accountant selects a client, a bank account, and a period, uploads the bank statement file, reviews a mapping summary that confirms how the statement columns (التاريخ، الوصف، المدين، الدائن، الرصيد، رقم العملية) map to system fields, and previews the parsed transactions (التاريخ، الوصف، مدين، دائن، الرصيد، الحالة) before continuing to reconciliation. They can also save the import as a draft.

**Why this priority**: Importing the statement is the entry point — reconciliation is impossible without the transactions. This is the representative first page of the feature.

**Independent Test**: Open `pages/bank-statement-import.html`; pick client + bank account + period; see the upload area; see the mapping summary (6 mapped columns); see the preview table with realistic Arabic rows and a status per row; see the 3 actions (رفع وتحليل، متابعة للمطابقة، حفظ كمسودة).

**Acceptance Scenarios**:

1. **Given** the page is open, **When** the accountant views the header controls, **Then** they see a client selector, a bank-account selector, and a period selector.
2. **Given** the upload area, **When** a statement file is selected, **Then** a selected-file state is shown.
3. **Given** the mapping summary, **When** viewed, **Then** it lists the 6 mapped columns: التاريخ، الوصف، المدين، الدائن، الرصيد، رقم العملية.
4. **Given** the preview table, **When** read, **Then** each row shows التاريخ، الوصف، مدين، دائن، الرصيد، الحالة.
5. **Given** the actions, **When** the accountant clicks "متابعة للمطابقة", **Then** they navigate to `bank-reconciliation.html`; **When** "حفظ كمسودة", **Then** a draft state is presented.

---

### User Story 2 - Reconcile Bank Transactions with Documents (Priority: P1)

An accountant works a split workspace: KPI cards summarize the reconciliation state (معاملات البنك، مطابق تلقائيًا، يحتاج مراجعة، غير مطابق). One panel lists bank transactions (التاريخ، الوصف، المبلغ، النوع، الحالة، إجراء); the other lists suggested matching documents for the selected transaction (المستند، النوع، المبلغ، التاريخ، نسبة التطابق، إجراء). A match-details card shows the selected bank transaction, the proposed document, the difference, and notes. Actions let the accountant مطابقة (match), تجاهل (ignore), إنشاء مستند جديد من المعاملة (create a document from the transaction), or طلب توضيح (request clarification).

**Why this priority**: Reconciliation is the core value — it is how bank reality is tied to the client's documents. The split workspace is the heart of the feature.

**Independent Test**: Open `pages/bank-reconciliation.html`; pick client + bank account + period; see 4 KPI cards; see the two-panel workspace (bank transactions + suggested documents) each with the required columns; see the match-details card (selected transaction، proposed document، difference، notes); see the 4 actions.

**Acceptance Scenarios**:

1. **Given** the page is open, **When** the accountant views the KPI cards, **Then** they see: معاملات البنك، مطابق تلقائيًا، يحتاج مراجعة، غير مطابق.
2. **Given** the bank-transactions panel, **When** read, **Then** each row shows التاريخ، الوصف، المبلغ، النوع، الحالة، إجراء, with status badges distinguishing matched / needs-review / unmatched.
3. **Given** the suggested-documents panel, **When** read, **Then** each row shows المستند، النوع، المبلغ، التاريخ، نسبة التطابق، إجراء.
4. **Given** the match-details card, **When** read, **Then** it shows the selected bank transaction, the proposed document, the الفرق (difference), and ملاحظات.
5. **Given** the actions, **When** the accountant clicks مطابقة / تجاهل / إنشاء مستند جديد من المعاملة / طلب توضيح, **Then** each action is present and presents a visual confirmation (no real matching is computed).

---

### User Story 3 - Reach the Pages from Existing Navigation & Related Screens (Priority: P3)

The two pages are wired so the team can reach them: live links in the shared sidebar (replacing the existing "استيراد كشف الحساب" and "التسوية البنكية" coming-soon items), live cards on the index landing page, and contextual links from `bank-accounts.html` and `data-import.html`.

**Why this priority**: Integration makes the pages discoverable and links the bank flow to its neighbors, but each page delivers value on its own first.

**Independent Test**: From any page, the two items are live sidebar links (no قريباً); `index.html` shows both as live cards; `bank-accounts.html` and `data-import.html` each link to the relevant new page; every page still has exactly one active sidebar item.

**Acceptance Scenarios**:

1. **Given** any project page, **When** the accountant opens the sidebar, **Then** "استيراد كشف الحساب" and "التسوية البنكية" are live links to the respective pages.
2. **Given** `bank-accounts.html` and `data-import.html`, **When** viewed, **Then** each provides a working contextual link to the relevant new page.
3. **Given** `index.html`, **When** viewed, **Then** both pages appear as live landing cards and the page/coming-soon counters stay consistent.

---

### Edge Cases

- **A bank transaction with no suggested document** → its status reads غير مطابق and the suggested-documents panel shows an empty state; "إنشاء مستند جديد من المعاملة" is the natural next action.
- **A partial-amount difference** → the match-details card shows a non-zero الفرق and the row is flagged يحتاج مراجعة rather than auto-matched.
- **Multiple candidate documents for one transaction** → the suggested-documents panel lists several rows with descending نسبة التطابق; the accountant picks one.
- **A duplicate transaction** → shown distinctly (e.g., a duplicate indicator) so it is not double-matched.
- **An unmapped/invalid statement column** → the import mapping summary flags it (e.g., a warning state) before "متابعة للمطابقة".
- **Navigating to either page directly** → it renders with its static demo data (frontend-only; no guard needed).

## Requirements *(mandatory)*

### Functional Requirements

**Page 1 — استيراد كشف حساب بنكي (`pages/bank-statement-import.html`)**

- **FR-001**: The page MUST present a header with title "استيراد كشف حساب بنكي" and subtitle "ارفع كشف الحساب البنكي واربط أعمدته لتجهيزه للمطابقة".
- **FR-002**: The page MUST provide a client selector, a bank-account selector, and a period selector.
- **FR-003**: The page MUST include a file upload area (consistent with the approved upload UI) with a selected-file state.
- **FR-004**: The page MUST present a mapping summary confirming six mapped columns: التاريخ، الوصف، المدين، الدائن، الرصيد، رقم العملية.
- **FR-005**: The page MUST present a preview table with six columns: التاريخ، الوصف، مدين، دائن، الرصيد، الحالة, with realistic Arabic demo rows.
- **FR-006**: The page MUST present three actions: رفع وتحليل، متابعة للمطابقة (links to `bank-reconciliation.html`)، حفظ كمسودة.

**Page 2 — مطابقة البنك والمستندات (`pages/bank-reconciliation.html`)**

- **FR-007**: The page MUST present a header with title "مطابقة البنك والمستندات" and subtitle "طابق معاملات البنك مع المستندات والفواتير المرفوعة", plus client, bank-account, and period controls.
- **FR-008**: The page MUST present four KPI cards: معاملات البنك، مطابق تلقائيًا، يحتاج مراجعة، غير مطابق.
- **FR-009**: The page MUST present a split workspace with two panels: a bank-transactions panel and a suggested-matching-documents panel.
- **FR-010**: The bank-transactions panel MUST present a table with six columns: التاريخ، الوصف، المبلغ، النوع، الحالة، إجراء, with status badges for matched / needs-review / unmatched.
- **FR-011**: The suggested-documents panel MUST present a table with six columns: المستند، النوع، المبلغ، التاريخ، نسبة التطابق، إجراء.
- **FR-012**: The page MUST present a match-details card showing: معاملة البنك المحددة، المستند المقترح، الفرق، ملاحظات.
- **FR-013**: The page MUST present four actions: مطابقة، تجاهل، إنشاء مستند جديد من المعاملة، طلب توضيح.

**Cross-cutting**

- **FR-014**: Both pages MUST be Accountant/Admin (internal) pages and MUST NOT appear in the simplified Client portal.
- **FR-015**: Each page MUST share the approved header and sidebar with exactly one active sidebar item highlighted, and MUST reuse the approved KPI cards, tables, forms, badges, buttons, upload area, and split/panel layout components without introducing a new visual style.
- **FR-016**: The shared sidebar across all pages MUST present "استيراد كشف الحساب" and "التسوية البنكية" as live links (replacing the current coming-soon items), and `index.html` MUST present both as live landing cards with its page/coming-soon counters kept consistent.
- **FR-017**: `bank-accounts.html` and `data-import.html` MUST each provide a working contextual link to the relevant new page.
- **FR-018**: All content MUST exist in HTML; JavaScript MAY be used ONLY for UI behavior (selecting a transaction to highlight it / surface its match details, modal open/close) — never to generate page content, table rows, or to compute matches.
- **FR-019**: Every page MUST declare `<html lang="ar" dir="rtl">`, link the local compiled stylesheet via a correct relative path, and use professional Arabic-only static demo data (Saudi-first, ﷼).

### Key Entities

- **Bank Statement Import**: One uploaded statement for a client + bank account + period. Attributes: client, bank account, period, file name, mapped columns (date/description/debit/credit/balance/reference), row count, status (مسودة / تم التحليل).
- **Bank Transaction**: One line from the statement. Attributes: date, description, amount, direction/type (إيداع / سحب / رسوم), running balance, reference number, reconciliation status (مطابق تلقائيًا / يحتاج مراجعة / غير مطابق / مطابق يدويًا).
- **Suggested Match (Document)**: A candidate document proposed for a transaction. Attributes: document reference, type (فاتورة / سند قبض / سند صرف / إيصال), amount, date, match percentage (نسبة التطابق).
- **Match Result**: The outcome of pairing a transaction with a document. Attributes: selected transaction, proposed document, difference (الفرق), notes, action taken (مطابقة / تجاهل / إنشاء مستند / طلب توضيح).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: An accountant can open `pages/bank-statement-import.html`, select client/account/period, see the mapping summary and a populated preview table, and reach reconciliation in a single click — within seconds.
- **SC-002**: Both pages open with no console errors, display complete professional Arabic content (no placeholders, no Lorem ipsum, no untranslated English UI labels), and are reachable from the sidebar.
- **SC-003**: Each page declares RTL, links only local assets, and highlights exactly one active sidebar item — verifiable by static inspection.
- **SC-004**: The import preview table shows at least 8 realistic Arabic transaction rows spanning deposits, withdrawals, and fees, each with a status.
- **SC-005**: The reconciliation workspace shows both panels side by side on desktop, with at least 8 bank-transaction rows covering all three reconciliation states (مطابق تلقائيًا، يحتاج مراجعة، غير مطابق) and at least 3 suggested-document rows with descending match percentages.
- **SC-006**: The match-details card clearly shows the selected transaction, the proposed document, the الفرق, and notes; all four actions are visible.
- **SC-007**: The two pages are live links in the shared sidebar and `index.html`, and contextual links exist from `bank-accounts.html` and `data-import.html`.
- **SC-008**: After adding the two pages and converting the two coming-soon sidebar items, no existing page, sidebar link, or asset path is broken.

## Assumptions

- Both pages are frontend-only: no backend, API, database, authentication, or real file processing; all data is hardcoded Arabic demo content.
- **No matching is computed**: suggested documents, نسبة التطابق, the difference, and KPI counts are illustrative static values; "مطابقة"/"تجاهل"/"إنشاء مستند"/"طلب توضيح" show a visual state only.
- Column detection/mapping on the import page is simulated — the mapping summary and preview table show pre-filled demo data as if parsing had happened.
- The reconciliation split workspace shows a representative selected transaction with its match-details card pre-populated; selecting a different transaction row is a visual highlight (UI-only), not a recomputation.
- The pages reuse existing approved patterns — upload area, KPI cards, data tables, two-panel/split layout, badges, and the shared modal — rather than introducing new components.
- These are Accountant/Admin pages; accounting/banking terms (مدين/دائن، تسوية، مطابقة) are appropriate and the pages are not exposed to clients.
- The sidebar already contains coming-soon entries "استيراد كشف الحساب" and "التسوية البنكية"; this feature converts them to live links across all pages (the page files are `bank-statement-import.html` and `bank-reconciliation.html`; the existing sidebar labels are preserved) and updates `index.html` counts accordingly.
- This feature handles statement import + reconciliation only; it does not post journal entries (posting is a separate feature) — matched results are shown as reconciled, not ledgered.
