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

brands=[('flow','Flow','IDEAS IN MOTION','F'),('oriley-foundation','O’Riley Foundation','PRODUCTS WITH PURPOSE','O')]
manifest=[];cards=[]
for key,name,tag,letter in brands:
 folder=ROOT/key;folder.mkdir(exist_ok=True)
 for variant in ['horizontal','horizontal-reversed','stacked','profile-1024','profile-512','social-cover']:
  rev=variant=='horizontal-reversed';fg='#FFFFFF' if rev else '#0B3B2F';muted='#D9E8E2' if rev else '#414945'
  def mark(x,y,size):
   _,lw=text(letter,0,0,size*.60,'#FFFFFF')
   return f'<rect x="{x}" y="{y}" width="{size}" height="{size}" rx="{size*.28}" fill="#0B3B2F"/>'+text(letter,x+(size-lw)/2,y+size*.715,size*.60,'#FFFFFF')[0]
  _,nw=text(name,0,0,48,fg);_,tw=text(tag,0,0,14,muted,1.7)
  if variant.startswith('profile'):
   w=h=int(variant.split('-')[1]);size=w*.64;body=mark((w-size)/2,(h-size)/2,size)
  elif variant=='stacked':
   w=h=1080;body=mark(468,280,144)
   _,nw=text(name,0,0,56,fg);_,tw=text(tag,0,0,20,muted,2.4)
   body+=text(name,(w-nw)/2,540,56,fg)[0]+text(tag,(w-tw)/2,600,20,muted,2.4)[0]
  else:
   blockwidth=max(nw,tw)+158
   w,h=(1600,900) if variant=='social-cover' else (round(blockwidth+80),180)
   ox=(w-blockwidth)/2;oy=(h-100)/2
   body=mark(ox,oy,100)+text(name,ox+138,oy+47,48,fg)[0]+text(tag,ox+139,oy+80,14,muted,1.7)[0]
   if rev:
    # White tile on a dark background; calm colors rather than a bright accent.
    body=body.replace('fill="#0B3B2F"','fill="#FFFFFF"',1)
    body=body.replace('<g fill="#FFFFFF"','<g fill="#0B3B2F"',1)
   if variant=='social-cover':body='<rect width="1600" height="900" fill="#F7FAF8"/>'+body
  title=f'{letter} — {name} — {tag}' if not variant.startswith('profile') else f'{name} profile symbol — {letter}'
  svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-label="{escape(title)}"><title>{escape(title)}</title><desc>Native vector paths. Profile symbols intentionally omit wording for small circular crops; full logos include exact approved wording.</desc>{body}</svg>\n'
  p=folder/f'{key}-{variant}.svg';p.write_text(svg)
  # Existing renderer exports at 2x; profile filenames promise exact pixel sizes.
  if variant.startswith('profile'):
   surface=ca.cairo_image_surface_create(0,w,h);ctx=ca.cairo_create(surface);handle=r.rsvg_handle_new_from_file(str(p).encode(),None)
   assert handle and r.rsvg_handle_render_cairo(handle,ctx)
   assert ca.cairo_surface_write_to_png(surface,str(p.with_suffix('.png')).encode())==0
   go.g_object_unref(handle);ca.cairo_destroy(ctx);ca.cairo_surface_destroy(surface)
   dims=[w,h]
  else:render(p,w,h);dims=[w*2,h*2]
  manifest.append({'file':str(p.relative_to(ROOT)),'brand':name,'tagline':tag,'variant':variant,'png_dimensions':dims})
  if variant!='profile-512':cards.append(f'<figure class="{ "dark" if rev else "light" }"><img src="{p.relative_to(ROOT)}" alt="{escape(title)}"><figcaption>{name} · {variant}</figcaption></figure>')
(ROOT/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
(ROOT/'preview.html').write_text('<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Final Flow and O’Riley Foundation logos</title><style>body{font-family:Arial,sans-serif;background:#eaf0ed;color:#0b3b2f;margin:32px}main{max-width:1100px;margin:auto}figure{padding:24px;margin:24px 0;border-radius:16px}.light{background:white}.dark{background:#0b3b2f;color:white}img{width:100%;height:250px;object-fit:contain}figcaption{font-size:12px;color:inherit}</style><main><h1>Flow + O’Riley Foundation</h1><p>Final wording · restrained typography · reusable social assets</p>'+''.join(cards)+'</main></html>')
print('Created 12 SVG and PNG pairs with exact approved identities.')
