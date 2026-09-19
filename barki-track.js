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
      var sofa = '';
      try {
        var q = new URL(href).searchParams.get('text') || '';
        var m = q.match(/interested in (?:the )?(.+?)\.?$/i);
        sofa = m ? m[1] : '';
      } catch (err) {}
      send('generate_lead', { method: 'whatsapp', link_text: label, sofa_name: sofa, page_title: document.title });
    } else if (/^mailto:/i.test(href)) {
      send('generate_lead', { method: 'email', link_text: label });
    } else if (/^tel:/i.test(href)) {
      send('generate_lead', { method: 'phone', link_text: label });
    } else if (/^https?:\/\//i.test(href) && a.hostname && a.hostname !== location.hostname) {
      send('click', { link_domain: a.hostname, link_url: href, outbound: true });
    }
  }, true);
})();
