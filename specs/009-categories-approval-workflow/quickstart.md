# Quickstart: Document Categories & Approval Workflow (Spec 009)

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

- `http://localhost:8000/pages/document-categories.html`
- `http://localhost:8000/pages/approval-workflow.html`

## 3. Static audit (scriptable)

```bash
PAGES="pages/document-categories.html pages/approval-workflow.html"

# (a) Arabic RTL
grep -L 'lang="ar" dir="rtl"' $PAGES                 # expect: none
# (b) Local assets
grep -L '../assets/css/output.css' $PAGES; grep -L '../assets/js/main.js' $PAGES   # expect: none
# (c) No CDN/framework
grep -rniE 'cdn|bootstrap|react|vue|angular|next|unpkg|jsdelivr|googleapis' index.html $PAGES   # expect: none
# (d) Both live links across every page
grep -rn 'is-soon' pages/*.html | grep -E 'تصنيفات المستندات|سير الاعتماد'   # expect: none
for h in document-categories approval-workflow; do printf '%s: ' "$h"; grep -l "href=\"$h.html\"" pages/*.html | wc -l; done   # expect each = 34
# (e) Exactly one active sidebar item per page
for f in pages/*.html; do printf '%s ' "$f"; grep -c 'sidebar-link active' "$f"; done   # every count = 1
# (f) Each new page marks its own item active (+aria-current)
for h in document-categories approval-workflow; do printf '%s: ' "$h"; grep -c 'sidebar-link active' pages/$h.html; grep -c 'aria-current="page"' pages/$h.html; done
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
# (h) approval-workflow uses .steps + switches; document-categories uses .seg + table; no .btn-rose
grep -c 'class="steps"' pages/approval-workflow.html          # 1
grep -c 'class="switch"' pages/approval-workflow.html         # >=3
grep -c 'class="seg"' pages/document-categories.html          # >=1
grep -c 'btn-rose' $PAGES                                     # 0 each
# (i) Table column counts
grep -c '<th>' pages/document-categories.html                # 8
grep -c '<th>' pages/approval-workflow.html                  # 6
# (j) ROGUE-CLASS SWEEP — every class used must exist in output.css
for f in $PAGES; do for c in $(grep -oE 'class="[^"]+"' "$f" | sed 's/class="//;s/"//' | tr ' ' '\n' | sort -u); do grep -qE "\.${c}([ ,{>:.]|\$)" assets/css/output.css || echo "UNDEFINED in $f: .$c"; done; done   # expect: none
# (k) index counters + page count + contextual links
grep -o '[0-9]* شاشة مكتملة' index.html              # "34 شاشة مكتملة"
grep -o '[0-9]* وحدة' index.html | head -1           # "3 وحدة"
ls -1 pages/*.html | wc -l                           # 34
grep -q 'href="document-categories.html"' pages/document-review.html && echo "document-review link ✓"
grep -q 'href="approval-workflow.html"' pages/settings.html && echo "settings link ✓"
```

## 4. Manual checks (browser)

**document-categories.html** — client selector + global-template `.seg` toggle; group `.seg` filter (الكل/إيرادات/مصروفات/قبض/صرف); 8-column table with 12 rows incl. an unlinked "—" row, a "مخفي" row, and a "يحتاج مراجعة" row; "إضافة تصنيف" opens a 7-field modal (incl. خاضع/يظهر switches); usage card with 3 insights; no console errors.

**approval-workflow.html** — 3 workflow switches (2 on, 1 off); 4-step `.steps` visual (رفع → مراجعة → اعتماد → ترحيل); 6-column rules table with the 5 example rules (incl. the "يحتاج إكمال" rule with "—" final approver); "إضافة قاعدة" opens a 5-field modal; pending-approvals side card (7/2/1); no console errors.

**Integration** — from any page, both sidebar links navigate; `index.html` shows both as live cards (no قريباً), footer = 34 + 3; contextual links from `settings.html` and `document-review.html` resolve; mobile: layout stacks, tables scroll, modals fit.

## 5. Done = all of the following

- Static checks (a)–(k) pass — **including (g) balanced sidebars, (j) zero rogue classes, (h) no `.btn-rose`**.
- Both pages pass manual checks with zero console errors and zero broken links.
- Every page has exactly one active sidebar item; no unintended coming-soon conversions.
- `output.css` rebuilt only if `input.css` changed (none expected).
- No existing page, section, link, or asset path was broken.
