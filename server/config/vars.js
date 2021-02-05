const config = require('config');

let twilioSid, twilioToken, mongoURI;

if (process.env.NODE_ENV !== 'development') {
  twilioSid = process.env.TWILIO_SID;
  twilioToken = process.env.TWILIO_TOKEN;
  mongoURI = process.env.MONGO_URI;
} else {
  twilioSid = config.get('twilioSid');
  twilioToken = config.get('twilioToken');
  mongoURI = config.get('mongoURI');
}

module.exports = { twilioSid, twilioToken, mongoURI };
