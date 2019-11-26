const express = require('express');
const router = express.Router();
//login page
router.get('/login', (req, res, next) => res.send('login'));
//register page
router.get('/register', (req, res, next) => res.send('reg'));

module.exports = router;