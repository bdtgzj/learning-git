function* helloGenerator() {
  //
  console.log('used in expression: ' + (yield 1));
  //
  let a = yield 2
  console.log('used in assignment expression:', a);
  //
  console.log(helloGeneratorHelper(yield 3, yield 4));
  console.log("e");
  yield 'state1: hello';
  yield 'state2: generator';
  return 'state3: end';
}

function helloGeneratorHelper(a, b) {
  return a + b;
}

var g = helloGenerator(); // Generator { suspended }
// console.log(g.return('dd')); // {value: "dd", done: true}
console.log(g.next());
console.log(g.next(11)); // used in expression: 11
console.log(g.next());
console.log(g.next());
console.log(g.next()); // {value: "state1: hello", done: false}
console.log(g.next()); // {value: "state2: generator", done: false}
console.log(g.next()); // {value: "state3: end", done: true}
console.log(g.next()); // {value: undefined, done: true}
console.log('end');

function* gen() {
  yield 1;
  yield 2;
  yield 3;
  return 4;
};

var myIterable = {};
myIterable[Symbol.iterator] = gen

// [...myIterable] // [1, 2, 3]
for (let v of gen()) {
  console.log(v); // 1 2 3
}
console.log(Array.from(myIterable)); // [ 1, 2, 3 ]
let [a,b,c,d] = gen();
console.log(a + b + c + d); // 1 + 2 + 3 + undefined = NaN
