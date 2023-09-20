const express = require('express'); 
const router = express.Router();
const { register, login } = require('../services/authService'); 

module.exports = (app, passport) => {
    app.use('/auth', router);

    router.post('/register', async (req, res, next) => {

        try {
            const data = req.params; 

            const response = await register(data);

            res.status(200).send(response);
        } catch (err) {
            next (err);
        }

    })

    router.post('/login', passport.authenticate('local'), async (req, res, next) => {
        try {
            const {  email, password } = data; 

            const response = await login({username: email, password}); 

            res.status(200).send(response); 
        } catch(err) {
            next (err); 
        }
    });
}