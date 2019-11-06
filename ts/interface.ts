/**
 * 【类型检查原理】编译器检查「类型注解」 `{ label: string }`，并判断赋值者 `{size: 10, label: "Size 10 Object"}` 在形状（Shape 名称 + 类型）上是否匹配，无需完全匹配，无需按序匹配。
 * @param labeledObj
 */
function printLabel(labeledObj: { label: string }) {
  console.log(labeledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);

/**
 * 【使用接口描述形状（Shape）】无需显示让 myObj1 实现（implements）接口 LabeledValue。
 */
interface LabeledValue {
  label: string;
}

function printLabel1(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
}

let myObj1 = {size: 11, label: "Size 11 Object"};
printLabel1(myObj1);

/**
 * 【可选属性（Optional Properties）】在属性名后加问号。
 * 【作用 1】声明接口中的非必须属性。
 * 【作用 2】接口中不存在的属性，禁止使用，编译器静态检查时会报错。
 */
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    newSquare.color = config.color;
    // newSquare.color = config.clor; // Error: Property 'clor' does not exist on type 'SquareConfig'
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: "black"});
console.log(`${mySquare.color}`);

/**
 * 【只读属性（Readonly properties）】仅对象创建时能被修改。
 * 【ReadonlyArray<T>】TypeScript 自带的「只读泛型数组」，所有修改函数都被删除。
 * 【readonly vs const】变量使用 const，属性使用 readonly。
 */
interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20 }; // 对象字面量法赋值
// p1.x = 5; // error!

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
// ro[0] = 12; // error!
// ro.push(5); // error!
// ro.length = 100; // error!
// a = ro; // error!
a = ro as number[]; // 通过类型断言（Type Assertion）强制类型转换为普通数组。
console.log(a);

/**
 * 【过度属性检查（Excess Property Checks）】对象字面量（Object Literals）赋值或传参时，会被过度属性检查。即当「对象字面量」中含有「接口」中不存在的属性时，编译器会认为代码中可能存在 Bug，于是报错。
 * 【如何绕过过度属性检查？】1. 使用类型断言（Type Assertion）强制类型转换到接口类型。2. 提供接口中的所有属性数据，多提供数据编译器是不建议的。3. 使接口可以接受任意其他属性数据。4. 把「字面量对象」赋值给「变量」，编译器对「变量」不做「过度属性检查」，但「变量」中至少需要存在有一个接口中的属性。
 */
// let mySquare1 = createSquare({colour: "black", width: 100}); // error
let mySquare1 = createSquare({ colour: "black", width: 100 } as SquareConfig) // 1. Type Assertion
let mySquare2 = createSquare({color: "black", width: 100}); // 2. 提供所有属性数据
interface SquareConfig1 {
  color?: string;
  width?: number;
  [propName: string]: any; // 3. 接口可以接受任意其他属性数据，但不能是 color 和 width 属性。
}
let squareOptions = { colour: "black", width: 100 }; // 4. 编译器对「变量」不做「过度属性检查」
let mySquare3 = createSquare(squareOptions);

console.log(`${mySquare1.color} ${mySquare1.area}`);
console.log(`${mySquare2.color} ${mySquare2.area}`);
console.log(`${mySquare3.color} ${mySquare3.area}`);

/**
 * 【函数类型（Function Type）】接口中不仅可以声明「属性」（名称 + 类型），还可以声明「函数」（参数 + 返回类型），即接口可以描述「对象」的形状（Shape）。
 * 【函数类型检查】1. 参数名无需匹配；2. 参数类型、顺序需一一匹配；3. 返回类型需匹配；
 * 【函数值（Function Value）类型推断】赋值时，函数参数、返回类型可以不声明，编译器可以自动推断类型。
 */
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string):boolean {
    let result = source.search(subString);
    return result > -1;
}
mySearch = function(source, subString) { // 编译器可推断函数参数、返回类型。
  let result = source.search(subString);
  return result > -1;
};

console.log(`${mySearch('String Contain subString', 'subString')}`);

/**
 * 【可索引类型（Indexable Types）】指定「索引号」的数据类型，「索引值」的数据类型，以实现 `a[10]` 或 `a['daniel']` 的效果，并做类型检查。
 * 【索引号支持的数据类型】string 和 number。本质上 number 也会被转换成 string，即 `a[10]` 和 `a['10']` 本质都是后者。因此同一接口中可同时声明两种数据类型，但「索引值」数据类型必须遵循 string 声明的值。
 * 【索引值】支持联合（union）数据类型。`number | string`
 * 【Why】用来描述字典（Dictionary）（Key-Value）数据类型、数组数据类型，并可做类型检查。
 */
// 对象，给对象做类型检查
interface NumberOrStringDictionary {
  // [index: string]: number; // 如不使用联合类型，由于 name: string 不符合 [index: string]: number 的声明，编译器会报错。
  [index: string]: number | string;
  length: number;
  name: string;
}

let dictionary: NumberOrStringDictionary = {name: 'name', length: 1};
dictionary.length = 2;
console.log(`${dictionary.name} ${dictionary.length}`);

// 字典
interface MyDictionary {
  [index: string]: string;
}
let myDictionary: MyDictionary = {"a": "Alice", "b": "Bob"};
myDictionary['a'] = "Alice";
myDictionary.b = "Bob"
console.log(`${myDictionary.a} ${myDictionary.b}`);

// 只读数组
interface ReadonlyStringArray {
  readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];
// myArray[2] = "Mallory"; // error!
console.log(`${myArray[0]} ${myArray[1]}  ${myArray[2]}`);

/**
 * 【类实现接口（Class Types）】同 C#、Java 中的概念。接口中可声明属性、方法，一般为 public 属性、方法。
 * 【实例成员类型检查】类实现接口，仅类中实例成员会被对应到接口上做类型检查。
 * 【静态成员类型检查】构造函数（constructor）是静态成员，需在另外接口的 new 声明上做类型检查。
 */
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
  tick(): void;
}

class DigitalClock implements ClockInterface { // 实例成员 tick 被类型检查
  constructor(h: number, m: number) { }
  tick() {
      console.log("beep beep");
  }
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute);
}

let digital = createClock(DigitalClock, 12, 17); // 静态成员 constructor 被类型检查。
digital.tick();

/**
 * 【接口扩展接口（Extending Interfaces）】利于复用接口。一个接口可以扩展多个接口。
 */
interface Shape {
  color: string;
}
interface PenStroke {
  penWidth: number;
}
interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;

/**
* 【混合类型（Hybrid Types）】对象 + 函数 + 属性
*/
 interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = (function (start: number) { }) as Counter;
  counter.interval = 123;
  counter.reset = function () { };
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

/**
 * 【接口扩展类（Interfaces Extending Classes）】类中所有成员（含 private 和 protected）的声明都会被继承到接口，此时只能是「类本身」或「类子类」才能实现接口，因为接口中含有 private 和 protected 成员。
 * 【使用场景】在复杂的继承结构中，让类的代码仅能运行在子类中。
 */
class Control {
  private state: any;
}
interface SelectableControl extends Control {
  select(): void;
}

class TextBox extends Control {
  select() { }
}
// class Images implements SelectableControl { private state: any; select() { };} // error
