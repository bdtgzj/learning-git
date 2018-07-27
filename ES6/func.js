'use strict';

// 普通函数中的 this
function normal() {
  console.log(this);
}

normal();

(function() {
  normal();
})();

// 对象方法中的 this
var obj = {
  n: normal
};
obj.n();

// 构造函数中的 this
function Person() {
  this.name = 'bdtgzj';
  this.age = 18;
  this.setAge = function() {
    this.age = 8;
    console.log(this);
  }
  console.log(this);
}

var person = new Person();
person.setAge();

// 回调函数中的 this
setTimeout(function() {
  console.log(this);
}, 1000);

// 箭头函数中的 this
var af = () => console.log(this);
af();
function ArrowFunc() {
  this.af = () => {
    console.log(this);
  };
  setTimeout(() => {
    console.log(this);
  }, 2000);
}
var arrowFunc = new ArrowFunc();
arrowFunc.af();