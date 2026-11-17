# Adds the site's CRT screen look (fine scanlines + soft dark corners) to a
# share image, so links on Threads, iMessage etc. look like the site.
# Usage: python3 tools/og-crt.py img/blog/<slug>-og.jpg img/blog/<slug>-og.jpg
# (input then output, pairs can repeat). Run once per image, after exporting
# it from tools/blog-cover.html, and bump the ?v= on its links.
import sys
from PIL import Image
import numpy as np
def crt(im):
    im=im.convert('RGB'); w,h=im.size
    a=np.asarray(im).astype(np.float32)
    rows=np.where(np.arange(h)%4==0,0.8,np.where(np.arange(h)%4==1,0.94,1.04)).astype(np.float32)
    a*=rows[:,None,None]
    yy,xx=np.mgrid[0:h,0:w]; nx=(xx-w/2)/(w/2); ny=(yy-h/2)/(h/2)
    d=np.sqrt(nx**2+ny**2)/np.sqrt(2)
    v=np.clip(1-0.5*np.clip((d-0.6)/0.4,0,1)**1.6,0,1)
    a*=v[:,:,None]
    return Image.fromarray(np.clip(a,0,255).astype(np.uint8))
if __name__=='__main__':
    for src,dst in zip(sys.argv[1::2],sys.argv[2::2]):
        crt(Image.open(src)).save(dst,'JPEG',quality=86,optimize=True,progressive=True)
