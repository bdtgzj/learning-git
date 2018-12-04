const Service = require('egg').Service;
const { Types } = require('mongoose');

class UserService extends Service {

  async getByIds(ids) {
    return await this.ctx.model.User.find({_id: {$in: ids}});
  }

  async getById(id) {
    return await this.ctx.model.User.findOne({_id: id});
  }

  async getByName(name) {
    return await this.ctx.model.User.findOne({username: name});
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