/* Progressive enhancement only: the page is complete without this file. */
(function () {
  'use strict';

  var root = document.documentElement;
  var META = {
    fr: {
      title: 'Wail Menouni · Chargé de projet digital à Nantes',
      description: 'Chargé de projet digital à Nantes : gouvernance web, cybersécurité, accessibilité RGAA, éco-conception et coordination entre marketing, DSI et agences.'
    },
    en: {
      title: 'Wail Menouni · Digital project lead in Nantes',
      description: 'Digital project lead in Nantes, France: web governance, cybersecurity, accessibility, sustainable web design and coordination between marketing, IT and agencies.'
    }
  };

  /* ---------- language ---------- */
  function setLang(lang, persist) {
    if (!META[lang]) return;
    root.lang = lang;
    root.dataset.lang = lang;
    document.title = META[lang].title;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', META[lang].description);

    // attributes that cannot hold two languages at once
    document.querySelectorAll('[data-aria-' + lang + ']').forEach(function (el) {
      el.setAttribute('aria-label', el.getAttribute('data-aria-' + lang));
    });
    document.querySelectorAll('[data-alt-' + lang + ']').forEach(function (el) {
      el.setAttribute('alt', el.getAttribute('data-alt-' + lang));
    });
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.setLang === lang));
    });
    reportWeight();

    if (persist) {
      try { localStorage.setItem('lang', lang); } catch (e) { /* storage unavailable */ }
      try {
        var url = new URL(location.href);
        url.searchParams.set('lang', lang);
        history.replaceState(null, '', url);
      } catch (e) { /* file:// or old browser */ }
    }
  }

  /* ---------- footer: real weight of this page ---------- */
  function reportWeight() {
    var out = document.getElementById('page-weight');
    var reqs = document.getElementById('page-requests');
    if (!out || !window.performance || !performance.getEntriesByType) return;
    var entries = performance.getEntriesByType('navigation')
      .concat(performance.getEntriesByType('resource'));
    var bytes = 0;
    entries.forEach(function (e) { bytes += e.encodedBodySize || e.transferSize || 0; });
    if (!bytes) return; // file:// exposes no sizes: keep the static estimate
    var unit = root.lang === 'en' ? ' KB' : ' Ko';
    out.textContent = Math.round(bytes / 1024).toLocaleString(root.lang) + unit;
    if (reqs) reqs.textContent = String(entries.length);
  }
  if (document.readyState !== 'complete') window.addEventListener('load', reportWeight);
  document.querySelectorAll('.g-row').forEach(function (d) {
    d.addEventListener('toggle', function () { setTimeout(reportWeight, 400); });
  });

  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.setLang, true); });
  });
  setLang(root.dataset.lang || 'fr', false);

  /* ---------- timeline: "today" marker ---------- */
  var gantt = document.querySelector('.gantt');
  if (gantt) {
    var now = new Date();
    var year = now.getFullYear() + now.getMonth() / 12;
    var styles = getComputedStyle(root);
    var start = parseFloat(styles.getPropertyValue('--axis-start'));
    var span = parseFloat(styles.getPropertyValue('--axis-span'));
    if (year >= start && year <= start + span) {
      gantt.style.setProperty('--now', String(year));
      gantt.classList.add('has-now');
      var legend = document.querySelector('.legend-now');
      if (legend) legend.hidden = false;
    }
  }

})();
