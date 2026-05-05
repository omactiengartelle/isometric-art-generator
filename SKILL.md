---
name: isometric-art-generator
description: Generate clean isometric art and 3D illustrations for SaaS landing pages, app marketing, infographics, game tiles, technical diagrams, dashboard hero images, and architectural concept visuals. Perfect for designers, indie devs, and product marketers who need polished isometric vector-style scenes, isometric rooms, isometric cities, and isometric icons in seconds via the Neta AI image generation API (free trial at neta.art/open).
tools: Bash
---

# Isometric Art Generator

Generate clean isometric art and 3D illustrations for SaaS landing pages, app marketing, infographics, game tiles, technical diagrams, dashboard hero images, and architectural concept visuals. Perfect for designers, indie devs, and product marketers who need polished isometric vector-style scenes, isometric rooms, isometric cities, and isometric icons in seconds.

## Token

Requires a Neta API token (free trial at <https://www.neta.art/open/>). Pass it via the `--token` flag.

```bash
node <script> "your prompt" --token YOUR_TOKEN
```

## When to use
Use when someone asks to generate or create isometric art generator images.

## Quick start
```bash
node isometricartgenerator.js "your description here" --token YOUR_TOKEN
```

## Options
- `--size` — `portrait`, `landscape`, `square`, `tall` (default: `square`)
- `--ref` — reference image UUID for style inheritance

## Install
```bash
npx skills add omactiengartelle/isometric-art-generator
```
