const config = require('config');

let twilioSid,
  twilioToken,
  mongoURI,
  smtpURI,
  smtpPassword,
  infoEmail,
  formEmail;

if (process.env.NODE_ENV === 'production') {
  twilioSid = process.env.TWILIO_SID;
  twilioToken = process.env.TWILIO_TOKEN;
  mongoURI = process.env.MONGO_URI;
  smtpURI = process.env.SMTP_URI;
  smtpPassword = process.env.SMTP_PASSWORD;
  infoEmail = process.env.INFO_EMAIL;
  formEmail = process.env.FORM_EMAIL;
} else {
  twilioSid = config.get('twilioSid');
  twilioToken = config.get('twilioToken');
  mongoURI = config.get('mongoURI');
  smtpURI = config.get('smtpURI');
  smtpPassword = config.get('smtpPassword');
  infoEmail = config.get('infoEmail');
  formEmail = config.get('formEmail');
}

module.exports = {
  twilioSid,
  twilioToken,
  mongoURI,
  smtpURI,
  smtpPassword,
  infoEmail,
  formEmail
};
