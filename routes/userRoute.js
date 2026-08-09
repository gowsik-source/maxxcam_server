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
userRoute.get('/me', authMiddleware, async (req, res) => {
    res.send(req.user);
});

//edit profile
userRoute.put('/me/edit', authMiddleware, async (req, res) => {
    let result = await userController.editProfile(req);
    res.status(result.code).send(result);
});

//change password
userRoute.put('/me/edit/change-password', authMiddleware, async (req, res) => {
    let result = await userController.changePassword(req);
    res.status(result.code).send(result);
});

//forgot password send mail
userRoute.post('/me/edit/forgot-password', async (req, res) => {
    let result = await userController.forgotPassword(req);
    res.status(result.code).send(result);
});

//check Reset Password Link
userRoute.post('/me/edit/reset-password/token/:passwordToken', async (req, res) => {
    let result = await userController.checkResetPasswordLink(req);
    res.status(result.code).send(result);
});

//reset password
userRoute.put('/me/edit/reset-password/:passwordToken', async (req, res) => {
    let result = await userController.resetPassword(req);
    res.status(result.code).send(result);
});

module.exports = userRoute;