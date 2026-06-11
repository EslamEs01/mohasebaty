# Quickstart: Modals & Cross-Page Actions Completion (Spec 012)

Frontend-only. **No Tailwind rebuild is required** (zero new CSS). No backend.

## 1. Serve

Open any page directly in Live Server (VS Code) or:

```bash
# from repo root
python3 -m http.server 5500
# then visit http://localhost:5500/pages/document-review.html
```

## 2. Build (only if a class is genuinely missing — it should NOT be)

The plan targets **zero new CSS**. Only if the rogue-class sweep (check c) finds a missing class would you add it to `assets/css/input.css` and rebuild:

```bash
npm run build:css   # tailwindcss -i assets/css/input.css -o assets/css/output.css
```

If you run this, the sweep must afterward return zero missing classes. Prefer reusing an existing class instead.

## 3. Audit checks (gate sign-off)

Run from repo root. All must pass.

**(a) 7-element modal completeness** — every new modal has all required parts:
```bash
for id in requestClarificationModal rejectDocumentModal approveReportModal \
          confirmPostingModal uploadDataModal importErrorActionModal assignAccountantModal; do
  f=$(grep -rl "id=\"$id\"" pages/)
  echo "== $id ($f) =="
  grep -q "data-overlay id=\"$id\"" "$f" && echo "  overlay ✓"
  grep -q "role=\"dialog\"" "$f" && echo "  dialog ✓"
  grep -q "modal-head" "$f" && grep -q "data-close" "$f" && echo "  head+close ✓"
  grep -q "modal-foot" "$f" && echo "  foot ✓"
done
```
Manually confirm each has: title `<h3>`, a short description line, body (fields or details), a primary button, and a cancel `[data-close]`.

**(b) All 16 modals present** (9 existing + 7 new):
```bash
for id in addClientModal addVendorModal addCustomerModal addAccountModal addCategoryModal \
          addUserModal manualEntryModal closePeriodModal reopenPeriodModal \
          requestClarificationModal rejectDocumentModal approveReportModal confirmPostingModal \
          uploadDataModal importErrorActionModal assignAccountantModal; do
  printf "%-26s " "$id"; grep -rl "id=\"$id\"" pages/ | sed 's#pages/##' | paste -sd', ' || echo "MISSING"
done
```

**(c) Rogue-class sweep** — every class used in the new modals must exist in `output.css`. Spot-check the classes introduced:
```bash
for c in scrim modal modal-head modal-body modal-foot icon-btn tip set-body set-row \
         info ctrl field input fields-grid filter-select select-wrap seg chip btn-primary \
         btn-amber btn-outline toast upload browse req; do
  grep -q "\.$c\b" assets/css/output.css || echo "MISSING CLASS: .$c"
done
```
Expected output: nothing (all present).

**(d) Dead-action sweep** — re-count `href="#"` and confirm each residual is JS-wired or intentionally disabled:
```bash
echo "Total href=\"#\":"; grep -rho 'href="#"' pages/ | wc -l
grep -rn 'href="#"' pages/ | grep -viE 'data-open|dropdown|menu|tab|notif|toggle|aria-haspopup|disabled|is-soon|قريبا' \
  | sed 's#pages/##' || echo "no unexplained dead links"
```
Major-verb links MUST carry a `data-open` or a real `href` (or be disabled). Manually click-through to confirm SC-001/SC-009.

**(e) Export wiring** — every تصدير action opens the confirmation:
```bash
grep -rn 'تصدير' pages/ | grep -v 'data-open="#exportConfirmModal"' | sed 's#pages/##' \
  | grep -iE 'button|<a ' || echo "all export buttons wired"
```

**(f) Client-internals scan** — client-facing modal bodies must not leak accounting internals:
```bash
for f in client-reports.html client-dashboard.html client-documents.html client-document-details.html upload-document.html; do
  grep -nE 'مدين|دائن|قيد|ترحيل|شجرة الحسابات|٤١|٥١|debit|credit' "pages/$f" \
    && echo "  ⚠ review $f for client-boundary" || true
done
```
Any hit must be outside a client-facing modal body (Principle V).

**(g) Preservation** — shared assets and shipped modals untouched:
```bash
git diff --name-only | grep -E 'assets/css/(input|output)\.css|assets/js/main\.js' \
  && echo "⚠ shared asset changed — must stay UNCHANGED" || echo "shared assets clean ✓"
```

**(h) Lang/RTL on every touched page**:
```bash
grep -rL 'lang="ar" dir="rtl"' pages/ | sed 's#pages/##' || echo "all RTL ✓"
```

## 4. Manual QA (per touched page)

- Open each new modal from its trigger; verify title, description, fields/details, primary, cancel, X, overlay.
- Close each via **X**, **cancel**, **scrim click**, **Escape** — page returns to prior state; no other modal appears.
- Mobile/tablet: modal fits viewport, scrolls internally if tall, no horizontal overflow.
- Accountant vs client wording correct; Approve Report absent from `client-reports.html`.
- No console errors anywhere.

## 5. Done when

SC-001…SC-009 all pass: 0 dead major actions, all 16 modals present and complete (7 elements), all destructive/state-change actions confirmed, all 4 close paths work, single shared modal style, no regressions, every export confirmed, full click-through with no dead end.
