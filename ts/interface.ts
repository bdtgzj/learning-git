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
 * 【作用 1】
 * 【作用 2】
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
