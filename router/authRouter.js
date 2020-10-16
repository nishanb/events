const router = require('express').Router();
const UsersController = require('../controller/UsersController');

router.post('/login', (req, res) => {
    UsersController.login(req, res);
});

router.post('/register', (req, res) => {
    UsersController.register(req, res);
});

router.post('/logout', (req, res) => {
    res.status(200).json('logout');
});

module.exports = router;
