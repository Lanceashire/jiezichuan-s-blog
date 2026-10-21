#!/usr/bin/env python3
"""Pack unmodified CC0 Gothic Hero frames; requires Pillow, no image generation."""
from pathlib import Path
from zipfile import ZipFile
from io import BytesIO
import argparse, hashlib, json
from urllib.request import urlopen
from PIL import Image, ImageDraw

SOURCE_URL = 'https://opengameart.org/sites/default/files/%20gothicvania%20patreon%20collection.zip'
SOURCE_SHA256 = '081a88f814d1c38b57a97af3659723bb15ed655e00847fcba0d8c08f4b98757f'
SOURCE_FOLDER = ' gothicvania patreon collection/Gothic-hero-Files/PNG/'
ROOT = Path(__file__).resolve().parents[1]
SPECS = {
    'idle': dict(width=38, height=48, count=4, pivotX=19, pivotY=48, frameMs=130),
    'run': dict(width=66, height=48, count=12, pivotX=33, pivotY=48, frameMs=70),
    # The source jump contains vertical offsets. Remove only those offsets in the
    # renderer's pivot so the scene's jump physics supplies the actual movement.
    'jump': dict(width=61, height=77, count=5, pivotX=30, pivotY=[76,67,48,42,60], frameMs=100),
    'attack': dict(width=96, height=48, count=6, pivotX=43, pivotY=48, frameMs=130),
}

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--archive', type=Path, help='Use a previously downloaded source ZIP')
    parser.add_argument('--preview-dir', type=Path)
    args=parser.parse_args()
    data=args.archive.read_bytes() if args.archive else urlopen(SOURCE_URL,timeout=45).read()
    if hashlib.sha256(data).hexdigest()!=SOURCE_SHA256:
        raise SystemExit('Source archive hash differs; inspect the upstream change first.')
    atlas=Image.new('RGBA',(792,221))
    manifest={'name':'Gothic Hero','author':'Luis Zuno (ansimuz)','license':'CC0-1.0','source':'https://opengameart.org/content/gothicvania-patreons-collection','sourceSha256':SOURCE_SHA256,'scale':2,'animations':{}}
    y=0
    previews=[]
    with ZipFile(BytesIO(data)) as source:
        for action,spec in SPECS.items():
            strip=Image.open(BytesIO(source.read(SOURCE_FOLDER+f'gothic-hero-{action}.png'))).convert('RGBA')
            assert strip.size==(spec['width']*spec['count'],spec['height'])
            atlas.alpha_composite(strip,(0,y))
            manifest['animations'][action]={**spec,'x':0,'y':y}
            for frame in range(spec['count']):
                tile=strip.crop((frame*spec['width'],0,(frame+1)*spec['width'],spec['height']))
                assert tile.getbbox(),(action,frame)
                py=spec['pivotY'][frame] if isinstance(spec['pivotY'],list) else spec['pivotY']
                display=Image.new('RGBA',(144,108),'#141925')
                display.alpha_composite(tile,(64-spec['pivotX'],90-py))
                ImageDraw.Draw(display).text((5,4),f'{action} {frame+1}',fill='#e8d2a2')
                previews.append(display.convert('RGB').resize((432,324),Image.Resampling.NEAREST))
            y+=strip.height
    target=ROOT/'dist/assets/characters';target.mkdir(parents=True,exist_ok=True)
    atlas.save(target/'gothic-hero.png',optimize=True)
    (target/'gothic-hero.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
    if args.preview_dir:
        args.preview_dir.mkdir(parents=True,exist_ok=True)
        previews[0].save(args.preview_dir/'gothic-hero-actions.gif',save_all=True,append_images=previews[1:],duration=120,loop=0)
        sheet=Image.new('RGB',(432*6,324*5),'#141925')
        for i,fr in enumerate(previews): sheet.paste(fr,((i%6)*432,(i//6)*324))
        sheet.save(args.preview_dir/'gothic-hero-contact-sheet.png')
    print(f'Packed {sum(s["count"] for s in SPECS.values())} source frames: {target}')

if __name__=='__main__': main()
