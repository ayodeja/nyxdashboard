# NYX Dashboard — Cloudflare Pages Deploy

This folder is ready to deploy as-is. `index.html` is the dashboard; `functions/api/*.js`
are server-side functions that keep your WakaTime and API-Football keys off the public page
and avoid CORS entirely (same-origin requests).

## One-time setup

1. **Push this folder to a GitHub repo**
   - Create a new repo (e.g. `nyx-dashboard`)
   - Upload everything in this folder, keeping the `functions/api/` structure intact

2. **Connect it to Cloudflare Pages**
   - dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git
   - Pick the repo you just made
   - Build settings: leave "Framework preset" as **None**, build command blank,
     output directory `/` (root) — this is a static site, nothing to build
   - Deploy

3. **Add your secrets**
   - In the Pages project → Settings → Environment Variables
   - Add as **Secret** (not plaintext):
     - `WAKATIME_API_KEY` = waka_36e7d687-82f3-4df8-a4ba-2411b546c65a
     - `API_FOOTBALL_KEY` = 37ed0d0b590819e422eaeab27c994322
   - Optional, only if you don't follow Arsenal / Premier League:
     - `API_FOOTBALL_TEAM_ID` (default 42 = Arsenal)
     - `API_FOOTBALL_LEAGUE_ID` (default 39 = Premier League)
   - Redeploy after adding secrets (Pages → Deployments → Retry deployment) so the functions pick them up

4. **Open the live URL**
   - You'll get something like `https://nyx-dashboard.pages.dev`
   - Bookmark that — always open the dashboard from here, not from local storage
   - Since this is HTTPS, geolocation, GNews, Frankfurter (currency), and Google Calendar
     should all work without any further changes

## After this

Any time you edit `index.html` or the functions and push to GitHub, Cloudflare
auto-redeploys within a minute or two — no manual re-upload.
