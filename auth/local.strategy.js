const passport = require('passport')
const LocalStrategy = require('passport-local')
const usersService = require('../users/user_service')

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new LocalStrategy(
    async function(username,password,done) {
        //session: false
        try {
            const user = await usersService.checkPassword(username, password)
            if (!user) { return done(null, false); }
            return done(null, user);
        } catch (err) {
            if (err) { return done(err); }
        }
    }
));