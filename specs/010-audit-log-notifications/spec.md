# Feature Specification: سجل النشاط ومركز الإشعارات — Audit Log & Notifications Center

**Feature Branch**: `010-audit-log-notifications`  
**Created**: 2026-06-11  
**Status**: Draft  
**Input**: User description: "Spec 009 (numbered 010) — Audit Log & Notifications Center: internal admin/accounting frontend pages for (1) activity traceability — an audit log with filters, KPI cards, an event table, and a before/after detail panel; and (2) a system notifications center — a filterable notification list with per-item status/actions and a preferences card. Two pages: audit-log.html, notifications.html. Add links from the header bell, settings, and sidebar. No backend; static Arabic data."

## Overview

The firm needs two cross-cutting operational screens: an **audit log** so admins can trace every sensitive operation (who did what, to which client/document, with before/after values and IP), and a **notifications center** so the team can triage important alerts about documents, replies, reports, imports, and approvals. This feature delivers the **frontend** of both as Arabic/RTL Accountant/Admin pages on the approved Mohasebaty design system. Presentation-only: all data is realistic static Arabic demo content, there is no backend, filters/toggles/actions do not enforce or persist anything, and the detail/preferences panels are authored in HTML.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Trace System Activity in the Audit Log (Priority: P1)

An admin opens the audit log to investigate recent sensitive activity. A filter bar narrows by user, client, action type, period, and related document. KPI cards summarize today's events, sensitive edits, approvals, and failures. An event table lists each operation with time, user, role, action, client, related item, a before/after indicator, IP, and a details affordance. Selecting an event reveals a side panel with the full event details and the before/after values.

**Why this priority**: Traceability is a governance and trust requirement — it is the primary deliverable and stands alone.

**Independent Test**: Open `pages/audit-log.html`; use the 5 filters; read the 4 KPI cards; scan the 9-column event table with realistic Arabic rows (incl. the 5 example events); see the side details panel with before/after values and system notes.

**Acceptance Scenarios**:

1. **Given** the page is open, **When** the admin views the header, **Then** they see filters for المستخدم، العميل، نوع الإجراء، الفترة، المستند المرتبط.
2. **Given** the KPI band, **When** viewed, **Then** it shows أحداث اليوم، تعديلات حساسة، عمليات اعتماد، عمليات فشل.
3. **Given** the audit table, **When** the admin reads a row, **Then** they see: الوقت، المستخدم، الدور، الإجراء، العميل، العنصر المرتبط، قبل/بعد، IP، تفاصيل.
4. **Given** the demo data, **When** scanning rows, **Then** the example events are present: "أحمد صنف فاتورة INV-204"، "منى عدّلت نسبة الضريبة"، "العميل رفع ملف جديد"، "المدير اعتمد تقرير VAT"، "تم إغلاق فترة مايو".
5. **Given** a selected/highlighted event, **When** the side panel is shown, **Then** it shows تفاصيل الحدث، القيم قبل التعديل، القيم بعد التعديل، ملاحظات النظام.

---

### User Story 2 - Triage Alerts in the Notifications Center (Priority: P1)

A team member opens the notifications center to triage alerts. Filter chips switch between all notifications and categories (documents, messages, reports, data-import, approval). The list shows each notification with an icon, title, description, time, a new/read status, and an action. A preferences card lets them see which notification channels are on (in-app, email) plus period-close and import-failure alerts.

**Why this priority**: Notifications are how the team stays on top of time-sensitive work. Independent of the audit log.

**Independent Test**: Open `pages/notifications.html`; use the 6 filter chips; scan the 6 notifications (each with icon, title, description, time, new/read status, action); see the preferences card with 4 toggles.

**Acceptance Scenarios**:

1. **Given** the page is open, **When** the member views the filter row, **Then** they see chips: الكل، مستندات، رسائل، تقارير، استيراد بيانات، اعتماد.
2. **Given** the notification list, **When** viewed, **Then** it includes: مستند جديد، مطلوب توضيح، رد جديد من العميل، تقرير جاهز، ملف استيراد فشل، فترة مالية ستغلق.
3. **Given** a notification, **When** the member reads it, **Then** it shows an أيقونة، عنوان، وصف، الوقت، a حالة (جديد / مقروء), and an إجراء.
4. **Given** the preferences card, **When** viewed, **Then** it shows toggles for إشعارات داخل النظام، إشعارات البريد، تنبيه قبل إغلاق الفترة، تنبيه عند فشل الاستيراد.
5. **Given** unread notifications, **When** viewed, **Then** "جديد" items are visually distinct from "مقروء" items.

---

### User Story 3 - Reach the Pages from Bell, Settings & Sidebar (Priority: P3)

The two pages are wired in: the header notification **bell** links to the notifications center, the shared sidebar exposes both as live links (replacing the existing "سجل التدقيق" and "الإشعارات" coming-soon items), `index.html` shows both as live cards, and `settings.html` links to both.

**Why this priority**: Integration makes the pages reachable, but each delivers value alone.

**Independent Test**: The header bell on a page navigates to `notifications.html`; the 2 sidebar items are live links; `index.html` shows both as live cards; `settings.html` links to both; every page has exactly one active sidebar item.

**Acceptance Scenarios**:

1. **Given** any page with a header bell, **When** the bell is clicked, **Then** it navigates to `notifications.html`.
2. **Given** any project page, **When** the sidebar is open, **Then** "سجل التدقيق" → `audit-log.html` and "الإشعارات" → `notifications.html` are live links.
3. **Given** `index.html` and `settings.html`, **When** viewed, **Then** both pages are reachable (live cards + contextual links) and counters stay consistent.

---

### Edge Cases

- **A failed operation row** ("عمليات فشل") → its action/status uses a distinct rose treatment so failures stand out in the table and KPI.
- **A sensitive edit with before/after** → the "قبل/بعد" cell signals a value change, and the side panel shows both old and new values clearly.
- **An event with no before/after** (e.g., a file upload or a period close) → the "قبل/بعد" cell shows a neutral "—" and the side panel notes "لا يوجد تغيير قيمة".
- **A "جديد" vs "مقروء" notification** → unread is visually emphasized; read is muted.
- **A "فترة مالية ستغلق" notification** → uses an amber/warning treatment to convey urgency.
- **Navigating to either page directly** → it renders with its static demo data (frontend-only).

## Requirements *(mandatory)*

### Functional Requirements

**Page 1 — سجل النشاط (`pages/audit-log.html`)**

- **FR-001**: The page MUST present a header with title "سجل النشاط" and subtitle "تابع كل العمليات والتعديلات الحساسة داخل النظام".
- **FR-002**: The page MUST provide a filter bar with five filters: المستخدم، العميل، نوع الإجراء، الفترة، المستند المرتبط.
- **FR-003**: The page MUST present four KPI cards: أحداث اليوم، تعديلات حساسة، عمليات اعتماد، عمليات فشل.
- **FR-004**: The page MUST present an audit table with nine columns: الوقت، المستخدم، الدور، الإجراء، العميل، العنصر المرتبط، قبل/بعد، IP، تفاصيل, with realistic Arabic demo rows including the five example events.
- **FR-005**: The page MUST present a side details panel showing: تفاصيل الحدث، القيم قبل التعديل، القيم بعد التعديل، ملاحظات النظام.

**Page 2 — مركز الإشعارات (`pages/notifications.html`)**

- **FR-006**: The page MUST present a header with title "مركز الإشعارات" and subtitle "تابع التنبيهات المهمة المتعلقة بالمستندات والتقارير والاستيراد".
- **FR-007**: The page MUST present a notification filter row with six options: الكل، مستندات، رسائل، تقارير، استيراد بيانات، اعتماد.
- **FR-008**: The page MUST present a notification list including: مستند جديد، مطلوب توضيح، رد جديد من العميل، تقرير جاهز، ملف استيراد فشل، فترة مالية ستغلق.
- **FR-009**: Each notification MUST show an icon, a title, a description, a time, a status (جديد / مقروء), and an action; "جديد" items MUST be visually distinct from "مقروء".
- **FR-010**: The page MUST present a preferences card with four toggles: إشعارات داخل النظام، إشعارات البريد، تنبيه قبل إغلاق الفترة، تنبيه عند فشل الاستيراد.

**Cross-cutting**

- **FR-011**: Both pages MUST be Accountant/Admin (internal) pages and MUST NOT appear in the simplified Client portal.
- **FR-012**: Each page MUST share the approved header and sidebar with exactly one active sidebar item highlighted, and MUST reuse the approved cards/KPIs, filters, tables, chips/badges, list rows, switches, side panel, and buttons without introducing a new visual style.
- **FR-013**: The header notification bell MUST link to `notifications.html`; the shared sidebar MUST present "سجل التدقيق" → `audit-log.html` and "الإشعارات" → `notifications.html` as live links (replacing the current coming-soon items); `index.html` MUST present both as live landing cards with its page/coming-soon counters kept consistent.
- **FR-014**: `settings.html` MUST provide working contextual links to both new pages.
- **FR-015**: JavaScript MAY be used ONLY for UI behavior (filter chips, switch states, optional row→panel highlight) — never to generate page content; all rows/cards/notifications MUST be authored in HTML.
- **FR-016**: Every page MUST declare `<html lang="ar" dir="rtl">`, link the local compiled stylesheet via a correct relative path, and use professional Arabic-only static demo data.

### Key Entities

- **Audit Event (حدث)**: Attributes: time, user, role, action, client, related item, before/after indicator (and old/new values), IP, severity (info / sensitive / approval / failure).
- **Notification (إشعار)**: Attributes: category (document / message / report / data-import / approval), icon, title, description, time, status (جديد / مقروء), urgency (normal / warning), action.
- **Notification Preference (تفضيل إشعار)**: Attributes: key (in-app / email / period-close / import-failure), enabled flag.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: An admin can open `pages/audit-log.html`, narrow the log with the 5 filters, and read who changed what (with before/after) for any of the example events within seconds.
- **SC-002**: Both pages open with no console errors, display complete professional Arabic content (no placeholders, no Lorem ipsum, no untranslated English UI labels), and are reachable from the sidebar.
- **SC-003**: Each page declares RTL, links only local assets, and highlights exactly one active sidebar item — verifiable by static inspection.
- **SC-004**: The audit table shows at least 10 realistic rows including the 5 example events, with at least one "فشل" row and one before/after edit row; the 4 KPI cards show consistent numbers.
- **SC-005**: The notifications list shows the 6 required notifications with distinct "جديد"/"مقروء" states and at least one warning-styled item; the preferences card shows the 4 toggles.
- **SC-006**: The header bell navigates to `notifications.html`, and the two pages are live links in the sidebar and `index.html`, with contextual links from `settings.html`.
- **SC-007**: After adding the two pages and converting the two coming-soon sidebar items, no existing page, sidebar link, header bell, or asset path is broken; every page still has exactly one active sidebar item and a tag-balanced sidebar.

## Assumptions

- Both pages are frontend-only: no backend, API, database, authentication, logging, or enforcement; all data is hardcoded Arabic demo content.
- Filters, filter chips, the preferences toggles, row actions, and notification actions are presented visually but do not filter, persist, or enforce anything.
- The before/after detail panel shows static old/new values for a representative selected event; selecting different rows may visually highlight without re-rendering content via JS.
- IP addresses, timestamps, and names are realistic but fictional; timestamps are relative to a fixed demo "today".
- These are Accountant/Admin pages; the client portal is unaffected.
- The header bell currently exists as a button on internal pages; this feature makes it link to `notifications.html` (and may show an unread badge).
- The sidebar already contains coming-soon entries "سجل التدقيق" and "الإشعارات"; this feature converts them to live links across all pages and updates `index.html` counts. After this feature only "تقارير العميل" remains coming-soon.
- This feature presents activity and notifications only; it does not generate audit entries or deliver real notifications (no backend) — it is the traceability/alerting surface.
