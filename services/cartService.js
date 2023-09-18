const httpError = require('http-errors'); 
const Cart = require('../models/cart'); 

module.exports.createCart = async (data) => {
    try {
        const cart = await Cart.create(data); 

        return cart; 
    } catch(err) {
        throw (err); 
    }
}

module.exports.getCart = async (userId) => {
    try {
        const cart = await Cart.findByUserID(userId); 

        // add code for loading cart items when cartitem model is finished

        if(!cart) {
            throw httpError(404, 'Cart not found'); 
        } 

        return cart; 
    } catch(err) {
        throw (err); 
    }
}