const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema({
    firstName : { type: String, default: '' },
    lastName : { type: String, default: '' },
    contactNo : { type: String, default: '' },
    email : { type: String, default: '' },
    password : { type: String, default: '' },
    status : { type: Boolean, default: false },
    deleted : { type: Boolean, default: false },
}, { timestamps: true });

const UserModel = new mongoose.model('User', userSchema);

module.exports = UserModel;