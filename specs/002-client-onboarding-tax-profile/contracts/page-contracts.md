# UI Contracts: Client Onboarding & Tax Profile

Defines the structure of the two new pages, the components they reuse, the JS hooks, and the navigation
wiring. All markup reuses approved classes — no new visual language.

## Page shell (both pages) — reuse from existing internal pages

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>… · منصة محاسبتي</title>
  <link rel="stylesheet" href="../assets/css/output.css" />
</head>
<body>
  <div class="app">            <!-- same shell wrapper used by internal pages -->
    <aside class="sidebar" aria-label="القائمة الجانبية"> … full shared sidebar … </aside>
    <main class="main-area">
      <header class="header"> mobile-nav-toggle + crumb + page-title + back-btn + header-right </header>
      … page body …
    </main>
  </div>
  <script src="../assets/js/main.js"></script>
</body>
</html>
```

- Sidebar = the full shared sidebar (3 existing groups + 7 new groups), with the two target items now LIVE
  links and exactly one marked `active` on its own page (see §Nav wiring).
- Confirm the exact `.app`/wrapper class by copying from an existing internal page (e.g. `clients.html` or
  `settings.html`) so the shell matches byte-for-byte.

## C1. `pages/client-onboarding.html`

### Header
- `.page-title` = إعداد عميل جديد; subtitle "جهّز بيانات العميل، الضريبة، شجرة الحسابات، والملفات الأولية
  قبل بدء العمل".
- Header actions (reuse `.btn`): `حفظ كمسودة` (`.btn-outline`), `إنشاء العميل` (`.btn-primary`),
  `رجوع إلى العملاء` (`.back-btn` or `.btn-outline`, `href="clients.html"`).

### Stepper (reuse `upload-document.html`)
```html
<div class="stepper" data-wizard>
  <div class="step active" data-step="1"><div class="n">1</div><div class="lbl">بيانات الشركة</div></div>
  <div class="stepper-flex"><div class="ln"></div></div>
  <div class="step" data-step="2"><div class="n">2</div><div class="lbl">بيانات التواصل</div></div>
  … steps 3–8: الدولة والعملة، إعدادات الضريبة، المحاسب المسؤول، شجرة الحسابات، الملفات الأولية، مراجعة نهائية …
</div>
```

### Step panels (8) — all present in HTML, visible by default
Each step is a `.section` (with `.section-head` + `.stamp` number) wrapped in a panel the wizard can show
/hide:
```html
<div class="wizard-panel" data-panel="1"> <div class="section"> … step 1 fields … </div> </div>
… data-panel="2" … through data-panel="8" …
<div class="wizard-nav">
  <button class="btn btn-outline" type="button" data-wizard-prev>السابق</button>
  <button class="btn btn-primary" type="button" data-wizard-next>التالي</button>
</div>
```
Field lists per step come from `data-model.md` (New Client). Reuse `.fields-grid`/`.field`/`.input`/
`.input-wrap`/`.suffix`/`.req`/`.seg`/`.select-wrap`/`.select`.

- Step 4 (إعدادات الضريبة) embeds the **country preset blocks** (§C3).
- Step 6 (شجرة الحسابات) uses `.type-grid` with 4 `.type-card` options (single-select via existing
  `initSingleSelect`).
- Step 7 (الملفات الأولية) uses 5 `.dropzone` areas (`data-zone-id` unique) + a `ملاحظات` `textarea`.
- Step 8 (مراجعة نهائية) is a read-only summary card echoing chosen values.

**Graceful degradation**: panels are NOT `hidden` in HTML. `initWizard()` adds `hidden` to all but the
active panel on boot. No JS ⇒ all 8 panels render stacked and usable.

## C2. `pages/client-tax-settings.html` (reuse `settings.html` layout)

### Header
- `.page-title` = إعدادات الضريبة للعميل; subtitle "إعداد الدولة، الرقم الضريبي، نسبة الضريبة، وفترة
  الإقرار لكل عميل".
- Client selector (reuse `.select-wrap`/`.select`, `data-country-select` not here — see below) + a
  `حفظ` `.btn-primary`.

### Body — `.settings-layout` > `.set-nav` (anchors) + `.set-main` (cards)
`.set-nav` anchors: الهوية الضريبية، إعداد الضريبة، فترة الإقرار، الجاهزية، عرض العميل.

1. **Tax identity** `<section class="card" id="identity">` — `.set-row`s for العميل (selector echo),
   الدولة (`.seg` with `data-country-select`), الرقم الضريبي (`.input mono`), هل العميل مسجل ضريبيًا؟
   (`.switch`), تاريخ التسجيل الضريبي (date), نوع النشاط الضريبي (`.select`).
2. **VAT configuration** `id="vat"` — نسبة الضريبة الافتراضية (`.input mono %`), هل الأسعار تشمل الضريبة؟
   (`.switch`), هل يتم حساب الضريبة تلقائيًا؟ (`.switch`), ضريبة المخرجات/المدخلات/المستحقة (`.select`),
   الحسابات المرتبطة (`.select`).
3. **Tax period** `id="period"` — `.seg`/`.toggle-radio` (شهري/ربع سنوي/سنوي) + start/end `date` inputs.
4. **Country readiness** `id="readiness"` — the two country-preset blocks (§C3).
5. **Client display** `id="display"` — three `.switch` rows (إظهار الضريبة التقديرية للعميل، إظهار
   التقارير المعتمدة فقط، إخفاء التفاصيل الداخلية).
6. **Warning note** — `.tip` callout: "الإعدادات تؤثر على تقارير الضريبة والقيود المحاسبية المستقبلية."

## C3. Country preset blocks (both pages) — JS show/hide

```html
<!-- a single-select control -->
<div class="seg" data-country-select>
  <button type="button" class="active" data-country="sa">السعودية</button>
  <button type="button" data-country="eg">مصر</button>
</div>

<div data-country-block="sa">  <!-- VAT 15% · SAR · ZATCA Ready · QR/e-invoice planned --> </div>
<div data-country-block="eg" hidden>  <!-- VAT 14% · EGP · ETA Ready · UUID/e-signature planned --> </div>
```
Use `.chip` pills for VAT %, currency, and readiness labels. Default visible = `sa`. Both blocks contain
fully authored values; JS only toggles the `hidden` attribute.

## C4. JS additions to `assets/js/main.js` (UI-only, guarded)

```js
function initWizard() {
  var root = qs('[data-wizard]'); if (!root) return;     // no-op elsewhere
  // read .step[data-step], .wizard-panel[data-panel], [data-wizard-prev/next]
  // show active panel, hide others (toggle native `hidden`), update .step.active,
  // clicking a .step or Prev/Next changes the active index. No content created.
}
function initCountryPreset() {
  qsa('[data-country-select]').forEach(function (group) {  // no-op if none
    // on button click: set .active, show matching [data-country-block], hide others via `hidden`.
  });
}
// add to boot(): initWizard(); initCountryPreset();
```
Both helpers ONLY toggle `hidden`/`active` on pre-existing elements. They never inject markup.

## C5. Navigation wiring (cross-page)

- **Sidebar (17 pages = 15 existing + 2 new)**: replace the coming-soon spans for
  `تهيئة عميل جديد` and `إعدادات ضريبة العميل` with anchors:
  ```html
  <a class="sidebar-link" href="client-onboarding.html"><span class="sl-ico">…</span><span>تهيئة عميل جديد</span></a>
  <a class="sidebar-link" href="client-tax-settings.html"><span class="sl-ico">…</span><span>إعدادات ضريبة العميل</span></a>
  ```
  Remove the `is-soon` class and the `<span class="sl-soon">قريباً</span>` for these two only. Keep the
  same icon. On `client-onboarding.html`, the first anchor gets `class="sidebar-link active"` +
  `aria-current="page"`; on `client-tax-settings.html`, the second does.
- **index.html**: convert the two matching `.landing-card.is-soon` `<div>`s to
  `<a class="landing-card" href="pages/client-onboarding.html">` / `…client-tax-settings.html"`, remove
  the `is-soon` class and the `<span class="chip slate">قريباً</span>`, and add a `.go` "فتح الصفحة"
  affordance like the other live cards. Decrement the الإعداد والتهيئة and الضرائب group count chips by 1,
  and update the COMING SOON header count (22 → 20). Update footer:
  `… · 17 شاشة مكتملة + 20 وحدة قادمة`.
- **clients.html**: add a primary action linking to the wizard, e.g. next to the existing add-client
  button: `<a class="btn btn-primary" href="client-onboarding.html">إعداد عميل جديد</a>`. Keep the
  existing `data-open="#addClientModal"` button and the modal intact.
- **settings.html**: in the tax area (the `#tax` card or `.set-nav`), add a link to
  `client-tax-settings.html` (e.g. a `.btn-outline` "إعدادات ضريبة العميل"). Do not remove existing
  settings sections.

## C6. Negative contract (MUST NOT)

- MUST NOT set `hidden` on wizard panels or country blocks in the HTML such that no-JS hides content
  (panels visible by default; only the non-default country block may start `hidden`, leaving the page
  still complete).
- MUST NOT generate any field, row, card, or option via JavaScript.
- MUST NOT remove the clients.html add-client modal or any existing settings section.
- MUST NOT convert any coming-soon item other than the two named ones; MUST NOT leave any page with zero
  or multiple active sidebar items.
- MUST NOT introduce a new UI style, CDN, or framework.
