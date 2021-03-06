'use strict';
var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/user');
var mongoose        = require('mongoose');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'username' :  username }, function(err, user) {
                // if there are any errors, return the error
                if (err) {
                    return done(err);
                }

                // check to see if theres already a user with that email
                if (user) {
                    // TODO maybe change this flash stuff by using angular
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {

                    // if there is no user with that email
                    // create the user
                    var newUser      = new User();

                    // set the user's local credentials
                    newUser.username = username;
                    newUser.password = newUser.generateHash(password);

                    // save the user
                    newUser.save(function(err) {
                        if (err) {
                            throw err;
                        }
                        return done(null, newUser);
                    });
                }
            });    
        });
    }));

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'username' :  username }, function(err, user) {
            console.log('starting authentication');
            // if there are any errors, return the error before anything else
            if (err) {
                console.log('first error');
                return done(err);
            }

            // if no user is found, return the message
            if (!user) {
                console.log('user not found');
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            }

            // if the user is found but the password is wrong
            if (!user.validPassword(password)) {
                console.log('invalid password');
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            }

            // all is well, return successful user
            console.log('login user: ' + username);
            return done(null, user);
        });

}));
}

// function createUser() {
//     var newUser      = new User();

//     // set the user's local credentials
//     newUser._id      = mongoose.Types.ObjectId();
//     newUser.username = '';
//     newUser.password = newUser.generateHash('');

//     // save the user
//     newUser.save(function(err) {
//         if (err) {
//             throw err;
//         }
//         console.log('user added');
//     });
// }

// createUser();