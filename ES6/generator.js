function* helloGenerator() {
  yield 'state1: hello';
  yield 'state2: generator';
  return 'state3: end';
}

var hg = helloGenerator();
