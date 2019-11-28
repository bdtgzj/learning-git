import f from './es6.js';

test('test function f', () => {
  expect(f()).toMatch(/f/);
});