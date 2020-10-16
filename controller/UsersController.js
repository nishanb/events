const User = require('./../model/User');
const validation = require('./../helper/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    login: async (req, res) => {
        //validate content
        const error = validation.validateRegistartion(req.body).error;
        if (error)
            return res.status(400).send({ error: error.details[0].message });

        //Check for existing user
        const user = await User.findOne({
            email: req.sanitize(req.body.email),
        });
        if (!user)
            return res.status(400).json({ error: 'User does not exists' });

        const validPass = await bcrypt.compare(
            req.sanitize(req.body.password),
            user.password
        );
        if (!validPass) {
            return res.status(200).send(`Password dosen't match`);
        }

        //create JWT
        const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);
        return res.status(200).json({ messgae: 'Login is successfull', token });
    },

    register: async (req, res) => {
        //Validate
        const error = validation.validateRegistartion(req.body).error;
        if (error)
            return res.status(400).send({ error: error.details[0].message });

        //Check for existing user
        const userExists = await User.findOne({
            email: req.sanitize(req.body.email),
        });
        if (userExists)
            return res.status(400).json({ error: 'user already exists' });

        //HASH The password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(
            req.sanitize(req.body.password),
            salt
        );

        const newUser = new User({
            name: req.sanitize(req.body.name),
            email: req.sanitize(req.body.email),
            password: hashedPassword,
        });

        try {
            await newUser.save();
            const token = jwt.sign({ _id: newUser.id }, process.env.JWT_SECRET);
            return res
                .status(201)
                .json({ message: 'Registartion is successfull', token });
        } catch (error) {
            return res.status(400).send(error);
        }
    },
};
