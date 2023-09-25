const express = require('express'); 
const router = express.Router();
const { register, login } = require('../services/authService'); 
const passport = require('passport'); 


router.post('/register', async (req, res, next) => {
        console.log('beginning of register route'); 
        try {
            const data = req.body; 

            const response = await register(data);

            res.status(200).send(response);
            console.log('end of register route'); 
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


module.exports = router;