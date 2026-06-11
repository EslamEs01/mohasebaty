# Quickstart: Audit Log & Notifications Center (Spec 010)

How to build, run, and verify this feature locally. Static files only; no backend; no enforcement.

## 1. Build (only if input.css changed)

```bash
npm run build:css        # → assets/css/output.css
```

Zero new CSS is the goal — every class is already in `output.css`. If so, no rebuild needed.

## 2. Serve and open

```bash
npm run serve            # http://localhost:8000
```

- `http://localhost:8000/pages/audit-log.html`
- `http://localhost:8000/pages/notifications.html`

## 3. Static audit (scriptable)

```bash
PAGES="pages/audit-log.html pages/notifications.html"

# (a) Arabic RTL
grep -L 'lang="ar" dir="rtl"' $PAGES                 # expect: none
# (b) Local assets
grep -L '../assets/css/output.css' $PAGES; grep -L '../assets/js/main.js' $PAGES   # expect: none
# (c) No CDN/framework
grep -rniE 'cdn|bootstrap|react|vue|angular|next|unpkg|jsdelivr|googleapis' index.html $PAGES   # expect: none
# (d) Both live links across every page
grep -rn 'is-soon' pages/*.html | grep -E 'سجل التدقيق|الإشعارات'   # expect: none
for h in audit-log notifications; do printf '%s: ' "$h"; grep -l "href=\"$h.html\"" pages/*.html | wc -l; done   # expect each = 36
# (e) Exactly one active sidebar item per page
for f in pages/*.html; do printf '%s ' "$f"; grep -c 'sidebar-link active' "$f"; done   # every count = 1
# (f) Each new page marks its own item active (+aria-current)
for h in audit-log notifications; do printf '%s: ' "$h"; grep -c 'sidebar-link active' pages/$h.html; grep -c 'aria-current="page"' pages/$h.html; done
# (g) No coming-soon item is a link; sidebar tags balanced per page
grep -n 'is-soon' pages/*.html | grep '<a '          # expect: none
python3 - <<'PY'
import glob,re
bad=0
for f in glob.glob("pages/*.html"):
    a=re.search(r'<aside class="sidebar".*?</aside>',open(f,encoding="utf-8").read(),re.DOTALL).group(0)
    if len(re.findall(r'<a\b',a))!=len(re.findall(r'</a>',a)) or len(re.findall(r'<span\b',a))!=len(re.findall(r'</span>',a)): bad+=1; print("UNBALANCED",f)
print("unbalanced sidebars:",bad)   # expect 0
PY
# (h) audit-log: 4 KPI cards + 9 th + filters; notifications: 6 notif-item + seg-tabs + 4 switches; no .btn-rose
grep -c 'card kpi' pages/audit-log.html               # 4
grep -c '<th>' pages/audit-log.html                   # 9
grep -c 'class="filter ' pages/audit-log.html         # >=5 (or count .filter blocks)
grep -c 'notif-item' pages/notifications.html         # 6
grep -c 'class="switch"' pages/notifications.html     # 4
grep -c 'seg-tabs' pages/notifications.html           # >=1
grep -c 'btn-rose' $PAGES                             # 0 each
# (i) only one coming-soon item remains in sidebar (تقارير العميل)
grep -c 'sidebar-link is-soon' pages/audit-log.html   # 1
# (j) ROGUE-CLASS SWEEP — every class used must exist in output.css
for f in $PAGES; do for c in $(grep -oE 'class="[^"]+"' "$f" | sed 's/class="//;s/"//' | tr ' ' '\n' | sort -u); do grep -qE "\.${c}([ ,{>:.]|\$)" assets/css/output.css || echo "UNDEFINED in $f: .$c"; done; done   # expect: none
# (k) index counters + page count
grep -o '[0-9]* شاشة مكتملة' index.html              # "36 شاشة مكتملة"
grep -o '[0-9]* وحدة' index.html | head -1           # "1 وحدة"
ls -1 pages/*.html | wc -l                           # 36
# (l) header bell wired to notifications + contextual links + bell dropdown preserved
grep -rl 'data-bell-panel' pages/*.html | wc -l                                  # bell still present on its pages
for f in $(grep -rl 'data-bell-panel' pages/*.html); do grep -q 'href="notifications.html"' "$f" || echo "BELL NOT WIRED: $f"; done   # expect: none
grep -q 'href="audit-log.html"' pages/settings.html && echo "settings→audit ✓"
grep -q 'href="notifications.html"' pages/settings.html && echo "settings→notifications ✓"
```

## 4. Manual checks (browser)

**audit-log.html** — 5 filter selects; 4 KPI cards (128/9/14/2) with primary/amber/green/rose icons; 9-column table with 10 rows incl. the 5 example events + 2 "فشل" rows + before/after "تغيير" rows; side details panel showing 14%→15% with a system-note `.tip`; no console errors.

**notifications.html** — 6 filter chips (الكل active); 6 notifications each with icon, title, desc, time, جديد/مقروء chip, and an action button; the "فشل" item rose, the "ستغلق" item amber; "جديد" visually distinct from "مقروء"; preferences card with 4 switches; no console errors.

**Integration** — from any page, both sidebar links navigate; the header **bell dropdown still opens** and its "عرض الكل" footer now goes to `notifications.html`; `index.html` shows both as live cards (no قريباً), footer = 36 + 1; contextual links from `settings.html` resolve; mobile: layout stacks, table scrolls, list/cards fit.

## 5. Done = all of the following

- Static checks (a)–(l) pass — **including (g) balanced sidebars, (j) zero rogue classes, (h) no `.btn-rose`, (l) bell wired + preserved**.
- Both pages pass manual checks with zero console errors and zero broken links.
- Every page has exactly one active sidebar item; only `تقارير العميل` remains coming-soon.
- `output.css` rebuilt only if `input.css` changed (none expected).
- No existing page, section, link, header bell, or asset path was broken.
