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
		.find({match_id: req.params.id, side:"buy"})
		.populate('user_id', 'username')
		.exec(function(err, buyBets) {
            Bet.find({match_id: req.params.id, side:"sell"})
                .populate('user_id', 'username')
                .exec(function(err, sellBets){
                Match
                    .findOne({_id: req.params.id})
                    .exec(function(err, match) {
                        res.send({
                            matchName: match.getMatchName(),
                            buyBets: buyBets,
                            sellBets: sellBets
                        });
                    });
            });
		});
});

app.post('/bets/place', function(req, res) {
    var side = req.body.side;
    var size = req.body.size;
    var price = req.body.price;
    var matchId = req.body.matchId;
    // we need to get user here (need auth system)
    User
        .findOne({}, function(err, user){
            new Bet({
                _id: mongoose.Types.ObjectId(),
                user_id: user._id,
                match_id: matchId,
                value: price,
                qty: size,
                side: side
            }).save(function() {
                res.send({status: 'saved'});
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

