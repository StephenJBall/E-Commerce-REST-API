const express = require('express');
const router = express.Router();
const CartService = require('../services/cartService'); 
const CartInit = new CartService(); 

module.exports = (app) => {

    app.use('/carts', router);

    router.post('/', async (req, res, next) => {
        try {
            const { id } = req.user; 

            const response = await CartInit.createCart({ userId: id }); 

            res.status(200).send(response); 
        } catch(err) {
            next(err); 
        }
    })

    router.get('/:cartId', async (req, res, next) => {
        try {
            const { id } = req.user;

            const response = await CartInit.getCart(id); 

            res.status(200).send(response);
        } catch(err) {
            next (err); 
        }
    })

    router.post('/:cartId/items', async (req, res, next) => {
        try {
            const { id } = req.user; 
            const data = req.body; 

            const response = await CartInit.addItem(id, data);

            res.status(200).send(response); 
        } catch(err) {
            next (err);
        }
    })

    router.delete('/:cartId/items/:cartItemId', async (req, res, next) => {
        try {
            const { cartItemId } = req.params;
            console.log(cartItemId); 

            const response = await CartInit.removeItem(cartItemId); 

            res.status(200).send(response);
        } catch(err) {
            next (err); 
        }
    })

    router.put('/:cartId/items/:cartItemId', async (req, res, next) => {
        try {
            const data = req.params; 

            const response = await CartInit.updateItem(data); 

            res.status(200).send(response);
        } catch(err) {
            next (err);
        }
    })

    router.post('/:cartId/checkout', async (req, res, next) => {
        try {
            const { id } = req.user;
            const { cartId, paymentInfo } = req.body; 

            const response = await CartInit.checkout(cartId, id, paymentInfo); 

            res.status(200).send(response); 
        } catch(err) {
            next (err); 
        }
    })

}