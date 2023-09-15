const session = require('express-session'); 
const cors = require('cors'); 
const bodyParser = require('body-parser'); 
const { SESSION_SECRET } = require('../config'); 

module.exports = (app) => {
    
    app.use(cors);
    
    app.use(bodyParser.json()); 

    app.use(bodyParser.urlencoded({extended: true}));

    app.use(session({
        secret: SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
        }
    })); 

    return app; 
}