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
    var matchName = [];
    matchName[0] = this.name;
    matchName[1] = this.home + " x " + this.away;
	return matchName;
}


var Match = mongoose.model('Match', matchSchema);

module.exports = {
	model: Match,
	schema: matchSchema
};