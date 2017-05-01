var express = require('express');
var bodyParser = require('body-parser');
var connect = require('./db');
var User = require('./models/user');
var Game = require('./models/game').model;

var mongoose = require('mongoose');

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/', express.static('public'));
app.use('/static', express.static('bower_components'));


connect()
	.once('open', function() {
		app.listen(3000, function() {
			console.log('Express started at port 3000');
		});
	});


app.get('/users/search/:name', function(req, res) {
	var name = req.params.name
	console.log('here');
	User.find({}, function(err, users) {
	  if (err) throw err;
	  res.send(users);
	});
});


app.post('/users/new', function(req, res) {
	var id = mongoose.Types.ObjectId();
	console.log(id);
	new User({
		_id: id,
		username: req.body.name,
		password: req.body.password,
		created_at: Date.now()
	}).save(function(err) {
		if (err) throw err;
		res.send("hello " + req.body.name);
	});
});



app.get('/bets/new', function(req, res) {
	User.find({username: 'sorregot'}, function(err, users) {
		console.log(users);
		Game.find({}, function(err, games) {
			users[0].bets.push({
				_id: mongoose.Types.ObjectId(),
				game: games[0],
				value: 10,
				qty: 10,
				side: 'buy'
			});
			users[0].save(function(err){
				res.send("ok");
			});
		});
	});
});

app.get('/bets', function(req, res) {
	User.find({username: 'sorregot'}, function(err, users) {
		res.send(users[0].bets);
	});
});


app.get('/games/new' , function(req, res) {
	new Game({
		_id: mongoose.Types.ObjectId(),
		name: "Champions",
		date: Date.now(),
		home: "Athletico de Madrid",
		away: "Real de Madrid"
	}).save(function(err) {
		if(err) throw err;
		res.send("Game created!");
	})
});

