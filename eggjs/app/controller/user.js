const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const users = await this.service.user.getAll();
    await this.ctx.render('user/index.tpl', {users: users});
  }
}

module.exports = UserController;