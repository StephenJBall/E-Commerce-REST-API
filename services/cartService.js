const httpError = require('http-errors'); 
const Cart = require('../models/cart'); 
const CartItem = require('../models/cartItem');
const Order = require('../models/order');  

module.exports = class CartService {
    async createCart (data) {

        const { userId } = data; 

        try {
            const cart = await Cart.create(userId); 
    
            return cart; 
        } catch(err) {
            throw (err); 
        }
    }
    
    async getCart (userId) {
        try {
            const cart = await Cart.findByUserID(userId); 
    
            const items = await CartItem.find(cart.id); 
    
            cart.items = items; 
    
    
            if(!cart) {
                throw httpError(404, 'Cart not found'); 
            } 
    
            return cart; 
        } catch(err) {
            throw (err); 
        }
    }
    
    async addItem (userId, item) {
        try {
            const cart = await Cart.findByUserID(userId);
    
            const cartItem = await CartItem.create({cart_id: cart.id, ...item}); 
    
            return cartItem; 
        } catch(err) {
            throw(err); 
        }
    }
    
    async removeItem (id) {
        try {
            const cartItem = await CartItem.delete(id); 
    
            return cartItem;
        } catch(err) {
            throw (err);
        }
    }
    
    async updateItem (data) {
        try {
            const cartItem = await CartItem.update(data);
    
            return cartItem;
        } catch(err) {
            throw (err); 
        }
    }
    
    async checkout (cartId, data, paymentInfo) {
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
}