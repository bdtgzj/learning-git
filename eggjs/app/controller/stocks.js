const Controller = require('egg').Controller;

class StockController extends Controller {
  async list() {
    const ctx = this.ctx;
    const stocks = await ctx.service.stocks.list();
    await ctx.render('stocks/list.tpl', { stocks: stocks });
  }
}

module.exports = StockController;