const expressMount = require('./express'); 
const passportMount = require('./passport'); 

module.exports = async (app) => {
    const expressLoaded = await expressMount(app); 
    const passportLoaded = await passportMount(expressLoaded); 
}