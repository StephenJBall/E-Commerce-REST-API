const db = require('../db');
const Order = require('./order'); 

class OrderItem {

    async create(data) {
        try {
            const statement = `INSERT INTO order_items (price, stock, order_id, product_id)
                                VALUES ($1, $2, $3, $4)
                                RETURNING *`;
            const values = [data.price, data.stock, data.order_id, data.product_it];

            const result = await db.query(statement, values);

            if(result.rows.length > 0) {
                return result.rows[0];
            } else {
                return null;
            } 
        } catch (err) {
            throw (err);
        }
    }

    async update(data) {
        try {
            const statement = `UPDATE order_items
                                SET 
                                price = $2,
                                stock = $3
                                WHERE id = $1`;
            
            const values = [data.id, data.price, data.stock];

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

    async find(orderId) {
        try {
            const statement = `SELECT
                                order_items AS orderItems,
                                products.id
                                FROM order_items
                                INNER JOIN products ON products.id = order_items.product_id
                                WHERE order.id = $1`;

            const result = await db.query(statement, [orderId]); 

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