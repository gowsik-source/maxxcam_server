const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
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

// fetch user details in jwt token
userRoute.get('/me', authMiddleware, async (req,res)=>{
    res.send(req.user);
});

//edit profile
userRoute.put('/me/edit', authMiddleware, async (req,res)=>{
    let result = await userController.editProfile(req);
    res.status(result.code).send(result);
});

//change password
userRoute.put('/me/edit/change-password', authMiddleware, async (req,res)=>{
    let result = await userController.changePassword(req);
    res.status(result.code).send(result);
});

module.exports = userRoute;