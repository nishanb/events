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
    gender: {
        type: { enum: ['Male', 'Female'] },
        required: false,
        default: null,
    },
    age: {
        type: Number,
        required: false,
        default: null,
    },
    weight: {
        type: Number,
        required: false,
        default: null,
    },
    height: {
        type: Number,
        required: false,
        default: null,
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
