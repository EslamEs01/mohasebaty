# UI Page Contracts: Bank Statement Import & Reconciliation (Spec 007)

Each contract defines the required HTML structure, component classes (all confirmed in `output.css`), data attributes, and navigation. **Use only the named classes** — copy markup from the reference pages. **Do NOT use `.btn-rose`** (purged from `output.css`).

---

## C1 — bank-statement-import.html (استيراد كشف حساب بنكي)

**Shell**: `<html lang="ar" dir="rtl">`, `.app-shell`, full shared sidebar, `../assets/css/output.css`, `../assets/js/main.js`. Clone shell from an internal admin page (e.g. `data-import.html`/`journal-entries.html`).

**Sidebar active**: `<a class="sidebar-link active" href="bank-statement-import.html" aria-current="page">استيراد كشف الحساب</a>` (label preserved).

**Header** (`.page-title-wrap`): eyebrow "البنوك · استيراد كشف", title "استيراد كشف حساب بنكي", subtitle "ارفع كشف الحساب البنكي واربط أعمدته لتجهيزه للمطابقة". Header controls: client selector, bank-account selector, period selector (3 × `.select-wrap`/`.select`). Header actions: "رفع وتحليل" `.btn.btn-primary`, "متابعة للمطابقة" `.btn.btn-primary` `href="bank-reconciliation.html"`, "حفظ كمسودة" `.btn.btn-outline`.

**Upload** (`.card` section): `.dropzone[data-zone-id="bank-statement"]` (`.dz-ico` + `<b>اسحب كشف الحساب هنا</b>` + `.sub` + `.browse` + `.formats`/`.fmt` — CSV/Excel/PDF), and a matching `.file-card[data-file-card-for="bank-statement" hidden]` (`.fc-ico` "CSV" + `.fc-body` `<b data-file-name>كشف_الراجحي_Q2_2026.csv</b>` + `<span data-file-size>` + `.icon-btn[data-file-clear]`).

**Mapping summary** (`.card`): a `.tip` confirmation ("تم التعرف على أعمدة الكشف وربطها تلقائياً — راجع الربط قبل المتابعة") + a `.set-body` (or chip list) confirming the 6 mapped columns: التاريخ → التاريخ، الوصف → الوصف، المدين → مدين، الدائن → دائن، الرصيد → الرصيد، رقم العملية → المرجع (each `.chip.green` مربوط).

**Preview table** (`.card` > `.table-wrap` > `table.docs`): `<thead>` 6 columns — التاريخ، الوصف، مدين، دائن، الرصيد، الحالة. `<tbody>` the 9 rows from `data-model.md` (مقروء `.chip.green` / تحذير `.chip.amber`). Optional `.tbl-foot`.

**Nav**: "متابعة للمطابقة" → `bank-reconciliation.html`. Contextual inbound links added FROM `bank-accounts.html` and `data-import.html`.

---

## C2 — bank-reconciliation.html (مطابقة البنك والمستندات)

**Shell**: same as C1. **Sidebar active**: `<a class="sidebar-link active" href="bank-reconciliation.html" aria-current="page">التسوية البنكية</a>` (label preserved).

**Header**: eyebrow "البنوك · التسوية", title "مطابقة البنك والمستندات", subtitle "طابق معاملات البنك مع المستندات والفواتير المرفوعة"; client + bank-account + period controls (`.select-wrap`/`.select`).

**KPI row** (`.kpi-row`, 4 × `.card kpi`): معاملات البنك 9 (`.kpi-ico-primary`), مطابق تلقائيًا 4 (`.kpi-ico-green`), يحتاج مراجعة 3 (`.kpi-ico-amber`), غير مطابق 2 (`.kpi-ico-rose`).

**Split workspace** (`<div class="workspace">`, grid 1fr 1fr):
- **Column 1 — Bank transactions** (`.card`): `.card-head` "معاملات البنك" + chip "9 معاملة"; `.table-wrap` > `table.docs` with 6 columns — التاريخ، الوصف، المبلغ، النوع، الحالة، إجراء; the 9 rows from `data-model.md`; status chips green/amber/rose (+ primary for manual); type chips إيداع/سحب/رسوم; إجراء = `.btn.btn-outline.btn-sm` (مطابقة / عرض) or `.icon-btn`. The selected/representative row is visually highlighted.
- **Column 2 — `.left-col` stack**:
  - **Suggested documents** (`.card`): `.card-head` "مستندات مقترحة للمطابقة" + chip; `.table-wrap` > `table.docs` with 6 columns — المستند، النوع، المبلغ، التاريخ، نسبة التطابق، إجراء; the 4 rows from `data-model.md` (نسبة التطابق as `.chip.green`/`.amber`/`.slate` by band, descending); إجراء = `.btn.btn-outline.btn-sm` "اختيار".
  - **Match details** (`.card`): `.card-head` "تفاصيل المطابقة"; `.set-body` with 4 `.set-row`/`.info` — معاملة البنك المحددة، المستند المقترح، الفرق (`.chip.green` "0 ﷼ — متطابق")، ملاحظات; then the 4 action buttons: "مطابقة" `.btn.btn-primary`، "تجاهل" `.btn.btn-outline`، "إنشاء مستند جديد من المعاملة" `.btn.btn-outline`، "طلب توضيح" `.btn.btn-amber` (NOT `.btn-rose`).

**Nav**: contextual inbound links added FROM `bank-statement-import.html` (the "متابعة للمطابقة" action) and reachable from the sidebar.

---

## C3 — Navigation Wiring (Cross-cutting)

**Sidebar**: in every project page, the 2 items become live `<a>` links (icons preserved from the existing `is-soon` spans):

```html
<a class="sidebar-link" href="bank-statement-import.html"><span class="sl-ico"><!-- upload-out icon --></span><span>استيراد كشف الحساب</span></a>
<a class="sidebar-link" href="bank-reconciliation.html"><span class="sl-ico"><!-- check-circle icon --></span><span>التسوية البنكية</span></a>
```
Each new page marks its own item `active` + `aria-current="page"`; every page keeps exactly one active item.

**index.html**: convert the 2 `<div class="landing-card is-soon">` (استيراد كشف الحساب ~line 419, التسوية البنكية ~426) to live `<a class="landing-card" href="pages/bank-statement-import.html">` / `href="pages/bank-reconciliation.html">` with a `.go "فتح الصفحة"`; chip `9 وحدة` → `7 وحدة`; footer `28 شاشة مكتملة + 9 وحدة قادمة` → `30 شاشة مكتملة + 7 وحدة قادمة`.

**Contextual links** (non-destructive, one small `<a>` each):
- `bank-accounts.html` → `bank-statement-import.html` (header/secondary action "استيراد كشف حساب").
- `data-import.html` → `bank-statement-import.html` (a bank-statement entry point near its import actions).
