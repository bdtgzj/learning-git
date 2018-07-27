var p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('resolve value');
    }, 1000);
    setTimeout(() => {
        reject('reject error');
    }, 1000);
});

var a = p.then(function onSuccess(data) {
    console.log(data);
});

p.then(function onSuccess(data) {
    console.log(data);
    return 1;
})
.then(function onSuccess(data) {
    console.log(data);
});

var b = p.catch(function onError(err) {
    console.log(err);
});

console.dir(p, { depth: 10 });
//console.log(a === p.queue[0].promise);
//console.log(b === p.queue[1].promise);