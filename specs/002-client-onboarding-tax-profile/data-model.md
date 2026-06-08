# Phase 1 Data Model: Client Onboarding & Tax Profile

Static frontend feature; entities describe the structure the HTML encodes (with realistic Arabic sample
values), not a database. They drive the page contracts and field lists.

## Entity: New Client (onboarding draft)

Captured across the 8 wizard steps.

| Step | Field | Type / control | Sample value |
|------|-------|----------------|--------------|
| بيانات الشركة | اسم الشركة | text | شركة الرواد للاستيراد |
| | نوع النشاط | select | تجارة جملة |
| | الدولة | select (السعودية/مصر) | السعودية |
| | المدينة | text | الرياض |
| | العنوان | text | طريق الملك فهد، الرياض |
| | السجل التجاري | text (mono) | 1010234567 |
| | الرقم الضريبي | text (mono) | 300012345600003 |
| | تاريخ بداية التعاقد | date | 2026-06-01 |
| | حالة العميل | seg/select | نشط / موقوف / قيد التهيئة |
| بيانات التواصل | اسم المسؤول | text | خالد عمر |
| | المنصب | text | المدير المالي |
| | رقم الهاتف | tel (mono) | +966 5xxxxxxxx |
| | البريد الإلكتروني | email | finance@alrowad.sa |
| | صلاحيات المستخدم الأول | select | مالك / محرر / مشاهد |
| الدولة والعملة | الدولة | seg (السعودية/مصر) | السعودية |
| | العملة | select | ريال سعودي / جنيه مصري |
| | لغة الفواتير | select | العربية / الإنجليزية |
| | المنطقة الزمنية | select | (GMT+3) الرياض / (GMT+2) القاهرة |
| إعدادات الضريبة | tax preview | country-preset block | Saudi: VAT 15% · SAR · ZATCA Ready |
| المحاسب المسؤول | المحاسب المسؤول | select | منى حسن |
| | مدير المراجعة | select | أحمد محمود |
| | هل يحتاج اعتماد قبل الترحيل؟ | seg (نعم/لا) | نعم |
| شجرة الحسابات | setup choice | type-grid (single) | استخدام شجرة افتراضية |
| الملفات الأولية | 6 upload areas + notes | dropzone ×5 + textarea | (see Initial File) |
| مراجعة نهائية | review summary | read-only summary card | echoes all above |

**State**: `draft` (حفظ كمسودة) or `created` (إنشاء العميل). No persistence in this phase.

## Entity: Tax Profile (per client)

| Group | Field | Control | Sample |
|-------|-------|---------|--------|
| identity | العميل | select (client selector) | شركة النور للتجارة |
| | الدولة | seg (السعودية/مصر) | السعودية |
| | الرقم الضريبي | text mono | 300012345600003 |
| | هل العميل مسجل ضريبيًا؟ | switch | مُفعّل |
| | تاريخ التسجيل الضريبي | date | 2025-01-15 |
| | نوع النشاط الضريبي | select | تجزئة / جملة / خدمات |
| VAT config | نسبة الضريبة الافتراضية | input mono % | 15 |
| | هل الأسعار تشمل الضريبة؟ | switch | مُعطّل |
| | هل يتم حساب الضريبة تلقائيًا؟ | switch | مُفعّل |
| | ضريبة المخرجات | select (account) | 2103 - ضريبة القيمة المضافة - مخرجات |
| | ضريبة المدخلات | select (account) | 1203 - ضريبة القيمة المضافة - مدخلات |
| | حساب الضريبة المستحقة | select (account) | 2105 - ضريبة مستحقة |
| | الحسابات المرتبطة من شجرة الحسابات | select(s) | (from chart of accounts) |
| period | الدورة | seg (شهري/ربع سنوي/سنوي) | ربع سنوي |
| | تاريخ بداية الفترة الحالية | date | 2026-04-01 |
| | تاريخ نهاية الفترة الحالية | date | 2026-06-30 |
| display | إظهار الضريبة التقديرية للعميل | switch | مُفعّل |
| | إظهار التقارير المعتمدة فقط | switch | مُفعّل |
| | إخفاء التفاصيل الداخلية | switch | مُفعّل |

**Invariant**: country selection drives VAT %, currency, and e-invoicing readiness (see Country Preset).

## Entity: Country Preset (consistency invariant)

| Country | VAT | Currency | E-invoicing | Planned fields |
|---------|-----|----------|-------------|----------------|
| السعودية | 15% | ريال سعودي (SAR) | ZATCA Ready | QR / e-invoice |
| مصر | 14% | جنيه مصري (EGP) | ETA Ready | UUID / e-signature |

Each preset is one HTML block shown/hidden as a unit (never partially edited), guaranteeing FR-028.

## Entity: Assigned Staff

- المحاسب المسؤول (e.g., منى حسن), مدير المراجعة (e.g., أحمد محمود), and the pre-posting approval flag
  (هل يحتاج اعتماد قبل الترحيل؟ → نعم/لا).

## Entity: Initial File (onboarding step 7)

Six items, each an upload area (dropzone) + optional state:

1. شجرة حسابات · 2. أرصدة افتتاحية · 3. مبيعات سابقة · 4. مصروفات سابقة · 5. كشف حساب بنكي · 6. ملاحظات (textarea)

## Entity: Chart-of-Accounts Setup Choice (onboarding step 6)

Single-select of: استخدام شجرة افتراضية / نسخ من عميل مشابه / رفع شجرة حسابات / إعداد لاحقًا.

## Entity: Navigation Item (delta from Spec 001)

Two items transition `coming-soon → available`:

| Item | New target | Active on |
|------|-----------|-----------|
| تهيئة عميل جديد | client-onboarding.html | client-onboarding.html |
| إعدادات ضريبة العميل | client-tax-settings.html | client-tax-settings.html |

Landing scope after change: **17 available + 20 coming-soon** (was 15 + 22).
