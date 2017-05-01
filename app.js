var express = require('express');
var bodyParser = require('body-parser');
var connect = require('./db');
var User = require('./models/user');
var Match = require('./models/match').model;

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

app.get('/show/bets', function(req, res) {
	Match.find({}, function(err, matches) {
		res.send(matches[0].bets);
	});
});

app.all('/*', function(req, res, next) {
    res.sendFile('./public/index.html', { root: __dirname });
});

// app.get('/users/search/:name', function(req, res) {
// 	var name = req.params.name
// 	console.log('here');
// 	User.find({}, function(err, users) {
// 	  if (err) throw err;
// 	  res.send(users);
// 	});
// });


// app.post('/users/new', function(req, res) {
// 	var id = mongoose.Types.ObjectId();
// 	console.log(id);
// 	new User({
// 		_id: id,
// 		username: req.body.name,
// 		password: req.body.password,
// 		created_at: Date.now()
// 	}).save(function(err) {
// 		if (err) throw err;
// 		res.send("hello " + req.body.name);
// 	});
// });



// app.get('/bets/new', function(req, res) {
// 	User.find({username: 'sorregot'}, function(err, users) {
// 		Match.find({}, function(err, matches) {
// 			matches[0].bets.push({
// 				_id: mongoose.Types.ObjectId(),
// 				user_id: users[0].id,
// 				value: 10,
// 				qty: 10,
// 				side: 'buy'
// 			});
// 			matches[0].save(function(err){
// 				if(err) throw err;
// 				res.send("Bet registered");
// 			})
// 		});
// 	});
// });


// app.get('/match/new' , function(req, res) {
// 	new Match({
// 		_id: mongoose.Types.ObjectId(),
// 		name: "Champions",
// 		date: Date.now(),
// 		home: "Athletico de Madrid",
// 		away: "Real de Madrid"
// 	}).save(function(err) {
// 		if(err) throw err;
// 		res.send("Match created!");
// 	})
// });

