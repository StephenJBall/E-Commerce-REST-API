const passport = require('../middleware/passport'); 
const userRouter = require('./userRoute'); 

module.exports = (app) => {
    userRouter(app); 
}