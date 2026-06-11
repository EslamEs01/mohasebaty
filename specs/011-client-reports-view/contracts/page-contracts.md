# UI Page Contracts: Client Reports View (Spec 011)

Defines the required HTML structure, component classes (all confirmed in `output.css`), and navigation. **Use only the named classes** — copy KPI / filter / form markup verbatim from the reference pages. The amber chip is **`.chip.amber`** (not `.chip-amber`). **Do NOT use `.btn-rose`** (purged). This is a **client portal** page: simple language, **ZERO accounting internals**. Sidebar wiring uses the **label-based line fixer** (no spanning regex).

---

## C1 — client-reports.html (تقاريري)

**Shell**: `<html lang="ar" dir="rtl">`, `.app-shell`, full shared sidebar, `../assets/css/output.css`, `../assets/js/main.js`. **Clone the CLIENT shell from `client-documents.html`** (MOHASEBATY brand badge + `.header-right` `.client-pill` "متصل بـ شركة النور للتجارة"). Deactivate the inherited client-documents active sidebar link.

**Sidebar active**: `<a class="sidebar-link active" href="client-reports.html" aria-current="page">تقارير العميل</a>` (sidebar label "تقارير العميل" preserved; page title "تقاريري").

**Header** (`.page-title-wrap`): title "تقاريري", subtitle "ملخصات وتقارير مبسطة عن مستنداتك المالية". Header actions: "تحميل آخر تقرير" `.btn.btn-outline` (download icon) + "طلب تقرير" `.btn.btn-primary` (href="#request").

**Filters** (`.filters`): 3 `.filter`, each `<label>` + `.filter-select` button (`.placeholder` + `.chev`): الفترة (هذا الشهر), نوع التقرير (كل التقارير), الحالة (كل الحالات).

**Summary cards** (`.kpi-grid`): 5 `.card kpi` (copy inner markup from `client-dashboard.html`: `.kpi-top`(`.kpi-ico .kpi-ico-*` + `.kpi-trend`?) + `.kpi-num` + `<div>`(`.kpi-lbl` + `.kpi-help`)): إجمالي الإيرادات المرفوعة 512,000 ﷼ (green), إجمالي المصروفات المرفوعة 318,500 ﷼ (amber), صافي تقديري 193,500 ﷼ (primary, help "تقديري — قد يتغير بعد المراجعة"), الضريبة التقديرية 29,025 ﷼ (slate, help "تقديري حتى اعتماد التقرير"), مستندات قيد المراجعة 12 (amber, help "يراجعها فريق المحاسبة الآن").

**Layout** (`.layout`): MAIN = the reports `.card` table + the status-explanations `.card` + the tax `.note`; SIDE (`.side`) = the request-report card.

**Reports table** (`.card` > `.table-wrap` > `table.docs`): `<thead>` 5 columns — اسم التقرير، الفترة، الحالة، آخر تحديث، إجراء. `<tbody>` the 5 rows from `data-model.md` (status `.chip`: مبدئي amber / معتمد green / يحتاج مستندات slate; إجراء = `.btn.btn-outline.btn-sm` "تحميل", or "رفع المستندات" linking to `upload-document.html` for the يحتاج-مستندات row).

**Status explanations** (`.card`): `.card-head` "ماذا تعني حالات التقارير؟" + `.set-body` of 3 `.set-row`, each `.info` pairing a status `.chip` with its plain description (مبدئي / معتمد / يحتاج مستندات — exact wording from data-model).

**Tax note** (`.note`): an info icon + "الأرقام الضريبية تقديرية حتى اعتماد التقرير من فريق المحاسبة." (placed in MAIN after the table or above the status card).

**Request-report card** (`.side`, `id="request"`): `.card` `.card-head` "طلب تقرير جديد" + 3 `.field` — نوع التقرير (`.select-wrap`/`.select`: ملخص مالي/تقرير ضريبة/تقرير مصروفات/تقرير إيرادات), الفترة (`.select-wrap`/`.select`: هذا الشهر/الشهر الماضي/الربع الحالي/حسب الطلب), ملاحظات (`<textarea class="input">`) + an "إرسال الطلب" `.btn.btn-primary` (full width).

**Client-portal constraint**: NO مدين/دائن، شجرة الحسابات، قيد/قيود، ترحيل، account codes (41xx/51xx), or internal notes anywhere. Estimates labelled "تقديري".

---

## C2 — Navigation Wiring (Cross-cutting)

**Sidebar** (label-based line fixer): in every page, the last coming-soon item becomes live:
```html
<a class="sidebar-link" href="client-reports.html"><span class="sl-ico"><!-- report icon --></span><span>تقارير العميل</span></a>
```
The new page marks its own item `active` + `aria-current="page"`; one active item per page. **After this, NO `is-soon` sidebar item remains.**

**index.html**: convert the last `<div class="landing-card is-soon">` (تقارير العميل ~line 398) to a live `<a class="landing-card" href="pages/client-reports.html">` with `.go "فتح الصفحة"`; update the counter chip to `0 وحدة` (or remove the "M وحدة" chip) and the footer `36 شاشة مكتملة + 1 وحدة قادمة` → `37 شاشة مكتملة` (drop the coming-soon clause). If keeping the `landing-grid is-soon` wrapper would dim the now-live card, remove `is-soon` from that wrapper.

**Contextual links**: `client-dashboard.html` → `client-reports.html` ("تقاريري"); `client-documents.html` → `client-reports.html` ("تقاريري").
