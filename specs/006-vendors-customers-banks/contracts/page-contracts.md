# UI Page Contracts: Master Data — Vendors / Commercial Customers / Bank Accounts (Spec 006)

Each contract defines the required HTML structure, component classes (all confirmed in `output.css`), data attributes, and navigation links for one page. **Use only the classes named here** — copy markup from `pages/clients.html` (the structural twin). Inventing child classes is the Spec 004 defect. **Do NOT use `.btn-rose`** (purged from `output.css`).

---

## C1 — vendors.html (الموردون)

**Shell**: `<html lang="ar" dir="rtl">`, `.app-shell`, full shared sidebar, `../assets/css/output.css`, `../assets/js/main.js`. Clone from `clients.html`/`journal-entries.html`.

**Sidebar active**: `<a class="sidebar-link active" href="vendors.html" aria-current="page">الموردون</a>` (the other 2 master-data items + bank item are live links).

**Header** (`.page-title-wrap`): eyebrow "البيانات الأساسية · الموردون", title "الموردون", subtitle "إدارة الموردين المرتبطين بمصروفات وفواتير العملاء"; client selector `.select-wrap`/`.select` (4 Arabic clients); header action "إضافة مورد" `.btn.btn-primary` `data-open="#addVendorModal"`.

**KPI row** (`.kpi-row`, 4 × `.card kpi`): إجمالي الموردين 34 (`.kpi-ico-primary`), موردون نشطون 29 (`.kpi-ico-green`), فواتير هذا الشهر 18 (`.kpi-ico-amber`), موردون بدون رقم ضريبي 3 (`.kpi-ico-rose`).

**Filter bar** (`.filters`): a search input + 3 `.filter`/`.filter-select` — الحالة، الدولة، خاضع للضريبة (label the search "بحث").

**Table** (`.card` > `.table-wrap` > `table.docs`): `<thead>` 9 columns — اسم المورد، الرقم الضريبي، الدولة، الهاتف، البريد، إجمالي الفواتير، آخر تعامل، الحالة، إجراء. `<tbody>` the 8 rows from `data-model.md`; status `.chip.green` نشط / `.chip.slate` موقوف; missing tax number shows "—" with a `.chip.amber`/subtle indicator; إجراء = `.btn.btn-outline.btn-sm` (عرض / تعديل) or `.icon-btn`. Optional `.tbl-foot`.

**Add-vendor modal** (`<div class="scrim" data-overlay id="addVendorModal" hidden>` > `.modal`): `.modal-head` "إضافة مورد جديد" + `data-close`; `.modal-body` `.fields-grid` with 7 `.field` — اسم المورد (`.input`), الرقم الضريبي (`.input`), الدولة (`.select-wrap`/`.select`), الهاتف (`.input`), البريد (`.input` type=email), العنوان (`.input`), ملاحظات (`<textarea class="input">`); `.modal-foot` "حفظ المورد" `.btn.btn-primary` + "إلغاء" `.btn.btn-outline` `data-close`.

---

## C2 — commercial-customers.html (عملاء الشركة)

**Shell**: same. **Sidebar active**: `<a class="sidebar-link active" href="commercial-customers.html" aria-current="page">العملاء التجاريون</a>` (sidebar label preserved as العملاء التجاريون).

**Header**: eyebrow "البيانات الأساسية · عملاء الشركة", title "عملاء الشركة", subtitle "إدارة العملاء التجاريين المرتبطين بفواتير المبيعات"; the subtitle/eyebrow MUST make clear these are the client company's customers (not platform clients). Client selector; header action "إضافة عميل" `.btn.btn-primary` `data-open="#addCustomerModal"`.

**KPI row** (4): إجمالي العملاء التجاريين 52 (`.kpi-ico-primary`), عملاء نشطون 47 (`.kpi-ico-green`), مبيعات هذا الشهر 26 (`.kpi-ico-amber`), عملاء بدون رقم ضريبي 5 (`.kpi-ico-rose`).

**Filter bar** (optional, for consistency): search + الحالة + الدولة `.filter-select`.

**Table** (`table.docs`): 9 columns — اسم العميل التجاري، الرقم الضريبي، الدولة، الهاتف، البريد، إجمالي المبيعات، آخر فاتورة، الحالة، إجراء. The 8 rows from `data-model.md`; status chips green/slate.

**Add-customer modal** (`#addCustomerModal`): 6 `.field` — الاسم، الرقم الضريبي، الدولة (`.select-wrap`/`.select`)، الهاتف، البريد، العنوان; `.modal-foot` "حفظ العميل" `.btn.btn-primary` + "إلغاء" `.btn.btn-outline` `data-close`.

---

## C3 — bank-accounts.html (الحسابات البنكية والخزنة)

**Shell**: same. **Sidebar active**: `<a class="sidebar-link active" href="bank-accounts.html" aria-current="page">الحسابات البنكية</a>`.

**Header**: eyebrow "البنوك · الحسابات والخزائن", title "الحسابات البنكية والخزنة", subtitle "إدارة حسابات البنوك والخزائن والمحافظ الإلكترونية لكل عميل"; client selector; header action "إضافة حساب" `.btn.btn-primary` `data-open="#addAccountModal"`.

**KPI row** (4): إجمالي الحسابات 9 (`.kpi-ico-primary`), بنوك 5 (`.kpi-ico-green`), خزائن 2 (`.kpi-ico-amber`), محافظ إلكترونية 2 (`.kpi-ico-slate` or `.kpi-ico-primary`).

**Table** (`table.docs`): 9 columns — اسم الحساب، النوع، البنك، IBAN / رقم الحساب، العملة، الرصيد الافتتاحي، آخر كشف حساب، الحالة، إجراء. The 7 rows from `data-model.md` covering all 3 types; النوع chip `.chip.green` بنك / `.chip.amber` خزنة / `.chip.slate` محفظة إلكترونية; cash/wallet rows show "—" for bank/IBAN; status chips green/slate.

**Add-account modal** (`#addAccountModal`): 8 `.field` — اسم الحساب (`.input`), النوع (`.select-wrap`/`.select`: بنك / خزنة / محفظة إلكترونية), البنك (`.input`), رقم الحساب / IBAN (`.input`), العملة (`.select-wrap`/`.select`), الرصيد الافتتاحي (`.input` type=number), تاريخ الرصيد (`.input` type=date), ملاحظات (`<textarea class="input">`); `.modal-foot` "حفظ الحساب" `.btn.btn-primary` + "إلغاء" `.btn.btn-outline` `data-close`.

---

## C4 — Navigation Wiring (Cross-cutting)

**Sidebar**: in every project page, the 3 items become live `<a>` links (icons preserved from the existing `is-soon` spans):

```html
<a class="sidebar-link" href="vendors.html"><span class="sl-ico"><!-- truck/box icon --></span><span>الموردون</span></a>
<a class="sidebar-link" href="commercial-customers.html"><span class="sl-ico"><!-- briefcase icon --></span><span>العملاء التجاريون</span></a>
<a class="sidebar-link" href="bank-accounts.html"><span class="sl-ico"><!-- card icon --></span><span>الحسابات البنكية</span></a>
```
Each new page marks its own item `active` + `aria-current="page"`; every page keeps exactly one active item.

**index.html**: convert the 3 `<div class="landing-card is-soon">` (الموردون ~384, العملاء التجاريون ~391, الحسابات البنكية ~412) to live `<a class="landing-card" href="pages/…html">` with a `.go "فتح الصفحة"`; chip `12 وحدة` → `9 وحدة`; footer `25 شاشة مكتملة + 12 وحدة قادمة` → `28 شاشة مكتملة + 9 وحدة قادمة`.
