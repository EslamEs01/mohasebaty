# Feature Specification: Foundation / Navigation / Audit

**Feature Branch**: `001-foundation-navigation-audit`
**Created**: 2026-06-07
**Status**: Draft
**Input**: User description: "Spec 001 — Foundation / Navigation / Audit. Audit the existing Mohasebaty frontend project and prepare it for the final pre-backend frontend expansion phase. Confirm the 15 existing pages work, prepare sidebar/navigation links for 22 upcoming pre-backend modules grouped into 7 new navigation groups, update index.html to show the complete product scope, and add reusable CSS utilities only if needed — without breaking existing pages, redesigning, using CDNs/frameworks, or creating empty pages."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Audit confirms all current pages still work (Priority: P1)

As the platform owner, before expanding the product I need confidence that the 15 already-approved
pages still open correctly, render in Arabic RTL, load their styles and scripts, and have no broken
links among themselves — so that any later navigation changes start from a known-good baseline.

**Why this priority**: The whole expansion phase rests on the existing pages being intact. If the
baseline is broken, every later change inherits the breakage. This story delivers value on its own as
a verified, documented health check even if nothing else is done.

**Independent Test**: Open each of the 16 entry points (`index.html` + 15 pages) in a browser /
Live Server and confirm each loads with correct RTL layout, Arabic content, working stylesheet and
script, a consistent sidebar/header, the correct active navigation state, and no console errors and no
broken internal links.

**Acceptance Scenarios**:

1. **Given** the project as it exists today, **When** `index.html` is opened, **Then** it loads with
   `lang="ar" dir="rtl"`, the compiled stylesheet applied, no console errors, and every screen card
   links to an existing page.
2. **Given** any of the 15 pages under `pages/`, **When** it is opened directly, **Then** its
   stylesheet (`../assets/css/output.css`) and script (`../assets/js/main.js`) resolve, the sidebar and
   header render consistently, and the link for the current page shows the active state.
3. **Given** the audit is complete, **When** results are recorded, **Then** every page is marked
   pass/fail with any defect noted, and no page is left unverified.

---

### User Story 2 - Navigation is prepared for the 22 upcoming modules (Priority: P1)

As an accountant/admin user, I need the internal sidebar to already show where the upcoming
pre-backend modules will live — organized into the seven new groups — so the product's full scope is
visible and discoverable, without any link leading to a missing or empty page.

**Why this priority**: Navigation is the backbone that every upcoming page (in later specs) will plug
into. Preparing it once, consistently, unblocks all subsequent module work and communicates the full
roadmap to stakeholders now.

**Independent Test**: Open any internal (accountant/admin) page and confirm the sidebar contains the
existing groups plus the seven new groups with all 22 upcoming items listed; confirm each upcoming
item is clearly marked as not-yet-available and does not navigate to a missing page; confirm the
existing links and active states still work unchanged.

**Acceptance Scenarios**:

1. **Given** any internal page, **When** the sidebar renders, **Then** the three existing groups
   (لوحات العميل، ساحة المحاسب، إدارة) are unchanged and the seven new groups
   (الإعداد والتهيئة، الضرائب، استيراد البيانات، العمليات المحاسبية، البنوك، المراجعة والاعتماد، النظام)
   appear with their upcoming items.
2. **Given** an upcoming module that has no page yet, **When** the user sees its sidebar item, **Then**
   it is visibly marked as "قريباً" (coming soon) and clicking it does not load a missing or empty page
   and produces no error.
3. **Given** the sidebar is updated, **When** any existing page is opened, **Then** its existing links
   still work and the active state of the current page is still correct.
4. **Given** the sidebar exists on all 15 pages, **When** the new groups are added, **Then** the
   sidebar markup is identical across every page that shows it (same groups, order, labels, and
   coming-soon treatment).

---

### User Story 3 - index.html communicates the complete product scope (Priority: P2)

As a stakeholder reviewing the prototype, I want the landing page to present both the live screens and
the upcoming modules so I can understand the full product scope at a glance.

**Why this priority**: The landing page is the showcase of the prototype. Reflecting the roadmap there
raises confidence and aligns reviewers, but the product still functions without it, so it ranks below
the baseline audit and the navigation backbone.

**Independent Test**: Open `index.html` and confirm it shows the existing screen sections plus a clearly
separated representation of the upcoming modules grouped consistently with the sidebar, where upcoming
items are marked "قريباً" and do not link to missing pages.

**Acceptance Scenarios**:

1. **Given** `index.html`, **When** it is opened, **Then** the existing screen groupings remain and a
   representation of the upcoming modules is added, grouped to match the seven new sidebar groups.
2. **Given** an upcoming module shown on the landing page, **When** the user views it, **Then** it is
   marked "قريباً" and is not a working link to a missing page.
3. **Given** the landing page footer/summary references a screen count, **When** scope changes, **Then**
   the displayed scope reflects both current and upcoming modules accurately.

---

### Edge Cases

- **Link to a not-yet-built page**: Upcoming items MUST NOT 404 or open a blank/empty page; they are
  rendered as non-navigating "قريباً" items until their page is delivered in a later spec.
- **Shared markup drift**: Because the sidebar is duplicated in all 15 pages, an update applied to some
  pages but not others would create inconsistency; the change MUST be applied identically to every page.
- **Active-state collision**: Adding new links MUST NOT remove or duplicate the existing single active
  state on any page.
- **Long sidebar / small screens**: The expanded sidebar (now 3 + 7 groups) MUST remain usable on
  mobile via the existing mobile toggle and scroll, without overflowing or hiding content.
- **Client portal protection**: The client-portal group MUST remain simple; none of the upcoming
  internal modules may be added to the client-facing navigation.

## Requirements *(mandatory)*

### Functional Requirements

**Audit & baseline**

- **FR-001**: The audit MUST verify all 16 entry points (`index.html` plus the 15 pages under `pages/`)
  open correctly with `lang="ar" dir="rtl"`, the compiled stylesheet applied, and no console errors.
- **FR-002**: The audit MUST confirm every page references the local compiled stylesheet and the local
  script via correct relative paths and uses no CDN, no framework, and no external admin template.
- **FR-003**: The audit MUST confirm all internal links among the existing 16 entry points resolve to
  existing files with no broken links.
- **FR-004**: The audit MUST record a pass/fail result and any defects for each of the 16 entry points,
  leaving none unverified.

**Navigation preparation**

- **FR-005**: The internal (accountant/admin) sidebar MUST retain its three existing groups
  (لوحات العميل، ساحة المحاسب، إدارة) and their existing links and ordering unchanged.
- **FR-006**: The sidebar MUST add exactly seven new groups, labelled in Arabic: الإعداد والتهيئة،
  الضرائب، استيراد البيانات، العمليات المحاسبية، البنوك، المراجعة والاعتماد، النظام.
- **FR-007**: The seven new groups MUST contain links/placeholders for all 22 upcoming modules, mapped
  as follows (see Assumptions for rationale):
  - الإعداد والتهيئة: client-onboarding, opening-balances, fiscal-periods, document-categories
  - الضرائب: client-tax-settings, vat-report, tax-documents
  - استيراد البيانات: data-import, import-mapping, import-preview, import-history, import-errors,
    import-templates
  - العمليات المحاسبية: vendors, commercial-customers, client-reports
  - البنوك: bank-accounts, bank-statement-import, bank-reconciliation
  - المراجعة والاعتماد: approval-workflow, audit-log
  - النظام: notifications
- **FR-008**: Each upcoming module item MUST be visibly marked as "قريباً" (coming soon) and MUST NOT
  navigate to a missing or empty page (no 404, no blank page, no console error).
- **FR-009**: The navigation update MUST be applied identically across every page that displays the
  sidebar, so the sidebar is consistent (same groups, order, labels, icons, and coming-soon treatment)
  on all of them.
- **FR-010**: The update MUST preserve the existing single active-state convention on every page (the
  current page's existing link stays marked active; no new item is marked active).
- **FR-011**: Upcoming internal modules MUST NOT be added to the client-portal navigation; the client
  experience MUST remain simple and non-technical.

**Landing page scope**

- **FR-012**: `index.html` MUST continue to present the existing screen groupings unchanged in substance
  and add a representation of the 22 upcoming modules grouped to match the seven new sidebar groups.
- **FR-013**: Upcoming modules shown on `index.html` MUST be marked "قريباً" and MUST NOT be working
  links to missing pages.
- **FR-014**: Any scope/count text on `index.html` (e.g., the footer screen count) MUST accurately
  reflect the combined current and upcoming scope.

**Constraints & integrity**

- **FR-015**: No new HTML pages (empty, skeleton, or placeholder) may be created by this feature; the 22
  upcoming pages are represented only as navigation/landing entries.
- **FR-016**: The approved visual design system MUST NOT be redesigned; any reusable CSS utility MAY be
  added only if an existing class cannot express the coming-soon/disabled state, and it MUST live in the
  Tailwind input layer and reuse the existing visual language.
- **FR-017**: All added text MUST be professional Arabic with no English placeholder text and no Lorem
  ipsum; new sidebar/landing entries MUST follow the existing Arabic naming style.
- **FR-018**: The change MUST NOT remove any existing section, page, link, CSS path, or script path, and
  MUST NOT break the existing mobile sidebar toggle or any existing interaction.

### Key Entities *(include if feature involves data)*

- **Navigation Group**: A labelled section of the sidebar (Arabic label) containing an ordered list of
  navigation items. Existing: 3 groups; added: 7 groups.
- **Navigation Item**: A single sidebar/landing entry with an Arabic label, an icon, a target page, and
  a state of either "available" (links to an existing page, may be active) or "coming soon / قريباً"
  (non-navigating, reserved for an upcoming page).
- **Page (entry point)**: An existing HTML file (16 total) that must remain working; or an upcoming page
  (22 total) that is referenced by name only and not created in this feature.
- **Audit Result**: Per entry point, a pass/fail status plus any noted defect, covering RTL/Arabic,
  asset paths, no-CDN/no-framework, internal links, active state, and console errors.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of the 16 existing entry points open correctly with correct Arabic RTL rendering and
  zero console errors.
- **SC-002**: 0 broken internal links exist among the existing entry points after the change.
- **SC-003**: The internal sidebar shows 10 groups total (3 existing + 7 new) containing all 22 upcoming
  modules, identical across 100% of the pages that display the sidebar.
- **SC-004**: 100% of the 22 upcoming navigation items are marked "قريباً" and 0 of them navigate to a
  missing or empty page.
- **SC-005**: 0 new HTML pages are created by this feature.
- **SC-006**: `index.html` represents 37 modules total (15 current + 22 upcoming) with upcoming ones
  clearly distinguished, and its displayed scope count matches.
- **SC-007**: A reviewer can locate any of the 22 upcoming modules in the navigation in under 10 seconds.
- **SC-008**: 100% of the existing pages retain their correct single active navigation state after the
  change.

## Assumptions

- **Coming-soon treatment**: Because project rules forbid creating empty/skeleton pages and forbid
  broken links, upcoming modules are represented as non-navigating items visibly marked "قريباً"
  (coming soon) until their pages are built in later specs. This is the chosen default; it satisfies
  "navigation ready" without 404s.
- **Portal placement**: All 22 upcoming modules are internal (accountant/admin) and are added only to
  the internal sidebar. The client-portal group is left unchanged to keep the client experience simple
  (per the project's two-audience rule). `client-onboarding`, `client-tax-settings`, and
  `client-reports` are accountant-side management of client data, not client-portal screens.
- **Group-to-module mapping**: The mapping in FR-007 is a reasonable default derived from the module
  names and the seven provided group labels; it can be refined during `/speckit-clarify` or
  `/speckit-plan` without changing the spec's intent.
- **Shared-markup reality**: The sidebar and header are currently duplicated in each of the 15 pages
  (no server-side or JS includes, consistent with the "no JS-rendered content" rule). The navigation
  update is therefore applied to each page's copy identically rather than via a single shared include.
- **Existing interactions are compliant**: `assets/js/main.js` handles only UI behaviors (mobile sidebar
  toggle, dropdowns, dropzone, single-select, modals/overlays, bulk selection) and generates no page
  content; this feature does not change that.
- **Reusable utility, only if needed**: A small "coming soon / disabled link" style may be required; if
  so it is added to the Tailwind input layer reusing existing tokens, not as a redesign.
- **Active-state convention**: The current page is marked with `class="sidebar-link active"` and
  `aria-current="page"`; this convention is preserved and not applied to coming-soon items.
