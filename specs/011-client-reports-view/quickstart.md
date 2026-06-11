# Quickstart: Client Reports View (Spec 011)

How to build, run, and verify this feature locally. Static files only; no backend; no enforcement. **Client portal page** — the keyword scan (k) is the defining gate.

## 1. Build (only if input.css changed)

```bash
npm run build:css        # → assets/css/output.css
```

Zero new CSS is the goal — every class is already in `output.css`. If so, no rebuild needed.

## 2. Serve and open

```bash
npm run serve            # http://localhost:8000
```

- `http://localhost:8000/pages/client-reports.html`

## 3. Static audit (scriptable)

```bash
PAGE="pages/client-reports.html"

# (a) Arabic RTL
grep -L 'lang="ar" dir="rtl"' $PAGE                  # expect: none
# (b) Local assets
grep -L '../assets/css/output.css' $PAGE; grep -L '../assets/js/main.js' $PAGE   # expect: none
# (c) No CDN/framework
grep -rniE 'cdn|bootstrap|react|vue|angular|next|unpkg|jsdelivr|googleapis' index.html $PAGE   # expect: none
# (d) Live link across every page; no is-soon for it
grep -rn 'is-soon' pages/*.html | grep 'تقارير العميل'    # expect: none
grep -l 'href="client-reports.html"' pages/*.html | wc -l  # expect 37
# (e) Exactly one active sidebar item per page
for f in pages/*.html; do printf '%s ' "$f"; grep -c 'sidebar-link active' "$f"; done   # every count = 1
# (f) New page marks its own item active (+aria-current)
grep -c 'sidebar-link active' $PAGE; grep -c 'aria-current="page"' $PAGE   # 1 and >=1
# (g) NO coming-soon item remains anywhere; sidebar tags balanced per page
grep -rc 'sidebar-link is-soon' pages/*.html | grep -v ':0' || echo "zero is-soon sidebar items app-wide ✓"
python3 - <<'PY'
import glob,re
bad=0
for f in glob.glob("pages/*.html"):
    a=re.search(r'<aside class="sidebar".*?</aside>',open(f,encoding="utf-8").read(),re.DOTALL).group(0)
    if len(re.findall(r'<a\b',a))!=len(re.findall(r'</a>',a)) or len(re.findall(r'<span\b',a))!=len(re.findall(r'</span>',a)): bad+=1; print("UNBALANCED",f)
print("unbalanced sidebars:",bad)   # expect 0
PY
# (h) page structure: 5 kpi cards, 5 th, 3 filters, request form (textarea), .note, status chips
grep -c 'card kpi' $PAGE              # 5
grep -c '<th>' $PAGE                 # 5
grep -c 'filter-select' $PAGE        # 3
grep -c '<textarea' $PAGE            # >=1
grep -c 'class="note"' $PAGE         # >=1 (tax note)
# (i) CLIENT shell: MOHASEBATY brand + client-pill; no btn-rose
grep -c 'client-pill' $PAGE          # >=1
grep -c 'btn-rose' $PAGE             # 0
# (j) ROGUE-CLASS SWEEP — every class used must exist in output.css
for c in $(grep -oE 'class="[^"]+"' "$PAGE" | sed 's/class="//;s/"//' | tr ' ' '\n' | sort -u); do grep -qE "\.${c}([ ,{>:.]|\$)" assets/css/output.css || echo "UNDEFINED: .$c"; done   # expect: none
# (k) CLIENT-INTERNALS KEYWORD SCAN — must be ZERO (the defining gate)
grep -nE 'مدين|دائن|شجرة الحسابات|قيد محاسبي|القيود|ترحيل|مراجعة وتصنيف' $PAGE   # expect: none (note: 'فريق المحاسبة' / 'قيد المراجعة' are allowed client phrases)
grep -nE '\b(41|42|43|51|52|53)[0-9]{2}\b' $PAGE                                 # expect: none (no account codes)
# (l) index counters + page count
grep -o '[0-9]* شاشة مكتملة' index.html              # "37 شاشة مكتملة"
ls -1 pages/*.html | wc -l                           # 37
grep -c 'landing-card is-soon' index.html            # 0 (no coming-soon cards remain)
# (m) contextual links
grep -q 'href="client-reports.html"' pages/client-dashboard.html && echo "dashboard→reports ✓"
grep -q 'href="client-reports.html"' pages/client-documents.html && echo "documents→reports ✓"
```

> Note for check (k): the page legitimately uses client-friendly phrases like "فريق المحاسبة", "قيد المراجعة" (under review), and "مبدئي/معتمد" — these are allowed. The scan targets *internal accounting mechanics* (debit/credit, chart of accounts, journal entries/قيود, posting/ترحيل, raw account codes).

## 4. Manual checks (browser)

**client-reports.html** — client header (MOHASEBATY brand + client-pill) with title "تقاريري" + تحميل/طلب actions; 3 simple filters; 5 summary cards with estimates labelled "تقديري"; reports table with the 4 example reports + 3 statuses (معتمد green / مبدئي amber / يحتاج مستندات slate); status-explanations card (3 rows); gold `.note` tax disclaimer; request-report card with نوع التقرير + الفترة + ملاحظات + إرسال الطلب; NO accounting jargon anywhere; no console errors.

**Integration** — from `client-dashboard.html` and `client-documents.html`, a link opens `client-reports.html`; the sidebar item "تقارير العميل" is live; `index.html` shows it as a live card with NO "قريباً" anywhere and footer "37 شاشة مكتملة"; mobile: layout stacks, table scrolls, cards/form fit.

## 5. Done = all of the following

- Static checks (a)–(m) pass — **including (g) balanced sidebars + zero is-soon, (j) zero rogue classes, (k) zero client-internals, no `.btn-rose`**.
- Page passes manual checks with zero console errors and zero broken links.
- Every page has exactly one active sidebar item; **no module shows "قريباً"** anywhere.
- `output.css` rebuilt only if `input.css` changed (none expected).
- No existing page, section, link, or asset path was broken.
