# Data Model: Data Import Module

Static frontend prototype — all entities are represented as HTML demo data, not real storage.
This document defines the fields, states, and relationships used to author realistic Arabic demo content.

---

## Entity 1: ImportOperation

A single client file-upload event that goes through the import workflow.

| Field | Type | Sample Value | Notes |
|-------|------|--------------|-------|
| id | string | IMP-2026-0041 | Display reference |
| client | string | شركة النور للتجارة | Client company name |
| importType | enum | مبيعات | One of 8 types (see below) |
| fileSource | enum | Excel | Excel / CSV / PDF / نظام محاسبي سابق |
| fileName | string | مبيعات_Q1_2026.xlsx | Uploaded file name |
| period | string | الربع الأول 2026 | Accounting period |
| notes | string | ملفات مستوردة من نظام المحاسبة القديم | Optional accountant notes |
| totalRows | integer | 248 | Total data rows in file |
| readyRows | integer | 235 | Rows with no errors |
| warningRows | integer | 8 | Rows with non-blocking warnings |
| errorRows | integer | 5 | Rows with blocking errors |
| successRows | integer | 235 | Rows successfully imported |
| uploadedBy | string | أحمد الشهري | Accountant name |
| uploadDate | date | 2026-05-14 | |
| status | enum | مكتمل | See states below |

**Import Types** (8 options):
- مبيعات
- مصروفات
- عملاء تجاريون
- موردون
- قيود محاسبية
- أرصدة افتتاحية
- شجرة حسابات
- كشف حساب بنكي

**States**:
- `مسودة` — saved without uploading
- `قيد المعالجة` — file uploaded, being analyzed
- `قيد الربط` — at the mapping step
- `قيد المراجعة` — at the preview step
- `مكتمل` — successfully imported, 0 errors
- `مكتمل مع أخطاء` — imported with some rows skipped
- `فاشل` — import could not complete

---

## Entity 2: ColumnMapping

A single row in the mapping table — linking one source file column to one system field.

| Field | Type | Sample Value | Notes |
|-------|------|--------------|-------|
| sourceColumn | string | Invoice Date | Raw column header from the file |
| sampleValue | string | 2026-01-15 | First non-empty value from that column |
| mappedField | string | تاريخ الفاتورة | System field name (selected from dropdown) |
| isRequired | boolean | true | Whether this field is mandatory for the import type |
| status | enum | مربوط | See states below |

**System Fields for مبيعات import type**:
- تاريخ الفاتورة (required)
- رقم الفاتورة (required)
- اسم العميل (required)
- المبلغ (required)
- الضريبة (required)
- الإجمالي (required)
- وصف البند (optional)
- ملاحظات (optional)

**Mapping Status States**:
- `مربوط` → `.chip.green` — column is mapped to a valid system field
- `غير مربوط` → `.chip.amber` — column is detected but not yet mapped
- `متجاهل` → `.chip.slate` — column deliberately skipped
- `مطلوب — غير مربوط` → `.chip.rose` — required field with no mapping (blocking)

---

## Entity 3: ImportError

A specific data quality issue found in a single row of the imported file.

| Field | Type | Sample Value | Notes |
|-------|------|--------------|-------|
| rowNumber | integer | 47 | Row number in the source file (1-indexed) |
| column | string | المبلغ | The system field name where the error occurred |
| value | string | ١٢٣٫٠٠ج.م | The raw value that caused the error |
| errorType | enum | خطأ مبلغ | See types below |
| errorReason | string | القيمة تحتوي على رمز عملة — يجب أن يكون رقمًا فقط | Arabic description of the problem |
| suggestedAction | string | احذف رمز العملة وأبقِ الرقم فقط | Arabic remediation suggestion |

**Error Types**:
- `خطأ مبلغ` — amount/number format issue → `.chip.rose`
- `خطأ تاريخ` — date format or out-of-range issue → `.chip.amber`
- `حقل مفقود` — required field is blank → `.chip.amber`
- `قيمة مكررة` — duplicate detected → `.chip.slate`

---

## Entity 4: ImportTemplate

A saved column-mapping configuration that can be reused for recurring imports.

| Field | Type | Sample Value | Notes |
|-------|------|--------------|-------|
| id | string | TPL-007 | Internal reference |
| name | string | قالب مبيعات النور | Template display name |
| importType | string | مبيعات | One of the 8 import types |
| clientScope | string | شركة النور للتجارة | Client name, or "عام" for global |
| isGlobal | boolean | false | Global = usable for any client |
| fieldCount | integer | 6 | Number of mapped fields in this template |
| lastUsed | date | 2026-05-10 | Last time this template was applied |
| status | enum | نشط | نشط / معطّل |
| mappings | array | [...] | List of ColumnMapping records |

---

## Entity 5: ImportHistoryRecord

A log entry displayed in the import history table.

| Field | Type | Sample Value | Notes |
|-------|------|--------------|-------|
| id | string | IMP-2026-0041 | Links to the ImportOperation |
| client | string | شركة النور للتجارة | |
| importType | string | مبيعات | |
| fileName | string | مبيعات_Q1_2026.xlsx | |
| totalRows | integer | 248 | |
| successRows | integer | 235 | |
| errorRows | integer | 5 | |
| uploadedBy | string | أحمد الشهري | |
| uploadDate | string | 14 مايو 2026 | Formatted for display |
| status | enum | مكتمل مع أخطاء | ImportOperation status |

---

## Demo Data Inventory

### Import History (5 records for import-history.html)

| ID | العميل | النوع | الملف | الصفوف | الناجح | الأخطاء | من رفع | التاريخ | الحالة |
|----|--------|-------|-------|--------|--------|---------|--------|--------|--------|
| IMP-0041 | شركة النور للتجارة | مبيعات | مبيعات_Q1_2026.xlsx | 248 | 235 | 13 | أحمد الشهري | 14 مايو 2026 | مكتمل مع أخطاء |
| IMP-0040 | مؤسسة السلام للمقاولات | مصروفات | مصروفات_أبريل.csv | 87 | 87 | 0 | سارة المطيري | 10 مايو 2026 | مكتمل |
| IMP-0039 | شركة البيان للخدمات | قيود محاسبية | قيود_2025.xlsx | 1050 | 980 | 70 | خالد الرشيدي | 2 مايو 2026 | مكتمل مع أخطاء |
| IMP-0038 | مجموعة الأفق للاستثمار | أرصدة افتتاحية | أرصدة_افتتاحية.xlsx | 45 | 0 | 45 | أحمد الشهري | 28 أبريل 2026 | فاشل |
| IMP-0037 | شركة النور للتجارة | موردون | موردون_2026.csv | 32 | 32 | 0 | سارة المطيري | 20 أبريل 2026 | مكتمل |

### Error Records (8 records for import-errors.html)

| الصف | العمود | القيمة | النوع | السبب | الإجراء |
|------|--------|--------|-------|-------|---------|
| 47 | المبلغ | ١٢٣٫٠٠ج.م | خطأ مبلغ | القيمة تحتوي على رمز عملة | احذف رمز العملة، أبقِ الرقم فقط |
| 63 | المبلغ | (120,500) | خطأ مبلغ | الأرقام السالبة بين أقواس غير مقبولة | استخدم الإشارة السالبة −120500 |
| 12 | تاريخ الفاتورة | 31/02/2026 | خطأ تاريخ | التاريخ غير موجود (فبراير لا يحتوي 31 يوماً) | صحّح التاريخ إلى 28/02/2026 |
| 89 | تاريخ الفاتورة | Jan-2026 | خطأ تاريخ | صيغة التاريخ غير مدعومة | استخدم الصيغة DD/MM/YYYY |
| 5 | رقم الفاتورة | — | حقل مفقود | حقل مطلوب فارغ | أدخل رقم الفاتورة أو احذف الصف |
| 78 | اسم العميل | — | حقل مفقود | اسم العميل مطلوب لنوع استيراد مبيعات | أدخل اسم العميل أو احذف الصف |
| 101 | رقم الفاتورة | INV-2026-001 | قيمة مكررة | رقم الفاتورة موجود مسبقاً في النظام | تحقق من وجود الفاتورة وأزِل التكرار |
| 134 | الإجمالي | 8500 | خطأ مبلغ | الإجمالي (8,500) لا يتطابق مع المبلغ + الضريبة (9,775) | راجع حساب الضريبة في ملف المصدر |

### Import Templates (4 records for import-templates.html)

| الاسم | النوع | النطاق | آخر استخدام | الحقول | الحالة |
|-------|-------|--------|-------------|--------|--------|
| قالب مبيعات النور | مبيعات | شركة النور للتجارة | 14 مايو 2026 | 6 | نشط |
| قالب مصروفات عام | مصروفات | عام | 10 مايو 2026 | 5 | نشط |
| قالب قيود SAP | قيود محاسبية | عام | 2 مايو 2026 | 8 | نشط |
| قالب موردون قديم | موردون | مؤسسة السلام | 1 مارس 2026 | 4 | معطّل |
