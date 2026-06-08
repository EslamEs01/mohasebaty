<!--
SYNC IMPACT REPORT
==================
Version change: (uninitialized template) → 1.0.0
Bump rationale: First concrete ratification of the Mohasebaty constitution. The file
previously contained only template placeholders; defining all principles and governance
for the first time is a MAJOR establishment event → 1.0.0.

Principles defined (all new):
  I.   Approved Design Is the Source of Truth
  II.  Local, Static, Framework-Free Stack
  III. JavaScript for Interaction Only — Never Content
  IV.  Arabic-First, RTL-Native
  V.   Two Audiences, Calibrated Detail
  VI.  Complete Pages Only — No Skeletons, No Placeholders
  VII. Preserve Existing Work

Sections added:
  - Technology & Project Structure
  - Product Scope & Frontend Roadmap
  - Quality Gates & Definition of Done
  - Governance

Sections removed: none (template placeholders replaced).

Templates / docs reviewed for consistency:
  ✅ .specify/templates/plan-template.md — "Constitution Check" gate references the
     constitution dynamically; compatible (frontend-only features choose the web/frontend
     structure option and drop backend/test gates).
  ✅ .specify/templates/spec-template.md — generic; compatible. Specs MUST stay
     technology-agnostic per template guidance, which aligns with this constitution.
  ✅ .specify/templates/tasks-template.md — compatible. Tests are OPTIONAL per the
     template; frontend-only features omit backend/test phases and use frontend paths.
  ✅ .specify/templates/checklist-template.md — generic; compatible.
  ✅ CLAUDE.md — updated to require reading this constitution and
     CLAUDE_FRONTEND_RULES.md before any task.
  ✅ CLAUDE_FRONTEND_RULES.md — remains the detailed execution rule set; this
     constitution governs and references it (no contradictions).

Follow-up TODOs: none. No deferred placeholders remain.
-->

# Mohasebaty Constitution

Mohasebaty (محاسبتي) is a frontend-only Arabic, RTL prototype for an outsourced
accounting / bookkeeping platform. An accounting firm manages the books for many client
companies: clients upload invoices, expenses, vouchers, and imported data; accountants
review, classify, map, post, and report on that data. The product launches in Saudi
Arabia first, then Egypt. This document is the supreme, non-negotiable rule set for all
work in this repository. It governs and incorporates `CLAUDE_FRONTEND_RULES.md`; where
the two ever appear to conflict, the stricter constraint wins.

## Core Principles

### I. Approved Design Is the Source of Truth

The first five implemented and approved pages — Client Dashboard, Upload Document,
Accountant Documents Inbox, Document Review & Accounting Classification, and Admin
Financial Dashboard — define the official design system. The repository's 15 existing
pages are the visual contract. Every new or changed page MUST reuse the established
layout, sidebar, header, cards, KPI cards, tables, forms, buttons, badges, filters,
upload areas, timelines, modals, shadows, radii, spacing, typography, color system, and
RTL behavior. Introducing a new UI style, redesigning approved pages, or inventing a new
badge/button/card variant when an existing one fits is PROHIBITED.

**Rationale**: The approved style is the agreed product identity. Consistency is the
feature; drift erodes trust in a financial product and creates rework before backend
integration.

### II. Local, Static, Framework-Free Stack

The stack is HTML, CSS, and locally built Tailwind CSS only. The following are
PROHIBITED without exception: Tailwind CDN, any CDN dependency, Bootstrap, React, Vue,
Angular, Next.js, SPA architecture, external admin templates, external icon/chart/font
services, and arbitrary UI libraries. Tailwind MUST be installed and compiled locally;
every page MUST link the local compiled stylesheet (e.g. `assets/css/output.css`) via a
correct relative path. Custom styles live in `assets/css/input.css` using Tailwind
layers — not scattered inline styles.

**Rationale**: A self-contained static prototype loads offline in Live Server, has zero
runtime dependencies, and stays portable into any future backend without a framework
migration.

### III. JavaScript for Interaction Only — Never Content

Page content MUST exist in HTML. JavaScript is permitted ONLY for small UI behaviors:
sidebar toggle, dropdown/modal open-close, tabs, mobile menu, selected/active states,
visual file-selection preview, and placeholder chart interactions. Generating page
content, table rows, form fields, or modal bodies with JavaScript is PROHIBITED. No fake
backend logic, no real API/database/auth/upload calls.

**Rationale**: HTML-first content is inspectable, accessible, crawlable, and trivially
portable to server-side rendering later. JS-rendered content would have to be rebuilt the
moment a backend arrives.

### IV. Arabic-First, RTL-Native

Every page MUST declare `<html lang="ar" dir="rtl">`. All UI text MUST be professional
Arabic suited to a financial SaaS. English placeholder text, Lorem ipsum, broken Arabic,
and unnecessary mixed-language labels are PROHIBITED. Demo data MUST be realistic Arabic
content (client names, users, document numbers, amounts). Saudi-first context applies to
tax and currency wording, with Egypt as the next market.

**Rationale**: The product is Arabic-only and RTL by definition of its market; the
language and direction are correctness requirements, not styling preferences.

### V. Two Audiences, Calibrated Detail

The product has two experiences and they MUST stay distinct. The Client Portal is simple
and non-technical: clients upload documents, follow status, read accountant requests, and
view simple summaries. Client pages MUST NOT expose debit/credit, journal entries, chart
of accounts, posting, internal notes, or accounting classification. The Accountant/Admin
Portal MAY use accounting terminology (شجرة الحسابات، القيود، مدين/دائن، ترحيل، ميزان
مراجعة، تقرير الضريبة) but MUST remain clean, organized, and scannable.

**Rationale**: Mixing accountant complexity into client screens breaks the core value
proposition — that non-accountants can use the platform without understanding accounting.

### VI. Complete Pages Only — No Skeletons, No Placeholders

Every page MUST ship complete: correct title, shared header, shared sidebar with correct
active state, page title and subtitle, realistic Arabic data, working internal links,
responsive behavior, and no console errors. Skeleton pages, placeholder-only screens,
empty placeholder table rows, and stopping work mid-page are PROHIBITED. A page is not
"done" until it visually matches the approved five and passes the Quality Gates below.

**Rationale**: A prototype's purpose is to validate the full experience; half-built pages
cannot be reviewed, demoed, or used as the contract for backend work.

### VII. Preserve Existing Work

Changes MUST be non-destructive to completed pages. Removing existing sections, deleting
pages, breaking CSS paths, breaking or removing sidebar links used by other pages,
renaming files without updating every reference, replacing the approved design system, or
converting the project to a framework or JS-rendered content is PROHIBITED. Before editing
any shared file (sidebar, header, `input.css`, `main.js`), assess the impact on every page
that uses it.

**Rationale**: Shared structure means a careless edit can silently break many pages;
protecting completed work keeps the prototype continuously demoable.

## Technology & Project Structure

The expected structure MUST be maintained:

```txt
index.html
pages/                      # one complete .html file per page
assets/css/input.css        # Tailwind layers + reusable component classes
assets/css/output.css       # locally compiled stylesheet linked by every page
assets/js/main.js           # UI-only interactions
assets/fonts/               # local fonts (IBM Plex Sans Arabic / Mono)
assets/images/
tailwind.config.js
package.json
```

`tailwind.config.js` `content` MUST cover `./*.html`, `./pages/**/*.html`, and
`./assets/js/**/*.js`. Each page is a separate HTML file that opens directly in Live
Server; no giant single page, no pages hidden behind JavaScript. File names MUST be
predictable kebab-case matching their page (e.g. `pages/bank-reconciliation.html`).
Semantic HTML is required (`header`, `nav`, `main`, `section`, `table`, `button`, `form`,
`label`); buttons are `<button>`, navigational elements are real `<a>` anchors, and
images/icons carry accessible labels where appropriate. Status badges, button hierarchy
(primary / secondary / warning / danger / ghost), KPI cards, tables, forms, upload areas,
and modals MUST reuse the shared classes defined for the approved pages.

## Product Scope & Frontend Roadmap

This stage is frontend-only; backend work does not begin until the frontend gaps below
are closed as **complete** pages (Principle VI). Each item MUST be implemented to the
same standard as the approved five, fully linked into the existing navigation, and routed
to the correct portal per Principle V. Recommended grouping and order:

1. **Client lifecycle** — Client onboarding; Client tax settings; Client reports.
2. **Tax & compliance (KSA-first)** — VAT reports.
3. **Data import** — Data import workflow; Import mapping; Import history & errors.
4. **Accounting setup** — Opening balances; Fiscal periods; Document categories.
5. **Master data** — Vendors; Commercial customers; Bank accounts.
6. **Banking** — Bank statement import; Bank reconciliation.
7. **Workflow & governance** — Approval workflow; Audit log; Notifications.
8. **Cross-cutting** — Consistent cross-page modals and action/loading/empty/error states.
9. **Release gate** — Final full frontend QA across all pages.

No item on this list may be delivered as a placeholder or skeleton. New pages MUST not
break or remove anything already shipped.

## Quality Gates & Definition of Done

Before any task is considered complete, ALL of the following MUST hold:

- Page opens directly in a browser / Live Server with no console errors.
- `<html lang="ar" dir="rtl">` present; RTL layout correct; all content Arabic; no Lorem
  ipsum and no English placeholder text.
- Local `output.css` linked correctly; no Tailwind CDN, no CDN, no external admin template.
- No JavaScript-generated page content; all content present in HTML.
- All internal links work; no broken CSS paths; sidebar active state correct; header
  consistent with approved pages.
- Responsive on desktop, tablet, and mobile (sidebar collapses/stacks, tables scroll,
  cards stack, forms do not overflow, header actions wrap).
- Client vs accountant detail level correct per Principle V.
- Visually matches the approved five pages; reuses shared components and badge/button
  systems.
- All previously completed pages still work (Principle VII).

If any gate fails, the issue MUST be fixed before stopping. Each completed task closes
with a short summary: files created/updated, page implemented, components reused,
assumptions made, and how to rebuild Tailwind if needed.

## Governance

This constitution supersedes all other practices and casual instructions; it may be
overridden only when the project owner explicitly says so for a specific task.
`CLAUDE_FRONTEND_RULES.md` is the detailed execution companion to this document and MUST
be read and followed before implementing any prompt, page, fix, refactor, or audit; this
constitution and that file MUST be consulted before every task.

**Amendments**: Changes to this constitution MUST be made by editing this file, MUST
state a rationale, and MUST update the version and dates below. Dependent artifacts
(`.specify/templates/*`, `CLAUDE.md`, `CLAUDE_FRONTEND_RULES.md`, `README.md`) MUST be
reviewed for consistency in the same change, and the Sync Impact Report at the top of this
file MUST be refreshed.

**Versioning policy** (semantic):
- **MAJOR** — removing or redefining a principle, or any backward-incompatible governance
  change (e.g. permitting a previously banned technology).
- **MINOR** — adding a new principle or section, or materially expanding guidance.
- **PATCH** — clarifications, wording, and non-semantic refinements.

**Compliance review**: Every change MUST be self-verified against the Quality Gates and
Core Principles before it is presented as done. Any deviation from a principle requires an
explicit, written justification approved by the project owner; unjustified deviations are
defects and MUST be fixed, not documented around.

**Version**: 1.0.0 | **Ratified**: 2026-06-07 | **Last Amended**: 2026-06-07
