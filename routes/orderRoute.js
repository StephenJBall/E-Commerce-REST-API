const express = require('express');
const router = express.Router();
const Order = require('../services/orderService'); 

module.exports = (app) => {

    app.use('/orders', router); 

    router.get('/', async (req, res, next) => {

        try {
            const { id } = req.user;

            const response = await Order.getOrder(id); 

            res.status(200).send(response); 
        } catch(err) {
            next (err);
        }

    })

    router.get('/:orderId', async (req, res, next) => {

        try  {
            const { orderId } = req.params;

            const response = await Order.getOrder(orderId); 

            res.status(200).send(response);
        } catch(err) {
            next (err);
        }

    })

    router.get('/:userId', async (req, res, next) => { 
        
        try {

            const { userId } = req.user;

            const response = await Order.getOrderByUser(userId);

            res.status(200).send(response);
        } catch(err) {
            next (err);
        }
    })

}