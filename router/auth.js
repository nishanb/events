const router = require('express').Router();

router.post('/login', (req, res) => {
    res.status(200).json('login');
});

router.post('/register', (req, res) => {
    res.status(200).json('register');
});

router.post('/logout', (req, res) => {
    res.status(200).json('logout');
});

module.exports = router;
