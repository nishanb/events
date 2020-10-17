var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FoodSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 20,
    },
    calories: {
        type: Number,
        required: true,
    },
    intake: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
    UserId: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Food', FoodSchema);
