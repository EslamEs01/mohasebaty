# Quickstart: Client Onboarding & Tax Profile

How to build, run, and verify this feature locally. Static files only; no backend.

## 1. Build (only if input.css changed)

```bash
npm run build:css        # → assets/css/output.css
```

If no CSS was added (the goal), no rebuild is required — the two pages reuse existing classes.

## 2. Serve and open

```bash
npm run serve            # http://localhost:8000
```

Open and inspect:
- `http://localhost:8000/pages/client-onboarding.html`
- `http://localhost:8000/pages/client-tax-settings.html`

## 3. Static audit (scriptable)

```bash
# (a) New pages declare Arabic RTL
grep -L 'lang="ar" dir="rtl"' pages/client-onboarding.html pages/client-tax-settings.html   # expect: none

# (b) New pages use local assets via correct relative path
grep -L '../assets/css/output.css' pages/client-onboarding.html pages/client-tax-settings.html  # none
grep -L '../assets/js/main.js'     pages/client-onboarding.html pages/client-tax-settings.html  # none

# (c) No CDN / framework anywhere
grep -rniE 'cdn|bootstrap|react|vue|angular|next|unpkg|jsdelivr|googleapis' index.html pages/*.html  # none

# (d) The two modules are now LIVE links in the sidebar (not coming-soon) on all 17 pages
grep -rn 'is-soon' pages/*.html | grep -E 'client-onboarding|client-tax-settings'   # expect: none
grep -lc 'href="client-onboarding.html"'   pages/*.html | wc -l                      # expect: 17 files contain it
grep -lc 'href="client-tax-settings.html"' pages/*.html | wc -l                      # expect: 17 files contain it

# (e) Exactly one active sidebar item per page (all 17)
for f in pages/*.html; do printf '%s ' "$f"; grep -c 'sidebar-link active' "$f"; done  # every count = 1

# (f) The two new pages mark the correct item active
grep -c 'sidebar-link active' pages/client-onboarding.html       # 1
grep -c 'sidebar-link active' pages/client-tax-settings.html     # 1

# (g) No coming-soon item is ever a link; landing has no <a is-soon>
grep -n 'is-soon' pages/*.html | grep '<a '                      # none
grep -n '<a[^>]*is-soon' index.html                              # none

# (h) Wizard panels are not hidden in the HTML source (graceful degradation)
grep -n 'wizard-panel[^>]*hidden' pages/client-onboarding.html   # expect: none (JS hides at runtime)

# (i) Country presets consistent (each block self-contained)
grep -c 'data-country-block' pages/client-onboarding.html        # 2
grep -c 'data-country-block' pages/client-tax-settings.html      # 2

# (j) index footer reflects new scope
grep 'وحدة قادمة' index.html                                     # "17 شاشة مكتملة + 20 وحدة قادمة"
```

## 4. Manual checks (browser)

**client-onboarding.html**
- 8-step stepper shows; clicking a step / Prev / Next switches the visible panel; active indicator updates.
- Each step shows its specified Arabic fields with realistic data.
- Step 4: toggling السعودية ↔ مصر swaps the preset block (15%/SAR/ZATCA ↔ 14%/EGP/ETA).
- Step 6: 4 COA options behave as single-select. Step 7: 5 upload areas + notes render and the dropzone
  visual state works. Step 8: review summarizes choices.
- Header actions present (حفظ كمسودة / إنشاء العميل / رجوع إلى العملاء); back link → clients.html works.
- No console errors. Disable JS → all 8 panels render stacked and readable.

**client-tax-settings.html**
- Client selector + Save present; identity, VAT config, period, readiness, client-display sections render.
- Country toggle swaps the readiness preset consistently.
- Warning note visible: "الإعدادات تؤثر على تقارير الضريبة والقيود المحاسبية المستقبلية."
- No console errors.

**Integration**
- clients.html shows a working "إعداد عميل جديد" link to the wizard (modal still present).
- settings.html shows a working link to client-tax-settings.html (existing sections intact).
- index.html: the two cards are live links (no قريباً); footer count = 17 + 20.
- Mobile width: both new pages' sidebar toggles open/close; forms/cards stack; no overflow.

## 5. Done = all of the following

- Static checks (a)–(j) produce the expected results.
- Both new pages pass manual checks with zero console errors and zero broken links.
- Every page still has exactly one active sidebar item; no unintended coming-soon conversions.
- `output.css` rebuilt only if `input.css` changed.
