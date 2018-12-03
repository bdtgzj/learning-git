const DataLoader = require('dataloader');

class UserConnector {

  constructor(ctx) {
    this.ctx = ctx;
    this.loader = new DataLoader(this.fetch.bind(this));
  }

  fetch(id) {
    return this.ctx.service.user.getById(id);
    /*
    return new Promise(function(resolve, reject) {
      const users = user.getById(id);
      resolve(users);
    });
    */
  }

  fetchById(id) {
    return this.loader.load(id);
  }

  fetchAll() {
    let users = this.ctx.service.user.getAll();
    return users;
  }

  async fetchByName(name) {
    return await this.ctx.service.user.getByName(name);
  }

  removeOne(id) {
    this.ctx.service.user.removeOne(id)
  }

}

module.exports = UserConnector