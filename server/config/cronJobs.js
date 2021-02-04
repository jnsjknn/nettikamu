const { CronJob } = require('cron');
const Post = require('../models/Post');

const tick = new CronJob(
  '* * 4 * * *',
  () => {
    // asd
  },
  null,
  false,
  'Europe/Helsinki'
);

const startAll = () => {
  tick.start();
};

module.exports = { startAll };
