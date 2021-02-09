const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ROLES = require('../config/userRoles');
const confirmUserRoles = require('../middleware/confirmUserRoles');
const User = require('../models/User');
const Notification = require('../models/Notification');

// @route   POST api/admin/notification
// @desc    Send a notification to all users
// @access  Private / MOD
// @body    text: String
// @params  -
router.post('/notification', [auth, confirmUserRoles.MOD], async (req, res) => {
  try {
    const notification = new Notification({ text: req.body.text });
    await notification.save();
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).send('Virhe palvelimella');
  }
});

module.exports = router;
