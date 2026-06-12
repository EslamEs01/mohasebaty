# Freeze Audit — Pre-Backend Data Model
## منصة محاسبتي · Spec 012

> Inferred from the **frozen static UI** (37 HTML pages + spec artifacts up through spec 011).
> All field names are technical English; Arabic terms from the UI appear as inline notes where they add precision.
> No backend exists yet — every item here is a forward contract the backend must honor.

---

## Post-Freeze Resolutions

- **Item #1 — Client portal sidebar: ↩️ INTENTIONALLY REVERTED for demo/reviewer access (2026-06-12).**
  The client-only sidebar split (5-link sidebar on the 6 client-portal pages) was **reverted by product
  decision**: this is a static frontend prototype, and the buyer/reviewer needs to explore and test **all
  screens from any page** before backend/RBAC exists. All 37 in-app pages — including the 6 client-portal pages
  (`client-dashboard.html`, `upload-document.html`, `client-documents.html`, `client-document-details.html`,
  `client-reports.html`, `messages.html`) — now use the **full unified sidebar** with correct per-page active
  state. (`index.html` remains the landing/launcher with no sidebar.)
  **Backend note (RBAC — must enforce later):** the underlying business rule still stands — once the backend
  and auth exist, role-based access control MUST restrict navigation so that **client** users see only
  client-facing pages, and **accountant/admin** users see internal accounting/admin pages per their
  permissions. The full-sidebar-everywhere state is a prototype review convenience ONLY. See
  `CLAUDE_FRONTEND_RULES.md` §10 (business rule + prototype exception).
- Items #2 (empty-state rollout) and #3 (reusable error/callout component) remain documented backend-integration
  recommendations; currency reactivity per `TaxProfile` is captured in §2 Backend Assumptions.

---

## 1. Entities

### 1.1 Client (شركة عميل)

**Fields**
- `id` — internal surrogate PK (display: `C-014`)
- `company_name` — اسم الشركة (required)
- `business_type` — نوع النشاط: `تجارة_جملة | تجارة_تجزئة | خدمات | مقاولات | استيراد_وتصدير | توريدات | أخرى`
- `country` — `SA | EG`
- `city` — المدينة
- `address` — العنوان (optional)
- `commercial_registration_number` — السجل التجاري (required)
- `tax_number` — الرقم الضريبي (15-digit for SA starting with 3; ETA UUID for EG) (optional)
- `contract_start_date` — تاريخ بداية التعاقد
- `status` — `نشط | موقوف | يحتاج_متابعة | قيد_التهيئة`
- `currency` — `SAR | EGP`
- `invoice_language` — `ar | en | ar_en`
- `timezone` — `Asia/Riyadh | Africa/Cairo`
- `primary_contact_name` — اسم المسؤول
- `primary_contact_title` — المنصب
- `primary_contact_phone` — رقم الهاتف
- `primary_contact_email` — البريد الإلكتروني
- `primary_contact_role` — `مالك | محرر | مشاهد`
- `assigned_accountant_id` — FK → User
- `review_manager_id` — FK → User (مدير المراجعة)
- `requires_approval_before_posting` — boolean
- `chart_of_accounts_source` — `default | cloned_from_client | uploaded | pending`
- `cloned_from_client_id` — FK → Client (nullable)
- `internal_notes` — ملاحظات للمحاسب (hidden from client)
- `onboarding_status` — `draft | complete`
- `last_document_upload_at` — timestamp

**Relationships**
- has-many Document
- has-many JournalEntry
- has-many BankAccount
- has-many Vendor
- has-many CommercialCustomer
- has-many FiscalPeriod
- has-many OpeningBalance
- has-many VatReturn
- has-many Report
- has-many ImportBatch
- belongs-to User (assigned_accountant)
- belongs-to TaxProfile

**Source pages**
- `pages/client-onboarding.html` (wizard panels 1–8)
- `pages/clients.html` (table + addClientModal + assignAccountantModal)
- `pages/client-profile.html` (hero card + edit modal)

---

### 1.2 TaxProfile

**Fields**
- `id`
- `client_id` — FK → Client
- `country` — `SA | EG`
- `vat_rate_percent` — decimal: `15.00` (SA) or `14.00` (EG)
- `tax_number` — 15-digit SA / ETA ID for EG
- `tax_registration_date` — تاريخ التسجيل الضريبي
- `business_sector` — `تجزئة | جملة | خدمات | مقاولات | استيراد_وتصدير`
- `is_zatca_ready` — boolean (SA)
- `is_eta_ready` — boolean (EG)
- `qr_code_enabled` — boolean (planned, SA)
- `e_invoice_enabled` — boolean (planned, SA)
- `uuid_enabled` — boolean (planned, EG)
- `electronic_signature_enabled` — boolean (planned, EG)
- `current_vat_period_start` — date
- `current_vat_period_end` — date
- `output_vat_account_id` — FK → Account (ضريبة القيمة المضافة - مخرجات, e.g. 2103)
- `input_vat_account_id` — FK → Account (ضريبة القيمة المضافة - مدخلات, e.g. 1203)
- `vat_payable_account_id` — FK → Account (e.g. 2105)
- `sales_account_id` — FK → Account (e.g. 4101)

**Relationships**
- belongs-to Client (one-to-one)
- has-many VatReturn
- has-many TaxDocument

**Source pages**
- `pages/client-onboarding.html` (panel 4)
- `pages/client-tax-settings.html`
- `pages/vat-report.html`

---

### 1.3 Vendor (مورد)

**Fields**
- `id`
- `client_id` — FK → Client (each vendor is scoped to one client)
- `name` — اسم المورد (required)
- `tax_number` — الرقم الضريبي (optional)
- `country` — `SA | EG | AE | KW | QA | …`
- `phone` — الهاتف (required)
- `email` — البريد الإلكتروني (optional)
- `address` — العنوان (optional)
- `notes` — ملاحظات (optional)
- `status` — `نشط | موقوف`
- `is_tax_registered` — خاضع للضريبة (boolean)

**Relationships**
- belongs-to Client
- has-many Document (as vendor on expense invoices)

**Source pages**
- `pages/vendors.html` (table + addVendorModal)

---

### 1.4 CommercialCustomer (عميل تجاري)

**Fields**
- `id`
- `client_id` — FK → Client
- `name` — الاسم (required)
- `tax_number` — الرقم الضريبي (optional)
- `country` — `SA | AE | EG | KW | QA | …`
- `phone` — الهاتف (required)
- `email` — البريد الإلكتروني (optional)
- `address` — العنوان (optional)
- `total_sales_amount` — إجمالي المبيعات (computed)
- `last_invoice_date` — آخر فاتورة (timestamp)
- `status` — `نشط | موقوف`

**Relationships**
- belongs-to Client
- has-many Document (as customer on sales invoices)

**Source pages**
- `pages/commercial-customers.html` (table + addCustomerModal)

---

### 1.5 BankAccount (حساب بنكي)

**Fields**
- `id`
- `client_id` — FK → Client
- `account_name` — اسم الحساب (required)
- `account_type` — `بنك | خزنة | محفظة_إلكترونية`
- `bank_name` — البنك (optional, for type=بنك)
- `account_number_or_iban` — رقم الحساب / IBAN
- `currency` — `SAR | EGP | USD | EUR | AED`
- `opening_balance` — الرصيد الافتتاحي (decimal)
- `last_statement_date` — آخر كشف حساب (date)
- `status` — `نشط | مغلق`
- `gl_account_id` — FK → Account (linked chart-of-accounts entry)

**Relationships**
- belongs-to Client
- has-many BankStatement (imported statements)
- has-many ReconciliationSession

**Source pages**
- `pages/bank-accounts.html` (table + addAccountModal)
- `pages/bank-reconciliation.html`
- `pages/bank-statement-import.html`

---

### 1.6 Document (مستند)

**Fields**
- `id`
- `client_id` — FK → Client
- `reference_number` — رقم المستند (e.g. INV-204, EXP-118, REC-77, PAY-43)
- `document_type` — `فاتورة_مبيعات | فاتورة_مصروفات | سند_قبض | سند_صرف | مستند_ضريبي | كشف_بنكي | أخرى`
- `document_date` — التاريخ
- `amount` — المبلغ (before tax, decimal)
- `tax_amount` — الضريبة (decimal)
- `total_amount` — الإجمالي (decimal)
- `currency` — inherited from Client
- `status` — `قيد_المراجعة | مطلوب_توضيح | تم_التصنيف | مرفوض | تم_الترحيل`
- `rejection_reason` — سبب الرفض (text, nullable)
- `clarification_request_text` — نص طلب التوضيح (text, nullable)
- `clarification_reason` — سبب الطلب: `بيانات_ناقصة | مبلغ_غير_واضح | مرفق_مفقود`
- `category_id` — FK → DocumentCategory (nullable, set on classification)
- `vendor_id` — FK → Vendor (nullable, for expense docs)
- `commercial_customer_id` — FK → CommercialCustomer (nullable, for sales docs)
- `fiscal_period_id` — FK → FiscalPeriod
- `journal_entry_id` — FK → JournalEntry (nullable, set on posting)
- `uploaded_by_user_id` — FK → User
- `reviewed_by_user_id` — FK → User (nullable)
- `file_url` — path/URL of uploaded file (PDF, XLS, etc.)
- `file_name` — original filename
- `uploaded_at` — timestamp
- `classified_at` — timestamp (nullable)
- `posted_at` — timestamp (nullable)
- `is_tax_inclusive` — هل تشمل ضريبة (boolean)
- `tax_rate_percent` — نسبة الضريبة applied (e.g. 14, 15, 0)
- `line_items` — JSON array of {quantity, unit_price, description} (shown in document detail)

**Relationships**
- belongs-to Client
- belongs-to DocumentCategory
- belongs-to Vendor (optional)
- belongs-to CommercialCustomer (optional)
- belongs-to FiscalPeriod
- has-one JournalEntry (generated on posting)
- has-many Message (clarification thread)

**Status state-machine**
```
قيد_المراجعة
  → مطلوب_توضيح  (accountant requests clarification)
  → تم_التصنيف   (accountant classifies)
  → مرفوض        (accountant rejects)
مطلوب_توضيح
  → قيد_المراجعة (client responds / resubmits)
  → مرفوض
تم_التصنيف
  → تم_الترحيل   (accountant posts journal entry)
  → قيد_المراجعة (reopened if period reopened)
مرفوض
  → قيد_المراجعة (client uploads revised doc)
تم_الترحيل       (terminal; reversal only via new JournalEntry)
```

**Source pages**
- `pages/upload-document.html`
- `pages/client-documents.html`
- `pages/accountant-inbox.html`
- `pages/document-review.html` (full review + modals: requestClarificationModal, rejectDocumentModal)
- `pages/client-document-details.html`
- `pages/client-profile.html` (recent documents table)

---

### 1.7 DocumentCategory (تصنيف مستند)

**Fields**
- `id`
- `client_id` — FK → Client (nullable = global/shared category)
- `name` — اسم التصنيف (required)
- `type` — `إيراد | مصروف`
- `linked_account_id` — FK → Account (الحساب المرتبط, nullable)
- `is_tax_applicable` — خاضع للضريبة (boolean)
- `default_tax_rate_percent` — نسبة الضريبة الافتراضية (decimal)
- `is_visible_to_client` — يظهر للعميل (boolean)
- `status` — `نشط | موقوف | يحتاج_مراجعة`

**Relationships**
- belongs-to Client (optional; null = global)
- belongs-to Account (linked_account)
- has-many Document

**Source pages**
- `pages/document-categories.html` (table + addCategoryModal)
- `pages/document-review.html` (classification panel)

---

### 1.8 JournalEntry (قيد محاسبي)

**Fields**
- `id`
- `entry_number` — رقم القيد (e.g. JE-318)
- `client_id` — FK → Client
- `fiscal_period_id` — FK → FiscalPeriod
- `entry_date` — التاريخ
- `description` — الوصف
- `entry_type` — `تلقائي_من_مستند | يدوي | تسوية`
- `status` — `مسودة | مرحّل | يحتاج_مراجعة | ملغي`
- `source_document_id` — FK → Document (nullable, for auto-generated entries)
- `created_by_user_id` — FK → User
- `posted_by_user_id` — FK → User (nullable)
- `posted_at` — timestamp (nullable)
- `reversal_entry_id` — FK → JournalEntry (nullable, for reversal entries)
- `total_debit` — computed from lines
- `total_credit` — computed from lines

**Relationships**
- belongs-to Client
- belongs-to FiscalPeriod
- has-many JournalLine
- belongs-to Document (source, optional)

**Source pages**
- `pages/journal-entries.html` (table + manualEntryModal + confirmPostingModal)

---

### 1.9 JournalLine (بند قيد)

**Fields**
- `id`
- `journal_entry_id` — FK → JournalEntry
- `account_id` — FK → Account
- `debit_amount` — مدين (decimal, 0 if credit line)
- `credit_amount` — دائن (decimal, 0 if debit line)
- `description` — وصف البند (optional)
- `sort_order` — integer

**Relationships**
- belongs-to JournalEntry
- belongs-to Account

**Source pages**
- `pages/journal-entries.html` (entry detail panel showing debit/credit columns)

---

### 1.10 Account (حساب في شجرة الحسابات)

**Fields**
- `id`
- `client_id` — FK → Client (each client has their own COA)
- `code` — كود الحساب (e.g. 5060, required, numeric)
- `name` — اسم الحساب (required)
- `account_type` — `أصول | التزام | حقوق_ملكية | إيراد | مصروف`
- `parent_account_id` — FK → Account (nullable for root accounts)
- `level` — integer (depth in tree: 1=root, 2=category, 3=leaf)
- `status` — `نشط | موقوف`
- `notes` — ملاحظات (optional)
- `is_system_account` — boolean (protected, cannot be deleted)

**Relationships**
- belongs-to Client
- has-many Account (children, self-referential)
- has-many JournalLine
- has-many DocumentCategory (linked)
- has-many OpeningBalance

**Source pages**
- `pages/chart-of-accounts.html` (tree table + edit inline + addAccountModal)
- `pages/opening-balances.html` (account picker)

---

### 1.11 FiscalPeriod (فترة مالية)

**Fields**
- `id`
- `client_id` — FK → Client
- `month` — integer (1–12)
- `year` — integer
- `display_name` — e.g. "مايو 2026"
- `status` — `مفتوحة | قيد_المراجعة | مغلقة`
- `unclassified_document_count` — computed count (shown at close-time warning)
- `unposted_journal_count` — computed count
- `unapproved_report_count` — computed count
- `closed_at` — timestamp (nullable)
- `closed_by_user_id` — FK → User (nullable)
- `reopened_at` — timestamp (nullable)
- `reopen_reason` — text (nullable)
- `reopen_approved_by_user_id` — FK → User (nullable)

**Relationships**
- belongs-to Client
- has-many Document
- has-many JournalEntry
- has-many VatReturn
- has-many Report

**Source pages**
- `pages/fiscal-periods.html` (table + closePeriodModal + reopenPeriodModal)

---

### 1.12 OpeningBalance (رصيد افتتاحي)

**Fields**
- `id`
- `client_id` — FK → Client
- `account_id` — FK → Account
- `as_of_date` — تاريخ بداية التشغيل
- `debit_amount` — مدين (decimal)
- `credit_amount` — دائن (decimal)
- `status` — `مطابق | يحتاج_مراجعة`
- `notes` — ملاحظات (optional)

**Relationships**
- belongs-to Client
- belongs-to Account

**Source pages**
- `pages/opening-balances.html` (table + addBalanceModal + upload modal)

---

### 1.13 ImportBatch (دفعة استيراد)

**Fields**
- `id`
- `client_id` — FK → Client
- `template_id` — FK → ImportTemplate (nullable)
- `file_name` — اسم الملف
- `file_type` — `xlsx | csv`
- `data_type` — نوع الملف: `مبيعات | مصروفات | عملاء_تجاريون | موردون | قيود | أرصدة_افتتاحية | شجرة_حسابات | كشف_بنكي`
- `total_rows` — عدد الصفوف
- `success_rows` — الناجح
- `error_rows` — الأخطاء
- `status` — `مكتمل | مكتمل_مع_أخطاء | فاشل | قيد_المعالجة`
- `uploaded_by_user_id` — FK → User
- `uploaded_at` — timestamp

**Relationships**
- belongs-to Client
- belongs-to ImportTemplate (optional)
- has-many ImportError
- has-many ImportMapping (column mappings used)

**Source pages**
- `pages/data-import.html`
- `pages/import-history.html` (table + uploadDataModal)
- `pages/import-preview.html`

---

### 1.14 ImportError (خطأ استيراد)

**Fields**
- `id`
- `import_batch_id` — FK → ImportBatch
- `row_number` — رقم الصف
- `column_name` — العمود
- `raw_value` — القيمة (original cell content)
- `error_type` — `خطأ_مبلغ | خطأ_تاريخ | حقل_مفقود | قيمة_مكررة | خطأ_عام`
- `error_detail` — سبب الخطأ (text)
- `suggested_action` — الإجراء المقترح
- `resolution` — `تصحيح_يدوي | تجاهل_الصف | إعادة_المحاولة | pending`
- `resolution_note` — ملاحظة (optional)
- `resolved_by_user_id` — FK → User (nullable)

**Relationships**
- belongs-to ImportBatch

**Source pages**
- `pages/import-errors.html` (table + importErrorActionModal)

---

### 1.15 ImportTemplate (قالب استيراد)

**Fields**
- `id`
- `name` — اسم القالب (required)
- `file_type` — `مبيعات | مصروفات | عملاء_تجاريون | موردون | قيود | أرصدة_افتتاحية | شجرة_حسابات | كشف_بنكي`
- `is_global` — هل هو قالب عام (boolean; false = client-specific)
- `client_id` — FK → Client (nullable if global)
- `field_list` — text / JSON (list of mapped field names, newline-separated in UI)
- `last_used_at` — آخر استخدام (date)
- `field_count` — عدد الحقول (computed)
- `status` — `نشط | معطّل`

**Relationships**
- belongs-to Client (optional)
- has-many ImportBatch

**Source pages**
- `pages/import-templates.html` (table + addTemplateModal)

---

### 1.16 ImportMapping (مطابقة حقول)

**Fields**
- `id`
- `import_batch_id` — FK → ImportBatch
- `source_column` — العمود في الملف (original header)
- `sample_value` — مثال من البيانات
- `target_field` — الحقل المقابل في النظام (e.g. `invoice_date`, `reference_number`, `amount`, `tax`, `total`, `description`, `notes`)
- `is_required` — مطلوب (boolean)
- `mapping_status` — `مربوط | غير_مربوط | تجاهل`

**Relationships**
- belongs-to ImportBatch

**Source pages**
- `pages/import-mapping.html`

---

### 1.17 Report (تقرير)

**Fields**
- `id`
- `client_id` — FK → Client
- `fiscal_period_id` — FK → FiscalPeriod
- `report_type` — `ميزان_مراجعة | قائمة_دخل | تقرير_ضريبة | تقرير_إيرادات | تقرير_مصروفات | كشف_حساب_عميل | ملخص_مالي`
- `title` — اسم التقرير
- `status` — `جاهز | قيد_التجهيز | تحتاج_مراجعة | مسودة | معتمد | يحتاج_مستندات`
- `generated_by_user_id` — FK → User
- `generated_at` — timestamp
- `approved_by_user_id` — FK → User (nullable)
- `approved_at` — timestamp (nullable)
- `approval_notes` — ملاحظة اعتماد (text, nullable)
- `document_filter` — `مصنفة_فقط | مرحلة_فقط | تشمل_غير_مصنفة`
- `file_url` — URL for generated PDF/Excel (nullable until generated)
- `client_request_notes` — ملاحظات طلب التقرير من العميل (text, nullable)

**Relationships**
- belongs-to Client
- belongs-to FiscalPeriod

**Source pages**
- `pages/reports.html` (accountant: table + approveReportModal + exportConfirmModal)
- `pages/client-reports.html` (client view: filtered list + request form)
- `pages/admin-financial-dashboard.html`

---

### 1.18 VatReturn (إقرار ضريبة القيمة المضافة)

**Fields**
- `id`
- `client_id` — FK → Client
- `tax_profile_id` — FK → TaxProfile
- `fiscal_period_id` — FK → FiscalPeriod
- `country` — `SA | EG`
- `period_type` — `شهري | ربع_سنوي`
- `period_start` — date
- `period_end` — date
- `sales_pre_tax` — إجمالي المبيعات قبل الضريبة (decimal)
- `sales_tax` — ضريبة المبيعات (decimal)
- `sales_total` — إجمالي المبيعات (decimal)
- `purchases_pre_tax` — إجمالي المشتريات قبل الضريبة (decimal)
- `purchases_tax` — ضريبة المشتريات (decimal)
- `purchases_total` — decimal
- `net_vat_due` — صافي الضريبة المستحقة (decimal)
- `status` — `مسودة | مكتمل | يحتاج_مراجعة | تنبيه | معتمد`
- `document_count` — عدد المستندات المشمولة
- `approved_by_user_id` — FK → User (nullable)
- `approved_at` — timestamp (nullable)

**Relationships**
- belongs-to Client
- belongs-to TaxProfile
- belongs-to FiscalPeriod

**Source pages**
- `pages/vat-report.html` (SA and EG sections)

---

### 1.19 TaxDocument (مستند ضريبي)

**Fields**
- `id`
- `client_id` — FK → Client
- `tax_profile_id` — FK → TaxProfile
- `reference_number` — رقم المستند
- `document_type` — `فاتورة_ضريبية | مستند_دعم | إقرار`
- `document_date` — التاريخ
- `amount` — المبلغ قبل الضريبة
- `tax_amount` — الضريبة
- `total_amount` — الإجمالي
- `issue_type` — `رقم_ضريبي_مفقود | غير_مصنف | يحتاج_فاتورة_ضريبية | ضريبة_غير_مطابقة`
- `status` — `يحتاج_مراجعة | مطلوب_توضيح | مكتمل`

**Relationships**
- belongs-to Client
- belongs-to TaxProfile

**Source pages**
- `pages/tax-documents.html`

---

### 1.20 ApprovalWorkflow (سير الاعتماد — rule)

**Fields**
- `id`
- `rule_name` — اسم القاعدة (required)
- `operation_type` — نوع العملية: `اعتماد_مستند | ترحيل_القيود | اعتماد_تقرير_VAT | إغلاق_فترة_مالية | إعادة_فتح_فترة_مغلقة`
- `condition_expression` — الشرط المالي (text, e.g. "المبلغ أكبر من 10,000 ﷼")
- `first_reviewer_role` — المراجع الأول (role label)
- `final_approver_role` — المعتمد النهائي (role label)
- `status` — `مفعّلة | معطّلة | يحتاج_إكمال`
- `global_toggles` — JSON: `{require_approval: bool, require_review_before_post: bool, period_lock_on_close: bool}`

**Relationships**
- polymorphic — applies to Document, JournalEntry, Report, FiscalPeriod (by operation_type)

**Source pages**
- `pages/approval-workflow.html` (rules table + addRuleModal + approveReportModal)

---

### 1.21 AuditLogEntry (سجل تدقيق)

**Fields**
- `id`
- `occurred_at` — الوقت (timestamp)
- `user_id` — FK → User
- `user_role` — الدور (snapshot at time of action)
- `action` — الإجراء (e.g. "تصنيف فاتورة", "تعديل نسبة الضريبة", "اعتماد تقرير VAT", "إغلاق فترة مايو", "ترحيل قيد", "رفع ملف جديد", "رفض مستند", "فشل استيراد ملف")
- `sensitivity` — `عادي | حساس | اعتماد | فشل`
- `client_id` — FK → Client (nullable for system-level actions)
- `entity_type` — العنصر المرتبط type (e.g. "Document", "JournalEntry", "FiscalPeriod", "TaxProfile")
- `entity_id` — entity PK
- `entity_display` — human-readable label snapshot
- `before_state` — JSON snapshot (nullable)
- `after_state` — JSON snapshot (nullable)
- `ip_address` — عنوان IP

**Relationships**
- belongs-to User

**Source pages**
- `pages/audit-log.html` (table with before/after detail panel + exportConfirmModal)

---

### 1.22 Notification (إشعار)

**Fields**
- `id`
- `recipient_user_id` — FK → User
- `title` — عنوان الإشعار
- `body` — نص الإشعار (optional detail)
- `notification_type` — `مستند_جديد | مطلوب_توضيح | عميل_جديد | تأخر_رفع | اعتماد_مطلوب | فشل_نظام | عميل_بدون_محاسب | تقرير_جاهز`
- `severity` — `info | warning | error`
- `is_read` — boolean
- `read_at` — timestamp (nullable)
- `related_entity_type` — nullable
- `related_entity_id` — nullable FK
- `created_at` — timestamp
- `notification_preferences` — per-user settings JSON: {email_enabled, in_app_enabled, sms_enabled}

**Relationships**
- belongs-to User (recipient)

**Source pages**
- `pages/notifications.html`
- Header bell widget across all pages

---

### 1.23 User (مستخدم)

**Fields**
- `id`
- `full_name` — الاسم (required)
- `email` — البريد الإلكتروني (required, unique)
- `phone` — رقم الهاتف
- `phone_country_code` — `+966 | +20`
- `user_type` — `داخلي | عميل`
- `role` — `مدير_النظام | مدير_محاسبة | محاسب | مسؤول_شركة | مستخدم_رفع_مستندات`
- `status` — `نشط | موقوف | دعوة_مرسلة`
- `linked_client_id` — FK → Client (nullable; populated for user_type=عميل)
- `last_login_at` — آخر دخول (timestamp)
- `created_at` — timestamp

**Role permission summary (inferred from UI)**
- `مدير_النظام` — صلاحيات كاملة (all pages)
- `مدير_محاسبة` — صلاحيات موسّعة (can close periods, approve, assign accountants)
- `محاسب` — صلاحيات محاسبية (review, classify, post journal entries)
- `مسؤول_شركة` / `مالك` — صلاحيات العميل (upload docs, view own reports, messages)
- `مستخدم_رفع_مستندات` — صلاحيات محدودة (upload only)

**Relationships**
- has-many Client (as assigned_accountant)
- has-many Document (uploaded_by, reviewed_by)
- has-many JournalEntry (created_by, posted_by)
- has-many AuditLogEntry
- has-many Notification

**Source pages**
- `pages/users-permissions.html` (table + addUserModal + permission matrix)

---

### 1.24 ReconciliationSession (جلسة تسوية بنكية)

**Fields**
- `id`
- `client_id` — FK → Client
- `bank_account_id` — FK → BankAccount
- `period_label` — e.g. "الربع الثاني 2026"
- `period_start` — date
- `period_end` — date
- `opening_book_balance` — decimal
- `closing_book_balance` — decimal
- `statement_balance` — decimal
- `difference` — decimal (should be 0 when reconciled)
- `status` — `متطابق | غير_متطابق | قيد_المراجعة`
- `created_by_user_id` — FK → User

**Relationships**
- belongs-to Client
- belongs-to BankAccount
- has-many BankStatement (transactions matched in session)

**Source pages**
- `pages/bank-reconciliation.html`

---

### 1.25 BankStatement (معاملة كشف بنكي)

**Fields**
- `id`
- `bank_account_id` — FK → BankAccount
- `import_batch_id` — FK → ImportBatch (nullable; populated if imported via file)
- `transaction_date` — التاريخ
- `description` — الوصف
- `amount` — المبلغ (positive)
- `transaction_type` — `إيداع | سحب | رسوم`
- `reconciliation_status` — `مطابق_تلقائيًا | يحتاج_مراجعة | غير_مطابق | مطابق_يدويًا`
- `matched_document_id` — FK → Document (nullable)
- `match_confidence_percent` — integer (shown as chip: 98%, 92%, 64%, 41%)
- `reconciliation_session_id` — FK → ReconciliationSession (nullable)

**Relationships**
- belongs-to BankAccount
- belongs-to ImportBatch (optional)
- belongs-to Document (matched, optional)

**Source pages**
- `pages/bank-reconciliation.html` (transactions table + match panel)
- `pages/bank-statement-import.html`

---

### 1.26 Message / Clarification (رسالة / توضيح)

**Fields**
- `id`
- `document_id` — FK → Document
- `sender_user_id` — FK → User
- `sender_type` — `accountant | client`
- `body` — نص الرسالة
- `sent_at` — timestamp
- `quick_reply_chip` — nullable text (برجاء رفع نسخة أوضح / تم استلام المستند / etc.)
- `status` — `مطلوب_رد_من_العميل | مقروء | مرسل`
- `thread_id` — groups messages on same document together (can equal document_id)

**Relationships**
- belongs-to Document
- belongs-to User (sender)

**Source pages**
- `pages/messages.html` (chat pane with conversation list + active thread)

---

## 2. Backend Assumptions (behaviors the UI implies)

### 2.1 Authentication & Authorization
- Session-based or JWT auth; roles map to the 5 tiers shown in `users-permissions.html`
- Row-level scoping: every accountant-side query must filter by `client_id`; client-side users only see their own `client_id`
- Invitation flow: creating a User with `status=دعوة_مرسلة` triggers an email invite; no direct password creation in UI
- The logged-in user (`كريم العمري / مدير المكتب` in admin; `أحمد محمود / محاسب أول` in accountant pages) must be derivable from auth token

### 2.2 Document Status State-Machine
Strict backend enforcement of the five states:
1. `قيد_المراجعة` — initial state on upload
2. `مطلوب_توضيح` — set by accountant calling `POST /documents/:id/request-clarification`; triggers Notification + Message to client
3. `تم_التصنيف` — set by accountant after assigning category + accounts; generates pending JournalEntry (status=مسودة)
4. `مرفوض` — set by accountant via reject action; rejection_reason required; notifies client; client may re-upload
5. `تم_الترحيل` — set when associated JournalEntry transitions to `مرحّل`; period must be `مفتوحة`; triggers AuditLogEntry

Transitions not in the diagram above must be rejected with HTTP 422.

### 2.3 Journal Posting & Reversal
- Posting (`مرحّل`) is irreversible directly; a reversal requires creating a new JournalEntry with `reversal_entry_id` pointing back
- Backend must validate debit sum == credit sum before allowing posting; UI shows "متوازن" chip
- Posted entries are locked: no field edits allowed; only reversal path visible
- Manual entries (`entry_type=يدوي`) go through the same `مسودة → مرحّل` transition
- `confirmPostingModal` must call `POST /journal-entries/:id/post`

### 2.4 Period Close / Reopen Locking
- Closing a FiscalPeriod (`status → مغلقة`) blocks: new documents in that period, new journal entries, and modification of existing ones
- Close requires all documents classified, all journal entries posted, all reports approved (UI shows count warnings in `closePeriodModal`)
- Reopening requires explicit `reopen_reason` text + `reopen_approved_by_user_id`; creates AuditLogEntry with sensitivity=`اعتماد`
- API: `POST /fiscal-periods/:id/close` and `POST /fiscal-periods/:id/reopen`

### 2.5 VAT Calculation per Profile
- SA profile: VAT rate = 15%; currency = SAR; ZATCA compliance fields planned
- EG profile: VAT rate = 14%; currency = EGP; ETA compliance fields planned
- `vat_amount = amount * (tax_rate_percent / 100)` computed server-side; client may not override
- VatReturn aggregates all Documents within a FiscalPeriod by type (sales / purchases) and sums pre-tax, tax, total
- Backend validates that document-level tax matches the client's TaxProfile rate unless explicitly marked exempt (0%)

### 2.6 Import Validation Pipeline
Multi-step, server-side:
1. File upload (`POST /import-batches`) — store file, create ImportBatch with `status=قيد_المعالجة`
2. Column mapping (`POST /import-batches/:id/mapping`) — creates ImportMapping rows
3. Preview validation (`GET /import-batches/:id/preview`) — returns sample rows and field status
4. Commit (`POST /import-batches/:id/commit`) — processes all rows; creates ImportError rows for failed rows; updates ImportBatch status
5. Error resolution (`PATCH /import-errors/:id`) — sets resolution action; `تصحيح_يدوي` requires corrected value

Validation rules enforced: required fields present, amount format numeric, date parseable, no duplicate reference_numbers within client scope, debit+credit balance for journal entries.

### 2.7 Approval Workflow
- ApprovalWorkflow rules are evaluated at trigger points (document classification, journal posting, report generation, period close)
- If a matching rule exists and `status=مفعّلة`, the operation creates an approval request that must be confirmed by the designated role
- `approveReportModal` submits `POST /reports/:id/approve` with optional `approval_notes`
- `rejectDocumentModal` submits `POST /documents/:id/reject` with required `rejection_reason`
- `requestClarificationModal` submits `POST /documents/:id/request-clarification` with `text` + optional `reason`

### 2.8 Audit Logging
- Every state-changing action must produce an AuditLogEntry synchronously
- Sensitive actions (tax rate changes, period reopen, account edits) must capture `before_state` + `after_state` snapshots
- Failed system actions (import failure, email send failure) must also be logged with `sensitivity=فشل`
- The audit log is append-only; no DELETE endpoint
- IP address must be captured from the request context

### 2.9 Notifications
- Push model: server creates Notification rows on trigger events (document upload, clarification request, new client, late upload, approval needed)
- Bell widget polls or receives push; shows unread count badge
- `is_read` updated via `PATCH /notifications/:id` or `POST /notifications/mark-all-read`
- Notification preferences per user (email, in-app) stored in User model or separate table

### 2.10 File Upload & Storage
- Accepted formats vary by context: documents (PDF, XLS, XLSX, images); import data (XLSX, CSV); bank statements (PDF, XLS)
- Max file size: 10 MB (shown in onboarding dropzones)
- Files stored with a stable URL returned in `file_url`; backend must handle multipart/form-data
- File names sanitized; original name preserved in `file_name` field for display
- Document files linked 1-to-1 with Document entity; import files linked to ImportBatch

### 2.11 Export Generation
- Reports and data tables offer PDF / Excel / CSV export via `exportConfirmModal`
- Backend generates file server-side and returns a download URL or streams the file
- Export scope determined by currently active filters (period, client, status)
- Client-facing pages (`client-reports.html`) use simplified export (no internal accounting labels)

### 2.12 Chart of Accounts Initialization
- On `chart_of_accounts_source=default`, backend seeds the client's account tree from a country-specific template (SA: ~30 accounts shown in UI; EG: similar)
- On `cloned_from_client_id`, backend deep-copies the source client's account tree
- On `uploaded`, the COA import goes through the import pipeline with `data_type=شجرة_حسابات`
- Account codes must be unique within a client's COA; `is_system_account` entries protected from deletion

### 2.13 Reconciliation Matching
- Auto-matching algorithm: compare BankStatement amount + date against Document amounts; set `match_confidence_percent`
- Thresholds: ≥90% → `مطابق_تلقائيًا`; 50–89% → `يحتاج_مراجعة`; <50% → `غير_مطابق`
- Manual match: `POST /bank-statements/:id/match` with `document_id`
- Reconciliation session closes when `difference = 0` (book balance == statement balance)

---

## 3. Cross-Entity Invariants

| Rule | Entities involved |
|------|-------------------|
| A Document can only be posted into an open FiscalPeriod | Document, FiscalPeriod |
| JournalEntry debit total must equal credit total before posting | JournalEntry, JournalLine |
| OpeningBalance debit total must equal credit total (shown as "متوازن" KPI) | OpeningBalance |
| A Client must have a TaxProfile before VatReturn can be generated | Client, TaxProfile, VatReturn |
| FiscalPeriod can only close when unclassified_document_count = 0 AND unposted_journal_count = 0 AND unapproved_report_count = 0 | FiscalPeriod, Document, JournalEntry, Report |
| A BankAccount must have a linked gl_account_id (Account) for reconciliation to be valid | BankAccount, Account |
| ImportTemplate fields list must match the ImportMapping target_field values used in an ImportBatch | ImportTemplate, ImportMapping |
| Reversal JournalEntry must reference the original entry via reversal_entry_id and have equal but inverted lines | JournalEntry, JournalLine |
