document.addEventListener("DOMContentLoaded", initStore);

function initStore(){
  App.store.read();
}

var db = {
  indexes: {
    users: 2,
    tasks: 3,
  },
  data: {
    loggedUser: null,
    tasks: [],
  },
  users: [
    {
      id: 1,
      email: "iroluke@gmail.com",
      full_name: "Luca",
      password: "123456",
    },
    {
      id: 2,
      email: "lukeb@gmail.com",
      full_name: "Test User",
      password: "123456",
    },
  ],
  tasks: [
    {
      id: 1,
      user_id: 1,
      title: "Task di iroluke",
      description: "testo di descrizione a caso. completo gw iuw eweghuieh iuhiuewheiuheh i heuh iuehf iwehfuiehf hefue hiieh iefh kdfh dkf he kfh kfh k ehhf",
      date: "29/09/1993",
      checked: true,
    },
    {
      id: 2,
      user_id: 1,
      title: "Task di iroluke",
      description: "testo di descrizione a caso. non completo njfb kf hekfb e hfjfhdkjfhkfjh ekhkd hldhf fejfkdjjf dkj <br> iuhfkdfh dlkjfhljfhkjh",
      date: "19/09/1993",
      checked: false,
    },
    {
      id: 3,
      user_id: 2,
      title: "Task di lukeb",
      description: "testo di descrizione a caso",
      date: "29/09/1993",
      checked: false,
    }
  ]
}

const App = {
  tasks: {
    // To add a task
    add: function(data){
    },
    edit: function(id, data){
    },
    // To delete a task
    remove: function(id){
    },
    // retrieve all user's tasks
    getByUser: function(userId){
      const tasks = db.tasks.filter(task => task.user_id == userId);
      db.data.tasks = tasks;
      App.store.save(db);
      return tasks;
    }
  },
  users: {
    // to register a user
    add: function(email, password, full_name = "Default"){
      db = JSON.parse(localStorage.getItem('app_database'));
      const exists = db.users.find(user => user.email == email);
      if(!exists){
        const user = {
          id: db.indexes.users + 1,
          email: email,
          full_name: full_name,
          password: password
        }
        db.users.push(user);
        db.indexes.users++;
        App.store.save(db);
        return true;
      } else {
        return false;
      }
    },
    // to retrieve a user
    get: function(email){
      db = JSON.parse(localStorage.getItem('app_database'));
      const user = db.users.find(user => user.email == email);
      if(user){
        return user;
      } else {
        return false;
      }
    }
  },
  auth: {
    // get current user
    loggedUser: function(){
      return db.data.loggedUser ? db.data.loggedUser : false;
    },
    // to login user
    login: function(email, password){
      const user = App.users.get(email);
      if(user){
        if(user.password == password){
          db.data.loggedUser = {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
          };
          App.store.save(db);
          return true;
        } else {
          console.log("Password incorrect!");
          return false;
        }
      } else {
        console.log("Credentials incorrect!");
        return false;
      }
    },
    // to logout user
    logout: function(){
      db.data.loggedUser = null;
      App.store.save(db);
      window.location.replace("./login.html");
    }
  },
  store: {
    // To save db on LS with new data
    save: function(db){
      localStorage.setItem("app_database", JSON.stringify(db));
    },
    // to read from db on LS
    read: function(){
      const exists = localStorage.getItem("app_database");
      if(!exists){
        this.save(db);
      }
      db = JSON.parse(localStorage.getItem("app_database"));
    },
  }

}