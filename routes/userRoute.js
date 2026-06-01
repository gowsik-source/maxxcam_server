const express = require('express');
const userController = require('../controllers/userController');
// const authMiddleware = require('../middleware/authMiddleware');
const userRoute = express.Router();

// register
userRoute.post('/register', async (req, res) => {
    let result = await userController.register(req);
    res.status(result.code).send(result);
});

// login
userRoute.post('/login', async (req, res) => {
    let result = await userController.login(req);
    res.status(result.code).send(result);
});

// tesing purpose
userRoute.get('/test', async (req,res)=>{
    return res.send("Token Valid");
});

module.exports = userRoute;