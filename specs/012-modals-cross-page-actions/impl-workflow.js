export const meta = {
  name: 'spec-012-modals-impl',
  description: 'Implement Spec 012 modals & cross-page actions across 9 disjoint page groups',
  phases: [
    { title: 'Design', detail: 'Opus designs the reusable export-confirm modal (2 variants)' },
    { title: 'Implement', detail: '9 Sonnet agents, one per disjoint page group — modals + nav + export' },
    { title: 'Verify', detail: 'Sonnet grep audit + Opus design-consistency review' },
  ],
}

/* ----------------------------- Phase 1: Design ---------------------------- */
phase('Design')

const EXPORT_SCHEMA = {
  type: 'object',
  required: ['accountantMarkup', 'clientMarkup', 'notes'],
  additionalProperties: false,
  properties: {
    accountantMarkup: { type: 'string', description: 'Full paste-ready <div class="scrim" ...>...</div> accountant variant' },
    clientMarkup: { type: 'string', description: 'Full paste-ready simplified client variant' },
    notes: { type: 'string' },
  },
}

const design = await agent(
  `You are a senior Arabic RTL design-system engineer working on the Mohasebaty accounting prototype.
Design ONE reusable "export confirmation" modal in TWO variants: an ACCOUNTANT variant and a SIMPLIFIED CLIENT variant.

First READ to use ONLY existing classes and match the approved look exactly:
- pages/fiscal-periods.html → the #closePeriodModal block (the canonical confirmation-modal shell).
- pages/clients.html → the #addClientModal block (form controls: .field, .select-wrap, .seg).
- assets/css/input.css and assets/css/output.css → confirm class names (.scrim, .modal, .modal-head, .modal-body, .modal-foot, .icon-btn, .set-body, .set-row, .info, .ctrl, .seg, .select-wrap, .toast, .chip, .btn-primary, .btn-outline). Use the exact close-button SVG used in #closePeriodModal head.

Requirements for BOTH variants (static HTML, RTL Arabic, zero new CSS, no <script>):
- id="exportConfirmModal" on the .scrim (data-overlay, hidden, role=dialog, aria-modal=true, aria-labelledby).
- All 7 parts: overlay; .modal; .modal-head with <h3 id="exportConfirmTitle"> + .icon-btn[data-close][aria-label="إغلاق"] X; a short description line at the TOP of .modal-body; a body; .modal-foot with a primary button + a cancel button.
- Body: short description; a scope summary using .set-body/.set-row (e.g. «النطاق: مايو 2026» · «عدد السجلات: ١٢٨»); a format picker using .seg with three <button type="button"> options (PDF / Excel / CSV) one carrying .active; optionally a static .toast hint line.
- Foot: primary «تصدير» as <button class="btn btn-primary" type="button"> (NON-functional, no handler) + cancel «إغلاق» as <button class="btn btn-outline" type="button" data-close>.
- ACCOUNTANT variant: professional, may reference data scope / report period.
- CLIENT variant: SIMPLE wording (e.g. head «تحميل تقريرك», description in plain language), NO accounting terms (no مدين/دائن/قيد/ترحيل/حسابات), keep the same shell and classes.

Return COMPLETE paste-ready markup for each variant (the entire <div class="scrim" ...> … </div>). Do NOT write to any file — return the markup only.`,
  { model: 'opus', label: 'design:export-modal', phase: 'Design', schema: EXPORT_SCHEMA }
)

const EXPORT_ACC = design ? design.accountantMarkup : ''
const EXPORT_CLI = design ? design.clientMarkup : ''

/* --------------------------- Phase 2: Implement --------------------------- */
phase('Implement')

const BASE = `You are implementing Spec 012 (Modals & Cross-Page Actions Completion) for the Mohasebaty Arabic RTL accounting prototype. Work ONLY on YOUR assigned files. Other agents handle other files concurrently — never touch a file outside your list.

HARD RULES (non-negotiable):
- Static HTML only. ZERO new CSS: every class you use MUST already exist in assets/css/output.css. Do NOT edit assets/css/input.css, assets/css/output.css, or assets/js/main.js. No Tailwind rebuild.
- ZERO new JS. Modals open/close via the EXISTING initOverlays(): triggers use data-open="#modalId"; close controls use data-close. No <script>, no inline onclick, no JS-generated content.
- Arabic only, RTL. Professional financial-SaaS wording. Realistic Arabic demo data (شركة النور للتجارة، مؤسسة السلام للمقاولات، أحمد محمود، منى حسن، محمد عبد الله، سارة علي، خالد عمر; docs INV-204/EXP-118/JE-318; amounts like 12,500 ج.م).
- DO NOT edit/restyle the 9 SHIPPED modals (addClientModal, addVendorModal, addCustomerModal, addAccountModal, addCategoryModal, addUserModal, manualEntryModal, closePeriodModal, reopenPeriodModal). You MAY add new triggers pointing to them.
- DO NOT remove existing sections, break links, or alter the shared sidebar/header. Preserve lang="ar" dir="rtl".
- CLIENT-portal pages (the client's own dashboard/documents/reports/upload) stay non-technical: NO مدين/دائن/قيد/ترحيل/شجرة الحسابات/account codes in client-facing modal bodies.

CLONE THESE CANONICAL SOURCES (read them, copy the markup verbatim, then adapt text):
- Confirmation modal → pages/fiscal-periods.html #closePeriodModal (shell + .tip amber warning + .set-body/.set-row details + .modal-foot). Reuse its exact close-X SVG.
- Form modal → pages/clients.html #addClientModal (.fields-grid/.field/.input/.req/.filter-select/.select-wrap/.seg).
- Upload modal → pages/data-import.html upload section (.upload drop-zone + .browse + accepted-types helper).
- Trigger button → <button class="btn btn-outline btn-sm" type="button" data-open="#modalId">label</button> (header CTAs may use .btn-primary).

EVERY new modal MUST have all 7 parts: .scrim[data-overlay][hidden][role? no] wrapping .modal[role="dialog"][aria-modal="true"][aria-labelledby] with: .modal-head (<h3 id="UNIQUE"> + .icon-btn[data-close][aria-label="إغلاق"] X), a short description line at top of .modal-body, body (fields OR .set-body details), .modal-foot (primary .btn + cancel .btn.btn-outline[data-close]). Place each new modal block immediately BEFORE </body> next to any existing modals. NO duplicate element IDs on a page. Primary buttons are type="button" and NON-functional (consistent with shipped modals).

SEVERITY → existing classes ONLY (there is NO red danger button — never invent one): positive confirm (approve/post/reopen/create/assign/upload/export) = .btn-primary; warning/destructive confirm (request-clarification/reject) = .btn-amber; cancel = .btn-outline[data-close].

DEAD-ACTION SWEEP for every major action on your pages (إضافة/فتح/عرض/مراجعة/تعديل/اعتماد/رفض/إغلاق/إعادة فتح/ترحيل/تصدير/رفع/إسناد) currently href="#" or behaviorless:
- view/open/review → set href to the correct REAL existing page in pages/.
- add/assign → data-open to the right modal.
- edit → reuse the entity's add modal via data-open (or navigate to its detail page).
- approve/reject/clarify/post/close/reopen → data-open to the confirmation modal.
- export (تصدير/تحميل تقرير) → data-open="#exportConfirmModal".
- upload (رفع) → data-open to the upload modal or navigate to the upload page.
- truly future, no destination → make it a DISABLED control (add disabled to a <button>; convert dead <a href="#"> into a <button class="..." disabled>) with a "قريباً" hint; never leave an active-looking href="#".
- LEAVE href="#" already wired by JS (dropdown/user-menu/tabs/notification bell/aria-haspopup). Pagination/sort/self-breadcrumb need not navigate but must not look broken.

EXPORT MODAL — when a task tells you to add it, paste this EXACT block once on the page (before </body>) and wire every تصدير/تحميل-تقرير button on that page to data-open="#exportConfirmModal":
[ACCOUNTANT EXPORT MODAL MARKUP]:
${EXPORT_ACC}
[CLIENT EXPORT MODAL MARKUP — use this variant on client-portal pages instead]:
${EXPORT_CLI}

BEFORE RETURNING: re-open every file you changed; confirm valid HTML, no duplicate ids, each new modal has all 7 parts, each new data-open matches a modal id present ON THAT PAGE, each nav href points to a real file in pages/, no edits leaked to shared assets, lang="ar" dir="rtl" intact. Then return the structured result. Your return value is data for the orchestrator, not a message.`

const IMPL_SCHEMA = {
  type: 'object',
  required: ['group', 'filesChanged', 'modalsAdded', 'triggersWired', 'navFixed', 'selfCheckPassed', 'issues'],
  additionalProperties: false,
  properties: {
    group: { type: 'string' },
    filesChanged: { type: 'array', items: { type: 'string' } },
    modalsAdded: { type: 'array', items: { type: 'string' }, description: 'modal ids added' },
    triggersWired: { type: 'array', items: { type: 'string' } },
    navFixed: { type: 'integer', description: 'count of dead actions resolved' },
    selfCheckPassed: { type: 'boolean' },
    issues: { type: 'array', items: { type: 'string' } },
  },
}

const GROUPS = [
  {
    key: 'A-review',
    pages: 'document-review.html, accountant-inbox.html, approval-workflow.html, tax-documents.html',
    tasks: `Accountant portal (accounting terms allowed).
- [T008] Dead-action nav sweep on all 4 pages.
- [T017] document-review.html: add #requestClarificationModal (confirmation pattern). head «طلب توضيح من العميل»; description «أرسل طلب توضيح للعميل بخصوص هذا المستند — سيظهر له بحالة مطلوب توضيح.»; .set-row (المستند: INV-204 · العميل: شركة النور للتجارة); required <textarea class="input"> «نص الطلب»; optional reason .select-wrap (بيانات ناقصة/مبلغ غير واضح/مرفق مفقود); foot «إرسال الطلب» .btn-amber + «إلغاء» .btn-outline[data-close]. Wire «طلب توضيح» → data-open="#requestClarificationModal".
- [T018] document-review.html: add #rejectDocumentModal (confirmation pattern). head «رفض المستند»; amber .tip «رفض المستند يمنع ترحيله ويُعلِم العميل بالسبب. يمكن للعميل إعادة الرفع.»; .set-row (المستند/العميل); required <textarea class="input"> «سبب الرفض»; foot «تأكيد الرفض» .btn-amber + «تراجع» .btn-outline[data-close]. Wire «رفض» → data-open="#rejectDocumentModal".
- [T020] approval-workflow.html: add #approveReportModal (confirmation pattern). head «اعتماد التقرير»; description; .set-body (التقرير: قائمة الدخل — مايو 2026 · الحالة: مسودة · المُعد: أحمد محمود); optional .field ملاحظة اعتماد; foot «اعتماد التقرير» .btn-primary + «إلغاء». Wire «اعتماد» → data-open. Leave shipped #addRuleModal untouched.
- [T024] accountant-inbox.html: row «مراجعة» → href="document-review.html"; «طلب توضيح»/«رفض» row actions → navigate to document-review.html (no dead inbox action).
- [T028] tax-documents.html: add the ACCOUNTANT export modal + wire its تصدير buttons.`,
  },
  {
    key: 'B-reports',
    pages: 'reports.html, vat-report.html, admin-financial-dashboard.html',
    tasks: `Accountant portal.
- [T011] Dead-action nav sweep on all 3.
- [T019] reports.html: add #approveReportModal (confirmation pattern). head «اعتماد التقرير»; .set-body (اسم التقرير + الحالة الحالية + المُعد); foot «اعتماد التقرير» .btn-primary + «إلغاء». Wire «اعتماد» actions → data-open.
- [T025] reports.html: add the ACCOUNTANT export modal + wire all تصدير buttons.
- [T027] vat-report.html: add ACCOUNTANT export modal + wire تصدير.
- [T030] admin-financial-dashboard.html: add ACCOUNTANT export modal + wire تصدير.`,
  },
  {
    key: 'C-accounting',
    pages: 'journal-entries.html, chart-of-accounts.html, opening-balances.html, fiscal-periods.html, document-categories.html',
    tasks: `Accountant portal (debit/credit allowed).
- [T007] Dead-action nav sweep on all 5.
- [T021] journal-entries.html: add #confirmPostingModal (confirmation pattern). head «تأكيد ترحيل القيد»; amber .tip «بعد الترحيل لا يمكن تعديل القيد إلا بقيد عكسي.»; .set-body (القيد: JE-318 · مدين/دائن: 12,500 / 12,500 ج.م · الفترة: مايو 2026) + <span class="chip green">متوازن</span>; foot «تأكيد الترحيل» .btn-primary + «إلغاء». Wire «ترحيل»/«تأكيد الترحيل» → data-open="#confirmPostingModal". (Shipped #manualEntryModal stays as-is; ensure its + قيد يدوي trigger works.)
- [T023] fiscal-periods.html: VERIFY «إغلاق»→#closePeriodModal and «إعادة فتح»→#reopenPeriodModal triggers are wired (add data-open if any are missing). Do NOT edit the shipped modal markup.
- [T016 part] document-categories.html: ensure #addCategoryModal opens from its + button; wire any تعديل row action to reuse #addCategoryModal via data-open.
- [T026] journal-entries.html: add ACCOUNTANT export modal + wire تصدير.
- [T032 part] chart-of-accounts.html and opening-balances.html: if they have تصدير, add ACCOUNTANT export modal + wire.`,
  },
  {
    key: 'D-masterdata',
    pages: 'clients.html, vendors.html, commercial-customers.html, bank-accounts.html, client-profile.html',
    tasks: `Accountant view of clients/vendors (NOT the client portal).
- [T006] Dead-action nav sweep on all 5 (client-profile.html here is the ACCOUNTANT's client profile page).
- [T013] clients.html: add #assignAccountantModal (form pattern). head «إسناد محاسب»; description «أسند محاسبًا مسؤولًا لمتابعة مستندات وتقارير هذا العميل.»; .set-row (العميل: مؤسسة السلام للمقاولات); .field المحاسب .select-wrap (أحمد محمود/منى حسن/محمد عبد الله/سارة علي/خالد عمر); optional .field ملاحظة; foot «إسناد المحاسب» .btn-primary + «إلغاء». Wire each row «إسناد محاسب» → data-open="#assignAccountantModal". (Shipped #addClientModal untouched.)
- [T014] client-profile.html: add the SAME #assignAccountantModal block and wire its «إسناد محاسب» → data-open.
- [T016 part] Ensure addClientModal/addVendorModal/addCustomerModal/addAccountModal open from their + buttons; wire any تعديل row action to reuse the matching add modal via data-open.
- [T032 part] vendors.html and commercial-customers.html: if they have تصدير, add ACCOUNTANT export modal + wire.`,
  },
  {
    key: 'E1-client',
    pages: 'client-dashboard.html, client-documents.html, client-document-details.html, client-reports.html',
    tasks: `CLIENT PORTAL — keep simple/non-technical. NO مدين/دائن/قيد/ترحيل/شجرة الحسابات/account codes anywhere. NEVER add approveReportModal here.
- [T005 part] Dead-action nav sweep on these 4 with SIMPLE client wording; view/open → real client pages (client-document-details.html, client-reports.html, upload-document.html, etc.).
- [T033] client-reports.html and client-dashboard.html: add the SIMPLIFIED CLIENT export modal and wire «تصدير»/«تحميل التقرير»/«تحميل آخر تقرير» → data-open="#exportConfirmModal".`,
  },
  {
    key: 'E2-clientmisc',
    pages: 'client-onboarding.html, client-tax-settings.html, upload-document.html, messages.html, notifications.html',
    tasks: `Mixed pages — match EACH page's existing portal/wording (read its sidebar/brand first). upload-document.html is client-facing (keep simple). Do not introduce accounting internals on client-facing pages.
- [T005 part] Dead-action nav sweep on all 5: view/open/review → real pages; رفع on upload-document → keep its real upload flow; future-only → disabled + قريباً. Wire any «رفع مستند» CTA to the real upload page or its existing upload area.`,
  },
  {
    key: 'F-import',
    pages: 'data-import.html, import-mapping.html, import-preview.html, import-history.html, import-errors.html, import-templates.html',
    tasks: `Accountant data-import module.
- [T009] Dead-action nav sweep on all 6 (data-import «رفع وتحليل» already navigates to import-mapping.html — keep it).
- [T015] import-history.html: add #uploadDataModal (upload pattern from data-import.html). head «رفع ملف بيانات جديد»; description «ارفع ملف بيانات جديد (Excel/CSV) لتجهيزه للمراجعة والاستيراد.»; .field العميل .select-wrap; .upload drop-zone + .browse «اختيار ملف» + helper «XLSX, CSV حتى 10MB»; foot «رفع ومتابعة» .btn-primary + «إلغاء». Add a header «رفع ملف جديد» button → data-open="#uploadDataModal". Leave data-import.html inline upload untouched. (Shipped #addTemplateModal on import-templates stays as-is.)
- [T022] import-errors.html: add #importErrorActionModal (confirmation pattern). head «معالجة خطأ الاستيراد»; .set-row (الصف: ٤٢ · الخطأ: رقم ضريبي غير صحيح); a .seg choice (تصحيح يدوي / تجاهل الصف / إعادة المحاولة, one .active) + .field ملاحظة + an amber .tip warning for «تجاهل الصف»; foot «تطبيق الإجراء» .btn-primary + «إلغاء». Wire each row إجراء/معالجة button → data-open="#importErrorActionModal".
- [T031] import-history.html: add ACCOUNTANT export modal + wire its تصدير.`,
  },
  {
    key: 'G-banking',
    pages: 'bank-statement-import.html, bank-reconciliation.html',
    tasks: `Accountant banking.
- [T010] Dead-action nav sweep on both.
- [T032 part] bank-reconciliation.html (and bank-statement-import.html if it has تصدير): add ACCOUNTANT export modal + wire تصدير.`,
  },
  {
    key: 'H-governance',
    pages: 'users-permissions.html, settings.html, audit-log.html',
    tasks: `Admin governance.
- [T012] Dead-action nav sweep on all 3.
- [T016 part] users-permissions.html: ensure shipped #addUserModal opens from its + مستخدم button; wire any تعديل/صلاحيات row action sensibly (reuse #addUserModal for edit, or open the relevant modal).
- [T029] audit-log.html: add ACCOUNTANT export modal + wire its تصدير.`,
  },
]

const results = await parallel(
  GROUPS.map((g) => () =>
    agent(`${BASE}\n\n========================\nYOUR GROUP: ${g.key}\nYOUR FILES (pages/): ${g.pages}\n\nYOUR TASKS:\n${g.tasks}`,
      { model: 'sonnet', label: `impl:${g.key}`, phase: 'Implement', schema: IMPL_SCHEMA })
  )
)

const ok = results.filter(Boolean)

/* ---------------------------- Phase 3: Verify ----------------------------- */
phase('Verify')

const AUDIT_SCHEMA = {
  type: 'object',
  required: ['allModalsPresent', 'newModalsComplete', 'missingClasses', 'deadActionResidual', 'duplicateIds', 'sharedAssetsTouched', 'exportUnwired', 'rtlOk', 'summary'],
  additionalProperties: false,
  properties: {
    allModalsPresent: { type: 'boolean' },
    newModalsComplete: { type: 'boolean' },
    missingClasses: { type: 'array', items: { type: 'string' } },
    deadActionResidual: { type: 'array', items: { type: 'string' }, description: 'major-verb links still dead' },
    duplicateIds: { type: 'array', items: { type: 'string' } },
    sharedAssetsTouched: { type: 'array', items: { type: 'string' } },
    exportUnwired: { type: 'array', items: { type: 'string' } },
    rtlOk: { type: 'boolean' },
    summary: { type: 'string' },
  },
}

const audit = await agent(
  `Read-only QA audit of Spec 012 implementation. Run shell greps from repo root and report findings (do NOT modify files).
1. allModalsPresent: confirm all 16 ids exist somewhere in pages/: addClientModal addVendorModal addCustomerModal addAccountModal addCategoryModal addUserModal manualEntryModal closePeriodModal reopenPeriodModal requestClarificationModal rejectDocumentModal approveReportModal confirmPostingModal uploadDataModal importErrorActionModal assignAccountantModal.
2. newModalsComplete: for the 7 NEW ids (requestClarificationModal rejectDocumentModal approveReportModal confirmPostingModal uploadDataModal importErrorActionModal assignAccountantModal) confirm each has data-overlay + role="dialog" + modal-head + data-close + modal-foot.
3. missingClasses: extract class tokens used inside the NEW modal blocks and report any not defined in assets/css/output.css.
4. deadActionResidual: grep href="#" in pages/; list any line whose visible text is a MAJOR verb (إضافة/فتح/عرض/مراجعة/تعديل/اعتماد/رفض/إغلاق/إعادة فتح/ترحيل/تصدير/رفع/إسناد) that still has href="#" WITHOUT data-open and WITHOUT disabled (these are bugs). Ignore JS-wired toggles (dropdown/menu/tab/notif/aria-haspopup) and pagination/sort.
5. duplicateIds: per page, report any element id that appears more than once.
6. sharedAssetsTouched: run \`git diff --name-only\` — report if assets/css/input.css, assets/css/output.css, or assets/js/main.js appear (they MUST NOT).
7. exportUnwired: any تصدير button without data-open="#exportConfirmModal".
8. rtlOk: confirm every file in pages/ still has lang="ar" dir="rtl".
Return the structured verdict with exact offending file:line where applicable.`,
  { model: 'sonnet', label: 'verify:audit', phase: 'Verify', schema: AUDIT_SCHEMA }
)

const REVIEW_SCHEMA = {
  type: 'object',
  required: ['consistent', 'clientBoundaryClean', 'findings', 'verdict'],
  additionalProperties: false,
  properties: {
    consistent: { type: 'boolean' },
    clientBoundaryClean: { type: 'boolean' },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        required: ['page', 'issue', 'severity'],
        additionalProperties: false,
        properties: {
          page: { type: 'string' },
          issue: { type: 'string' },
          severity: { type: 'string', enum: ['blocker', 'major', 'minor'] },
        },
      },
    },
    verdict: { type: 'string' },
  },
}

const review = await agent(
  `Design-consistency review of the 7 new modals + the export modal added in Spec 012. READ the new modal blocks across the changed pages (document-review.html, reports.html, approval-workflow.html, journal-entries.html, clients.html, client-profile.html, import-history.html, import-errors.html, client-reports.html, client-dashboard.html, and every page that received #exportConfirmModal).
Judge against the shipped #closePeriodModal and #addClientModal:
- Same modal shell (scrim/modal/modal-head/modal-body/modal-foot), same close-X, consistent button hierarchy and severity colors (positive=.btn-primary, warning/destructive=.btn-amber, cancel=.btn-outline[data-close]).
- Each modal has a clear <h3> title, a short description line, real body content (fields or .set-body details), a primary and a cancel.
- Professional Arabic wording, correct RTL, realistic demo data, no English placeholder, no Lorem.
- CLIENT-boundary: client-facing modal bodies (client-reports.html, client-dashboard.html, upload-document.html) contain NO accounting internals (مدين/دائن/قيد/ترحيل/شجرة الحسابات/account codes); approveReportModal MUST NOT appear on client-reports.html.
Report findings as {page, issue, severity(blocker|major|minor)} and an overall verdict. Do NOT modify files.`,
  { model: 'opus', label: 'review:consistency', phase: 'Verify', schema: REVIEW_SCHEMA }
)

return {
  design: design ? { notes: design.notes } : null,
  groups: ok.map((r) => ({ group: r.group, files: r.filesChanged, modals: r.modalsAdded, navFixed: r.navFixed, selfCheck: r.selfCheckPassed, issues: r.issues })),
  audit,
  review,
}
