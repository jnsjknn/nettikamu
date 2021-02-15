const { CronJob } = require('cron');
const User = require('../models/User');

const date = new Date();
const daysToDeletion = 14;
const deletionDate = new Date(date.setDate(date.getDate() - daysToDeletion));

const cleanUpUserBase = new CronJob(
  '00 00 5 * * *',
  async () => {
    try {
      await User.deleteMany({
        role: 0,
        date: { $lt: deletionDate }
      });
      console.log('Old unverified users deleted');
    } catch (err) {
      console.error('Unable to delete old unverified users');
      console.error(err);
    }
  },
  null,
  false,
  'Europe/Helsinki'
);

const startAll = () => {
  cleanUpUserBase.start();
};

module.exports = { startAll };
