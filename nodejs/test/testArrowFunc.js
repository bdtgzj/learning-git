var assert = require('assert');

describe('Test Arrow Function', () => {
  it('Can\'t reference context of mocha.', () => {
    this.timeout(1000);
    assert.ok(true);
  });
});

// ./node_modules/.bin/mocha test/testArrowFunc.js