const express = require('express');
const Trainee = require('../models/Trainee.js');
const router = express.Router();


//app.use('/trainees', trainerRouter);
/* GET URL Path /trainees/.  */
router.get('/', async function(req, res, next) {
  res.render('trainee_home', { trainers: 'jack and johnny' });
});


module.exports = router;

