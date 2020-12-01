
/*
 * This files holds all the code to test you REST API
 */



//Run once broswer has loaded everything
window.onload = function () {

console.log(document);
/** 
if(document.title == "Login Page"){
  //when clicking the login button 
  document.getElementById("login").
  addEventListener("click", function(e){
    var Username = document.getElementById("Username").value;
    var Password = document.getElementById("Password").value;
    console.log("Username: ", Username ,"  Password: ", Password )
    //AJAX GET REQUEST 
    const getUser = async () => {
      const response = await fetch('http://localhost:3000/trainers', {
        method: 'GET',
        //body: JSON.stringify(filmObject), // string or object
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const myJson = await response.json(); //extract JSON from the http response
      // print response to console
      console.log(myJson);
    }
  //GET -- localhost:3000/
  getUser();
  },false);
  
  //when clicking the sign up button from login page 
  document.getElementById("sign_up").
  addEventListener("click", function(e){
    //AJAX GET REQUEST 
    const loadSignupPage = async () => {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'GET',
        //body: JSON.stringify(filmObject), // string or object
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const file = await response ;
      //const myJson = await response.json(); //extract JSON from the http response
      // print response to console
      console.log(file);
      window.location.replace(file.url);
    }
  //POST - /films
  loadSignupPage();
  },false);
  }
*/  
/*
//when clicking the search bar to query for trainees on trainer homepage
document.getElementById("login").
addEventListener("click", function(e){});

//when clicking the search bar to query for trainers on trainee homepage
document.getElementById("login").
addEventListener("click", function(e){});
**/
};