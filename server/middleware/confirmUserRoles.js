const jwt = require('jsonwebtoken');
const auth = require('./auth');
const ROLES = require('../config/userRoles');
const User = require('../models/User');

const confirmUserRoles = async (req, res, next, requiredRole) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role >= requiredRole) {
      req.user = user;
      next();
    } else {
      res.status(401).json({ msg: 'Resurssin käyttöoikeus puuttuu.' });
    }
  } catch (err) {
    res.status(500).json({ msg: 'Virhe palvelimella' });
  }
};

module.exports = {
  OWNER: (req, res, next) => confirmUserRoles(req, res, next, ROLES.OWNER),
  ADMIN: (req, res, next) => confirmUserRoles(req, res, next, ROLES.ADMIN),
  MOD: (req, res, next) => confirmUserRoles(req, res, next, ROLES.MODERATOR),
  MEMBER: (req, res, next) => confirmUserRoles(req, res, next, ROLES.MEMBER),
  VERIFIED: (req, res, next) =>
    confirmUserRoles(req, res, next, ROLES.VERIFIED),
  USER: (req, res, next) => confirmUserRoles(req, res, next, ROLES.USER)
};
