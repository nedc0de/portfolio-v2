# Logo base: write img/full-logo.svg, the sign behind the neon letters (panel,
# window dots, unlit grey letters, cables) as crisp vectors, replacing the
# 1125x450 bitmap. Uses hd/glyphs.json from logo-glyphs.py. Usage:
#   python3 logo-base.py <scripts.js> <out.svg>
# Panel sizes and colours were measured on the original artwork; the cables
# reuse the traced paths in scripts.js, smoothed the same way. Shadows are
# separate filtered copies under unfiltered shapes, so Safari keeps them sharp.
import json, re, sys
G = json.load(open('hd/glyphs.json'))['700']['g']
BOX = [('N', 270, 209, 356, 306, '#323232'), ('E', 375, 209, 434, 306, '#323232'),
       ('D', 448, 209, 534, 306, '#282828'), ('C', 561, 208, 655, 307, '#282828'),
       ('O', 666, 208, 765, 307, '#323232'), ('D', 781, 209, 867, 306, '#282828'),
       ('E', 880, 209, 939, 306, '#282828')]
s = (306 - 209) / 702

def letter(ch, x0, y0, x1, y1):
    xmin, ymin, xmax, ymax = G[ch]['bounds']
    tx = (x0 + x1) / 2 - (xmin + xmax) / 2 * s
    ty = (y0 + y1) / 2 + (ymin + ymax) / 2 * s
    return f'transform="translate({tx:.2f} {ty:.2f}) scale({s:.6f} {-s:.6f})" d="{G[ch]["d"]}"'

def smooth(d):  # same as smooth() in scripts.js
    n = list(map(float, d[1:].split()))
    pts = []
    for i in range(0, len(n), 2):
        if not pts or pts[-1] != [n[i], n[i + 1]]: pts.append([n[i], n[i + 1]])
    pts = [p if i < 2 or i > len(pts) - 3 else
           [sum(q[0] for q in pts[i-2:i+3]) / 5, sum(q[1] for q in pts[i-2:i+3]) / 5]
           for i, p in enumerate(pts)]
    out = f'M{pts[0][0]:g} {pts[0][1]:g}'
    for i in range(len(pts) - 1):
        p0 = pts[i-1] if i else pts[i]; p1, p2 = pts[i], pts[i+1]
        p3 = pts[i+2] if i + 2 < len(pts) else p2
        out += (f' C{p1[0] + (p2[0]-p0[0])/6:.1f} {p1[1] + (p2[1]-p0[1])/6:.1f}'
                f' {p2[0] - (p3[0]-p1[0])/6:.1f} {p2[1] - (p3[1]-p1[1])/6:.1f} {p2[0]:.1f} {p2[1]:.1f}')
    return out

js = open(sys.argv[1]).read()
cables = re.findall(r"'(M\d[\d ]+)'", js.split('const CABLES')[1].split('];')[0])
# where a cable meets the panel's edge (y 161 top, 355 bottom), drop the one or
# two traced points lying on the edge and add a smooth curve that carries the
# cable on in its own direction and dives in behind the panel
def ends(c):
    n = list(map(int, c[1:].split())); pts = [n[i:i + 2] for i in range(0, len(n), 2)]
    def edge(p): return next((e for e in (161, 355) if abs(p[1] - e) < 4), None)
    head = edge(pts[0]); tail = edge(pts[-1])
    if head == tail == 161:  # the little loop on top: a clean, even arch
        return f'M{pts[-1][0] - 1} 172 C{pts[-1][0] - 1} 144 {pts[0][0] + 1} 144 {pts[0][0] + 1} 172'
    while edge(pts[0]): pts = pts[1:]
    while edge(pts[-1]): pts = pts[:-1]
    d = smooth('M' + ' '.join(f'{x} {y}' for x, y in pts))
    def dive(p, q, e):  # from point p, heading away from q, into the panel past edge e
        dx, dy = p[0] - q[0], p[1] - q[1]; k = 6 / max((dx * dx + dy * dy) ** .5, 1)
        inner = e + 12 if e == 161 else e - 12; x = p[0] + max(-6, min(6, dx * k * 1.5))
        return (p[0] + dx * k, p[1] + dy * k), (x, e + (-3 if e == 161 else 3)), (x, inner)
    if tail:
        c1, c2, z = dive(pts[-1], pts[-3], tail)
        d += f' C{c1[0]:.1f} {c1[1]:.1f} {c2[0]:.1f} {c2[1]:.1f} {z[0]:.1f} {z[1]:.1f}'
    if head:
        c1, c2, z = dive(pts[0], pts[2], head)
        d = f'M{z[0]:.1f} {z[1]:.1f} C{c2[0]:.1f} {c2[1]:.1f} {c1[0]:.1f} {c1[1]:.1f} ' + d[1:]
    return d
letters = ''.join(f'<path fill="{c}" {letter(ch, *b)}/>' for ch, *b, c in BOX)
wires = ''.join(f'<path d="{ends(c)}"/>' for c in cables)
# cables are drawn behind the panel, then again (clipped to the panel's lower
# part) in front where they cross it to plug into the N and the O
cablegroup = (f'<g fill="none" stroke-linecap="round"><g stroke="#000" stroke-opacity=".4" stroke-width="7" transform="translate(2 3)" filter="url(#bl)">{wires}</g>'
              f'<g stroke="#2f2f2f" stroke-width="7">{wires}</g><g stroke="#3b3b3b" stroke-width="1.2" transform="translate(-1.4 -1.4)">{wires}</g></g>')
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1125 450" width="1125" height="450">
<defs>
<filter id="sh" x="-5%" y="-10%" width="115%" height="130%" color-interpolation-filters="sRGB"><feFlood flood-color="#000" flood-opacity=".45"/><feComposite in2="SourceAlpha" operator="in"/><feGaussianBlur stdDeviation="4"/><feOffset dx="4" dy="6"/></filter>
<filter id="bl" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="2"/></filter>
<clipPath id="front"><rect x="200" y="200" width="680" height="165"/></clipPath>
<clipPath id="in"><rect x="205" y="162" width="787" height="190"/></clipPath>
</defs>
{cablegroup}
<rect x="203.25" y="161" width="790.5" height="192.75" rx="4" fill="#242424" stroke="#363636" stroke-width="2.5"/>
<g clip-path="url(#in)"><rect x="205" y="162" width="787" height="13" fill="#1e1e1e"/><rect x="205" y="349" width="787" height="3" fill="#1e1e1e"/>
<g filter="url(#sh)">{letters}</g>{letters}</g>
<circle cx="213.5" cy="169" r="3" fill="#b00c0f"/><circle cx="222" cy="169" r="3" fill="#ff5400"/><circle cx="229.5" cy="169" r="3" fill="#00bf48"/>
<rect x="977.5" y="165" width="7.5" height="7.5" rx="1" fill="#363636"/>
<g clip-path="url(#front)">{cablegroup}</g>

</svg>
'''
open(sys.argv[2], 'w').write(svg)
print('ok', len(cables), 'cables')
