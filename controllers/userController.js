const userRoute = require('../routes/userRoute');
const userModel = require('../models/userModel');
const userDal = require('../dal/userDal');

const bcrypt = require('bcrypt');
const userController = new Object();

// register

userController.register = async (req, res) => {
    try {
        let userData = req?.body;
    // check if email exists
    let checkEmail = await userDal.emailExists(userData?.email);
    if (checkEmail.status) {
        return { code: 400, message: checkEmail.message, data: {} };
    }
    // check if contactNo exists
    let checkContactNo = await userDal.contactNoExists(userData?.contactNo);
    if (checkContactNo.status) {
        return { code: 400, message: checkContactNo.message, data: {} };
    }
    // hash password
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(userData?.password, salt);
    userData['password'] = hashedPassword;
    // create user data
    let result = await userDal.register(userData);
    if (result.status) {
        return { code: 200, message: result.message, data: result.data };
    }
    } catch (error) {
        return { code: 500, message: error ? error.message : "server error", data: {} };
    }
}

// login

userController.login = async (req, res) => {
    try {
        let body = req?.body;
    // if body is empty
    if (!body?.email) {
        return { code: 400, message: "Email is required", data: {} };
    }
    if (!body?.password) {
        return { code: 400, message: "password is required", data: {} };
    }
    // check if email exists
    let checkEmail = await userDal.emailExists(body?.email);
    // console.log("checkEmail", checkEmail.data);
    if (!checkEmail.status) {
        return { code: 400, message: checkEmail.message, data: checkEmail.data };
    }
    // compare password
    let isPasswordValid = await bcrypt.compare(body?.password, checkEmail.data.password);
    console.log(isPasswordValid,'password check boolean')
    if (!isPasswordValid) {
        return { code: 400, message: "Invalid password", data: {} };
    }
    return { code: 200, message: "Login successful", data: checkEmail.data };
    } catch (error) {
        return { code: 500, message: error ? error.message : "server error", data: {} };
    }
}

module.exports = userController;