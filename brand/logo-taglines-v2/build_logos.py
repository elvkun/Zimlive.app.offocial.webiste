from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from xml.sax.saxutils import escape
import ctypes as C
import json
ROOT=Path(__file__).resolve().parent
font=TTFont('/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf'); gs=font.getGlyphSet(); cmap=font.getBestCmap(); units=font['head'].unitsPerEm

def text(s,x,y,size,color,spacing=0):
 parts=[]; advance=0
 for c in s:
  n=cmap[ord(c)]; pen=SVGPathPen(gs); gs[n].draw(pen)
  parts.append(f'<path transform="translate({advance:.3f},0)" d="{pen.getCommands()}"/>')
  advance+=font['hmtx'].metrics[n][0]+spacing*units/size
 return f'<g fill="{color}" transform="translate({x},{y}) scale({size/units},-{size/units})">'+''.join(parts)+'</g>',advance*size/units

r=C.CDLL('librsvg-2.so.2'); ca=C.CDLL('libcairo.so.2'); go=C.CDLL('libgobject-2.0.so.0')
r.rsvg_handle_new_from_file.argtypes=[C.c_char_p,C.c_void_p];r.rsvg_handle_new_from_file.restype=C.c_void_p
r.rsvg_handle_render_cairo.argtypes=[C.c_void_p,C.c_void_p];r.rsvg_handle_render_cairo.restype=C.c_int
ca.cairo_image_surface_create.argtypes=[C.c_int,C.c_int,C.c_int];ca.cairo_image_surface_create.restype=C.c_void_p
ca.cairo_create.argtypes=[C.c_void_p];ca.cairo_create.restype=C.c_void_p
ca.cairo_scale.argtypes=[C.c_void_p,C.c_double,C.c_double]
ca.cairo_surface_write_to_png.argtypes=[C.c_void_p,C.c_char_p];ca.cairo_surface_write_to_png.restype=C.c_int
ca.cairo_destroy.argtypes=[C.c_void_p];ca.cairo_surface_destroy.argtypes=[C.c_void_p];go.g_object_unref.argtypes=[C.c_void_p]

def render(p,w,h):
 scale=2; surface=ca.cairo_image_surface_create(0,int(w*scale),int(h*scale)); ctx=ca.cairo_create(surface);ca.cairo_scale(ctx,scale,scale)
 handle=r.rsvg_handle_new_from_file(str(p).encode(),None);assert handle
 assert r.rsvg_handle_render_cairo(handle,ctx)
 assert ca.cairo_surface_write_to_png(surface,str(p.with_suffix('.png')).encode())==0
 go.g_object_unref(handle);ca.cairo_destroy(ctx);ca.cairo_surface_destroy(surface)

brands=[('flow','Flow','IDEAS IN MOTION','F'),('oriley-foundation','O’Riley Foundation','PRODUCTS WITH PURPOSE','O'),('oriley-platforms','O’Riley Platforms','PRODUCTS WITH PURPOSE','O')]
manifest=[]; cards=[]
for key,name,tag,letter in brands:
 folder=ROOT/key;folder.mkdir(exist_ok=True)
 for variant in ['horizontal','horizontal-reversed','stacked']:
  reversed=variant.endswith('reversed'); fg='#FFFFFF' if reversed else '#0B3B2F'; muted='#BDEBD6' if reversed else '#414945'; tile='#6CF8BB' if reversed else '#0B3B2F'; lettercolor='#0B3B2F' if reversed else '#FFFFFF'
  _,nw=text(name,0,0,76,fg);_,tw=text(tag,0,0,20,muted,3)
  if variant=='stacked':
   w=max(nw,tw,260)+120;h=430; tx=(w-nw)/2;ty=292;gx=(w-tw)/2;gy=343;mx=(w-144)/2;my=32
  else:
   w=max(nw,tw)+272;h=240;tx=232;ty=115;gx=234;gy=163;mx=40;my=40
  mark=f'<rect x="{mx}" y="{my}" width="144" height="144" rx="44" fill="{tile}"/>'
  _,lw=text(letter,0,0,94,lettercolor)
  mark+=text(letter,mx+(144-lw)/2,my+106,94,lettercolor)[0]
  body=mark+text(name,tx,ty,76,fg)[0]+text(tag,gx,gy,20,muted,3)[0]
  title=f'{name} — {tag}'
  svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="{w:.0f}" height="{h}" viewBox="0 0 {w:.0f} {h}" role="img" aria-label="{escape(title)}"><title>{escape(title)}</title><desc>Website-aligned logo with outlined name and tagline. All visible elements are vector paths and shapes.</desc>{body}</svg>\n'
  p=folder/f'{key}-{variant}-tagline-v2.svg';p.write_text(svg);render(p,round(w),h)
  manifest.append({'file':str(p.relative_to(ROOT)),'name':name,'tagline':tag,'variant':variant,'png_size':[round(w)*2,h*2]})
  bg='dark' if reversed else 'light';cards.append(f'<figure class="{bg}"><img src="{p.relative_to(ROOT)}" alt="{escape(title)}"><figcaption>{name} · {variant}</figcaption></figure>')
(ROOT/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
(ROOT/'preview.html').write_text('<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Website-aligned logos with taglines</title><style>body{font-family:system-ui;background:#e6fbf2;color:#0b3b2f;margin:32px}main{max-width:1150px;margin:auto}figure{padding:24px;border-radius:20px;margin:24px 0}.light{background:white}.dark{background:#0b3b2f;color:white}img{display:block;width:100%;max-height:330px}figcaption{font-size:13px;margin:15px}</style><main><h1>Flow and O’Riley · Tagline logos v2</h1><p>Exact website header taglines. O’Riley Foundation matches the website; O’Riley Platforms is the requested alternate name.</p>'+''.join(cards)+'</main></html>')
print('Created',len(manifest),'fully vector SVG logos and matching transparent PNGs in',ROOT)
