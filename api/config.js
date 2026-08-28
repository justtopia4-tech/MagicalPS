export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO = 'justtopia4-tech/MagicalPS';

  try {
    const headers = GITHUB_TOKEN ? { 'Authorization': `token ${GITHUB_TOKEN}` } : {};
    const rawRes = await fetch(`https://raw.githubusercontent.com/${REPO}/main/public/config.txt?t=${Date.now()}`, { headers });

    if (rawRes.ok) {
      const text = await rawRes.text();
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      return res.status(200).send(text);
    }
  } catch (_) {}

  return res.status(200).send('');
}
