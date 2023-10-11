# E-Commerce REST API Portfolio Project
A Node/Express REST API that provides the basic functionality required of an e-commerce application: account registration and login, product viewing, cart creation, order creation and checkout functionality. 

# Initializing the application
To run locally, run `npm install` then `npm run start`

This project also requires a PostgreSQL database to run correctly. A fully fleshed out database is available within the project root folder under `database.js`. To populate your local database with the databse located in this file, run `npm run db-init`. This will create a databse of tables provided those tables do not already exist. 

Once the application has been initialized locally, you can access it at `http://localhost:<your-port>`

This application also makes use of local variables. For the application to run correctly, a `.env` file will need to be created, and the appropriate variables will need to have values assigned to them. Here are the variables used throughout the code, for reference; 

    PG_PORT
    PG_HOST
    PG_DATABASE
    PG_USER
    PG_PASSWORD
    PORT
    SESSION_SECRET

# Testing
Swagger documentation can be found in the route folder in the `swagger.yml` file. 

Route testing can be done through any HTTP clients. Postman was used for testing in the creation of this project. Plesae note that some routes require authentication by design (for example, a cart is assigned to a user, so, to test the cart route, one must first register through the `auth/register` route, then subsequently login through the `auth/login` route prior to testing). Once properly authenticated, the HTTP Client will store the cookie information for subsequent route testing. 