import os, re

pages_dir = "/media/mekky/work/backend/mohasebaty/pages"
pages = [
    "accountant-inbox.html","admin-financial-dashboard.html","chart-of-accounts.html",
    "client-dashboard.html","client-document-details.html","client-documents.html",
    "client-onboarding.html","client-profile.html","clients.html","client-tax-settings.html",
    "document-review.html","journal-entries.html","messages.html","reports.html",
    "settings.html","upload-document.html","users-permissions.html"
]

# The 6 patterns to replace — each tuple is (search_text, replace_text)
# We match on the inner <span> text to identify each item
replacements = [
    (
        '<span class="sidebar-link is-soon" aria-disabled="true">\n      <span class="sl-ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg></span>\n      <span>استيراد البيانات</span>\n      <span class="sl-soon">قريباً</span>\n    </span>',
        '<a class="sidebar-link" href="data-import.html">\n      <span class="sl-ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg></span>\n      <span>استيراد البيانات</span>\n    </a>'
    ),
    (
        '<span class="sidebar-link is-soon" aria-disabled="true">\n      <span class="sl-ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3"/><path d="M18 2h4v4"/><path d="M22 2 12 12"/></svg></span>\n      <span>مطابقة الحقول</span>\n      <span class="sl-soon">قريباً</span>\n    </span>',
        '<a class="sidebar-link" href="import-mapping.html">\n      <span class="sl-ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3"/><path d="M18 2h4v4"/><path d="M22 2 12 12"/></svg></span>\n      <span>مطابقة الحقول</span>\n    </a>'
    ),
    (
        '<span class="sidebar-link is-soon" aria-disabled="true">\n      <span class="sl-ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></span>\n      <span>معاينة الاستيراد</span>\n      <span class="sl-soon">قريباً</span>\n    </span>',
        '<a class="sidebar-link" href="import-preview.html">\n      <span class="sl-ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></span>\n      <span>معاينة الاستيراد</span>\n    </a>'
    ),
    (
        '<span class="sidebar-link is-soon" aria-disabled="true">\n      <span class="sl-ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/></svg></span>\n      <span>سجل الاستيراد</span>\n      <span class="sl-soon">قريباً</span>\n    </span>',
        '<a class="sidebar-link" href="import-history.html">\n      <span class="sl-ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/></svg></span>\n      <span>سجل الاستيراد</span>\n    </a>'
    ),
    (
        '<span class="sidebar-link is-soon" aria-disabled="true">\n      <span class="sl-ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span>\n      <span>أخطاء الاستيراد</span>\n      <span class="sl-soon">قريباً</span>\n    </span>',
        '<a class="sidebar-link" href="import-errors.html">\n      <span class="sl-ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span>\n      <span>أخطاء الاستيراد</span>\n    </a>'
    ),
    (
        '<span class="sidebar-link is-soon" aria-disabled="true">\n      <span class="sl-ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg></span>\n      <span>قوالب الاستيراد</span>\n      <span class="sl-soon">قريباً</span>\n    </span>',
        '<a class="sidebar-link" href="import-templates.html">\n      <span class="sl-ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg></span>\n      <span>قوالب الاستيراد</span>\n    </a>'
    ),
]

changed = 0
for fname in pages:
    path = os.path.join(pages_dir, fname)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content
    for old, new in replacements:
        content = content.replace(old, new)
    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        changed += 1
        print(f'Updated: {fname}')
    else:
        print(f'No match (check spacing): {fname}')

print(f'Done: {changed}/{len(pages)} files updated')
