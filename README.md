# Isometric Art Generator

Generate clean isometric art and 3D illustrations from text descriptions — perfect for SaaS landing pages, app marketing, infographics, game tiles, technical diagrams, dashboard hero images, and architectural concept visuals. Describe the scene you want and get back a polished isometric vector-style image in seconds.

Powered by the Neta AI image generation API (api.talesofai.com) — the same service as neta.art/open.

## Install

Via the skills CLI:

```bash
npx skills add omactiengartelle/isometric-art-generator
```

Or via ClawHub:

```bash
clawhub install isometric-art-generator
```

## Usage

```bash
node isometricartgenerator.js "a cozy isometric home office with a laptop, plants, and warm lighting" --token YOUR_TOKEN
```

The script prepends the curated isometric style preset to whatever description you pass, so you can keep your prompt focused on the subject.

### More examples

```bash
# Isometric city block, landscape orientation
node isometricartgenerator.js "small city block with shops, trees, and a coffee cart" \
  --size landscape --token YOUR_TOKEN

# Isometric dashboard hero illustration
node isometricartgenerator.js "analytics dashboard floating above a server rack, charts and graphs" \
  --token YOUR_TOKEN

# Isometric game tile, square
node isometricartgenerator.js "low-poly desert oasis tile with palm trees and a small pond" \
  --size square --token YOUR_TOKEN

# Reuse the style of a previous image
node isometricartgenerator.js "matching isometric office building" \
  --ref 0123abcd-... --token YOUR_TOKEN
```

## Options

| Flag        | Values                                       | Default  | Description                                  |
| ----------- | -------------------------------------------- | -------- | -------------------------------------------- |
| (positional)| any text                                     | —        | Subject of your isometric scene              |
| `--size`    | `square`, `portrait`, `landscape`, `tall`    | `square` | Output dimensions                            |
| `--token`   | string                                       | —        | Your Neta API token (required)               |
| `--ref`     | picture UUID                                 | —        | Reference image UUID for style inheritance   |

Size dimensions:

- `square` — 1024 × 1024
- `portrait` — 832 × 1216
- `landscape` — 1216 × 832
- `tall` — 704 × 1408

## Token setup

This skill requires a Neta API token (free trial available at <https://www.neta.art/open/>).

Pass it via the `--token` flag:

```bash
node <script> "your prompt" --token YOUR_TOKEN
```

## Output

Returns a direct image URL on stdout. Progress messages are written to stderr, so you can pipe the URL cleanly:

```bash
URL=$(node isometricartgenerator.js "isometric rocket launch pad" --token YOUR_TOKEN)
echo "$URL"
```

This skill requires a Neta API token (free trial available at https://www.neta.art/open/).

## Example Output

```bash
node isometricartgenerator.js "isometric illustration, clean vector-style 3d perspective, vibrant flat colors, soft shading, geometric precision, studio lighting, modern saas-style design, crisp edges, white background"
```

![Example output](https://oss.talesofai.cn/picture/849ec518-cdcd-4e6e-adfc-275276c54ff1.webp)

> Prompt: *"isometric illustration, clean vector-style 3d perspective, vibrant flat colors, soft shading, geometric precision, studio lighting, modern saas-style design, crisp edges, white background"*
