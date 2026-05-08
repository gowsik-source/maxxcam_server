const express = require('express');
const userController = require('../controllers/userController');
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

module.exports = userRoute;