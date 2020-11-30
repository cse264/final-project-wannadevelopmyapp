const express = require('express');
const Trainer = require('../models/Trainer.js');
const router = express.Router();

//app.use('/trainers', trainerRouter);
/* GET URL Path /trainers/.  */
router.get('/', async function(req,res,next){
  res.render('trainer_home', { trainees: 'joe and jimmy' });
});


module.exports = router;

