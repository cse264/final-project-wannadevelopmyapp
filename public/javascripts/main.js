/*
 * This files holds all the code to test you REST API
 */



//Run once broswer has loaded everything
window.onload = function () {

document.getElementById("login").
addEventListener("click", function(e){
  var Username = document.getElementById("Username").value;
  var Password = document.getElementById("Password").value
  console.log("Username: ", Username ,"  Password: ", Password )
},false);
};