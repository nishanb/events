const { Joi } = require('express-validation');
module.exports = {
    validateRegistartion: (data) => {
        const schema = Joi.object({
            name: Joi.string().required().min(5).max(20),
            email: Joi.string().email().required(),
            password: Joi.string().min(10).required(),
        });

        return schema.validate(data);
    },

    validateLogin: (data) => {
        const schema = Joi.object({
            name: Joi.string().required().min(5).max(20),
            email: Joi.string().email().required(),
            password: Joi.string().min(10).required(),
        });
        return schema.validate(data);
    },

    validateTaskCreation: (data) => {
        const schema = Joi.object({
            title: Joi.string().required().min(5).max(20),
            description: Joi.string().min(10).max(200).required(),
            dueDate: Joi.date().required(),
        });

        return schema.validate(data);
    },
    validateTaskUpdation: (data) => {
        const schema = Joi.object({
            title: Joi.string().required().min(5).max(20),
            description: Joi.string().min(10).max(200).required(),
            dueDate: Joi.date().required(),
            status: Joi.required().valid(
                ...['pending', 'ongoing', 'completed']
            ),
        });

        return schema.validate(data);
    },
};
