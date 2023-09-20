const expressMount = require('./express'); 
const passportMount = require('./passport'); 
const routeMount = require('../routes'); 

module.exports = async (app) => {
    const expressLoaded = await expressMount(app); 
    const passport = await passportMount(expressLoaded); 

    await routeMount(app, passport); 
}