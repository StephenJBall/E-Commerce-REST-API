const express = require('express'); 
const app = express(); 

const { PORT } = require('./config'); 
const middleware = require('./middleware'); 

async function server() {

    middleware(app); 

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`); 
    })

}

server(); 