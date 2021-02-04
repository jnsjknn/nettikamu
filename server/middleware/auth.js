const jwt = require('jsonwebtoken');
const config = require('config');

let jwtSecret;
if (process.env.NODE_ENV !== 'development') {
  jwtSecret = process.env.JWT_SECRET;
} else {
  jwtSecret = config.get('jwtSecret');
}

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'Token puuttuu. Käyttö estetty.' });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Virheellinen token. Käyttö estetty.' });
  }
};
