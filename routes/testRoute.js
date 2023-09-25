const express = require('express'); 

const router = express.Router(); 

router.get('/', (req, res, next) => {
    const response = console.log('connection successful'); 
    res.status(200).send(response); 
}); 

module.exports = router; 