var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var betSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, unique: true },
  user_id: {type: Schema.Types.ObjectId, required: true, ref:'User'},
  match_id: {type: Schema.Types.ObjectId, required: true, ref:'Match'},
  value: Number,
  qty: Number,
  side: String,
  filled_by: {type: Schema.Types.ObjectId, ref: 'User'}
});

var Bet = mongoose.model('Bet', betSchema);

module.exports = {
	model: Bet,
	schema: betSchema
};