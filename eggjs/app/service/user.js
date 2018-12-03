const Service = require('egg').Service;

class UserService extends Service {

  async getById(id) {
    return this.ctx.model.User.findOne({_id: id});
  }

  async getAll() {
    return this.ctx.model.User.find();
  }

  async create(user) {
    this.ctx.model.User.create(user);
  }

  async updateOne(id, user) {
    this.ctx.model.User.findOneAndUpdate({_id: id}, {$set: user}, {new: true});
  }

  async removeOne(id) {
    this.ctx.model.User.remove({_id: id});
  }

}

module.exports = UserService;