# Explore tile backgrounds: original comic-panel collages in a sunset
# "Los Santos poster" mood. Flat vector scenes split by thick black slanted
# gutters. Writes img/explore/{about,favorites,lab}.svg (viewBox 160x90; the
# phone thumbnail crops the middle 4:3).
import sys

# panel shapes: left slab, top right, bottom right (shared slanted edges)
A = "0,0 64,0 50,90 0,90"
B = "64,0 160,0 160,50 57.2,44"
C = "57.2,44 160,50 160,90 50,90"
GUTTER = '<g fill="none" stroke="#0b0b0b" stroke-width="3.2" stroke-linejoin="round"><polygon points="{A}"/><polygon points="{B}"/><polygon points="{C}"/></g>'

def grad(id, stops, vertical=True):
    xy = 'x1="0" y1="0" x2="0" y2="1"' if vertical else 'x1="0" y1="0" x2="1" y2="0"'
    s = ''.join(f'<stop offset="{o}" stop-color="{c}"/>' for o, c in stops)
    return f'<linearGradient id="{id}" {xy}>{s}</linearGradient>'

def palm(x, y, s=1, c="#1a0f24"):
    # trunk + six fronds, drawn at (x, y) = base of the trunk
    return (f'<g transform="translate({x} {y}) scale({s})" fill="{c}">'
            '<path d="M-1.2 0 C0 -10 2 -20 5 -28 L6.6 -27.6 C4 -19 2.4 -10 1.4 0 Z"/>'
            '<path d="M5.8 -28 C0 -31 -6 -30 -11 -25 C-5 -28 0 -28 5.8 -27Z"/>'
            '<path d="M5.8 -28 C2 -34 -3 -36 -8 -36 C-2 -34 2 -32 5.6 -27Z"/>'
            '<path d="M5.8 -28 C9 -35 14 -37 19 -36 C14 -34 10 -32 6.4 -27Z"/>'
            '<path d="M5.8 -28 C12 -30 17 -27 20 -21 C15 -26 11 -27 6.2 -27Z"/>'
            '<path d="M5.8 -28 C5 -22 2 -18 -2 -15 C2 -20 4 -24 5.4 -28Z"/>'
            '<path d="M6 -28 C9 -23 10 -18 9 -13 C8 -18 7 -23 5.8 -27Z"/>'
            '</g>')

def skyline(y, c, seed=1, x0=40):
    import random
    r = random.Random(seed); x = x0; out = []
    while x < 165:
        w = r.choice([6, 7, 8, 10]); h = r.choice([10, 14, 18, 22, 26, 30])
        out.append(f'<rect x="{x}" y="{y-h}" width="{w}" height="{h+20}"/>')
        if r.random() < .3: out.append(f'<rect x="{x+w/2-.5}" y="{y-h-5}" width="1" height="5"/>')
        x += w + r.choice([0, 1, 2])
    return f'<g fill="{c}">' + ''.join(out) + '</g>'

def windows(y, seed=2):
    import random
    r = random.Random(seed); out = []
    for i in range(60):
        out.append(f'<rect x="{r.uniform(60,160):.1f}" y="{r.uniform(y-28,y):.1f}" width="1.4" height="1.6"/>')
    return '<g fill="#ffd36b" opacity=".9">' + ''.join(out) + '</g>'

def sun(cx, cy, r, c1, c2):
    bands = ''.join(f'<rect x="{cx-r}" y="{cy+r*k/6:.1f}" width="{2*r}" height="{r*.07*(k+1):.1f}" fill="{c2}"/>' for k in range(1, 6))
    return f'<g clip-path="url(#sunclip)"><circle cx="{cx}" cy="{cy}" r="{r}" fill="{c1}"/>{bands}</g><clipPath id="sunclip"><circle cx="{cx}" cy="{cy}" r="{r}"/></clipPath>'

def waves(y0, c="#ffffff"):
    return ''.join(f'<path d="M50 {y0+i*7} q6 -2 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0" fill="none" stroke="{c}" stroke-opacity=".55" stroke-width="1"/>' for i in range(5))

def rays(cx, cy, c, n=10):
    import math
    out = []
    for i in range(n):
        a1 = i * 2 * math.pi / n; a2 = a1 + math.pi / n
        out.append(f'<polygon points="{cx},{cy} {cx+200*math.cos(a1):.1f},{cy+200*math.sin(a1):.1f} {cx+200*math.cos(a2):.1f},{cy+200*math.sin(a2):.1f}"/>')
    return f'<g fill="{c}">' + ''.join(out) + '</g>'

def svg(defs, a, b, c):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice">'
            f'<defs>{defs}<clipPath id="pa"><polygon points="{A}"/></clipPath><clipPath id="pb"><polygon points="{B}"/></clipPath><clipPath id="pc"><polygon points="{C}"/></clipPath></defs>'
            f'<rect width="160" height="90" fill="#0b0b0b"/>'
            f'<g clip-path="url(#pa)">{a}</g><g clip-path="url(#pb)">{b}</g><g clip-path="url(#pc)">{c}</g>'
            + GUTTER.format(A=A, B=B, C=C) + '</svg>')

def about():
    defs = grad('sky', [(0, '#ff8a3d'), (.55, '#ff4f7b'), (1, '#6a2c91')]) + grad('dusk', [(0, '#3a1d6e'), (1, '#ff7a45')]) + grad('sea', [(0, '#2ec4c4'), (1, '#135e7a')])
    a = '<rect width="160" height="90" fill="url(#sky)"/>' + sun(26, 52, 17, '#ffd36b', '#ff4f7b') + palm(14, 92, 1.5) + palm(44, 96, 1.1)
    b = '<rect width="160" height="90" fill="url(#dusk)"/>' + skyline(46, '#24123d', 3)
    c = '<rect width="160" height="90" fill="url(#sea)"/>' + waves(58)
    return svg(defs, a, b, c)

def favorites():
    defs = grad('night', [(0, '#1d1446'), (1, '#7a2d8f')]) + grad('pink', [(0, '#ffb067'), (1, '#ff3f7f')]) + grad('teal', [(0, '#7be0c3'), (1, '#1d7f8c')])
    stars = ''.join(f'<circle cx="{x}" cy="{y}" r=".7" fill="#fff" opacity=".8"/>' for x, y in [(8,10),(20,22),(34,8),(12,40),(40,30),(26,54),(6,70),(44,62)])
    beams = '<g fill="#fff" opacity=".18"><polygon points="20,90 30,90 60,0 48,0"/><polygon points="34,90 42,90 10,0 0,0"/></g>'
    a = '<rect width="160" height="90" fill="url(#night)"/>' + stars + beams
    b = '<rect width="160" height="90" fill="url(#pink)"/>' + rays(118, 40, '#ffffff22') + sun(118, 40, 13, '#fff1b8', '#ff7a5c')
    c = '<rect width="160" height="90" fill="url(#teal)"/>' + palm(80, 96, 1.3, '#0f3b44') + palm(128, 98, 1.6, '#0f3b44') + palm(150, 94, 1, '#0f3b44')
    return svg(defs, a, b, c)

def lab():
    defs = grad('city', [(0, '#0d1b3d'), (1, '#2b4a9a')]) + grad('neon', [(0, '#ff3fa4'), (1, '#4a1b7a')]) + grad('dawn', [(0, '#ffcf5c'), (1, '#ff6a3d')])
    grid = ''.join(f'<line x1="{x}" y1="0" x2="{x}" y2="90" stroke="#ffffff" stroke-opacity=".2" stroke-width=".6"/>' for x in range(56, 160, 8)) + \
           ''.join(f'<line x1="50" y1="{y}" x2="160" y2="{y}" stroke="#ffffff" stroke-opacity=".2" stroke-width=".6"/>' for y in range(4, 50, 8))
    a = '<rect width="160" height="90" fill="url(#city)"/>' + skyline(92, '#081129', 7, x0=-4) + '<g fill="#ffd36b">' + ''.join(f'<rect x="{x}" y="{y}" width="1.4" height="1.6"/>' for x, y in [(4,70),(8,64),(12,78),(18,60),(22,72),(28,66),(32,80),(38,58),(42,74),(46,68),(6,84),(26,84)]) + '</g>'
    b = '<rect width="160" height="90" fill="url(#neon)"/>' + grid
    c = '<rect width="160" height="90" fill="url(#dawn)"/>' + '<polygon points="50,90 80,62 98,76 120,56 160,80 160,90" fill="#7a2442"/><polygon points="50,90 70,78 92,86 112,72 140,88 160,84 160,90" fill="#3e1230"/>'
    return svg(defs, a, b, c)

if __name__ == '__main__':
    o = sys.argv[1]
    for name, fn in [('about', about), ('favorites', favorites), ('lab', lab)]:
        open(f'{o}/{name}.svg', 'w').write(fn())
