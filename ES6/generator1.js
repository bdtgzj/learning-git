function async_func1() {
    return 1;
}
function async_func2() {
    return 2;
}
function async_func3() {
    return 3;
}

function* generator() {
    let v1 = yield async_func1("hello world") // 1
    let v2 = yield async_func2("what's up?") // 2
    let v3 = yield async_func3("oh ,friend!") // 3
    // todo something
    console.log(v1 + v2 + v3)
}

var g = generator()
let r1 = g.next() // {value: "1", done: false}
let r2 = g.next(r1.value) // {value: "2", done: false}
let r3 = g.next(r2.value) // {value: "3", done: false}
g.next(r3.value)