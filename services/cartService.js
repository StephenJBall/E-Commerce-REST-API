const httpError = require('http-errors'); 
const Cart = require('../models/cart'); 
const CartItem = require('../models/cartItem');
const Order = require('../models/order');  

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

        const items = await CartItem.find(cartId); 

        cart.items = items; 


        if(!cart) {
            throw httpError(404, 'Cart not found'); 
        } 

        return cart; 
    } catch(err) {
        throw (err); 
    }
}

module.exports.addItem = async (userId, item) => {
    try {
        const cart = await Cart.findByUserID(userId);

        const cartItem = await CartItem.create({cart_id: cart.id, ...item}); 

        return cartItem; 
    } catch(err) {
        throw(err); 
    }
}

module.exports.removeItem = async (id) => {
    try {
        const cartItem = await CartItem.delete(id); 

        return cartItem;
    } catch(err) {
        throw (err);
    }
}

module.exports.updateItem = async (data) => {
    try {
        const cartItem = await CartItem.update(data);

        return cartItem;
    } catch(err) {
        throw (err); 
    }
}

module.exports.checkout = async (cartId, data, paymentInfo) => {
    try {
        // this code is included for example
        const stripe = require('stripe')('stripe_API_KEY'); 

        const cartItems = await CartItem.find(cartId); 

        const total = cartItems.reduce((total, item) => {
            return total += Number(item.price); 
        }, 0); 

        const initOrder =  await Order.create(data); 
        initOrder.addItem(cartItems); 

        const payment = await stripe.charges.create({
            amount: total, 
            currency: 'eur',
            source: paymentInfo.id,
            description: 'REST API charge'
        }); 

        return initOrder;

    } catch(err) {
        throw (err); 
    }
}