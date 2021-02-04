const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const confirmUserRoles = require('../middleware/confirmUserRoles');
const { check, validationResult } = require('express-validator');
const { getAge, toMongoQuery, censorSocials } = require('../utils');
const ROLES = require('../config/userRoles');
const User = require('../models/User');
const Post = require('../models/Post');
const BugReport = require('../models/BugReport');

// @route   POST api/posts/bugreport
// @desc    Send a bug report
// @access  Public
// @body    text: String
// @params  -
router.post(
  '/bugreport',
  check('text', 'Kirjoita ilmoitusteksti').isLength({ min: 1 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const bugReport = new BugReport({ text: req.body.text });
      await bugReport.save();
      res.end();
    } catch (err) {
      console.error(err);
      res.status(500).send('Virhe palvelimella');
    }
  }
);

// @route   POST api/posts/create
// @desc    Create a post
// @access  Private / VERIFIED
// @body    text: String
// @params  -
router.post(
  '/create',
  [
    auth,
    confirmUserRoles.VERIFIED,
    check('text', 'Kirjoita vähintään 20-merkkinen teksti').isLength(20)
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = req.user;
      if (process.env.NODE_ENV !== 'development') {
        const today = new Date();
        const yesterday = new Date(today.setDate(today.getDate() - 1));
        const posts = await Post.find({
          user: user.id,
          date: { $gt: yesterday }
        });
        if (posts.length > 0) {
          return res.status(403).json({
            errors: [
              { msg: 'Voit julkaista vain yhden ilmoituksen vuorokaudessa!' }
            ]
          });
        }
      }
      const socialsForPost = { ...user.toObject().socials };
      for (const [social, username] of Object.entries(socialsForPost)) {
        if (!username) {
          delete socialsForPost[social];
        }
      }
      const location = {};
      if (user.region) location.region = user.region;
      if (user.city) location.city = user.city;

      const post = new Post({
        user: user.id,
        text: req.body.text,
        gender: user.gender,
        age: getAge(user.dateOfBirth),
        ...socialsForPost,
        ...location
      });
      user.posts.push(post.id);
      await Promise.all([post.save(), user.save()]);
      res.json(post);
    } catch (err) {
      console.error(err);
      res.status(500).send('Virhe palvelimella');
    }
  }
);

// @route    GET api/posts
// @desc     Query posts
// @access   Public
// @body    [query: Object, page: Number]
// @params  -
router.post('/', async (req, res) => {
  try {
    const query = toMongoQuery(req.body.query);
    const page = req.body.page > 1 ? req.body.page : 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const [posts, count] = await Promise.all([
      Post.find(query)
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      Post.countDocuments(query)
    ]);
    res.json({
      posts: censorSocials(posts),
      pages: Math.ceil(count / limit),
      page
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/posts/:postId
// @desc    Get a post by ID
// @access  Private / USER
// @body    -
// @params  postId
router.get('/:postId', [auth, confirmUserRoles.USER], async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({
        errors: [{ msg: `Tunnisteella ${req.params.id} ei löydy ilmoitusta` }]
      });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Virhe palvelimella');
  }
});

// @route   DELETE api/posts/:postId
// @desc    Delete a post
// @access  Private / VERIFIED
// @body    -
// @params  postId
router.delete(
  '/:postId',
  [auth, confirmUserRoles.VERIFIED],
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);
      if (!post) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Ilmoitusta ei löytynyt' }] });
      }
      if (post.user.toString() !== req.user.id) {
        return res.status(403).json({
          errors: [{ msg: 'Ei valtuuksia ilmoituksen poistoon' }]
        });
      }
      const user = await User.findById(req.user.id);
      const postIndex = user.posts.indexOf(req.params.postId);
      if (postIndex > -1) {
        user.posts.splice(postIndex, 1);
        await user.save();
      }
      post.visible = false;
      await post.save();
      res.json({ msg: 'Ilmoitus poistettu' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Virhe palvelimella');
    }
  }
);

module.exports = router;
