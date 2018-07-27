async function f() {
    // 同步代码错误，中断执行，抛出错误，promise 对象状态改变，catch 方法捕获错误。
    throw new Error('出错了1')
    // 异步代码错误，中断执行，抛出错误，promise 对象状态改变，catch 方法捕获错误。
    await new Promise(function (resolve, reject) {
        throw new Error('出错了2')
    })
    await Promise.reject('出错了3')

    return await Promise.resolve('完成了')
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))

async function f1() {
    // try catch 中只要有错误，就会终止 try catch 中其余代码的执行，但是 try catch 之外的代码还继续执行。
    try {
        throw new Error('出错了1')
        await new Promise(function (resolve, reject) {
            throw new Error('出错了2')
        })
    } catch (error) {
        console.log(error)
    }
    //
    await Promise.reject('出错了3').catch(err => console.log(err))
    return await Promise.resolve('完成了')
}

f1()
.then(v => console.log(v))
.catch(e => console.log(e))

console.log("async has returned promise.");