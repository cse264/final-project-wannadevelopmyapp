const express = require('express');
const User = require('../models/User.js');
const passport = require('passport');
var userProfile;
const router = express.Router();
const dotenv = require('dotenv');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


//app.use('/home', homeRoute);
/* GET URL Path /home/.  */
router.get('/', async function(req,res,next){
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
        userProfile=profile;
        console.log(userProfile);
        if(userProfile != undefined){
          const filter = {Email: userProfile._json.email}
          console.log(filter);
          User.countDocuments(filter,async function(err,count){
            if(err){console.log(err)}
            if(count==0){
              var UserObject = {
                Username: userProfile._json.email, 
                Name: userProfile._json.name, 
                Email: userProfile._json.email, 
                Bio: "N/A", 
                UserType: "N/A",
                Experience: 0 , 
                Clients: {},

              };
              const addUser = new User(UserObject);
              addUser.save(function(err){
                if(err){
                  return console.error(err);
                }
                else{
                  console.log("Document inserted succussfully!");
                }
              });
                
            }
          });
        }
        
        console.log("THE GOODIES: " , userProfile._json)
        return done(null, userProfile);
    }

  ));

  //console.log(userProfile._json)
  //console.log(userProfile);
  //users: foundUsers
  res.render('home', { title: 'home' });
});

module.exports = router;

