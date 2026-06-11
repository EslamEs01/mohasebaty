# Quickstart: Bank Statement Import & Reconciliation (Spec 007)

How to build, run, and verify this feature locally. Static files only; no backend; no matching logic.

## 1. Build (only if input.css changed)

```bash
npm run build:css        # → assets/css/output.css
```

Zero new CSS is the goal — every class is already in `output.css`. If so, no rebuild needed.

## 2. Serve and open

```bash
npm run serve            # http://localhost:8000
```

- `http://localhost:8000/pages/bank-statement-import.html`
- `http://localhost:8000/pages/bank-reconciliation.html`

## 3. Static audit (scriptable)

```bash
PAGES="pages/bank-statement-import.html pages/bank-reconciliation.html"

# (a) Arabic RTL
grep -L 'lang="ar" dir="rtl"' $PAGES                 # expect: none
# (b) Local assets
grep -L '../assets/css/output.css' $PAGES; grep -L '../assets/js/main.js' $PAGES   # expect: none
# (c) No CDN/framework
grep -rniE 'cdn|bootstrap|react|vue|angular|next|unpkg|jsdelivr|googleapis' index.html $PAGES   # expect: none
# (d) Both live links across every page
grep -rn 'is-soon' pages/*.html | grep -E 'bank-statement-import|bank-reconciliation'   # expect: none
for h in bank-statement-import bank-reconciliation; do printf '%s: ' "$h"; grep -l "href=\"$h.html\"" pages/*.html | wc -l; done   # expect each = 30
# (e) Exactly one active sidebar item per page
for f in pages/*.html; do printf '%s ' "$f"; grep -c 'sidebar-link active' "$f"; done   # every count = 1
# (f) Each new page marks its own item active (+aria-current)
for h in bank-statement-import bank-reconciliation; do printf '%s: ' "$h"; grep -c 'sidebar-link active' pages/$h.html; grep -c 'aria-current="page"' pages/$h.html; done
# (g) No coming-soon item is a link
grep -n 'is-soon' pages/*.html | grep '<a '          # expect: none
# (h) Reconciliation uses the approved .workspace split + no .btn-rose
grep -c 'class="workspace"' pages/bank-reconciliation.html   # expect: 1
grep -c 'btn-rose' pages/bank-statement-import.html pages/bank-reconciliation.html   # expect: 0 each
# (i) Table column counts
grep -c '<th>' pages/bank-statement-import.html      # 6 (preview)
grep -c '<th>' pages/bank-reconciliation.html        # 12 (6 txns + 6 docs)
# (j) ROGUE-CLASS SWEEP — every class used must exist in output.css (the Spec 004 lesson)
for f in $PAGES; do for c in $(grep -oE 'class="[^"]+"' "$f" | sed 's/class="//;s/"//' | tr ' ' '\n' | sort -u); do grep -qE "\.${c}([ ,{>:.]|\$)" assets/css/output.css || echo "UNDEFINED in $f: .$c"; done; done   # expect: none
# (k) index counters + page count + contextual links
grep -o '[0-9]* شاشة مكتملة' index.html              # expect: "30 شاشة مكتملة"
grep -o '[0-9]* وحدة' index.html | head -1           # expect: "7 وحدة"
ls -1 pages/*.html | wc -l                           # expect: 30
grep -q 'href="bank-statement-import.html"' pages/bank-accounts.html && echo "bank-accounts link ✓"
grep -q 'href="bank-statement-import.html"' pages/data-import.html && echo "data-import link ✓"
```

## 4. Manual checks (browser)

**bank-statement-import.html** — client/account/period selectors; upload area with a selected-file state; mapping summary `.tip` + 6 mapped columns; 6-column preview table with 9 Arabic rows; the 3 actions; "متابعة للمطابقة" → `bank-reconciliation.html`; no console errors.

**bank-reconciliation.html** — 4 KPI cards (9/4/3/2); the two-panel `.workspace` (bank transactions on the right, suggested documents + match-details on the left); transactions table 6 cols × 9 rows covering مطابق تلقائيًا/يحتاج مراجعة/غير مطابق; suggested-docs table 6 cols × 4 rows with descending نسبة التطابق; match-details card (selected txn / proposed doc / الفرق / ملاحظات) + 4 actions (مطابقة/تجاهل/إنشاء مستند/طلب توضيح); on mobile the workspace stacks to one column; no console errors.

**Integration** — from any page, both sidebar links navigate; `index.html` shows both as live cards (no قريباً), footer = 30 + 7; contextual links from `bank-accounts.html` and `data-import.html` resolve.

## 5. Done = all of the following

- Static checks (a)–(k) produce the expected results — **including (j): zero undefined/rogue classes, and (h): no `.btn-rose`, one `.workspace`**.
- Both pages pass manual checks with zero console errors and zero broken links.
- Every page has exactly one active sidebar item; no unintended coming-soon conversions.
- `output.css` rebuilt only if `input.css` changed (none expected).
- No existing page, section, link, or asset path was broken.
