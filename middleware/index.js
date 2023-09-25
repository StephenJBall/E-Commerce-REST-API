const expressLoader = require('./express');
const passportLoader = require('./passport');
const routeLoader = require('../routes');

module.exports = async (app) => {

  const expressApp = await expressLoader(app);
  console.log('express loaded'); 

  const passport = await passportLoader(expressApp);
  console.log('passport loaded'); 

  await routeLoader(app, passport);
  console.log('route loaded'); 
  
}