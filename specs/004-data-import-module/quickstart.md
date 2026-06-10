# Quickstart: Data Import Module (Spec 004)

How to build, run, and verify this feature locally. Static files only; no backend. The 6 pages already exist; this quickstart doubles as the **conformance re-audit** after removing the orphan `import-template.html` (singular).

## 1. Build (only if input.css changed)

```bash
npm run build:css        # → assets/css/output.css
```

Zero new CSS is the goal. If all pages reuse existing classes (they do), no rebuild is needed.

## 2. Serve and open

```bash
npm run serve            # http://localhost:8000
```

- `http://localhost:8000/pages/data-import.html`
- `http://localhost:8000/pages/import-mapping.html`
- `http://localhost:8000/pages/import-preview.html`
- `http://localhost:8000/pages/import-history.html`
- `http://localhost:8000/pages/import-errors.html`
- `http://localhost:8000/pages/import-templates.html`

## 3. Static audit (scriptable)

```bash
PAGES="pages/data-import.html pages/import-mapping.html pages/import-preview.html pages/import-history.html pages/import-errors.html pages/import-templates.html"

# (a) Arabic RTL declared
grep -L 'lang="ar" dir="rtl"' $PAGES                 # expect: none

# (b) Local asset paths
grep -L '../assets/css/output.css' $PAGES            # expect: none
grep -L '../assets/js/main.js'     $PAGES            # expect: none

# (c) No CDN/framework
grep -rniE 'cdn|bootstrap|react|vue|angular|next|unpkg|jsdelivr|googleapis' index.html $PAGES
# expect: none (data-wizard-next is a false positive — ignore)

# (d) 6 modules are live links (not coming-soon) and reachable from every page
grep -rn 'is-soon' pages/*.html | grep -E 'data-import|import-mapping|import-preview|import-history|import-errors|import-templates'   # expect: none
for h in data-import import-mapping import-preview import-history import-errors import-templates; do
  printf '%s: ' "$h"; grep -l "href=\"$h.html\"" pages/*.html | wc -l
done
# expect each = 23 (after orphan removal). Before removal, import-templates shows 23 and others 24.

# (e) Exactly one active sidebar item per page
for f in pages/*.html; do printf '%s ' "$f"; grep -c 'sidebar-link active' "$f"; done   # every count = 1

# (f) Each of the 6 pages marks its own item active
for h in data-import import-mapping import-preview import-history import-errors import-templates; do
  printf '%s: ' "$h"; grep -c 'sidebar-link active' pages/$h.html
done   # each = 1

# (g) No coming-soon item is a link
grep -n 'is-soon' pages/*.html | grep '<a '          # expect: none

# (h) templates modal uses data-overlay
grep -c 'data-overlay' pages/import-templates.html   # expect: 1

# (i) index footer reflects scope
grep -o '[0-9]* شاشة مكتملة' index.html              # expect: "23 شاشة مكتملة"
grep -o '[0-9]* وحدة' index.html | head -1           # expect: "14 وحدة"

# (j) type-grid present on data-import.html
grep -c 'type-grid' pages/data-import.html           # expect: >= 1

# (k) mapping table has 7 inline select-wraps
grep -c 'select-wrap' pages/import-mapping.html      # expect: 7

# (l) kpi-row present on history, preview, errors
for h in import-history import-preview import-errors; do printf '%s: ' "$h"; grep -c 'kpi-row' pages/$h.html; done   # each = 1

# (m) ORPHAN GONE — singular page removed and unreferenced
ls pages/import-template.html 2>/dev/null            # expect: No such file
grep -rn 'import-template\.html' index.html pages/*.html | grep -v 'import-templates'   # expect: none
ls pages/*.html | wc -l                              # expect: 23
```

## 4. Manual checks (browser)

**data-import.html** — 8 type cards in a grid (single-select); `.seg` file source toggles; dropzone shows picked file name; period + notes render; 5-step "ما الذي سيحدث بعد ذلك؟" card; "رفع وتحليل" → `import-mapping.html`; no console errors.

**import-mapping.html** — 4-row import summary; `.tip` warning banner; 7-row mapping table each with a field dropdown and status chip; 10-row × 7-col preview; "متابعة للمعاينة" → `import-preview.html`, "رجوع" → `data-import.html`; no console errors.

**import-preview.html** — 4 color-coded KPI cards; preview table with status chips; warnings card lists 3 Arabic warnings; "تنفيذ الاستيراد" → `import-history.html`, "رجوع للربط" → `import-mapping.html`; no console errors.

**import-history.html** — 4 KPI cards; 4 filters; 5-row × 10-col table; status chips; "عرض الأخطاء" (row IMP-0041) → `import-errors.html`; "استيراد جديد" → `data-import.html`; no console errors.

**import-errors.html** — 4 error KPI cards; 8-row × 5-col error table; "إعادة رفع الملف" → `data-import.html`, "رجوع للسجل" → `import-history.html`; no console errors.

**import-templates.html** — 4-template × 7-col table; عام `.chip.primary`, معطّل `.chip.slate`; "إضافة قالب" opens the modal (4 fields: name, type select, fields textarea, global toggle); closes on "إلغاء"/Escape; "استخدام القالب" → `data-import.html`; no console errors.

**Integration** — from any other page, every import sidebar link navigates correctly; mobile width: sidebar toggles, tables scroll, cards stack, forms don't overflow; `index.html`: 6 import cards are live (no قريباً), footer = 23 + 14.

## 5. Done = all of the following

- Static checks (a)–(m) produce the expected results — **including (m): the orphan `import-template.html` is removed and the page count is 23**.
- All 6 pages pass manual checks with zero console errors and zero broken links.
- Every page has exactly one active sidebar item; no unintended coming-soon conversions.
- `output.css` rebuilt only if `input.css` changed.
- No existing page, section, or asset path was broken by the cleanup.
