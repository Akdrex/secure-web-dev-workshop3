const LocalStrategy = require('passport-local')
const passport = require('passport')
const usersService = require('../users/user_service')
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new LocalStrategy(
    async function(username,password,done) {
      try {
        const user = await usersService.checkPassword(username, password)
        if (!user) { return done(null, false); }
        return done(null, user);
      } catch (err) {
        if (err) { return done(err); }
      }
    }
  ));