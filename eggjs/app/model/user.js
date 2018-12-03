module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    username: { type: String },
    password: { type: String },
    age: { type:  Number}
  });

  return mongoose.model('User', UserSchema);
};

// use db_eggjs;
// db.users.save({username: 'admin', password: 'admin', age: 1});