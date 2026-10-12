# Procedural smoke: domain-warped fBm value noise, tinted per tile.
import numpy as np, sys
from PIL import Image
W, H = 800, 450

def octave(rng, gx, gy):
    g = rng.random((gy, gx)).astype(np.float32)
    im = Image.fromarray((g * 255).astype(np.uint8)).resize((W, H), Image.BICUBIC)
    return np.asarray(im, np.float32) / 255

def fbm(rng, base=3, n=6):
    out = np.zeros((H, W), np.float32); amp = 1; tot = 0
    for i in range(n):
        f = base * 2 ** i
        out += amp * octave(rng, int(f * W / H) + 2, f + 2); tot += amp; amp *= .5
    return out / tot

def sample(img, x, y):
    x = np.clip(x, 0, W - 1.001); y = np.clip(y, 0, H - 1.001)
    x0 = x.astype(int); y0 = y.astype(int); fx = x - x0; fy = y - y0
    a = img[y0, x0]; b = img[y0, x0 + 1]; c = img[y0 + 1, x0]; d = img[y0 + 1, x0 + 1]
    return (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy

def smoke(seed, dark, mid, light, glow_xy=(.5, .5), out='s.jpg'):
    rng = np.random.default_rng(seed)
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    q1, q2 = fbm(rng), fbm(rng)
    base = fbm(rng, base=2, n=7)
    # two rounds of warping give the curling, wispy smoke shapes
    w1 = sample(base, xx + (q1 - .5) * 260, yy + (q2 - .5) * 200)
    r1, r2 = fbm(rng), fbm(rng)
    v = sample(w1, xx + (r1 - .5) * 140, yy + (r2 - .5) * 110)
    v = (v - v.min()) / (v.max() - v.min())
    # soft light behind the icon
    gx, gy = glow_xy
    d = np.sqrt(((xx / W - gx) * 1.6) ** 2 + ((yy / H - gy)) ** 2)
    glow = np.exp(-(d / .38) ** 2)
    fine = fbm(rng, base=8, n=4)                      # grain inside the smoke
    body = np.clip((v - .3) / .55, 0, 1) ** 1.6 * (.7 + .6 * fine)
    # thin glowing filaments where the smoke folds, like light catching the edges
    edge = np.exp(-((v - .58) / .035) ** 2) + .6 * np.exp(-((v - .72) / .025) ** 2)
    lit = np.clip(body * (.32 + .45 * glow) + edge * (.18 + .75 * glow) * (.6 + .8 * fine), 0, 1)
    dark, mid, light = (np.array(c, np.float32) / 255 for c in (dark, mid, light))
    t = lit[..., None]
    col = np.where(t < .55, dark + (mid - dark) * (t / .55), mid + (light - mid) * ((t - .55) / .45))
    vig = 1 - .55 * np.clip(np.sqrt(((xx / W - .5) * 1.2) ** 2 + ((yy / H - .5) * 1.1) ** 2) / .75, 0, 1) ** 2
    col = np.clip(col * vig[..., None], 0, 1)
    Image.fromarray((col * 255).astype(np.uint8)).save(out, quality=80, optimize=True, progressive=True)

if __name__ == '__main__':
    o = sys.argv[1]
    smoke(11, (7, 6, 16), (46, 30, 78), (205, 180, 255), out=f'{o}/about.jpg')     # violet smoke
    smoke(23, (8, 5, 10), (70, 22, 34), (255, 150, 165), out=f'{o}/favorites.jpg') # crimson smoke
    smoke(37, (5, 8, 16), (28, 44, 82), (190, 220, 255), out=f'{o}/lab.jpg')       # icy blue smoke
