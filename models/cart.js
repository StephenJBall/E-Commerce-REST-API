const db = require('../db');
const moment = require('moment'); 

class Cart {

    async create(data) {
        try {
            const statement = `INSERT INTO carts (created, modified, user_id)
                                VALUES ($1, $2, $2)
                                RETURNING *`;
            
            const values = [data.created, data.modified, data.userId]; 

            const result = await db.query(statement, values); 

            if(result.rows.lenght > 0) {
                return result.rows[0]; 
            } else {
                return null; 
            }
        } catch(err){
            throw (err); 
        }
    }

    async findByUserID(userID) {
        try {
            const statement = `SELECT * FROM carts
                                WHERE user_id = $1`; 

            const result = await db.query(statement, [userID]); 

            if(result.rows.length > 0) {
                return result.rows[0]; 
            } else {
                return null; 
            }
        } catch (err) {
            throw (err); 
        }
    }

}

module.exports = new Cart(); 