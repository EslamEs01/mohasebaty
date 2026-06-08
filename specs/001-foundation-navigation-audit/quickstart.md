# Quickstart: Foundation / Navigation / Audit

How to build, run, and verify this feature locally. No backend; static files only.

## Prerequisites

- Node.js + npm (for the local Tailwind build) — dependencies already in `node_modules/`.
- Python 3 (for the simple static server) or the VS Code "Live Server" extension.

## 1. Build the stylesheet

After any change to `assets/css/input.css` (e.g. the `.is-soon` / `.sl-soon` utility):

```bash
npm run build:css        # one-off minified build → assets/css/output.css
# or
npm run watch:css        # rebuild on change while developing
```

## 2. Serve and open

```bash
npm run serve            # http://localhost:8000  (python3 -m http.server 8000)
```

Open `http://localhost:8000/index.html`, then visit each page under `http://localhost:8000/pages/`.
(Live Server works too — open `index.html` and the `pages/*.html` files directly.)

## 3. Run the audit (static, scriptable checks)

From the repo root:

```bash
# (a) Every entry point declares Arabic RTL
grep -L 'lang="ar" dir="rtl"' index.html pages/*.html        # expect: no output

# (b) Pages link the local compiled CSS + JS via correct relative path
grep -L '../assets/css/output.css' pages/*.html              # expect: no output
grep -L '../assets/js/main.js'     pages/*.html              # expect: no output

# (c) No CDN / framework / external template
grep -rniE 'cdn|bootstrap|react|vue|angular|next|unpkg|jsdelivr|googleapis' index.html pages/*.html
                                                             # expect: no output

# (d) No coming-soon item accidentally became a link, and none is active
grep -n 'is-soon' pages/*.html | grep '<a '                  # expect: no output
grep -n 'sidebar-link is-soon active' pages/*.html           # expect: no output

# (e) Each page has exactly one active item
for f in pages/*.html; do printf '%s ' "$f"; grep -c 'sidebar-link active' "$f"; done
                                                             # expect: every count = 1

# (f) The 7 new group labels are present on all 15 pages
for g in "الإعداد والتهيئة" "الضرائب" "استيراد البيانات" "العمليات المحاسبية" "البنوك" "المراجعة والاعتماد" "النظام"; do
  echo "== $g =="; grep -l "$g" pages/*.html | wc -l;         # expect: 15 each
done
```

## 4. Manual checks (per entry point)

For `index.html` + each of the 15 pages, confirm in the browser:

- Loads with correct RTL layout and Arabic content; **no console errors** (DevTools → Console).
- Sidebar shows the 3 existing groups + 7 new groups; upcoming items show a "قريباً" pill and do
  **not** navigate when clicked.
- The current page's existing link is highlighted as active; clicking real links works.
- Mobile width: the existing sidebar toggle still opens/closes the (now longer) sidebar; it scrolls
  without clipping.

## 5. Landing scope check

On `index.html`: existing screen sections are intact; an "upcoming modules" area lists the 22 modules
grouped to match the sidebar; each is marked "قريباً" and is not a working link; the footer scope text
reflects 15 live + 22 upcoming (37 total).

## Done = all of the following

- Static checks (a)–(f) produce the expected (empty / count) results.
- All 16 entry points pass the manual checks with zero console errors and zero broken internal links.
- `assets/css/output.css` rebuilt and committed.
