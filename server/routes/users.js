const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const User = require('../models/User');

let jwtSecret;
if (process.env.NODE_ENV !== 'development') {
  jwtSecret = process.env.JWT_SECRET;
} else {
  jwtSecret = config.get('jwtSecret');
}

// @route   POST api/users
// @desc    Register user
// @access  Public
// @body    username: String, password: String, dateOfBirth: Date(YYYY-MM-DD)
// @params  -
router.post(
  '/',
  [
    check('username', 'Anna 5-25 -merkkinen käyttäjätunnus').isLength({
      min: 5,
      max: 25
    }),
    check('password', 'Anna vähintään 6-merkkinen salasana').isLength(6),
    check('dateOfBirth', 'Anna syntymäaika').isDate({ format: 'YYYY-MM-DD' }),
    check('gender', 'Ilmoita sukupuolesi').custom(value =>
      ['mies', 'nainen'].includes(value)
    )
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, dateOfBirth, gender } = req.body;
    if (username === 'nettikamu') {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Soo soo! Tätä nimimerkkiä ei sallita' }] });
    }
    if (Date.now() - new Date(dateOfBirth).getTime() < 504910816000) {
      return res
        .status(400)
        .json({
          errors: [{ msg: 'Nettikamu on tarkoitettu yli 16-vuotiaille' }]
        });
    }
    try {
      let user = await User.findOne({ username });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Käyttäjätunnus on jo käytössä' }] });
      }

      user = new User({
        username,
        password,
        dateOfBirth,
        gender
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      // Token expiration:
      // Production mode:   1h
      // Development mode:  12h
      const tokenExpiration =
        process.env.NODE_ENV !== 'development' ? 3600 : 43200;

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

// @route   GET api/users/me
// @desc    Get current user
// @access  Private / USER
// @body    username: String, password: String
// @params  -
router.get('/me', auth, async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findById(req.user.id)
      .select('-password')
      .populate('posts');

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Käyttäjätietoja ei löytynyt' }] });
    }
    delete user.password;
    user = user.toObject();
    user.posts = user.posts.filter(post => post.visible);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Virhe palvelimella');
  }
});

// @route   PUT api/users/me/socials
// @desc    Update user's socials
// @access  Private / USER
// @body    socials: Array
// @params  -
router.put('/me/socials', auth, async (req, res) => {
  const { socials } = req.body;
  const updatedSocials = {};
  updatedSocials.discord = socials.discord || '';
  updatedSocials.facebook = socials.facebook || '';
  updatedSocials.instagram = socials.instagram || '';
  updatedSocials.kik = socials.kik || '';
  updatedSocials.skype = socials.skype || '';
  updatedSocials.snapchat = socials.snapchat || '';
  updatedSocials.telegram = socials.telegram || '';
  updatedSocials.whatsapp = socials.whatsapp || '';
  try {
    await User.updateOne(
      { _id: req.user.id },
      { $set: { socials: updatedSocials } }
    );
    res.end();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Virhe palvelimella');
  }
});

// @route   PUT api/users/me/username
// @desc    Update user's username
// @access  Private / USER
// @body    username: String
// @params  -
router.put(
  '/me/username',
  [
    auth,
    check('newUsername', 'Anna vähintään 5-merkkinen käyttäjätunnus').isLength(
      5
    )
  ],
  async (req, res) => {
    console.log(req.body.newUsername);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { newUsername } = req.body;
    try {
      await User.updateOne(
        { _id: req.user.id },
        { $set: { username: newUsername } }
      );
      res.end();
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Virhe palvelimella');
    }
  }
);

// @route   PUT api/users/me/location
// @desc    Update user's location
// @access  Private / USER
// @body    [region: String], [city: String]
// @params  -
router.put('/me/location', auth, async (req, res) => {
  const { region, city } = req.body;
  try {
    await User.updateOne({ _id: req.user.id }, { $set: { region, city } });
    res.end();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Virhe palvelimella');
  }
});

// @route   PUT api/users/me/password
// @desc    Update user's password
// @access  Private / USER
// @body    newPassword: String, currentPassword: String
// @params  -
router.put(
  '/me/password',
  [
    auth,
    check('currentPassword', 'Anna nykyinen salasana')
      .not()
      .isEmpty(),
    check('newPassword', 'Anna vähintään 6-merkkinen uusi salasana').isLength(6)
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { currentPassword, newPassword } = req.body;
    try {
      const user = await User.findById(req.user.id);
      const passwordIsCorrect = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (!passwordIsCorrect) {
        return res.status(400).json({ errors: [{ msg: 'Väärä salasana' }] });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();
      res.end();
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Virhe palvelimella');
    }
  }
);

// @route   DELETE api/users/me
// @desc    Delete user and their posts
// @access  Private / USER
// @body    password: String
// @params  -
router.delete('/me', auth, async (req, res) => {
  try {
    await Promise.all([
      Post.deleteMany({ user: req.user.id }),
      User.findOneAndRemove({ _id: req.user.id })
    ]);
    res.end();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Virhe palvelimella');
  }
});

module.exports = router;
