/* Barki Sofa Hub - Meta Pixel + WhatsApp order form + Lead tracking.
   One file, loaded on every page (added by add-analytics.py).

   1. The Meta Pixel only loads after the visitor clicks "Accept" on the cookie bar (UK cookie rules).
   2. Every WhatsApp button opens the short order form first (sofa, colour, sizes).
      Pages listed in NO_FORM_PAGES skip the form and go straight to WhatsApp.
      A single link can also skip it by adding data-no-form to the <a> tag.
   3. When the form is sent: "Lead" goes to Meta, "generate_lead" goes to Google Analytics,
      then WhatsApp opens with the customer's answers already typed in.
   Leads from people who arrived from a Meta ad end with "(Meta ad)" in the WhatsApp message. */
(function () {
  'use strict';
  var PIXEL_ID = '1000251226315100';
  var WA_NUMBER = '447424333739';
  var NO_FORM_PAGES = ['returns.html', 'terms.html', 'privacy.html'];

  function hasConsent() {
    try { return localStorage.getItem('bsh_consent') === 'granted'; } catch (e) { return false; }
  }
  function pageName() {
    var p = location.pathname.split('/').pop();
    return p || 'index.html';
  }

  /* ---------- 1. Meta Pixel, only after consent ---------- */
  var pixelOn = false;
  function loadPixel() {
    if (pixelOn || !hasConsent()) return;
    pixelOn = true;
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
  }
  function metaEvent(name, params, options) {
    if (!pixelOn || typeof window.fbq !== 'function') return;
    try { window.fbq('track', name, params || {}, options || {}); } catch (e) {}
  }
  function gaEvent(name, params) {
    if (typeof window.gtag !== 'function') return;
    try { params.page_path = location.pathname; window.gtag('event', name, params); } catch (e) {}
  }

  /* Did this visit start from a Meta ad? (Meta adds ?fbclid=..., or use utm_source=meta in the ad link.) */
  var landedFromAd = /[?&](fbclid=|utm_source=(meta|facebook|fb|instagram|ig)(&|$))/i.test(location.search);
  function rememberAd() {
    if (landedFromAd && hasConsent()) { try { sessionStorage.setItem('bsh_src', 'meta'); } catch (e) {} }
  }
  function cameFromAd() {
    if (landedFromAd) return true;
    if (!hasConsent()) return false;
    try { return sessionStorage.getItem('bsh_src') === 'meta'; } catch (e) { return false; }
  }

  loadPixel();
  rememberAd();
  // The cookie bar's own script saves the choice first; this runs just after it.
  document.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('#ckYes')) { loadPixel(); rememberAd(); }
  });

  /* ---------- 2. The order form ---------- */
  var FORM_CSS = ".qz-overlay{display:none;position:fixed;inset:0;z-index:10000;background:rgba(15,58,54,.55);backdrop-filter:blur(3px);align-items:center;justify-content:center;padding:20px}\n.qz-overlay.open{display:flex}\n.qz-modal{background:var(--white);width:100%;max-width:440px;max-height:92vh;overflow-y:auto;border-radius:var(--radius);box-shadow:0 30px 60px -20px rgba(15,58,54,.5);position:relative;animation:qzPop .22s ease}\n@keyframes qzPop{from{opacity:0;transform:translateY(10px) scale(.98)}to{opacity:1;transform:none}}\n.qz-header{padding:24px 28px 16px;border-bottom:1px solid #ECE6DA;position:sticky;top:0;background:var(--white);border-radius:var(--radius) var(--radius) 0 0}\n.qz-eyebrow{font-family:var(--sans);font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:8px}\n.qz-title{font-family:var(--serif);font-size:23px;font-weight:600;color:var(--ink);line-height:1.2;margin:0}\n.qz-sub{font-family:var(--sans);font-size:13px;color:var(--muted);margin-top:6px;line-height:1.45}\n.qz-close{position:absolute;top:18px;right:20px;background:none;border:none;font-size:26px;line-height:1;color:var(--muted);cursor:pointer;padding:2px 6px}\n.qz-close:hover{color:var(--ink)}\n.qz-body{padding:20px 28px 8px;font-family:var(--sans)}\n.qz-q{margin-bottom:22px}\n.qz-q-label{font-size:14px;font-weight:700;color:var(--ink);margin-bottom:10px;display:block}\n.qz-q-label .qz-num{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:var(--cream-2);color:var(--teal);font-size:12px;font-weight:800;margin-right:8px}\n.qz-opts{display:flex;flex-direction:column;gap:8px}\n.qz-opt{display:flex;align-items:center;gap:10px;padding:11px 14px;border:1.5px solid #E4DECF;border-radius:var(--radius-sm);cursor:pointer;font-size:14px;color:var(--ink);transition:border-color .15s,background .15s;user-select:none}\n.qz-opt:hover{border-color:var(--gold-soft)}\n.qz-opt.selected{border-color:var(--gold);background:rgba(190,154,92,.08)}\n.qz-opt .qz-dot{width:16px;height:16px;border-radius:50%;border:2px solid #D6CFBE;flex-shrink:0;position:relative;transition:border-color .15s}\n.qz-opt.selected .qz-dot{border-color:var(--gold)}\n.qz-opt.selected .qz-dot::after{content:'';position:absolute;inset:3px;border-radius:50%;background:var(--gold)}\n.qz-reveal{display:none;margin-top:10px}\n.qz-reveal.show{display:block}\n.qz-input,.qz-select{width:100%;padding:11px 13px;border:1.5px solid #E4DECF;border-radius:var(--radius-sm);font-family:var(--sans);font-size:14px;color:var(--ink);background:var(--white)}\n.qz-input:focus,.qz-select:focus{outline:none;border-color:var(--gold)}\n.qz-footer{padding:8px 28px 26px;font-family:var(--sans)}\n.qz-submit{width:100%;padding:14px;border:none;border-radius:var(--radius-sm);background:#25D366;color:#0B3D24;font-family:var(--sans);font-size:15px;font-weight:800;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:9px;transition:opacity .15s}\n.qz-submit svg{width:18px;height:18px}\n.qz-submit:disabled{background:var(--cream-2);color:#A79E88;cursor:not-allowed}\n.qz-hint{font-size:12px;color:var(--muted);text-align:center;margin-top:10px;line-height:1.4}\n@media (max-width:480px){.qz-header,.qz-body,.qz-footer{padding-left:20px;padding-right:20px}.qz-title{font-size:21px}}";
  var FORM_HTML = "<div class=\"qz-overlay\" id=\"qzOverlay\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"qzTitle\">\n  <div class=\"qz-modal\">\n    <div class=\"qz-header\">\n      <button class=\"qz-close\" id=\"qzClose\" aria-label=\"Close\">&times;</button>\n      <div class=\"qz-eyebrow\">Almost there</div>\n      <h3 class=\"qz-title\" id=\"qzTitle\">A few quick questions</h3>\n      <p class=\"qz-sub\">Answer these so our team can help you fast on WhatsApp — no waiting around.</p>\n    </div>\n    <div class=\"qz-body\">\n      <div class=\"qz-q\" data-q=\"sofa\">\n        <span class=\"qz-q-label\"><span class=\"qz-num\">1</span>Which sofa are you interested in?</span>\n        <div class=\"qz-opts\">\n          <div class=\"qz-opt\" id=\"qzSameOpt\" data-val=\"same\"><span class=\"qz-dot\"></span><span>Yes — <b id=\"qzSofaName\">this sofa</b></span></div>\n          <div class=\"qz-opt\" data-val=\"other\"><span class=\"qz-dot\"></span><span>A different sofa</span></div>\n        </div>\n        <div class=\"qz-reveal\" id=\"qzSofaReveal\">\n          <select class=\"qz-select\" id=\"qzSofaSelect\">\n            <option value=\"\">Choose the sofa you'd like...</option>\n            <option>U-Shape Sofa</option>\n            <option>Alaska Corner Sofa</option>\n            <option>Ashton Corner Sofa</option>\n            <option>Alaska 2+3 Seater Sofa</option>\n            <option>Lilly U-Shape Sofa</option>\n            <option>Lilly L-Shape Sofa</option>\n            <option>Ashton 2+3 Seater Sofa</option>\n            <option>Ashton L-Shape Sofa</option>\n            <option>Harrison Corner Sofa</option>\n            <option>Harrison 2+3 Seater Sofa</option>\n            <option>Olympia Corner Sofa</option>\n            <option>Meralane Corner Sofa</option>\n            <option>Meralane 2+3 Seater Sofa</option>\n            <option>L-Shape Sofa</option>\n            <option>Chesterfield Sofa</option>\n            <option>Borius Sofa</option>\n            <option>Ambassador Sofa</option>\n            <option>Marilain Sofa</option>\n            <option>Aurelia Sofa</option>\n            <option>Not sure — need a recommendation</option>\n          </select>\n        </div>\n      </div>\n      <div class=\"qz-q\" data-q=\"colour\">\n        <span class=\"qz-q-label\"><span class=\"qz-num\">2</span>Do you have a colour or fabric in mind?</span>\n        <div class=\"qz-opts\">\n          <div class=\"qz-opt\" data-val=\"have\"><span class=\"qz-dot\"></span><span>Yes, I have a colour in mind</span></div>\n          <div class=\"qz-opt\" data-val=\"show\"><span class=\"qz-dot\"></span><span>Not yet — I'd like to see the options</span></div>\n        </div>\n        <div class=\"qz-reveal\" id=\"qzColourReveal\">\n          <input class=\"qz-input\" id=\"qzColourInput\" type=\"text\" placeholder=\"e.g. grey, beige, dark blue...\">\n        </div>\n      </div>\n      <div class=\"qz-q\" data-q=\"size\">\n        <span class=\"qz-q-label\"><span class=\"qz-num\">3</span>Which measurements do you need?</span>\n        <div class=\"qz-opts\">\n          <div class=\"qz-opt\" data-val=\"standard\"><span class=\"qz-dot\"></span><span>Your standard sizes (please share them)</span></div>\n          <div class=\"qz-opt\" data-val=\"custom\"><span class=\"qz-dot\"></span><span>Custom sizes to fit my room</span></div>\n        </div>\n        <div class=\"qz-reveal\" id=\"qzSizeReveal\">\n          <input class=\"qz-input\" id=\"qzSizeInput\" type=\"text\" placeholder=\"Optional: your room space or required size...\">\n        </div>\n      </div>\n    </div>\n    <div class=\"qz-footer\">\n      <button class=\"qz-submit\" id=\"qzSubmit\" disabled>\n        <svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z\"/><path d=\"M12 0C5.373 0 0 5.373 0 12c0 2.125.556 4.118 1.528 5.845L.057 23.25a.75.75 0 00.927.928l5.432-1.465A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.925 0-3.734-.504-5.303-1.385l-.38-.221-3.924 1.059 1.078-3.817-.247-.396A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z\"/></svg>\n        Continue to WhatsApp\n      </button>\n      <p class=\"qz-hint\">Answer all three to open the chat with your details ready.</p>\n    </div>\n  </div>\n</div>";

  if (!document.getElementById('bsh-qz-css')) {
    var st = document.createElement('style');
    st.id = 'bsh-qz-css';
    st.textContent = FORM_CSS;
    document.head.appendChild(st);
  }
  if (!document.getElementById('qzOverlay')) {
    var holder = document.createElement('div');
    holder.innerHTML = FORM_HTML;
    document.body.appendChild(holder.firstElementChild);
  }

  var overlay = document.getElementById('qzOverlay');
  var sofaNameEl = document.getElementById('qzSofaName');
  var sameOpt = document.getElementById('qzSameOpt');
  var sofaReveal = document.getElementById('qzSofaReveal'), sofaSelect = document.getElementById('qzSofaSelect');
  var colourReveal = document.getElementById('qzColourReveal'), colourInput = document.getElementById('qzColourInput');
  var sizeReveal = document.getElementById('qzSizeReveal'), sizeInput = document.getElementById('qzSizeInput');
  var submitBtn = document.getElementById('qzSubmit');
  var state = { sofa: null, colour: null, size: null, product: '' };
  var lastFocus = null, oldOverflow = '';

  function openForm(productName) {
    state = { sofa: null, colour: null, size: null, product: productName || '' };
    overlay.querySelectorAll('.qz-opt').forEach(function (o) { o.classList.remove('selected'); });
    [sofaReveal, colourReveal, sizeReveal].forEach(function (r) { r.classList.remove('show'); });
    sofaSelect.value = ''; colourInput.value = ''; sizeInput.value = '';
    if (productName) {
      sameOpt.style.display = '';
      sofaNameEl.textContent = productName;
    } else {
      sameOpt.style.display = 'none';
      state.sofa = 'other';
      overlay.querySelector('.qz-q[data-q="sofa"] .qz-opt[data-val="other"]').classList.add('selected');
      sofaReveal.classList.add('show');
    }
    validate();
    lastFocus = document.activeElement;
    oldOverflow = document.body.style.overflow;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    var first = overlay.querySelector('.qz-close');
    if (first) { try { first.focus({ preventScroll: true }); } catch (e) {} }
    metaEvent('Contact', { content_name: productName || 'Order form' });
    gaEvent('order_form_open', { sofa_name: productName || '' });
  }
  window.openQualify = openForm;

  function closeForm() {
    overlay.classList.remove('open');
    document.body.style.overflow = oldOverflow;
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus({ preventScroll: true }); } catch (e) {} }
  }

  overlay.querySelectorAll('.qz-q').forEach(function (q) {
    var key = q.dataset.q;
    q.querySelectorAll('.qz-opt').forEach(function (opt) {
      opt.setAttribute('role', 'button');
      opt.setAttribute('tabindex', '0');
      function pick() {
        q.querySelectorAll('.qz-opt').forEach(function (o) { o.classList.remove('selected'); });
        opt.classList.add('selected');
        var val = opt.dataset.val;
        if (key === 'sofa') { state.sofa = val; sofaReveal.classList.toggle('show', val === 'other'); }
        if (key === 'colour') { state.colour = val; colourReveal.classList.toggle('show', val === 'have'); }
        if (key === 'size') { state.size = val; sizeReveal.classList.toggle('show', val === 'custom'); }
        validate();
      }
      opt.addEventListener('click', pick);
      opt.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
    });
  });
  [sofaSelect, colourInput, sizeInput].forEach(function (el) {
    el.addEventListener('input', validate);
    el.addEventListener('change', validate);
  });

  function validate() {
    var ok = true;
    if (!state.sofa) ok = false;
    if (state.sofa === 'other' && !sofaSelect.value) ok = false;
    if (!state.colour) ok = false;
    if (state.colour === 'have' && !colourInput.value.trim()) ok = false;
    if (!state.size) ok = false;
    submitBtn.disabled = !ok;
  }

  submitBtn.addEventListener('click', function () {
    if (submitBtn.disabled) return;
    var sofa = (state.sofa === 'other') ? sofaSelect.value : (state.product || 'a sofa');
    var colourLine = (state.colour === 'have')
      ? ('*Colour/Fabric:* ' + colourInput.value.trim())
      : '*Colour/Fabric:* Please show me the available options';
    var sizeType = (state.size === 'custom') ? 'Custom size' : 'Standard size';
    var sizeLine;
    if (state.size === 'custom') {
      var extra = sizeInput.value.trim();
      sizeLine = '*Measurements:* Custom sizes' + (extra ? (' — ' + extra) : '');
    } else {
      sizeLine = '*Measurements:* Your standard sizes — please share the measurements';
    }
    var msg = 'Hi Barki Sofa Hub 👋 I\'d like to order — here are my details:\n\n*Sofa:* ' + sofa +
      '\n' + colourLine + '\n' + sizeLine +
      '\n\n_Sent via the website' + (cameFromAd() ? ' (Meta ad)' : '') + '_';
    var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);

    // Report the lead first, then open WhatsApp in a new tab (this page stays open, so the Pixel finishes sending).
    var eventId = 'lead-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
    metaEvent('Lead', { content_name: sofa, content_category: sizeType }, { eventID: eventId });
    gaEvent('generate_lead', { method: 'whatsapp_form', sofa_name: sofa, size_type: sizeType });

    var win = null;
    try { win = window.open(url, '_blank'); } catch (e) {}
    if (win) {
      try { win.opener = null; } catch (e) {}
    } else {
      // New tab blocked (some in-app browsers): wait a moment so the Lead can send, then go to WhatsApp here.
      setTimeout(function () { location.href = url; }, 400);
    }
    closeForm();
  });

  document.getElementById('qzClose').addEventListener('click', closeForm);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeForm(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeForm();
  });

  /* ---------- 3. Every WhatsApp tap opens the form ---------- */
  function textParam(href) {
    try { return new URL(href, location.href).searchParams.get('text') || ''; } catch (e) { return ''; }
  }
  function sofaInText(t) {
    var m = t.match(/interested in (?:the )?(.+?)(?: \(|\.|,|$)/i) || t.match(/like to order (?:the )?(.+?)(?: —| - |\.|,|$)/i);
    return m ? m[1].trim() : '';
  }
  // On a single-sofa page (every WhatsApp link names the same sofa), use that sofa for the generic buttons too.
  var pageSofa = (function () {
    var names = {};
    document.querySelectorAll('a[href*="wa.me"], a[href*="api.whatsapp.com"]').forEach(function (a) {
      var n = sofaInText(textParam(a.getAttribute('href')));
      if (n) names[n] = true;
    });
    var list = Object.keys(names);
    return list.length === 1 ? list[0] : '';
  })();

  function sofaForLink(a) {
    if (a.id === 'dOrder' && typeof window.__barkiCurrentDetailName === 'function') {
      var d = window.__barkiCurrentDetailName();
      if (d) return d;
    }
    var card = a.closest('.pcard');
    if (card) {
      var n = card.querySelector('.pcard__name');
      if (n && n.textContent.trim()) return n.textContent.trim();
    }
    return sofaInText(textParam(a.getAttribute('href'))) || pageSofa;
  }

  var skipFormHere = NO_FORM_PAGES.indexOf(pageName()) !== -1;
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (!/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(href)) return;
    if (skipFormHere || a.hasAttribute('data-no-form')) {
      metaEvent('Contact', { content_name: 'WhatsApp (direct)' });
      return; // normal link: goes straight to WhatsApp
    }
    e.preventDefault();
    e.stopImmediatePropagation();
    openForm(sofaForLink(a));
  }, true);
})();
