var Promise = require('appoint')
var p = new Promise((resolve) => {
    setTimeout(() => {
        resolve('hello appoint')
    }, 1000)
})

p.then(function onSuccess(data) {
    console.log(data)
    console.dir(p, { depth: 10 })
    return 1
})
.then(function onSuccess(data) {
    console.log(data)
    console.dir(p, { depth: 10 })
})

var a = p.then(function onSuccess(data) {
    console.log(data)
    console.dir(p, { depth: 10 })
})
.catch(function onError(err) {
    console.log(err)
})

var b = p.catch(function onError(err) {
    console.log(err)
})

var c = p.catch(function onError(err) {
    console.log(err)
})

console.dir(p, { depth: 10 })
console.log(a === p.queue[1].promise.queue[0].promise)
console.log(b === p.queue[2].promise)