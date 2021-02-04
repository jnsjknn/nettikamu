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

app.use(express.json({ extended: false }));

if (process.env.NODE_ENV !== 'development') {
  app.use(secureConnection);
  const buildPath = path.join(__dirname, '..', 'build');
  app.use(express.static(buildPath));
} else {
  app.use(cors());
}

console.log(`TODO
- Translate Cookie Policy
- Optimize
- Refactor
- SEO
-- Fix h1-h5 tags
`);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/users', require('./routes/users'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
