async function f() {
    // 构建 Promise 对象，setTimeout() 会立即运行，所以多个 Promise 对象会并行运行。
    var p1 = new Promise(function(resolve, reject) {
        setTimeout(() => {resolve(1)}, 3000)
    })
    var p2 = new Promise(function(resolve, reject) {
        setTimeout(() => {resolve(2)}, 3000)
    })
    // await 会暂停暂停代码继续执行，等待异步操作，但多异步操作并行运行后，等待时间就短了。
    var p1r = await p1
    var p2r = await p2
    return p1r + p2r
}

async function f1() {
    var p1 = new Promise(function(resolve, reject) {
        setTimeout(() => {resolve(1)}, 3000)
    })

    var p2 = new Promise(function(resolve, reject) {
        setTimeout(() => {resolve(2)}, 3000)
    })

    let [p1r, p2r] = await Promise.all([p1, p2])
    return p1r + p2r
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))

f1()
.then(v => console.log(v))
.catch(e => console.log(e))