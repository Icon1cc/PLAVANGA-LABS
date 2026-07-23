# Client logo source art

Original files supplied by the client. These are **not** served: anything under
`public/` is downloadable by anyone, and these originals are 6-8 MB each.

The versions the site actually uses live in `public/images/clients/` and are
normalised to a 640x400 white canvas so `.client-logo` can lay every logo out
with one rule:

| Source                     | Served file                                  |
| -------------------------- | -------------------------------------------- |
| `Logo_Maruti.png`          | `maruti-cranes.webp`                          |
| `Logo_Ashtavinayak.png`    | `ashtavinayak-constructions.webp`             |

## Regenerating

Neither source has a transparent background, so both are flattened onto white
and the card puts them on a light plate. `Logo_Maruti.png` has a flat near-white
background that `sharp.trim()` handles. `Logo_Ashtavinayak.png` has a textured
grey background that defeats `trim()`, so it is cropped by hand and its
background is lifted to white with a linear adjustment.

```js
// node, with sharp from the project's node_modules
const CANVAS = { w: 640, h: 400 };
const PAD = 12;
const WHITE = { r: 255, g: 255, b: 255 };

const normalise = (pipeline, file) =>
  pipeline
    .resize(CANVAS.w - PAD * 2, CANVAS.h - PAD * 2, {
      fit: "contain",
      background: WHITE,
      withoutEnlargement: true,
    })
    .extend({ top: PAD, bottom: PAD, left: PAD, right: PAD, background: WHITE })
    .flatten({ background: WHITE })
    .webp({ quality: 90 })
    .toFile(`public/images/clients/${file}`);

await normalise(
  sharp("assets/client-logos/Logo_Maruti.png").trim({ threshold: 12 }),
  "maruti-cranes.webp",
);

await normalise(
  sharp("assets/client-logos/Logo_Ashtavinayak.png")
    .extract({ left: 610, top: 110, width: 1620, height: 1310 })
    .linear(1.3, -58),
  "ashtavinayak-constructions.webp",
);
```

To add another client: drop the source here, produce a 640x400 WebP the same
way, then add a `logo` path to the entry in `src/content/site.ts`. A client
without a `logo` falls back to the gradient initial tile.
