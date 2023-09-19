const userRouter = require('./userRoute');
const productRouter = require('./productRoute');
const orderRouter = require('./orderRoute');
const authRouter = require('./authRoute'); 
const cartRouter = require('./cartRoute');

module.exports = (app, passport) => {
    userRouter(app); 
    productRouter(app); 
    orderRouter(app); 
    authRouter(app, passport); 
    cartRouter(app); 
}