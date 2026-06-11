# Quickstart: Master Data — Vendors / Commercial Customers / Bank Accounts (Spec 006)

How to build, run, and verify this feature locally. Static files only; no backend; no CRUD/filter logic.

## 1. Build (only if input.css changed)

```bash
npm run build:css        # → assets/css/output.css
```

Zero new CSS is the goal — every class is already in `output.css`. If so, no rebuild needed.

## 2. Serve and open

```bash
npm run serve            # http://localhost:8000
```

- `http://localhost:8000/pages/vendors.html`
- `http://localhost:8000/pages/commercial-customers.html`
- `http://localhost:8000/pages/bank-accounts.html`

## 3. Static audit (scriptable)

```bash
PAGES="pages/vendors.html pages/commercial-customers.html pages/bank-accounts.html"

# (a) Arabic RTL
grep -L 'lang="ar" dir="rtl"' $PAGES                 # expect: none
# (b) Local assets
grep -L '../assets/css/output.css' $PAGES; grep -L '../assets/js/main.js' $PAGES   # expect: none
# (c) No CDN/framework
grep -rniE 'cdn|bootstrap|react|vue|angular|next|unpkg|jsdelivr|googleapis' index.html $PAGES   # expect: none
# (d) All 3 live links across every page
grep -rn 'is-soon' pages/*.html | grep -E 'vendors|commercial-customers|bank-accounts'   # expect: none
for h in vendors commercial-customers bank-accounts; do printf '%s: ' "$h"; grep -l "href=\"$h.html\"" pages/*.html | wc -l; done   # expect each = 28
# (e) Exactly one active sidebar item per page
for f in pages/*.html; do printf '%s ' "$f"; grep -c 'sidebar-link active' "$f"; done   # every count = 1
# (f) Each new page marks its own item active (+aria-current)
for h in vendors commercial-customers bank-accounts; do printf '%s: ' "$h"; grep -c 'sidebar-link active' pages/$h.html; printf '%s aria: ' "$h"; grep -c 'aria-current="page"' pages/$h.html; done
# (g) No coming-soon item is a link
grep -n 'is-soon' pages/*.html | grep '<a '          # expect: none
# (h) Add modal per page via data-overlay
for h in vendors commercial-customers bank-accounts; do printf '%s: ' "$h"; grep -c 'data-overlay' pages/$h.html; done   # >=1 each
# (i) Table column counts
grep -c '<th>' pages/vendors.html                    # 9
grep -c '<th>' pages/commercial-customers.html       # 9
grep -c '<th>' pages/bank-accounts.html              # 9
# (j) ROGUE-CLASS SWEEP — every class used must exist in output.css (the Spec 004 lesson)
for f in $PAGES; do for c in $(grep -oE 'class="[^"]+"' "$f" | sed 's/class="//;s/"//' | tr ' ' '\n' | sort -u); do grep -qE "\.${c}([ ,{>:.]|\$)" assets/css/output.css || echo "UNDEFINED in $f: .$c"; done; done   # expect: none
# (k) index counters + page count
grep -o '[0-9]* شاشة مكتملة' index.html              # expect: "28 شاشة مكتملة"
grep -o '[0-9]* وحدة' index.html | head -1           # expect: "9 وحدة"
ls -1 pages/*.html | wc -l                           # expect: 28
```

## 4. Manual checks (browser)

**vendors.html** — client selector; 4 KPI cards (34/29/18/3); filter bar (بحث + الحالة + الدولة + خاضع للضريبة); 9-column table with 8 Arabic rows incl. a "—" tax-number row and a موقوف row; "إضافة مورد" opens a 7-field modal; modal closes on إلغاء/Escape; no console errors.

**commercial-customers.html** — header makes clear these are the client company's customers; 4 KPI cards (52/47/26/5); 9-column table with 8 rows; "إضافة عميل" opens a 6-field modal; no console errors.

**bank-accounts.html** — 4 KPI cards (9/5/2/2); 9-column table with 7 rows covering بنك/خزنة/محفظة إلكترونية (cash/wallet show "—" for bank/IBAN); "إضافة حساب" opens an 8-field modal incl. النوع choice; no console errors.

**Integration** — from any page, the 3 sidebar links navigate; `index.html` shows all 3 as live cards (no قريباً), footer = 28 + 9; mobile width: sidebar toggles, tables scroll, KPI cards stack, modals fit.

## 5. Done = all of the following

- Static checks (a)–(k) produce the expected results — **including (j): zero undefined/rogue classes**.
- All 3 pages pass manual checks with zero console errors and zero broken links.
- Every page has exactly one active sidebar item; no unintended coming-soon conversions.
- `output.css` rebuilt only if `input.css` changed (none expected).
- No existing page, section, link, or asset path was broken.
