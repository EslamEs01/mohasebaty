# UI Page Contracts: Audit Log & Notifications Center (Spec 010)

Each contract defines the required HTML structure, component classes (all confirmed in `output.css`), data attributes, and navigation. **Use only the named classes** — copy KPI / filter / notification / bell markup VERBATIM from the reference pages. **Do NOT use `.btn-rose`** (purged → `.chip.rose`/`.nico.rose` for failures, `.btn-amber`/`.btn-outline` for buttons). Sidebar wiring uses the **label-based line fixer** (no spanning regex).

---

## C1 — audit-log.html (سجل النشاط)

**Shell**: `<html lang="ar" dir="rtl">`, `.app-shell`, full shared sidebar, `../assets/css/output.css`, `../assets/js/main.js`. Clone shell from `journal-entries.html`; deactivate the inherited journal-entries active sidebar link.

**Sidebar active**: `<a class="sidebar-link active" href="audit-log.html" aria-current="page">سجل التدقيق</a>` (sidebar label "سجل التدقيق" preserved; page title "سجل النشاط").

**Header** (`.page-title-wrap`): eyebrow "الحوكمة · التتبع", title "سجل النشاط", subtitle "تابع كل العمليات والتعديلات الحساسة داخل النظام". Header action: "تصدير السجل" `.btn.btn-outline` (download icon).

**Filters** (`.filters`): 5 `.filter`, each `<label>` + `.filter-select` button (`.placeholder` + `.chev`): المستخدم، العميل، نوع الإجراء، الفترة، المستند المرتبط.

**KPI band** (`.kpi-row`): 4 `.card kpi` (copy inner markup from `vat-report.html`): أحداث اليوم `.kpi-ico-primary` 128, تعديلات حساسة `.kpi-ico-amber` 9, عمليات اعتماد `.kpi-ico-green` 14, عمليات فشل `.kpi-ico-rose` 2. Each = `.kpi-top`(`.kpi-ico .kpi-ico-*` + `.kpi-trend`) + `.kpi-num` + `.kpi-lbl` + `.kpi-help`.

**Layout** (`.layout`): MAIN = filters + KPI band + the event `.card` table; SIDE (`.side`) = the details panel.

**Event table** (`.card` > `.table-wrap` > `table.docs`): `<thead>` 9 columns — الوقت، المستخدم، الدور، الإجراء، العميل، العنصر المرتبط، قبل/بعد، IP، تفاصيل. `<tbody>` the 10 rows from `data-model.md` (severity as `.chip`: عادي slate / حساس amber / اعتماد green / فشل rose; "قبل/بعد" = `.chip` "تغيير" or "—"; IP in a muted `.ref`; تفاصيل = `.btn-outline.btn-sm` "عرض").

**Details panel** (`.side`): `.card` `.card-head` "تفاصيل الحدث" + a small event summary, then a `.set-body` of `.set-row` — القيم قبل التعديل (نسبة الضريبة 14%), القيم بعد التعديل (نسبة الضريبة 15%) — then a `.tip` "ملاحظات النظام: تعديل حساس على إعداد ضريبي — يتطلب اعتماد مدير الحسابات.".

---

## C2 — notifications.html (مركز الإشعارات)

**Shell**: same. **Sidebar active**: `<a class="sidebar-link active" href="notifications.html" aria-current="page">الإشعارات</a>` (label "الإشعارات"; page title "مركز الإشعارات").

**Header**: eyebrow "التنبيهات", title "مركز الإشعارات", subtitle "تابع التنبيهات المهمة المتعلقة بالمستندات والتقارير والاستيراد". Header action: "تحديد الكل كمقروء" `.btn.btn-outline`.

**Filter chips** (`.seg-tabs` single-select): الكل (active) / مستندات / رسائل / تقارير / استيراد بيانات / اعتماد.

**Layout** (`.layout`): MAIN = the notification list `.card`; SIDE (`.side`) = the preferences card.

**Notification list** (`.card`): the 6 `.notif-item` rows from `data-model.md`, each = `.nico`(default/`.amber`/`.rose`/`.green`) icon + `<div><b>title</b><span>desc · time</span></div>` + a trailing `.chip` status (جديد `.chip.primary` / مقروء `.chip.slate`) + a `.btn-outline.btn-sm` action (عرض / فتح / مراجعة). The "ملف استيراد فشل" row uses `.nico.rose`; "فترة مالية ستغلق" uses `.nico.amber` (warning).

**Preferences card** (`.side`): `.card` `.card-head` "تفضيلات الإشعارات" + `.set-body` of 4 `.set-row` (`.info` label+helper + `.ctrl` `<label class="switch"><input type="checkbox" checked><span class="track"></span></label>`): إشعارات داخل النظام، إشعارات البريد، تنبيه قبل إغلاق الفترة، تنبيه عند فشل الاستيراد (all on).

---

## C3 — Navigation, Bell & Contextual Wiring (Cross-cutting)

**Sidebar** (label-based line fixer): in every page, the 2 items become live `<a>`:
```html
<a class="sidebar-link" href="audit-log.html"><span class="sl-ico"><!-- log icon --></span><span>سجل التدقيق</span></a>
<a class="sidebar-link" href="notifications.html"><span class="sl-ico"><!-- bell icon --></span><span>الإشعارات</span></a>
```
Each new page marks its own item `active` + `aria-current="page"`; one active item per page.

**index.html**: convert the 2 `<div class="landing-card is-soon">` (سجل التدقيق ~line 447, الإشعارات ~line 461) to live `<a class="landing-card" href="pages/audit-log.html">` / `href="pages/notifications.html">` with `.go "فتح الصفحة"`; chip `3 وحدة` → `1 وحدة`; footer `34 شاشة مكتملة + 3 وحدة قادمة` → `36 شاشة مكتملة + 1 وحدة قادمة`.

**Header bell** (11 pages with `.notif-panel`[`data-bell-panel`]): repoint the in-panel footer `<a href="#">عرض الكل …</a>` to `href="notifications.html"`; if a panel has no footer link, insert `<a href="notifications.html">عرض كل الإشعارات ←</a>` immediately before the panel's closing `</div>`. Preserve the bell button + dropdown items unchanged.

**Contextual links**: `settings.html` → `audit-log.html` ("سجل النشاط") AND `notifications.html` ("مركز الإشعارات").
