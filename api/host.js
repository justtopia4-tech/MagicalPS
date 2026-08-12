export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  const ip = req.query.ip || '100.30.125.206';
  const domain = req.query.domain || 'www.growtopia1.com';
  const content = `${ip} ${domain}\n${ip} www.growtopia2.com\n# Magical ~ delivered by gtpshost.com`;
  return res.status(200).send(content);
}
