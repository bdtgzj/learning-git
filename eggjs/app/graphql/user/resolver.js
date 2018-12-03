module.exports = {
  Query: {
    user(root, {id}, ctx) {
      return ctx.connector.user.fetchById(id);
    },
    users(root, {}, ctx) {
      return ctx.connector.user.fetchAll();
    }
  },
  Mutation: {
    removeUser(root, {id}, ctx) {
      return ctx.connector.user.removeUser(id);
    }
  }
};