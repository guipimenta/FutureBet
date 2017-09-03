var express = require('express');
var bodyParser = require('body-parser');
var connect = require('./db');
var User = require('./models/user');
var Match = require('./models/match').model;
var Bet = require('./models/bet').model;
var Side = require('./models/side');
var MatchEngine = require('./machengine');
var expressLogging = require('express-logging');
var logger = require('logops');
var mongoose = require('mongoose');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static('public'));
app.use('/static', express.static('bower_components'));
app.use(expressLogging(logger));

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
		.find({match_id: req.params.id, side: Side.buy, open:true})
		.populate('user_id', 'username')
		.exec(function(err, buyBets) {
            Bet.find({match_id: req.params.id, side: Side.sell, open:true})
                .populate('user_id', 'username')
                .exec(function(err, sellBets){
                Match
                    .findOne({_id: req.params.id})
                    .exec(function(err, match) {
                        res.send({
                            matchName: match.getMatchName(),
                            sellBets: sellBets,
                            buyBets: buyBets
                        });
                    });
            });
		});
});

function merge(merged, toMerge, idx) {
	for(var field in toMerge) {
		merged[idx + field] = toMerge[field];
	}
}

app.post('/bets/place', function(req, res) {
    var side = req.body.side;
    var size = req.body.size;
    var price = req.body.price;
    var matchId = req.body.matchId;
    //TODO need to get user
    User
        .findOne({}, function(err, user) {
            bet = new Bet({
                _id: mongoose.Types.ObjectId(),
                user_id: user._id,
                match_id: matchId,
                value: price,
                qty: size,
                side: side,
                open: true // all bets are open unless matched
            });
            getAllBets(function(results) {
                var oBet = MatchEngine(bet, results);
                var logText = oBet !== undefined ? "Order matched and filled" : "Order on the book";
                bet.save(function() {
                    if(oBet !== undefined) {
                        oBet.save(function() {
                            res.send({status: 'filled'});
                        });
                    } else {
                        res.send({status: 'on the book'});
                    }
                    //TODO alert if filled
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


// ======================================
// some util functions
// ======================================

function getAllBets(processResults) {
    return Bet.find({}, function(err, matches) {
        processResults(matches);
    });
}


