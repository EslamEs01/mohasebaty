# Feature Specification: Client Onboarding & Tax Profile

**Feature Branch**: `002-client-onboarding-tax-profile`
**Created**: 2026-06-08
**Status**: Draft
**Input**: User description: "Spec 002 — Client Onboarding & Tax Profile. Create two internal frontend pages — an 8-step Client Onboarding Wizard (`pages/client-onboarding.html`, إعداد عميل جديد) and a per-client Tax Settings page (`pages/client-tax-settings.html`, إعدادات الضريبة للعميل) — using the approved Mohasebaty design system, with Saudi (VAT 15% / SAR / ZATCA) and Egypt (VAT 14% / EGP / ETA) presets, realistic static Arabic data, JS for wizard/tabs UI only, and links added from clients.html, settings.html, index.html, and the sidebar."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Onboard a new client through the setup wizard (Priority: P1)

As an accounting-firm staff member, I need a guided multi-step wizard to create and prepare a new client
company — capturing its company data, contact person, country/currency, tax setup, assigned accountant,
chart-of-accounts choice, and initial files — so the client is fully ready before any bookkeeping work
begins, and I can save partial progress as a draft.

**Why this priority**: Onboarding is the entry point of the whole platform's workflow — no client data
exists until this is done. It is the first pre-backend gap on the roadmap and unblocks every downstream
client-specific feature.

**Independent Test**: Open `pages/client-onboarding.html` and confirm all 8 named steps are present and
navigable, each step shows its specified Arabic fields with realistic sample data, the country choice
(السعودية/مصر) updates the tax preview accordingly, the chart-of-accounts options and initial-file
upload areas render, the final review summarizes the chosen setup, and the header offers حفظ كمسودة /
إنشاء العميل / رجوع إلى العملاء — all with no console errors and no broken links.

**Acceptance Scenarios**:

1. **Given** the onboarding page, **When** it loads, **Then** a step indicator shows the 8 steps
   (بيانات الشركة، بيانات التواصل، الدولة والعملة، إعدادات الضريبة، المحاسب المسؤول، شجرة الحسابات،
   الملفات الأولية، مراجعة نهائية) and the header shows the title إعداد عميل جديد, the subtitle, and the
   three actions.
2. **Given** the wizard, **When** the user moves between steps, **Then** the active step's content is
   shown and the step indicator reflects the current position, with all step content already present in
   the page (not generated on the fly).
3. **Given** the الدولة والعملة / إعدادات الضريبة steps, **When** السعودية is selected, **Then** the tax
   preview shows VAT 15%, currency SAR, and ZATCA readiness; **When** مصر is selected, **Then** it shows
   VAT 14%, currency EGP, and ETA readiness.
4. **Given** the شجرة الحسابات step, **When** it is shown, **Then** the four setup options are presented
   (استخدام شجرة افتراضية، نسخ من عميل مشابه، رفع شجرة حسابات، إعداد لاحقًا) as a single-select choice.
5. **Given** the الملفات الأولية step, **When** it is shown, **Then** upload areas for the six initial
   document types plus a notes field are present, reusing the approved upload component.
6. **Given** the مراجعة نهائية step, **When** it is shown, **Then** it summarizes the selected setup
   choices (company, contact, country/currency, tax, accountant, COA choice, files) clearly.

---

### User Story 2 - Configure a client's tax profile (Priority: P1)

As an accounting-firm staff member, I need a per-client tax settings page to set the client's country,
tax registration, VAT rate and behavior, linked accounts, declaration period, country-specific
e-invoicing readiness, and what tax detail the client is allowed to see — because each client may be in
Saudi Arabia or Egypt with different tax rules — so future tax reports and journal entries are correct.

**Why this priority**: Tax configuration is mandatory before any VAT report or tax-affecting journal
entry can be produced; it is the second pre-backend gap and pairs directly with onboarding.

**Independent Test**: Open `pages/client-tax-settings.html`, pick a client from the selector, and confirm
the tax identity card, VAT configuration, tax period options, country readiness card, client-display
toggles, and the warning note all render with realistic Arabic data, the country choice drives the
Saudi/Egypt readiness preset, and a Save action is present — with no console errors and no broken links.

**Acceptance Scenarios**:

1. **Given** the tax settings page, **When** it loads, **Then** the header shows إعدادات الضريبة للعميل,
   the subtitle, a client selector, and a Save action.
2. **Given** the tax identity card, **When** shown, **Then** it presents العميل، الدولة، الرقم الضريبي،
   هل العميل مسجل ضريبيًا؟، تاريخ التسجيل الضريبي، and نوع النشاط الضريبي.
3. **Given** the VAT configuration section, **When** shown, **Then** it presents the default rate,
   price-inclusive toggle, auto-calc toggle, output/input tax, payable-tax account, and the linked
   chart-of-accounts accounts.
4. **Given** the tax period section, **When** shown, **Then** it offers شهري / ربع سنوي / سنوي and the
   current period start/end dates.
5. **Given** the country readiness card, **When** السعودية is selected, **Then** it shows VAT 15% + ZATCA
   e-invoicing ready + QR/e-invoice fields planned; **When** مصر is selected, **Then** it shows VAT 14% +
   ETA e-invoice ready + UUID/e-signature fields planned.
6. **Given** the client-display section, **When** shown, **Then** it offers toggles for إظهار الضريبة
   التقديرية للعميل، إظهار التقارير المعتمدة فقط، and إخفاء التفاصيل الداخلية, and a visible warning note
   states الإعدادات تؤثر على تقارير الضريبة والقيود المحاسبية المستقبلية.

---

### User Story 3 - Reach the new pages from existing entry points (Priority: P2)

As a user navigating the platform, I need the two new pages to be reachable from the clients list,
settings, the landing page, and the sidebar, and to no longer appear as "coming soon" — so the new
capabilities are discoverable and integrated with the rest of the product.

**Why this priority**: Without wiring, the pages exist but are unreachable in normal navigation. It
depends on the pages existing (US1/US2) but is a distinct, separately verifiable increment.

**Independent Test**: From `clients.html`, `settings.html`, `index.html`, and the sidebar on any page,
confirm there is a working link to each new page; confirm the two modules are now live links (not
"قريباً") in the sidebar and on the landing page; confirm each new page shows the shared sidebar/header
with its own correct active state.

**Acceptance Scenarios**:

1. **Given** `clients.html`, **When** viewed, **Then** it offers a working link/action to open
   `client-onboarding.html` (in addition to its existing add-client modal, which is not removed).
2. **Given** `settings.html`, **When** viewed, **Then** it offers a working link to
   `client-tax-settings.html` from a sensible location (e.g., the tax area), without removing existing
   settings sections.
3. **Given** the sidebar on any page, **When** viewed, **Then** the items تهيئة عميل جديد and إعدادات
   ضريبة العميل are live links to the two new pages and no longer carry the "قريباً" coming-soon state.
4. **Given** `index.html`, **When** viewed, **Then** the two corresponding cards link to the new pages
   and no longer show the coming-soon treatment.
5. **Given** either new page, **When** opened, **Then** it shows the shared sidebar and header consistent
   with the approved pages, with exactly one active sidebar item corresponding to that page.

---

### Edge Cases

- **No client selected (tax settings)**: The page must present a sensible default state (a pre-selected
  sample client) so the page is never empty; switching the selector reflects a different client's data.
- **Country switch consistency**: Selecting السعودية vs مصر must keep currency, VAT %, and e-invoicing
  readiness mutually consistent on both pages (no mixed SAR + 14%, etc.).
- **JavaScript unavailable**: Because all content lives in HTML, the pages remain readable with all steps
  /sections present even if step-switching interactivity is unavailable; nothing critical is hidden behind
  required scripts.
- **Draft vs create**: حفظ كمسودة and إنشاء العميل are visually distinct actions; in this frontend phase
  neither persists data (no backend), and this must not produce errors.
- **Long wizard on small screens**: The 8-step indicator and step forms must remain usable on mobile
  (wrap/scroll), consistent with existing responsive behavior.
- **Coming-soon regression**: After wiring, no other coming-soon item may be accidentally activated, and
  every other page must still have exactly one active sidebar item.

## Requirements *(mandatory)*

### Functional Requirements

**Onboarding wizard — `pages/client-onboarding.html`**

- **FR-001**: The page MUST present a header with title إعداد عميل جديد, the subtitle "جهّز بيانات العميل،
  الضريبة، شجرة الحسابات، والملفات الأولية قبل بدء العمل", and three actions: حفظ كمسودة، إنشاء العميل،
  and رجوع إلى العملاء (the last linking to `clients.html`).
- **FR-002**: The page MUST present a step indicator with the 8 steps in order: بيانات الشركة، بيانات
  التواصل، الدولة والعملة، إعدادات الضريبة، المحاسب المسؤول، شجرة الحسابات، الملفات الأولية، مراجعة نهائية.
- **FR-003**: All 8 steps' content MUST exist in the HTML; navigation between steps MAY use JavaScript to
  show/hide the active step but MUST NOT generate step content via JavaScript.
- **FR-004**: The بيانات الشركة step MUST include fields: اسم الشركة، نوع النشاط، الدولة، المدينة،
  العنوان، السجل التجاري، الرقم الضريبي، تاريخ بداية التعاقد، حالة العميل.
- **FR-005**: The بيانات التواصل step MUST include: اسم المسؤول، المنصب، رقم الهاتف، البريد الإلكتروني،
  صلاحيات المستخدم الأول.
- **FR-006**: The الدولة والعملة step MUST include الدولة (السعودية / مصر), العملة (ريال سعودي / جنيه
  مصري), لغة الفواتير, and المنطقة الزمنية.
- **FR-007**: The إعدادات الضريبة step MUST show a country-driven tax preview: السعودية → VAT 15% + SAR +
  ZATCA Ready; مصر → VAT 14% + EGP + ETA Ready.
- **FR-008**: The المحاسب المسؤول step MUST include المحاسب المسؤول, مدير المراجعة, and a "هل يحتاج اعتماد
  قبل الترحيل؟" choice.
- **FR-009**: The شجرة الحسابات step MUST offer four mutually-exclusive options: استخدام شجرة افتراضية،
  نسخ من عميل مشابه، رفع شجرة حسابات، إعداد لاحقًا.
- **FR-010**: The الملفات الأولية step MUST provide upload areas for شجرة حسابات، أرصدة افتتاحية، مبيعات
  سابقة، مصروفات سابقة، كشف حساب بنكي, plus a ملاحظات field, reusing the approved upload component.
- **FR-011**: The مراجعة نهائية step MUST summarize the selected setup choices across all prior steps in a
  clear review card.

**Tax settings — `pages/client-tax-settings.html`**

- **FR-012**: The page MUST present a header with title إعدادات الضريبة للعميل, the subtitle "إعداد
  الدولة، الرقم الضريبي، نسبة الضريبة، وفترة الإقرار لكل عميل", a client selector, and a Save action.
- **FR-013**: A tax identity card MUST present العميل، الدولة، الرقم الضريبي، هل العميل مسجل ضريبيًا؟،
  تاريخ التسجيل الضريبي، نوع النشاط الضريبي.
- **FR-014**: A VAT configuration section MUST present نسبة الضريبة الافتراضية، هل الأسعار تشمل الضريبة؟،
  هل يتم حساب الضريبة تلقائيًا؟، ضريبة المخرجات، ضريبة المدخلات، حساب الضريبة المستحقة، and الحسابات
  المرتبطة من شجرة الحسابات.
- **FR-015**: A tax period section MUST offer شهري / ربع سنوي / سنوي plus تاريخ بداية الفترة الحالية and
  تاريخ نهاية الفترة الحالية.
- **FR-016**: A country readiness card MUST show، per country: السعودية → VAT 15% + ZATCA e-invoicing
  ready + QR/e-invoice fields planned; مصر → VAT 14% + ETA e-invoice ready + UUID/e-signature fields
  planned.
- **FR-017**: A client-display section MUST offer toggles إظهار الضريبة التقديرية للعميل، إظهار التقارير
  المعتمدة فقط، إخفاء التفاصيل الداخلية.
- **FR-018**: A visible warning note MUST state "الإعدادات تؤثر على تقارير الضريبة والقيود المحاسبية
  المستقبلية."

**Navigation & integration**

- **FR-019**: `clients.html` MUST provide a working link/action to `client-onboarding.html` without
  removing its existing "إضافة عميل جديد" modal or any existing section.
- **FR-020**: `settings.html` MUST provide a working link to `client-tax-settings.html` from a sensible
  location without removing existing settings sections.
- **FR-021**: In the shared sidebar across all pages, the items تهيئة عميل جديد and إعدادات ضريبة العميل
  MUST become live links to the two new pages and MUST no longer carry the "قريباً" coming-soon state.
- **FR-022**: On `index.html`, the cards for تهيئة عميل جديد and إعدادات ضريبة العميل MUST become working
  links to the new pages and MUST no longer show the coming-soon treatment; the landing scope count MUST
  be updated to reflect 2 modules moving from upcoming to live (17 live + 20 upcoming).
- **FR-023**: Each new page MUST include the shared sidebar and header consistent with the approved
  pages, with exactly one active sidebar item corresponding to that page, and every other page MUST still
  have exactly one active item.

**Cross-cutting constraints**

- **FR-024**: Both pages MUST declare `lang="ar" dir="rtl"`, contain professional Arabic content only (no
  English placeholder text, no Lorem ipsum), and link the local compiled stylesheet and script via the
  correct relative paths.
- **FR-025**: Both pages MUST reuse the approved design system components (header, sidebar, cards, forms,
  inputs, segmented/toggle controls, upload areas, modals, badges, buttons) without introducing a new UI
  style, and MUST use only realistic static Arabic sample data (no backend, API, or real upload).
- **FR-026**: JavaScript MAY be used only for UI behavior (step navigation, tabs, toggles, country preset
  switching, upload visual state); it MUST NOT generate main page content.
- **FR-027**: Both pages MUST be complete (no skeleton/placeholder sections) and responsive on desktop,
  tablet, and mobile, with no console errors and no broken internal links.
- **FR-028**: The country presets MUST be internally consistent everywhere they appear: السعودية ⇒ VAT
  15% + SAR + ZATCA; مصر ⇒ VAT 14% + EGP + ETA.

### Key Entities *(include if feature involves data)*

- **New Client (onboarding draft)**: The company being set up — company data, contact person,
  country/currency, tax setup, assigned staff, COA choice, initial files, and status (draft / created).
- **Tax Profile**: Per-client tax configuration — country, tax registration status/number/date, activity
  type, VAT rate and behavior flags, linked accounts, declaration period and dates, client-display
  preferences.
- **Country Preset**: The mutually-consistent bundle for a country — السعودية (VAT 15%, SAR, ZATCA,
  QR/e-invoice) and مصر (VAT 14%, EGP, ETA, UUID/e-signature).
- **Assigned Staff**: المحاسب المسؤول and مدير المراجعة, plus the pre-posting approval requirement.
- **Initial File**: One of the six onboarding document types (COA, opening balances, prior sales, prior
  expenses, bank statement) plus free-text notes.
- **Chart-of-Accounts Setup Choice**: One of استخدام شجرة افتراضية / نسخ من عميل مشابه / رفع شجرة حسابات /
  إعداد لاحقًا.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: `pages/client-onboarding.html` presents all 8 named steps, each containing its specified
  fields, reachable via the step indicator.
- **SC-002**: On both pages, switching the country between السعودية and مصر updates VAT %, currency, and
  e-invoicing readiness to the correct preset 100% of the time, with no mixed/inconsistent combinations.
- **SC-003**: `pages/client-tax-settings.html` presents all 7 required sections (identity, VAT config,
  period, readiness, client display, warning, plus client selector + save).
- **SC-004**: Both new pages open with correct Arabic RTL rendering, working local CSS/JS, and zero
  console errors.
- **SC-005**: All four entry points (clients.html, settings.html, index.html, sidebar) provide working
  links to the new pages; 0 broken internal links across the project.
- **SC-006**: The two modules show as live (not "قريباً") in the sidebar on 100% of pages and on
  index.html; the landing scope count reflects 17 live + 20 upcoming.
- **SC-007**: Every page in the project still has exactly one active sidebar item after wiring (no
  regressions).
- **SC-008**: A staff user can locate and open the onboarding wizard and the tax settings page from the
  clients list in under 15 seconds each.
- **SC-009**: 0 existing sections, pages, links, or asset paths are removed or broken by this feature.

## Assumptions

- **Internal pages**: Both pages are accountant/admin (internal) screens and appear in the internal
  sidebar groups (الإعداد والتهيئة for onboarding, الضرائب for tax settings), matching the Spec 001
  grouping; they are not client-portal screens.
- **Coming-soon → live**: Spec 001 created تهيئة عميل جديد and إعدادات ضريبة العميل as non-navigating
  "قريباً" items in the sidebar and as `is-soon` cards on index.html; this feature converts exactly those
  two into live links and updates the landing count accordingly (15→17 live, 22→20 upcoming).
- **Wizard model**: All 8 step panels exist in the HTML; a step indicator plus JS show/hide provides
  navigation. With JS unavailable the content remains present and readable.
- **Client selector**: The tax page's client selector is a static control populated with realistic sample
  clients (e.g., شركة النور للتجارة), defaulting to one selected client so the page is never empty.
- **No persistence**: حفظ كمسودة / إنشاء العميل / Save are visual actions only in this frontend phase; no
  backend, database, or real file upload is involved.
- **clients.html link**: The existing add-client modal is kept; a clear action (e.g., a primary button
  "إعداد عميل جديد") links to the full wizard, since the wizard is the richer onboarding path.
- **settings.html link**: The link to client-tax-settings is added in/near the existing tax area or the
  settings nav, preserving all existing settings sections.
- **Reused components**: Upload areas reuse the `.dropzone`/file-card pattern; single-select choices reuse
  the existing segmented/type-card/toggle controls; the client selector reuses an existing filter/select
  pattern — all already supported by the current UI behavior script.
- **Markets**: Only السعودية and مصر are in scope for presets, matching the product's launch markets.
