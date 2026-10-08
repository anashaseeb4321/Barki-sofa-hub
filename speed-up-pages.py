#!/usr/bin/env python3
"""Barki Sofa Hub - make pages load faster on phones.

What it does to every page (safe to run again and again; finished pages are left alone):
  1. Sofa photos: each <img src="images/...jpg"> gets light WebP copies
     (made by make-webp.py) so phones download about 4-8 times less.
     The original .jpg stays as the fallback for very old browsers.
  2. The main photo at the top of a page (ad spot, product photo) is marked
     "load this first" so it appears sooner.
  3. Google Analytics loads just after the page has finished showing,
     instead of competing with the photos. Consent mode is unchanged.
  4. Product photo galleries keep working with the new photos.
  5. Homepage fabric cards download one small colour sample instead of a whole strip.

Run it from the website folder, after make-webp.py:
    python3 make-webp.py
    python3 speed-up-pages.py
"""
import glob, os, re, sys

root = os.path.dirname(os.path.abspath(__file__)) if len(sys.argv) < 2 else sys.argv[1]
os.chdir(root)

WIDTHS = (480, 800, 1200)
GA_ID = "G-9FS7L9SGWF"

# How wide each kind of photo is on screen, so the browser picks the right copy.
SIZES = {
    "card":   "(max-width:600px) calc(100vw - 44px), (max-width:1180px) 46vw, 370px",
    "adpick": "(max-width:760px) calc(100vw - 74px), 560px",
    "main":   "(max-width:860px) calc(100vw - 44px), 560px",
    "thumb":  "(max-width:860px) 25vw, 140px",
    "addon":  "(max-width:640px) calc(100vw - 44px), 380px",
    "article": "(max-width:800px) calc(100vw - 44px), 760px",
}
FIRST_PHOTO = {"adpick", "main"}  # the big photo at the top: load it first

GA_OLD = f'<script async src="https://www.googletagmanager.com/gtag/js?id={GA_ID}"></script>'
GA_NEW = ("<script>/* Google Analytics loads just after the page has shown (faster on phones) */"
          "window.addEventListener('load',function(){setTimeout(function(){var s=document.createElement('script');"
          f"s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id={GA_ID}';document.head.appendChild(s);}},1500);}});</script>")

GALLERY_OLD = "main.src=b.getAttribute('data-src');"
GALLERY_NEW = ("var so=main.parentNode.tagName==='PICTURE'?main.parentNode.querySelector('source'):null;"
               "if(so){so.srcset=b.getAttribute('data-srcset')||'';}main.src=b.getAttribute('data-src');")


def has_webp(src):
    base = src[:-4]
    return all(os.path.exists(f"{base}-{w}.webp") for w in WIDTHS)


def srcset(src):
    base = src[:-4]
    return ", ".join(f"{base}-{w}.webp {w}w" for w in WIDTHS)


def photo_ok(src):
    return src.startswith("images/") and src.endswith(".jpg") and not src.startswith("images/fabrics/") and has_webp(src)


def kind_of(html, start, tag):
    """Work out where this photo sits on the page from the tags just before it."""
    if 'id="pmain"' in tag:
        return "main"
    before = html[max(0, start - 500):start]
    opens = re.findall(r'<(?:a|div|button|span|section|article)\b[^>]*class="([^"]*)"', before)
    cls = opens[-1] if opens else ""
    if cls == "cbadge":           # the "New" label sits just before the photo in a card
        cls = opens[-2] if len(opens) > 1 else ""
    if "pthumb" in cls:
        return "thumb"
    if cls.split()[:1] == ["card"] or "card" in cls.split():
        return "card"
    if "adpick__img" in cls:
        return "adpick"
    if "pimg" in cls:
        return "main"
    if "xcard__img" in cls:
        return "addon"
    return "article"


def wrap_photos(html):
    out, pos, n = [], 0, 0
    for m in re.finditer(r"<img\b[^>]*>", html):
        tag = m.group(0)
        s = re.search(r'\bsrc="([^"]+)"', tag)
        if not s or "${" in tag or 'id="heroImg"' in tag or not photo_ok(s.group(1)):
            continue
        before = html[max(0, m.start() - 600):m.start()]
        if before.rfind("<picture") > before.rfind("</picture>"):
            continue  # already done
        kind = kind_of(html, m.start(), tag)
        new_tag = tag
        if kind in FIRST_PHOTO and "fetchpriority" not in tag:
            new_tag = new_tag.replace("<img ", '<img fetchpriority="high" ', 1)
        pic = (f'<picture><source type="image/webp" srcset="{srcset(s.group(1))}" sizes="{SIZES[kind]}">'
               f"{new_tag}</picture>")
        out.append(html[pos:m.start()]); out.append(pic); pos = m.end(); n += 1
    out.append(html[pos:])
    return "".join(out), n


def gallery_srcsets(html):
    """Gallery buttons: tell the big photo which WebP copies to use for each thumbnail."""
    def add(m):
        b = m.group(0)
        if "data-srcset=" in b:
            return b
        d = re.search(r'data-src="([^"]+)"', b)
        if not d or not photo_ok(d.group(1)):
            return b
        return b.replace(d.group(0), d.group(0) + f' data-srcset="{srcset(d.group(1))}"', 1)
    return re.sub(r'<button\b[^>]*class="pthumb"[^>]*>', add, html)


def homepage(html):
    """index.html: the big top photo and the sofa cards built by JavaScript."""
    if "hero-480.webp" not in html and has_webp("images/hero.jpg"):
        html = html.replace(
            '<link rel="preload" href="images/hero.jpg" as="image" fetchpriority="high">',
            '<link rel="preload" as="image" type="image/webp" fetchpriority="high" '
            f'imagesrcset="{srcset("images/hero.jpg")}" imagesizes="(max-width:940px) calc(100vw - 44px), 100vw">', 1)
        html = re.sub(
            r'(<img class="hero-bg" id="heroImg"[^>]*>)',
            lambda m: f'<picture><source type="image/webp" srcset="{srcset("images/hero.jpg")}" '
                      f'sizes="(max-width:940px) calc(100vw - 44px), 100vw">{m.group(1)}</picture>', html, count=1)
    card_img = '<img class="pcard__img" src="${p.images[0]}"'
    if card_img in html and "wsrc(" not in html:
        html = html.replace(
            card_img,
            '${wsrc(p.images[0])?`<picture><source type="image/webp" srcset="${wsrc(p.images[0])}" '
            'sizes="(max-width:940px) 46vw, (max-width:1280px) 31vw, 290px">`:\'\'}' + card_img, 1)
        # close the <picture> after the card photo's <img ...> tag
        html = re.sub(r'(<img class="pcard__img" src="\$\{p\.images\[0\]\}"[^>]*>)',
                      lambda m: m.group(1) + "${wsrc(p.images[0])?'</picture>':''}", html, count=1)
        html = html.replace(
            "  function render(cat=\"all\"){",
            "  // Light WebP copies of each photo (made by make-webp.py)\n"
            "  const wsrc = s => (/^images\\/.+\\.jpg$/.test(s) && !s.startsWith('images/fabrics/'))\n"
            "    ? [480,800,1200].map(w => s.replace(/\\.jpg$/, '-'+w+'.webp')+' '+w+'w').join(', ') : '';\n"
            "  function render(cat=\"all\"){", 1)
    if "picture{display:contents}" not in html:
        html = html.replace("</style>", "  picture{display:contents}\n</style>", 1)
    return fabric_chips(html)


def fabric_chips(html):
    """Homepage fabric cards: each card showed one colour but downloaded the whole
    strip of 9-17 colours. Cut out just the colour that is shown (about 5 KB each)."""
    from PIL import Image
    pat = re.compile(r"background-image:url\((images/fabrics/([a-z-]+)\.jpg)\);"
                     r"background-size:(\d+)% auto;background-position:([\d.]+)% 50%")
    def cut(m):
        strip, name, size, pos = m.group(1), m.group(2), int(m.group(3)), float(m.group(4))
        n = round(size / 100)
        i = round(pos / 100 * (n - 1)) if n > 1 else 0
        os.makedirs("images/fabrics/chips", exist_ok=True)
        out = f"images/fabrics/chips/{name}-{i + 1}.jpg"
        if not os.path.exists(out):
            with Image.open(strip) as im:
                w = im.width / n
                im.convert("RGB").crop((round(i * w), 0, round((i + 1) * w), im.height)).save(
                    out, "JPEG", quality=82, optimize=True, progressive=True)
        return f"background-image:url({out});background-size:cover;background-position:center"
    return pat.sub(cut, html)


changed_any = 0
for path in sorted(glob.glob("*.html")):
    if path.startswith("google"):
        continue
    html = open(path, encoding="utf-8").read()
    orig = html
    notes = []
    if GA_OLD in html:
        html = html.replace(GA_OLD, GA_NEW, 1); notes.append("analytics loads after the page")
    if path == "index.html":
        html = homepage(html)
    html, n = wrap_photos(html)
    if n:
        notes.append(f"{n} photos made lighter")
    html2 = gallery_srcsets(html)
    if GALLERY_OLD in html2 and "so.srcset" not in html2:
        html2 = html2.replace(GALLERY_OLD, GALLERY_NEW, 1)
    if html2 != html:
        notes.append("gallery updated"); html = html2
    if html != orig:
        open(path, "w", encoding="utf-8").write(html)
        changed_any += 1
        print(f"{path}: " + ", ".join(notes or ["updated"]))

css = open("barki.css", encoding="utf-8").read()
if "picture{display:contents}" not in css:
    open("barki.css", "a", encoding="utf-8").write(
        "\n/* light WebP photos sit inside <picture>; let the photo keep its normal layout */\npicture{display:contents}\n")
    print("barki.css: added picture rule")
print(f"Done. {changed_any} pages changed.")
