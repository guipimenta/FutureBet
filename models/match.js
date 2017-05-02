var mongoose = require('mongoose');
var betSchema = require('./bet').schema;
var Schema = mongoose.Schema;


var matchSchema = new Schema({
	_id: { type: Schema.Types.ObjectId, required: true, unique: true },
	name: String,
	date: Date,
	home: String,
	away: String,
	bets: [{type: Schema.Types.ObjectId, ref:'Bet'}]
});

matchSchema.methods.getMatchName = function() {
	return this.name + " - " + this.home + " x " + this.away;
}

// the schema is useless so far
// we need to create a model using it
var Match = mongoose.model('Match', matchSchema);

module.exports = {
	model: Match,
	schema: matchSchema
};