'use strict';

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}

let point = new Point(1, 2);

console.log(point.toString());

class A {
  constructor(props) {
    this.props = props;
  }

  test() {
    return this.props;
  }

}

let a = new A({a:1});
console.log(a.test());