var connect = require('./db');
var User = require('./models/user');
var Match = require('./models/match').model;
var Bet = require('./models/bet').model;
var mongoose = require('mongoose');


connect()
	.once('open', function() {
		seed();	
	});

function seed() {
	var person_id = mongoose.Types.ObjectId();
	var match_id = mongoose.Types.ObjectId();
	var bet_id = mongoose.Types.ObjectId();
	new User({
		_id: person_id,
		username: 'sorregot',
		password: '123',
		created_at: Date.now()
	}).save();



	var match = new Match({
		_id: match_id,
		name: "Champions",
		date: Date.now(),
		home: "Athletico de Madrid",
		away: "Real de Madrid",
		bets: [bet_id]
	});
	match.save();


	var bet = new Bet({
		_id: bet_id,
		user_id: person_id,
		match_id: match_id,
		value: 10,
		qty: 10,
		side: 'buy'
	});
	bet.save();
	console.log("Done");
	mongoose.connection.close(function () {
      console.log('Mongoose connection disconnected');
});
}