const secureConnection = (req, res, next) => {
  const isHttps =
    req.secure ||
    (req.headers['x-forwarded-proto'] || '').substring(0, 5) === 'https';

  if (!isHttps) {
    if (req.method === 'GET' || req.method === 'HEAD') {
      const host = req.headers.host;
      return res.redirect(301, 'https://' + host + req.originalUrl);
    } else {
      return res
        .status(403)
        .send('Please use HTTPS when submitting data to this server.');
    }
  }

  res.setHeader(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
};

module.exports = secureConnection;
