const express = require('express');
const User = require('../models/User.js');
const passport = require('passport');
var userProfile;
const router = express.Router();
const dotenv = require('dotenv');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


/* GET URL Path /complete_profile/.  */
router.get('/', async function(req,res,next){
  console.log(req);
  res.render('complete_profile', { title: 'complete_profile' });
});

module.exports = router;

