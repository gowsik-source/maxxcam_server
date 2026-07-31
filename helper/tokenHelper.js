const jwtToken = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.jwt_secret_key;
const tokenHelper = new Object();

// generate token for user login
tokenHelper.generateToken = (id) => {
    const generateToken = jwtToken.sign({id}, secretKey, { expiresIn: '7d' });
    return generateToken;
};

// generate token for forgot password
tokenHelper.generatePasswordToken = (id) => {
    const generateToken = jwtToken.sign({id}, secretKey, { expiresIn: '24h' });
    return generateToken;
};

// verify token
tokenHelper.verifyToken = (token) => {
    const verifyToken = jwtToken.verify(token, secretKey);
    return verifyToken;
};

module.exports = tokenHelper;