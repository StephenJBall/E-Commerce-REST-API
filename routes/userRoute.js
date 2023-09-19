const express = require('express');
const router = express.router(); 
const User = require('../services/userService'); 

module.exports = (app) => {
    
    app.use('/users', router); 

    router.get('/:userId', async (req, res, next) => {

        try {
            const userId = req.params; 

            const response = await User.getUser({ id: userId });
            
            res.status(200).send(response); 
        } catch(err) {
            next(err); 
        }

    }); 

    router.put('/:userId', async (req, res, next) => {

        try {
            const data = req.params; 

            const response = await User.updateUser(data); 

            res.status(200).send(response); 
        } catch(err) {
            next(err); 
        }
    })

}