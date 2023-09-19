const passport = require('../middleware/passport'); 
const userRouter = require('./userRoute');
const productRouter = require('./productRoute');
const orderRouter = require('./orderRoute');

module.exports = (app) => {
    userRouter(app); 
    productRouter(app); 
    orderRouter(app); 
}