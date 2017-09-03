/**
 * Basic match engine for future bets
 */

var Side = require('./models/side');

function matchOrder(bet, allBets) {
    var bestBet = undefined;
    for(var i in allBets) {
        var oBet = allBets[i];
        if(bet.isOpositeBet(oBet)) {
            if(bet.matchPrice(oBet) && bet.matchQty(oBet)) {
                // we have a match
                if(bestBet === undefined) {
                    bestBet = oBet;
                } else {
                    bestBet = oBet.betterPrice(bestBet);
                }
            }
        }
    }

    if(bestBet !== undefined) {
        console.log(bet.betString() + ' x ' + bestBet.betString());
        // we matched the order, so now we fill both
        bet.oposite_bet = bestBet._id;
        bet.open = false;
        bestBet.oposite_bet = bet._id;
        bestBet.open = false;
    }
    return bestBet;
}

module.exports = matchOrder;