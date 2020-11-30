const express = require('express');
const Trainer = require('../models/Trainer.js');
const router = express.Router();

/* GET home page which is actually the login page . */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login Page' });
});


module.exports = router;
