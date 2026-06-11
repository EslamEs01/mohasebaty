# Feature Specification: Modals & Cross-Page Actions Completion

**Feature Branch**: `012-modals-cross-page-actions`  
**Created**: 2026-06-11  
**Status**: Draft  
**Input**: User description: "Spec 011 — Modals & Cross-Page Actions Completion. Add all missing modals, action states, and confirmation flows needed before backend implementation. Review all existing and newly created pages. Every major visible action must either navigate to a real page, open a modal, or clearly appear disabled/future."

## Overview

The prototype now has 37 complete pages, but many primary actions across those pages still lead nowhere — they are placeholder links or buttons with no visible response. Before backend work begins, every meaningful action a user can take must resolve to one of three honest outcomes: it navigates to a real page, it opens a modal, or it clearly presents itself as disabled/future. This feature closes that gap by completing a consistent set of reusable modals (creation, decision/confirmation, and export) and wiring every major workflow button so the prototype can be reviewed and demoed end-to-end without dead ends.

This is a frontend-only, cross-cutting completion feature (Roadmap item 8). It adds no new pages and changes no approved design.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - No dead major actions across the prototype (Priority: P1)

A reviewer (or stakeholder doing a walkthrough) clicks through every page and exercises the primary action buttons — إضافة، فتح، عرض، مراجعة، تعديل، اعتماد، رفض، إغلاق، ترحيل، تصدير، رفع، إسناد. Every such action produces an immediate, sensible visible response: it moves to a real page, opens the relevant modal, or shows a clearly disabled/"قريباً" state. No major action is a silent dead click.

**Why this priority**: This is the core promise of the feature and the acceptance gate ("No major workflow button is dead"). It delivers a continuously demoable prototype on its own — even before every modal is fully fleshed out, simply removing dead ends makes the product reviewable.

**Independent Test**: Walk every page, click each major action, and confirm a visible response each time (navigation, modal, or disabled/future state). Zero dead clicks among major actions = pass.

**Acceptance Scenarios**:

1. **Given** a user is on any page, **When** they click a primary action labelled with a major workflow verb (إضافة/فتح/عرض/مراجعة/تعديل/اعتماد/تصدير/رفع/إسناد), **Then** the app navigates to a real page, opens a modal, or shows a visibly disabled/future control — never nothing.
2. **Given** an action whose destination does not yet exist, **When** the user clicks it, **Then** it is presented as a clearly disabled or "قريباً" control rather than an empty `#` link that appears clickable but does nothing.
3. **Given** any non-destination link previously pointing to `#`, **When** the page is reviewed, **Then** it either does something visible or is styled as non-interactive, so nothing looks broken.

---

### User Story 2 - Create and add entities through complete modals (Priority: P2)

An accountant or admin adds a new record — a client, vendor, commercial customer, bank account, document category, user, manual journal entry — or assigns an accountant, or uploads a data file. From the relevant page they click the "إضافة/إسناد/رفع" action and a complete, RTL modal opens with all the needed fields already present in the page, a clear title and short description, a primary confirm action, a cancel action, an X close button, and an overlay. They can fill the visible fields, then close or confirm.

**Why this priority**: Creation flows are the most visible "missing modal" gap and the bulk of the named modal list. They make the master-data and workflow pages feel functional for demos.

**Independent Test**: From each owning page, open its create/add/assign/upload modal, confirm it contains title, description, fields, primary action, cancel, close (X), and overlay, and that it opens and closes cleanly. All form modals present and complete = pass.

**Acceptance Scenarios**:

1. **Given** the user is on a master-data or workflow page that owns a create action, **When** they click "إضافة …"/"إسناد …"/"رفع …", **Then** the corresponding modal opens with a title, a short description, and the relevant fields visible.
2. **Given** a create/add modal is open, **When** the user clicks the X, the cancel button, the overlay, or presses Escape, **Then** the modal closes and the page returns to its prior state with no other modal affected.
3. **Given** a create/add modal is open, **When** the user reviews the fields, **Then** required fields are marked and every label and placeholder is professional Arabic with correct RTL layout.

---

### User Story 3 - Confirm decisions and state changes before they happen (Priority: P2)

An accountant or admin performs a decision or state-changing action — request clarification, reject a document, approve a report, close or reopen a fiscal period, confirm posting, or choose how to resolve an import error. Each opens a modal that states clearly what will happen (and the consequence, for destructive/irreversible actions), with the relevant detail or short reason/message field, a clearly-coloured primary action (warning for clarification, danger for reject/close, primary for approve/post/reopen), a cancel action, an X, and an overlay. Destructive and state-changing actions are never one-click silent.

**Why this priority**: Confirmation flows protect the integrity narrative of a financial product and satisfy the acceptance rule that delete/reject/close actions must have a confirmation modal. They build directly on the shared modal from US2.

**Independent Test**: Trigger each decision/state-change action and confirm a confirmation modal appears with consequence text and the right primary/secondary actions before anything "completes". All confirmation modals present and consistent = pass.

**Acceptance Scenarios**:

1. **Given** a document in review, **When** the accountant clicks "طلب توضيح" or "رفض", **Then** a modal opens describing the action, offering a reason/message field, and a clearly-coloured confirm plus a cancel — closing it makes no change.
2. **Given** a fiscal period, **When** the user clicks "إغلاق الفترة" or "إعادة فتح الفترة", **Then** a confirmation modal states the consequence and requires explicit confirm or cancel.
3. **Given** a report awaiting approval, an unposted entry, or a flagged import error, **When** the user clicks "اعتماد"/"تأكيد الترحيل"/the error action, **Then** the matching modal opens with the relevant details and a clear primary action.

---

### User Story 4 - Export actions give honest feedback (Priority: P3)

A user clicks an export/download action (تصدير) on a report, table, or list. Instead of a dead click or a broken download, a lightweight confirmation/toast-style modal acknowledges the export request (e.g. a format/scope summary and a confirm), consistent with the rest of the modal system.

**Why this priority**: Export buttons are everywhere and are a common dead-click source, but they are lower-stakes than creation and confirmation flows, so they come last.

**Independent Test**: Click each export action and confirm a confirmation/toast modal appears and dismisses cleanly. No export button is dead = pass.

**Acceptance Scenarios**:

1. **Given** any page with an export action, **When** the user clicks "تصدير", **Then** a confirmation/toast-style modal appears summarising the export and offering confirm/close.
2. **Given** the export confirmation is open, **When** the user confirms or closes it, **Then** it dismisses cleanly with no console error and no real file operation.

---

### Edge Cases

- **Truly future actions**: An action with no destination yet MUST render as a visibly disabled/"قريباً" control, never as an `href="#"` that looks active but does nothing.
- **Multiple modals per page**: Opening one modal MUST NOT open, alter, or reveal any other modal on the same page; only the triggered modal appears.
- **Dismissal paths**: Every modal MUST be closable via the X, the cancel button, an overlay/scrim click, and the Escape key, returning the page to its prior state.
- **Client portal boundary**: Client-facing modals (e.g. upload, replying to a clarification) MUST stay non-technical and MUST NOT expose debit/credit, journal entries, posting, or accounting classification (Constitution Principle V).
- **Mobile/responsive**: A modal MUST fit within the viewport, scroll internally if its content is tall, and not overflow horizontally on mobile or tablet.
- **No data present**: An export or list action on an empty state still gives an honest response (confirmation/toast or disabled), not a dead click.
- **Frontend-only fields**: Required-field markers are shown for clarity, but no real validation, submission, or persistence occurs; confirming a form simply closes the modal (optionally with a success toast).
- **Already-present modals**: Where a page already has a working modal (e.g. Add Client), the feature reuses and aligns it rather than duplicating or redesigning it.

## Requirements *(mandatory)*

### Functional Requirements

#### Cross-page action coverage

- **FR-001**: Every major workflow action across all 37 pages MUST resolve to exactly one honest outcome: navigate to a real existing page, open a modal, or appear as a clearly disabled/future control.
- **FR-002**: No major workflow action MUST remain a dead click — i.e. an `href="#"` or empty handler that appears interactive but produces no visible response.
- **FR-003**: Major workflow actions in scope are those carrying the verbs إضافة، فتح، عرض، مراجعة، تعديل، اعتماد، رفض، حذف، إغلاق، إعادة فتح، ترحيل/تأكيد الترحيل، تصدير، رفع، إسناد (and clear synonyms). Minor/cosmetic links (pagination, sort toggles, self-referential breadcrumbs) MUST NOT appear broken but are not required to navigate.
- **FR-004**: Destructive or state-changing actions (حذف، رفض، إغلاق الفترة، إعادة فتح الفترة، تأكيد الترحيل) MUST open a confirmation modal that states the consequence before the action would complete.
- **FR-005**: Upload actions MUST either open an upload modal or navigate to a real upload page; they MUST NOT be dead clicks.
- **FR-006**: Export actions MUST open a confirmation/toast-style modal acknowledging the request; they MUST NOT trigger a real file operation or be dead clicks.

#### Required modals (the named set)

- **FR-007**: The prototype MUST provide all sixteen named modals, each reachable from its owning page in a single click: Add Client, Add Vendor, Add Commercial Customer, Add Bank Account, Add Document Category, Request Clarification, Reject Document, Approve Report, Close Fiscal Period, Reopen Fiscal Period, Confirm Posting, Upload Data File, Import Error Action, Assign Accountant, Add User, Add Manual Journal Entry.
- **FR-008**: Each modal MUST contain all of: a title, a short description, body content (form fields for create/upload modals, or confirmation details for decision modals), a primary action, a secondary cancel action, a close (X) button, and an overlay.
- **FR-009**: All modal content (titles, descriptions, field labels, placeholders, confirmation details) MUST be authored as static page content present in HTML; it MUST NOT be generated dynamically. Scripting is limited to opening and closing modals only — no script-generated fields or modal bodies.
- **FR-010**: Create/add modals MUST present the fields a user would expect for that entity, with Arabic labels, required-field markers where appropriate, and correct input affordances, reusing the established form components.
- **FR-011**: Decision/confirmation modals MUST present the relevant details or a short reason/message field and use the primary-action colour that matches the action's severity (warning for clarification, danger for reject/close, primary for approve/post/reopen).

#### Modal behavior & consistency

- **FR-012**: Every modal MUST be closable via the X button, the cancel button, an overlay/scrim click, and the Escape key, each returning the page to its prior state.
- **FR-013**: All modals MUST reuse the single shared modal visual style (overlay, card, head/body/foot) already established in the prototype; no new or divergent modal style may be introduced. If a needed reusable variant is missing (e.g. a confirmation/danger modal or an export/toast pattern), it MUST be added as a shared component class rather than as per-page inline styling.
- **FR-014**: Opening any modal MUST NOT affect any other modal or section on the same page; only the triggered modal becomes visible.
- **FR-015**: All modals MUST be Arabic-only and RTL, with professional financial-SaaS wording and realistic Arabic demo content.
- **FR-016**: Client-portal modals MUST remain simple and non-technical and MUST NOT expose accounting internals (debit/credit, journal entries, posting, chart of accounts, classification).

#### Preservation

- **FR-017**: The change MUST be non-destructive: all 37 existing pages MUST continue to open with no console errors, no broken internal links, and no broken CSS paths, and existing working modals MUST be preserved (reused/aligned, not duplicated or redesigned).
- **FR-018**: No new pages MUST be created and the approved design system MUST NOT be redesigned; this feature only adds/wires modals and resolves action targets on existing pages (plus shared style/behavior files where strictly necessary).

### Key Entities *(modals and their owning pages)*

- **Create/Add modals** (form body): Add Client → Clients; Add Vendor → Vendors; Add Commercial Customer → Commercial Customers; Add Bank Account → Bank Accounts; Add Document Category → Document Categories; Add User → Users & Permissions; Add Manual Journal Entry → Journal Entries; Assign Accountant → Clients/Client Profile; Upload Data File → Data Import / Upload.
- **Decision/Confirmation modals** (details or short reason body): Request Clarification → Document Review / Inbox; Reject Document → Document Review / Inbox; Approve Report → Client Reports / Reports / Approval Workflow; Close Fiscal Period → Fiscal Periods; Reopen Fiscal Period → Fiscal Periods; Confirm Posting → Journal Entries / Document Review; Import Error Action → Import Errors.
- **Export/Toast confirmation** (lightweight acknowledgment): reusable pattern shared by every export action across reports, tables, and lists.
- **Shared modal component**: the single overlay + card (head/body/foot) + close/cancel/primary structure all modals reuse; the contract that guarantees visual consistency.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 0 major workflow actions across all 37 pages are dead clicks — every audited major action produces a visible response (navigation, modal, or disabled/future state).
- **SC-002**: All 16 named modals are present and each opens from its owning page in a single click.
- **SC-003**: 100% of modals contain all 7 required elements (title, description, body, primary action, cancel, close X, overlay) — verified element-by-element.
- **SC-004**: 100% of destructive/state-changing actions (delete, reject, close period, reopen period, confirm posting) present a confirmation modal before the action would complete.
- **SC-005**: Every modal can be opened and then dismissed via all four paths (X, cancel, overlay click, Escape) with no console error.
- **SC-006**: A reviewer confirms a single shared modal visual style is used throughout — no second/divergent modal style is introduced.
- **SC-007**: All 37 previously completed pages still open with no console errors, no broken internal links, and no broken CSS paths after the change.
- **SC-008**: 100% of export actions open a confirmation/toast-style acknowledgment instead of performing a real file operation or producing a dead click.
- **SC-009**: A reviewer completes a full click-through of every page's major actions in a single session without encountering a dead end.

## Assumptions

- The prototype already has a working modal system (overlay/scrim + card with head/body/foot, opened from a trigger and closed via close/cancel/overlay/Escape). This feature reuses it; new reusable classes are added only if a needed variant (confirmation/danger modal, export/toast) is missing.
- "Major action" means a control carrying a primary workflow verb (per FR-003). Pagination, sort toggles, and self-referential links are out of scope for forced navigation but must not look broken.
- Several named modals already exist on their owning pages (e.g. Add Client, and modals on Vendors, Commercial Customers, Bank Accounts, Document Categories, Fiscal Periods, Journal Entries, Users & Permissions). The work reviews and aligns these and adds the missing ones to complete the set of 16.
- Export actions resolve to a confirmation/toast modal; no real file is generated (frontend-only).
- Forms are non-functional: required markers are shown for clarity, but there is no validation, submission, or persistence; confirming a create/decision modal simply closes it (optionally with a success toast).
- Disabled/future actions use a clear disabled visual and/or an Arabic "قريباً" marker rather than an active-looking `#` link.
- Owning-page assignments in Key Entities follow the existing navigation; if a page already hosts an equivalent action, the modal attaches there rather than creating a new location.
- The Saudi-first / Egypt-next Arabic wording, currency, and demo-data conventions of the existing pages are retained.

## Out of Scope

- Any backend, real data submission, server-side validation, real file upload/storage, or persistence.
- Real export/download/report generation.
- Creating new pages or new navigation destinations.
- Redesigning, restyling, or restructuring any approved page or the design system.
- Adding business/validation logic beyond opening and closing modals.
