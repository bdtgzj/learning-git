const Koa = require('koa');
const app = new Koa();

// 普通函数
app.use((ctx, next) => {
  const start = new Date();
  return next().then(() => {
    const between = new Date() - start;
    ctx.set('X-Response-Time', `${between}ms`);
    ctx.body += `CommonFunction: ${between}ms\n`;
  });
});

// Generator 函数
app.use(function* (next) {
  const start = new Date();
  yield next;
  const between = new Date() - start;
  this.body += `GeneratorFunction: ${between}ms\n`;
});

// Async 函数
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const between = new Date() - start;
  ctx.body = `${ctx.method} ${ctx.url}\nAsyncFunction: ${between}ms\n`;
});

app.listen(3000);
// curl -ivL http://localhost:3000