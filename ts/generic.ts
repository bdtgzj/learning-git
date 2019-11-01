// 函数仅能处理特定类型数据
function identity(arg: number): number {
  return console.log(arg);
}

// 函数能处理任意类型数据，但丢失了输入的数据类型信息。如输入 number，输出 any。
function identity(arg: any): any {
  return console.log(arg);
}

// 泛型函数（通用函数），能处理不同类型的数据，且不会丢失类型信息。
// Type Variable（类型变量），存放变量的类型，非变量的值。
// T 是一个类，封装输入的 arg 参数值，对外提供输入参数的「类型信息」和「值」。
function identity<T>(arg: T): T {
  return console.log(arg);
}

// 泛型函数调用，方法一
let output = identity<string>("myString");

// 泛型函数调用，方法二，常用，使用了类型推断，编译依据参数类型来，自动设置 T 为 string。
let output = identity("myString");
