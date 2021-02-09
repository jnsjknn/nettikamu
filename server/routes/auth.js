const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ROLES = require('../config/userRoles');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const verificationSMS = require('../config/twilio');
const { sendMail } = require('../utils');
const { infoEmail } = require('../config/vars');

let jwtSecret;
if (process.env.NODE_ENV !== 'development') {
  jwtSecret = process.env.JWT_SECRET;
} else {
  jwtSecret = config.get('jwtSecret');
}

// @route   GET api/auth
// @desc    Authenticate user
// @access  Private / USER
// @body    -
// @params  -
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Virhe palvelimella');
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
// @body    username: String, password: String
// @params  -
router.post(
  '/',
  [
    check('username', 'Anna käyttäjätunnus').exists(),
    check('password', 'Anna salasana').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, rememberUser } = req.body;
    try {
      let user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Väärä sähköpostiosoite tai salasana' }] });
      }

      const passwordIsCorrect = await bcrypt.compare(password, user.password);
      if (!passwordIsCorrect) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Väärä sähköpostiosoite tai salasana' }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      const tokenExpiration = rememberUser ? 604800 : 3600;

      jwt.sign(
        payload,
        jwtSecret,
        { expiresIn: tokenExpiration },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Virhe palvelimella');
    }
  }
);

// @route   GET api/auth/verify
// @desc    Send account verification SMS
// @access  Public
// @body    -
// @params  phoneNumber: String
router.get('/verify/:phoneNumber', auth, async (req, res) => {
  const phone =
    '+358' + req.params.phoneNumber.replace('+358', '').replace(/[\D]/g, '');
  try {
    const user = await User.findOne({ phone });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Puhelinnumero on jo käytössä' }] });
    }
    const response = await verificationSMS.send(phone);
    res.json(response);
    res.end();
  } catch (err) {
    if (err.code === 60200) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Anna oikea puhelinnumero' }] });
    }
    console.error(err.message);
    res.status(500).send('Virhe palvelimella');
  }
});

// @route   POST api/auth/verify
// @desc    Check account verification code
// @access  Public
// @body    phoneNumber: String, verificationCode: Number
// @params  -
router.post('/verify', auth, async (req, res) => {
  try {
    const phoneNumber =
      '+358' + req.body.phoneNumber.replace('+358', '').replace(/[\D]/g, '');
    const check = await verificationSMS.check(
      phoneNumber,
      req.body.verificationCode.replace(/[\D]/g, '')
    );
    if (check.valid) {
      const user = await User.updateOne(
        { _id: req.user.id },
        { $set: { role: 1, phone: phoneNumber } }
      );
      await sendMail({
        to: infoEmail,
        subject: `Uusi varmennettu käyttäjä`,
        text: `ID: ${req.user.id}`
      });
      res.json(user);
    } else {
      res.status(400).json({ errors: [{ msg: 'Väärä vahvistuskoodi' }] });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Virhe palvelimella');
  }
});

// @route   GET api/auth/changePassword
// @desc    Send verification SMS to change password
// @access  Public
// @body    -
// @params  phoneNumber
router.get('/changePassword/:phoneNumber', async (req, res) => {
  const phone =
    '+358' + req.params.phoneNumber.replace('+358', '').replace(/[\D]/g, '');
  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Puhelinnumero ei kelpaa' }] });
    }
    const response = await verificationSMS.send(phone);
    res.json(response);
    res.end();
  } catch (err) {
    if (err.code === 60200) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Puhelinnumero ei kelpaa' }] });
    }
    console.error(err.message);
    res.status(500).send('Virhe palvelimella');
  }
});

// @route   POST api/auth/changePassword
// @desc    Change user's password
// @access  Private
// @body    newPassword: String, phoneNumber: String, verificationCode: Number
// @params  -
router.post(
  '/changePassword',
  [check('newPassword', 'Anna vähintään 6-merkkinen salasana').isLength(6)],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const phoneNumber =
        '+358' + req.body.phoneNumber.replace('+358', '').replace(/[\D]/g, '');
      const check = await verificationSMS.check(
        phoneNumber,
        req.body.verificationCode.replace(/[\D]/g, '')
      );
      if (check.valid) {
        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(req.body.newPassword, salt);
        await User.updateOne(
          { phone: phoneNumber },
          { $set: { password: newPassword } }
        );
        res.end();
      } else {
        res.status(400).json({ errors: [{ msg: 'Väärä vahvistuskoodi' }] });
      }
    } catch (err) {
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Väärä puhelinnumero' }] });
      }
      console.error(err.message);
      res.status(500).send('Virhe palvelimella');
    }
  }
);

module.exports = router;
