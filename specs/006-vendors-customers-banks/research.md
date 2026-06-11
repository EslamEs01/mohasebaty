# Research: Master Data — Vendors / Commercial Customers / Bank Accounts (Spec 006)

All research is resolved from reading the existing codebase. No NEEDS CLARIFICATION items remain. Every decision names a component confirmed present in `assets/css/output.css`. The canonical reference is `pages/clients.html` — it already implements the exact KPI + filters + table + add-modal shape these pages need.

---

## R1 — Page Skeleton (all 3 pages)

**Decision**: Clone the `clients.html` structure: shared shell (head, sidebar, `.mobile-nav-toggle`, `main.js`) + `.page-title-wrap` header with client selector + `.kpi-row` + `.filters` bar + `.card` > `.table-wrap` > `table.docs` + a `.scrim` add modal.

**Rationale**: `clients.html` is a master-data management page already approved and in production; the 3 new pages are the same archetype with different KPIs/columns/data. Cloning guarantees design parity and zero new CSS.

**Reference**: `pages/clients.html` (KPI ~257, filters ~298, table ~344, modal ~525).

---

## R2 — KPI Cards (4 per page)

**Decision**: `.kpi-row` with 4 `.card kpi` (`.kpi-top`/`.kpi-ico`/`.kpi-num`/`.kpi-lbl`/`.kpi-help`), color-coded via `.kpi-ico-primary/-green/-amber/-rose`.

**Rationale**: The 4-KPI row is the established summary band on `clients.html` and the dashboards. Each page's 4 KPIs map directly.

**Per page**: vendors → إجمالي الموردين (primary), موردون نشطون (green), فواتير هذا الشهر (amber), موردون بدون رقم ضريبي (rose). customers → إجمالي العملاء التجاريين (primary), عملاء نشطون (green), مبيعات هذا الشهر (amber), عملاء بدون رقم ضريبي (rose). accounts → إجمالي الحسابات (primary), بنوك (green), خزائن (amber), محافظ إلكترونية (slate/primary).

---

## R3 — Filter Bar

**Decision**: Reuse `.filters` > `.filter` > `.filter-select` (button-style dropdowns) plus a search input, copied from `clients.html` (~298–320). Handled by `initFilterSelects()`; visual only.

**Rationale**: `clients.html` already has search + filter-select dropdowns. Vendors needs بحث + الحالة + الدولة + خاضع للضريبة. (The other two pages MAY include a similar bar; the spec mandates filters only for vendors, so customers/accounts get the bar optionally for consistency.)

**Alternatives considered**: `<select>` dropdowns — rejected; the design system's filter pattern is `.filter-select` buttons.

---

## R4 — Records Table

**Decision**: `.table-wrap` > `table.docs` with `<thead>`/`<tbody>`; status/type via `.chip`; action column with `.btn.btn-outline.btn-sm` or `.icon-btn`. Missing-tax-number cells show "—" with a subtle `.chip.amber`/`.chip.rose` indicator.

**Rationale**: `table.docs` is the approved data table. Each page has 9 columns; rows are static HTML demo data per `data-model.md`.

**Reference**: `clients.html` (~344–520), `journal-entries.html`.

---

## R5 — Add Modals

**Decision**: Each page has one `.scrim`[`data-overlay` id hidden] + `.modal` (`.modal-head`/`.modal-body`/`.modal-foot`), opened by a header button `data-open="#id"`. Fields use `.field` + `<label>` + `.input` (text/number/date/textarea) and `.select-wrap`/`.select` or `.filter-select` for dropdowns. Footer: حفظ `.btn.btn-primary` + إلغاء `.btn.btn-outline` `data-close`.

**Rationale**: Identical to `#addClientModal` in `clients.html`, handled by `initOverlays()`. Modals are authored in HTML; JS only toggles them (FR-017). No new JS/CSS.

**Field counts**: vendors 7 (اسم المورد، الرقم الضريبي، الدولة، الهاتف، البريد، العنوان، ملاحظات); customers 6 (الاسم، الرقم الضريبي، الدولة، الهاتف، البريد، العنوان); accounts 8 (اسم الحساب، النوع، البنك، رقم الحساب / IBAN، العملة، الرصيد الافتتاحي، تاريخ الرصيد، ملاحظات). The account النوع field is a `.select-wrap`/`.select` (بنك / خزنة / محفظة إلكترونية).

---

## R6 — "عملاء الشركة" vs Platform Clients

**Decision**: `commercial-customers.html` is titled "عملاء الشركة" with subtitle clarifying these are the client company's sales customers. The existing sidebar label "العملاء التجاريون" is PRESERVED (do not rename) and links to `commercial-customers.html`.

**Rationale**: The spec stresses these are NOT Mohasebaty platform clients (which live in `clients.html`). Preserving the sidebar label avoids breaking the established navigation vocabulary while the page header disambiguates.

---

## R7 — Sidebar / index Wiring

**Decision**: Convert the 3 `is-soon` spans (`الموردون`, `العملاء التجاريون`, `الحسابات البنكية`) to live `<a class="sidebar-link">` across all 25 existing pages via one Python script (preserve each `.sl-ico` SVG, remove `.sl-soon`). New pages mark their own item `active` + `aria-current="page"`. In `index.html`, convert the 3 `is-soon` landing cards (~lines 384/391/412) to live `<a class="landing-card">`, update chip `12 وحدة`→`9 وحدة` and footer `25`→`28` / `12`→`9`.

**Rationale**: Same proven sidebar/index conversion from Specs 003–005.

---

## R8 — Zero New CSS (hard rule)

**Decision**: Use only classes already in `assets/css/output.css`. Confirmed-present for this feature: `.kpi-row`, `.card`, `.kpi`, `.kpi-top`, `.kpi-ico*`, `.kpi-num`, `.kpi-lbl`, `.kpi-help`, `.filters`, `.filter`, `.filter-select`, `.placeholder`, `.chev`, `.table-wrap`, `.docs`, `.chip`, `.scrim`, `.modal`, `.modal-head`, `.modal-body`, `.modal-foot`, `.field`, `.input`, `.select-wrap`, `.select`, `.btn`, `.btn-primary`, `.btn-outline`, `.btn-amber`, `.btn-sm`, `.icon-btn`, `.page-title-wrap`, `.eyebrow`, `.page-sub`, `.go`, `.landing-card`, `.sidebar-link`, `.tbl-foot`.

**Rationale**: Spec 004 proved inventing child classes yields off-design unstyled components. **`.btn-rose` is in `input.css` but purged from `output.css` — do NOT use it.** Verified by `quickstart.md` check (j).

**Exception**: A minimal inline `style=""` is acceptable for a one-off structural gap (precedent: `client-tax-settings.html`), never a new CSS class.
