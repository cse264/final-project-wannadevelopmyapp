const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new mongoose.Schema({

//Place your Schema here

Username :  {type:String, unique: true, required:[true, 'Please insert Usename']},         //Trainer Username
Name:       {type:String, required:[true, 'Please insert Name']},                             //Trainer Name
Email:      {type:String, required:[true, 'Please insert Email']},                          //Trainer Email 4 OAuth Purposes 
Bio:        {type:String, required:[true, 'Please insert Bio']},                              //Trainer Experience in Years 
UserType:   {type:String, required:[true, 'Please insert User type']},
Experience: {type:String, unique: false},   
Goals:      {type:String, unique: false},   
Clients: [
    {                                                                                   //Past Trainees
        Username : {type:String},    //Trainee Username
    }
]

});



const User = mongoose.model('User', userSchema);

module.exports = User;
