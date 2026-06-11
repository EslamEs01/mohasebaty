export const meta = {
  name: 'spec-012-audit-freeze',
  description: 'Full-project frontend audit, fix, and UI freeze before backend',
  phases: [
    { title: 'Audit', detail: '8 Sonnet page-group auditors + 1 Sonnet global + 1 Opus design auditor' },
    { title: 'Fix', detail: 'per-page fixes, model-routed (Sonnet mechanical / Opus design)' },
    { title: 'Freeze', detail: 'Sonnet README + data-model; Opus freeze verdict' },
  ],
}

/* ============================ Phase 1: Audit ============================== */
phase('Audit')

const FINDING = {
  type: 'object',
  required: ['page', 'category', 'severity', 'description', 'fixType', 'suggestedFix'],
  additionalProperties: false,
  properties: {
    page: { type: 'string', description: 'exact filename e.g. clients.html or index.html, or SHARED' },
    category: { type: 'string', description: 'links|active-state|header|rtl|content|empty-state|error-state|tax-profile|responsive|cdn|framework|asset|js|console|doc' },
    severity: { type: 'string', enum: ['blocker', 'major', 'minor'] },
    description: { type: 'string' },
    fixType: { type: 'string', enum: ['mechanical', 'design', 'doc', 'shared'] },
    suggestedFix: { type: 'string' },
  },
}
const AUDIT_SCHEMA = {
  type: 'object',
  required: ['group', 'pagesChecked', 'findings', 'summary'],
  additionalProperties: false,
  properties: {
    group: { type: 'string' },
    pagesChecked: { type: 'array', items: { type: 'string' } },
    findings: { type: 'array', items: FINDING },
    summary: { type: 'string' },
  },
}

const AUDIT_BASE = `You are a STRICT read-only frontend auditor for the Mohasebaty Arabic RTL accounting prototype (static HTML/CSS/local-Tailwind/vanilla-JS; no backend). The project just completed a modals/cross-page-actions pass; your job is to FREEZE the UI: find every real defect. DO NOT modify any file — only report findings.

For EACH of your assigned pages, READ the file and check against this checklist; report a finding for every violation (with the exact page filename, a precise description, a severity, a fixType, and a concrete suggestedFix):
- LINKS: every <a href> points to a real existing file in the repo (pages/*.html, index.html, or assets). Flag broken/missing targets. (category: links)
- ACTIVE STATE: the sidebar marks the CURRENT page active (class active + aria-current="page") and ONLY that one. Flag wrong/missing/duplicate active state. (category: active-state)
- HEADER: top header matches the shared pattern for that portal (client shell: MOHASEBATY brand + .client-pill; accountant shell: avatar chrome). Flag inconsistency. (category: header)
- RTL/LANG: <html lang="ar" dir="rtl"> present; layout RTL-correct. (category: rtl)
- CONTENT: NO lorem ipsum, NO English placeholder text, NO broken Arabic; professional Arabic; realistic demo data. (category: content)
- EMPTY STATES: tables/lists that could be empty have a designed empty-state (icon + message + optional CTA) OR clearly always have data. Flag missing empty states where a user could realistically see none. (category: empty-state, fixType usually design)
- ERROR STATES: import pages (import-errors, import-preview, import-mapping, data-import) and tax pages (vat-report, tax-documents, client-tax-settings) show error/warning states for bad data/validation. Flag missing. (category: error-state)
- TAX PROFILE: tax workflows (client-tax-settings, vat-report, tax-documents) support BOTH Saudi Arabia and Egypt as a configurable profile (e.g. a country/profile selector, KSA 15% VAT vs Egypt 14%, ZATCA vs ETA wording). Flag if only one country is hardcoded with no configurability. (category: tax-profile)
- RESPONSIVE: obvious overflow/cramping risks (huge fixed-width tables without scroll wrapper, header actions that cannot wrap). (category: responsive)
- TECH: scan for Tailwind CDN (cdn.tailwindcss), Bootstrap, React/Vue/Angular/Next, external admin templates, external icon/chart/font CDNs, missing output.css link, missing main.js link, JS that generates main page CONTENT (not just UI toggles). (category: cdn/framework/asset/js)
- CLIENT vs ADMIN: client-portal pages (the client's own dashboard/documents/reports/upload/messages) stay simple & non-technical (NO مدين/دائن/قيد/ترحيل/شجرة الحسابات/account codes); accountant/admin pages may be technical but must be scannable, not cluttered. (category: content)

fixType guide: 'mechanical' = simple edit (fix href, fix active class, swap text); 'design' = needs design judgment (add/design an empty or error state, fix visual hierarchy/layout/responsive architecture, tax-profile UX); 'doc' = documentation (README/CLAUDE); 'shared' = requires editing a shared file (input.css/output.css/main.js/shared sidebar). Use page="SHARED" only for genuinely cross-cutting shared-file issues.
Be precise and conservative: report REAL defects, not stylistic preferences. If a page is clean, return no findings for it. Return the structured result (data, not prose).`

const AUD_GROUPS = [
  { key: 'A-landing-client', pages: 'index.html, client-dashboard.html, client-documents.html, client-document-details.html, client-reports.html, upload-document.html, messages.html' },
  { key: 'B-clientmgmt', pages: 'clients.html, client-profile.html, client-onboarding.html, client-tax-settings.html' },
  { key: 'C-review', pages: 'accountant-inbox.html, document-review.html, approval-workflow.html, tax-documents.html, notifications.html' },
  { key: 'D-reports', pages: 'admin-financial-dashboard.html, reports.html, vat-report.html' },
  { key: 'E-accounting', pages: 'chart-of-accounts.html, journal-entries.html, opening-balances.html, fiscal-periods.html, document-categories.html' },
  { key: 'F-import', pages: 'data-import.html, import-mapping.html, import-preview.html, import-history.html, import-errors.html, import-templates.html' },
  { key: 'G-master-banking', pages: 'vendors.html, commercial-customers.html, bank-accounts.html, bank-statement-import.html, bank-reconciliation.html' },
  { key: 'H-governance', pages: 'audit-log.html, users-permissions.html, settings.html' },
]

const GLOBAL_SCHEMA = {
  type: 'object',
  required: ['cdnViolations', 'frameworkViolations', 'externalTemplate', 'missingAssets', 'readmeStatus', 'claudeStatus', 'sharedShellIssues', 'findings', 'summary'],
  additionalProperties: false,
  properties: {
    cdnViolations: { type: 'array', items: { type: 'string' } },
    frameworkViolations: { type: 'array', items: { type: 'string' } },
    externalTemplate: { type: 'array', items: { type: 'string' } },
    missingAssets: { type: 'array', items: { type: 'string' } },
    readmeStatus: { type: 'string' },
    claudeStatus: { type: 'string' },
    sharedShellIssues: { type: 'array', items: { type: 'string' } },
    findings: { type: 'array', items: FINDING },
    summary: { type: 'string' },
  },
}

const DESIGN_SCHEMA = {
  type: 'object',
  required: ['emptyStatePatternExists', 'errorStatePatternExists', 'taxProfileConfigurable', 'designFindings', 'overallVerdict'],
  additionalProperties: false,
  properties: {
    emptyStatePatternExists: { type: 'boolean' },
    errorStatePatternExists: { type: 'boolean' },
    taxProfileConfigurable: { type: 'boolean' },
    designFindings: { type: 'array', items: FINDING },
    overallVerdict: { type: 'string' },
  },
}

const audits = await parallel([
  ...AUD_GROUPS.map((g) => () =>
    agent(`${AUDIT_BASE}\n\nYOUR GROUP: ${g.key}\nYOUR PAGES (in repo root or pages/): ${g.pages}`,
      { model: 'sonnet', label: `audit:${g.key}`, phase: 'Audit', schema: AUDIT_SCHEMA })),
  () => agent(
    `Read-only GLOBAL audit of the Mohasebaty static frontend. Run shell greps from repo root (do NOT modify files):
1. cdnViolations: grep all of pages/ + index.html for cdn.tailwindcss, any https CDN <script>/<link> (unpkg, jsdelivr, cdnjs, googleapis fonts), bootstrap, react/vue/angular/next.
2. frameworkViolations: any framework runtime references.
3. externalTemplate: signs of an external admin template.
4. missingAssets: every <link href> css and <script src> js and <img src> resolves to an existing file; report missing.
5. readmeStatus: read README.md — is it current (lists all 38 pages? correct run/build/serve commands: npm install, npm run build, npm run serve on :8000)? Note what is stale.
6. claudeStatus: read CLAUDE.md and CLAUDE_FRONTEND_RULES.md — are they accurate vs current state (CLAUDE.md should point to specs/012-modals-cross-page-actions/plan.md)? Note any drift.
7. sharedShellIssues: compare the sidebar/header across a sample of pages — flag inconsistent nav items, broken sidebar links, or divergent header chrome.
Convert concrete defects into findings[] (use page=SHARED or the specific file, fixType doc/shared/mechanical). Return the structured verdict.`,
    { model: 'sonnet', label: 'audit:global', phase: 'Audit', schema: GLOBAL_SCHEMA }),
  () => agent(
    `You are a senior product designer doing a DESIGN-CONSISTENCY freeze audit of the Mohasebaty Arabic RTL accounting prototype (read-only — do NOT modify files). Read a REPRESENTATIVE sample across the app: index.html; a client page (client-dashboard.html, client-reports.html); accountant dashboards (admin-financial-dashboard.html, reports.html); data tables (clients.html, journal-entries.html, vendors.html); forms/modals (document-review.html, clients.html); import states (import-errors.html, import-preview.html, data-import.html); tax (client-tax-settings.html, vat-report.html, tax-documents.html); and assets/css/input.css for reusable component classes.
Assess and report:
- emptyStatePatternExists: is there a reusable empty-state component (icon + message + CTA) used across tables/lists? Name the class if so.
- errorStatePatternExists: is there a reusable error/warning state for import/tax validation? Name it.
- taxProfileConfigurable: do tax workflows support KSA + Egypt as a configurable profile (selector, differing VAT %, ZATCA/ETA), or is one country hardcoded?
- designFindings[]: real design weaknesses worth fixing before freeze — visual hierarchy problems, cluttered admin screens, inconsistent card/table/badge usage, missing empty/error states on specific pages, weak responsive architecture, or tax-profile gaps. Mark each with the specific page, severity, and fixType ('design' for judgment fixes, 'shared' if it needs a new reusable class in input.css). Be selective — premium-polish issues only, not nitpicks.
Return the structured verdict.`,
    { model: 'opus', label: 'audit:design', phase: 'Audit', schema: DESIGN_SCHEMA }),
])

const groupAudits = audits.slice(0, AUD_GROUPS.length).filter(Boolean)
const globalAudit = audits[AUD_GROUPS.length] || null
const designAudit = audits[AUD_GROUPS.length + 1] || null

const allFindings = [
  ...groupAudits.flatMap((a) => a.findings || []),
  ...((globalAudit && globalAudit.findings) || []),
  ...((designAudit && designAudit.designFindings) || []),
]
log(`Audit complete: ${allFindings.length} findings (${allFindings.filter(f => f.severity !== 'minor').length} major/blocker).`)

/* ============================= Phase 2: Fix ============================== */
phase('Fix')

// Page-local, actionable fixes only. Group by page; skip doc/shared (handled separately).
const PAGE_FIXABLE = allFindings.filter(
  (f) => f.fixType === 'mechanical' || f.fixType === 'design'
)
const byPage = {}
for (const f of PAGE_FIXABLE) {
  if (!f.page || f.page === 'SHARED') continue
  ;(byPage[f.page] ||= []).push(f)
}
const pagesToFix = Object.keys(byPage)
log(`Fixing ${pagesToFix.length} pages (shared/doc findings deferred to orchestrator).`)

const FIX_SCHEMA = {
  type: 'object',
  required: ['page', 'fixesApplied', 'filesChanged', 'skipped', 'verifiedClean'],
  additionalProperties: false,
  properties: {
    page: { type: 'string' },
    fixesApplied: { type: 'array', items: { type: 'string' } },
    filesChanged: { type: 'array', items: { type: 'string' } },
    skipped: { type: 'array', items: { type: 'string' } },
    verifiedClean: { type: 'boolean' },
  },
}

const FIX_BASE = `You are fixing audit findings on ONE page of the Mohasebaty Arabic RTL accounting prototype during a UI FREEZE. Work ONLY on the one assigned page file (and never any shared file). Other agents fix other pages concurrently.

HARD RULES:
- SURGICAL fixes only — resolve EXACTLY the listed findings. Do NOT redesign, do NOT restyle working sections, do NOT remove existing content.
- ZERO new CSS: reuse only classes already in assets/css/output.css. Do NOT edit assets/css/input.css, output.css, assets/js/main.js, README, or CLAUDE files (the orchestrator handles shared/doc items). If a finding truly needs a shared change, SKIP it and report it in 'skipped'.
- ZERO new JS; modals/toggles use existing data-open/data-close. No JS-generated content.
- Arabic RTL only; professional wording; realistic Arabic demo data. Preserve lang="ar" dir="rtl".
- For empty-state/error-state findings: add the state by REUSING existing components/patterns already present elsewhere in the project (find a page that already has an empty or error state and clone its markup). If no reusable pattern exists at all, SKIP and report it (the orchestrator will add a shared component).
- For active-state findings: ensure ONLY the current page's sidebar item has class active + aria-current="page".
- For broken-link findings: point the href to the correct REAL existing file.
- Preserve all prior work (the 16 modals, wired actions). No duplicate element IDs.

After fixing, re-open the page, confirm valid HTML, no duplicate ids, links resolve, lang/dir intact, and that you changed ONLY the assigned page. Return the structured result (data, not prose).`

const fixResults = await parallel(
  pagesToFix.map((pg) => () => {
    const findings = byPage[pg]
    const needsDesign = findings.some((f) => f.fixType === 'design')
    const model = needsDesign ? 'opus' : 'sonnet'
    const list = findings
      .map((f, i) => `${i + 1}. [${f.severity}/${f.category}] ${f.description}\n   suggested: ${f.suggestedFix}`)
      .join('\n')
    return agent(
      `${FIX_BASE}\n\nYOUR PAGE: ${pg.includes('/') ? pg : (pg === 'index.html' ? 'index.html' : 'pages/' + pg)}\n\nFINDINGS TO FIX:\n${list}`,
      { model, label: `fix:${pg}`, phase: 'Fix', schema: FIX_SCHEMA }
    )
  })
)
const fixed = fixResults.filter(Boolean)
log(`Fix phase: ${fixed.length} pages processed.`)

/* ============================ Phase 3: Freeze ============================ */
phase('Freeze')

const README_SCHEMA = {
  type: 'object',
  required: ['updated', 'sections', 'pageCount'],
  additionalProperties: false,
  properties: { updated: { type: 'boolean' }, sections: { type: 'array', items: { type: 'string' } }, pageCount: { type: 'integer' } },
}
const MODEL_SCHEMA = {
  type: 'object',
  required: ['entities', 'backendAssumptions', 'notesPath'],
  additionalProperties: false,
  properties: {
    entities: {
      type: 'array',
      items: {
        type: 'object',
        required: ['name', 'fields', 'relationships', 'sourcePages'],
        additionalProperties: false,
        properties: {
          name: { type: 'string' },
          fields: { type: 'array', items: { type: 'string' } },
          relationships: { type: 'array', items: { type: 'string' } },
          sourcePages: { type: 'array', items: { type: 'string' } },
        },
      },
    },
    backendAssumptions: { type: 'array', items: { type: 'string' } },
    notesPath: { type: 'string' },
  },
}

const freezeOutputs = await parallel([
  () => agent(
    `Rewrite README.md for the Mohasebaty frontend so it is CURRENT and complete for a freeze before backend work. READ the existing README.md (preserve its Arabic/professional tone and bilingual style), package.json scripts, and tailwind.config.js. The README MUST include:
- Project intro (Arabic RTL outsourced accounting/bookkeeping static frontend, ready for Django/backend integration).
- A complete table of ALL 38 pages with Arabic name + path: index.html plus the 37 files in pages/ (client portal vs accountant/admin sections).
- Tech stack (HTML/CSS/local Tailwind v3, vanilla JS for UI only, self-hosted IBM Plex fonts; NO CDN/framework).
- Setup & run: \`npm install\`, \`npm run build\` (setup:fonts + build:css), \`npm run watch:css\` (dev), \`npm run serve\` (http://localhost:8000) — and that you open index.html via Live Server too.
- Project structure tree (index.html, pages/, assets/css/{input,output}.css, assets/js/main.js, assets/fonts, tailwind.config.js, package.json, specs/).
- Conventions: Arabic-first RTL, no JS-generated content, reuse the approved design system, client vs accountant separation, tax profiles KSA+Egypt.
- A short "Status: UI frozen — ready for backend" note.
Write the file. Use real, accurate Arabic page names (read each file's <title> if unsure). Return the structured result.`,
    { model: 'sonnet', label: 'freeze:readme', phase: 'Freeze', schema: README_SCHEMA }),
  () => agent(
    `Infer a PRE-BACKEND data model and backend assumptions from the FROZEN Mohasebaty UI, and write them to specs/012-modals-cross-page-actions/freeze-audit.md. READ the relevant pages to extract real fields from forms/tables/modals. Cover these entities at minimum (add any you find): Client (company), TaxProfile (KSA/Egypt), Vendor, CommercialCustomer, BankAccount, Document, DocumentCategory, JournalEntry + JournalLine, Account (chart of accounts), FiscalPeriod, OpeningBalance, ImportBatch + ImportError + ImportTemplate + ImportMapping, Report, VatReturn, TaxDocument, ApprovalWorkflow/Rule, AuditLogEntry, Notification, User + Role/Permission, Reconciliation/BankStatement, Message/Clarification.
For each entity: list concrete fields (inferred from the UI), relationships (FKs / one-to-many), and which pages evidence it (sourcePages). Then list backendAssumptions[] — behaviors the UI implies the backend must provide (auth/roles, document status state-machine: قيد المراجعة→مطلوب توضيح→تم التصنيف→مرفوض→تم الترحيل; journal posting & reversal; period close/reopen locking; VAT calc per profile (KSA 15% / Egypt 14%); import validation pipeline; approval workflow; audit logging; notifications; file upload/storage; export generation).
Write the markdown file (Arabic headings ok, technical English field names ok) and return the structured summary.`,
    { model: 'sonnet', label: 'freeze:datamodel', phase: 'Freeze', schema: MODEL_SCHEMA }),
])

const readmeOut = freezeOutputs[0] || null
const modelOut = freezeOutputs[1] || null

const VERDICT_SCHEMA = {
  type: 'object',
  required: ['frozen', 'designConsistent', 'residual', 'verdict'],
  additionalProperties: false,
  properties: {
    frozen: { type: 'boolean' },
    designConsistent: { type: 'boolean' },
    residual: { type: 'array', items: { type: 'string' } },
    verdict: { type: 'string' },
  },
}
const verdict = await agent(
  `Final FREEZE-READINESS verdict for the Mohasebaty frontend (read-only). The audit found ${allFindings.length} findings and ${fixed.length} pages were just fixed. Spot-check the highest-risk pages that were changed and a sample of others. Confirm: no remaining dead major actions or broken links; sidebar active states and headers consistent; Arabic RTL throughout; no CDN/framework; client vs accountant separation intact; the design system was NOT redesigned (freeze respected). List any RESIDUAL issues that still block a clean freeze (be specific with page + issue). Give a frozen yes/no and a short verdict.`,
  { model: 'opus', label: 'freeze:verdict', phase: 'Freeze', schema: VERDICT_SCHEMA }
)

return {
  audit: {
    totalFindings: allFindings.length,
    bySeverity: {
      blocker: allFindings.filter((f) => f.severity === 'blocker').length,
      major: allFindings.filter((f) => f.severity === 'major').length,
      minor: allFindings.filter((f) => f.severity === 'minor').length,
    },
    global: globalAudit,
    design: designAudit ? { emptyStatePatternExists: designAudit.emptyStatePatternExists, errorStatePatternExists: designAudit.errorStatePatternExists, taxProfileConfigurable: designAudit.taxProfileConfigurable, verdict: designAudit.overallVerdict } : null,
    sharedAndDocFindings: allFindings.filter((f) => f.fixType === 'shared' || f.fixType === 'doc' || f.page === 'SHARED'),
  },
  fixes: fixed,
  readme: readmeOut,
  dataModel: modelOut,
  verdict,
}
