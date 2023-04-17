const Router = {
  navigateTo: function(name){
    const dest = this.routes.find(route => name == route.name)
    if(dest){
      window.location.href = dest.path;
    } else {
      window.location.replace = "./404.html";
    }
  },
  routes: [
    { name: "home", path: "./index.html"},
    { name: "login", path: "./login.html"},
    { name: "register", path: "./register.html"},
    { name: "404", path: "./404.html"},
  ],
  check: function(){
    const { pathname } = window.location;
    const exists = this.routes.find(route => route.path == pathname);
    if(!exists){
      window.location.replace = "./404.html";
    }
  }

}