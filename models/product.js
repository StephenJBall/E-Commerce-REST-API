const db = require('../db'); 

class Product {

    async create(data) {
        try {
            const statement = `INSERT INTO products (name, price, description)
                                VALUES ($1, $2, $3)
                                RETURNING *`; 
            
            const values = [data.name, data.price, data.description]; 
    
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
            const statement = `UPDATE products
                                SET 
                                name = $2,
                                price = $3,
                                description = $4
                                WHERE
                                id = $1`; 

            const values = [data.id, data.name, data.price, data.description]; 

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

    async findById (id) {
        try {
            const statement = `SELECT * FROM products
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

    async findByName (name) {
        try {
            const statement = `SELECT * FROM products
                                WHERE name = $1`; 

            const result = await db.query(statement, [name]); 

            if(result.rows.length > 0) {
                return result.rows[0]; 
            } else {
                return null;
            }
        } catch(err) {
            throw (err); 
        }
    }

}

module.exports = new Product(); 