const { Client } = require('pg'); 
const { DB } = require('./config'); 

(async() => {

    const userTable = `
        CREATE TABLE IF NOT EXISTS users (
            id                  INT                 PRIMARY KEY         GENERATED ALWAYS AS IDENTITY NOT NULL,
            email               VARCHAR(50)         NOT NULL,
            password            VARCHAR(50)         NOT NULL,
            firstname           VARCHAR(50),
            surname             VARCHAR(50),
            shipping_address    VARCHAR(50)      
        )`
    
    const productTable = `
        CREATE TABLE IF NOT EXISTS products (
            id                  INT                 PRIMARY KEY         GENERATED ALWAYS AS IDENTITY NOT NULL,
            name                VARCHAR(50)         NOT NULL,
            price               MONEY               NOT NULL,
            description         VARCHAR(100)        
        )`

    const orderTable = `
        CREATE TABLE IF NOT EXISTS orders (
            id                  INT                 PRIMARY KEY         GENERATED ALWAYS AS IDENTITY NOT NULL,
            total               INT                 NOT NULL,
            created             DATE                NOT NULL,
            modified            DATE                NOT NULL,
            user_id             INT                 NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`

    const orderItemTable = `
        CREATE TABLE IF NOT EXISTS order_items (
            id                  INT                 PRIMARY KEY         GENERATED ALWAYS AS IDENTITY NOT NULL,
            price               MONEY               NOT NULL,
            stock               INT                 NOT NULL,
            order_id            INT                 NOT NULL,
            product_id          INT                 NOT NULL,
            FOREIGN KEY (order_id) REFERENCES orders(id),
            FOREIGN KEY (product_id) REFERENCES products(id)
        )`

    const cartTable = `
        CREATE TABLE IF NOT EXISTS carts (
            id                  INT                 PRIMARY KEY         GENERATED ALWAYS AS IDENTITY NOT NULL,
            created             DATE                NOT NULL,
            modified            DATE                NOT NULL,
            user_id             INT                 NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`

    const cartItemTable = `
        CREATE TABLE IF NOT EXISTS cart_items (
            id                  INT                 PRIMARY KEY         GENERATED ALWAYS AS IDENTITY NOT NULL,
            cart_id             INT                 NOT NULL,
            product_id          INT                 NOT NULL,
            FOREIGN KEY (cart_id) REFERENCES carts(id),
            FOREIGN KEY (product_id) REFERENCES products(id)
        )`

    try {
        const db = new Client({
            port: DB.PG_PORT,
            host: DB.PG_HOST,
            database: DB.PG_DATABASE,
            user: DB.PG_USER,
            password: DB.PG_PASSWORD
        }); 

        await db.connect(); 
        
        await db.query(userTable);
        await db.query(productTable); 
        await db.query(orderTable); 
        await db.query(orderItemTable); 
        await db.query(cartTable); 
        await db.query(cartItemTable); 

        await db.end(); 
    } catch(err) {
        console.log("Error creating database", err); 
    }

})(); 