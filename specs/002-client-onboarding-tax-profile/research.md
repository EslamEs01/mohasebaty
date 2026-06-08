# Phase 0 Research: Client Onboarding & Tax Profile

All decisions resolve the spec's design choices. No `NEEDS CLARIFICATION` items remain.

## R1. Onboarding wizard interaction model

- **Decision**: Author all 8 step panels in the HTML as numbered `.section` blocks inside one `.card`,
  preceded by the approved `.stepper` indicator (reuse `upload-document.html`'s `.stepper`/`.step`/`.n`/
  `.lbl`/`.stepper-flex`/`.ln`). Add a small **progressive-enhancement** helper `initWizard()` to
  `main.js`: on boot it shows only the active step, wires Prev/Next buttons and clickable stepper items,
  and updates the active indicator. Panels are **visible by default in the HTML**; JS adds the hidden
  state — so with JS unavailable the page is a fully readable stacked form.
- **Rationale**: Matches the approved upload pattern (no redesign), keeps 100% of content in HTML
  (Principle III), gives the "wizard" step-navigation the spec asks for, and degrades gracefully (edge
  case: JS unavailable). The helper is gated on `[data-wizard]` so it is inert on every other page.
- **Alternatives considered**:
  - *Pure stacked sections, static stepper (no JS)* — simplest and matches upload-document exactly, but
    does not deliver the "move between steps / active step shown" behavior in the spec.
  - *JS-hidden panels by default (`hidden` in HTML)* — rejected: no-JS would hide all content, violating
    "main content must be present" and the graceful-degradation edge case.
  - *Separate HTML page per step* — rejected: 8 files for one wizard, breaks the single-page onboarding UX
    and the "complete page" intent.

## R2. Country preset (Saudi vs Egypt) switching

- **Decision**: Author **both** preset blocks in HTML — a Saudi block (VAT 15% / SAR / ZATCA Ready /
  QR-e-invoice) and an Egypt block (VAT 14% / EGP / ETA Ready / UUID-e-signature). Add `initCountryPreset()`
  to `main.js` that, on change of a `[data-country-select]` control, shows the matching `[data-country-block]`
  and hides the other (a show/hide toggle, not value generation). Default visible = Saudi (launch-first
  market). Without JS, both blocks remain visible (still complete and readable).
- **Rationale**: Keeps the values as authored HTML (Principle III — JS never writes content, only toggles
  visibility), guarantees internal consistency (FR-028) because each country's numbers live together in
  one block, and degrades gracefully. Gated on `[data-country-select]` → inert elsewhere.
- **Alternatives considered**:
  - *JS rewrites the VAT%/currency text on toggle* — rejected: that is JS generating/altering content,
    against Principle III, and risks inconsistent combinations.
  - *Two separate readiness pages* — rejected: unnecessary and breaks the single-settings-page model.

## R3. Component reuse map

| Spec section | Reused approved component(s) | Source page |
|--------------|------------------------------|-------------|
| Page shell (sidebar + header + crumb + back btn) | `.sidebar`, `.main-area`, `.header`, `.mobile-nav-toggle`, `.page-title-wrap`, `.crumb`, `.back-btn`, `.header-right` | all pages |
| Wizard step indicator | `.stepper`, `.step`(.done/.active), `.n`, `.lbl`, `.stepper-flex`, `.ln` | upload-document.html |
| Numbered step bodies | `.section`, `.section-head`, `.stamp`, `.hint` | upload-document.html |
| Text/number/date inputs | `.fields-grid`, `.field`, `label`, `.input`(.mono), `.input-wrap`(.has-suffix/.has-prefix), `.suffix`, `.req`, `.opt` | upload-document/settings |
| Single-select choices (status, COA option, country, period, approval) | `.seg`, `.toggle-radio`, or `.type-grid`/`.type-card` | upload-document.html |
| Boolean settings (tax flags, client-display) | `.set-row`, `.info`, `.ctrl`, `.switch`>`.track` (CSS-only) | settings.html |
| Dropdowns (currency, language, timezone, client selector, linked accounts) | `.select-wrap`, `.select`, `.chev` | settings.html |
| File uploads (initial files) | `.dropzone`(`data-zone-id`), `.file-card`(`data-file-card-for`), `.formats`, `.fmt` | upload-document.html |
| Settings layout (tax page) | `.settings-layout`, `.set-nav`(`.si`), `.set-main`, `.card`, `.card-head`, `.ch-ico`, `.set-body` | settings.html |
| Country readiness / status pills | `.chip`(.primary/.gold/.green/.amber/.slate) | global |
| Warning note | `.tip` callout (or `.card` + `.chip.amber`) | upload-document.html |
| Header actions / save / draft | `.btn`(.btn-primary/.btn-outline/.btn-sm), `.back-btn` | global |

- **Rationale**: Every required field/section maps to an existing component, so no new visual language is
  introduced (Principle I).

## R4. Navigation wiring (coming-soon → live)

- **Decision**: Convert exactly two sidebar items on every page that shows the sidebar (15 existing + the
  2 new = 17 pages):
  - `تهيئة عميل جديد` → `<a class="sidebar-link" href="client-onboarding.html">…</a>` (drop `is-soon` and
    the `.sl-soon` pill).
  - `إعدادات ضريبة العميل` → `<a class="sidebar-link" href="client-tax-settings.html">…</a>`.
  On `client-onboarding.html` the first gets `active` + `aria-current="page"`; on
  `client-tax-settings.html` the second does. On `index.html`, the two matching `.landing-card.is-soon`
  `<div>`s become `<a class="landing-card" href="…">` with the قريباً chip removed; footer count →
  "17 شاشة مكتملة + 20 وحدة قادمة". Section count chips on the landing upcoming-groups are decremented
  accordingly (الإعداد والتهيئة and الضرائب each lose one).
- **Rationale**: Fulfils FR-021/FR-022/SC-006 while leaving all other coming-soon items and every active
  state intact (FR-023/SC-007).
- **Alternatives considered**: Leaving sidebar items coming-soon and only linking from cards — rejected:
  spec requires sidebar links and "no longer قريباً".

## R5. Tax-page client selector behaviour

- **Decision**: The client selector is an approved `.select` populated with realistic sample clients
  (e.g., شركة النور للتجارة، مؤسسة السلام للمقاولات، شركة البيان للخدمات), defaulting to one selected
  client whose realistic data fills the page. In this frontend phase switching does not reload data
  (no backend); the page is never empty.
- **Rationale**: Matches "static realistic Arabic data" and "no backend"; avoids JS content generation.
- **Alternatives considered**: JS swapping between multiple preset client datasets — possible but adds
  complexity and content-toggling for little prototype value; deferred.

## R6. CSS additions

- **Decision**: Prefer zero new CSS — reuse existing classes. Add to `assets/css/input.css` (@layer
  components) ONLY if a needed state cannot be expressed: candidate is a `.wizard-step[hidden]` is handled
  by the native `hidden` attribute (no CSS needed), and a `.wizard-nav` row can use existing `.btn`
  utilities. If any helper is added, reuse existing theme tokens and rebuild `output.css`. The country
  blocks use the native `hidden` attribute toggled by JS — no CSS required.
- **Rationale**: Honors "add reusable CSS only if needed" and Principle I.
- **Alternatives considered**: New bespoke wizard CSS — rejected unless a gap appears during build.

## R7. JS helpers — placement and safety

- **Decision**: Add `initWizard()` and `initCountryPreset()` to the existing IIFE in `assets/js/main.js`
  and call them from `boot()`. Both query for page-specific hooks (`[data-wizard]`,
  `[data-country-select]`) and return immediately if absent, so they are no-ops on all 15 existing pages.
- **Rationale**: Keeps one JS file (no new asset), matches the existing module style, and cannot affect
  other pages (Principle VII). Both only toggle visibility/classes — never inject content (Principle III).
- **Alternatives considered**: A separate JS file per page — rejected: extra assets, inconsistent with the
  single `main.js` convention.
