const userModel = require('../models/userModel');
const userDal = new Object();

// register
userDal.register = async (userData) => {
    try {
        let payLoad = new userModel(userData);
        let user = await payLoad.save();
        if (user) {
            return {status: true, message: "Registration successful", data: user};
        }
        return {status: false, message: "Registration failed", data: {}};
    } catch (error) {
        return {status: false, message: error.message, data: {}};
    }
}

userDal.emailExists = async (userEmail) => {
    try {
        let emailCheck = await userModel.findOne({email: userEmail});
        if (emailCheck) {
            return {status: true, message: "Account already exists with this email. Please login.", data: emailCheck};
        }
        return {status: false, message: "Email does not exist. Please check your email", data: {}};
    } catch (error) {
        return {status: false, message: error.message, data: {}};
    }
}

userDal.contactNoExists = async (userContactNo) => {
    try {
        let contactNoCheck = await userModel.findOne({contactNo: userContactNo});
        if (contactNoCheck) {
            return {status: true, message: "Contact number already exists", data: contactNoCheck};
        }
        return {status: false, message: "Contact number does not exist", data: {}};
    } catch (error) {
        return {status: false, message: error.message, data: {}};
    }
}

module.exports = userDal;