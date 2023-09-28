const db = require('../db');
const moment = require('moment'); 

class Cart {

    constructor(data = {}) {
        this.created = data.created || moment.utc().toISOString();
        this.modified = moment.utc().toISOString();
        this.converted = data.converted || null;
        this.isActive = data.isActive || true;
      }

    async create(userId) {
        try {

            const data = { userId, ...this}; 

            const statement = `INSERT INTO carts (created, modified, user_id)
                                VALUES ($1, $2, $3)
                                RETURNING *`;
            
            const values = [data.created, data.modified, data.userId]; 

            const result = await db.query(statement, values); 

            if(result.rows.length > 0) {
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
                                WHERE "user_id" = $1`; 

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