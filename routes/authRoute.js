const express = require('express'); 
const router = express.router();
const Auth = require('../services/authService'); 

module.exports = (app, passport) => {
    app.use('/auth', router);

    router.post('/register', async (req, res, next) => {

        try {
            const data = req.params; 

            const response = await Auth.register(data);

            res.status(200).send(response);
        } catch (err) {
            next (err);
        }

    })

    router.post('/login', passport.authenticate('local', {failureRediret: 'login'}), async (req, res, next) => {
        try {
            const {  email, password } = data; 

            const response = await Auth.login({username: email, password}); 

            res.status(200).send(response); 
        } catch(err) {
            next (err); 
        }
    })
}