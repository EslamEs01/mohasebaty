# UI Contract: Internal Sidebar Navigation

This is the canonical contract for the internal (accountant/admin) sidebar after this feature. The
seven new groups below MUST be appended **after** the existing `إدارة` group and **before**
`.sidebar-foot`, identically on all 15 pages. Only the per-page active state differs. The client group
(`لوحات العميل`) and the existing `ساحة المحاسب` / `إدارة` groups are NOT changed by this contract.

## C1. Existing item (available) — unchanged shape

```html
<a class="sidebar-link" href="reports.html">
  <span class="sl-ico"><!-- 16x16 inline SVG --></span>
  <span>مركز التقارير</span>
</a>
```

## C2. Active item (current page) — unchanged shape

```html
<a class="sidebar-link active" href="admin-financial-dashboard.html" aria-current="page">
  <span class="sl-ico"><!-- 16x16 inline SVG --></span>
  <span>لوحة التقارير</span>
</a>
```

## C3. Coming-soon item (upcoming module) — NEW shape

Key rule: it is a `<span>`, has **no `href`**, and is therefore non-navigating (no 404, no console
error). It carries `aria-disabled="true"` and a `.sl-soon` "قريباً" pill.

```html
<span class="sidebar-link is-soon" aria-disabled="true">
  <span class="sl-ico"><!-- 16x16 inline SVG --></span>
  <span>الأرصدة الافتتاحية</span>
  <span class="sl-soon">قريباً</span>
</span>
```

## C4. Group block contract (the 7 new groups, in order)

Each group is a `.sidebar-section-label` followed by its coming-soon items (all `is-soon` in this
feature). Order and labels are fixed:

```html
<div class="sidebar-section-label">الإعداد والتهيئة</div>
<!-- client-onboarding, opening-balances, fiscal-periods, document-categories (all C3) -->

<div class="sidebar-section-label">الضرائب</div>
<!-- client-tax-settings, vat-report, tax-documents (all C3) -->

<div class="sidebar-section-label">استيراد البيانات</div>
<!-- data-import, import-mapping, import-preview, import-history, import-errors, import-templates (all C3) -->

<div class="sidebar-section-label">العمليات المحاسبية</div>
<!-- vendors, commercial-customers, client-reports (all C3) -->

<div class="sidebar-section-label">البنوك</div>
<!-- bank-accounts, bank-statement-import, bank-reconciliation (all C3) -->

<div class="sidebar-section-label">المراجعة والاعتماد</div>
<!-- approval-workflow, audit-log (all C3) -->

<div class="sidebar-section-label">النظام</div>
<!-- notifications (C3) -->
```

**Placement**: insert the block immediately after the last item of the existing `إدارة` group
(`settings.html` link) and immediately before `<div class="sidebar-foot">`.

**Consistency rule (SC-003 / FR-009)**: the inserted block MUST be identical across all 15 pages.
After editing, a diff of the inserted region between any two pages MUST be empty.

## C5. CSS contract (added to `assets/css/input.css`, `@layer components`)

Add ONLY the following (reusing existing theme tokens), then rebuild `output.css`:

```css
@layer components {
  .sidebar-link.is-soon {
    color: theme('colors.ink.4');
    cursor: default;
    justify-content: flex-start;
  }
  .sidebar-link.is-soon:hover { background: transparent; color: theme('colors.ink.4'); }
  .sidebar-link.is-soon .sl-ico { opacity: .6; }
  .sl-soon {
    margin-inline-start: auto;
    font-size: 10.5px;
    font-weight: 500;
    color: theme('colors.ink.4');
    background: theme('colors.bg.2');
    border: 1px solid theme('colors.line.DEFAULT');
    border-radius: 999px;
    padding: 1px 7px;
    white-space: nowrap;
  }
}
```

Rebuild command: `npm run build:css` (regenerates `assets/css/output.css`, which is committed).

## C6. Landing page (`index.html`) coming-soon card contract

Reuse `.landing-card` as a `<div>` (no `href`) with a `.chip.slate` "قريباً" marker; group the 22 cards
under section headers matching the seven group labels. Existing landing sections remain unchanged.

```html
<div class="landing-card is-soon">
  <div class="lc-ico"><!-- icon --></div>
  <div class="tag">قريباً · وحدة قادمة</div>
  <h3>الأرصدة الافتتاحية</h3>
  <p>وصف موجز بالعربية للوحدة القادمة ضمن مرحلة ما قبل الـ backend.</p>
  <span class="chip slate">قريباً</span>
</div>
```

If `.landing-card.is-soon` dimming is desired, add a minimal modifier in the same `@layer components`
block (reusing tokens); otherwise the `.chip.slate` marker alone is sufficient. Do not add inline styles.

## C7. Negative contract (MUST NOT)

- MUST NOT add any `href` to a coming-soon item, or point it at a non-existent file.
- MUST NOT modify `assets/js/main.js` or introduce any JS to build navigation.
- MUST NOT change the client-portal group or any existing available/active link.
- MUST NOT mark a coming-soon item as `active`.
- MUST NOT add a second active item on any page.
