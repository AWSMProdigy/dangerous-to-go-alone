const mongoose = require('mongoose');

console.log(process.env.MONGODB_URI);

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/3001',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    promiseLibrary: global.Promise
  }
);

module.exports = mongoose.connection;
