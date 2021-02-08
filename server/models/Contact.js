const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Contact = mongoose.model('contact', ContactSchema);
