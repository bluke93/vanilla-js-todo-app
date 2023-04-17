document.addEventListener("DOMContentLoaded", initGeneral);

function initGeneral(){
  setupNavbar();
}

function setupNavbar(){
  if(App.auth.loggedUser()){
    document.querySelector("#nav_guest").remove();
    document.querySelector("#loggedUser").innerHTML = App.auth.loggedUser().full_name;
  } else {
    document.querySelector("#nav_logged").remove();;
  }
}

function logout(){
  App.auth.logout();
}