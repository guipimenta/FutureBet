var User            = require('../models/user');
var Match           = require('../models/match').model;
var Bet             = require('../models/bet').model;
var Side            = require('../models/side');
var MatchEngine     = require('../machengine');

module.exports = function(app, passport) {



    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    // app.get('/login', function(req, res) {

    //     // render the page and pass in any flash data if it exists
    //     res.render('login.ejs', { message: req.flash('loginMessage') }); 
    // });

    // process the login form
    // app.post('/login', do all our passport stuff here);


    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup'  // redirect back to the signup page if there is an error
    }));

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/matches', // redirect to the secure profile section
        failureRedirect : 'login'    // redirect back to the signup page if there is an error
    }));

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // =====================================
    // app routes
    // =====================================
    app.get('/bets/all/:id', isLoggedIn, function(req, res) {
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

    app.post('/bets/place', isLoggedIn, function(req, res) {
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
    app.get('/matches/all', isLoggedIn, function(req, res) {
        Match.find({}, function(err, matches) {
            res.send(matches);
        });
    });

};

// ======================================
// some util functions
// ======================================

function getAllBets(processResults) {
    return Bet.find({}, function(err, matches) {
        processResults(matches);
    });
}


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('user not logged in');
    // if they aren't redirect them to the home page
    res.redirect('/*');
}
