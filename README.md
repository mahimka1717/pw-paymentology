# The Issuer Challenge

A browser game for Paymentology. The player picks an industry, answers six business scenarios, and gets a result with a decision-making style. Built with React, TypeScript, Vite and Tailwind CSS.

Preview: https://pw-paymentology.vercel.app/ (hidden from search engines, see [Search indexing](#search-indexing))

## Ready-made build

`dist/` contains the production build, committed for the hub. To host the game, copy the **contents** of `dist/` into any folder on the server, for example `/issuer-challenge/`. No build step and no server-side code are needed: it is static files only. See [Hosting on the hub](#hosting-on-the-hub) before going live.

## Getting started

Node.js 18, 20 or 22+ and npm are required.

- Install dependencies: `npm install`.
- Run the dev server: `npm run dev`, then open `http://localhost:5173`.
- Create a production build: `npm run build`. It type-checks, then writes `dist/`.
- Preview the production build: `npm run preview`.

## Project structure

| Path | What it is |
|---|---|
| `index.html` | Page shell: meta tags, analytics ID, font preloads, no-JS message |
| `src/main.tsx` | Entry point: starts analytics and renders the app |
| `src/components/App.tsx` | Screen flow, transitions, top bar, background video and the desktop building |
| `src/components/*Screen.tsx` | The four screens: `TrackSelectScreen`, `TrackIntroScreen`, `GameScreen`, `ResultScreen` |
| `src/components/InteractiveCity.tsx` | The clickable city on the select screen |
| `src/data/tracks.ts` | All game copy: industries, scenarios, options, feedback, scores. Edit texts here |
| `src/data/scoring.ts`, `src/utils/calculateOutcome.ts` | Result and decision-style calculation |
| `src/hooks/useGameState.ts` | Game state: answers, scores, going back |
| `src/utils/analytics.ts` | Google Analytics 4 events, see [ANALYTICS.md](ANALYTICS.md) |
| `src/utils/asset.ts` | Builds relative URLs for files in `public/` |
| `src/index.css` | Global styles, fonts, keyframes |
| `public/` | Images, video, fonts, favicon, social image, `robots.txt`. Copied into `dist/` as is |
| `dist/` | Production build output, committed for the hub |
| `vercel.json` | Vercel preview settings |

## How the game works

### Screens

1. **Select** — title, intro copy, industry dropdown and the interactive city. Clicking a building also picks the industry.
2. **Intro** — the industry's story and its building, with a "Let's go" button.
3. **Game** — six questions with three options each. After an answer the score bars move, a feedback popup opens and "Did you know?" shows an insight. The last question's button reads "Your decision-making style".
4. **Result** — the outcome and the player's decision-making style, with "Play Again".

### Navigation

- **Go back** (top left) goes one step back: intro → select, question → previous question, result → last question. The undone answers are removed from the score, and the question comes back unanswered. Hidden on the select screen.
- **Play again** (top right) starts a new game from the select screen. Hidden on the select screen.
- The browser back button and the back swipe on phones do the same as Go back. Every step of the game adds a browser history entry with the same URL, so the game needs no routing or server rewrites.

### Layouts

The desktop layout starts at 1025px wide. Below that the mobile layout is used, with a separate portrait background video.

### Motion

`prefers-reduced-motion: reduce` is respected in part: it turns off the city's entrance and ambient animations, the animated billboards and the "Did you know?" hint pulse. Screen transitions, question transitions and the background video still play.

### URL parameters for testing

- `?animationScale=2` slows all animations down by 2× (any positive number).
- `?animationType=0`…`3` switches the city's ambient animation style (default `1`).

## Analytics

The game sends events to Google Analytics 4. **The Measurement ID is not set yet: the hub developers add it.** No rebuild is needed: fill in this tag in `dist/index.html`:

```html
<meta name="ga-measurement-id" content="G-XXXXXXXXXX" />
```

While it is empty, the game loads nothing from Google and sends nothing. The game loads `gtag.js` itself and sends its own screen views, so do not add a second tag for the same GA property to the game page. The list of events and the build-time alternative (`VITE_GA_MEASUREMENT_ID`) are in [ANALYTICS.md](ANALYTICS.md).

## Hosting on the hub

### Any folder works, with a trailing slash

All file paths in the build are relative, so the game runs from the domain root or from any folder. Tested from `/issuer-challenge/`.

The page must be opened with the trailing slash: `/issuer-challenge/`, not `/issuer-challenge`. Without it, relative paths point one level too high. A script at the top of `index.html` redirects to the address with the slash, keeping the query and hash, but the browser may already have requested a few files from the wrong place by then. **Set up a server-side redirect** from `/issuer-challenge` to `/issuer-challenge/` so this never happens.

### Compression and caching

Please enable gzip or brotli for `.html`, `.js`, `.css` and `.svg`. Lighthouse on a test server without compression scored 81 for mobile performance, mainly because of this; desktop scored 100 in all categories.

Suggested `Cache-Control`:

| Files | Header | Why |
|---|---|---|
| `assets/` | `public, max-age=31536000, immutable` | File names contain a content hash |
| `img/`, `video/`, `fonts/` | `public, max-age=86400, stale-while-revalidate=604800` | File names are not hashed |
| `index.html` | `no-cache` | So a new build is picked up straight away |

## Search indexing

The Vercel deployment is a preview, so it is hidden from search engines in two ways:

- `public/robots.txt` contains `Disallow: /` (copied into `dist/`).
- `vercel.json` sends `X-Robots-Tag: noindex, nofollow`.

`index.html` itself has no `noindex` meta tag, so the page markup can be reused as is.

**To do when hosting on the hub:** do not carry over the `Disallow: /` rule or the `X-Robots-Tag` header to the production site. A `robots.txt` inside a subfolder is ignored by search engines anyway, but it is safer to remove it from the hub copy.

## Deployment (preview)

The Vercel project builds every push to `main`: it runs `npm run build` and serves `dist/`. `vercel.json` sets the headers above plus caching for the preview.

## Open items before going live

### Analytics ID

Fill in `<meta name="ga-measurement-id">` in `dist/index.html`, see [Analytics](#analytics).

### Social card image, og:url and canonical need the final URL

`index.html` already has `og:type`, `og:site_name`, `og:title`, `og:description` and `twitter:card`. The tags that need an absolute URL were left out because the final address is not known yet. The card image is ready: `og.jpg`, 1200×630, in the build's root.

**To do:** add these to `<head>` of `dist/index.html` with the real address of the game:

```html
<link rel="canonical" href="https://EXAMPLE.COM/GAME-PATH/" />
<meta property="og:url" content="https://EXAMPLE.COM/GAME-PATH/" />
<meta property="og:image" content="https://EXAMPLE.COM/GAME-PATH/og.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="The Issuer Challenge: an isometric city of card-issuer buildings on a purple night sky" />
```

### Robots and redirect

Remove the preview's `Disallow: /` from the hub copy and add the trailing-slash redirect, see [Search indexing](#search-indexing) and [Hosting on the hub](#hosting-on-the-hub).
