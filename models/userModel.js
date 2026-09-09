const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema({
    avatar : {
        avatarUrl : { type: String, default: '' },
        avatarPublicId : { type: String, default: '' }
    },
    firstName : { type: String, default: '' },
    lastName : { type: String, default: '' },
    contactNo : { type: String, default: '' },
    email : { type: String, default: '' },
    password : { type: String, default: '' },
    jwtPasswordToken : { type: String, default: '' },
    status : { type: Boolean, default: false },
    deleted : { type: Boolean, default: false },
}, { timestamps: true });

const UserModel = new mongoose.model('User', userSchema);

module.exports = UserModel;