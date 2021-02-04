const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  text: {
    type: String,
    required: true
  },
  visible: {
    type: Boolean,
    default: true
  },
  age: {
    type: Number,
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
  discord: { type: String },
  facebook: { type: String },
  instagram: { type: String },
  kik: { type: String },
  skype: { type: String },
  snapchat: { type: String },
  telegram: { type: String },
  whatsapp: { type: String },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('post', PostSchema);
