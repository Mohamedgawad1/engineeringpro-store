/* ============================================================
   EngineeringPro — Halal-safe ads
   No sex, no alcohol, no gambling, no tobacco, no haram content.
   Fallback banners are hand-picked and engineering-only.
   Paid networks are OFF until you paste your approved IDs below.
   Priority: AdSense > Carbon Ads > EthicalAds > Media.net > curated.
   ============================================================ */
(function () {
  'use strict';

  var AD = {
    /* ---- Google AdSense (needs approval) ---- */
    adsenseClient: 'ca-pub-3186261470444005',   // approved AdSense publisher
    adsenseAutoAds: true,                        // let Google place ads automatically
    adsenseSlots: { top: '', mid: '', bottom: '' },  // optional manual ad unit IDs (override auto ads)

    /* ---- Carbon Ads — engineering/developer only, hand-curated ---- */
    carbon: {
      enabled: false,           // set true after signup
      id: '',                   // your placement ID
      script: ''                // full script URL given by Carbon
    },

    /* ---- EthicalAds — contextual, privacy-friendly, no tracking ---- */
    ethicalAds: {
      enabled: false,
      id: ''                    // your publisher/placement ID
    },

    /* ---- Media.net — contextual ads (Yahoo/Bing), with category blocking ---- */
    mediaNet: {
      enabled: false,
      client: '',
      slots: { top: '', mid: '', bottom: '' }
    },

    /* ---- Curated, halal, engineering-only fallback ads ---- */
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
    if (!AD.adsenseClient || !slot) return false;
    if (!slotId) {
      // Auto ads: the page-level script is enough, Google chooses placements.
      return AD.adsenseAutoAds;
    }
    var ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.display = 'block';
    ins.setAttribute('data-ad-client', AD.adsenseClient);
    ins.setAttribute('data-ad-slot', slotId);
    ins.setAttribute('data-ad-format', 'auto');
    ins.setAttribute('data-full-width-responsive', 'true');
    slot.appendChild(ins);
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) { /* ignore */ }
    return true;
  }

  function renderCarbon(slot) {
    if (!AD.carbon.enabled || !AD.carbon.id || !slot) return false;
    slot.innerHTML = '<div class="ad-head">📢 Sponsored · engineering only · halal</div>' +
      '<div id="carbonads-container-' + esc(AD.carbon.id) + '"></div>';
    if (AD.carbon.script) {
      var s = document.createElement('script');
      s.async = true;
      s.src = AD.carbon.script;
      document.head.appendChild(s);
    }
    return true;
  }

  function renderEthical(slot) {
    if (!AD.ethicalAds.enabled || !AD.ethicalAds.id || !slot) return false;
    slot.innerHTML = '<div class="ad-head">📢 Sponsored · engineering only · halal</div>' +
      '<div data-ea-publisher="' + esc(AD.ethicalAds.id) + '" data-ea-type="image"></div>';
    if (!document.getElementById('ethicalads-script')) {
      var s = document.createElement('script');
      s.id = 'ethicalads-script';
      s.async = true;
      s.src = 'https://media.ethicalads.io/media/client/ethicalads.min.js';
      document.head.appendChild(s);
    }
    return true;
  }

  function renderMediaNet(slot, slotId) {
    if (!AD.mediaNet.enabled || !AD.mediaNet.client || !slotId || !slot) return false;
    var ins = document.createElement('ins');
    ins.style.display = 'block';
    ins.setAttribute('data-ad-client', AD.mediaNet.client);
    ins.setAttribute('data-ad-slot', slotId);
    slot.appendChild(ins);
    if (!document.getElementById('medianet-script')) {
      var s = document.createElement('script');
      s.id = 'medianet-script';
      s.async = true;
      s.src = 'https://contextual.media.net/dmedianet.js?cid=' + encodeURIComponent(AD.mediaNet.client);
      document.head.appendChild(s);
    }
    return true;
  }

  function init() {
    ['top', 'mid', 'bottom'].forEach(function (name) {
      var slot = document.getElementById('adSlot' + name.charAt(0).toUpperCase() + name.slice(1));
      if (!slot) return;
      slot.innerHTML = '';
      if (isMember()) {
        slot.innerHTML = '<div class="ad-free">✅ Pro member — ad-free experience</div>';
        return;
      }
      var done = false;
      if (AD.adsenseClient) done = renderAdsense(slot, AD.adsenseSlots[name]);
      if (!done) done = renderCarbon(slot);
      if (!done) done = renderEthical(slot);
      if (!done) done = renderMediaNet(slot, AD.mediaNet.slots[name]);
      if (!done) renderCurated(slot);
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
