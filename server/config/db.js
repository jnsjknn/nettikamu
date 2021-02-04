const mongoose = require('mongoose');
const config = require('config');

let rawMongoURI;
if (process.env.NODE_ENV !== 'development') {
  rawMongoURI = process.env.MONGO_URI;
} else {
  rawMongoURI = config.get('mongoURI');
}

const connectDB = async () => {
  let mongoURI = rawMongoURI;
  const mode = process.env.NODE_ENV || 'production';
  if (mode === 'production') {
    mongoURI = rawMongoURI.replace('development', 'production');
  }

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    console.log(`Connected to ${mode} database`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
