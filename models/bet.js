var mongoose = require('mongoose');
var gameSchema = require('./game').schema;
var Schema = mongoose.Schema;

var betSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, unique: true },
  game: gameSchema,
  value: Number,
  qty: Number,
  side: String
});

var Bet = mongoose.model('Bet', betSchema);

module.exports = {
	model: Bet,
	schema: betSchema
};