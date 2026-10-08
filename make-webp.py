#!/usr/bin/env python3
"""Barki Sofa Hub - make light WebP copies of every sofa photo.

For each photo images/<folder>/<name>.jpg this writes, next to it:
    <name>-480.webp   (phones, small cards)
    <name>-800.webp   (most phones, tablets)
    <name>-1200.webp  (large screens and sharp phone screens)
The original .jpg is kept and still used by very old browsers.
Fabric swatch strips (images/fabrics/) are skipped: they are used differently.

Run it from the website folder after adding new photos:
    python3 make-webp.py
It only makes the copies that are missing, so it is safe to run again.
Needs Pillow:  pip install pillow
"""
import glob, os, sys
from PIL import Image

WIDTHS = (480, 800, 1200)
QUALITY = 80

root = os.path.dirname(os.path.abspath(__file__)) if len(sys.argv) < 2 else sys.argv[1]
os.chdir(root)
made = 0
for path in sorted(glob.glob("images/**/*.jpg", recursive=True)):
    if path.startswith("images/fabrics/"):
        continue
    base = path[:-4]
    todo = [w for w in WIDTHS if not os.path.exists(f"{base}-{w}.webp")]
    if not todo:
        continue
    with Image.open(path) as im:
        im = im.convert("RGB")
        for w in todo:
            target = min(w, im.width)  # never make a photo bigger than the original
            h = round(im.height * target / im.width)
            out = im if target == im.width else im.resize((target, h), Image.LANCZOS)
            out.save(f"{base}-{w}.webp", "WEBP", quality=QUALITY, method=6)
            made += 1
print(f"Made {made} WebP files.")
