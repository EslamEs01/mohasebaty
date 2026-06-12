# منصة محاسبتي — Frontend

واجهة مستخدم عربية كاملة لمنصة المحاسبة والمراجعة بالاستعانة بمصادر خارجية (Outsourced Accounting & Bookkeeping). المشروع عبارة عن HTML/CSS/Tailwind ثابت بالكامل، جاهز لتضمينه في قوالب Django أو أي إطار عمل خلفي آخر.

Arabic RTL outsourced accounting / bookkeeping platform — fully static HTML/CSS/Tailwind frontend, UI-frozen and ready for Django/backend integration.

---

## الحالة · Status

> **UI Frozen — Ready for Backend**
> جميع الصفحات (38 صفحة) مكتملة ومراجعة ومتوافقة مع نظام التصميم المعتمد.
> All 38 screens are complete, reviewed, and consistent with the approved design system.
> الخطوة التالية: ربط القوالب بـ Django، استبدال البيانات الثابتة بمتغيرات القوالب.

---

## الصفحات · Pages (38)

### الفهرس

| الصفحة العربية | المسار |
|---|---|
| فهرس النماذج | `/index.html` |

### بوابة العميل · Client Portal

> **التنقّل في النسخة التجريبية · Prototype navigation:** للأغراض التجريبية/الاستعراضية للواجهة الأمامية، تظهر القائمة الجانبية الكاملة عبر جميع الصفحات حتى يتمكّن المراجعون من الوصول إلى كل الشاشات. سيفرض تطبيق الواجهة الخلفية لاحقًا التنقّل والصلاحيات حسب الدور (RBAC). (For frontend prototype/demo purposes, the full navigation is visible across pages so reviewers can access all screens. Backend implementation will enforce role-based navigation and permissions.)

| الصفحة العربية | المسار |
|---|---|
| لوحة العميل | `/pages/client-dashboard.html` |
| مستنداتي | `/pages/client-documents.html` |
| تفاصيل المستند | `/pages/client-document-details.html` |
| رفع مستند جديد | `/pages/upload-document.html` |
| تقاريري | `/pages/client-reports.html` |
| الرسائل | `/pages/messages.html` |

### إدارة العملاء والإعداد · Client Management & Onboarding

| الصفحة العربية | المسار |
|---|---|
| إدارة العملاء | `/pages/clients.html` |
| إعداد عميل جديد | `/pages/client-onboarding.html` |
| ملف العميل | `/pages/client-profile.html` |
| إعدادات الضريبة للعميل | `/pages/client-tax-settings.html` |

### صندوق الواردات والمستندات · Inbox & Documents

| الصفحة العربية | المسار |
|---|---|
| صندوق المستندات (للمحاسب) | `/pages/accountant-inbox.html` |
| مراجعة وتصنيف المستند | `/pages/document-review.html` |
| تصنيفات المستندات | `/pages/document-categories.html` |
| مسار الاعتماد | `/pages/approval-workflow.html` |

### المحاسبة والتقارير · Accounting & Reports

| الصفحة العربية | المسار |
|---|---|
| لوحة التقارير المالية (للإدارة) | `/pages/admin-financial-dashboard.html` |
| مركز التقارير | `/pages/reports.html` |
| شجرة الحسابات | `/pages/chart-of-accounts.html` |
| القيود المحاسبية | `/pages/journal-entries.html` |
| الأرصدة الافتتاحية | `/pages/opening-balances.html` |
| الفترات المالية | `/pages/fiscal-periods.html` |

### الضرائب · Tax

| الصفحة العربية | المسار |
|---|---|
| تقرير ضريبة القيمة المضافة | `/pages/vat-report.html` |
| المستندات الضريبية | `/pages/tax-documents.html` |

### الموردون والعملاء والبنوك · Vendors, Customers & Banks

| الصفحة العربية | المسار |
|---|---|
| الموردون | `/pages/vendors.html` |
| عملاء الشركة | `/pages/commercial-customers.html` |
| الحسابات البنكية والخزنة | `/pages/bank-accounts.html` |
| استيراد كشف حساب بنكي | `/pages/bank-statement-import.html` |
| مطابقة البنك والمستندات | `/pages/bank-reconciliation.html` |

### استيراد البيانات · Data Import

| الصفحة العربية | المسار |
|---|---|
| استيراد بيانات العميل | `/pages/data-import.html` |
| ربط أعمدة الملف | `/pages/import-mapping.html` |
| معاينة الاستيراد | `/pages/import-preview.html` |
| أخطاء الاستيراد | `/pages/import-errors.html` |
| سجل الاستيراد | `/pages/import-history.html` |
| قوالب الاستيراد | `/pages/import-templates.html` |

### الإدارة والنظام · Admin & System

| الصفحة العربية | المسار |
|---|---|
| المستخدمون والصلاحيات | `/pages/users-permissions.html` |
| إعدادات النظام | `/pages/settings.html` |
| سجل التدقيق | `/pages/audit-log.html` |
| مركز الإشعارات | `/pages/notifications.html` |

---

## التقنيات · Tech Stack

| التقنية | التفاصيل |
|---|---|
| HTML5 | ثابت بالكامل، `lang="ar" dir="rtl"` على كل صفحة |
| CSS + Tailwind CSS v3 | مبني محلياً — **بدون CDN** |
| Vanilla JavaScript | للتفاعلات البصرية فقط — لا يُولِّد محتوى |
| خطوط IBM Plex Sans Arabic + IBM Plex Mono | مستضافة ذاتياً من `@fontsource` (OFL) |

**لا يوجد**: CDN، Bootstrap، React، Vue، Angular، Next.js، أو أي مكتبة خارجية أخرى.

---

## الإعداد والتشغيل · Setup & Run

### التثبيت

```bash
npm install
```

### بناء المشروع (مطلوب قبل أول تشغيل)

```bash
npm run build
```

ينفذ خطوتين بالتسلسل:
1. `setup:fonts` — ينسخ ملفات woff2 من `node_modules/@fontsource/*` إلى `assets/fonts/`
2. `build:css` — يُصدر `assets/css/output.css` المُصغَّر عبر Tailwind CLI

### وضع التطوير

```bash
npm run watch:css   # إعادة بناء CSS تلقائياً عند كل تعديل
npm run serve       # python3 -m http.server 8000 → http://localhost:8000
```

يمكن أيضاً فتح `index.html` مباشرة في المتصفح عبر **VS Code Live Server** — المشروع ثابت بالكامل ولا يحتاج خادماً.

---

## هيكل المشروع · Project Structure

```
mohasebaty/
├── index.html                        # فهرس الصفحات (نقطة البداية)
├── pages/                            # 37 صفحة HTML (ملف واحد لكل شاشة)
├── assets/
│   ├── css/
│   │   ├── input.css                 # @tailwind + @font-face + @layer components
│   │   └── output.css                # مخرجات Tailwind (مُدرَج في .gitignore)
│   ├── js/
│   │   └── main.js                   # وحدات JS بصرية (~200 سطر)
│   └── fonts/                        # ملفات woff2 (تُنسخ بـ setup:fonts)
├── scripts/
│   └── setup-fonts.js                # مساعد نسخ الخطوط
├── specs/                            # مواصفات المميزات (011 ميزة وما قبلها)
├── tailwind.config.js                # رموز التصميم (ألوان، ظلال، حدود)
└── package.json
```

---

## نظام التصميم · Design System Tokens

الرموز الكاملة في `tailwind.config.js` (`theme.extend`) و `assets/css/input.css` (`@layer components`):

| الرمز | القيمة |
|---|---|
| `bg` / `bg.2` | `#F4F1EA` / `#EFEBE2` |
| `paper` | `#FFFFFF` |
| `line` / `line.soft` | `#E6E1D5` / `#EFEBE0` |
| `ink` / `ink.2` / `ink.3` / `ink.4` | `#14181F` / `#2A323E` / `#5C6573` / `#8A93A1` |
| `primary` / `primary.ink` / `primary.soft` | `#0E6F66` / `#0A4F49` / `#E5F0EE` |
| `gold` / `gold.soft` | `#B68A3E` / `#F4ECDA` |
| `rose` / `rose.soft` | `#B83A3A` / `#F7E4E4` |
| `amber` / `amber.soft` | `#A06A0F` / `#F6E9CC` |
| `green` / `green.soft` | `#2F7A4E` / `#E1EFE6` |
| `slate` / `slate.soft` | `#4A5365` / `#ECEEF2` |

---

## الاتفاقيات · Conventions

- **عربي أولاً وRTL**: كل صفحة تحمل `lang="ar" dir="rtl"`؛ لا توجد نصوص إنجليزية في واجهة المستخدم.
- **لا JS يُولِّد محتوى**: كل نص مرئي موجود في HTML مباشرة؛ JS للحالة البصرية فقط (قوائم منسدلة، tabs، overlays).
- **نظام تصميم موحد**: يُعاد استخدام نفس رموز الألوان والمسافات والحدود في جميع الصفحات.
- **فصل البوابتين**: صفحات `client-*` للعميل؛ بقية الصفحات للمحاسب/الإدارة.
- **الملفات الضريبية**: دعم كامل للملف الضريبي في كلٍّ من المملكة العربية السعودية (VAT 15%) ومصر (VAT 14%).
- **لا CDN**: جميع الموارد محلية — مناسب للبيئات المحجوبة عن الإنترنت.
- **SVG مضمّن**: جميع الرسوم البيانية (بار، دونات، sparklines) مُعالَجة مسبقاً كعناصر `<rect>/<circle>/<path>` ثابتة — لا مكتبات رسوم بيانية.

---

## JavaScript Modules

`assets/js/main.js` يحتوي على وحدات مُفعَّلة عبر `querySelector` (آمنة على كل صفحة):

| الوحدة | مكان الاستخدام |
|---|---|
| `initSidebarMobile` | جميع الصفحات — تبديل الشريط الجانبي على الجوال |
| `initBellDropdown` | لوحة الإشعارات في الهيدر |
| `initDropzone` | صفحة رفع المستند — drag/drop + معاينة الملف |
| `initSingleSelect` | بطاقات الاختيار، عناصر التبديل، التبويبات |
| `initFilterSelects` | فلاتر صندوق الواردات |
| `initOverlays` | مشغّلات `[data-open]` للـ modals والـ drawers |
| `initBulkBar` | صناديق اختيار الصفوف ↔ شريط الإجراءات الجماعية |

---

## التكامل مع Django · Django Integration

كل ملف HTML يُميِّز المناطق المتكررة بتعليقات:

```html
<!-- BLOCK: sidebar -->
...
<!-- /BLOCK -->

<!-- BLOCK: header -->
...
<!-- /BLOCK -->
```

خطوات الدمج:
1. نقل `<!-- BLOCK: sidebar -->` إلى `templates/partials/sidebar.html` والاستبدال بـ `{% include 'partials/sidebar.html' %}`.
2. الهيدر يتغير بحسب الصفحة — اجعله قالباً أساسياً مع `{% block page_title %}{% endblock %}`.
3. نقل `assets/` تحت مجلد الملفات الثابتة والإشارة إليها بـ `{% static %}`.
4. استبدال البيانات الثابتة (KPIs، الصفوف، إلخ) بمتغيرات القوالب.

---

## الافتراضات والملاحظات · Notes

- الخطوط مستضافة ذاتياً (~250 كيلوبايت للأوزان السبعة). الرخصة: OFL.
- جميع الرسوم البيانية مُعالَجة مسبقاً كـ SVG ثابت — لا مكتبات رسوم بيانية خارجية.
- الشريط الجانبي الأيمن مُضاف بطلب المستخدم بجانب الهيدر العلوي الموجود في التصميم الأصلي.

---

## الرخصة · License

مشروع داخلي. خطوط IBM Plex مرخصة بموجب OFL.
