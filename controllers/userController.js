const userRoute = require('../routes/userRoute');
const userModel = require('../models/userModel');
const userDal = require('../dal/userDal');
const tokenHelper = require('../helper/tokenHelper');

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
        let hashedPassword = await userDal.hashPassword(userData?.password);
        if (!hashedPassword.status) {
            return { code: 500, message: hashedPassword.message, data: {} };
        }
        userData['password'] = hashedPassword.data;
        // create user data
        let result = await userDal.register(userData);
        if (result.status) {
            return { code: 201, message: result.message, data: result.data };
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
            return { code: 404, message: checkEmail.message, data: checkEmail.data };
        }
        // compare password
        let isPasswordValid = await userDal.comparePassword(body?.password, checkEmail.data.password);
        // console.log(isPasswordValid,'password check boolean')
        if (!isPasswordValid.status) {
            return { code: 401, message: isPasswordValid.message, data: {} };
        }
        const generateToken = tokenHelper.generateToken(checkEmail.data._id)
        if (generateToken) {
            return { code: 200, message: "Login successful", data: checkEmail.data, token: generateToken };
        }
        return { code: 500, message: "Token generation failed", data: {} };
    } catch (error) {
        return { code: 500, message: error ? error.message : "server error", data: {} };
    }
}

// edit profile
userController.editProfile = async (req) => {
    try {
        let userFromJwtToken = req?.user;
        console.log("userFromJwtToken", userFromJwtToken); //console
        let body = req?.body;
        // check if email exists
        if (body.email) {
            let checkEmail = await userDal.emailExists(body.email);
            if (checkEmail.status) {
                return { code: 400, message: "Account already exists with this email.", data: {} };
            }
        }
        // check if contactNo exists
        if (body.contactNo) {
            let checkContactNo = await userDal.contactNoExists(body.contactNo);
            if (checkContactNo.status) {
                return { code: 400, message: checkContactNo.message, data: {} };
            }
        }
        // update profile
        let updateProfile = await userModel.findByIdAndUpdate({ _id: userFromJwtToken?._id }, { $set: body });
        if (updateProfile) {
            return { code: 200, success: true, data: updateProfile.data, message: 'Profile updated successfully' };
        }
        return { code: 400, message: 'Profile update failed', data: {} };
    } catch (error) {
        return { code: 500, message: error ? error.message : "server error", data: {} };
    }
};

// change password
userController.changePassword = async (req) => {
    try {
        let userFromJwtToken = req?.user;
        console.log("userFromJwtToken", userFromJwtToken); //console
        let body = req?.body;
        if (!body.oldPassword) {
            return { code: 400, message: "Enter your old password", data: {} };
        }
        if (!body.newPassword) {
            return { code: 400, message: "Enter your new password", data: {} };
        }
        // check old password
        let checkOldPassword = await userDal.comparePassword(body?.oldPassword, userFromJwtToken?.password);
        if (!checkOldPassword.status) {
            return { code: 401, message: "Your old password is incorrect", data: {} };
        }
        // check new password
        let checkNewPassword = await userDal.comparePassword(body?.newPassword, userFromJwtToken?.password);
        if (checkNewPassword.status) {
            return { code: 401, message: checkNewPassword.message, data: {} };
        }
        // hash password
        let hashedPassword = await userDal.hashPassword(body.newPassword);
        if (!hashedPassword.status) {
            return { code: 500, message: "Something went wrong. Please try again", data: {} };
        }
        body['newPassword'] = hashedPassword.data;
        // change password
        let changePassword = await userModel.findByIdAndUpdate({ _id: userFromJwtToken._id }, { $set: { password: body.newPassword } }, {new: true});
        if (changePassword) {
            return { code: 200, success: true, data: hashedPassword.data, message: 'Password updated successfully' };
        }
        return { code: 400, message: 'Password update failed', data: {} };
    } catch (error) {
        return { code: 500, message: error ? error.message : "server error", data: {} };
    }
};

module.exports = userController;