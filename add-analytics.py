#!/usr/bin/env python3
"""Barki Sofa Hub - make sure every page has Google Analytics + click tracking.

Run this from the website folder after adding or editing any page:
    python3 add-analytics.py

It is safe to run again and again: pages that are already correct are left alone.
Google-verification files (google*.html) are skipped.
"""
import glob, os, sys

GA_ID = "G-9FS7L9SGWF"
GA_MARKER = "googletagmanager.com/gtag/js"
TRACK_TAG = '<script src="barki-track.js" defer></script>'
GA_BLOCK = f"""<!-- Google Analytics with UK consent mode -->
<script async src="https://www.googletagmanager.com/gtag/js?id={GA_ID}"></script>
<script>
window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}
gtag('consent','default',{{'ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','analytics_storage':'denied'}});
try{{if(localStorage.getItem('bsh_consent')==='granted'){{gtag('consent','update',{{'analytics_storage':'granted'}});}}}}catch(e){{}}
gtag('js',new Date());
gtag('config','{GA_ID}',{{'anonymize_ip':true}});
</script>
"""

os.chdir(os.path.dirname(os.path.abspath(__file__)))
for path in sorted(glob.glob("*.html")):
    if path.startswith("google"):
        continue
    html = open(path, encoding="utf-8").read()
    changed = []
    if "</head>" not in html:
        print(f"SKIPPED {path}: no </head> found"); continue
    if GA_MARKER not in html:
        html = html.replace("</head>", GA_BLOCK + "</head>", 1); changed.append("added Google Analytics")
    if "barki-track.js" not in html:
        html = html.replace("</head>", TRACK_TAG + "\n</head>", 1); changed.append("added click tracking")
    if "id=\"cookiebar\"" not in html:
        print(f"WARNING {path}: has no cookie banner - copy the cookiebar block from index.html")
    if changed:
        open(path, "w", encoding="utf-8").write(html)
        print(f"{path}: " + ", ".join(changed))
print("Done.")
