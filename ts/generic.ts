/**
 * Learning
 * https://www.typescriptlang.org/docs/handbook/generics.html
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
 * 1. 【泛型函数（通用函数）】也是一个类型，用 `<T>` 区别普通函数。同样的算法，能处理不同类型数据，且不会丢失类型信息，达到了重用算法的目的。
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
 * 【泛型函数类型（The type of generic functions）】3 种写法
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

/**
 * 【泛型接口（generic interface）】接口中声明泛型函数，使用对象字面量写法。
 */
interface GenericIdentityFn1 {
  <T>(arg: T): T;
}

let myIdentityType4: GenericIdentityFn1 = identityType;

/**
 * 【泛型接口（generic interface）】在「泛型接口」上显示「泛型函数」中的「泛型参数」，目的是让泛型接口使用者知晓使用的数据类型？
 */
interface GenericIdentityFn2<T> {
  (arg: T): T;
}

// 需要指定特定泛型类型，如 number
let myIdentityType5: GenericIdentityFn2<number> = identityType;

/**
 * 泛型类
 */


/**
 * 不能创建泛型枚举类型（generic enums）、泛型命名空间（generic namespace）
 */
