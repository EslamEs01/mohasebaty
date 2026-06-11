# Research: Modals & Cross-Page Actions Completion (Spec 012)

Phase 0 decisions. Every "NEEDS CLARIFICATION" from Technical Context is resolved here. Each decision is grounded in the actual repository state audited on 2026-06-11.

## R1 — Reuse the existing modal system; add no new modal CSS

- **Decision**: All new modals reuse the shipped shell: `.scrim[data-overlay][hidden]` > `.modal[role=dialog][aria-modal][aria-labelledby]` > `.modal-head`(`<h3 id>` + `.icon-btn[data-close]` X) + `.modal-body` + `.modal-foot`. No new modal class is added to `input.css`.
- **Rationale**: `output.css` already defines `.scrim`/`.modal`/`.modal-head`/`.modal-body`/`.modal-foot` (input.css lines ~931–959), and 12 pages already use them. Introducing a variant would violate Constitution I (single approved style) and VII.
- **Alternatives considered**: A new `.modal-confirm`/`.modal-danger` variant — rejected; the shipped `closePeriodModal` proves confirmation modals are fully expressible with `.tip` + `.set-body` inside the standard shell.

## R2 — Open/close uses the existing `initOverlays()`; no new JS

- **Decision**: New triggers carry `data-open="#modalId"`; close controls carry `data-close`. No JavaScript is added.
- **Rationale**: `main.js` `initOverlays()` (lines ~150–178) already binds, at boot, every `[data-open]` (show), every `[data-close]` (hide nearest `[data-overlay]`), scrim click-outside, and Escape-closes-all. New attributes are picked up automatically.
- **Alternatives considered**: Per-page inline `onclick` — rejected (Constitution III + duplicates existing behavior). A modal manager — rejected (over-engineering; no need).

## R3 — Severity maps to existing button classes; no danger/red button invented

- **Decision**: Positive confirm (Approve Report, Confirm Posting, Reopen Period, all create/upload) → `.btn-primary`. Warning/destructive confirm (Request Clarification, Reject Document) → `.btn-amber`. Cancel → `.btn-outline[data-close]`. Close → `.icon-btn[data-close]`.
- **Rationale**: `output.css` exposes only `.btn-primary` / `.btn-outline` / `.btn-amber` / `.btn-ghost`. `.btn-rose`/`.btn-danger` were deliberately purged (Spec 011 plan). The shipped `closePeriodModal` confirms with `.btn-primary` and warns via the amber `.tip`. Reusing amber for destructive confirms keeps the approved palette intact (Constitution I).
- **Alternatives considered**: Add a red `.btn-danger` to `input.css` (permitted by FR-013 if a variant is "missing") — rejected: the palette intentionally has no red; adding one contradicts the established direction and would force a Tailwind rebuild. The amber warning affordance is the project's destructive signal.
- **Spec reconciliation**: FR-011 says "danger for reject/close." Interpreted as "the design system's destructive/warning affordance," which is amber `.tip` + `.btn-amber` — not a new red button.

## R4 — Gap analysis: 9 of 16 modals already exist; 7 are new

- **Decision**: Build only the 7 missing modals; reuse the 9 existing ones unchanged.
- **Evidence (modal ids found in `pages/`)**: `addClientModal` (clients), `addVendorModal` (vendors), `addCustomerModal` (commercial-customers), `addAccountModal` (bank-accounts; also chart-of-accounts), `addCategoryModal` (document-categories), `addUserModal` (users-permissions), `manualEntryModal` (journal-entries), `closePeriodModal` + `reopenPeriodModal` (fiscal-periods).
- **The 7 new**: `requestClarificationModal`, `rejectDocumentModal`, `approveReportModal`, `confirmPostingModal`, `uploadDataModal`, `importErrorActionModal`, `assignAccountantModal`.
- **Rationale**: Avoids duplicating/restyling shipped work (Constitution VII) and scopes the build precisely.

## R5 — Owner-page placement (and the Approve-Report client-boundary correction)

- **Decision**:
  - Request Clarification + Reject Document → `document-review.html` (accountant review surface). `accountant-inbox.html` row actions navigate to `document-review.html` rather than duplicating the modals.
  - Approve Report → `reports.html` (primary) and `approval-workflow.html`. **Not** `client-reports.html`.
  - Confirm Posting → `journal-entries.html`.
  - Upload Data File → `import-history.html` (a quick "رفع ملف جديد" entry; `data-import.html` already has an inline upload that navigates to `import-mapping.html`).
  - Import Error Action → `import-errors.html` (per-row إجراء).
  - Assign Accountant → `clients.html` (primary) and `client-profile.html`.
- **Rationale**: Approving a report is an accountant/admin governance action; placing it on the client page would expose accountant workflow to clients (Constitution V). The spec's Key Entities tentatively listed "Client Reports"; this is corrected to accountant surfaces. The other placements follow each action's natural home in the existing navigation.
- **Alternatives considered**: A second clarification/reject modal inside `accountant-inbox.html` — rejected to avoid duplication; the inbox routes to the review page where the modals live.

## R6 — Upload Data File: a quick-upload modal, not a new page

- **Decision**: `uploadDataModal` on `import-history.html` reuses the existing `.upload` drop-zone + `.browse` markup from `data-import.html`, with a primary "رفع ومتابعة" and a cancel. `data-import.html`'s existing inline upload → `import-mapping.html` flow is left intact.
- **Rationale**: Gives the named modal a clean home and real value (upload without leaving the history list) while honoring "upload actions open an upload modal OR navigate" (FR-005). No new page (FR-018).

## R7 — Import Error Action: a choice + confirm modal

- **Decision**: `importErrorActionModal` on `import-errors.html` describes the selected error row and offers resolution choices via a `.seg` toggle (e.g. «تصحيح يدوي» / «تجاهل الصف» / «إعادة المحاولة»), with a short note `.field`/`textarea`, primary "تطبيق الإجراء" (`.btn-primary`) and cancel. Destructive «تجاهل الصف» surfaces an amber `.tip` consequence line.
- **Rationale**: Matches the confirmation pattern; keeps all choices in static HTML (FR-009). Accountant surface, so technical wording is allowed.

## R8 — Export feedback: a small reusable confirmation modal (with optional `.toast`)

- **Decision**: A reusable `exportConfirmModal` block is added to each page bearing a تصدير action. Body = a brief scope/format summary (`.set-row` or a `.select-wrap` format picker), primary "تصدير" (`.btn-primary`), cancel; the success state reuses the static `.toast` chip. JS = existing data-open/data-close only.
- **Rationale**: Satisfies "export opens a confirmation/toast-style modal, no real file op" (FR-006, SC-008) with zero new CSS (`.toast` already exists) and zero new JS. A pure auto-dismiss toast would need a timer (new JS) — rejected in favor of an attribute-driven modal.
- **Alternatives considered**: One shared toast element toggled globally — rejected (needs JS timing; less honest about "what will be exported").

## R9 — Cross-page dead-action taxonomy (resolving ~99 `href="#"`)

- **Decision**: Classify every major action by verb and resolve per the taxonomy in `contracts/page-contracts.md#C3`: view/open/review → navigate; add/assign → modal; edit → reuse add modal or navigate to detail; approve/reject/post/close/reopen → confirmation modal; export → exportConfirmModal; upload → upload modal/page; truly-future → disabled/"قريباً". `href="#"` that is already JS-wired (dropdowns, user menu, tabs, notification bell) is left as-is once verified to produce a visible response.
- **Rationale**: A single rule set makes the sweep auditable and prevents ad-hoc wiring. Minor links (pagination/sort) are out of scope for forced navigation but must not look broken (FR-003).
- **Audit baseline**: 99 `href="#"` occurrences across 37 pages (highest: commercial-customers 10, bank-accounts 9, client-reports 7). The dead-action sweep in `quickstart.md` re-counts and confirms every remaining `#` is intentional/JS-handled.

## R10 — Preservation & agent context

- **Decision**: Do not edit `input.css`, `output.css`, `main.js`, the shared sidebar/header, or the 9 shipped modals. The only shared-file edit is the `CLAUDE.md` SPECKIT marker block (agent context) → repoint to this plan and add Spec 011 to prior features.
- **Rationale**: Constitution VII; keeps the prototype continuously demoable. A "no diff to shared assets" check gates sign-off.
