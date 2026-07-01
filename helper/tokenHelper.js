const jwtToken = require('jsonwebtoken');
const secretKey = process.env.jwt_secret_key;
const tokenHelper = new Object();

// generate token
tokenHelper.generateToken = (id) => {
    const generateToken = jwtToken.sign({id}, secretKey, { expiresIn: '7d' });
    return generateToken;
};

// verify token
tokenHelper.verifyToken = (token) => {
    const verifyToken = jwtToken.verify(token, secretKey);
    return verifyToken;
};

module.exports = tokenHelper;