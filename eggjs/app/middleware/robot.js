// curl http://localhost:7001/news -A "Baiduspider"

// options === app.config.robot
/*
module.exports = (options, app) => {
  return function* robotMiddleware(next) {
    const source = this.get('user-agent') || '';
    const match = options.ua.some(ua => ua.test(source));
    if (match) {
      this.status = 403;
      this.message = 'Go away, robot.';
    } else {
      yield next;
    }
  }
};
*/

module.exports = (options, app) => {
  return async function robotMiddleware(ctx, next) {
    const source = ctx.get('user-agent') || '';
    const match = options.ua.some(ua => ua.test(source));
    if (match) {
      ctx.status = 403;
      ctx.message = 'Go away, robot.';
    } else {
      await next();
    }
  }
};