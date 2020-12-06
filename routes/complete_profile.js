const express = require('express');
const User = require('../models/User.js');
const router = express.Router();


/* PUT URL Path /complete_profile/.  */
router.put('/', async function(req,res,next){
  //user input 
  console.log("PUT REQ:" , req);
  console.log("PUT USER EMAIL:" , req.session.passport.user);
  var name = req.body.Name;
  var username = req.body.Username;
  var email = req.session.passport.user;
  var user_type = req.body.UserType;
  var experience = req.body.Experience;
  var goals = req.body.Goals 
  var bio = req.body.Bio
  //object to be sent to the database
  var UserObject = {
    Username: username, 
    Name: name, 
    Email: req.session.passport.user, 
    Bio: bio, 
    UserType: user_type,
    Experience: experience , 
    Goals: goals,
    Clients: {},
  };
  //filter for the query
  const filter = {Email: email};
  //console.log(UserObject);
  User.countDocuments(filter,async function(err, count){
    if(err){
      console.log(error);
      res.status(504);
    }
    //if document already exists update it 
    //Should always be the case
    if(count!=0){
      updateProfile = await User.findOneAndUpdate(filter,UserObject);
      console.log("User Profile updated with PUT succussfully!");
      res.status(201).send();
    }
    else{
      const addUser = new User(UserObject);
      addUser.save(function(err){
        if(err){
          return console.error(err);
        }
        else{
          console.log("User Profile posted with PUT succussfully!");
          res.status(201).send();
        }
      });
    }
  });
});

module.exports = router;

