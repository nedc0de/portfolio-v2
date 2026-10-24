/* netlify/functions/deploy-succeeded.js
 *
 * Runs on Netlify by itself after every successful deploy (the file name is
 * the event). On a production deploy it reads the live sitemap and tells
 * IndexNow about every page, so Bing (which also feeds DuckDuckGo) and the
 * other IndexNow search engines recrawl them right away.
 *
 * The key below must match the file /473e8aed93e8ab7c595be22b7b872759.txt at the site root:
 * that file is how IndexNow checks the request really comes from nedcode.com.
 * Docs: https://www.indexnow.org/documentation
 */

const SITE = 'https://nedcode.com';
const KEY = '473e8aed93e8ab7c595be22b7b872759';

exports.handler = async (event) => {
  let deploy = {};
  try {
    deploy = JSON.parse(event.body || '{}').payload || {};
  } catch (e) {}
  // only the live site, not branch previews
  if (deploy.context && deploy.context !== 'production') {
    return { statusCode: 200, body: 'Not a production deploy, skipped' };
  }

  try {
    const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
    const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
    if (!urlList.length) return { statusCode: 200, body: 'No URLs in the sitemap' };

    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: 'nedcode.com',
        key: KEY,
        keyLocation: `${SITE}/${KEY}.txt`,
        urlList,
      }),
    });
    // 200 or 202 = accepted; it shows in the function's log on Netlify
    console.log(`IndexNow: sent ${urlList.length} URLs, status ${res.status}`);
    return { statusCode: 200, body: `IndexNow ${res.status}` };
  } catch (err) {
    console.log('IndexNow request failed:', err.message);
    return { statusCode: 200, body: 'IndexNow request failed' };
  }
};
