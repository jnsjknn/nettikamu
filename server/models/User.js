const mongoose = require('mongoose');
const ROLES = require('../config/userRoles');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  region: {
    type: String
  },
  city: {
    type: String
  },
  phone: {
    type: String,
    index: { unique: true, sparse: true }
  },
  socials: {
    discord: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    kik: { type: String },
    skype: { type: String },
    snapchat: { type: String },
    telegram: { type: String },
    whatsapp: { type: String }
  },
  role: {
    type: Number,
    default: ROLES.USER
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'post'
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', UserSchema);
