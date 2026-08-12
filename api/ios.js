export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  const ip = req.query.ip || '100.30.125.206';
  const domain = req.query.domain || 'www.growtopia1.com';
  const content = `[Header]\n# Magical iOS Surge 5 Config\n\n[Host]\n${domain} = ${ip}\nwww.growtopia2.com = ${ip}\n`;
  return res.status(200).send(content);
}
