/* Barki Sofa Hub - click tracking for Google Analytics 4.
   Uses one delegated listener, so it also works for links built by JavaScript.
   Respects the consent choice: gtag is already in denied mode until the visitor accepts. */
(function () {
  function send(name, params) {
    if (typeof window.gtag !== 'function') return;
    params.page_path = location.pathname;
    window.gtag('event', name, params);
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var label = (a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80);
    if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(href)) {
      /* WhatsApp taps are tracked in barki-lead.js, only when WhatsApp actually opens (form, skip or direct). */
      return;
    } else if (/^mailto:/i.test(href)) {
      send('generate_lead', { method: 'email', link_text: label });
    } else if (/^tel:/i.test(href)) {
      send('generate_lead', { method: 'phone', link_text: label });
    } else if (/^https?:\/\//i.test(href) && a.hostname && a.hostname !== location.hostname) {
      send('click', { link_domain: a.hostname, link_url: href, outbound: true });
    }
  }, true);
})();
