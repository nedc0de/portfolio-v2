# Logo letters, step 2: write the seven neon letter SVGs (img/logo-ned-*.svg,
# img/logo-code-*.svg) from hd/glyphs.json. Usage:
#   python3 logo-letters.py '#ff7632' '#ff5400' <out dir>     (core colour, glow colour)
# Letters sit exactly where the original artwork had them, so they line up with
# the sign in img/full-logo.webp; the glow is a live SVG blur, sharp at any zoom.
# Build crisp SVG versions of the logo's neon letters: exact Poppins Bold
# outlines placed on the original letters, with the glow as an SVG filter.
import json, sys
G = json.load(open('hd/glyphs.json'))['700']
# letter core boxes measured on the original 1125x450 artwork (x0, y0, x1, y1)
BOX = {'logo-ned-n': ('N', 270, 209, 356, 306), 'logo-ned-e': ('E', 375, 209, 434, 306),
       'logo-ned-d': ('D', 448, 209, 534, 306), 'logo-code-c': ('C', 561, 208, 655, 307),
       'logo-code-o': ('O', 666, 208, 765, 307), 'logo-code-d': ('D', 781, 209, 867, 306),
       'logo-code-e': ('E', 880, 209, 939, 306)}
CAP = 702  # Poppins Bold cap height in font units (N, E, D bounds)
CORE, GLOW = sys.argv[1], sys.argv[2]
out = sys.argv[3]
for name, (ch, x0, y0, x1, y1) in BOX.items():
    g = G['g'][ch]; xmin, ymin, xmax, ymax = g['bounds']
    s = (306 - 209) / CAP  # same scale for every letter
    # centre the glyph on the measured box (handles C/O overshoot)
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    tx = cx - (xmin + xmax) / 2 * s
    ty = cy + (ymin + ymax) / 2 * s  # y is flipped
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1125 450" width="1125" height="450">
<defs><filter id="g" filterUnits="userSpaceOnUse" x="0" y="0" width="1125" height="450" color-interpolation-filters="sRGB">
<feFlood flood-color="{GLOW}"/><feComposite in2="SourceAlpha" operator="in" result="c"/>
<feGaussianBlur in="c" stdDeviation="5" result="b1"/><feGaussianBlur in="c" stdDeviation="16" result="b2"/>
<feComponentTransfer in="b1" result="b1o"><feFuncA type="linear" slope=".75"/></feComponentTransfer>
<feComponentTransfer in="b2" result="b2o"><feFuncA type="linear" slope=".55"/></feComponentTransfer>
<feMerge><feMergeNode in="b2o"/><feMergeNode in="b1o"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
<g filter="url(#g)"><path fill="{CORE}" transform="translate({tx:.2f} {ty:.2f}) scale({s:.6f} {-s:.6f})" d="{g['d']}"/></g>
</svg>
'''
    open(f'{out}/{name}.svg', 'w').write(svg)
print('ok')
