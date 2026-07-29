// Cloudflare Pages Function — served at /api/football, same origin as the dashboard.
// Requires a Pages secret named API_FOOTBALL_KEY (Settings → Environment Variables → Secret).
// Optional secrets: API_FOOTBALL_LEAGUE_ID (default 39 = Premier League),
// API_FOOTBALL_TEAM_ID (default 42 = Arsenal) — set these if you follow a different team/league.
export async function onRequestGet({ request, env }) {
  if (!env.API_FOOTBALL_KEY) {
    return Response.json({ error: 'API_FOOTBALL_KEY not set as a Pages secret yet.' }, { status: 200 });
  }
  try {
    const url = new URL(request.url);
    const season = url.searchParams.get('season') || new Date().getFullYear();
    const league = env.API_FOOTBALL_LEAGUE_ID || '39';
    const team = env.API_FOOTBALL_TEAM_ID || '42';
    const apiUrl = `https://v3.football.api-sports.io/standings?league=${league}&season=${season}&team=${team}`;
    const res = await fetch(apiUrl, {
      headers: { 'x-apisports-key': env.API_FOOTBALL_KEY },
    });
    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch (err) {
    return Response.json({ error: err.message || 'API-Football fetch failed' }, { status: 502 });
  }
}
