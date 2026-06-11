# Feature: VAT Report & Tax Documents (Spec 008)

**Branch**: `008-vat-tax-documents` · **Created**: 2026-06-11 · Internal Accountant/Admin · static data, no backend.

Two net-new pages: `pages/vat-report.html` (تقرير ضريبة القيمة المضافة) and `pages/tax-documents.html` (المستندات الضريبية). SA + EG readiness. **Zero new CSS** — reuse only classes in `assets/css/output.css`; copy markup from the reference pages below; do NOT use `.btn-rose` (purged → use `.btn-amber`/`.btn-outline`).

## Reference pages (copy markup from these)
- **Shell**: clone from `journal-entries.html` (head, sidebar, mobile-nav, main.js). The 2 tax sidebar items (`إقرار ضريبة القيمة المضافة`, `المستندات الضريبية`) are currently `is-soon` spans → convert to live `<a>` and mark own item active+aria-current.
- **Configurable country profile (SA/EG)**: COPY the exact pattern from `client-tax-settings.html` lines ~457–485 — a `.seg[data-country-select]` (buttons `data-country="sa"` active / `data-country="eg"`) + two `data-country-block="sa"` / `data-country-block="eg"` (the eg one `hidden`) blocks. SA block: `<b>المملكة العربية السعودية</b>`, `<span class="chip green">ZATCA Ready</span>`, `<span class="chip primary">ضريبة القيمة المضافة 15%</span>`, `<span class="chip primary">ريال سعودي SAR</span>` + ZATCA note. EG block: `<b>جمهورية مصر العربية</b>`, `<span class="chip green">ETA Ready</span>`, `<span class="chip gold">ضريبة القيمة المضافة 14%</span>`, `<span class="chip gold">جنيه مصري EGP</span>` + ETA note. (main.js already toggles `data-country-block` via the `.seg[data-country-select]`.) This satisfies "configurable profile, not hardcoded globally."
- **KPI grid (6 cards)**: use `.kpi-grid-6` (defined in output.css) with 6 `.card kpi` (`.kpi-top`/`.kpi-ico`/`.kpi-num`/`.kpi-lbl`/`.kpi-help`). Ref: `clients.html`/`journal-entries.html` KPI cards.
- **Tables**: `.table-wrap` > `table.docs`. Status/issue badges via `.chip` (green/amber/rose/slate/primary/gold).
- **Filters**: `.filters` > `.filter`/`.filter-select` + a primary "إنشاء التقرير" button. Ref: `clients.html`/`accountant-inbox.html`.
- **Two-column layout**: `.layout` (main 1fr + `.side` 320px). Ref: `client-tax-settings.html`.
- **Bulk action bar**: COPY `.bulk-bar[data-bulk-bar hidden]` + `.bulk-count` (`<b data-bulk-count>0</b>`) + `.bulk-actions` + checkboxes (`<button class="checkbox" data-bulk-all>` in thead, `<button class="checkbox" data-bulk-row>` per row) from `accountant-inbox.html` lines ~339–430 (main.js wires selection).
- **Note / problem rows**: `.tip` for the preliminary note; `.set-body`/`.set-row`/`.info` for problem-documents rows; `.hr-bar`/`.split-bar`/`.legend-item` optional for issue-distribution visuals.

---

## C1 — vat-report.html (تقرير ضريبة القيمة المضافة)

**Sidebar active**: `<a class="sidebar-link active" href="vat-report.html" aria-current="page">إقرار ضريبة القيمة المضافة</a>` (label preserved).

**Header**: eyebrow "الضرائب · إقرار دوري", title "تقرير ضريبة القيمة المضافة", subtitle "ملخص ضريبة المخرجات والمدخلات وصافي الضريبة المستحقة". Header actions: "تصدير PDF" `.btn.btn-outline`, "تصدير Excel" `.btn.btn-outline`, "اعتماد التقرير" `.btn.btn-primary`.

**Filters bar** (`.filters`): العميل، الدولة، الفترة الضريبية، نوع التقرير، الحالة (`.filter-select`) + "إنشاء التقرير" `.btn.btn-primary`.

**6 Tax KPI cards** (`.kpi-grid-6`): إجمالي المبيعات الخاضعة 845,000 ﷼ (primary) · ضريبة المخرجات 126,750 ﷼ (green) · إجمالي المشتريات/المصروفات الخاضعة 512,000 ﷼ (primary) · ضريبة المدخلات 76,800 ﷼ (amber) · صافي الضريبة المستحقة 49,950 ﷼ (rose) · مستندات تؤثر على التقرير 14 (slate/amber).

**Layout** (`.layout`): MAIN = the country-profile card (configurable SA/EG, copied from client-tax-settings) + the VAT summary table + the preliminary `.tip` note. SIDE (`.side`) = the problem-documents card. (Place the KPI grid full-width above the `.layout`.)

**VAT summary table** (`.table-wrap` > `table.docs`), 6 columns — البند، عدد المستندات، قبل الضريبة، الضريبة، الإجمالي، الحالة; 5 rows:
| البند | عدد | قبل الضريبة | الضريبة | الإجمالي | الحالة |
|---|---|---|---|---|---|
| مبيعات خاضعة | 96 | 845,000 ﷼ | 126,750 ﷼ | 971,750 ﷼ | مكتمل (chip green) |
| مبيعات صفرية | 12 | 60,000 ﷼ | 0 ﷼ | 60,000 ﷼ | مكتمل (chip green) |
| مصروفات خاضعة | 74 | 512,000 ﷼ | 76,800 ﷼ | 588,800 ﷼ | مكتمل (chip green) |
| مصروفات غير قابلة للخصم | 8 | 23,500 ﷼ | غير قابل للخصم | 23,500 ﷼ | تنبيه (chip amber) |
| تسويات ضريبية | 3 | 4,000 ﷼ | 600 ﷼ | 4,600 ﷼ | يحتاج مراجعة (chip amber) |

**Problem-documents card** (`.side`): title "مستندات تؤثر على التقرير"; 4 `.set-row` (or rows) each with count + a "عرض" `.btn.btn-outline.btn-sm` → `tax-documents.html`: مستندات بدون رقم ضريبي 4 (chip rose) · مستندات غير مصنفة 3 (chip amber) · مستندات ناقصة 5 (chip amber) · مستندات مطلوب توضيح 2 (chip rose). (Total 14, matches the KPI.)

**Note** (`.tip`): "التقرير مبدئي حتى اعتماد جميع المستندات وإغلاق الفترة."

---

## C2 — tax-documents.html (المستندات الضريبية)

**Sidebar active**: `<a class="sidebar-link active" href="tax-documents.html" aria-current="page">المستندات الضريبية</a>`.

**Header**: eyebrow "الضرائب · جودة الإقرار", title "المستندات الضريبية", subtitle "راجع المستندات التي تؤثر على تقرير الضريبة وجودة الإقرار".

**Filters** (`.filters`): العميل، الفترة، نوع المشكلة، حالة المستند (`.filter-select`).

**Layout** (`.layout`): MAIN = the bulk bar + documents table; SIDE (`.side`) = the problem-summary card.

**Bulk bar** (`.bulk-bar[data-bulk-bar hidden]`): `.bulk-count` + `.bulk-actions` with 4 buttons — طلب توضيح `.btn.btn-amber`، تعيين لمحاسب `.btn.btn-outline`، تجاهل مؤقت `.btn.btn-outline`، تصدير `.btn.btn-outline`.

**Documents table** (`.table-wrap` > `table.docs`), columns: ☐(checkbox) · رقم المستند · العميل · النوع · التاريخ · المبلغ · الضريبة · المشكلة · الحالة · الإجراء. Issue badges in المشكلة: رقم ضريبي مفقود (`.chip.rose`) / غير مصنف (`.chip.amber`) / يحتاج فاتورة ضريبية (`.chip.slate`) / ضريبة غير مطابقة (`.chip.rose`). 8 rows:
| رقم | العميل | النوع | التاريخ | المبلغ | الضريبة | المشكلة | الحالة |
|---|---|---|---|---|---|---|---|
| INV-2026-204 | شركة النور للتجارة | فاتورة مبيعات | 12/04/2026 | 18,400 ﷼ | 2,400 ﷼ | رقم ضريبي مفقود | يحتاج مراجعة (amber) |
| EXP-2026-118 | مؤسسة السلام للمقاولات | فاتورة مشتريات | 09/04/2026 | 7,200 ﷼ | 1,080 ﷼ | غير مصنف | يحتاج مراجعة (amber) |
| INV-2026-198 | شركة البيان للخدمات | فاتورة مبيعات | 05/04/2026 | 33,000 ﷼ | 4,950 ﷼ | يحتاج فاتورة ضريبية | مطلوب توضيح (rose) |
| EXP-2026-090 | شركة الهدى للتوريدات | مصروف | 02/04/2026 | 2,300 ﷼ | 300 ﷼ | ضريبة غير مطابقة | يحتاج مراجعة (amber) |
| INV-2026-176 | شركة الرواد للاستيراد | فاتورة مبيعات | 28/03/2026 | 9,800 ﷼ | 1,470 ﷼ | غير مصنف | يحتاج مراجعة (amber) |
| REC-2026-061 | مؤسسة الإبداع للتقنية | سند قبض | 22/03/2026 | 5,000 ﷼ | — | يحتاج فاتورة ضريبية | مطلوب توضيح (rose) |
| EXP-2026-077 | شركة الأفق للأعمال | مصروف | 18/03/2026 | 1,250 ﷼ | 165 ﷼ | ضريبة غير مطابقة | يحتاج مراجعة (amber) |
| INV-2026-160 | مجموعة الخليج التجارية | فاتورة مبيعات | 15/03/2026 | 21,500 ﷼ | — | رقم ضريبي مفقود | مطلوب توضيح (rose) |

**Problem-summary side card** ("ملخص المشاكل الضريبية"): 4 issue counts (with a `.split-bar` or `.hr-bar`/`.legend-item` distribution optional): رقم ضريبي مفقود 4 (rose) · غير مصنف 3 (amber) · يحتاج فاتورة ضريبية 5 (slate) · ضريبة غير مطابقة 2 (rose). Total 14.

---

## C3 — Navigation wiring (cross-cutting)
- Convert the 2 `is-soon` sidebar spans (`إقرار ضريبة القيمة المضافة` → `vat-report.html`, `المستندات الضريبية` → `tax-documents.html`) to live `<a>` across all 30 existing pages (preserve `.sl-ico`, remove `.sl-soon`).
- `index.html`: convert the 2 `is-soon` landing cards (إقرار ضريبة القيمة المضافة, المستندات الضريبية) to live `<a class="landing-card">`; chip `7 وحدة` → `5 وحدة`; footer `30 شاشة مكتملة + 7 وحدة قادمة` → `32 شاشة مكتملة + 5 وحدة قادمة`.
- Contextual links: `reports.html` → `vat-report.html` ("تقرير الضريبة"); `admin-financial-dashboard.html` → `vat-report.html` ("إقرار الضريبة").

## Constraints (constitution)
`<html lang="ar" dir="rtl">`; local `../assets/css/output.css` + `../assets/js/main.js`; no CDN/framework; content in HTML (JS only for the country `.seg`, bulk selection, filters — all already in main.js `boot()`); professional Arabic; **zero new CSS**; exactly one active sidebar item per page.
