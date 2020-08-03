const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

function host() {
  // if (process.env.PRODUCTION == 'true') {
  // }
  // return "mongodb://localhost/db-atlasflix";
  return "mongodb://heroku_r1t7bkpk:316me9gmnrto21ltppn2v92gs@ds043358.mlab.com:43358/heroku_r1t7bkpk";
}

mongoose.connect(host(), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

module.exports = mongoose;
