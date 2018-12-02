const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        this.ctx.body = "Hello Egg!";
    }
}

module.exports = HomeController;