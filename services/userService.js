const httpError = require('http-errors'); 
const User = require('../models/user'); 

module.exports.getUser = async (data) => {

    const { id } = data; 

    try {
        const user = await User.findById(id);

        if(!user) {
            return httpError(404, 'User not found, please double-check your email and password details'); 
        } else {
            return user; 
        }
    } catch (err) {
        throw (err);
    }
}

module.exports.updateUser = async (data) => {
    try {
        const user = await User.udpateUser(data); 

        return user; 
    } catch(err) {
        throw (err); 
    }
}