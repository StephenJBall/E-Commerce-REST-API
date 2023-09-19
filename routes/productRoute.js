const express = require('express');
const router = express.router();
const Product = require('../services/productService'); 

module.exports = (app) => {
    
    app.use('/products', router); 

    router.get('/', async (req, res, next) => {

        try {
            const query = req.query; 

            const response = await Product.getProduct(query); 

            res.status(200).send(response); 
        } catch (err) {
            next(err); 
        }

    })

    router.put('/:productId', async (req, res, next) => {

        try {
            const data = req.params; 

            const response = await Product.updateProduct(data);

            res.status(200).send(response);
        } catch(err) {
            next (err);
        }

    })

}