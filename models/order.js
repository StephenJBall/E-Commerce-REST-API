const db = require('../db'); 
const moment = require('moment');
const OrderItem = require('../models/orderItem');  

module.exports = class Order {

    constructor(data = {}) {
        this.created = data.created || moment.utc().toISOString();
        this.items = data.items || [];
        this.modified = moment.utc().toISOString();
        this.status = data.status || 'PENDING';
        this.total = data.total || 0;
        this.userId = data.userId || null;
      }

      addItems(items) {
        this.items = items.map(item => new OrderItem(item));
      }
    
    async create(userId) {
        try {

            const data = { userId, ...this }
            
            const statement = `INSERT INTO orders (user_id, total, created, modified)
                                VALUES ($1, $2, $3, $4)
                                RETURNING *`;

            const values = [data.userId, data.total, data.created, data.modified];

            const result = await db.query(statement, values);

            if(result.rows.length > 0){
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
            const statement = `UPDATE orders
                                SET 
                                quantity = $2,
                                total = $3
                                WHERE
                                id = $1`;
            
            const values = [data.id, data.quantity, data.total];

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

    async findByOrderId(id) {
        try {
            const statement = `SELECT *
                                FROM orders
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

    async findByUserId(userId) {
        try {
            const statement = `SELECT *
                                FROM orders
                                where user_id = $1`;

            const result = await db.query(statement, [userId]);

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