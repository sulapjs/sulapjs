const Example = require('../models/EXAMPLE');

module.exports = function(done) {
  if (process.env.NODE_ENV === 'test') {
    Example
      .deleteMany({})
      .then(function() {
        done();
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
