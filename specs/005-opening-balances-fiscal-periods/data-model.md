# Data Model: Opening Balances & Fiscal Periods (Spec 005)

Static frontend prototype — all entities are represented as HTML demo data, not real storage, and **no arithmetic is performed**. This document defines fields, states, and the exact demo values to author so the pages demonstrate the balanced/period states.

---

## Entity 1: OpeningBalanceSet

The opening balances for one client at a go-live date.

| Field | Type | Sample Value | Notes |
|-------|------|--------------|-------|
| client | string | شركة النور للتجارة | Client company |
| goLiveDate | date | 01/01/2026 | Start / go-live date |
| totalDebit | money | 580,000 ﷼ | Illustrative sum of debit column |
| totalCredit | money | 580,000 ﷼ | Illustrative sum of credit column |
| difference | money | 0 ﷼ | totalDebit − totalCredit (static) |
| balanceState | enum | متوازن | متوازن (diff = 0) / غير متوازن |
| approvalState | enum | جاهز للاعتماد | غير معتمد / جاهز للاعتماد / معتمد |

---

## Entity 2: OpeningBalance (one row)

| Field | Type | Sample Value | Notes |
|-------|------|--------------|-------|
| accountCode | string | 1010 | `.acct-code` |
| accountName | string | الخزينة | `.acct-name` |
| accountType | enum | أصول | أصول / خصوم / حقوق ملكية / إيرادات / مصروفات |
| debit | money | 25,000 | رصيد مدين (0 if credit row) |
| credit | money | 0 | رصيد دائن (0 if debit row) |
| notes | string | رصيد نقدي افتتاحي | Optional Arabic note |
| rowStatus | enum | مطابق | مطابق `.chip.green` / يحتاج مراجعة `.chip.amber` |

**Account types**: أصول, خصوم, حقوق ملكية, إيرادات, مصروفات.

---

## Entity 3: FiscalYear

| Field | Type | Sample Value | Notes |
|-------|------|--------------|-------|
| year | string | 2026 | Fiscal-year label |
| startDate | date | 01/01/2026 | |
| endDate | date | 31/12/2026 | |
| currency | string | ريال سعودي (﷼) | Saudi-first |
| status | enum | نشطة | نشطة `.chip.green` / مغلقة `.chip.slate` / مسودة `.chip.amber` |

---

## Entity 4: FiscalPeriod (month)

| Field | Type | Sample Value | Notes |
|-------|------|--------------|-------|
| month | string | يناير 2026 | Month label |
| status | enum | مغلقة | مفتوحة `.chip.green` / قيد المراجعة `.chip.amber` / مغلقة `.chip.slate` |
| unclassifiedDocs | integer | 0 | مستندات غير مصنفة |
| unpostedEntries | integer | 0 | قيود غير مرحلة |
| unapprovedReports | integer | 0 | تقارير غير معتمدة |
| action | enum | فتح بصلاحية | إغلاق شهر (open/review) / فتح بصلاحية (closed) |

---

## Entity 5: PeriodActionRecord

A close or reopen event (demo, not persisted).

| Field | Type | Sample Value | Notes |
|-------|------|--------------|-------|
| month | string | مايو 2026 | |
| kind | enum | إغلاق | إغلاق / إعادة فتح |
| incompleteSummary | string | 4 مستندات، 2 قيود، 1 تقرير | Close-modal summary (3 counts) |
| reopenReason | string | تصحيح قيد خاطئ في المصروفات | Reopen only |
| managerApproval | string | خالد الرشيدي (مدير الحسابات) | Reopen only |

---

## Demo Data Inventory

### Opening Balances (10 rows — opening-balances.html), balanced at 580,000 ﷼

| كود | اسم الحساب | النوع | مدين | دائن | ملاحظات | الحالة |
|-----|-----------|------|------|------|---------|--------|
| 1010 | الخزينة | أصول | 25,000 | — | رصيد نقدي افتتاحي | مطابق |
| 1020 | البنك الأهلي | أصول | 180,000 | — | حسب كشف الحساب البنكي | مطابق |
| 1100 | العملاء (المدينون) | أصول | 95,000 | — | أرصدة عملاء قائمة | مطابق |
| 1200 | المخزون | أصول | 60,000 | — | جرد بضاعة أول المدة | يحتاج مراجعة |
| 1500 | الأصول الثابتة | أصول | 220,000 | — | صافي القيمة الدفترية | مطابق |
| 2010 | الموردون (الدائنون) | خصوم | — | 70,000 | أرصدة موردين قائمة | مطابق |
| 2100 | ضريبة القيمة المضافة المستحقة | خصوم | — | 15,000 | رصيد الضريبة المستحقة | مطابق |
| 2500 | قرض بنكي طويل الأجل | خصوم | — | 120,000 | رصيد القرض القائم | مطابق |
| 3000 | رأس المال | حقوق ملكية | — | 320,000 | رأس المال المدفوع | مطابق |
| 3100 | الأرباح المحتجزة | حقوق ملكية | — | 55,000 | أرباح مرحّلة من سنوات سابقة | مطابق |

**Totals**: مدين = 580,000 · دائن = 580,000 · الفرق = 0 → **متوازن** (اعتماد available). (Static values; the page performs no calculation.)

### Fiscal Periods (12 months — fiscal-periods.html), fiscal year 2026 (نشطة, ريال سعودي)

| الشهر | الحالة | مستندات غير مصنفة | قيود غير مرحلة | تقارير غير معتمدة | إجراء |
|-------|--------|-------------------|----------------|-------------------|-------|
| يناير 2026 | مغلقة | 0 | 0 | 0 | فتح بصلاحية |
| فبراير 2026 | مغلقة | 0 | 0 | 0 | فتح بصلاحية |
| مارس 2026 | مغلقة | 0 | 0 | 0 | فتح بصلاحية |
| أبريل 2026 | مغلقة | 0 | 0 | 0 | فتح بصلاحية |
| مايو 2026 | قيد المراجعة | 4 | 2 | 1 | إغلاق شهر |
| يونيو 2026 | مفتوحة | 12 | 8 | 1 | إغلاق شهر |
| يوليو 2026 | مفتوحة | 3 | 1 | 0 | إغلاق شهر |
| أغسطس 2026 | مفتوحة | 0 | 0 | 0 | إغلاق شهر |
| سبتمبر 2026 | مفتوحة | 0 | 0 | 0 | إغلاق شهر |
| أكتوبر 2026 | مفتوحة | 0 | 0 | 0 | إغلاق شهر |
| نوفمبر 2026 | مفتوحة | 0 | 0 | 0 | إغلاق شهر |
| ديسمبر 2026 | مفتوحة | 0 | 0 | 0 | إغلاق شهر |

**Close-modal demo** (مايو 2026): warning + summary "٤ مستندات غير مصنفة · قيدان غير مرحّلين · تقرير غير معتمد".
**Reopen-modal demo** (أبريل 2026): سبب = "تصحيح قيد مصروفات مُدخل بالخطأ"; موافقة مدير = "خالد الرشيدي — مدير الحسابات".
