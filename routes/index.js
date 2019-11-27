const express = require('express');
const router = express.Router();
const { esnureAuthenticated } = require('../config/auth');

//Welcome page
router.get('/', (req, res) => res.render('welcome'));

//Dashboard
router.get('/dashboard', esnureAuthenticated, (req, res) => res.render('dashboard', {
    name: req.user.name
}));

module.exports = router;