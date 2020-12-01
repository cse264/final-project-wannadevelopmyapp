const express = require('express');
const User = require('../models/User.js');
const passport = require('passport');
var userProfile;

const router = express.Router();

/* LOGIN PAGE . */
router.get('/', function(req, res, next) {
  console.log(req);
  res.render('login', { title: 'Login Page' });
});


module.exports = router;
