const express = require('express'); 
const app = express(); 

const { PORT } = require('./config'); 

async function server() {

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`); 
    })

}

server(); 