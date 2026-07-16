const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const userDal = new Object();

// register
userDal.register = async (userData) => {
    try {
        let payLoad = new userModel(userData);
        let user = await payLoad.save();
        if (user) {
            return { status: true, message: "Registration successful", data: user };
        }
        return { status: false, message: "Registration failed", data: {} };
    } catch (error) {
        return { status: false, message: error.message, data: {} };
    }
}

// check if email exists or not
userDal.emailExists = async (userEmail) => {
    try {
        let emailCheck = await userModel.findOne({ email: userEmail });
        if (emailCheck) {
            return { status: true, message: "Account already exists with this email. Please login.", data: emailCheck };
        }
        return { status: false, message: "Email does not exist. Please check your email", data: {} };
    } catch (error) {
        return { status: false, message: error.message, data: {} };
    }
}

// check if contact number exists
userDal.contactNoExists = async (userContactNo) => {
    try {
        let contactNoCheck = await userModel.findOne({ contactNo: userContactNo });
        if (contactNoCheck) {
            return { status: true, message: "Contact number already exists", data: contactNoCheck };
        }
        return { status: false, message: "Contact number does not exist", data: {} };
    } catch (error) {
        return { status: false, message: error.message, data: {} };
    }
}

// password hashing using bcrypt
userDal.hashPassword = async (bodyPassword) => {
    try {
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(bodyPassword, salt);
        if (hashedPassword) {
            return { status: true, message: "Password hashed successfully", data: hashedPassword };
        }
        return { status: false, message: "Password hashing failed", data: {} };
    } catch (error) {
        return { status: false, message: error.message, data: {} };
    }
}

// compare bcrypted password
userDal.comparePassword = async (bodyPassword, databasePassword) => {
    try {
        let isPasswordValid = await bcrypt.compare(bodyPassword, databasePassword);
        console.log(isPasswordValid, 'password check boolean')
        if (isPasswordValid) {
            return { status: true, message: "Your new password must be different from your old password", data: {} };
        }
        return { status: false, message: "Invalid password", data: {} };
    } catch (error) {
        return { status: false, message: error.message, data: {} };
    }
}

module.exports = userDal;