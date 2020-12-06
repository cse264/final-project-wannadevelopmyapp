const express = require('express');
const User = require('../models/User.js');
const passport = require('passport');
var userProfile;
const router = express.Router();
const dotenv = require('dotenv');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;



router.delete('/', async function(req,res,next){
  console.log("DELETE REQUEST FOR EMAIL: ", req.user.Email);
  const filter = {Email: req.user.Email};
  User.deleteOne(filter, function(err,result){
    //case for ambiguous error
    if(err){
      console.err(err);
    }
    
    else {
        console.log("SUCCESSFULL DELETION OF : ", req.user.Email);
        res.json(result);
    }
  });
});

module.exports = router;
