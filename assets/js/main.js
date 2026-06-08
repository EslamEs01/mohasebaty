/* منصة محاسبتي — UI interactions only (NO content generation) */
(function () {
  'use strict';

  /* ---------- helpers ---------- */
  function on(el, evt, fn) { el.addEventListener(evt, fn); }
  function qsa(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }
  function qs(sel, root) { return (root || document).querySelector(sel); }

  /* ---------- Mobile sidebar toggle ---------- */
  function initSidebarMobile() {
    var sidebar = qs('.sidebar');
    var toggle = qs('.mobile-nav-toggle');
    if (!sidebar || !toggle) return;
    on(toggle, 'click', function () {
      sidebar.classList.toggle('open');
    });
    on(document, 'click', function (e) {
      if (!sidebar.classList.contains('open')) return;
      if (sidebar.contains(e.target) || toggle.contains(e.target)) return;
      sidebar.classList.remove('open');
    });
  }

  /* ---------- Bell dropdown ---------- */
  function initBellDropdown() {
    qsa('[data-bell-toggle]').forEach(function (btn) {
      var panel = qs('[data-bell-panel="' + btn.getAttribute('data-bell-toggle') + '"]');
      if (!panel) return;
      panel.hidden = true;
      on(btn, 'click', function (e) {
        e.stopPropagation();
        var wasHidden = panel.hidden;
        qsa('[data-bell-panel]').forEach(function (p) { p.hidden = true; });
        panel.hidden = !wasHidden;
      });
    });
    on(document, 'click', function (e) {
      qsa('[data-bell-panel]').forEach(function (panel) {
        if (panel.hidden) return;
        var key = panel.getAttribute('data-bell-panel');
        var btn = qs('[data-bell-toggle="' + key + '"]');
        if (btn && (btn.contains(e.target) || panel.contains(e.target))) return;
        panel.hidden = true;
      });
    });
  }

  /* ---------- Dropzone (file upload visual) ---------- */
  function initDropzone() {
    qsa('.dropzone').forEach(function (zone) {
      var input = qs('input[type="file"]', zone);
      var fileCard = qs('[data-file-card-for="' + (zone.getAttribute('data-zone-id') || '') + '"]');

      on(zone, 'click', function () { if (input) input.click(); });

      on(zone, 'dragover', function (e) { e.preventDefault(); zone.classList.add('drag'); });
      on(zone, 'dragleave', function () { zone.classList.remove('drag'); });
      on(zone, 'drop', function (e) {
        e.preventDefault();
        zone.classList.remove('drag');
        if (input && e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
          input.files = e.dataTransfer.files;
          handleFile(e.dataTransfer.files[0]);
        }
      });

      if (input) {
        on(input, 'change', function () {
          if (input.files && input.files[0]) handleFile(input.files[0]);
        });
        on(input, 'click', function (e) { e.stopPropagation(); });
      }

      function handleFile(f) {
        if (!fileCard) return;
        zone.hidden = true;
        fileCard.hidden = false;
        var nameEl = qs('[data-file-name]', fileCard);
        var sizeEl = qs('[data-file-size]', fileCard);
        if (nameEl) nameEl.textContent = f.name;
        if (sizeEl) sizeEl.textContent = humanSize(f.size) + ' · جاري الرفع...';
        var bar = qs('.progress .bar', fileCard);
        if (bar) {
          bar.style.width = '0%';
          setTimeout(function () { bar.style.width = '100%'; }, 30);
          setTimeout(function () {
            if (sizeEl) sizeEl.textContent = humanSize(f.size) + ' · تم الرفع بنجاح';
          }, 850);
        }
      }
    });

    // Clear-file buttons inside .file-card
    qsa('[data-file-clear]').forEach(function (btn) {
      on(btn, 'click', function (e) {
        e.stopPropagation();
        var fc = btn.closest('.file-card');
        var zoneId = fc.getAttribute('data-file-card-for');
        var zone = qs('.dropzone[data-zone-id="' + zoneId + '"]');
        if (zone) {
          fc.hidden = true;
          zone.hidden = false;
          var input = qs('input[type="file"]', zone);
          if (input) input.value = '';
        }
      });
    });
  }

  function humanSize(b) {
    if (b < 1024) return b + ' ب';
    if (b < 1024 * 1024) return (b / 1024).toFixed(1) + ' ك.ب';
    return (b / 1024 / 1024).toFixed(2) + ' م.ب';
  }

  /* ---------- Generic single-select (.type-card / .seg button / .toggle-radio button / .seg-tabs button) ---------- */
  function initSingleSelect() {
    // Type-card grid (only one active in a .type-grid)
    qsa('.type-grid').forEach(function (grid) {
      qsa('.type-card', grid).forEach(function (card) {
        on(card, 'click', function () {
          qsa('.type-card', grid).forEach(function (c) { c.classList.remove('active'); });
          card.classList.add('active');
        });
      });
    });

    // Segmented controls (.seg, .toggle-radio, .seg-tabs)
    qsa('.seg, .toggle-radio, .seg-tabs').forEach(function (group) {
      qsa('button', group).forEach(function (btn) {
        on(btn, 'click', function () {
          qsa('button', group).forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
        });
      });
    });
  }

  /* ---------- Filter-select toggle (Inbox) ---------- */
  function initFilterSelects() {
    qsa('.filter-select').forEach(function (sel) {
      on(sel, 'click', function () {
        sel.classList.toggle('active');
      });
    });
  }

  /* ---------- Modal / Drawer ---------- */
  function initOverlays() {
    qsa('[data-open]').forEach(function (trigger) {
      var target = qs(trigger.getAttribute('data-open'));
      if (!target) return;
      on(trigger, 'click', function (e) {
        e.preventDefault();
        target.hidden = false;
      });
    });
    qsa('[data-close]').forEach(function (btn) {
      on(btn, 'click', function () {
        var target = btn.closest('[data-overlay]') || qs(btn.getAttribute('data-close'));
        if (target) target.hidden = true;
      });
    });
    // Click-outside on .scrim / .drawer-scrim
    qsa('.scrim, .drawer-scrim').forEach(function (scrim) {
      on(scrim, 'click', function (e) {
        if (e.target !== scrim) return;
        var overlay = scrim.closest('[data-overlay]') || scrim.parentElement;
        if (overlay && overlay.hasAttribute('data-overlay')) overlay.hidden = true;
        else scrim.hidden = true;
      });
    });
    on(document, 'keydown', function (e) {
      if (e.key !== 'Escape') return;
      qsa('[data-overlay]').forEach(function (ov) { if (!ov.hidden) ov.hidden = true; });
    });
  }

  /* ---------- Bulk-bar (Inbox row selection) ---------- */
  function initBulkBar() {
    var table = qs('[data-bulk-table]');
    if (!table) return;
    var tabsHeader = qs('[data-table-tabs]');
    var bulkBar = qs('[data-bulk-bar]');
    var countEl = qs('[data-bulk-count]', bulkBar);
    var headerCb = qs('[data-bulk-all]');
    var rowCbs = qsa('[data-bulk-row]', table);

    function refresh() {
      var checked = rowCbs.filter(function (c) { return c.classList.contains('checked'); });
      var n = checked.length;
      if (n > 0) {
        if (tabsHeader) tabsHeader.hidden = true;
        if (bulkBar) bulkBar.hidden = false;
        if (countEl) countEl.textContent = n;
      } else {
        if (tabsHeader) tabsHeader.hidden = false;
        if (bulkBar) bulkBar.hidden = true;
      }
      if (headerCb) {
        headerCb.classList.remove('checked', 'indeterminate');
        if (n === rowCbs.length && n > 0) headerCb.classList.add('checked');
        else if (n > 0) headerCb.classList.add('indeterminate');
      }
      // Row visual selected
      rowCbs.forEach(function (c) {
        var tr = c.closest('tr');
        if (!tr) return;
        if (c.classList.contains('checked')) tr.classList.add('selected');
        else tr.classList.remove('selected');
      });
    }

    rowCbs.forEach(function (cb) {
      on(cb, 'click', function (e) {
        e.stopPropagation();
        cb.classList.toggle('checked');
        refresh();
      });
    });
    if (headerCb) {
      on(headerCb, 'click', function (e) {
        e.stopPropagation();
        var checked = rowCbs.filter(function (c) { return c.classList.contains('checked'); }).length;
        var setAll = checked < rowCbs.length;
        rowCbs.forEach(function (c) {
          if (setAll) c.classList.add('checked');
          else c.classList.remove('checked');
        });
        refresh();
      });
    }
    var clearBtn = qs('[data-bulk-clear]');
    if (clearBtn) on(clearBtn, 'click', function () {
      rowCbs.forEach(function (c) { c.classList.remove('checked'); });
      refresh();
    });

    // Allow clicking row to also toggle
    qsa('tr[data-row-clickable]', table).forEach(function (tr) {
      on(tr, 'click', function () {
        var cb = qs('[data-bulk-row]', tr);
        if (!cb) return;
        cb.classList.toggle('checked');
        refresh();
      });
    });

    refresh();
  }

  /* ---------- Wizard (client onboarding) ---------- */
  function initWizard() {
    var stepper = qs('[data-wizard]'); if (!stepper) return;
    var container = stepper.parentElement;
    var steps = qsa('.step[data-step]', stepper);
    var panels = qsa('.wizard-panel[data-panel]', container);
    var prevBtn = qs('[data-wizard-prev]', container);
    var nextBtn = qs('[data-wizard-next]', container);
    var current = 1;

    function goTo(n) {
      n = Math.max(1, Math.min(steps.length, n));
      current = n;
      steps.forEach(function (s) {
        var idx = parseInt(s.getAttribute('data-step'), 10);
        s.classList.toggle('active', idx === n);
      });
      panels.forEach(function (p) {
        var idx = parseInt(p.getAttribute('data-panel'), 10);
        p.hidden = idx !== n;
      });
    }

    var activeStep = qs('.step.active[data-step]', stepper);
    current = activeStep ? parseInt(activeStep.getAttribute('data-step'), 10) : 1;
    goTo(current);

    steps.forEach(function (s) {
      on(s, 'click', function () { goTo(parseInt(s.getAttribute('data-step'), 10)); });
    });
    if (prevBtn) on(prevBtn, 'click', function () { goTo(current - 1); });
    if (nextBtn) on(nextBtn, 'click', function () { goTo(current + 1); });
  }

  /* ---------- Country preset toggle ---------- */
  function initCountryPreset() {
    qsa('[data-country-select]').forEach(function (group) {
      on(group, 'click', function (e) {
        var btn = e.target.closest('button[data-country]');
        if (!btn) return;
        var country = btn.getAttribute('data-country');
        qsa('button[data-country]', group).forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        qsa('[data-country-block]').forEach(function (block) {
          block.hidden = block.getAttribute('data-country-block') !== country;
        });
      });
    });
  }

  /* ---------- Boot ---------- */
  function boot() {
    initSidebarMobile();
    initBellDropdown();
    initDropzone();
    initSingleSelect();
    initFilterSelects();
    initOverlays();
    initBulkBar();
    initWizard();
    initCountryPreset();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
