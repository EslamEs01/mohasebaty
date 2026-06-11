# Data Model: Master Data — Vendors / Commercial Customers / Bank Accounts (Spec 006)

Static frontend prototype — all entities are HTML demo data, not real storage; no CRUD or computation. KPI numbers are illustrative static values. Demo data is Saudi-first (ريال سعودي ﷼) with at least one foreign record per table.

---

## Entity 1: Vendor (مورد)

| Field | Type | Sample | Notes |
|-------|------|--------|-------|
| name | string | شركة الإمداد للتوريدات | |
| taxNumber | string | 3105... | May be empty ("—") |
| country | string | السعودية | At least one foreign |
| phone | string | 0551234567 | |
| email | string | info@emdad.sa | |
| totalInvoices | money | 124,500 ﷼ | Illustrative |
| lastActivity | date | 28 مايو 2026 | |
| status | enum | نشط | نشط `.chip.green` / موقوف `.chip.slate` |
| taxable | bool | نعم | خاضع للضريبة |

**Vendors KPI (vendors.html)**: إجمالي الموردين 34 · موردون نشطون 29 · فواتير هذا الشهر 18 · موردون بدون رقم ضريبي 3.

---

## Entity 2: Commercial Customer (عميل تجاري)

| Field | Type | Sample | Notes |
|-------|------|--------|-------|
| name | string | مؤسسة الواحة التجارية | The client company's customer |
| taxNumber | string | 3107... | May be empty |
| country | string | السعودية | |
| phone | string | 0509876543 | |
| email | string | sales@alwaha.sa | |
| totalSales | money | 312,000 ﷼ | Illustrative |
| lastInvoice | date | 2 يونيو 2026 | |
| status | enum | نشط | نشط `.chip.green` / موقوف `.chip.slate` |

**Customers KPI (commercial-customers.html)**: إجمالي العملاء التجاريين 52 · عملاء نشطون 47 · مبيعات هذا الشهر 26 · عملاء بدون رقم ضريبي 5.

---

## Entity 3: Bank/Cash Account (حساب)

| Field | Type | Sample | Notes |
|-------|------|--------|-------|
| name | string | الحساب الجاري — الراجحي | |
| type | enum | بنك | بنك `.chip.green` / خزنة `.chip.amber` / محفظة إلكترونية `.chip.slate` |
| bank | string | مصرف الراجحي | "—" for cash/wallet |
| ibanOrNo | string | SA44 2000 0001 2345 6789 1234 | "—" or wallet id for cash/wallet |
| currency | string | ريال سعودي | |
| openingBalance | money | 250,000 ﷼ | Illustrative |
| lastStatement | date | 31 مايو 2026 | |
| status | enum | نشط | نشط `.chip.green` / مغلق `.chip.slate` |

**Accounts KPI (bank-accounts.html)**: إجمالي الحسابات 9 · بنوك 5 · خزائن 2 · محافظ إلكترونية 2.

---

## Demo Data Inventory

### Vendors (8 rows — vendors.html)

| اسم المورد | الرقم الضريبي | الدولة | الهاتف | البريد | إجمالي الفواتير | آخر تعامل | الحالة |
|-----------|---------------|--------|--------|--------|-----------------|----------|--------|
| شركة الإمداد للتوريدات | 310512345600003 | السعودية | 0551234567 | info@emdad.sa | 124,500 ﷼ | 28 مايو 2026 | نشط |
| مؤسسة النخبة للمعدات | 310698765400003 | السعودية | 0533219876 | sales@nokhba.sa | 86,200 ﷼ | 21 مايو 2026 | نشط |
| الشركة العربية للتغليف | — | السعودية | 0560011223 | info@arabpack.sa | 14,800 ﷼ | 9 مايو 2026 | نشط |
| Global Office Supplies | EG-4521003 | مصر | +20221001100 | hello@globaloffice.eg | 42,300 ﷼ | 3 مايو 2026 | نشط |
| مؤسسة الرواد للنظافة | 310744556600003 | السعودية | 0577788990 | rawad@clean.sa | 9,650 ﷼ | 26 أبريل 2026 | موقوف |
| شركة التقنية المتقدمة | 310822334400003 | السعودية | 0544455667 | it@advtech.sa | 233,100 ﷼ | 30 مايو 2026 | نشط |
| مكتبة المعرفة | — | السعودية | 0500102030 | books@marefa.sa | 3,200 ﷼ | 14 أبريل 2026 | موقوف |
| شركة الشحن السريع | 310955667700003 | السعودية | 0566677889 | ops@fastship.sa | 71,400 ﷼ | 1 يونيو 2026 | نشط |

### Commercial Customers (8 rows — commercial-customers.html)

| اسم العميل التجاري | الرقم الضريبي | الدولة | الهاتف | البريد | إجمالي المبيعات | آخر فاتورة | الحالة |
|-------------------|---------------|--------|--------|--------|-----------------|-----------|--------|
| مؤسسة الواحة التجارية | 310711223300003 | السعودية | 0509876543 | sales@alwaha.sa | 312,000 ﷼ | 2 يونيو 2026 | نشط |
| شركة البحر الأزرق | 310622113300003 | السعودية | 0531122334 | info@bluesea.sa | 198,500 ﷼ | 29 مايو 2026 | نشط |
| متاجر الأصالة | — | السعودية | 0554433221 | shop@asala.sa | 27,800 ﷼ | 18 مايو 2026 | نشط |
| Gulf Trading Co. | AE-9087001 | الإمارات | +97142223344 | info@gulftrading.ae | 154,600 ﷼ | 12 مايو 2026 | نشط |
| مؤسسة الفجر للتجارة | 310533224400003 | السعودية | 0566554433 | fajr@trade.sa | 64,200 ﷼ | 7 مايو 2026 | موقوف |
| شركة المستقبل للإلكترونيات | 310844556600003 | السعودية | 0577665544 | future@elec.sa | 421,900 ﷼ | 31 مايو 2026 | نشط |
| بقالة الحي | — | السعودية | 0500908070 | — | 5,400 ﷼ | 22 أبريل 2026 | موقوف |
| شركة النور للتجزئة | 310955448800003 | السعودية | 0544332211 | retail@noor.sa | 88,300 ﷼ | 1 يونيو 2026 | نشط |

### Bank/Cash Accounts (7 rows — bank-accounts.html, all 3 types)

| اسم الحساب | النوع | البنك | IBAN / رقم الحساب | العملة | الرصيد الافتتاحي | آخر كشف حساب | الحالة |
|-----------|------|------|-------------------|--------|------------------|--------------|--------|
| الحساب الجاري — الراجحي | بنك | مصرف الراجحي | SA44 2000 0001 2345 6789 1234 | ريال سعودي | 250,000 ﷼ | 31 مايو 2026 | نشط |
| حساب التشغيل — الأهلي | بنك | البنك الأهلي السعودي | SA03 8000 0000 6080 1016 7519 | ريال سعودي | 180,000 ﷼ | 31 مايو 2026 | نشط |
| حساب التوفير — الإنماء | بنك | مصرف الإنماء | SA90 0500 0000 1234 5678 9012 | ريال سعودي | 95,000 ﷼ | 28 مايو 2026 | نشط |
| الخزينة الرئيسية | خزنة | — | — | ريال سعودي | 12,000 ﷼ | — | نشط |
| خزينة الفرع | خزنة | — | — | ريال سعودي | 4,500 ﷼ | — | نشط |
| محفظة STC Pay | محفظة إلكترونية | STC Pay | 0551234567 | ريال سعودي | 6,800 ﷼ | 30 مايو 2026 | نشط |
| محفظة urpay | محفظة إلكترونية | urpay | 0533219876 | ريال سعودي | 1,300 ﷼ | 25 مايو 2026 | مغلق |
