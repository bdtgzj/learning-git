const DataLoader = require('dataloader');

class UserConnector {

  constructor(ctx) {
    this.ctx = ctx;
    this.load = new DataLoader(this.fetch.bind(this));
  }

  fetch(id) {
    const user = this.ctx.service.user;
    return new Promise(function(resolve, reject) {
      const users = user.getById(id);
      resolve(users);
    });
  }

  fetchById(id) {
    return this.loader.load(id)
  }

  fetchAll() {
    let users = this.ctx.service.user.getAll();
    return users;
  }

  removeOne(id) {
    let user = this.ctx.service.user.removeOne(id)
    return user
  }

}

module.exports = UserConnector