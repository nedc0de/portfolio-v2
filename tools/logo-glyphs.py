# Logo letters, step 1: read Poppins Bold outlines (N, E, D, C, O) into hd/glyphs.json.
# Needs fontTools (pip install fonttools) and the Poppins .woff files from the
# @fontsource/poppins npm package unpacked to fonts/package/. Run from a scratch folder.
# Glyph outlines from Poppins as SVG path data, plus metrics.
import sys, json
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
out = {}
for w in ['600', '700', '800']:
    f = TTFont(f'fonts/package/files/poppins-latin-{w}-normal.woff')
    gs = f.getGlyphSet(); cmap = f.getBestCmap(); upm = f['head'].unitsPerEm
    out[w] = {'upm': upm, 'g': {}}
    for ch in 'NEDCO':
        name = cmap[ord(ch)]
        p = SVGPathPen(gs); gs[name].draw(p)
        b = BoundsPen(gs); gs[name].draw(b)
        out[w]['g'][ch] = {'d': p.getCommands(), 'bounds': b.bounds, 'adv': gs[name].width}
json.dump(out, open('hd/glyphs.json', 'w'))
print({w: {c: [round(x) for x in v['bounds']] for c, v in out[w]['g'].items()} for w in out})
