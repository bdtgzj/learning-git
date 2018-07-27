var assert = require('assert');

describe('Test Async', function() {
  it('#Callback', function(done) {
    setTimeout(done, 200);
  });
  it('#Promise', function() {
    var p = new Promise(function(resolve, reject) {
      setTimeout(function() {
        assert.equal(1, 1, 'error');
        resolve();
      }, 200);
    });
    p.then(function() {
      console.log('end');
    });
    return p;
  });
});

// ./node_modules/.bin/mocha test/testAsync.js