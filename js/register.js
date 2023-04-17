document.addEventListener("DOMContentLoaded", initRegister);

function initRegister(){
  if(App.auth.loggedUser()){
    Router.navigateTo('home');
  }
}

function register(){
  const email = document.querySelector("#email").value;
  const full_name = document.querySelector("#full_name").value;
  const password = document.querySelector("#password").value;
  if(isValid(email, full_name, password)){
    const result = App.users.add(email, password, full_name);
    if(result){
      Router.navigateTo('home');
    } else {
      alert("Invalid credentials");
    }
  } else {
    alert("All fields are mandatory!");
    return;
  }
  
}

function isValid(email, full_name, password){
  if(email == null || email == ''){
    return false;
  }
  if(full_name == null || full_name == ''){
    return false;
  }
  if(password == null || password == ''){
    return false;
  }
  return true;
}