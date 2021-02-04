const config = require('config');
const axios = require('axios');

let twilioSid, twilioToken;
if (process.env.NODE_ENV !== 'development') {
  twilioSid = process.env.TWILIO_SID;
  twilioToken = process.env.TWILIO_TOKEN;
} else {
  twilioSid = config.get('twilioSid');
  twilioToken = config.get('twilioToken');
}
const client = require('twilio')(twilioSid, twilioToken);

const sendVerificationSMS = async to => {
  const res = await client.verify
    .services('VA9082f8dad6a635a20adb13327c5cb183')
    .verifications.create({
      to,
      channel: 'sms',
      locale: 'fi'
    });
  return res;
};

const checkVerificationCode = async (to, code) => {
  const res = await client.verify
    .services('VA9082f8dad6a635a20adb13327c5cb183')
    .verificationChecks.create({ to, code });
  return res;
};

module.exports = {
  send: phoneNumber => sendVerificationSMS(phoneNumber),
  check: (phoneNumber, verificationCode) =>
    checkVerificationCode(phoneNumber, verificationCode)
};
