const mongoose = require('mongoose');

const BugReportSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = BugReport = mongoose.model('bugReport', BugReportSchema);
