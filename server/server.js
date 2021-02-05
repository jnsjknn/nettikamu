const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;
const cronJobs = require('./config/cronJobs');
//cronJobs.startAll();
const secureConnection = require('./middleware/secureConnection');
connectDB();
var expressStaticGzip = require('express-static-gzip');

app.use(express.json({ extended: false }));

if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}
if (process.env.NODE_ENV === 'production') {
  app.use(secureConnection);
}

app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/users', require('./routes/users'));

if (['production', 'test'].includes(process.env.NODE_ENV)) {
  const buildPath = path.join(__dirname, '..', 'build');
  app.use(
    '/',
    expressStaticGzip(buildPath, {
      enableBrotli: true,
      orderPreference: ['br', 'gz']
    })
  );
}

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'), err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
