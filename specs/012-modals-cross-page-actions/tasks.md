---
description: "Task list for Modals & Cross-Page Actions Completion (Spec 012)"
---

# Tasks: Modals & Cross-Page Actions Completion

**Input**: Design documents from `/specs/012-modals-cross-page-actions/`
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, data-model.md ✓, contracts/page-contracts.md ✓

**Tests**: None requested. This is a static frontend prototype — verification is the scriptable audit + manual QA in `quickstart.md` (no unit/contract test files).

**Organization**: Grouped by the 4 user stories from `spec.md` (US1 P1 → US4 P3). Each story is an independently testable increment.

**Hard constraints (from plan.md):** zero new CSS, zero new JS, zero new pages, no Tailwind rebuild. Reuse confirmed `output.css` classes; open/close via existing `data-open`/`data-close` + `initOverlays()`. Do **not** edit `input.css`, `output.css`, `main.js`, shared sidebar/header, or the 9 shipped modals.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: US1–US4 (user-story phases only)
- All paths are repo-root-relative; pages live in `pages/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the reuse surface and build the audit baseline. No code changes yet.

- [x] T001 Verify the shared reuse surface exists with **no build**: confirm `.scrim`, `.modal`, `.modal-head`, `.modal-body`, `.modal-foot`, `.icon-btn`, `.tip`, `.set-body`, `.set-row`, `.info`, `.ctrl`, `.fields-grid`, `.field`, `.input`, `.req`, `.filter-select`, `.select-wrap`, `.seg`, `.chip`, `.upload`, `.browse`, `.toast`, `.btn-primary`, `.btn-amber`, `.btn-outline`, `.btn-ghost` are all defined in `assets/css/output.css`; confirm `initOverlays()` in `assets/js/main.js` binds `[data-open]`/`[data-close]`/scrim-click/Escape at boot (run `quickstart.md` check c).
- [x] T002 [P] Build the per-page **major-action inventory**: grep every `href="#"` and every major-verb control (إضافة/فتح/عرض/مراجعة/تعديل/اعتماد/رفض/إغلاق/إعادة فتح/ترحيل/تصدير/رفع/إسناد) across `pages/`, and classify each per the Entity D taxonomy (navigate / modal / export / upload / future / already-JS-wired). Record the baseline counts (expected ~99 `href="#"`) for the SC-001 sweep.
- [x] T003 [P] Inventory all **تصدير** actions across `pages/` → the list of export-bearing pages that need `exportConfirmModal` in Phase 6 (US4).

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Capture the exact markup blocks every new modal clones. BLOCKS all modal-building phases.

**⚠️ CRITICAL**: No new modal can be built until the canonical patterns are pinned.

- [x] T004 Pin the three canonical reuse snippets to clone verbatim (no new markup style): the **confirmation** pattern from `pages/fiscal-periods.html#closePeriodModal` (head + `.tip` + `.set-body`/`.set-row` + `.modal-foot` primary/outline), the **form** pattern from `pages/clients.html#addClientModal` (`.fields-grid`/`.field`/`.input`/`.req`/`.filter-select`), and the **upload** pattern from `pages/data-import.html` (`.upload` drop-zone + `.browse` + accepted-types helper). Each new modal MUST be assembled from these.

**Checkpoint**: Reuse patterns pinned — modal building and action wiring can begin.

---

## Phase 3: User Story 1 - No dead major actions across the prototype (Priority: P1) 🎯 MVP

**Goal**: Every **navigation-class** and **future-class** major action across all 37 pages resolves honestly — `href` → real page, or a clearly disabled/"قريباً" control. (Modal-class triggers are completed in US2–US4; the comprehensive SC-001 sweep runs in Polish.)

**Independent Test**: Walk every page; every view/open/review/edit action navigates to a real page and every truly-future action is visibly disabled/"قريباً" — no navigation dead clicks remain.

> Per-cluster sweep applies the Entity D taxonomy: عرض/فتح/مراجعة → real page; تعديل → entity detail page (or its add-modal, wired in US2); future-only → disabled/"قريباً"; leave `href="#"` that is already JS-wired (dropdown/user-menu/tab/notification). Removes nothing (Principle VII).

- [x] T005 [P] [US1] Wire navigation/future actions in **client portal** pages: `pages/client-dashboard.html`, `pages/client-documents.html`, `pages/client-document-details.html`, `pages/client-profile.html`, `pages/client-reports.html`, `pages/client-onboarding.html`, `pages/client-tax-settings.html`, `pages/upload-document.html`, `pages/messages.html`, `pages/notifications.html` (simple client wording only — Principle V).
- [x] T006 [P] [US1] Wire navigation/future actions in **master-data** pages: `pages/clients.html`, `pages/vendors.html`, `pages/commercial-customers.html`, `pages/bank-accounts.html`.
- [x] T007 [P] [US1] Wire navigation/future actions in **accounting-setup** pages: `pages/chart-of-accounts.html`, `pages/journal-entries.html`, `pages/opening-balances.html`, `pages/fiscal-periods.html`, `pages/document-categories.html`.
- [x] T008 [P] [US1] Wire navigation/future actions in **documents & review** pages: `pages/accountant-inbox.html`, `pages/document-review.html`, `pages/approval-workflow.html`, `pages/tax-documents.html`.
- [x] T009 [P] [US1] Wire navigation/future actions in **import-module** pages: `pages/data-import.html`, `pages/import-mapping.html`, `pages/import-preview.html`, `pages/import-history.html`, `pages/import-errors.html`, `pages/import-templates.html`.
- [x] T010 [P] [US1] Wire navigation/future actions in **banking** pages: `pages/bank-statement-import.html`, `pages/bank-reconciliation.html`.
- [x] T011 [P] [US1] Wire navigation/future actions in **reports/dashboard** pages: `pages/reports.html`, `pages/vat-report.html`, `pages/admin-financial-dashboard.html` (export wiring deferred to US4).
- [x] T012 [P] [US1] Wire navigation/future actions in **governance** pages: `pages/users-permissions.html`, `pages/settings.html`, `pages/audit-log.html`.

**Checkpoint**: Navigation/future dead clicks eliminated across all 37 pages — prototype is click-through-reviewable for non-modal actions (MVP).

---

## Phase 4: User Story 2 - Create and add entities through complete modals (Priority: P2)

**Goal**: Create/add/assign/upload form modals are present and complete. Adds the 2 new form modals and verifies the 9 shipped create modals are reachable; wires تعديل to reuse the entity's add modal.

**Independent Test**: From each owning page, open its create/add/assign/upload modal — title, description, fields, primary, cancel, X, overlay all present; opens/closes 4 ways; no other modal affected.

- [x] T013 [US2] Build `assignAccountantModal` in `pages/clients.html` (clone form pattern T004): head «إسناد محاسب», description, `.set-row` (client) + accountant `.select-wrap` (أحمد محمود/منى حسن/محمد عبد الله/سارة علي/خالد عمر) + optional note `.field`, foot «إسناد المحاسب» `.btn-primary` + «إلغاء» `.btn-outline[data-close]`; wire each row «إسناد محاسب» action → `data-open="#assignAccountantModal"`. (Contract C1.7)
- [x] T014 [US2] Add an `assignAccountantModal` block to `pages/client-profile.html` (same markup) and wire the profile «إسناد محاسب» action → `data-open="#assignAccountantModal"`.
- [x] T015 [US2] Build `uploadDataModal` in `pages/import-history.html` (clone upload pattern T004): head «رفع ملف بيانات جديد», description, client `.select-wrap` + `.upload` drop-zone + `.browse` + «XLSX, CSV حتى 10MB» helper, foot «رفع ومتابعة» `.btn-primary` + «إلغاء»; add a header «رفع ملف جديد» button → `data-open="#uploadDataModal"`. Leave `data-import.html`'s inline upload flow untouched. (Contract C1.5)
- [x] T016 [US2] Verify/align the 9 shipped create modals are each reachable in one click from their `+ إضافة` trigger (`addClientModal`, `addVendorModal`, `addCustomerModal`, `addAccountModal`, `addCategoryModal`, `addUserModal`, `manualEntryModal`) and wire any **تعديل** (edit) row action on those pages to reuse the matching add modal via `data-open` (no markup change to the shipped modals — Principle VII).

**Checkpoint**: All create/add/assign/upload form modals open and are complete; US1 + US2 both pass independently.

---

## Phase 5: User Story 3 - Confirm decisions and state changes before they happen (Priority: P2)

**Goal**: The 5 decision/confirmation modals are present, each shows consequence/detail before the action would complete, with severity-correct buttons. Period close/reopen (shipped) verified wired.

**Independent Test**: Trigger each decision/state-change action → a confirmation modal appears with consequence text + correct primary (amber for clarify/reject, primary for approve/post) and a cancel; closing makes no change.

- [x] T017 [US3] Build `requestClarificationModal` in `pages/document-review.html` (clone confirmation pattern T004): head «طلب توضيح من العميل», description, `.set-row` (المستند/العميل) + required `<textarea class="input">` + optional reason `.select-wrap`, foot «إرسال الطلب» `.btn-amber` + «إلغاء»; wire the «طلب توضيح» button → `data-open="#requestClarificationModal"`. (Contract C1.1)
- [x] T018 [US3] Build `rejectDocumentModal` in `pages/document-review.html` (same file, after T017): head «رفض المستند», amber `.tip` consequence, `.set-row` detail + required reason `<textarea>`, foot «تأكيد الرفض» `.btn-amber` + «تراجع»; wire the «رفض» button → `data-open="#rejectDocumentModal"`. (Contract C1.2)
- [x] T019 [P] [US3] Build `approveReportModal` in `pages/reports.html` (clone confirmation pattern): head «اعتماد التقرير», description, `.set-body` (report name/status/preparer), foot «اعتماد التقرير» `.btn-primary` + «إلغاء»; wire each «اعتماد» action → `data-open="#approveReportModal"`. **Accountant page only — not `client-reports.html`** (Principle V). (Contract C1.3)
- [x] T020 [P] [US3] Add an `approveReportModal` block to `pages/approval-workflow.html` (same markup) and wire its «اعتماد» actions → `data-open="#approveReportModal"` (leave the shipped `addRuleModal` untouched).
- [x] T021 [P] [US3] Build `confirmPostingModal` in `pages/journal-entries.html` (clone confirmation pattern): head «تأكيد ترحيل القيد», amber `.tip` (الترحيل نهائي), `.set-body` (entry id, balanced مدين/دائن, period) + `.chip green` «متوازن», foot «تأكيد الترحيل» `.btn-primary` + «إلغاء»; wire «ترحيل»/«تأكيد الترحيل» → `data-open="#confirmPostingModal"`. Accountant portal (debit/credit allowed). (Contract C1.4)
- [x] T022 [P] [US3] Build `importErrorActionModal` in `pages/import-errors.html` (clone confirmation pattern): head «معالجة خطأ الاستيراد», `.set-row` (row #/error) + `.seg` choices («تصحيح يدوي»/«تجاهل الصف»/«إعادة المحاولة») + note `.field` + conditional amber `.tip` for «تجاهل الصف», foot «تطبيق الإجراء» `.btn-primary` + «إلغاء»; wire each row «إجراء»/«معالجة» button → `data-open="#importErrorActionModal"`. (Contract C1.6)
- [x] T023 [P] [US3] Verify `closePeriodModal` + `reopenPeriodModal` triggers are wired from their «إغلاق الفترة» / «إعادة فتح الفترة» actions in `pages/fiscal-periods.html` (shipped modals — verify only, do not edit markup).
- [x] T024 [US3] Route `pages/accountant-inbox.html` row actions: «مراجعة» → `document-review.html`; «طلب توضيح»/«رفض» → navigate to `document-review.html` (where the modals live) so no inbox action is dead.

**Checkpoint**: All decision/confirmation modals appear before their action; destructive/state-change actions are confirmed (SC-004). US1–US3 pass independently.

---

## Phase 6: User Story 4 - Export actions give honest feedback (Priority: P3)

**Goal**: Every تصدير action opens a confirmation/toast-style modal; no real file op (SC-008).

**Independent Test**: Click each export action → `exportConfirmModal` appears with scope/format summary; confirm/close dismiss cleanly with no console error.

- [x] T025 [US4] Create the canonical accountant `exportConfirmModal` block and add it to `pages/reports.html`: description + scope `.set-row` + format `.seg` (PDF/Excel/CSV) + optional static `.toast` success, foot «تصدير» `.btn-primary` + «إغلاق» `.btn-outline[data-close]`; wire all «تصدير» buttons on the page → `data-open="#exportConfirmModal"`. (Contract C2)
- [x] T026 [P] [US4] Add `exportConfirmModal` + wire «تصدير» in `pages/journal-entries.html`.
- [x] T027 [P] [US4] Add `exportConfirmModal` + wire «تصدير» in `pages/vat-report.html`.
- [x] T028 [P] [US4] Add `exportConfirmModal` + wire «تصدير» in `pages/tax-documents.html`.
- [x] T029 [P] [US4] Add `exportConfirmModal` + wire «تصدير» in `pages/audit-log.html`.
- [x] T030 [P] [US4] Add `exportConfirmModal` + wire «تصدير» in `pages/admin-financial-dashboard.html`.
- [x] T031 [P] [US4] Add `exportConfirmModal` + wire «تصدير» in `pages/import-history.html`.
- [x] T032 [P] [US4] Add `exportConfirmModal` + wire «تصدير» on the **remaining accountant export-bearing pages** identified in T003 (e.g. `pages/chart-of-accounts.html`, `pages/opening-balances.html`, `pages/bank-reconciliation.html`, `pages/vendors.html`, `pages/commercial-customers.html` as applicable).
- [x] T033 [P] [US4] Add a **simplified client** `exportConfirmModal` (no accounting wording — Principle V) and wire «تصدير»/«تحميل التقرير» in `pages/client-reports.html` and `pages/client-dashboard.html`.

**Checkpoint**: Every export action is confirmed; no dead export buttons; all 4 user stories pass independently.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Whole-prototype verification against Success Criteria.

- [x] T034 Run `quickstart.md` audits (a) 7-element modal completeness, (b) all 16 modals present, (c) rogue-class sweep (zero classes missing from `output.css`), (e) export wiring — fix any failure. (SC-002, SC-003, SC-006, SC-008)
- [x] T035 Run the **dead-action sweep** `quickstart.md` (d): re-count `href="#"`, confirm every residual is JS-wired or intentionally disabled, and complete a full reviewer click-through of every page's major actions with no dead end. (SC-001, SC-009)
- [x] T036 [P] Manual responsive/dismissal pass on every new modal (desktop/tablet/mobile): fits viewport, scrolls internally if tall, no horizontal overflow; closes via X, cancel, scrim, Escape; opening one never reveals another. (SC-005)
- [x] T037 [P] Run the **client-internals scan** `quickstart.md` (f) over client-facing modal bodies (`client-reports.html`, `client-dashboard.html`, etc.) — zero accounting-internal terms; confirm `approveReportModal` is absent from `client-reports.html`. (Principle V)
- [x] T038 Run the **preservation** checks `quickstart.md` (g)+(h): `git diff --name-only` touches **no** `assets/css/input.css`, `assets/css/output.css`, or `assets/js/main.js`, and the 9 shipped modals are unedited; every touched page still declares `lang="ar" dir="rtl"`, opens with no console errors, and has no broken links/CSS paths. (SC-007, C4)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: no dependencies — start immediately.
- **Foundational (Phase 2 / T004)**: depends on Setup — **BLOCKS** all modal-building (US2, US3, US4). US1 (nav wiring) depends only on the T002 inventory.
- **User Stories (Phase 3–6)**: each depends on Foundational. US1 navigation is independent of the modal stories; US2/US3/US4 are independent of one another and can run in parallel once T004 is done.
- **Polish (Phase 7)**: depends on all desired stories being complete (T035/T038 verify the cumulative result).

### User Story Dependencies

- **US1 (P1)**: after Setup (T002). Independent — delivers navigation honesty (MVP).
- **US2 (P2)**: after Foundational (T004). Independent of US1/US3/US4.
- **US3 (P2)**: after Foundational (T004). Independent of US1/US2/US4.
- **US4 (P3)**: after Foundational (T004) + T003 inventory. Independent.

### Within a story

- T017 → T018 are the **same file** (`document-review.html`) → sequential.
- T013/T014 share the `assignAccountantModal` markup but are **different files** → T014 reuses T013's block; do T013 first, then T014.
- All other in-story tasks marked **[P]** touch different files → parallelizable.

---

## Parallel Opportunities

- **Setup**: T002, T003 in parallel.
- **US1**: T005–T012 all **[P]** (8 different page clusters) — fully parallel.
- **US3**: T019, T020, T021, T022, T023 all **[P]** (different files); T017→T018 sequential (same file); T024 after T017/T018 land.
- **US4**: T026–T033 all **[P]** (different files) after the canonical block in T025.
- **Across stories**: once T004 is done, US2, US3, US4 can proceed concurrently with US1.

### Parallel Example: User Story 1

```bash
# Launch the 8 page-cluster sweeps together (different files, no shared edits):
Task: "T005 wire client-portal pages"
Task: "T006 wire master-data pages"
Task: "T007 wire accounting-setup pages"
Task: "T008 wire documents & review pages"
Task: "T009 wire import-module pages"
Task: "T010 wire banking pages"
Task: "T011 wire reports/dashboard pages"
Task: "T012 wire governance pages"
```

### Parallel Example: User Story 4

```bash
# After T025 establishes the canonical exportConfirmModal block:
Task: "T026 export modal in journal-entries.html"
Task: "T027 export modal in vat-report.html"
Task: "T028 export modal in tax-documents.html"
Task: "T029 export modal in audit-log.html"
Task: "T030 export modal in admin-financial-dashboard.html"
Task: "T031 export modal in import-history.html"
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Phase 1 Setup → Phase 2 Foundational (T004).
2. Phase 3 US1 (T005–T012): kill all navigation/future dead clicks.
3. **STOP & VALIDATE**: click-through — no navigation dead ends. Demo-ready MVP.

### Incremental Delivery

1. Setup + Foundational → reuse patterns pinned.
2. US1 → navigation honesty (MVP) → demo.
3. US2 → create/add/assign/upload modals → demo.
4. US3 → decision/confirmation modals → demo.
5. US4 → export confirmations → demo.
6. Polish → SC-001…SC-009 all green.

### Parallel Team Strategy

After T004: Dev A → US1 (8 parallel cluster sweeps); Dev B → US2; Dev C → US3; Dev D → US4. Different files throughout, so no merge conflicts; Polish (T034–T038) runs once all land.

---

## Notes

- **[P]** = different files, no dependency. Same-file modal pairs (T017/T018) are sequential.
- Every new modal is **static HTML** cloned from T004 patterns; **no JS-generated fields/bodies** (FR-009). Triggers are `data-open` attributes auto-wired by the existing `initOverlays()` — **no `main.js` edit**.
- **No CSS edit, no Tailwind rebuild** — T034 rogue-class sweep and T038 preservation diff enforce this.
- Do **not** touch the 9 shipped modals or shared sidebar/header (Principle VII).
- Commit after each task or logical group; stop at any checkpoint to validate a story independently.
