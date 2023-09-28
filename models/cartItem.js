const db = require('../db'); 

class CartItem {

    async create(data) {
        
        try {

            const statement = `INSERT INTO cart_items (product_id, cart_id)
                                VALUES ($1, $2)
                                RETURNING *`; 
            
            const values = [data.product_id, data.cart_id]; 
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
            const statement = `UPDATE cart_items
                                SET 

                                product_id = $2,
                                cart_id = $3
                                WHERE id = $1`; 
            
            const values = [data.id, data.created, data.mofidied, data.product_id, data.cart_id]; 

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

    async find(cartId) {
        try {
            const statement = `SELECT
                                cart_items.id AS cartItemId,
                                products.id
                                FROM cart_items
                                INNER JOIN products ON products.id = cart_items.product_id
                                WHERE cart_items.cart_id = $1`; 
    
            const result = await db.query(statement, [cartId]);

            if(result.rows.length > 0) {
                return result.rows[0];
            }

            return []; 

        } catch(err) {
            throw new Error(err); 
        }
    }

    async delete(id) {
        try {
            const statement = `DELETE FROM cart_items
                                WHERE id = $1
                                RETURNING *`;

            const result = await db.query(statement, [id]);

            if (result.rows.length > 0){
                return result.rows[0];
            } else {
                return null;
            }
        } catch(err) {
            throw (err); 
        }
    }

}

module.exports = new CartItem(); 