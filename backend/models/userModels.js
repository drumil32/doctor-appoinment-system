const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'email is required']
    },
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isDoctor: {
        type: Boolean,
        default: false,
    },
    notifications: {
        type: Array,
        default: []
    },
    seennotifications: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('user', userSchema);