const db = require('../db'); 

class User {
    
    async create(data) {
        try {
            const statement = `INSERT INTO users (email, password, firstname, surname, shipping_address)
                                VALUES ($1, $2, $3, $4, $5)
                                RETURNING *`; 
            
            const values = [data.email, data.password, data.firstname, data.surname, data.shipping_address]; 

            const result = await db.query(statement, values); 

            if(result.rows.length > 0) {
                return result.rows[0]; 
            } else {
                return null; 
            }
        } catch(err) {
            throw (err); 
        }
    }

    async update(data) {
        try {
            const statement = `UPDATE users
                                SET
                                firstname = $2,
                                surname = $3,
                                shipping_address = $4
                                WHERE id = $1
                                RETURNING *`; 
            
            const values = [data.id, data.firstname, data.surname, data.shipping_address]; 

            const result = await db.query(statement, values); 

            if(result.rows.length > 0){
                return result.rows[0]
            } else {
                return null; 
            }
        } catch(err) {
            throw (err); 
        }
    }

    async findByEmail (email) {
        try {
            const statement = `SELECT * FROM users
                                WHERE email = $1`; 

            const result = await db.query(statement [email]); 

            if(result.rows.length > 0) {
                return result.rows[0];
            } else {
                return null; 
            }
        } catch(err) {
            throw (err); 
        }
    }

    async findById(id) {
        try {
            const statement = `SELECT * FROM users
                                WHERE id = $1`; 

            const result = await db.query(statement, [id]); 

            if(result.rows.length > 0) {
                return result.rows[0]; 
            } else {
                return null; 
            }
        } catch(err) {
            throw (err); 
        }
    }

}; 

module.exports = new User(); 