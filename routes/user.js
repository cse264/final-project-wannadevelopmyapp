const express = require('express');
const User = require('../models/User.js');
const passport = require('passport');
var userProfile;
const router = express.Router();

//app.use('/home', userRoute);
/* GET URL Path /home/.  */
router.get('/', async function(req,res,next){
  res.render('home', { trainees: 'joe and jimmy' });
    /*  Google AUTH  */
});


module.exports = router;

