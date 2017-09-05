var express         = require('express');
var bodyParser      = require('body-parser');
var connect         = require('./db');
var User            = require('./models/user');
var Match           = require('./models/match').model;
var Bet             = require('./models/bet').model;
var Side            = require('./models/side');
var MatchEngine     = require('./machengine');
var expressLogging  = require('express-logging');
var logger          = require('logops');
var mongoose        = require('mongoose');

// authentication
var passport        = require('passport');
var flash           = require('connect-flash');
var session         = require('express-session');
var cookieParser    = require('cookie-parser');

var app = express();

// authentication
require('./config/passport')(passport); // pass passport for configuration


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static('public'));
app.use('/static', express.static('bower_components'));
app.use(expressLogging(logger));

// authentication
app.use(cookieParser()); // read cookies (needed for auth)
// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

connect()
	.once('open', function() {
		app.listen(3000, function() {
			console.log('Express started at port 3000');
		});
	});




// =====================================
// HOME PAGE
// =====================================

require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.get('/login', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.sendFile('./public/login.html', { root: __dirname});
});

app.all('/*', function(req, res, next) {
    res.sendFile('./public/index.html', { root: __dirname});
});


