// Get the modal
var profil = document.getElementById("minProfil");

// Get the button that opens the modal
var open = document.getElementById("openProfil");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
open.onclick = function() {
  profil.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  profil.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == profil) {
    profil.style.display = "none";
  }
}