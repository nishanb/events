const mongoose = require('mongoose');

const TaskScehmea = new mongoose.Schema({
    title: {
        type: String,
        min: 5,
        max: 20,
        required: true,
    },
    description: {
        type: String,
        min: 10,
        max: 200,
        required: true,
    },
    currentStatus: {
        type: { enum: ['pending', 'ongoing', 'completed'] },
        default: 'pending',
    },
    dueDate: {
        type: Date,
        default: Date.now(),
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

module.exports = mongoose.model('Task', TaskScehmea);
