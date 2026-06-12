# CLAUDE FRONTEND RULES — Outsourced Accounting Platform

> This file is the permanent execution constitution for Claude Code.
> Claude must read and follow these rules before implementing any prompt, page, fix, refactor, or audit in this project.

---

## 1. Core Mission

You are building a frontend-only Arabic RTL prototype for an outsourced accounting / bookkeeping platform.

The product has two main experiences:

1. **Client Portal**
   - Simple
   - Non-technical
   - Designed for business owners or employees who are not accountants
   - Main task: upload financial documents and follow their status

2. **Accounting/Admin Portal**
   - More detailed
   - Used by accountants, accounting managers, and admins
   - Main task: review documents, classify them, manage accounts, entries, reports, clients, users, and settings

The first approved pages are the visual source of truth.  
Do not redesign the product from scratch.

---

## 2. Approved Visual Source of Truth

The first implemented and approved pages define the official design system:

1. Client Dashboard
2. Upload Document Page
3. Accountant Documents Inbox
4. Document Review & Accounting Classification
5. Admin Financial Dashboard

Every new page must visually match these pages.

Reuse the same:

- Layout language
- Sidebar
- Header
- Cards
- KPI cards
- Tables
- Forms
- Buttons
- Badges
- Filters
- Upload areas
- Timelines
- Modals
- Shadows
- Rounded corners
- Spacing
- Typography
- RTL behavior
- Color system

Do not introduce a new UI style.

---

## 3. Technology Rules

Allowed:

- HTML
- CSS
- Tailwind CSS
- Minimal JavaScript only when needed for UI behavior

Not allowed:

- React
- Vue
- Angular
- Next.js
- Bootstrap
- External admin templates
- Tailwind CDN
- Any CDN dependency
- JS-rendered main content
- SPA architecture
- Random UI libraries

Tailwind must be installed and built locally.

Every page must link to the local compiled CSS file, for example:

```html
<link rel="stylesheet" href="../assets/css/output.css">
```

or the correct relative path depending on the page location.

---

## 4. Tailwind Rules

Tailwind must be local, not CDN.

Expected structure:

```txt
tailwind.config.js
package.json
assets/css/input.css
assets/css/output.css
assets/js/main.js
pages/
```

Tailwind config must include all HTML and JS paths:

```js
content: [
  "./*.html",
  "./pages/**/*.html",
  "./assets/js/**/*.js"
]
```

Custom CSS must go inside `assets/css/input.css` using Tailwind layers:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  /* reusable component classes */
}
```

Do not scatter random inline styles across pages.

---

## 5. Frontend-Only Rule

This stage is frontend only.

Use realistic hardcoded Arabic sample data directly in HTML.

Do not connect to:

- Backend
- APIs
- Databases
- Authentication services
- Real file upload services
- External charts
- External icons

Do not create fake backend logic.

Do not use JavaScript to generate page content.

JavaScript is allowed only for small UI interactions such as:

- Sidebar toggle
- Dropdown open/close
- Modal open/close
- File upload visual preview
- Selected card state
- Tabs
- Mobile menu
- Simple chart placeholder interactions

Main content must be present in HTML.

---

## 6. Arabic & RTL Rules

Every HTML page must include:

```html
<html lang="ar" dir="rtl">
```

All UI text must be Arabic.

Do not use:

- English placeholder text
- Lorem ipsum
- Mixed language labels unless technically necessary
- Broken Arabic wording

Use clear, professional Arabic suitable for a financial/accounting SaaS.

Client-facing wording must be simple.

Internal accounting/admin wording may include accounting terminology.

---

## 7. Design Identity

The product must feel like a premium modern accounting SaaS.

Visual style:

- Light theme
- Soft neutral background
- White cards
- Rounded corners
- Subtle shadows
- Clean spacing
- Professional financial feel
- Clear hierarchy
- Calm trustworthy interface
- Enterprise SaaS quality
- Arabic-first design

Avoid:

- Generic admin dashboard look
- Overly colorful UI
- Crowded sections
- Random card styles
- Inconsistent button shapes
- Inconsistent badges
- Poor spacing
- Heavy dark blocks unless already part of approved design

---

## 8. Page Implementation Rules

Each page must be a separate HTML file.

Do not create one giant page.

Do not hide full pages behind JavaScript.

Every page must open directly in Live Server.

Each page must have:

- Correct title
- Shared header
- Shared sidebar if applicable
- Active navigation state
- Page title
- Page subtitle
- Realistic Arabic data
- Working internal links
- Responsive behavior
- No console errors

---

## 9. Navigation Rules

Navigation links must work between implemented pages.

If sidebar exists:

- Reuse it consistently.
- Highlight the active page.
- Do not create a different sidebar per page.
- Do not remove links used by other pages.
- Do not break existing links.

Suggested navigation groups:

### Client Portal
- لوحة العميل
- رفع مستند جديد
- مستنداتي
- الرسائل

### Accounting/Admin Portal
- لوحة التقارير المالية
- صندوق المستندات
- العملاء
- شجرة الحسابات
- القيود المحاسبية
- مركز التقارير
- المستخدمون والصلاحيات
- الإعدادات

---

## 10. Client Portal Rules

Client pages must stay simple and non-technical.

**Client navigation — business rule vs. prototype exception:**
- **Backend/RBAC rule (permanent):** Real **client** users MUST NOT be able to access admin/accounting modules (chart of accounts, journal entries, client management, system settings, internal tax/admin reports, imports, banks, audit log). Once the backend exists, role-based access control MUST enforce client-only navigation for client accounts and accountant/admin navigation per permission for staff accounts.
- **Frontend-prototype exception (current static demo only):** During the static demo/review phase — with no backend or auth — the **full unified sidebar is shown on all pages, including the client-portal pages** (`client-dashboard.html`, `upload-document.html`, `client-documents.html`, `client-document-details.html`, `client-reports.html`, `messages.html`) so reviewers/buyers can reach every screen from anywhere. This visibility is a review convenience ONLY and does not change the backend rule above; it MUST be replaced by RBAC-enforced navigation during backend integration.

Client must not see:

- Debit / Credit
- Journal entries
- Chart of accounts
- Posting
- Internal accountant notes
- Accounting tree
- Complex accounting classification
- Admin/accounting **sidebar links** (chart of accounts, journal entries, client management, system settings, internal tax/admin reports, imports, banks, audit log)

Client pages should focus on:

- Uploading documents
- Following document status
- Reading accountant requests
- Replying to clarification messages
- Viewing simple financial summaries
- Understanding what action is required

Use simple labels such as:

- قيد المراجعة
- مطلوب توضيح
- تم التصنيف
- مرفوض
- تم استلام المستند
- ارفع مستند جديد

---

## 11. Accountant/Admin Portal Rules

Accountant and admin pages can include accounting terms.

Allowed internal terms:

- شجرة الحسابات
- القيود المحاسبية
- مدين
- دائن
- ترحيل
- ميزان مراجعة
- قائمة الدخل
- تقرير الضريبة
- الحسابات الرئيسية
- الحسابات الفرعية
- التصنيف المحاسبي

Internal pages must still be clean, organized, and easy to scan.

Do not make the interface overwhelming.

---

## 12. Status Badge System

Use consistent badge styles across all pages.

Core document statuses:

- قيد المراجعة
- مطلوب توضيح
- تم التصنيف
- مرفوض
- تم الترحيل

Client statuses:

- قيد المراجعة
- مطلوب توضيح
- تم التصنيف
- مرفوض

User statuses:

- نشط
- موقوف
- دعوة مرسلة

Journal statuses:

- مسودة
- مرحّل
- يحتاج مراجعة
- ملغي

Never invent a new badge style unless needed.  
Reuse existing badge classes.

---

## 13. Buttons Rules

Use consistent button hierarchy:

Primary:
- Main action
- Save
- Submit
- Upload
- Create

Secondary:
- Back
- Export
- View
- Cancel

Warning:
- Request clarification
- Needs action

Danger:
- Reject
- Delete
- Stop

Ghost/Subtle:
- Minor actions
- Open
- More details

Do not use random button colors.

---

## 14. Tables Rules

Tables must be clean, readable, and scannable.

Every table should have:

- Clear title
- Proper headers
- Realistic rows
- Status badges
- Action column
- Good spacing
- Responsive handling where possible

Do not create huge cramped tables.

Do not use empty placeholder rows.

---

## 15. Forms Rules

Forms must be polished and easy to use.

Every input should have:

- Arabic label
- Clear placeholder if needed
- Consistent height
- Clear spacing
- Focus state
- Helpful note if needed

Use correct input types when possible.

For client forms, avoid complex accounting terms.

For admin/accounting forms, accounting fields are allowed.

---

## 16. Upload UI Rules

Upload areas must feel premium and simple.

Use:

- Large upload box
- Drag/drop visual style
- Accepted file helper text
- Uploaded file preview state
- Clear submit action

Allowed file types text examples:

- PDF, JPG, PNG حتى 10MB
- اسحب الملف هنا أو اضغط لاختيار الملف

Do not implement real upload logic.

JS can only show a visual selected-file state if needed.

---

## 17. Cards & KPI Rules

KPI cards must be consistent across all dashboards.

Each KPI card should include:

- Icon or visual marker
- Number
- Label
- Small helper/trend text

Cards should use the same:

- Border radius
- Shadow
- Padding
- Background
- Typography scale

Do not create different KPI styles per page.

---

## 18. Modal Rules

If a modal is needed:

- Use existing modal style
- Minimal JS for open/close only
- Keep content in HTML
- Add overlay
- Add close button
- Keep RTL layout
- Keep actions clear

Do not generate modal fields with JS.

---

## 19. Responsive Rules

Desktop-first, but responsive.

Every page must work reasonably on:

- Desktop
- Tablet
- Mobile

Responsive expectations:

- Sidebar should collapse or stack if already implemented.
- Tables should scroll horizontally if needed.
- Cards should stack cleanly.
- Forms should not overflow.
- Header actions should wrap cleanly.

Do not ignore mobile completely.

---

## 20. Accessibility & Quality Rules

Use semantic HTML where possible:

- header
- nav
- main
- section
- table
- button
- form
- label

Buttons must be buttons, not random divs.

Links must be real anchor tags when navigating.

Images/icons must have accessible labels or alt text when appropriate.

Keep contrast readable.

---

## 21. Do Not Break Existing Work

Before changing shared files, check how they affect existing pages.

Do not:

- Delete existing sections
- Remove existing pages
- Break CSS paths
- Break sidebar links
- Rename files without updating links
- Replace the approved design system
- Convert the project to a framework
- Move content into JS rendering

Any new implementation must preserve all existing completed pages.

---

## 22. Required Pages List

The project may include these pages:

### Approved first pages
1. Client Dashboard
2. Upload Document Page
3. Accountant Documents Inbox
4. Document Review & Accounting Classification
5. Admin Financial Dashboard

### Additional pages
6. Clients Management
7. Client Profile
8. Client Documents
9. Client Document Details
10. Messages
11. Chart of Accounts
12. Journal Entries
13. Reports Center
14. Users & Permissions
15. Settings

### Pages delivered in specs 002–011 (now part of the frozen baseline — 38 screens total)
16. Client Onboarding — `client-onboarding.html` (spec 002)
17. Client Tax Settings — `client-tax-settings.html` (spec 002)
18. Client Reports — `client-reports.html` (spec 011)
19. Data Import — `data-import.html` (specs 003/004)
20. Import Mapping — `import-mapping.html`
21. Import Preview — `import-preview.html`
22. Import History — `import-history.html`
23. Import Errors — `import-errors.html`
24. Import Templates — `import-templates.html`
25. Opening Balances — `opening-balances.html` (spec 005)
26. Fiscal Periods — `fiscal-periods.html` (spec 005)
27. Vendors — `vendors.html` (spec 006)
28. Commercial Customers — `commercial-customers.html` (spec 006)
29. Bank Accounts — `bank-accounts.html` (spec 006)
30. Bank Statement Import — `bank-statement-import.html` (spec 007)
31. Bank Reconciliation — `bank-reconciliation.html` (spec 007)
32. VAT Report — `vat-report.html` (spec 008)
33. Tax Documents — `tax-documents.html` (spec 008)
34. Document Categories — `document-categories.html` (spec 009)
35. Approval Workflow — `approval-workflow.html` (spec 009)
36. Audit Log — `audit-log.html` (spec 010)
37. Notifications — `notifications.html` (spec 010)

Plus `index.html` (landing/forms index). Spec 012 added cross-page modals & action wiring to these pages without creating new pages.

When implementing any page, ensure it follows this rule file.

---

## 23. File Naming Guidelines

Suggested files:

```txt
index.html
pages/client-dashboard.html
pages/upload-document.html
pages/accountant-inbox.html
pages/document-review.html
pages/admin-financial-dashboard.html
pages/clients.html
pages/client-profile.html
pages/client-documents.html
pages/client-document-details.html
pages/messages.html
pages/chart-of-accounts.html
pages/journal-entries.html
pages/reports.html
pages/users-permissions.html
pages/settings.html
assets/css/input.css
assets/css/output.css
assets/js/main.js
assets/images/
```

Keep names predictable and clear.

---

## 24. Content Rules

Use realistic Arabic demo content.

Examples of client names:

- شركة النور للتجارة
- مؤسسة السلام للمقاولات
- شركة البيان للخدمات
- شركة الهدى للتوريدات
- شركة الرواد للاستيراد

Examples of users:

- أحمد محمود
- منى حسن
- محمد عبد الله
- سارة علي
- خالد عمر

Examples of documents:

- INV-204
- EXP-118
- REC-77
- PAY-43

Examples of amounts:

- 12,500 ج.م
- 2,100 ج.م
- 8,000 ج.م
- 1,350 ج.م

Do not use random filler content.

---

## 25. Final Verification Before Stopping

Before finishing any task, verify:

- Page opens directly in browser / Live Server.
- RTL layout is correct.
- Arabic content is complete.
- No lorem ipsum.
- No broken links.
- No broken CSS path.
- No Tailwind CDN.
- No external admin template.
- No JS-generated page content.
- Existing pages still work.
- Sidebar active state is correct.
- Header is consistent.
- Responsive behavior is acceptable.
- No console errors.
- The new page visually matches the first approved 5 pages.

If issues are found, fix them before stopping.

---

## 26. Response After Completing Work

After each implementation, provide a short summary:

- Created/updated files
- Page implemented
- Components reused
- Any assumptions made
- How to run Tailwind build if needed
- Any remaining notes

Do not write long explanations unless requested.

---

## 27. Absolute Non-Negotiables

Never violate these:

1. Do not use Tailwind CDN.
2. Do not use Bootstrap.
3. Do not use React/Vue/Angular/Next.
4. Do not redesign the approved style.
5. Do not generate main content with JavaScript.
6. Do not use English placeholder text.
7. Do not remove existing sections.
8. Do not break existing navigation.
9. Do not make client pages technical.
10. Do not stop with skeleton or placeholder pages.

---

## 28. Standard Instruction To Follow Before Any Prompt

Before implementing any user prompt, silently apply this checklist:

1. Which page am I editing or creating?
2. Is it client-facing or internal?
3. Which existing approved page is the closest visual reference?
4. Which shared components should be reused?
5. Are RTL and Arabic correct?
6. Are links correct?
7. Is Tailwind local?
8. Is content hardcoded in HTML?
9. Is JS only used for UI behavior?
10. Does the result match the existing design system?

Then implement.
