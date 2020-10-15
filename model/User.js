const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 5,
        max: 20,
    },
    email: {
        type: String,
        require: true,
        min: 5,
        max: 20,
    },
    password: {
        type: String,
        min: 10,
        max: 1024,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('User', UserSchema);
