// grab the things we need
var mongoose = require('mongoose');
var betSchema = require('./bet').schema;

var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  bets: [betSchema],
  created_at: Date,
  updated_at: Date
});



// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;