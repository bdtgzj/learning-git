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
 * 【过度属性检查（Excess Property Checks）】对象字面量（Object Literals）赋值或传参时，会被过度属性检查。即当的「对象字面量」中含有「接口」中不存在的属性时，编译器会认为代码中可能存在 Bud，所以会报错。
 */
let mySquare1 = createSquare({color: "black", width: 100});
// let mySquare1 = createSquare({colour: "black", width: 100}); // error

console.log(`${mySquare1.color} ${mySquare1.area}`);