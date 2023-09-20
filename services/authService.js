const httpError = require('http-errors'); 
const { findByEmail, create } = require('../models/user'); 

module.exports.register = async (data) => {
    
    const { email } = data; 

    try {
        const user = await findByEmail(email); 

        if(user) {
            throw httpError(409, 'This email is already in use'); 
        } 

        return await create(data); 
    } catch (error) {
        throw httpError(500, err); 
    }
}

module.exports.login = async (data) => {
    const { email, password } = data; 

    try {
        const user = await findByEmail(email); 

        if(!user) {
            throw httpError(404, 'Email or password is incorrect'); 
        }

        if(user.password !== password) {
            throw httpError(409, 'Email or password is incorrct'); 
        }

        return user; 
    } catch(err) {
        throw httpError(500, err); 
    }
}