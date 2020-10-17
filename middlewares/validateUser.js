const jwt = require('jsonwebtoken');

const validate = (req, res, next) => {
    //Get Auth header
    const bearerHeader = req.headers['authorization'];

    //check if not undefined
    if (bearerHeader != undefined) {
        const token = bearerHeader.split(' ')[1];
        req.token = token;

        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                res.status(403).send();
            } else {
                req.user_id = decode._id;
                next();
            }
        });
    } else {
        res.status(403).send();
    }
};

module.exports = validate;
