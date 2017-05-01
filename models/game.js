var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var gameSchema = new Schema({
	_id: { type: Schema.Types.ObjectId, required: true, unique: true },
	name: String,
	date: Date,
	home: String,
	away: String
});

// the schema is useless so far
// we need to create a model using it
var Game = mongoose.model('Game', gameSchema);

module.exports = {
	model: Game,
	schema: gameSchema
};