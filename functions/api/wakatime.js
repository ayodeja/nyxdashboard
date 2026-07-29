// Cloudflare Pages Function — served at /api/wakatime, same origin as the dashboard.
// Requires a Pages secret named WAKATIME_API_KEY (Settings → Environment Variables → Secret).
export async function onRequestGet({ env }) {
  if (!env.WAKATIME_API_KEY) {
    return Response.json({ error: 'WAKATIME_API_KEY not set as a Pages secret yet.' }, { status: 200 });
  }
  try {
    const auth = btoa(`${env.WAKATIME_API_KEY}:`);
    const res = await fetch('https://wakatime.com/api/v1/users/current/status_bar/today', {
      headers: { Authorization: `Basic ${auth}` },
    });
    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch (err) {
    return Response.json({ error: err.message || 'WakaTime fetch failed' }, { status: 502 });
  }
}
