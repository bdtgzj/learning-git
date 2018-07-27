async function testAsync() {
    /**
     * 1. async 声明函数内有异步操作
     * 2. await 声明一个异步操作 (一般为 promise 对象，否则也会被自动转为 promise 对象)
     * 3. 等待异步操作完成，再执行下面的指令
     * 4. 异步操作返回值，赋值给变量
     */
    var a1 = await new Promise(function(resolve) {
        setTimeout(() => {resolve(1)}, 1000)
    })
    var a2 = await new Promise(function(resolve) {
        setTimeout(() => {resolve(2)}, 1000)
    })
    return a1 + a2
}

/**
 * 1. async 函数执行后立即返回 promise 对象
 * 2. async 函数 return 返回值会传递给 then 回调函数的参数，如无 return，则返回 undefined
 * 3. promise 对象状态改变条件：async 函数中所有同步异步操作完成、return、抛出错误。
 */
var p = testAsync().then(function(data) {
    console.log(data)
}).catch(function(err) {
    console.log(err)
})
console.log(p)