/* netlify/functions/subscribe.js
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
 */

const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Use POST' });

  const apiKey = process.env.BEEHIIV_API_KEY;
  const publication = process.env.BEEHIIV_PUBLICATION_ID;
  if (!apiKey || !publication) return json(500, { error: 'Newsletter is not configured' });

  let email = '';
  let website = '';
  try {
    ({ email = '', website = '' } = JSON.parse(event.body || '{}'));
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
