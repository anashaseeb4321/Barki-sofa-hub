/* Barki Sofa Hub - site search (header magnifying glass).
   Loaded on every page by barki-lead.js.

   ============================================================
   THE SEARCH LIST - keep this in step with the website.
   When you change a price, rename a product or add a new one,
   make the same change here.  n = name, u = page, p = price shown,
   i = small photo, t = label, k = extra words people might type.
   ============================================================ */
var BARKI_SEARCH_PRODUCTS = [
  {"n": "Verona Corner Sofa", "u": "verona-corner-sofa.html", "p": "£599", "i": "images/lshape/lshape-6-480.webp", "t": "Sofa", "k": "couch settee large scatter back in charcoal with check cushions"},
  {"n": "Olympia Corner Sofa", "u": "olympia-corner-sofa.html", "p": "£599", "i": "images/olympia-corner/olympia-corner-2-480.webp", "t": "Sofa", "k": "couch settee cream"},
  {"n": "Harrison Corner Sofa", "u": "harrison-corner-sofa.html", "p": "£649", "i": "images/shannon-corner/shannon-corner-2-480.webp", "t": "Sofa", "k": "couch settee mink"},
  {"n": "Borius Sofa", "u": "borius-sofa.html", "p": "From £369", "i": "images/borius/borius-1-480.webp", "t": "Sofa", "k": "couch settee corner 2 seater footstool black white piping box arm"},
  {"n": "Lilly Alaska Sofa", "u": "lilly-alaska-sofa.html", "p": "£669", "i": "images/lilly-corner/lilly-corner-2-480.webp", "t": "Sofa", "k": "couch settee 2 seater 3 2+3 3+2 set straight cream corner shown with footstool"},
  {"n": "Lilly Corner Sofa", "u": "alaska-corner-sofa.html", "p": "£679", "i": "images/lilly-corner/lilly-corner-3-480.webp", "t": "Sofa", "k": "couch settee grey shown with coffee table"},
  {"n": "Ashton Sofa", "u": "ashton-l-shape-sofa.html", "p": "£749", "i": "images/ashton-lshape/ashton-lshape-1-480.webp", "t": "Sofa", "k": "couch settee l shape lshape chaise corner"},
  {"n": "Ashton Corner Sofa", "u": "ashton-corner-sofa.html", "p": "£749", "i": "images/ashton-corner/ashton-corner-1-480.webp", "t": "Sofa", "k": "couch settee"},
  {"n": "U-Shape Sofa", "u": "u-shape-sofa.html", "p": "£649", "i": "images/ushape/ushape-7-480.webp", "t": "Sofa", "k": "couch settee ushape grey"},
  {"n": "Lilly U-Shape Sofa", "u": "lilly-u-shape-sofa.html", "p": "£699", "i": "images/lilly-ushape/lilly-ushape-3-480.webp", "t": "Sofa", "k": "couch settee ushape cream"},
  {"n": "Lilly Chaise", "u": "l-shape-sofa.html", "p": "£699", "i": "images/lshape/lshape-cream-fluted-480.webp", "t": "Sofa", "k": "sofa couch settee l shape lshape"},
  {"n": "Lilly L-Shape Sofa", "u": "lilly-l-shape-sofa.html", "p": "£749", "i": "images/lilly-lshape/lilly-lshape-4-480.webp", "t": "Sofa", "k": "couch settee lshape chaise"},
  {"n": "Olympia 2+3 Seater Sofa", "u": "olympia-2-3-seater-sofa.html", "p": "£599", "i": "images/verona-set/verona-set-1-480.webp", "t": "Sofa", "k": "couch settee 2 3 3+2 set straight"},
  {"n": "Harrison 2+3 Seater Sofa", "u": "harrison-2-3-seater-sofa.html", "p": "£649", "i": "images/shannon-set/shannon-set-1-480.webp", "t": "Sofa", "k": "couch settee 2 3 3+2 set straight"},
  {"n": "Lilly 2+3 Seater Sofa", "u": "alaska-2-3-seater-sofa.html", "p": "£679", "i": "images/lilly-set/lilly-set-1-480.webp", "t": "Sofa", "k": "couch settee 2 3 3+2 set straight 3 seater white channel tufted scatter cushions bolsters"},
  {"n": "Italian Chesterfield", "u": "ashton-2-3-seater-sofa.html", "p": "£829", "i": "images/ashton-set/ashton-set-1-480.webp", "t": "Sofa", "k": "couch settee 2 3 3+2 set straight buttoned italian chesterfield cream grey"},
  {"n": "Ashton Scatter Back Sofa", "u": "ashton-chesterfield-sofa.html", "p": "£749", "i": "images/elaska/elaska-1-480.webp", "t": "Sofa", "k": "couch settee 2 seater 3 2+3 3+2 set straight chesterfield buttoned"},
  {"n": "Lilly Fixed Seat Sofa", "u": "lilly-fixed-seat-sofa.html", "p": "£849", "i": "images/lilly-fixed/lilly-fixed-1-480.webp", "t": "Sofa", "k": "couch settee 2 seater 3 2+3 3+2 set straight corner"},
  {"n": "Aurelia Chesterfield Sofa", "u": "aurelia-chesterfield-sofa.html", "p": "£849", "i": "images/aurelia/aurelia-1-480.webp", "t": "Sofa", "k": "couch settee 2 seater 3 2+3 3+2 set straight buttoned"},
  {"n": "Ambassador Sofa", "u": "ambassador-sofa.html", "p": "From £800", "i": "images/ambassador/ambassador-1-480.webp", "t": "Sofa", "k": "couch settee corner chesterfield buttoned 2 seater 3 2+3 3+2 3+2+1 set straight black gold"},
  {"n": "Chesterfield Sofa Bed", "u": "chesterfield-sofa-beds.html", "p": "£949", "i": "images/chesterfield-sofa-bed/chesterfield-sofa-bed-6-480.webp", "t": "Sofa bed", "k": "couch settee sofabed pull out guest corner buttoned grey velvet with gold trim and the pulled"},
  {"n": "Chrome Chesterfield Sofa Bed", "u": "chrome-chesterfield-sofa-bed.html", "p": "£999", "i": "images/chesterfield-sofa-bed/chesterfield-sofa-bed-8-480.webp", "t": "Sofa bed", "k": "couch settee sofabed pull out guest corner buttoned black velvet with gold trim crystal buttons and the pulled"},
  {"n": "Olympia Armchair", "u": "olympia-armchair.html", "p": "£319", "i": "images/olympia-arm/olympia-arm-1-480.webp", "t": "Armchair", "k": "sofa couch settee chair"},
  {"n": "Lilly Fluted Bed", "u": "lilly-fluted-bed.html", "p": "From £349", "i": "images/lilly-bed/lilly-bed-1-480.webp", "t": "Bed", "k": "mattress headboard upholstered single small double king superking grey velvet with a winged"},
  {"n": "Lilly Arched Bed", "u": "lilly-arched-bed.html", "p": "From £349", "i": "images/lilly-arched-bed/lilly-arched-bed-1-480.webp", "t": "Bed", "k": "mattress headboard upholstered single small double king superking grey velvet with a curved fluted"},
  {"n": "Chesterfield Bed", "u": "chesterfield-bed.html", "p": "From £359", "i": "images/chesterfield-bed/chesterfield-bed-2-480.webp", "t": "Bed", "k": "mattress headboard upholstered single small double king superking grey velvet with a buttoned scrolled footboard and stud trim"},
  {"n": "Ashton Bed", "u": "ashton-bed.html", "p": "From £429", "i": "images/ashton-bed/ashton-bed-1-480.webp", "t": "Bed", "k": "mattress headboard upholstered single small double king superking mink velvet with a tall buttoned"},
  {"n": "Sunburst Bed", "u": "sunburst-bed.html", "p": "From £479", "i": "images/sunburst-bed/sunburst-bed-1-480.webp", "t": "Bed", "k": "mattress headboard upholstered single small double king superking grey velvet with a fan panelled"},
  {"n": "Aurelia Bed", "u": "aurelia-bed.html", "p": "From £489", "i": "images/aurelia-bed/aurelia-bed-1-480.webp", "t": "Bed", "k": "mattress headboard upholstered single small double king superking grey velvet with dense diamond buttoning"},
  {"n": "Ambassador Bed", "u": "ambassador-bed.html", "p": "From £579", "i": "images/ambassador-bed/ambassador-bed-1-480.webp", "t": "Bed", "k": "mattress headboard upholstered single small double king superking charcoal velvet with a thick tufted frame"},
  {"n": "Square Glass-Top Coffee Table", "u": "square-glass-top-coffee-table.html", "p": "£169", "i": "images/addons/coffee-table-cream-glass-top-480.webp", "t": "Tables & stools", "k": "ottoman cream velvet with chrome feet"},
  {"n": "Chesterfield Glass-Top Coffee Table", "u": "chesterfield-glass-top-coffee-table.html", "p": "£199", "i": "images/addons/coffee-table-black-tufted-glass-top-480.webp", "t": "Tables & stools", "k": "ottoman black velvet with crystal buttons and gold feet"},
  {"n": "Round Ottoman Coffee Table", "u": "round-ottoman-coffee-table.html", "p": "£299", "i": "images/addons/round-coffee-table-marble-top-480.webp", "t": "Tables & stools", "k": "mink velvet with gold base and black glass top"},
  {"n": "Fixed Seat Stool", "u": "fix-seat-stool.html", "p": "£99", "i": "images/addons/fix-seat-stool-480.webp", "t": "Tables & stools", "k": "footstool pouffe brown fabric cube"},
  {"n": "Footstool", "u": "footstool.html", "p": "£119", "i": "images/addons/footstool-black-gold-legs-480.webp", "t": "Tables & stools", "k": "stool pouffe black velvet with gold legs"}
];
var BARKI_SEARCH_PAGES = [
  {"n": "All sofas", "u": "all-sofas.html", "t": "Page", "k": "all sofas couches range collection"},
  {"n": "Corner sofas", "u": "corner-sofas.html", "t": "Page", "k": ""},
  {"n": "U-shape sofas", "u": "u-shape-sofas.html", "t": "Page", "k": "ushape"},
  {"n": "L-shape sofas", "u": "l-shape-sofas.html", "t": "Page", "k": "lshape chaise"},
  {"n": "2+3 seater sets", "u": "2-3-seater-sofa-sets.html", "t": "Page", "k": "3+2 two three seater"},
  {"n": "Chesterfield sofas", "u": "chesterfield-sofas.html", "t": "Page", "k": ""},
  {"n": "Beds", "u": "beds.html", "t": "Page", "k": "bed upholstered mattress"},
  {"n": "Tables & stools", "u": "tables-and-stools.html", "t": "Page", "k": "coffee table footstool stool"},
  {"n": "Fabrics & colours", "u": "fabrics-and-colours.html", "t": "Page", "k": "fabric colour color velvet chenille jumbo cord naples kensington boucle velour swatch"},
  {"n": "Delivery", "u": "delivery.html", "t": "Page", "k": "free delivery how long days"},
  {"n": "Returns", "u": "returns.html", "t": "Page", "k": "cancel refund"},
  {"n": "Contact", "u": "contact.html", "t": "Page", "k": "whatsapp phone email"},
  {"n": "About us", "u": "about.html", "t": "Page", "k": ""},
  {"n": "Upholstered Bed Sizes UK: Which Size Fits Your Room?", "u": "upholstered-bed-sizes-uk.html", "t": "Guide", "k": "guide help advice"},
  {"n": "Ottoman Coffee Tables: How to Choose the Right One", "u": "ottoman-coffee-table-guide.html", "t": "Guide", "k": "guide help advice"},
  {"n": "Corner Sofa Bed or 3+2? How to Choose", "u": "corner-sofa-bed-vs-3-2-sofa-bed.html", "t": "Guide", "k": "guide help advice"},
  {"n": "Small Sofa Beds: Fitting a Guest Bed Into a Small Room", "u": "small-sofa-beds-uk.html", "t": "Guide", "k": "guide help advice"},
  {"n": "How to Choose a Sofa Bed: An Honest Buying Guide", "u": "how-to-choose-a-sofa-bed.html", "t": "Guide", "k": "guide help advice"},
  {"n": "Sofa Dimensions UK: 2 Seater, 3 Seater and Corner Sofa Sizes in cm", "u": "sofa-dimensions-uk.html", "t": "Guide", "k": "guide help advice"},
  {"n": "Best Sofa for a Small Living Room: A UK Guide to Shape and Size", "u": "best-sofa-for-small-living-room.html", "t": "Guide", "k": "guide help advice"},
  {"n": "Fast Sofa Delivery in the UK: How to Get a Sofa Quickly (and Before Christmas)", "u": "fast-sofa-delivery-uk.html", "t": "Guide", "k": "guide help advice"},
  {"n": "How to Clean a Velvet Sofa (and Other Fabric Sofas)", "u": "how-to-clean-a-velvet-sofa.html", "t": "Guide", "k": "guide help advice"},
  {"n": "How to Measure Your Room for a Corner Sofa", "u": "how-to-measure-for-a-corner-sofa.html", "t": "Guide", "k": "guide help advice"},
  {"n": "Sofa Fabric Guide: Which Upholstery Actually Lasts?", "u": "sofa-fabric-guide.html", "t": "Guide", "k": "guide help advice"},
  {"n": "Chesterfield Sofa Buying Guide: What Actually Matters", "u": "chesterfield-sofa-buying-guide.html", "t": "Guide", "k": "guide help advice"},
  {"n": "Can You Put a Corner Sofa in the Middle of a Room?", "u": "corner-sofa-in-middle-of-room.html", "t": "Guide", "k": "guide help advice"},
  {"n": "Corner vs L-Shape vs U-Shape: Which Sofa Shape Fits Your Room?", "u": "corner-vs-l-shape-vs-u-shape-sofa.html", "t": "Guide", "k": "guide help advice"},
  {"n": "Made to Measure Sofas UK: How Custom Sizes Work", "u": "made-to-measure-sofas-uk.html", "t": "Guide", "k": "guide help advice"},
  {"n": "Made to Order vs Ready Made Sofas: Which Should You Buy?", "u": "made-to-order-vs-ready-made-sofas.html", "t": "Guide", "k": "guide help advice"},
  {"n": "Cash on Delivery Sofas in the UK: How It Works and What to Check", "u": "cash-on-delivery-sofas-uk.html", "t": "Guide", "k": "guide help advice"},
  {"n": "Sofa Delivery Across Lancashire and Greater Manchester", "u": "sofa-delivery-lancashire.html", "t": "Guide", "k": "guide help advice"}
];

(function () {
  'use strict';
  try {
    var WA = 'https://wa.me/447424333739?text=' + encodeURIComponent("Hi Barki Sofa Hub, I'm looking for something I couldn't find on your website: ");
    var ALL = BARKI_SEARCH_PRODUCTS.concat(BARKI_SEARCH_PAGES);
    function norm(s) {                                          /* lower case, punctuation out, "L-shape" / "l shape" -> "lshape" */
      return (' ' + String(s).toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9+£]+/g, ' ') + ' ').replace(/\s+/g, ' ').replace(/ ([lu]) shaped? /g, ' $1shape ');
    }
    ALL.forEach(function (it) { it._n = norm(it.n); it._k = norm(it.n + ' ' + (it.t || '') + ' ' + (it.k || '') + ' ' + (it.p || '')); });

    function search(q) {
      var words = norm(q).trim().split(' ').filter(Boolean);
      if (!words.length) return [];
      var out = [];
      ALL.forEach(function (it, idx) {
        var score = 0;
        for (var i = 0; i < words.length; i++) {
          var w = words[i];
          if (it._n.indexOf(' ' + w) > -1) score += 10;        /* a word in the name starts with it */
          else if (it._n.indexOf(w) > -1) score += 6;
          else if (it._k.indexOf(' ' + w) > -1) score += 3;
          else if (w.length > 2 && it._k.indexOf(w) > -1) score += 1;
          else return;
        }
        if (it.p) score += 2;                                   /* products before pages and guides */
        out.push({ it: it, s: score, i: idx });
      });
      out.sort(function (a, b) { return b.s - a.s || a.i - b.i; });
      return out.slice(0, 8).map(function (o) { return o.it; });
    }
    window.barkiSearch = search;                                /* handy for testing */

    function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

    var css = '' +
      '.bsrch-btn{flex:none;width:44px;height:44px;display:inline-flex;align-items:center;justify-content:center;padding:0;border:1.5px solid rgba(20,78,74,.22);border-radius:999px;background:#fff;color:#144E4A;cursor:pointer;transition:border-color .15s,background .15s}' +
      '.bsrch-btn:hover{border-color:#144E4A}.bsrch-btn svg{width:20px;height:20px}' +
      '.bsrch-btn:focus-visible,.bsrch-x:focus-visible,.bsrch-res a:focus-visible,.bsrch-quick a:focus-visible{outline:2px solid #BE9A5C;outline-offset:2px}' +
      '.bsrch-wrap{display:flex;align-items:center;gap:10px;flex:none}' +
      /* z-index sits just under the WhatsApp order form (10000) so that form opens on top */
      '.bsrch{position:fixed;inset:0;z-index:9000;display:none;align-items:flex-start;justify-content:center;padding:72px 16px 16px;background:rgba(15,58,54,.55)}' +
      '.bsrch.is-open{display:flex}' +
      '.bsrch-box{width:100%;max-width:620px;max-height:calc(100vh - 96px);max-height:calc(100dvh - 96px);display:flex;flex-direction:column;background:#F8F5EF;border-radius:18px;box-shadow:0 30px 60px -20px rgba(0,0,0,.5);overflow:hidden;font-family:"Manrope",system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#1C302E}' +
      '.bsrch-top{display:flex;align-items:center;gap:8px;padding:12px 12px 12px 18px;border-bottom:1px solid #F1EBDF;background:#fff}' +
      '.bsrch-top svg{flex:none;width:20px;height:20px;color:#5B6D68}' +
      '.bsrch-in{flex:1;min-width:0;height:44px;border:0;outline:0;background:transparent;font:600 16px "Manrope",system-ui,sans-serif;color:#1C302E}' +
      '.bsrch-in::placeholder{color:#8a9894;font-weight:500}' +
      '.bsrch-in{-webkit-appearance:none;appearance:none}.bsrch-in::-webkit-search-cancel-button,.bsrch-in::-webkit-search-decoration{-webkit-appearance:none;display:none}' +
      '.bsrch-x{flex:none;width:44px;height:44px;border:0;border-radius:999px;background:transparent;color:#144E4A;font-size:26px;line-height:1;cursor:pointer}.bsrch-x:hover{background:#F1EBDF}' +
      '.bsrch-body{overflow-y:auto;-webkit-overflow-scrolling:touch;padding:10px}' +
      '.bsrch-h{margin:8px 8px 6px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#5B6D68}' +
      '.bsrch-res{list-style:none;margin:0;padding:0}' +
      '.bsrch-res a{display:flex;align-items:center;gap:12px;min-height:64px;padding:8px;border-radius:12px;color:inherit;text-decoration:none}' +
      '.bsrch-res a:hover,.bsrch-res a.is-on{background:#fff;box-shadow:inset 0 0 0 1px rgba(190,154,92,.45)}' +
      '.bsrch-res img,.bsrch-ph{flex:none;width:64px;height:48px;border-radius:8px;object-fit:cover;background:#F1EBDF}' +
      '.bsrch-ph{display:flex;align-items:center;justify-content:center;color:#BE9A5C}.bsrch-ph svg{width:20px;height:20px}' +
      '.bsrch-t{flex:1;min-width:0}.bsrch-t b{display:block;font-size:15px;font-weight:700;line-height:1.3}.bsrch-t span{display:block;font-size:12.5px;color:#5B6D68}' +
      '.bsrch-p{flex:none;font-size:15px;font-weight:700;color:#144E4A;white-space:nowrap}' +
      '.bsrch-quick{display:flex;flex-wrap:wrap;gap:8px;padding:2px 8px 10px}' +
      '.bsrch-quick a{display:inline-flex;align-items:center;min-height:44px;padding:0 16px;border:1.5px solid rgba(20,78,74,.28);border-radius:999px;background:#fff;color:#144E4A;font-size:14px;font-weight:600;text-decoration:none}' +
      '.bsrch-none{padding:22px 12px 18px;text-align:center}.bsrch-none p{margin:0 0 14px;font-size:15px}' +
      '.bsrch-wa{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 22px;border-radius:999px;background:#BE9A5C;color:#0F3A36;font-size:15px;font-weight:700;text-decoration:none}' +
      '@media(max-width:640px){.bsrch{padding:10px}.bsrch-box{max-height:calc(100vh - 20px);max-height:calc(100dvh - 20px)}.bsrch-btn{width:42px;height:44px;border-radius:14px}' +
      /* phones, inner pages: the icon sits at the start of the swipeable menu row, which stays put while the menu scrolls */
      '.nav--bsrch .bsrch-wrap{display:contents}.nav--bsrch .bsrch-btn{order:2}.nav--bsrch{align-items:center}' +
      'header .nav--bsrch .navlinks{order:3;flex:1 1 calc(100% - 52px);width:auto;min-width:0;margin:0 -16px 0 0;padding:0 16px 2px 0}}';

    var ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6"/></svg>';
    var DOC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/></svg>';
    var QUICK = [['Corner sofas', 'corner-sofas.html'], ['U-shape sofas', 'u-shape-sofas.html'], ['Chesterfield sofas', 'chesterfield-sofas.html'], ['Sofa beds', 'chesterfield-sofa-beds.html'], ['Beds', 'beds.html'], ['Fabrics & colours', 'fabrics-and-colours.html']];

    function init() {
      var header = document.querySelector('header');
      if (!header || document.getElementById('bsrchBtn')) return;
      var wa = header.querySelector('.nav .btn--wa') || header.querySelector('.btn--wa');
      if (!wa) return;

      var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

      var btn = document.createElement('button');
      btn.type = 'button'; btn.id = 'bsrchBtn'; btn.className = 'bsrch-btn';
      btn.setAttribute('aria-label', 'Search the site'); btn.setAttribute('aria-haspopup', 'dialog');
      btn.innerHTML = ICON;
      if (wa.parentNode.classList.contains('nav')) {             /* inner pages: keep the icon and WhatsApp together on the right */
        var w = document.createElement('div'); w.className = 'bsrch-wrap';
        wa.parentNode.classList.add('nav--bsrch');
        wa.parentNode.insertBefore(w, wa); w.appendChild(btn); w.appendChild(wa);
      } else {
        wa.parentNode.insertBefore(btn, wa);                     /* homepage: its buttons are already grouped */
      }

      var ov = document.createElement('div');
      ov.className = 'bsrch'; ov.id = 'bsrch'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', 'Search Barki Sofa Hub');
      ov.innerHTML = '<div class="bsrch-box"><div class="bsrch-top">' + ICON +
        '<input class="bsrch-in" id="bsrchIn" type="search" placeholder="Search sofas, beds, tables…" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="search" aria-label="Search" aria-controls="bsrchBody">' +
        '<button type="button" class="bsrch-x" id="bsrchX" aria-label="Close search">&times;</button></div>' +
        '<div class="bsrch-body" id="bsrchBody" aria-live="polite"></div></div>';
      document.body.appendChild(ov);

      var input = ov.querySelector('#bsrchIn'), body = ov.querySelector('#bsrchBody'), on = -1, lastFocus = null;

      function row(it) {
        var pic = it.i ? '<img src="' + esc(it.i) + '" alt="" width="64" height="48" loading="lazy" decoding="async">' : '<span class="bsrch-ph">' + DOC + '</span>';
        return '<li><a href="' + esc(it.u) + '">' + pic + '<span class="bsrch-t"><b>' + esc(it.n) + '</b><span>' + esc(it.t || '') + '</span></span>' +
          (it.p ? '<span class="bsrch-p">' + esc(it.p) + '</span>' : '') + '</a></li>';
      }
      function render() {
        var q = input.value.trim(); on = -1;
        if (!q) {
          body.innerHTML = '<p class="bsrch-h">Popular</p><div class="bsrch-quick">' + QUICK.map(function (x) { return '<a href="' + x[1] + '">' + esc(x[0]) + '</a>'; }).join('') + '</div>';
          return;
        }
        var res = search(q);
        if (!res.length) {
          body.innerHTML = '<div class="bsrch-none"><p>Nothing found for “' + esc(q) + '”. Message us and we’ll tell you if we can help.</p>' +
            '<a class="bsrch-wa" href="' + WA + encodeURIComponent(q) + '" target="_blank" rel="noopener">Ask on WhatsApp</a></div>';
          return;
        }
        body.innerHTML = '<p class="bsrch-h">' + res.length + (res.length === 1 ? ' result' : ' results') + '</p><ul class="bsrch-res">' + res.map(row).join('') + '</ul>';
      }
      function open() {
        lastFocus = document.activeElement; ov.classList.add('is-open'); document.documentElement.style.overflow = 'hidden';
        btn.setAttribute('aria-expanded', 'true'); render(); setTimeout(function () { input.focus(); }, 30);
      }
      function close() {
        ov.classList.remove('is-open'); document.documentElement.style.overflow = ''; btn.setAttribute('aria-expanded', 'false');
        if (lastFocus && lastFocus.focus) lastFocus.focus();
      }
      function move(d) {
        var links = body.querySelectorAll('.bsrch-res a'); if (!links.length) return;
        if (on > -1 && links[on]) links[on].classList.remove('is-on');
        on = (on + d + links.length) % links.length; links[on].classList.add('is-on'); links[on].scrollIntoView({ block: 'nearest' });
      }

      btn.addEventListener('click', open);
      ov.querySelector('#bsrchX').addEventListener('click', close);
      ov.addEventListener('mousedown', function (e) { if (e.target === ov) close(); });
      input.addEventListener('input', render);
      body.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('.bsrch-wa')) close(); });   /* let the order form show on top */
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && ov.classList.contains('is-open')) { e.preventDefault(); close(); } });
      ov.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
        else if (e.key === 'Enter' && e.target === input) {
          var links = body.querySelectorAll('.bsrch-res a'); var go = links[on > -1 ? on : 0];
          if (go) { e.preventDefault(); window.location.href = go.getAttribute('href'); }
        } else if (e.key === 'Tab') {                              /* keep the Tab key inside the search box */
          var f = ov.querySelectorAll('input,button,a[href]'); if (!f.length) return;
          var first = f[0], last = f[f.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  } catch (e) { /* search must never break the page */ }
})();
