const httpError = require('http-errors'); 
const UserModel = require('../models/user'); 
const bodyParser = require('body-parser');
const UserModelInit = new UserModel(); 

module.exports = class AuthService {

    async register(data) {

        const { email }  = data; 
    
        try {
            const user = await UserModelInit.findByEmail(email); 
    
            if(user) {
                throw httpError(409, 'This email is already in use'); 
            } else {
                return await UserModelInit.create(data); 
            }
    
        } catch(err) {
            throw httpError(500, err); 
        }
    }
    
    async login (data) {
        
        const { email, password } = data; 
        
         
        try {
            const user = await UserModelInit.findByEmail(email); 
            
            if(!user) {
                throw httpError(401, 'Email or password is incorrect'); 
            }
    
            if(user.password !== password) {
                throw httpError(401, 'Email or password is incorrect'); 
            }
            
            return user; 

        } catch(err) {
            throw httpError(500, err); 
        }
    }

}

