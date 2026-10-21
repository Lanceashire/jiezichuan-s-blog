# Third-party assets

## Works character — Gothic Hero

- Creator: Luis Zuno (@ansimuz).
- License: **CC0 1.0 Universal (CC0-1.0)**, as marked by the creator on the source page.
- Source: https://opengameart.org/content/gothicvania-patreons-collection
- License text: https://creativecommons.org/publicdomain/zero/1.0/legalcode
- Original archive: https://opengameart.org/sites/default/files/%20gothicvania%20patreon%20collection.zip
- Archive SHA-256: `081a88f814d1c38b57a97af3659723bb15ed655e00847fcba0d8c08f4b98757f`.
- Used files: `Gothic-hero-Files/PNG/gothic-hero-{idle,run,jump,attack}.png`.

The 27 original frames are packed into `dist/assets/characters/gothic-hero.png` without repainting or palette changes. Animation metadata is in the neighboring JSON file. Jump pivots compensate for the source sheet's vertical offsets; all frames render at an integer 2× scale. The original artist's character is used, not a KONAMI/Shanoa sprite.

Regenerate with Python 3 and Pillow:

```sh
python3 scripts/build-works-character.py
```

The CC0 declaration applies to these character frames only. Other site resources retain their respective provenance recorded in `ASSET-NOTES.txt`.
