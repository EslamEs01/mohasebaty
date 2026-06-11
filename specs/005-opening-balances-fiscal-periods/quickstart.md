# Quickstart: Opening Balances & Fiscal Periods (Spec 005)

How to build, run, and verify this feature locally. Static files only; no backend; no real arithmetic.

## 1. Build (only if input.css changed)

```bash
npm run build:css        # → assets/css/output.css
```

Zero new CSS is the goal — every class is already in `output.css`. If so, no rebuild is needed.

## 2. Serve and open

```bash
npm run serve            # http://localhost:8000
```

- `http://localhost:8000/pages/opening-balances.html`
- `http://localhost:8000/pages/fiscal-periods.html`

## 3. Static audit (scriptable)

```bash
PAGES="pages/opening-balances.html pages/fiscal-periods.html"

# (a) Arabic RTL declared
grep -L 'lang="ar" dir="rtl"' $PAGES                 # expect: none

# (b) Local asset paths
grep -L '../assets/css/output.css' $PAGES            # expect: none
grep -L '../assets/js/main.js'     $PAGES            # expect: none

# (c) No CDN/framework
grep -rniE 'cdn|bootstrap|react|vue|angular|next|unpkg|jsdelivr|googleapis' index.html $PAGES
# expect: none (data-wizard-next is a false positive — ignore)

# (d) Both modules are live links (not coming-soon) and reachable from every page
grep -rn 'is-soon' pages/*.html | grep -E 'opening-balances|fiscal-periods'   # expect: none
for h in opening-balances fiscal-periods; do printf '%s: ' "$h"; grep -l "href=\"$h.html\"" pages/*.html | wc -l; done
# expect each = 25 (after wiring)

# (e) Exactly one active sidebar item per page
for f in pages/*.html; do printf '%s ' "$f"; grep -c 'sidebar-link active' "$f"; done   # every count = 1

# (f) Each new page marks its own item active (+aria-current)
grep -c 'sidebar-link active' pages/opening-balances.html   # 1
grep -c 'sidebar-link active' pages/fiscal-periods.html     # 1
grep -c 'aria-current="page"' pages/opening-balances.html   # >=1
grep -c 'aria-current="page"' pages/fiscal-periods.html     # >=1

# (g) No coming-soon item is a link
grep -n 'is-soon' pages/*.html | grep '<a '          # expect: none

# (h) Modals present via data-overlay
grep -c 'data-overlay' pages/opening-balances.html   # >=1 (add-balance)
grep -c 'data-overlay' pages/fiscal-periods.html     # >=2 (close + reopen)

# (i) Opening-balances table has 7 columns; fiscal-periods table has 6
grep -c '<th>' pages/opening-balances.html           # 7 (+ any totals row headers)
grep -c '<th>' pages/fiscal-periods.html             # 6

# (j) ROGUE-CLASS SWEEP — every class used must exist in output.css (the Spec 004 lesson)
#     Extract class tokens from the 2 pages and confirm each is defined in output.css.
for f in $PAGES; do
  for c in $(grep -oE 'class="[^"]+"' "$f" | sed 's/class="//;s/"//' | tr ' ' '\n' | sort -u); do
    # skip utility/state-only tokens that are legitimately compositional
    grep -qE "\.${c}([ ,{>:.]|\$)" assets/css/output.css || echo "UNDEFINED in $f: .$c"
  done
done
# expect: no "UNDEFINED" lines (ignore known Tailwind utilities if any are intentionally used)

# (k) index counters updated
grep -o '[0-9]* شاشة مكتملة' index.html              # expect: "25 شاشة مكتملة"
grep -o '[0-9]* وحدة' index.html | head -1           # expect: "12 وحدة"
ls -1 pages/*.html | wc -l                           # expect: 25
```

## 4. Manual checks (browser)

**opening-balances.html** — client selector + go-live date render; 4 status cards (المدين 580,000 / الدائن 580,000 / الفرق 0 / الحالة متوازن); `.tip` validation card; 7-column table with 10 Arabic account rows (مطابق/يحتاج مراجعة chips); "إضافة رصيد" opens the modal (4 fields: الحساب، مدين، دائن، ملاحظات); modal closes on إلغاء/Escape; "اعتماد الأرصدة"/"رفع ملف أرصدة"/"تصدير" present; no console errors.

**fiscal-periods.html** — client selector; fiscal-year setup (2026, 01/01–31/12, ريال سعودي, نشطة); 12 month rows covering مفتوحة/قيد المراجعة/مغلقة with the 3 readiness counts; open/review rows show "إغلاق شهر" → opens close modal (warning `.tip` + incomplete-items summary + تأكيد الإغلاق); مغلقة rows show "فتح بصلاحية" → opens reopen modal (سبب + موافقة مدير + تأكيد); "إنشاء سنة مالية جديدة" present; no console errors.

**Integration** — from any other page, both sidebar links navigate correctly; `index.html` shows both as live cards (no قريباً), footer = 25 + 12; contextual links exist in `settings.html`, `reports.html`, `chart-of-accounts.html`; mobile width: sidebar toggles, tables scroll, cards stack, modals fit.

## 5. Done = all of the following

- Static checks (a)–(k) produce the expected results — **including (j): zero undefined/rogue classes**.
- Both pages pass manual checks with zero console errors and zero broken links.
- Every page has exactly one active sidebar item; no unintended coming-soon conversions.
- `output.css` rebuilt only if `input.css` changed (none expected).
- No existing page, section, link, or asset path was broken.
