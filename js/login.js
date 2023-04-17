document.addEventListener("DOMContentLoaded", initLogin);

function initLogin(){
  if(App.auth.loggedUser()){
    Router.navigateTo('home');
  }
}

function login(){
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  if(isValid(email, password)){
    const result = App.auth.login(email, password);
    if(result){
      Router.navigateTo('home');
    } else {
      alert("Invalid credentials");
    }
  } else {
    alert("All fields are mandatory!")
    return;
  }
}

function isValid(email, password){
  if(email == null || email == ''){
    return false;
  }
  if(password == null || password == ''){
    return false;
  }
  return true;
}