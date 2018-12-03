module.exports = {
  Query: {
    user(root, {id}, ctx) {
      return ctx.connector.user.fetchById(id);
    },
    users(root, {}, ctx) {
      return ctx.connector.user.fetchAll();
    },
    user1(root, {name}, ctx) {
      return ctx.connector.user.fetchByName(name);
    },
    dd(root, {}, ctx) {
      return 'dd';
    },
  },
  Mutation: {
    removeUser(root, {id}, ctx) {
      return ctx.connector.user.removeUser(id);
    }
  }
};