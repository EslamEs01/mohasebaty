---
description: "Task list for Audit Log & Notifications Center (Spec 010)"
---

# Tasks: Audit Log & Notifications Center (Spec 010)

**Input**: Design documents from `specs/010-audit-log-notifications/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/page-contracts.md, quickstart.md

**Tests**: Not requested. Verification is the documented manual + scriptable **audit** in `quickstart.md` §3–§5 (incl. (j) rogue-class sweep, (g) balanced-sidebar-tags, (h) KPI/notif/switch counts + no-`.btn-rose`, (l) bell wired + preserved). No TDD/unit-test tasks.

**Build type**: Net-new — 2 pages. **Hard rules (Specs 004–009 lessons):** use only classes defined in `assets/css/output.css`; **copy KPI / filter / notification / bell markup VERBATIM** from the named reference pages (inner classes `.kpi-num`/`.kpi-lbl`/`.kpi-help`/`.notif-item` exist; `.kpi-val`/`.kpi-label`/`.notif-list` do NOT); **do NOT use `.btn-rose`** (purged → `.chip.rose`/`.nico.rose` for failures, `.btn-amber`/`.btn-outline` for buttons). **Sidebar wiring MUST use the label-based line fixer** (locate the `<span>LABEL</span>` line, rewrite its immediate wrapper) — NEVER a spanning/DOTALL regex. **The header bell is an interactive dropdown — preserve it**; only repoint/add its footer link.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: US1–US3 (Setup, Foundational, Polish carry no story label)
- Exact file paths included in every task

## Path Conventions

Static multi-page frontend at repo root: `index.html`, `pages/*.html`, `assets/css/output.css`, `assets/js/main.js`. No `src/`/`tests/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Capture the exact approved markup so both pages reuse shared classes (zero new CSS).

- [x] T001 [P] Read reference markup: `pages/vat-report.html` (`.layout`/`.side` + the `.card kpi` inner markup: `.kpi-top`/`.kpi-ico`/`.kpi-trend`/`.kpi-num`/`.ccy`/`.kpi-lbl`/`.kpi-help`), `pages/accountant-inbox.html` (`.filters`/`.filter`/`.filter-select`, `.seg-tabs`, and the bell `.notif-panel`/`.notif-item`/`.nico` dropdown incl. its footer "عرض الكل" link), `pages/settings.html` (`.set-body`/`.set-row`/`.ctrl` + `.switch`/`.track`), `pages/journal-entries.html` (shell + sidebar + avatar-only header) (read-only).
- [x] T002 Confirm the zero-new-CSS catalog: grep `assets/css/output.css` for every class named in `contracts/page-contracts.md` C1–C3 (esp. `.kpi-num`, `.kpi-lbl`, `.kpi-help`, `.filter-select`, `.notif-item`, `.nico`, `.seg-tabs`, `.switch`, `.tip`); confirm each is DEFINED and that **`.btn-rose` is NOT used** (purged) (read-only).

**Checkpoint**: Reference markup captured; class catalog confirmed.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Confirm shared JS covers every interaction so no `main.js` change is needed.

- [x] T003 Confirm `assets/js/main.js` `boot()` registers `initFilterSelects()` (audit-log `.filter-select` dropdowns), `initSingleSelect()` (notifications `.seg-tabs` chips), and the bell-toggle (existing `.notif-panel` dropdown). Switches are static checkboxes. No changes if present (read-only).

**Checkpoint**: JS foundation confirmed.

---

## Phase 3: User Story 1 - Trace System Activity in the Audit Log (Priority: P1) 🎯 MVP

**Goal**: A complete `pages/audit-log.html` per contract C1.

**Independent Test**: Open `pages/audit-log.html`; 5 filter selects; 4 KPI cards (128/9/14/2); 9-column table with 10 rows incl. the 5 example events + 2 "فشل" rows + before/after "تغيير" rows; side details panel showing 14%→15% with a system-note `.tip`; no console errors.

**Depends on**: Phase 2.

- [x] T004 [P] [US1] Create `pages/audit-log.html`: clone the shell from `pages/journal-entries.html` (doctype, head — `<title>سجل النشاط · منصة محاسبتي</title>` —, full sidebar, header chrome, closing `main.js`); deactivate the inherited journal-entries active sidebar link; mark `<a class="sidebar-link active" href="audit-log.html" aria-current="page">سجل التدقيق</a>`. Header (`.page-title-wrap` eyebrow "الحوكمة · التتبع", title "سجل النشاط", subtitle "تابع كل العمليات والتعديلات الحساسة داخل النظام") + "تصدير السجل" `.btn.btn-outline`. Wrap body in `.layout`. In MAIN add the `.filters` bar with 5 `.filter` (each `<label>` + `.filter-select` button + `.chev`): المستخدم، العميل، نوع الإجراء، الفترة، المستند المرتبط.
- [x] T005 [US1] In `pages/audit-log.html` (`.layout` MAIN) add: (a) the `.kpi-row` with 4 `.card kpi` copied VERBATIM from `pages/vat-report.html` (`.kpi-top`/`.kpi-ico .kpi-ico-{primary,amber,green,rose}`/`.kpi-trend` + `.kpi-num` + `.kpi-lbl` + `.kpi-help`): أحداث اليوم 128 (primary), تعديلات حساسة 9 (amber), عمليات اعتماد 14 (green), عمليات فشل 2 (rose). (b) a `.card` > `.table-wrap` > `table.docs` with `<thead>` EXACTLY 9 columns (الوقت، المستخدم، الدور، الإجراء، العميل، العنصر المرتبط، قبل/بعد، IP، تفاصيل) and `<tbody>` the 10 rows from `data-model.md` (severity `.chip`: عادي slate / حساس amber / اعتماد green / فشل rose; قبل/بعد = `.chip` "تغيير" or "—"; IP in `.ref`; تفاصيل = `.btn-outline.btn-sm` "عرض").
- [x] T006 [US1] In `pages/audit-log.html` `.layout` `.side` add the details `.card` `.card-head` "تفاصيل الحدث": a small selected-event summary (منى خالد · محاسب ضرائب · 10:18 ص · مؤسسة الأمل · IP 102.44.18.22), then a `.set-body` of `.set-row` — القيم قبل التعديل (نسبة الضريبة 14%) and القيم بعد التعديل (نسبة الضريبة 15%) — then a `.tip` "ملاحظات النظام: تعديل حساس على إعداد ضريبي — يتطلب اعتماد مدير الحسابات.".
- [x] T007 [US1] Verify `pages/audit-log.html` per `quickstart.md` checks (a)(b)(e)(f)(h: 4 `card kpi`, 9 `<th>`)(j rogue sweep): RTL + assets, one active sidebar item, 4 KPI + 9 columns, no undefined classes, no `.btn-rose`, no console errors.

**Checkpoint**: US1 audit-log page complete.

---

## Phase 4: User Story 2 - Triage Alerts in the Notifications Center (Priority: P1)

**Goal**: A complete `pages/notifications.html` per contract C2.

**Independent Test**: Open `pages/notifications.html`; 6 filter chips (الكل active); 6 notifications each with icon/title/desc/time/status/action; the "فشل" item rose, "ستغلق" item amber; جديد distinct from مقروء; preferences card with 4 switches; no console errors.

**Depends on**: Phase 2. Independent of US1 (different file).

- [x] T008 [P] [US2] Create `pages/notifications.html` (clone shell as in T004), `<title>مركز الإشعارات · منصة محاسبتي</title>`, sidebar `<a class="sidebar-link active" href="notifications.html" aria-current="page">الإشعارات</a>` active. Header: eyebrow "التنبيهات", title "مركز الإشعارات", subtitle "تابع التنبيهات المهمة المتعلقة بالمستندات والتقارير والاستيراد", "تحديد الكل كمقروء" `.btn.btn-outline`. Wrap body in `.layout`. In MAIN add the `.seg-tabs` single-select filter row: الكل (active) / مستندات / رسائل / تقارير / استيراد بيانات / اعتماد.
- [x] T009 [US2] In `pages/notifications.html` (`.layout` MAIN) add the notification list `.card` with the 6 `.notif-item` rows from `data-model.md` (copy the `.notif-item`/`.nico` structure from the `accountant-inbox.html` bell dropdown), each = `.nico`(default/`.amber`/`.rose`/`.green`) + `<div><b>title</b><span>desc · time</span></div>` + trailing `.chip` status (جديد `.chip.primary` / مقروء `.chip.slate`) + `.btn-outline.btn-sm` action: مستند جديد (جديد), مطلوب توضيح (rose, جديد), رد جديد من العميل (جديد), تقرير جاهز (green, مقروء), ملف استيراد فشل (rose, جديد), فترة مالية ستغلق (amber, مقروء).
- [x] T010 [US2] In `pages/notifications.html` `.layout` `.side` add the preferences `.card` `.card-head` "تفضيلات الإشعارات" + `.set-body` of 4 `.set-row` (`.info` label+helper + `.ctrl` `<label class="switch"><input type="checkbox" checked><span class="track"></span></label>`): إشعارات داخل النظام، إشعارات البريد، تنبيه قبل إغلاق الفترة، تنبيه عند فشل الاستيراد (all on).
- [x] T011 [US2] Verify `pages/notifications.html` per `quickstart.md` checks (a)(b)(e)(f)(h: 6 `notif-item`, 4 `switch`, `seg-tabs`)(j rogue sweep): RTL + assets, one active sidebar item, 6 notifications + 4 switches, no undefined classes, no console errors.

**Checkpoint**: US2 notifications page complete.

---

## Phase 5: User Story 3 - Integrate via Sidebar, Bell, index & Settings (Priority: P3)

**Goal**: Both pages reachable across the project — sidebar + `index.html` + header bell + `settings.html`.

**Independent Test**: From any page, the 2 sidebar items are live links; the header bell dropdown still opens and its "عرض الكل" footer goes to `notifications.html`; `index.html` shows both as live cards with footer "36 شاشة مكتملة + 1 وحدة قادمة"; `settings.html` links to both; every page has exactly one active sidebar item; all sidebars tag-balanced.

**Depends on**: US1 + US2 (both pages must exist).

- [x] T012 [US3] Convert the 2 coming-soon sidebar spans (سجل التدقيق → `audit-log.html`, الإشعارات → `notifications.html`) to live `<a class="sidebar-link">` across all 34 existing `pages/*.html` using the **LABEL-BASED LINE FIXER** (Python: for each page find the line equal to `<span>LABEL</span>`, walk back to the nearest preceding `class="sidebar-link"` wrapper line and rewrite it to `<a class="sidebar-link" href="HREF">`, walk forward to the nearest standalone `</a>`/`</span>` and rewrite to `</a>`, drop the `<span class="sl-soon">قريباً</span>` line, set active where href==basename). **Do NOT use a spanning/DOTALL regex.** Preserve each `.sl-ico` SVG. Leave `تقارير العميل` as the only remaining is-soon span.
- [x] T013 [P] [US3] In `index.html` convert the 2 `<div class="landing-card is-soon">` (سجل التدقيق ~line 447, الإشعارات ~line 461) to live `<a class="landing-card" href="pages/audit-log.html|notifications.html">` with `.go "فتح الصفحة"`; update chip `3 وحدة` → `1 وحدة` and footer `34 شاشة مكتملة + 3 وحدة قادمة` → `36 شاشة مكتملة + 1 وحدة قادمة`.
- [x] T014 [US3] Wire the header bell on the 11 pages with `data-bell-panel` (Python, non-destructive): for each `.notif-panel`, if it contains a footer `<a href="#">عرض الكل …</a>` repoint that `href` to `notifications.html`; otherwise insert `<a href="notifications.html">عرض كل الإشعارات ←</a>` immediately before the panel's closing `</div>`. **Do NOT modify the bell button or the dropdown items.** (Runs after T012 since those files are also touched by the sidebar fixer.)
- [x] T015 [US3] Add non-destructive contextual `<a>` links in `pages/settings.html` header action area → `audit-log.html` ("سجل النشاط") AND `notifications.html` ("مركز الإشعارات"). Remove no existing content.
- [x] T016 [US3] Verify navigation per `quickstart.md` checks (d)(g)(k)(l): both modules linked from 36 pages, **all 36 sidebars tag-balanced (g)**, no `is-soon` `<a>`, `index.html` shows "36 شاشة مكتملة" / "1 وحدة", page count = 36, contextual links resolve, one active sidebar item per page, **every bell page wired to notifications.html and the dropdown preserved (l)**.

**Checkpoint**: SC-006, SC-007 satisfied; both pages integrated; sidebar + bell intact.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Full audit (incl. rogue + balanced-sidebar + bell) + responsive QA + Definition of Done.

- [x] T017 [P] Run the complete static audit `quickstart.md` §3 checks (a)–(l), **including (j) rogue-class sweep, (g) balanced sidebars across all 36 pages, (h) KPI/notif/switch counts + no-`.btn-rose`, and (l) bell wired + preserved** — confirm zero undefined classes and zero unbalanced sidebars.
- [x] T018 [P] Manual responsive QA on both pages at mobile width: sidebar toggles, the `.layout` collapses (side stacks under main), the audit table scrolls, the notification list and filter chips wrap, KPI cards stack, switches/details render; no console errors.
- [x] T019 Final Definition of Done per `quickstart.md` §5: confirm SC-001…SC-007 hold; rebuild `npm run build:css` only if `assets/css/input.css` changed (none expected); confirm no existing page, section, link, header bell, or asset path was removed or broken; only `تقارير العميل` remains coming-soon.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)** → **Foundational (Phase 2)** → user stories.
- **US1 (Phase 3) ∥ US2 (Phase 4)**: different page files → parallelizable after Phase 2.
- **US3 (Phase 5)**: after US1+US2 (both pages exist). T012 (sidebars) → T014 (bell, some same files) → T015 (settings); T013 (`index.html`) is `[P]`.
- **Polish (Phase 6)**: after US3.

### User Story Dependencies

- **US1 (P1)**, **US2 (P1)**: independent — each one page file.
- **US3 (P3)**: needs US1 + US2.

### Parallel Opportunities

```bash
# After Phase 2, build both pages concurrently (different files):
Task: "Build pages/audit-log.html (T004–T007)"        # US1
Task: "Build pages/notifications.html (T008–T011)"     # US2
```
Within each story the tasks are sequential (same file). T017 ∥ T018 in Polish.

### Within Each Story

- US1: T004 (shell+header+filters) → T005 (KPI + table) → T006 (side panel) → T007 (verify)
- US2: T008 (shell+header+chips) → T009 (list) → T010 (preferences) → T011 (verify)
- US3: T012 (sidebars) → T013 (index, ∥) → T014 (bell) → T015 (settings) → T016 (verify)

---

## Implementation Strategy

### MVP First (US1 only)

1. Phase 1 → Phase 2 → Phase 3 (US1). Delivers `audit-log.html` — the traceability page.

### Incremental Delivery

1. Setup + Foundational.
2. US1 ∥ US2 → both pages exist.
3. US3 → sidebar + index + bell + settings integration across all 36 pages.
4. Polish: full audit (incl. rogue + balanced-sidebar + bell) + responsive QA + DoD.

### Notes

- **[P]** = different files, no dependencies.
- **Zero-new-CSS is mandatory**; copy KPI/notif/filter markup verbatim; do NOT use `.btn-rose`; the Polish rogue-class sweep (T017/check j) is the gate.
- **Sidebar fixer is label-based, never a spanning regex** — T016/T017 add the balanced-sidebar check (g) to catch any recurrence.
- **The header bell is a live dropdown — preserve it**; T014 only repoints/adds its footer link (check l).
- Modals/dropdowns reuse existing JS; switches are static checkboxes; filter chips/selects use existing `initSingleSelect()`/`initFilterSelects()`. No `main.js`/CSS change.
- Rebuild `output.css` only if `input.css` changed (none expected).
