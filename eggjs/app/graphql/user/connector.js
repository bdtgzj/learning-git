const DataLoader = require('dataloader');

class UserConnector {

  constructor(ctx) {
    this.ctx = ctx;
    this.loader = new DataLoader(this.fetch.bind(this));
  }

  fetch(ids) {
    // return this.ctx.service.user.getById(id);
    // DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>
    const user = this.ctx.service.user;
    return new Promise(function(resolve, reject) {
      const users = user.getByIds(ids);
      resolve(users);
    });
  }

  fetchByIds(ids) {
    return this.loader.loadMany(ids);
  }

  fetchById(id) {
    return this.loader.load(id);
  }

  fetchAll() {
    let users = this.ctx.service.user.getAll();
    return users;
  }

  fetchByName(name) {
    return this.ctx.service.user.getByName(name);
  }

  removeOne(id) {
    this.ctx.service.user.removeOne(id)
  }

}

module.exports = UserConnector