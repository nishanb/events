const { Joi } = require('express-validation');

const validateRegistartion = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().min(5).max(20),
        email: Joi.string().email().required(),
        password: Joi.string().min(10).required(),
    });

    return schema.validate(data);
};

const validateLogin = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().min(5).max(20),
        email: Joi.string().email().required(),
        password: Joi.string().min(10).required(),
    });

    return schema.validate(data);
};

module.exports.validateLogin = validateLogin;
module.exports.validateRegistartion = validateRegistartion;
