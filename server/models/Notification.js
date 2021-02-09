const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Notification = mongoose.model(
  'notification',
  NotificationSchema
);
