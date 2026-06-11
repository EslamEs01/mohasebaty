# Data Model: Client Reports View (Spec 011)

Static frontend prototype — all entities are HTML demo data; no enforcement/persistence. **Client-facing**: simple language, no accounting internals. Figures realistic but fictional; estimates labelled "تقديري". Currency ﷼ (Saudi-first).

---

## Entity 1: ClientReport (تقرير)

| Field | Type | Sample | Notes |
|-------|------|--------|-------|
| name | string | ملخص مايو المالي | اسم التقرير |
| period | string | مايو 2026 | الفترة |
| status | enum | معتمد | مبدئي `.chip.amber` / معتمد `.chip.green` / يحتاج مستندات `.chip.slate` |
| updated | string | 2 يونيو 2026 | آخر تحديث |
| action | enum | تحميل | تحميل (معتمد/مبدئي) / رفع المستندات (يحتاج مستندات → upload-document.html) |

---

## Entity 2: SummaryFigure (ملخص)

| Field | Type | Sample | Notes |
|-------|------|--------|-------|
| label | string | إجمالي الإيرادات المرفوعة | .kpi-lbl |
| amount | string | 512,000 ﷼ | .kpi-num |
| help | string | من مستنداتك المرفوعة | .kpi-help |
| isEstimate | bool | false | when true, help text says "تقديري" |

---

## Entity 3: ReportRequest (طلب تقرير)

| Field | Type | Sample | Notes |
|-------|------|--------|-------|
| reportType | enum | ملخص مالي | نوع التقرير (select) |
| period | enum | هذا الشهر | الفترة (select) |
| notes | string | (free text) | ملاحظات (textarea) |

---

## Demo Data Inventory

### Summary cards (5 — client-reports.html)

| البطاقة | الرقم | المساعدة (kpi-help) | الأيقونة | تقديري؟ |
|---------|------|----------------------|----------|---------|
| إجمالي الإيرادات المرفوعة | 512,000 ﷼ | من مستنداتك المرفوعة لهذه الفترة | green | لا |
| إجمالي المصروفات المرفوعة | 318,500 ﷼ | من مستنداتك المرفوعة لهذه الفترة | amber | لا |
| صافي تقديري | 193,500 ﷼ | تقديري — قد يتغير بعد المراجعة | primary | نعم |
| الضريبة التقديرية | 29,025 ﷼ | تقديري حتى اعتماد التقرير | slate | نعم |
| مستندات قيد المراجعة | 12 | يراجعها فريق المحاسبة الآن | amber | — |

### Reports table (4+ rows — client-reports.html), columns: اسم التقرير، الفترة، الحالة، آخر تحديث، إجراء

| اسم التقرير | الفترة | الحالة | آخر تحديث | إجراء |
|-------------|--------|--------|-----------|-------|
| ملخص مايو المالي | مايو 2026 | معتمد | 2 يونيو 2026 | تحميل |
| تقرير الضريبة المبدئي | الربع الثاني 2026 | مبدئي | 9 يونيو 2026 | تحميل |
| تقرير المصروفات | مايو 2026 | معتمد | 1 يونيو 2026 | تحميل |
| تقرير الإيرادات | مايو 2026 | يحتاج مستندات | 8 يونيو 2026 | رفع المستندات |
| ملخص أبريل المالي | أبريل 2026 | معتمد | 4 مايو 2026 | تحميل |

### Status explanations (3)
- **مبدئي** (`.chip.amber`) → "قد يتغير بعد مراجعة المستندات."
- **معتمد** (`.chip.green`) → "تمت مراجعته من فريق المحاسبة."
- **يحتاج مستندات** (`.chip.slate`) → "هناك مستندات مطلوبة لاستكمال التقرير."

### Tax note (`.note`)
"الأرقام الضريبية تقديرية حتى اعتماد التقرير من فريق المحاسبة."

### Request-report card fields
- نوع التقرير (select): ملخص مالي / تقرير ضريبة / تقرير مصروفات / تقرير إيرادات
- الفترة (select): هذا الشهر / الشهر الماضي / الربع الحالي / حسب الطلب
- ملاحظات (textarea): free text
- زر: إرسال الطلب (`.btn.btn-primary`)

### Forbidden content (client portal — must NOT appear)
مدين، دائن، شجرة الحسابات، قيد محاسبي / قيود، ترحيل، رقم حساب / أرقام حسابات (41xx, 51xx), ملاحظات داخلية. (Verified by quickstart check k.)
