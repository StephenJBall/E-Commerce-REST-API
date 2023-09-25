const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser'); 
const testRoute = require('./routes/testRoute'); 
const authRoute = require('./routes/authRoute'); 

const { PORT } = require('./config'); 
const middleware = require('./middleware'); 

function server() {

    //await middleware(app); 
    app.use(bodyParser.json()); 
    app.use('/', testRoute); 
    app.use('/auth', authRoute); 

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`); 
    })

}

server(); 