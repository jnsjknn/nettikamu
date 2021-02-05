const axios = require('axios');
const { twilioSid, twilioToken } = require('./vars');
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
