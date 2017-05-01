var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  created_at: Date,
  updated_at: Date
});

var User = mongoose.model('User', userSchema);
module.exports = User;