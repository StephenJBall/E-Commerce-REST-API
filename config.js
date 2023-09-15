module.exports = {
    PORT: process.env.PORT,
    SESSION_SECRET: process.env.SESSION_SECRET,

    DB: {
        PG_PORT: process.env.PG_PORT,
        PG_HOST: process.env.PG_HOST,
        PG_DATABASE: process.env.PG_DATABASE,
        PG_USER: process.env.PG_USER,
        PG_PASSWORD: process.env.PG_PASSWORD
    }
    
}