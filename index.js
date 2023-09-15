const express = require('express'); 
const app = express(); 
const middleware = require('./middleware'); 

const { PORT } = require('./config'); 

async function server() {

    middleware(app); 

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`); 
    })

}

server(); 