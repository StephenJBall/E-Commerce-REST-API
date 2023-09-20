const express = require('express');
const router = express.Router();
const Cart = require('../services/cartService'); 

module.exports = (app) => {

    app.use('/carts', router);

    router.get('/:cartId', async (req, res, next) => {
        try {
            const { id } = req.params; 

            const response = await Cart.getCart(id); 

            res.status(200).send(response);
        } catch(err) {
            next (err); 
        }
    })

    router.post('/:cartId/items', async (req, res, next) => {
        try {
            const data = req.params; 

            const response = await Cart.addItem(data);

            res.status(200).send(response); 
        } catch(err) {
            next (err);
        }
    })

    router.delete('/:cartId/items', async (req, res, next) => {
        try {
            const data = req.params;

            const response = await Cart.removeItem(data); 

            res.status(200).send(response);
        } catch(err) {
            next (err); 
        }
    })

    router.put('/:cartId/items/:cartItemId', async (req, res, next) => {
        try {
            const data = req.params; 

            const response = await Cart.updateItem(data); 

            res.status(200).send(response);
        } catch(err) {
            next (err);
        }
    })

    router.post('/:cartId/checkout', async (req, res, next) => {
        try {
            const { data } = req.params; 
            const { cartId, paymentInfo } = req.body; 

            const response = await Cart.checkout(cartId, data, paymentInfo); 

            res.status(200).send(response); 
        } catch(err) {
            next (err); 
        }
    })

}