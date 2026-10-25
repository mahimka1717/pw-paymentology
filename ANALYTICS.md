# Game analytics

The game sends analytics to Google Analytics 4 when `VITE_GA_MEASUREMENT_ID` is set at build time.

## Configuration

1. Create a GA4 web data stream for the production domain.
2. Copy its Measurement ID, for example `G-XXXXXXXXXX`.
3. Set `VITE_GA_MEASUREMENT_ID` locally or in the deployment environment.
4. Rebuild and redeploy the application.

For local development, create `.env.local`:

```text
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

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