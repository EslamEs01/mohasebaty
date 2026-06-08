# Phase 1 Data Model: Foundation / Navigation / Audit

This is a static frontend feature; the "data model" describes the structural entities the markup
encodes, not a database. These entities drive the navigation contract and the audit checklist.

## Entity: Navigation Group

A labelled section of the internal sidebar.

| Field | Type | Rules |
|-------|------|-------|
| `label` | Arabic string | One of the 10 group labels; rendered via `.sidebar-section-label`. |
| `order` | integer | Existing groups first (لوحات العميل, ساحة المحاسب, إدارة), then the 7 new groups in spec order. |
| `items` | Navigation Item[] | Ordered, non-empty. |
| `portal` | enum(`client`, `internal`) | New groups are all `internal`. Client group is unchanged. |

**Group set (final state)**

1. لوحات العميل — *existing, unchanged* (client)
2. ساحة المحاسب — *existing, unchanged* (internal)
3. إدارة — *existing, unchanged* (internal)
4. الإعداد والتهيئة — *new* (internal)
5. الضرائب — *new* (internal)
6. استيراد البيانات — *new* (internal)
7. العمليات المحاسبية — *new* (internal)
8. البنوك — *new* (internal)
9. المراجعة والاعتماد — *new* (internal)
10. النظام — *new* (internal)

## Entity: Navigation Item

A single sidebar entry (and its mirror on `index.html`).

| Field | Type | Rules |
|-------|------|-------|
| `label` | Arabic string | Professional Arabic; no English placeholder. |
| `icon` | inline SVG | 16×16 stroke icon inside `.sl-ico`, matching existing style. |
| `target` | filename or null | Existing items → real file in `pages/`. Upcoming items → conceptual filename, NOT linked. |
| `state` | enum(`available`, `active`, `coming-soon`) | `available`: `<a class="sidebar-link" href=…>`. `active`: the current page's link, `<a class="sidebar-link active" aria-current="page">`. `coming-soon`: `<span class="sidebar-link is-soon" aria-disabled="true">` + `.sl-soon` "قريباً" pill, **no href**. |

**State transition rules**

- Exactly one item per page is `active` (the existing current-page link). No `coming-soon` item is ever `active`.
- `coming-soon` items never render an `href` and never become `available` in this feature (their pages are built in later specs).
- Adding items must not change the `state` of any existing `available`/`active` item.

**Upcoming items (state = coming-soon)** — 22 total, grouped per spec FR-007:

| Group | Items (conceptual target → Arabic label) |
|-------|------------------------------------------|
| الإعداد والتهيئة | client-onboarding → تهيئة عميل جديد · opening-balances → الأرصدة الافتتاحية · fiscal-periods → الفترات المالية · document-categories → تصنيفات المستندات |
| الضرائب | client-tax-settings → إعدادات ضريبة العميل · vat-report → إقرار ضريبة القيمة المضافة · tax-documents → المستندات الضريبية |
| استيراد البيانات | data-import → استيراد البيانات · import-mapping → مطابقة الحقول · import-preview → معاينة الاستيراد · import-history → سجل الاستيراد · import-errors → أخطاء الاستيراد · import-templates → قوالب الاستيراد |
| العمليات المحاسبية | vendors → الموردون · commercial-customers → العملاء التجاريون · client-reports → تقارير العميل |
| البنوك | bank-accounts → الحسابات البنكية · bank-statement-import → استيراد كشف الحساب · bank-reconciliation → التسوية البنكية |
| المراجعة والاعتماد | approval-workflow → سير الاعتماد · audit-log → سجل التدقيق |
| النظام | notifications → الإشعارات |

> Arabic labels above are the planned defaults; they may be fine-tuned during implementation as long as
> they remain professional Arabic consistent with existing naming.

## Entity: Page (Entry Point)

| Field | Type | Rules |
|-------|------|-------|
| `file` | path | One of 16 existing files. |
| `portal` | enum(`landing`, `client`, `internal`) | `index.html`=landing; others per their primary audience. |
| `has_sidebar` | bool | True for all 15 `pages/*`; `index.html` uses landing cards, not the sidebar. |
| `css_path` | path | `index.html`→`assets/css/output.css`; pages→`../assets/css/output.css`. |
| `js_path` | path | `index.html`→`assets/js/main.js`; pages→`../assets/js/main.js`. |
| `active_item` | Navigation Item | The single item marked `active` on that page. |

## Entity: Audit Result

Produced per entry point by the manual/grep audit.

| Field | Type | Rules |
|-------|------|-------|
| `file` | path | The audited entry point. |
| `rtl_lang_ok` | bool | `<html lang="ar" dir="rtl">` present. |
| `assets_ok` | bool | Correct relative `output.css` + `main.js`; resolve on disk. |
| `no_cdn_framework` | bool | No CDN/Bootstrap/React/Vue/Angular/Next/external template. |
| `links_ok` | bool | All internal `href`s resolve to existing files. |
| `active_state_ok` | bool | Exactly one correct active item. |
| `no_console_errors` | bool | Opens clean in browser. |
| `status` | enum(`pass`, `fail`) | `pass` iff all booleans true. |
| `defects` | string[] | Notes for any false flag. |

**Validation**: SC-001 requires `status = pass` for 100% of the 16 entry points; SC-002 requires
`links_ok = true` everywhere (0 broken internal links).
