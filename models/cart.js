const db = require('../db');
const moment = require('moment'); 

class Cart {

    constructor(data = {}) {
        this.created = data.created || moment.utc.toISOString(); 
        this.modified = data.modified || moment.utc.toISOString(); 
    }

    async create(data) {
        try {
            const statement = `INSERT INTO carts (created, modified, user_id)
                                VALUES ($1, $2, $2)
                                RETURNING *`;
            
            const values = [this.created, this.modified, data.userID]; 

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