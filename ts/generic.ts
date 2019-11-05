/**
 * Learning
 * https://www.typescriptlang.org/docs/handbook/generics.html
 */

 /**
  * 1. 【`T`】泛型类型，表示任意数据类型。
  * 1. 【`<T>`】泛型类型参数（Type Parameter），用于修饰函数、接口、类，表示泛型函数的参数、泛型接口的参数、泛型类的参数，保证函数、接口成员、类成员处理同一种数据类型。
  * 
  */


/**
 * 函数仅能处理特定类型数据
 * @param arg 
 */
function identity1(arg: number): number {
  return arg;
}
let r1 = identity1(1);
console.log(`${typeof r1}: ${r1}`);

/**
 * 函数能处理任意类型数据，但丢失了输入的数据类型信息。如输入 number，输出 any。
 * @param arg 
 */
function identity2(arg: any): any {
  return arg;
}
let r2 = identity2('2');
console.log(`${typeof r2}: ${r2}`);

/**
 * 1. 【泛型函数（Generic Function）（通用函数）】也是一个类型，用 `<T>` 区别普通函数。同样的算法，能处理不同类型数据，且不会丢失类型信息，达到了重用算法的目的。
 * 2. 【T】一种数据类型，即泛型类型，代表任意数据类型。本质是一个类（类也是类型），封装输入参数值和类型，对外提供输入参数的「类型信息」和「值」。
 * 3. 【Generic Type Variable（泛型类型变量）】代表任意数据类型，如不明确指明特定泛型类型，在变量上调用方法，会报编译时错误。
 * 4. 【Type Variable（类型变量）】存放变量的类型，非变量的值。
 * @param arg
 */
function identity3<T>(arg: T): T {
  return arg;
}

// 泛型函数调用，方法一
let _r3 = identity3<string>("3");

// 泛型函数调用，方法二，常用，使用了类型推断，编译依据参数类型来，自动设置 T 为 string。
let r3 = identity3("3");

console.log(`${typeof _r3}: ${_r3}`);
console.log(`${typeof r3}: ${r3}`);

/**
 * 泛型数组的 2 种写法
 * @param arg 
 */
function loggingIdentity1<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}

function loggingIdentity2<T>(arg: Array<T>): Array<T> {
  console.log(arg.length);  // Array has a .length, so no more error
  return arg;
}

loggingIdentity1([1, 2, 3]);
loggingIdentity2(['1', '2', '3', '4']);

/**
 * 【泛型函数类型（The type of generic functions）声明】3 种写法
 */
function identityType<T>(arg: T): T {
  return arg;
}

// 【写法 1】箭头函数写法，类似函数声明。
let myIdentityType1: <T>(arg: T) => T = identityType;
// 【写法 2】箭头函数写法，泛型类型名可以是自定义的，只要保持泛型类型变量的「数量」和「使用方法」一致即可。
let myIdentityType2: <U>(arg: U) => U = identityType;
// 【写法 3】对象字面量写法
let myIdentityType3: {<T>(arg: T): T} = identityType;

console.log(myIdentityType1('myIdentityType1'));
console.log(myIdentityType2('myIdentityType2'));
console.log(myIdentityType3('myIdentityType3'));

/**
 * 【泛型接口（generic interface）】接口中声明泛型函数，使用对象字面量写法。
 * 【Why】用接口封装泛型函数，使得泛型函数的声明变得简洁。
 */
interface GenericIdentityFn1 {
  <T>(arg: T): T;
}

let myIdentityType4: GenericIdentityFn1 = identityType;
console.log(myIdentityType4('myIdentityType4'));

/**
 * 【泛型接口（Generic Interface）】把泛型标记 `<T>` 移动到接口上，确保接口所有成员工作在相同类型上。接口中为非泛型函数签名（non-generic function signature）。
 * 【使用注意】需明确泛型接口使用哪种具体类型。
 */
interface GenericIdentityFn2<T> {
  (arg: T): T; // non-generic function signature
}

// 需要指定特定类型，如 number, string, any 等。
let myIdentityType5: GenericIdentityFn2<number> = identityType;
console.log(`myIdentityType5: ${myIdentityType5(5)}`);

function f(): void {
  console.log(`f: ${identity1(1)}`);
}
let myIdentityType6: GenericIdentityFn2<void> = f;
myIdentityType6();

/**
 * 【泛型类（Generic Class）】把类型参数 `<T>` 移动到接口上，确保接口所有成员工作在相同类型上。接口中为非泛型函数签名（non-generic function signature）。
 * 【使用注意】类实例成员才能使用类型参数 `<T>`，类静态成员不能使用。
 */
class GenericNumber<T> {
  zeroValue!: T;
  add!: (x: T, y: T) => T;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };

console.log(`Generic Class: ${myGenericNumber.add(myGenericNumber.zeroValue, 2)}`);

/**
 * 【泛型约束（Generic Constraints）】具有特定属性的的泛型类型；仅接受、处理具有特定属性的数据类型，而非所有数据类型；
 */
// 1. 【仅处理带有 length 属性的类型】使用接口描述约束，然后让泛型 T 继承（extends）接口。
interface Lengthwise { 
  length: number;
}

function loggingIdentity3<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);  // Now we know it has a .length property, so no more error
  return arg;
}

// loggingIdentity3(3);  // Error, number doesn't have a .length property
loggingIdentity3({length: 10, value: 3});

// 2. 【仅处理 K 为 T 的 Key 之一的类型】在「泛型约束」中使用「类型参数」，让输入的两个数据产生关系。
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
// getProperty(x, "m"); // error

// 3. 【仅处理 class 类型】相当于工厂方法。
function create<T>(c: {new(): T; }): T {
  return new c();
}

