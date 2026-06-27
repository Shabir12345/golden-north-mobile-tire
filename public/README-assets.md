# Site assets — what to swap before / after launch

All site photography lives in `public/photos/`. The current files are the real
Golden North photos supplied by the client (copied from the `Business Media`
folder). They are wired in through `src/lib/photos.ts` — to replace a photo,
either overwrite the file in `public/photos/` keeping the same filename, or edit
the path in `src/lib/photos.ts`.

## Photo map (filename → where it appears)

| File (`public/photos/`)          | Used as                                              |
|----------------------------------|------------------------------------------------------|
| `hero-night-tech.webp`           | **Home hero** + gallery (hi-vis tech, night)         |
| `action-mercedes-street.webp`    | **Tire Change** service row + detail hero            |
| `tires-warehouse.webp`           | **New & Used Tires** service row + detail hero       |
| `night-mini-station.webp`        | **Battery** service row + detail hero                |
| `night-sedan-roadside.webp`      | **Roadside** service row + detail hero               |
| `action-mustang-jack.webp`       | Gallery                                              |
| `action-porsche-winter.webp`     | Gallery                                              |
| `van-mansion-driveway.webp`      | Gallery                                              |
| `van-residential-driveway.webp`  | Gallery                                              |
| `van-interior-balancer.webp`     | Gallery                                              |
| `tire-puncture.webp`             | Gallery                                              |
| `van-loadingdock-bmw.webp`       | Gallery                                              |
| `van-shop-winter.webp`           | Gallery                                              |
| `rim-on-machine.jpg`             | Gallery                                              |

## Recommended replacements / additions

- **Logo:** no official logo file was provided. The header/footer currently use
  a four-point north-star mark (`✦`) + the "Golden North" wordmark, and the
  favicon is `src/app/icon.svg`. Drop in a real logo (SVG preferred) and wire it
  into `Header.tsx` / `Footer.tsx` when available.
- **Battery service photo:** no dedicated battery/jump-start shot exists yet; a
  night roadside photo stands in. A real battery-swap photo would be ideal at
  `night-mini-station.webp`'s slot (edit `SERVICE_PHOTO.battery` in
  `src/lib/photos.ts`).
- **Higher-resolution hero:** `hero-night-tech.webp` is portrait and works well,
  but a wide landscape hero crop would give more flexibility on large screens.
- **Social/OG image** is generated automatically from `src/app/opengraph-image.tsx`
  (no file to supply).

## Other notes

- Original client photos are preserved in the repo's `Business Media/` folder.
- The contact form emails via Resend when `RESEND_API_KEY` is set (see
  `.env.example`); until then it logs submissions and still succeeds.
