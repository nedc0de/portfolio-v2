/* netlify/functions/subscribe.mjs
 *
 * Adds an email to the Beehiiv newsletter, for the home page's own sign-up
 * form (it replaced Beehiiv's iframe embed so it can match the site). The
 * API key never ships to the browser. Set both in the Netlify dashboard >
 * Site settings > Environment variables:
 *   BEEHIIV_API_KEY         an API key from Beehiiv > Settings > API
 *   BEEHIIV_PUBLICATION_ID  the publication's ID (starts with "pub_")
 *
 * Client usage (from scripts.js):
 *   POST /.netlify/functions/subscribe   {"email": "you@example.com"}
 *
 * Spam protection: a hidden "website" field bots fill in, and a rate limit
 * of 5 sign-ups per visitor (IP) per minute. Netlify enforces the limit
 * before the function runs (config below); the small in-memory check is a
 * backup for when it doesn't.
 */

const json = (status, body) => new Response(JSON.stringify(body), {
  status,
  headers: { 'Content-Type': 'application/json' },
});

const WINDOW_MS = 60 * 1000;
const LIMIT = 5;
const recent = new Map(); // ip -> times of recent attempts (per warm instance only)
const tooMany = (ip) => {
  const now = Date.now();
  const times = (recent.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  times.push(now);
  recent.set(ip, times);
  if (recent.size > 5000) recent.clear(); // never grow without bound
  return times.length > LIMIT;
};

export default async (req, context) => {
  if (req.method !== 'POST') return json(405, { error: 'Use POST' });
  if (tooMany(context?.ip || 'unknown')) return json(429, { error: 'Too many tries, wait a minute' });

  const apiKey = process.env.BEEHIIV_API_KEY;
  const publication = process.env.BEEHIIV_PUBLICATION_ID;
  // name (never the value) of anything missing, to make setup easy to check
  const missing = [!apiKey && 'BEEHIIV_API_KEY', !publication && 'BEEHIIV_PUBLICATION_ID'].filter(Boolean);
  if (missing.length) return json(500, { error: 'Newsletter is not configured', missing });

  let email = '';
  let website = '';
  try {
    ({ email = '', website = '' } = JSON.parse((await req.text()) || '{}'));
  } catch (e) {
    return json(400, { error: 'Bad request' });
  }
  // "website" is a hidden field people never see: bots fill it in
  if (website) return json(200, { ok: true });
  email = String(email).trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json(400, { error: 'Please enter a valid email' });
  }

  try {
    const res = await fetch(`https://api.beehiiv.com/v2/publications/${encodeURIComponent(publication)}/subscriptions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: true,
        utm_source: 'nedcode.com',
        utm_medium: 'website',
      }),
    });
    if (!res.ok) {
      console.error('Beehiiv error', res.status, await res.text());
      return json(502, { error: 'Could not subscribe right now' });
    }
    return json(200, { ok: true });
  } catch (e) {
    console.error('Beehiiv request failed', e);
    return json(502, { error: 'Could not subscribe right now' });
  }
};

// kept at its old address, so the form doesn't change
export const config = {
  path: '/.netlify/functions/subscribe',
  rateLimit: { windowLimit: LIMIT, windowSize: 60, aggregateBy: ['ip', 'domain'] },
};
