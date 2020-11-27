const express = require('express');
const Film = require('../models/Trainer.js');
const router = express.Router();



/* GET URL Path /films/. */
router.get('/', async function(req, res, next) {
  
  //case for query
  if(req.url.includes("search=")){
    console.log(req.query.search);
    const filter = {}
    //gets all films
    let all_films = await Film.find(filter) ;
    var matching_docs = [];
    //iterate through for loop and match against all queries
    for(i=0;i<all_films.length;i++){
      if(all_films[i].Title.includes(req.query.search) || all_films[i].Body.includes(req.query.search)){
        matching_docs.push(all_films[i]);
      }
    }
    console.log(matching_docs)
    res.send(JSON.stringify(matching_docs))
  }
  //case without query
  else{
    const filter = {}
    let all_films = await Film.find(filter) 
    res.send(JSON.stringify(all_films))
  }
});

//POST - /films
router.post('/', async function(req, res, next) {
  var filmTitle = req.body.FilmTitle;
  var filmBody = req.body.FilmBody;
  console.log(filmBody);
  console.log(filmTitle);
  var filmDate = req.body.date;
  //case for invalid input 
  if(filmTitle.length == 0 || filmBody.length == 0){
    console.log("Film Title or Film Body are empty");
    res.status(404).send("Film Title or Film Body are empty");
  }
  //case for valid input 
  else{
    
    var filmId ;
    //finds all films and sorts them max to min into the doc variable
    Film.find({}).sort({"Film_ID":-1}).limit(1).exec(function(err, doc){
      //case for error
      if (err){ 
        console.log(max_price, err) ;
      }
      //case for doc being empty - no films. film_ID should be 1
      if(doc[0] == undefined){
        console.log("Film_ID : ", 1) ;
        filmId = 1 ;
        var FilmObject = {
          Film_ID:filmId, 
          Title:filmTitle, 
          Body:filmBody, 
          DateAdded:filmDate, 
          FilmReview: {}
        };
        //posts new film to MongoDB Atlas
        const postedFilm = new Film(FilmObject);
        console.log(filmId) ;
        postedFilm.save(function(err){
          if(err){
            return console.error(err);
          }
          else{
            console.log("Document inserted succussfully!");
            res.status(201).send();
          }
        });
      }
      //case for doc not being empty
      else{ 
        //maximum film_ID
        let max_ID = doc[0].Film_ID;    
        //new film should have a Film higher than that
        filmId = max_ID+1 ;
        var FilmObject = {
          Film_ID:filmId, 
          Title:filmTitle, 
          Body:filmBody, 
          DateAdded:filmDate, 
          FilmReview: {}
        };
        console.log(FilmObject);
        const postedFilm = new Film(FilmObject);
        //post the new film
        postedFilm.save(function(err){
          if(err){
            return console.error(err);
          }
          else{
            console.log("Document inserted succussfully!");
            res.status(201).send();
          }
        });
    } 
    });
    }

});
  
//GET - /films/[film_id]
router.get('/:Film_ID', async function(req, res, next) {
  var film_ID_req = req.params.Film_ID ;
  //an empty filter means "match all documents"
  const filter = {Film_ID : film_ID_req} ;
  //find all films with such film_ID
  let film_by_id = await Film.find(filter) ;
  console.log(film_by_id);
  //case for no such Films
  if(film_by_id[0] == undefined){
    res.status(404).send("Movie with Film_ID : ", film_ID_req, " does not exist in database");
  }
  //case for found film
  else{
    res.send(JSON.stringify(film_by_id))
  }
});

//PUT - /films/[film_id]
router.put('/:Film_ID', async function(req, res, next) {
  var film_ID_req = Number(req.params.Film_ID) ;
  var filmTitle = req.body.FilmTitle;
  var filmBody = req.body.FilmBody;
  var filmDate = req.body.date;
  var filmReview = req.body.ReviewObject ;
  //invalid input throws error
  if(filmTitle.length == 0 || filmBody.length == 0){
    console.log("Film Title or Film Body are empty");
    res.status(400).send("Film Title or Film Body are empty");
  }
  //valid input
  else{
    const filter = {Film_ID : film_ID_req} ;
    console.log(filter);
    Film.countDocuments(filter, async function (err, count){ 
      if(err){
        console.log(err);
      }
      //if document already exists update it
      if(count!=0){
        console.log("Film_ID to be updated :", Number(film_ID_req)) ;
        //updates film
        let updateFilm = await Film.findOneAndUpdate(filter, 
          {
            Title:filmTitle,
            Body:filmBody
          });
        console.log("Document updated with PUT succussfully!");
        res.status(201).send();
      }
      //if document does not exist post it 
      else{
        //same process as in the POST route 
        Film.find({}).sort({"Film_ID":-1}).limit(1).exec(async function(err, doc){
          let max_ID = doc[0].Film_ID;
          console.log(doc);
          if (err){ 
            console.log(max_price, err) ;
          }
          else{ 
            console.log("Film_ID : ", max_ID) ;
            var filmId = max_ID+1 ;
            var FilmObject = {
              Film_ID:filmId, 
              Title:filmTitle, 
              Body:filmBody, 
              DateAdded:filmDate, 
              FilmReview: {}
            };
            console.log(FilmObject);
            const postedFilm = new Film(FilmObject);
            console.log(filmId) ;
            postedFilm.save(function(err){
              if(err){
                return console.error(err);
              }
              else{
                console.log("Document inserted via PUT succussfully!");
                res.status(201).send();
              }
            });
        } 
        });
      }
});
  }
});

//DELETE - /films/[film_id]
router.delete('/:Film_ID', async function(req, res, next){
  var film_ID_req = req.params.Film_ID ;
  console.log("Film to be deleted : Film_ID : " ,film_ID_req);
  const filter = {Film_ID : film_ID_req} ;
  Film.deleteOne(filter,function(err, result){
    //case for ambiguous error
    if(err){
      console.err(err);
    }
    
    else {
      //case for movie not existing
      if(result.n==0){
        res.status(404).send("Movie with Film_ID : ", film_ID_req, " does not exist in database");
    }
      //return result of deletion
      else{
        res.json(result);
      }
      
    }
  });

});

//POST - /films/[film_id]/reviews
router.post('/:Film_ID/reviews', async function(req, res, next){
  var reviewTitle = req.body.ReviewTitle ;
  var reviewBody = req.body.ReviewBody ; 
  var Film_IDref = Number(req.params.Film_ID);
  const filter = {Film_ID : Film_IDref} ;
  var film_specified = await Film.find(filter) 
  //invalid input case
  if(film_specified[0] == undefined){
    res.status(400).send("movie with Film ID: "+Film_IDref+ " does not exist");
    
  }
  //valid input case
  else{
    console.log(film_specified);
    var FilmReviewLength = film_specified[0].FilmReview.length ;
    console.log(FilmReviewLength) ;
    var  max_review_ID;
    //special case which occurs after total deletion
    if(film_specified[0].FilmReview[0] == undefined){
      max_review_ID = 0 ;
    }
    //if the deafult is the only review to exist delete it 
    else if(film_specified[0].FilmReview[0].Review_ID == undefined && FilmReviewLength==1){
      //deletes the empty element generated when film is generated
      film_specified[0].FilmReview.splice(0,1);
      max_review_ID = 0 ;
    }
    //if proper review elements already exist 
    else{
      max_review_ID= film_specified[0].FilmReview[FilmReviewLength-1].Review_ID;
    }
    //console.log(max_review_ID) ;
    var review_ID = 1 + max_review_ID
    //console.log(review_ID) ;
    var ReviewObject = {Review_ID: review_ID, Title: reviewTitle, Body: reviewBody, Date: new Date() }
    console.log(ReviewObject);
    film_specified[0].FilmReview.push(ReviewObject);
    //update new movie
    film_specified[0].save(function(err){
    if(err){
      console.log(err); 
      res.status(404).send();
    }
    else{
      res.status(201).send() ;
    }
  });
  }
});

//GET - /films/[film_id]/reviews
router.get('/:Film_ID/reviews',async function(req, res, next){
  //if it is a query 
  if(req.url.includes("search=")){
      var film_ID_req = req.params.Film_ID ;
      var query = req.query.search
      console.log("query: ", query);
      const filter = {Film_ID : film_ID_req} ;
      let film_by_id = await Film.find(filter) ;
      //if no such film_id exists
      if(film_by_id[0] == undefined){
        res.status(404).send("Film_ID: ", film_ID_req, " does not exist");
      }
      //if film does exist
      else{
        let matching_review_queries = []
        //iterate through all the indeces to find matches
        for(i=0;i<film_by_id[0].FilmReview.length;i++){
          if(film_by_id[0].FilmReview[i].Title.includes(query) || film_by_id[0].FilmReview[i].Body.includes(query)){
            matching_review_queries.push(film_by_id[0].FilmReview[i])
        }
      }
      //console.log(film_by_id[0].FilmReview);
      console.log(matching_review_queries);
      res.send(JSON.stringify(matching_review_queries)) ;
      }
  }
  //if it isn't a query 
  else{
      var film_ID_req = req.params.Film_ID ;
      console.log(film_ID_req);
      const filter = {Film_ID : film_ID_req} ;
      //find and return all reviews for that movie
      let film_by_id = await Film.find(filter) 
      //if no movie found return error
      if(film_by_id[0] == undefined){
        res.status(404).send("Film_ID: ", film_ID_req, " does not exist");
      }
      else{
        res.send(JSON.stringify(film_by_id[0].FilmReview));
      }
  }
});

//GET - /films/[film_id]/reviews/[review_id]
router.get('/:Film_ID/reviews/:review_ID',async function(req, res, next){
  var film_ID_req = req.params.Film_ID ;
  var review_ID_req = req.params.review_ID ;
  console.log(film_ID_req);
  console.log(review_ID_req);
  const filter = {Film_ID : film_ID_req} ;
  //find all films with that film_id
  let film_by_id = await Film.find(filter) ;
  //if no films exist return error
  if(film_by_id[0] == undefined){
    res.status(404).send("Film_ID: ", film_ID_req, " does not exist");
  }
  //if reviews for that movie do exist
  else{
    var review_exists = false;
    //iterate through all reviews to find the maccthign one
    for (i = 0; i<=review_ID_req; i++){
      if(film_by_id[0].FilmReview[i] == undefined){break;}
      if(film_by_id[0].FilmReview[i].Review_ID == review_ID_req){
        review_exists = true;
        res.send(JSON.stringify(film_by_id[0].FilmReview[i]))
      }
      //console.log(film_by_id[0].FilmReview[i]);
    }
    if(!review_exists){
      //If id does not exist return 404 error 
      res.status(404).send();
    }
  }
});

//PUT - /films/[film_id]/reviews/[review_id]
router.put('/:Film_ID/reviews/:review_ID', async function(req, res, next){
  var reviewTitle = req.body.ReviewTitle ;
  var reviewBody = req.body.ReviewBody ; 
  var review_ID= Number(req.params.review_ID);
  var Film_IDref = Number(req.params.Film_ID);
  const filter = {Film_ID : Film_IDref} ;
  var film_specified = await Film.find(filter) ;
  //if no film is found with film_id 
  if(film_specified[0] == undefined){
    res.status(404).send("movie with Film ID: "+Film_IDref+ " does not exist");
    
  }
  //such a film is found
  else{
    var FilmReviewLength = film_specified[0].FilmReview.length ;
    //console.log(FilmReviewLength) ;
    var ReviewObject = {Review_ID: review_ID, Title: reviewTitle, Body: reviewBody, Date: new Date() }
    //iterate through the whole FilmReview Array for Film of :Film_ID
    for(i=0;i<FilmReviewLength;i++){
      //once the review_Id is found switch it for the new reviewObject 
      if(film_specified[0].FilmReview[i].Review_ID == review_ID){
        film_specified[0].FilmReview[i] = ReviewObject ;
        //console.log(film_specified[0].FilmReview);
        film_specified[0].save(function(err){
          if(err){
            console.log(err); 
            res.status(404).send();
          }
          else{
            res.status(201).send() ;
          }
        });
        break;
      }
      //if the Review ID does not exist make a new one
      if(i==FilmReviewLength-1 &&film_specified[0].FilmReview[i].Review_ID != review_ID){
        var max_review_ID;
        //case for default stupid empty review
        if(film_specified[0].FilmReview[0].Review_ID == undefined && FilmReviewLength==1){
          //deletes the empty element generated when film is generated
          film_specified[0].FilmReview.splice(0,1);
          max_review_ID = 0 ;
        }
        //case for there already being other reviews there
        else{
          max_review_ID= film_specified[0].FilmReview[FilmReviewLength-1].Review_ID;
        }
        //the new review_ID when posting from put
        var review_ID = max_review_ID + 1 ;
        var ReviewObject = {Review_ID: review_ID, Title: reviewTitle, Body: reviewBody, Date: new Date() }
        film_specified[0].FilmReview.push(ReviewObject) ;
        //console.log(film_specified[0].FilmReview);
        film_specified[0].save(function(err){
          if(err){
            console.log(err); 
            res.status(404).send();
          }
          else{
            res.status(201).send() ;
          }
        });
        break;
      }
    }

  }
});

//DELETE - /films/[film_id]/reviews/[review_id]
router.delete('/:Film_ID/reviews/:review_ID', async function(req, res, next){
  var review_ID= Number(req.params.review_ID);
  var Film_IDref = Number(req.params.Film_ID);
  const filter = {Film_ID : Film_IDref} ;
  var film_specified = await Film.find(filter) ;
  console.log(film_specified[0]) ;
  //case for such film not existing in the database
  if(film_specified[0] == undefined){
    res.status(404).send("movie with Film ID: "+Film_IDref+ " does not exist");
    
  }
  //case for movie existing 
  else{
    //get number of reviews
    var FilmReviewLength = film_specified[0].FilmReview.length ;
    //iterate through the whole FilmReview Array for Film of :Film_ID
    for(i=0;i<FilmReviewLength;i++){
      //once the review_Id is found remove it 
      if(film_specified[0].FilmReview[i].Review_ID == review_ID){
        film_specified[0].FilmReview.splice(i,1);
        console.log(film_specified[0].FilmReview);
        //after deletion update the whole film
        film_specified[0].save(function(err){
          if(err){
            console.log(err); 
            res.status(404).send();
          }
          else{
            res.status(201).send() ;
          }
        });
        break;
      }
      //Case for no such review_id existing
      if(i==FilmReviewLength-1 &&film_specified[0].FilmReview[i].Review_ID != review_ID){
        res.status(404).send("movie review with Film ID: "+Film_IDref+ " and Review_ID: "+ review_ID+" does not exist");
      }
    }

  }
});


module.exports = router;

