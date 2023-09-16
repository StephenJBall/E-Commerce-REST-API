const passport = require('passport'); 
const LocalStrategy = require('passport-local'); 
const { register, login } = require('../services/authService'); 

module.exports = (app) => {
    
    app.use(passport.initialize()); 
    app.use(passport.session()); 

    passport.serializeUser((user, done => {
        done(null, user.id); 
    })); 

    passport.deserializeUser((id, done => {
        done(null, { id }); 
    }))

    passport.use(new LocalStrategy(
        async (username, password, done) => {
            try {
                const user = await login({ email: username, password }); 
                return done(user);
            } catch(err) {
                return done(err); 
            }
        }
    ))
}