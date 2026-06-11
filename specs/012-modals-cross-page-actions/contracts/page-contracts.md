# Page & Component Contracts: Spec 012

These contracts are the acceptance surface for `/speckit-tasks` and sign-off. C1 = the 7 new modals; C2 = export confirmation; C3 = cross-page action wiring; C4 = preservation.

---

## C1 — Seven new modals (static HTML, reuse shared shell)

Each modal MUST satisfy **Entity A** (7 required parts) and use only classes confirmed in `output.css`. Open via `data-open="#id"`; close via X / cancel / scrim / Escape (existing `initOverlays()`).

### C1.1 `requestClarificationModal` — `pages/document-review.html`
- Trigger: «طلب توضيح» button (`.btn-amber`/`.btn-ghost`) on the review surface → `data-open="#requestClarificationModal"`.
- Head: «طلب توضيح من العميل». Body: short description + `.set-row` (المستند/العميل) + required `<textarea class="input">` + optional reason `.select-wrap`. Foot: «إرسال الطلب» `.btn-amber` + «إلغاء» `.btn-outline[data-close]`.
- ✅ Pass: opens from the review page; all 7 parts present; closes 4 ways; no accounting-internal leakage to client wording in the message preview.

### C1.2 `rejectDocumentModal` — `pages/document-review.html`
- Trigger: «رفض» button → `data-open="#rejectDocumentModal"`.
- Body: amber `.tip` consequence + `.set-row` detail + required reason `<textarea>`. Foot: «تأكيد الرفض» `.btn-amber` + «تراجع».
- ✅ Pass: confirmation appears before any "rejection" is implied; reason field present.

### C1.3 `approveReportModal` — `pages/reports.html` (+ `pages/approval-workflow.html`)
- Trigger: «اعتماد» button on a report row/header → `data-open="#approveReportModal"`.
- Body: `.set-body` detail (report name, current status, preparer). Foot: «اعتماد التقرير» `.btn-primary` + «إلغاء».
- ✅ Pass: present on accountant pages only; **absent from `client-reports.html`** (Principle V).

### C1.4 `confirmPostingModal` — `pages/journal-entries.html`
- Trigger: «ترحيل»/«تأكيد الترحيل» button → `data-open="#confirmPostingModal"`.
- Body: amber `.tip` (final) + `.set-body` (entry id, balanced debit/credit, period) + `.chip green` «متوازن». Foot: «تأكيد الترحيل» `.btn-primary` + «إلغاء».
- ✅ Pass: accountant portal (debit/credit allowed); confirmation precedes posting.

### C1.5 `uploadDataModal` — `pages/import-history.html`
- Trigger: header «رفع ملف جديد» button → `data-open="#uploadDataModal"`.
- Body: client `.select-wrap` + `.upload` drop-zone + `.browse` + accepted-types helper. Foot: «رفع ومتابعة» `.btn-primary` + «إلغاء».
- ✅ Pass: reuses the upload markup from `data-import.html`; no real upload; `data-import.html` inline flow untouched.

### C1.6 `importErrorActionModal` — `pages/import-errors.html`
- Trigger: per-row «إجراء»/«معالجة» button → `data-open="#importErrorActionModal"`.
- Body: `.set-row` (row #, error) + `.seg` choices (تصحيح يدوي / تجاهل الصف / إعادة المحاولة) + note `.field` + conditional amber `.tip`. Foot: «تطبيق الإجراء» `.btn-primary` + «إلغاء».
- ✅ Pass: choices in static HTML; destructive choice shows consequence.

### C1.7 `assignAccountantModal` — `pages/clients.html` (+ `pages/client-profile.html`)
- Trigger: «إسناد محاسب» (row action / profile header) → `data-open="#assignAccountantModal"`.
- Body: `.set-row` (client) + accountant `.select-wrap` + optional note `.field`. Foot: «إسناد المحاسب» `.btn-primary` + «إلغاء».
- ✅ Pass: select lists realistic Arabic accountant names; opens from both surfaces (reused, not duplicated styling).

---

## C2 — Export confirmation (`exportConfirmModal`)

- Added to every page with a تصدير action (e.g. `reports.html`, `vat-report.html`, `tax-documents.html`, `audit-log.html`, `journal-entries.html`, `admin-financial-dashboard.html`, `client-reports.html`, `import-history.html`, …).
- Body: description + scope `.set-row` + format `.seg`/`.select-wrap` (PDF/Excel/CSV); optional static `.toast` success. Foot: «تصدير» `.btn-primary` + «إغلاق» `.btn-outline[data-close]`.
- All تصدير buttons carry `data-open="#exportConfirmModal"`; none trigger a real file op (FR-006, SC-008).
- Client-facing instances use simplified wording (no accounting terms).
- ✅ Pass: every export button opens the confirmation; closes 4 ways; no console error.

---

## C3 — Cross-page action wiring (the dead-action sweep)

Apply **Entity D** taxonomy to every major action across all 37 pages:

| Class of action | Required wiring |
|-----------------|-----------------|
| view/open/review (عرض/فتح/مراجعة) | `href` → real existing page |
| add/new (إضافة/جديد) | `data-open` → create modal |
| assign (إسناد) | `data-open="#assignAccountantModal"` |
| edit (تعديل) | reuse add modal (open same id) or `href` → detail page |
| approve/reject/clarify (اعتماد/رفض/طلب توضيح) | `data-open` → confirm modal |
| post (ترحيل/تأكيد الترحيل) | `data-open="#confirmPostingModal"` |
| period close/reopen (إغلاق/إعادة فتح) | `data-open` → `#closePeriodModal`/`#reopenPeriodModal` |
| export (تصدير) | `data-open="#exportConfirmModal"` |
| upload (رفع) | `data-open="#uploadDataModal"` or `href` → upload page |
| future (no destination) | disabled / "قريباً" control — never an active-looking `#` |

- **Contract**: After the sweep, **0 major actions are dead** (SC-001). Every remaining `href="#"` is either (a) a JS-wired control (dropdown/user-menu/tab/notification) that produces a visible response, or (b) an intentionally disabled/future control. Minor links (pagination/sort) must not look broken.
- ✅ Pass: dead-action sweep in `quickstart.md` confirms each residual `#` is justified; a reviewer click-through hits no dead end (SC-009).

---

## C4 — Preservation

- **No edits** to `assets/css/input.css`, `assets/css/output.css`, `assets/js/main.js`, shared sidebar/header, or the **9 shipped modals** (`addClientModal`, `addVendorModal`, `addCustomerModal`, `addAccountModal`, `addCategoryModal`, `addUserModal`, `manualEntryModal`, `closePeriodModal`, `reopenPeriodModal`).
- Only shared-file change: `CLAUDE.md` SPECKIT marker block (agent context).
- All 37 pages still open with no console errors, no broken links, no broken CSS paths (SC-007).
- ✅ Pass: `git diff --name-only` touches no shared asset; rogue-class sweep finds zero classes absent from `output.css`.

---

## Contract test summary (maps to Success Criteria)

| Contract | Verifies SC |
|----------|-------------|
| C1.1–C1.7 | SC-002 (16 present), SC-003 (7 elements), SC-004 (confirmations), SC-005 (4 close paths) |
| C2 | SC-008 (export confirmation, no file op) |
| C3 | SC-001 (0 dead actions), SC-009 (full click-through) |
| C4 | SC-006 (single modal style), SC-007 (no regressions) |
