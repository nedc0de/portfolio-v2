/* netlify/functions/thoughts.js
 *
 * Fresh "AI thoughts" for the faded background notes (scripts.js, BACKGROUND:
 * faded maths notes). Claude writes a new batch every time this runs, steered
 * by a random mix of topics, the time of day and a random seed, so the
 * background never loops through a fixed list.
 *
 * Netlify's CDN shares one batch between all visitors for a few minutes
 * (Netlify-CDN-Cache-Control below), so the API is called at most about once
 * every 5 minutes, and only while people are on the site.
 *
 * Needs ANTHROPIC_API_KEY in the Netlify dashboard > Site settings >
 * Environment variables. Without it (or if the API fails) this returns an
 * empty list and the page keeps its built-in thoughts.
 *
 * Client usage (from scripts.js):
 *   GET /.netlify/functions/thoughts  ->  {"phrases": [...], "words": [...]}
 */

const Anthropic = require('@anthropic-ai/sdk');

const TOPICS = [
  'rain', 'the ocean', 'music', 'coffee', 'sunsets', 'snow', 'birthdays', 'cats',
  'the moon', 'stars', 'cities at night', 'hugs', 'laughing', 'dreams', 'old photos',
  'video games', 'Montreal winters', 'trains', 'libraries', 'gardens', 'the wind',
  'colors', 'memory', 'time', 'small talk', 'friendship', 'thunderstorms', 'bread',
  'sneezing', 'mountains', 'fireworks', 'clocks', 'mirrors', 'maps', 'echoes',
  'recursion', 'gradients', 'probability', 'attention', 'tokens', 'loss curves',
  'git commits', 'CSS', 'JavaScript', 'bugs', 'async code', 'pixels', 'fonts',
  'the number pi', 'infinity', 'zero', 'prime numbers', 'entropy', 'randomness',
];

const SYSTEM = `You write the stray thoughts of a curious AI, shown faintly in the background of a developer's personal website (nedcode.com, a frontend dev in Montreal). They read like an AI idly thinking: wondering what the human world feels like, mixed with its day job of code and maths.

Rules:
- all lowercase, short and playful, never sad, scary, rude or romantic
- phrases: 2 to 6 words, at most 30 characters, no word longer than 10 letters
- words: one word or a tiny code/maths snippet, at most 12 characters
- plain letters, digits, spaces and simple symbols like ( ) = + ? . / _ " ' ∞ π Σ λ ∇ Δ
- no real people, brands, emojis, hashtags or quotes from songs, films or books
- every item different from the others and from anything obvious or cliché`;

const SCHEMA = {
  type: 'object',
  properties: {
    phrases: { type: 'array', items: { type: 'string' } },
    words: { type: 'array', items: { type: 'string' } },
  },
  required: ['phrases', 'words'],
  additionalProperties: false,
};

const json = (statusCode, body, cache) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    // browsers always ask again; Netlify's CDN keeps one batch for everyone
    'Cache-Control': 'public, max-age=0, must-revalidate',
    'Netlify-CDN-Cache-Control': cache || 'no-store',
  },
  body: JSON.stringify(body),
});

const pickSome = (list, n) => [...list].sort(() => Math.random() - 0.5).slice(0, n);

// keep only lines that look right on the dot grid
const ALLOWED = /^[a-z0-9 ()=+?.,:/_"'!<>\-*∞πΣλ∇Δθσμε≈]+$/;
const clean = (items, maxLen, maxWords) => [...new Set((items || [])
  .map((s) => String(s).toLowerCase().trim())
  .filter((s) => s && s.length <= maxLen && ALLOWED.test(s)
    && s.split(' ').length <= maxWords && s.split(' ').every((w) => w.length <= 10)))];

exports.handler = async () => {
  if (!process.env.ANTHROPIC_API_KEY) return json(200, { phrases: [], words: [] });

  const client = new Anthropic();
  const hour = new Date().toLocaleString('en-US', { timeZone: 'America/Toronto', hour: 'numeric', hour12: true });
  const prompt = `It's around ${hour} in Montreal. Today, let your mind wander around: ${pickSome(TOPICS, 4).join(', ')}.
Seed for variety: ${Math.random().toString(36).slice(2, 10)}.
Write 16 phrases and 10 words.`;

  try {
    const response = await client.beta.messages.create({
      model: 'claude-opus-5-5',
      max_tokens: 4000,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      output_config: { effort: 'low', format: { type: 'json_schema', schema: SCHEMA } },
      system: SYSTEM,
      messages: [{ role: 'user', content: prompt }],
    });
    if (response.stop_reason === 'refusal' || response.stop_reason === 'max_tokens') {
      return json(200, { phrases: [], words: [] });
    }
    const text = response.content.find((b) => b.type === 'text');
    const data = JSON.parse(text ? text.text : '{}');
    return json(200, {
      phrases: clean(data.phrases, 30, 6),
      words: clean(data.words, 12, 2),
    }, 'public, s-maxage=300, stale-while-revalidate=120');
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) console.error('thoughts: rate limited');
    else if (error instanceof Anthropic.APIError) console.error(`thoughts: API error ${error.status}`, error.message);
    else console.error('thoughts:', error.message);
    return json(200, { phrases: [], words: [] });
  }
};
