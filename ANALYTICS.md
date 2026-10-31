# Game analytics

The game sends analytics to Google Analytics 4 once a GA4 Measurement ID is set. Without an ID it loads nothing from Google and sends nothing.

The ID is not set yet: the hub developers add it.

## Configuration

Create a GA4 web data stream for the production domain and copy its Measurement ID, for example `G-XXXXXXXXXX`. Then set it in one of two ways.

**In the built game, no rebuild needed (recommended for the hub).** In `dist/index.html`, fill in the meta tag:

```html
<meta name="ga-measurement-id" content="G-XXXXXXXXXX" />
```

**At build time.** Set `VITE_GA_MEASUREMENT_ID` in the environment or in `.env.local`, then run `npm run build`:

```text
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

The build-time value wins over the meta tag. To keep the ID across rebuilds, set it in the source `index.html` meta tag or in the environment.

The game loads `gtag.js` itself and sends its own screen views (`game_screen_view`), with GA's automatic page view turned off. Do not add a second GA tag for the same property to the game page, or events will be counted twice.

## Events

- `game_screen_view`: select, intro, each scenario, and result screens.
- `track_selected`: selected game track.
- `game_started`: start of a game session.
- `scenario_option_selected`: option ID, score deltas, and aggressive flag.
- `feedback_opened` / `feedback_closed`: feedback interactions.
- `insight_opened` / `insight_closed`: Did You Know interactions.
- `scenario_advanced`: Next button and whether the action completes the game.
- `game_completed`: outcome, decision style, final scores, and duration.
- `game_restarted`: Play again action, from the result screen or the top bar, with the screen it was used on.
- `go_back`: Go back button or browser back, with the screen (and scenario) it was used on.
- `ui_click`: every click on a button, link, or ARIA button/option with its control ID and current screen.

Question, option, feedback, and insight text is not sent to analytics.