const userRouter = require('./userRoute');
const productRouter = require('./productRoute');
const orderRouter = require('./orderRoute');
const authRouter = require('./authRoute'); 

module.exports = (app, passport) => {
    userRouter(app); 
    productRouter(app); 
    orderRouter(app); 
    authRouter(app, passport); 
}