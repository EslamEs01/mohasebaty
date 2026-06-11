# Feature Specification: تقاريري — Client Reports View

**Feature Branch**: `011-client-reports-view`  
**Created**: 2026-06-11  
**Status**: Draft  
**Input**: User description: "Spec 010 (numbered 011) — Client Reports View: a simple client-facing page (`client-reports.html`) where clients see simplified, approved financial report summaries without accounting complexity. Must NOT show debit, credit, chart of accounts, journal entries, posting, or internal notes. Sections: header (تقاريري) with تحميل آخر تقرير + طلب تقرير actions, simple filters, 5 summary cards, a reports table, status explanations, a tax estimate note, and a request-report card. Link from client dashboard, client documents, and sidebar. Simple wording, no internal accounting terms, no backend."

## Overview

Clients of the accounting firm need a calm, jargon-free place to see what their numbers look like — simplified summaries and downloadable reports — without being exposed to the firm's internal accounting machinery. This feature delivers the **frontend** of a single **client-facing** page, `client-reports.html`, on the approved Mohasebaty design system: a friendly header, simple filters, at-a-glance summary cards, a list of available reports with clear statuses, plain-language status explanations, an honest "estimates" tax note, and a simple "request a report" form. This stage is presentation-only: realistic static Arabic demo content, no backend, filters/actions do not enforce anything, and the request form is authored in HTML.

**Audience boundary (Constitution Principle V):** This is a **client portal** page. It MUST use simple language and MUST NOT show debit/credit, chart of accounts, journal entries, posting, account codes, or internal notes. Numbers are presented as plain totals and clearly-labelled estimates.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - See My Simplified Reports & Summaries (Priority: P1)

A client opens "تقاريري" to understand their financial picture. A header lets them download the latest report or request a new one. Simple filters narrow by period, report type, and status. Summary cards show total uploaded revenue, total uploaded expenses, an estimated net, an estimated tax, and how many documents are still under review. A reports table lists available reports (name, period, status, last updated, action). Plain-language explanations clarify what each status means, and a note makes clear that tax figures are estimates until approved.

**Why this priority**: This is the entire client-facing value — a clear, non-technical view of their reports. It is the whole feature.

**Independent Test**: Open `pages/client-reports.html`; use the 3 simple filters; read the 5 summary cards; scan the reports table with the 4 example reports and their statuses; read the 3 status explanations and the tax note; use the request-report card. Confirm no accounting-internal terms appear anywhere.

**Acceptance Scenarios**:

1. **Given** the page is open, **When** the client views the header, **Then** they see title "تقاريري", subtitle "ملخصات وتقارير مبسطة عن مستنداتك المالية", and two actions: "تحميل آخر تقرير" and "طلب تقرير".
2. **Given** the filters, **When** viewed, **Then** they see الفترة، نوع التقرير، الحالة (simple selects).
3. **Given** the summary cards, **When** viewed, **Then** they see إجمالي الإيرادات المرفوعة، إجمالي المصروفات المرفوعة، صافي تقديري، الضريبة التقديرية، مستندات قيد المراجعة.
4. **Given** the reports table, **When** the client reads a row, **Then** they see اسم التقرير، الفترة، الحالة، آخر تحديث، إجراء, including the examples ملخص مايو المالي، تقرير الضريبة المبدئي، تقرير المصروفات، تقرير الإيرادات.
5. **Given** the status explanations, **When** viewed, **Then** they explain مبدئي (قد يتغير بعد مراجعة المستندات), معتمد (تمت مراجعته من فريق المحاسبة), يحتاج مستندات (هناك مستندات مطلوبة لاستكمال التقرير).
6. **Given** the tax note, **When** viewed, **Then** it reads "الأرقام الضريبية تقديرية حتى اعتماد التقرير من فريق المحاسبة.".
7. **Given** the request-report card, **When** viewed, **Then** it has نوع التقرير، الفترة، ملاحظات، and a "إرسال الطلب" button.
8. **Given** the whole page, **When** inspected, **Then** NO internal accounting term appears (no مدين/دائن/قيد/ترحيل/شجرة الحسابات/account codes/internal notes).

---

### User Story 2 - Reach My Reports from the Portal (Priority: P3)

The page is wired into the client's world: the shared sidebar exposes "تقارير العميل" as a live link (replacing the last coming-soon item), `index.html` shows it as a live card, and the client dashboard and client documents pages link to it.

**Why this priority**: Integration makes the page reachable, but the page delivers value on its own.

**Independent Test**: From `client-dashboard.html` and `client-documents.html`, a link opens `client-reports.html`; the sidebar item "تقارير العميل" is a live link; `index.html` shows it as a live card; every page has exactly one active sidebar item.

**Acceptance Scenarios**:

1. **Given** any project page, **When** the sidebar is open, **Then** "تقارير العميل" → `client-reports.html` is a live link.
2. **Given** `client-dashboard.html` and `client-documents.html`, **When** viewed, **Then** each provides a working link to `client-reports.html`.
3. **Given** `index.html`, **When** viewed, **Then** "تقارير العميل" is a live card and the page/coming-soon counters are consistent (no coming-soon modules remain).

---

### Edge Cases

- **A "يحتاج مستندات" report** → its status uses an amber treatment and its action invites uploading the missing documents (links to upload), not an internal fix.
- **A "مبدئي" report** → clearly marked as preliminary/estimate; download is allowed but labelled as draft.
- **A "معتمد" report** → green status; download is the primary action.
- **Estimated figures** (صافي تقديري، الضريبة التقديرية) → visibly labelled "تقديري" so a client never mistakes them for final.
- **Documents still under review** → surfaced both as a summary card count and as the reason some reports are preliminary.
- **No internal leakage** → the page must never render debit/credit, account numbers, journal IDs, posting status, or staff-only notes.

## Requirements *(mandatory)*

### Functional Requirements

**Page — تقاريري (`pages/client-reports.html`)**

- **FR-001**: The page MUST present a header with title "تقاريري" and subtitle "ملخصات وتقارير مبسطة عن مستنداتك المالية", plus two actions: "تحميل آخر تقرير" and "طلب تقرير".
- **FR-002**: The page MUST provide three simple filters: الفترة، نوع التقرير، الحالة.
- **FR-003**: The page MUST present five summary cards: إجمالي الإيرادات المرفوعة، إجمالي المصروفات المرفوعة، صافي تقديري، الضريبة التقديرية، مستندات قيد المراجعة, with estimate figures clearly labelled "تقديري".
- **FR-004**: The page MUST present a reports table with five columns: اسم التقرير، الفترة، الحالة، آخر تحديث، إجراء, including the four example reports (ملخص مايو المالي، تقرير الضريبة المبدئي، تقرير المصروفات، تقرير الإيرادات) with statuses among مبدئي / معتمد / يحتاج مستندات.
- **FR-005**: The page MUST present a status-explanation section describing مبدئي، معتمد، يحتاج مستندات in plain language (exact wording from the spec).
- **FR-006**: The page MUST present the tax note "الأرقام الضريبية تقديرية حتى اعتماد التقرير من فريق المحاسبة.".
- **FR-007**: The page MUST present a request-report card with نوع التقرير، الفترة، ملاحظات fields and an "إرسال الطلب" button.

**Audience & wording**

- **FR-008**: The page MUST be a **client portal** page using simple, friendly Arabic and MUST NOT contain any internal accounting terminology: no مدين/دائن (debit/credit), no شجرة الحسابات (chart of accounts), no قيود/قيد محاسبي (journal entries), no ترحيل (posting), no account codes, and no staff-only/internal notes.
- **FR-009**: Estimated values MUST be visibly distinguished from confirmed values (e.g., a "تقديري" label/badge), so clients understand what is not yet final.

**Cross-cutting**

- **FR-010**: The page MUST share the approved header and sidebar with exactly one active sidebar item highlighted, and MUST reuse the approved cards/KPIs, filters, tables, chips/badges, note callout, and form components without introducing a new visual style.
- **FR-011**: The shared sidebar across all pages MUST present "تقارير العميل" as a live link to `client-reports.html` (replacing the last coming-soon item); `index.html` MUST present it as a live landing card and update its counters so that **no coming-soon modules remain**.
- **FR-012**: `client-dashboard.html` and `client-documents.html` MUST each provide a working contextual link to `client-reports.html`.
- **FR-013**: JavaScript MAY be used ONLY for UI behavior (filter selects, request-form interaction) — never to generate page content; all cards/rows MUST be authored in HTML.
- **FR-014**: The page MUST declare `<html lang="ar" dir="rtl">`, link the local compiled stylesheet via a correct relative path, and use professional Arabic-only static demo data.

### Key Entities

- **Client Report (تقرير)**: Attributes: name, period, status (مبدئي / معتمد / يحتاج مستندات), last updated, action (download / view / upload-missing).
- **Summary Figure (ملخص)**: Attributes: label, amount, isEstimate flag (إجمالي الإيرادات المرفوعة / إجمالي المصروفات المرفوعة / صافي تقديري / الضريبة التقديرية / مستندات قيد المراجعة).
- **Report Request (طلب تقرير)**: Attributes: report type, period, notes.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A client can open `pages/client-reports.html` and, within seconds, understand their revenue/expense/net/tax summary and which reports are ready vs. preliminary — without encountering any accounting jargon.
- **SC-002**: The page opens with no console errors, displays complete professional Arabic content (no placeholders, no Lorem ipsum, no untranslated English UI labels), and is reachable from the sidebar.
- **SC-003**: The page declares RTL, links only local assets, and highlights exactly one active sidebar item — verifiable by static inspection.
- **SC-004**: A keyword scan of the page finds ZERO internal-accounting terms (مدين، دائن، قيد، ترحيل، شجرة الحسابات, account codes) — verifiable by static inspection.
- **SC-005**: The summary shows the 5 cards with estimates clearly labelled; the reports table shows the 4 example reports with the 3 statuses; the status explanations and tax note are present; the request-report card has its 3 fields + send button.
- **SC-006**: "تقارير العميل" is a live link in the sidebar and `index.html`, with contextual links from `client-dashboard.html` and `client-documents.html`; after this feature **no module shows "قريباً"** and the screen counter reflects the new total.
- **SC-007**: After adding the page and converting the last coming-soon sidebar item, no existing page, sidebar link, or asset path is broken; every page still has exactly one active sidebar item and a tag-balanced sidebar.

## Assumptions

- The page is frontend-only: no backend, API, database, authentication, or enforcement; all data is hardcoded Arabic demo content.
- Filters, row actions, download buttons, and the request form are presented visually but do not filter, persist, generate, or submit anything.
- Figures are realistic but fictional; estimated figures (net, tax) are explicitly labelled as estimates.
- This page is the client-facing counterpart to the internal reports surfaces; it deliberately omits all accounting internals per Principle V.
- The shared sidebar already contains the coming-soon entry "تقارير العميل"; this feature converts it to a live link across all pages — it is the **last** coming-soon module, so afterwards the landing page shows no "قريباً" items.
- The page reuses the existing client-portal chrome (same shared sidebar/header) used by `client-dashboard.html` / `client-documents.html`.
