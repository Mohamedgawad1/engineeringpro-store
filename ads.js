/* ============================================================
   EngineeringPro — Halal-safe ads
   No sex, no alcohol, no gambling, no tobacco, no haram content.
   Every banner below is hand-picked and engineering-only.
   To enable Google AdSense later, set adsenseClient + slots below.
   ============================================================ */
(function () {
  'use strict';

  var AD = {
    /* ---- AdSense: leave empty until your account is approved ---- */
    adsenseClient: '',          // e.g. 'ca-pub-1234567890123456'
    adsenseSlots: { top: '', mid: '', bottom: '' },

    /* ---- Curated, halal, engineering-only ads ---- */
    items: [
      {
        id: 'fiverr',
        icon: '🛠️',
        title: 'Need an engineer for your project?',
        desc: 'ITR, commissioning docs and cable schedules — delivered in 1–3 days.',
        cta: 'Hire on Fiverr',
        href: 'https://www.fiverr.com/mohamedgawad1'
      },
      {
        id: 'templates',
        icon: '📋',
        title: 'ITR + Commissioning Bundle',
        desc: '15 ITR forms and 5 ready report templates for Excel / Word.',
        cta: 'Unlock with Pro',
        href: '#subscribe'
      },
      {
        id: 'linkedin',
        icon: '💼',
        title: 'LinkedIn kit for engineers',
        desc: '30 ready posts, banner and a 30-day content plan — free gift.',
        cta: 'Get the free gift',
        href: '#lead'
      }
    ],
    clickStore: 'engineeringpro_ad_clicks',
    memberStore: 'engineeringpro_pro_member'
  };

  function isMember() {
    try {
      var m = JSON.parse(localStorage.getItem(AD.memberStore) || 'null');
      return !!(m && m.id && /^P-/.test(m.id));
    } catch (e) { return false; }
  }

  function track(id) {
    try {
      var list = JSON.parse(localStorage.getItem(AD.clickStore) || '[]');
      list.push({ id: id, ts: Date.now() });
      if (list.length > 500) list = list.slice(-500);
      localStorage.setItem(AD.clickStore, JSON.stringify(list));
    } catch (e) { /* storage blocked — ignore */ }
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function renderCurated(slot) {
    if (!slot) return;
    if (isMember()) {
      slot.innerHTML = '<div class="ad-free">✅ Pro member — ad-free experience</div>';
      return;
    }
    var html = '<div class="ad-head">📢 Sponsored · engineering only · halal</div><div class="ad-grid">';
    AD.items.forEach(function (a) {
      html += '<a class="ad-card" data-ad-id="' + esc(a.id) + '" href="' + esc(a.href) + '"' +
        (a.href.indexOf('http') === 0 ? ' target="_blank" rel="sponsored nofollow noopener"' : ' rel="sponsored"') + '>' +
        '<div class="ad-icon">' + esc(a.icon) + '</div>' +
        '<div class="ad-title">' + esc(a.title) + '</div>' +
        '<div class="ad-desc">' + esc(a.desc) + '</div>' +
        '<span class="ad-cta">' + esc(a.cta) + ' →</span></a>';
    });
    html += '</div>';
    slot.innerHTML = html;
    slot.querySelectorAll('[data-ad-id]').forEach(function (el) {
      el.addEventListener('click', function () { track(el.getAttribute('data-ad-id')); });
    });
  }

  function renderAdsense(slot, slotId) {
    if (!AD.adsenseClient || !slotId || !slot) return;
    var ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.display = 'block';
    ins.setAttribute('data-ad-client', AD.adsenseClient);
    ins.setAttribute('data-ad-slot', slotId);
    ins.setAttribute('data-ad-format', 'auto');
    ins.setAttribute('data-full-width-responsive', 'true');
    slot.appendChild(ins);
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) { /* ignore */ }
  }

  function init() {
    ['top', 'mid', 'bottom'].forEach(function (name) {
      var slot = document.getElementById('adSlot' + name.charAt(0).toUpperCase() + name.slice(1));
      renderCurated(slot);
      renderAdsense(slot, AD.adsenseSlots[name]);
    });
  }

  if (AD.adsenseClient) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + encodeURIComponent(AD.adsenseClient);
    s.crossOrigin = 'anonymous';
    document.head.appendChild(s);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.EngineeringProAds = { refresh: init, config: AD };
})();
