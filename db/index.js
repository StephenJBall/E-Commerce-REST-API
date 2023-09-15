const { Pool } = require('pg'); 
const { DB } = require("../config"); 

const pool = new Pool({
    port: DB.PG_PORT,
    host: DB.PG_HOST,
    database: DB.PG_DATABASE,
    user: DB.PG_USER,
    password: DB.PG_PASSWORD
}); 

module.exports = pool; 

