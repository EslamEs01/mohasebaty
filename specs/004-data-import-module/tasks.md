---
description: "Task list for Data Import Module (Spec 004)"
---

# Tasks: Data Import Module (Spec 004)

**Input**: Design documents from `specs/004-data-import-module/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/page-contracts.md, quickstart.md

**Tests**: Not requested. Verification is the documented manual + scriptable **audit** in `quickstart.md` §3–§5. No TDD/unit-test tasks are generated.

**⚠️ Context — this scope is already built.** Spec `003-data-import-module` produced and committed all six pages, and a static audit (2026-06-11) confirms they conform to the contracts. Therefore these tasks are **verification + cleanup**, not a from-scratch build. The only genuine code change is **T011** (remove the orphan `pages/import-template.html`, singular). All other tasks confirm existing conformance and must be executed before the module is signed off.

**✅ Execution result (2026-06-11).** All tasks executed. A 7-agent verification pass found **3 blocking design-system defects** that the earlier aggregate audit missed — fixed using the approved shared markup (verified against `upload-document.html` + `output.css`):
1. `data-import.html` — type-card / dropzone / file-card used **rogue classes** absent from `output.css` (`.tc-ico`, `.dz-title`, `.fc-name`…), so they rendered off-design and the file-preview JS (`[data-file-name]`/`[data-file-clear]`) was broken. Rebuilt on `.t-ico`/`.check`, `.dz-ico`/`.sub`/`.browse`/`.formats`, `.fc-body`/`[data-file-name]`/`[data-file-clear]`, and the `.steps`/`.step-item`/`.si-num` component.
2. `import-preview.html` — preview table was missing the 7th mapped column **ملاحظات** (C3 = 7 mapped + status). Added the header + a cell to all 10 rows (now 8 columns).
3. `import-templates.html` — modal global toggle used a raw inline checkbox; replaced with the approved `.switch`/`.track` component (C6).

Also added `aria-current="page"` to all 6 active sidebar links (consistency with the reference pages), removed the orphan `pages/import-template.html` (T011 → 23 pages), and re-ran the full audit (a)–(m): **all green, zero new CSS**.

**Organization**: Tasks are grouped by the 6 user stories in spec.md. Navigation wiring is cross-cutting (FR-030/031/032), handled in Phase 9 — not a separate user story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: US1–US6 (Setup, Foundational, Cross-cutting, and Polish carry no story label)
- Exact file paths are included in every task

## Path Conventions

Static multi-page frontend at repository root: `index.html`, `pages/*.html`, `assets/css/input.css`, `assets/css/output.css`, `assets/js/main.js`. No `src/` or `tests/` trees.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the design artifacts and capture a baseline audit before verifying each page.

- [x] T001 Confirm all design artifacts exist under `specs/004-data-import-module/`: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/page-contracts.md`, `quickstart.md` (read-only).
- [x] T002 [P] Capture a baseline audit by running `quickstart.md` §3 checks (a) RTL, (b) local asset paths, and (c) no-CDN across the 6 import pages + `index.html`; record the results (read-only, no changes expected — all should pass).

**Checkpoint**: Artifacts present; baseline conformance recorded.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Confirm the shared assets that every page relies on are intact and that no new component/CSS/JS was introduced for this module.

**⚠️ CRITICAL**: Verify before per-page checks so a shared regression is caught once, not six times.

- [x] T003 Confirm `assets/js/main.js` still registers `initSingleSelect()`, `initDropzone()`, `initOverlays()`, and `initFilterSelects()` in `boot()`, and that `assets/css/input.css` contains zero new classes added for this module (zero-new-CSS goal) (read-only; no changes).

**Checkpoint**: Shared JS/CSS foundation confirmed unchanged.

---

## Phase 3: User Story 1 - Upload a Client File and Start an Import (Priority: P1) 🎯 MVP

**Goal**: `pages/data-import.html` is a complete, conformant import entry point.

**Independent Test**: Open `pages/data-import.html`; one import-type card and one file source are single-selectable; dropzone, period selector, notes, and the 5-step "ما الذي سيحدث بعد ذلك؟" card render; "رفع وتحليل" → `import-mapping.html`; no console errors.

**Depends on**: Phase 2.

- [x] T004 [P] [US1] Verify `pages/data-import.html` against contract C1 in `contracts/page-contracts.md`: header title "استيراد بيانات العميل" + the exact subtitle; client selector; `.type-grid` of 8 import-type cards (single-select); `.seg` of 4 file sources; `.dropzone[data-zone-id="import-file"]`; period + notes fields; 5-step "next" card; the 3 action buttons with "رفع وتحليل" → `import-mapping.html` and "إلغاء" → `clients.html`; active sidebar item = استيراد البيانات. Run `quickstart.md` checks (a)(b)(e)(f)(j) on this file. Record any deviation as a fix task.

**Checkpoint**: US1 page verified conformant.

---

## Phase 4: User Story 2 - Map File Columns to System Fields (Priority: P1)

**Goal**: `pages/import-mapping.html` is a complete, conformant mapping page.

**Independent Test**: Open `pages/import-mapping.html`; 4-row import summary; `.tip` missing-fields warning; 7-row mapping table each with a system-field dropdown, required indicator, and status chip; 10-row data preview; "متابعة للمعاينة" → `import-preview.html`, "رجوع" → `data-import.html`; no console errors.

**Depends on**: Phase 2. Independent of US1 (different file).

- [x] T005 [P] [US2] Verify `pages/import-mapping.html` against contract C2: import summary (العميل، نوع الملف، اسم الملف، عدد الصفوف); `.tip` warning banner; mapping table with the 5 contract columns and the 7 example mappings (Invoice Date→تاريخ الفاتورة … Notes→ملاحظات) each with an inline `.select-wrap`/`.select` and a status chip; 10-row × 7-col preview; nav buttons as above. Run `quickstart.md` checks (a)(b)(e)(f)(k) — confirm exactly 7 `select-wrap` cells. Record any deviation as a fix task.

**Checkpoint**: US2 page verified conformant.

---

## Phase 5: User Story 3 - Preview Mapped Data Before Importing (Priority: P2)

**Goal**: `pages/import-preview.html` is a complete, conformant preview page.

**Independent Test**: Open `pages/import-preview.html`; 4 KPI cards (إجمالي الصفوف، صفوف جاهزة، صفوف بها تحذيرات، صفوف بها أخطاء); preview table with row-level status chips; warnings card with row-referenced warnings; "تنفيذ الاستيراد" → `import-history.html`, "رجوع للربط" → `import-mapping.html`; no console errors.

**Depends on**: Phase 2. Independent of US1–US2.

- [x] T006 [P] [US3] Verify `pages/import-preview.html` against contract C3: 4 summary cards with counts and color-coded icons; preview table with status column chips; warnings card; the 3 action buttons with correct destinations. Run `quickstart.md` checks (a)(b)(e)(f)(l — `kpi-row` present). Record any deviation as a fix task.

**Checkpoint**: US3 page verified conformant.

---

## Phase 6: User Story 4 - Track Import History (Priority: P2)

**Goal**: `pages/import-history.html` is a complete, conformant history log.

**Independent Test**: Open `pages/import-history.html`; 4 KPI cards; 4 filter controls; 10-column table with ≥5 records covering مكتمل / مكتمل مع أخطاء / فاشل; per-row actions; "عرض الأخطاء" → `import-errors.html`, "استيراد جديد" → `data-import.html`; no console errors.

**Depends on**: Phase 2. Independent of US1–US3.

- [x] T007 [P] [US4] Verify `pages/import-history.html` against contract C4: 4 KPI cards (عمليات هذا الشهر، مكتملة، مكتملة مع أخطاء، فاشلة); `.filters` bar with العميل/نوع الملف/الحالة/الفترة; 10-column table with the `data-model.md` records (all 3 status chips present); per-row actions عرض التفاصيل/عرض الأخطاء/إعادة المحاولة/تحميل التقرير. Run `quickstart.md` checks (a)(b)(e)(f)(l). Record any deviation as a fix task.

**Checkpoint**: US4 page verified conformant.

---

## Phase 7: User Story 5 - Review and Resolve Import Errors (Priority: P2)

**Goal**: `pages/import-errors.html` is a complete, conformant error-detail page.

**Independent Test**: Open `pages/import-errors.html`; 4 error KPI cards (إجمالي الأخطاء، أخطاء مبالغ، أخطاء تواريخ، حقول مفقودة); 5-column error table with ≥8 rows covering مبلغ / تاريخ / حقل مفقود, each with an Arabic suggested action; the 4 action buttons; "إعادة رفع الملف" → `data-import.html`, "رجوع للسجل" → `import-history.html`; no console errors.

**Depends on**: Phase 2. Independent of US1–US4.

- [x] T008 [P] [US5] Verify `pages/import-errors.html` against contract C5: 4 error-summary cards; error table with the 5 contract columns and the 8 `data-model.md` error rows (covering all error types with Arabic suggested actions); the 4 action buttons with correct destinations. Run `quickstart.md` checks (a)(b)(e)(f)(l). Record any deviation as a fix task.

**Checkpoint**: US5 page verified conformant.

---

## Phase 8: User Story 6 - Manage Saved Import Templates (Priority: P3)

**Goal**: `pages/import-templates.html` is a complete, conformant template manager.

**Independent Test**: Open `pages/import-templates.html`; ≥4 templates (mix of عام and client-specific, نشط and معطّل) with all 7 fields; "إضافة قالب" opens the modal with 4 fields; modal closes on "إلغاء"/Escape; "استخدام القالب" → `data-import.html`; no console errors.

**Depends on**: Phase 2. Independent of US1–US5.

- [x] T009 [P] [US6] Verify `pages/import-templates.html` against contract C6: 7-column templates table with the 4 `data-model.md` rows (scope chips عام `.chip.primary` / client `.chip.slate`; status chips نشط `.chip.green` / معطّل `.chip.slate`); per-row actions استخدام القالب/تعديل/تعطيل; add-template modal `<div class="scrim" data-overlay id="addTemplateModal" hidden>` with 4 fields (اسم القالب، نوع الملف، الحقول، هل هو قالب عام؟). Run `quickstart.md` checks (a)(b)(e)(f)(h — exactly one `data-overlay`). Record any deviation as a fix task.

**Checkpoint**: US6 page verified conformant.

---

## Phase 9: Cross-Cutting — Navigation Wiring & Orphan Cleanup

**Purpose**: Confirm the 6 pages are wired into the shared sidebar and `index.html` (FR-030/031/032), remove the orphan duplicate, and re-audit. **This phase contains the only real code change (T011).**

- [x] T010 [P] Verify navigation wiring (FR-030/031/032): every project page exposes the 6 import sidebar links as live `<a>` elements (no `is-soon`); `index.html` shows the 6 import cards as live links with footer "23 شاشة مكتملة + 14 وحدة قادمة" and chip "14 وحدة". Run `quickstart.md` checks (d)(g)(i) (read-only).
- [x] T011 Remove the orphan `pages/import-template.html` (singular, duplicate of the plural page) per research R12: first re-confirm zero inbound references via `grep -rn 'import-template\.html' index.html pages/*.html | grep -v 'import-templates'` (only the file's own self-reference may appear), then delete `pages/import-template.html`. This is the single genuine code change in this spec.
- [x] T012 After T011, re-run the link audit: `for h in data-import import-mapping import-preview import-history import-errors import-templates; do grep -l "href=\"$h.html\"" pages/*.html | wc -l; done` (each should now equal the same total) and `ls pages/*.html | wc -l` (expect 23); confirm `quickstart.md` check (m) passes. If counts disagree, record a fix task.
- [x] T013 Resolve the supersede decision (process, no code): confirm with the project owner whether spec 004 supersedes/archives `specs/003-data-import-module/`; record the outcome in `specs/004-data-import-module/plan.md` under "Remaining Work".

**Checkpoint**: Navigation verified; orphan removed; page count = 23; canonical-spec decision recorded.

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Full audit + responsive QA + final Definition of Done.

- [x] T014 [P] Run the complete static audit `quickstart.md` §3 checks (a)–(m); all pass with expected results.
- [x] T015 [P] Manual responsive QA across the 6 import pages at mobile width: sidebar toggles, the import type grid stacks, tables scroll horizontally, KPI cards stack, forms do not overflow, header actions wrap; no console errors; no visual overflow.
- [x] T016 Final Definition of Done per `quickstart.md` §5: confirm SC-001…SC-009 hold; rebuild `npm run build:css` only if `assets/css/input.css` changed (none expected); confirm no existing page, section, link, or asset path was removed or broken by the cleanup.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — read-only confirmation.
- **Foundational (Phase 2)**: Depends on Phase 1. Confirms shared JS/CSS intact.
- **US1–US6 (Phases 3–8)**: Each depends on Phase 2 only. All touch different files → fully parallelizable.
- **Cross-cutting (Phase 9)**: T010 can run any time after Phase 2; T011 (delete) → T012 (re-audit) is sequential; T013 is a process task. T011 should run after US6 verification (T009) since both concern the templates page area.
- **Polish (Phase 10)**: Depends on Phase 9 (audit must reflect the post-cleanup state).

### User Story Dependencies

- **US1 (P1)**, **US2 (P1)**, **US3 (P2)**, **US4 (P2)**, **US5 (P2)**, **US6 (P3)**: all independent — each verifies one page file. No cross-story dependencies.

### Parallel Opportunities

After Phase 2, the six per-page verifications are independent reads of different files and run in parallel:

```bash
Task: "Verify pages/data-import.html vs C1 (T004)"        # US1
Task: "Verify pages/import-mapping.html vs C2 (T005)"     # US2
Task: "Verify pages/import-preview.html vs C3 (T006)"     # US3
Task: "Verify pages/import-history.html vs C4 (T007)"     # US4
Task: "Verify pages/import-errors.html vs C5 (T008)"      # US5
Task: "Verify pages/import-templates.html vs C6 (T009)"   # US6
Task: "Verify navigation wiring vs FR-030/031/032 (T010)" # cross-cutting
```

---

## Implementation Strategy

### Sign-off path (fastest)

1. Phase 1 + Phase 2 (confirm artifacts + shared foundation).
2. Run T004–T010 in parallel (per-page + navigation verification). Expected: all pass (audit on 2026-06-11 already confirmed conformance).
3. T011 → T012: remove the orphan and re-audit to 23 pages — **the only real change**.
4. T013: record the 003-vs-004 canonical-spec decision.
5. Phase 10: full audit + responsive QA + DoD.

### Notes

- **[P]** = different files, no dependencies.
- T004–T010 are read-only verifications; only T011 mutates the repo (a single file deletion).
- If any verification finds a deviation from its contract, add a targeted fix task in that story's phase and re-verify — do not silently pass.
- Rebuild `output.css` only if `input.css` changed (zero-new-CSS target → no rebuild expected).
- The `import-templates.html` modal uses `data-open`/`data-overlay`/`data-close`, all handled by `initOverlays()` already in `boot()`.
