# Quickstart: Data Import Module

How to build, run, and verify this feature locally. Static files only; no backend.

## 1. Build (only if input.css changed)

```bash
npm run build:css        # → assets/css/output.css
```

Goal is zero new CSS classes. If all 6 pages reuse existing classes, no rebuild needed.

## 2. Serve and open

```bash
npm run serve            # http://localhost:8000
```

Open and inspect:
- `http://localhost:8000/pages/data-import.html`
- `http://localhost:8000/pages/import-mapping.html`
- `http://localhost:8000/pages/import-preview.html`
- `http://localhost:8000/pages/import-history.html`
- `http://localhost:8000/pages/import-errors.html`
- `http://localhost:8000/pages/import-templates.html`

## 3. Static audit (scriptable)

```bash
# (a) All 6 new pages declare Arabic RTL
grep -L 'lang="ar" dir="rtl"' \
  pages/data-import.html pages/import-mapping.html pages/import-preview.html \
  pages/import-history.html pages/import-errors.html pages/import-templates.html
# expect: none

# (b) All 6 new pages use correct local asset paths
grep -L '../assets/css/output.css' pages/data-import.html pages/import-mapping.html pages/import-preview.html pages/import-history.html pages/import-errors.html pages/import-templates.html
# expect: none
grep -L '../assets/js/main.js' pages/data-import.html pages/import-mapping.html pages/import-preview.html pages/import-history.html pages/import-errors.html pages/import-templates.html
# expect: none

# (c) No CDN or framework anywhere
grep -rniE 'cdn|bootstrap|react|vue|angular|next|unpkg|jsdelivr|googleapis' index.html pages/*.html
# expect: none (data-wizard-next is a false positive — ignore it)

# (d) The 6 import modules are live links (not coming-soon) in all 23 pages
grep -rn 'is-soon' pages/*.html | grep -E 'data-import|import-mapping|import-preview|import-history|import-errors|import-templates'
# expect: none

grep -l 'href="data-import.html"'      pages/*.html | wc -l  # expect: 23
grep -l 'href="import-mapping.html"'   pages/*.html | wc -l  # expect: 23
grep -l 'href="import-preview.html"'   pages/*.html | wc -l  # expect: 23
grep -l 'href="import-history.html"'   pages/*.html | wc -l  # expect: 23
grep -l 'href="import-errors.html"'    pages/*.html | wc -l  # expect: 23
grep -l 'href="import-templates.html"' pages/*.html | wc -l  # expect: 23

# (e) Exactly one active sidebar item per page (all 23)
for f in pages/*.html; do printf '%s ' "$f"; grep -c 'sidebar-link active' "$f"; done
# every count = 1

# (f) The 6 new pages mark the correct item active
grep -c 'sidebar-link active' pages/data-import.html       # 1
grep -c 'sidebar-link active' pages/import-mapping.html    # 1
grep -c 'sidebar-link active' pages/import-preview.html    # 1
grep -c 'sidebar-link active' pages/import-history.html    # 1
grep -c 'sidebar-link active' pages/import-errors.html     # 1
grep -c 'sidebar-link active' pages/import-templates.html  # 1

# (g) No coming-soon item is ever a link
grep -n 'is-soon' pages/*.html | grep '<a '
# expect: none

# (h) import-templates modal exists and uses data-overlay pattern
grep -c 'data-overlay' pages/import-templates.html  # expect: 1

# (i) index footer reflects new scope
grep 'وحدة قادمة' index.html
# expect: "23 شاشة مكتملة + 14 وحدة قادمة"

# (j) type-grid exists on data-import.html (import type cards)
grep -c 'type-grid' pages/data-import.html  # expect: 1 or more

# (k) mapping table has select-wrap inside td (import-mapping.html)
grep -c 'select-wrap' pages/import-mapping.html  # expect: 7 (one per mapping row)

# (l) kpi-row present on history, preview, errors pages
grep -c 'kpi-row' pages/import-history.html   # expect: 1
grep -c 'kpi-row' pages/import-preview.html   # expect: 1
grep -c 'kpi-row' pages/import-errors.html    # expect: 1
```

## 4. Manual checks (browser)

**data-import.html**
- 8 import type cards render in a grid; clicking one highlights it; clicking another switches selection.
- File source seg control works: clicking Excel/CSV/PDF/نظام محاسبي toggles active state.
- Dropzone shows file name after picking a file.
- Period selector and notes textarea render.
- "ما الذي سيحدث بعد ذلك؟" card shows 5 numbered steps.
- "رفع وتحليل" navigates to `import-mapping.html`.
- No console errors.

**import-mapping.html**
- Import context summary shows 4 rows (client, type, file name, row count).
- Warning banner visible in `.tip` style.
- Mapping table shows 7 rows; each row has a system field dropdown.
- Status chips (مربوط/غير مربوط/مطلوب — غير مربوط) render correctly.
- Data preview table shows 10 rows with 7 columns.
- "متابعة للمعاينة" navigates to `import-preview.html`.
- No console errors.

**import-preview.html**
- 4 KPI cards render with correct counts and color-coded icons.
- Preview table shows 10 rows with status column chips.
- Warnings card lists 3 Arabic warnings.
- "تنفيذ الاستيراد" navigates to `import-history.html`.
- "رجوع للربط" navigates to `import-mapping.html`.
- No console errors.

**import-history.html**
- 4 KPI cards render.
- 4 filter selectors render.
- Table shows 5 rows with all 10 columns.
- Status chips (مكتمل/مكتمل مع أخطاء/فاشل) render.
- "عرض الأخطاء" on row IMP-0041 navigates to `import-errors.html`.
- "استيراد جديد" navigates to `data-import.html`.
- No console errors.

**import-errors.html**
- 4 error KPI cards render with counts.
- Error table shows 8 rows with all 5 columns.
- "إعادة رفع الملف" navigates to `data-import.html`.
- "رجوع للسجل" navigates to `import-history.html`.
- No console errors.

**import-templates.html**
- Table shows 4 templates with all 7 columns.
- Global templates show `.chip.primary` عام badge.
- Disabled template shows `.chip.slate` معطّل badge.
- "إضافة قالب" button opens the add-template modal.
- Modal has 4 fields: name, type dropdown, fields textarea, global toggle.
- Modal closes on "إلغاء" or Escape key.
- "استخدام القالب" navigates to `data-import.html`.
- No console errors.

**Integration**
- From any of the 17 pre-existing pages, clicking any import sidebar link navigates correctly.
- Mobile width: sidebar toggles, tables scroll horizontally, cards stack, forms don't overflow.
- `index.html`: 6 استيراد البيانات cards are live links (no قريباً); footer = 23 + 14.

## 5. Done = all of the following

- Static checks (a)–(l) produce the expected results.
- All 6 new pages pass manual checks with zero console errors and zero broken links.
- Every page (all 23) has exactly one active sidebar item; no unintended coming-soon conversions.
- `output.css` rebuilt only if `input.css` changed.
- No existing page, section, or asset path was broken.
