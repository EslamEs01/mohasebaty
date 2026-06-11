# Data Model: Modals & Cross-Page Actions Completion (Spec 012)

No backend, no persistence. The "data model" here is the **catalog of modal components**, their static fields/details, their triggers, and the **action-resolution taxonomy**. Every field below is authored as static HTML (FR-009); demo values are realistic Arabic per `CLAUDE_FRONTEND_RULES.md §24`.

## Entity A — Modal (shared shape)

Every modal (existing or new) is an instance of the shared shell with these required parts (FR-008):

| Part | Markup | Required |
|------|--------|----------|
| Overlay | `.scrim[data-overlay][hidden]` | ✅ |
| Dialog card | `.modal[role="dialog"][aria-modal="true"][aria-labelledby=…]` | ✅ |
| Title | `.modal-head > h3[id]` | ✅ |
| Close (X) | `.modal-head > .icon-btn[data-close][aria-label="إغلاق"]` | ✅ |
| Short description | first child of `.modal-body` (a `.modal-sub`/`<p>`/`.tip` line) | ✅ |
| Body | `.modal-body` — form fields **or** confirmation details | ✅ |
| Primary action | `.modal-foot > .btn.btn-primary` or `.btn.btn-amber` | ✅ |
| Secondary cancel | `.modal-foot > .btn.btn-outline[data-close]` | ✅ |

Trigger: any element with `data-open="#<modalId>"`. Close paths (all via existing JS): X, cancel, scrim click, Escape.

## Entity B — The 16 named modals

### B-existing (9) — reuse unchanged

| # | Modal id | Owner page | Type | Trigger label |
|---|----------|-----------|------|---------------|
| 1 | `addClientModal` | clients.html | form | + عميل جديد |
| 2 | `addVendorModal` | vendors.html | form | + مورّد جديد |
| 3 | `addCustomerModal` | commercial-customers.html | form | + عميل تجاري |
| 4 | `addAccountModal` | bank-accounts.html | form | + حساب بنكي |
| 5 | `addCategoryModal` | document-categories.html | form | + تصنيف مستند |
| 9 | `closePeriodModal` | fiscal-periods.html | confirm | إغلاق الفترة |
| 10 | `reopenPeriodModal` | fiscal-periods.html | confirm | إعادة فتح الفترة |
| 15 | `addUserModal` | users-permissions.html | form | + مستخدم جديد |
| 16 | `manualEntryModal` | journal-entries.html | form | + قيد يدوي |

### B-new (7) — build per `contracts/page-contracts.md#C1`

#### 6. `requestClarificationModal` — document-review.html (warning)
- **Description**: «أرسل طلب توضيح للعميل بخصوص هذا المستند — سيظهر للعميل كرسالة بحالة "مطلوب توضيح".»
- **Body**: detail `.set-row` (المستند: INV-204 · العميل: شركة النور للتجارة) + `.field`>`<textarea class="input">` (نص الطلب، required) + optional `.select-wrap` (سبب: بيانات ناقصة / مبلغ غير واضح / مرفق مفقود).
- **Primary**: «إرسال الطلب» `.btn-amber` · **Cancel**: «إلغاء».

#### 7. `rejectDocumentModal` — document-review.html (destructive/warning)
- **Description**: «رفض المستند يمنع ترحيله ويُعلِم العميل بالسبب. يمكن للعميل إعادة الرفع.»
- **Body**: amber `.tip` consequence line + detail `.set-row` (المستند/العميل) + `.field`>`<textarea class="input">` (سبب الرفض، required).
- **Primary**: «تأكيد الرفض» `.btn-amber` · **Cancel**: «تراجع».

#### 8. `approveReportModal` — reports.html (+ approval-workflow.html) (positive)
- **Description**: «اعتماد التقرير يجعله نهائيًا وجاهزًا للمشاركة مع العميل.»
- **Body**: detail `.set-body` (التقرير: قائمة الدخل — مايو 2026 · الحالة الحالية: مسودة · المُعد: أحمد محمود) + optional `.field` ملاحظة اعتماد.
- **Primary**: «اعتماد التقرير» `.btn-primary` · **Cancel**: «إلغاء».

#### 11. `confirmPostingModal` — journal-entries.html (positive, accountant)
- **Description**: «تأكيد ترحيل القيد — بعد الترحيل لا يمكن تعديله إلا بقيد عكسي.»
- **Body**: amber `.tip` (الترحيل نهائي) + detail `.set-body` (القيد: JE-318 · مدين/دائن متوازن: 12,500 / 12,500 ج.م · الفترة: مايو 2026) + balance `.chip green` «متوازن».
- **Primary**: «تأكيد الترحيل» `.btn-primary` · **Cancel**: «إلغاء». *(Accountant portal — debit/credit allowed, Principle V.)*

#### 12. `uploadDataModal` — import-history.html (upload)
- **Description**: «ارفع ملف بيانات جديد (Excel/CSV) لتجهيزه للمراجعة والاستيراد.»
- **Body**: `.field` (العميل — `.select-wrap`) + `.upload` drop-zone (اسحب الملف هنا · `.browse` «اختيار ملف») + accepted-types helper «XLSX, CSV حتى 10MB».
- **Primary**: «رفع ومتابعة» `.btn-primary` · **Cancel**: «إلغاء».

#### 13. `importErrorActionModal` — import-errors.html (choice/confirm)
- **Description**: «اختر كيفية معالجة الصف الذي به خطأ في الاستيراد.»
- **Body**: detail `.set-row` (الصف 42 · الخطأ: رقم ضريبي غير صحيح) + `.seg` choices («تصحيح يدوي» / «تجاهل الصف» / «إعادة المحاولة») + `.field` ملاحظة + conditional amber `.tip` for «تجاهل الصف».
- **Primary**: «تطبيق الإجراء» `.btn-primary` · **Cancel**: «إلغاء».

#### 14. `assignAccountantModal` — clients.html (+ client-profile.html) (form)
- **Description**: «أسند محاسبًا مسؤولًا لهذا العميل لمتابعة مستنداته وتقاريره.»
- **Body**: detail `.set-row` (العميل: مؤسسة السلام للمقاولات) + `.field` (المحاسب — `.select-wrap`: أحمد محمود / منى حسن / محمد عبد الله / سارة علي / خالد عمر) + `.field` ملاحظة (optional).
- **Primary**: «إسناد المحاسب» `.btn-primary` · **Cancel**: «إلغاء».

## Entity C — Export confirmation (reusable)

| Field | Markup | Notes |
|-------|--------|-------|
| id | `exportConfirmModal` | one per export-bearing page (separate files, same id OK) |
| Description | `.modal-sub`/`<p>` | «اختر صيغة التصدير لتحميل البيانات الحالية.» |
| Scope summary | `.set-row` | e.g. «النطاق: مايو 2026 · 128 صفًا» |
| Format picker | `.seg` or `.select-wrap` | PDF / Excel / CSV |
| Primary | `.btn-primary` «تصدير» | no real file op (FR-006) |
| Success | static `.toast` «تم تجهيز الملف للتنزيل» | optional, reuses existing `.toast` |
| Cancel | `.btn-outline[data-close]` «إغلاق» | |

Client-facing pages (`client-reports.html`, `client-dashboard.html`) use a **simplified** export confirmation — no accounting wording (Principle V).

## Entity D — Action-resolution taxonomy (cross-page sweep)

Every **major** action (verbs of FR-003) resolves to exactly one outcome:

| Verb(s) | Resolution | Example target |
|---------|-----------|----------------|
| عرض / فتح / مراجعة | navigate to real page | `document-review.html`, `client-document-details.html`, `client-profile.html` |
| إضافة / جديد | `data-open` create modal | `#addClientModal`, `#addVendorModal`, … |
| إسناد | `data-open="#assignAccountantModal"` | clients/client-profile |
| تعديل | reuse add modal as edit (open same modal) **or** navigate to detail | `#addClientModal` / `client-profile.html` |
| اعتماد | `data-open="#approveReportModal"` | reports/approval-workflow |
| رفض | `data-open="#rejectDocumentModal"` | document-review |
| طلب توضيح | `data-open="#requestClarificationModal"` | document-review |
| تأكيد الترحيل / ترحيل | `data-open="#confirmPostingModal"` | journal-entries |
| إغلاق / إعادة فتح (فترة) | `data-open="#closePeriodModal"` / `#reopenPeriodModal` | fiscal-periods |
| تصدير | `data-open="#exportConfirmModal"` | any export page |
| رفع | upload modal (`#uploadDataModal`) or upload page (`data-import.html`) | import-history / data-import |
| (future, no destination) | disabled / "قريباً" control | — |

**Minor** links (pagination, sort toggles, self-breadcrumb, JS dropdown/user-menu/tab/notification triggers): not forced to navigate, but MUST NOT look broken or produce a dead click.

## Validation rules (frontend-only)

- Required fields show `.req` marker but are **not** enforced (no JS validation, no submit).
- Primary action on create/confirm modals closes the modal (and may show the static `.toast`); it does not persist.
- Each modal independent: opening one never reveals/affects another (FR-014).
- Every modal closable via X, cancel, scrim, Escape (FR-012).
