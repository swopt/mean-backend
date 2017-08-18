var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../model/user');
var config = require('../config/authconfig');
var GoogleStrategy = require('passport-google-oauth2').Strategy;

module.exports = function(passport) {
     var  opts = {};
    opts.secretOrKey =  config.secret;
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    passport.use(new JwtStrategy(opts, function(jwt_payload, done){
        return User.find({id: jwt_payload.id}, function(err, user){
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    }));

    passport.use(new GoogleStrategy({
            clientID: config.google.clientID,
            clientSecret: config.google.clientSecret,
            callbackURL: config.google.callbackURL,
            scope: config.google.scope
        },
        function (accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }
    ));

    passport.serializeUser (function(user,done){
        done (null,user);
    });

    passport.deserializeUser (function(user,done){
        done (null,user);
    });
}
