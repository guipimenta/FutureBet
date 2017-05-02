var express = require('express');
var bodyParser = require('body-parser');
var connect = require('./db');
var User = require('./models/user');
var Match = require('./models/match').model;
var Bet = require('./models/bet').model;

var mongoose = require('mongoose');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static('public'));
app.use('/static', express.static('bower_components'));


connect()
	.once('open', function() {
		app.listen(3000, function() {
			console.log('Express started at port 3000');
		});
	});

/**
 * Get all bets for a single match
 */
app.get('/bets/all/:id', function(req, res) {
	Bet
		.find({match_id: req.params.id})
		.populate('user_id', 'username')
		.exec(function(err, bets) {
			Match
				.findOne({_id: req.params.id})
				.exec(function(err, match) {
					res.send({
						matchName: match.getMatchName(),
						bets: bets
					});
				});
		});
});

/**
 * Fetches all matches from database
 */
app.get('/matches/all', function(req, res) {
	Match.find({}, function(err, matches) {
		res.send(matches);
	});
});

app.all('/*', function(req, res, next) {
    res.sendFile('./public/index.html', { root: __dirname });
});

