var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function connect() {
	mongoose.connect('mongodb://localhost/test');
	return mongoose.connection;
}

module.exports = connect;