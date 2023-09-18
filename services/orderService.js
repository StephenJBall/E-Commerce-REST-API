const httpError = require('http-errors');
const Order = require('../models/order');
const OrderItem = require('../models/orderItem'); 

module.exports.createOrder = async (data) => {
    try {
        const order = await Order.create(data);

        return order; 
    } catch(err) {
        throw (err);
    }
}

module.exports.getOrder = async (id) => {
    try {
        const order = await Order.findByOrderId(id);

        return order; 
    } catch(err) {
        throw (err);
    }
}

module.exports.getOrderByUser = async (userId) => {
    try {
        const order = await Order.findByUserId(userId);

        return order; 
    } catch(err) {
        throw (err);
    }
}