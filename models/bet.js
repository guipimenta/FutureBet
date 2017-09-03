var mongoose = require('mongoose');
var Side = require('./side');
var Schema = mongoose.Schema;

var betSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, unique: true },
  user_id: {type: Schema.Types.ObjectId, required: true, ref:'User'},
  match_id: {type: Schema.Types.ObjectId, required: true, ref:'Match'},
  value: Number,
  qty: Number,
  side: String,
  filled_by: {type: Schema.Types.ObjectId, ref: 'User'},
  oposite_bet: {type: Schema.Types.ObjectId, ref: 'Bet'},
  open: Boolean
});

betSchema.methods.isOpositeBet = function(bet) {
    return bet.side !== this.side;
};

betSchema.methods.matchPrice = function(bet) {
    if(this.side === Side.buy) {
      console.log(bet.value + '<=' + this.value);
        if(bet.value <= this.value) {
            return true;
        }
    } else if(this.side === Side.sell) {
        if(bet.value >= this.value) {
            return true;
        }
    }
    return false;
};

betSchema.methods.matchQty = function(bet) {
    if(bet.qty >= this.qty) {
        return true;
    }
    return false;
}

betSchema.methods.betterPrice = function(bet) {
  if(bet.side === Side.buy) {
    return bet.value <= this.value ? this : bet;
  } else if(bet.side === Side.sell) {
    return bet.value >= this.value ? this : bet;
  }
}

betSchema.methods.betString = function() {
  return this.side + ':' + this.value + ':' + this.qty;
}

var Bet = mongoose.model('Bet', betSchema);

module.exports = {
	model: Bet,
	schema: betSchema
};