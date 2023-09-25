const userRouter = require('./userRoute');
const productRouter = require('./productRoute');
const orderRouter = require('./orderRoute');
const authRouter = require('./authRoute'); 
const cartRouter = require('./cartRoute');

module.exports = (app, passport) => {
   authRouter(app, passport); 
   cartRouter(app);
   orderRouter(app);
   productRouter(app);
   userRouter(app); 
}