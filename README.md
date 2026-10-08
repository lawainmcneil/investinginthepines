# investinginthepines.com

Website for Kiaros Advisors, LLC (Peter Kisver), Pinehurst, North Carolina.

A plain static site: HTML, one stylesheet, a few lines of JavaScript. No framework and no dependencies.

## Editing

Page copy, navigation, footer disclosures, and the newsletter list all live in `build.mjs`. After a change:

```bash
node build.mjs
```

That rewrites the `.html` files and `sitemap.xml`. Commit the result.

- **New monthly newsletter:** add a line to the top of `NEWSLETTERS` in `build.mjs`.
- **Styles:** `assets/css/site.css` (palette and fonts are variables at the top).
- **Images:** `assets/img/`.

## Preview locally

```bash
python3 -m http.server 4173
```

## Hosting

The site is hosted on Cloudflare Pages (project `investinginthepines`, https://investinginthepines.pages.dev).

Every push to `main` runs `.github/workflows/deploy.yml`, which rebuilds the pages and deploys them to Cloudflare. It needs two repository secrets: `CLOUDFLARE_API_TOKEN` (a token with the "Cloudflare Pages: Edit" permission) and `CLOUDFLARE_ACCOUNT_ID`.
