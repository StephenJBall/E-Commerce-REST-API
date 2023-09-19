const passport = require('../middleware/passport'); 
const userRouter = require('./userRoute');
const productRouter = require('./productRoute');

module.exports = (app) => {
    userRouter(app); 
    productRouter(app); 
}