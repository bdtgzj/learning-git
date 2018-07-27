var assert = require('assert');

describe('Timer', function() {
  describe('#setTimtout()', function() {
    it('Test not timeout in 3000ms.', function(done) {
      this.timeout(3000);
      console.log('test start.');
      setTimeout(function(err) {
        console.log('test end.');
        if (err) done(err);
        else done();
      }, 2000);
    });
  });
});

describe('Timtout', function() {
  it('Test timetout in 2000ms.', function() {
    for (var i = 0; i < 2000000000; i++) {}
    console.log(i);
  });
});

// ./node_modules/.bin/mocha test/testTimtout.js