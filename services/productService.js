const httpError = require('http-errors'); 
const Product = require('../models/product'); 

module.exports.getProduct = async (data) => {

    const { id } = data; 

    try {
        const product = await Product.findById(id); 

        if(!product) {
            return httpError(404, 'Product not found'); 
        }

        return product; 
    } catch(err) {
        throw (err); 
    }
}

module.exports.updateProduct = async (data) => {
    try {
        const product = await Product.update(data); 

        return product; 
    } catch(err) {
        throw (err); 
    }
}