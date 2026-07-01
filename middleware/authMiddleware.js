// const jwtToken = require('jsonwebtoken');
const url = require('url');
// const allowedPaths = require('../helper/allowedPaths');
const tokenHelper = require('../helper/tokenHelper');
const userModel = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
    try {
        // check path (not working in all cases so commented out for now)

        // const includedPaths = url.parse(req.originalUrl).pathname;
        // if (allowedPaths.includes(includedPaths)) {
        //     console.log('allowed route detected');
        //     return next();
        // }
        // --------------

        // to ignore method = options from request
        
        // 1) React is sending a request with an Authorization header.
        // 2) Browser sends a preflight OPTIONS request first.
        // 3) Your JWT middleware is trying to validate the token on the OPTIONS request.
        // 4) OPTIONS requests don't contain your JWT token.
        // 5) Middleware returns 403.
        // 6) Browser reports it as a CORS error.
        if(req.method === "OPTIONS") {
            return next();
        }

        //chcck header
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(403).send({ status: false, message: "Token missing in headers" });
        }

        // verify token
        const token = authorization.split(" ")[1];
        const verifyToken = tokenHelper.verifyToken(token);
        console.log("verifyToken (object)", verifyToken);
        if (!verifyToken || !verifyToken.id) {
            return res.status(401).send({ code: 401, status: false, message: "Invalid token or user data missing" });
        }

        // find user
        const user = await userModel.findById(verifyToken.id);
        if (!user) {
            return res.status(404).send({ code: 404, status: false, message: "User not found" });
        }

        // attach user to request
        req.user = user;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ code: 401, status: false, message: "Token expired, please login again" });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(403).json({ code: 403, status: false, message: "Invalid token" });
        }
        return res.status(500).json({ code: 500, status: false, message: "AuthMiddleware Error", data: error.message });
    }
};

module.exports = authMiddleware;