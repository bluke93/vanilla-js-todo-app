document.addEventListener("DOMContentLoaded", initMain);

var tasks = [];
var filteredTasks = []
var taskItemModel = null;

function initMain(){
  if(App.auth.loggedUser()){
    taskItemModel = document.querySelector('.task-item');
    getLoggedUserTasks();
    document.querySelector("#inputFilter").addEventListener("keyup", filterTasks);
    if(filteredTasks.length > 0){
      showTasks(filteredTasks);
    } else {
      showTasks(tasks);
    }
  } else {
    
  }
  
}

function getLoggedUserTasks(){
  const userId = App.auth.loggedUser().id;
  tasks = App.tasks.getByUser(userId);
  console.log(tasks);
}

function filterTasks(event){
  const filter = event.target.value;
  filterTasks = tasks.filter(task => task.title.includes(filter));
  showTasks(filterTasks);
}

function showTasks(taskList){
  const taskContainer = document.querySelector("#task-list");
  console.log(taskList);
  if(taskList.length > 0){
    taskContainer.innerHTML = "";
    taskList.forEach(task => {
      const item = createItemHTML(task);
      taskContainer.appendChild(item);
    });
  } else {
    taskContainer.innerHTML = "<p style='text-align:center;padding:20px 0;'>Nessun task trovato.</p>";
  }
}

function createItemHTML(task){
  const newItem = taskItemModel.cloneNode(true);

  newItem.querySelector(".input-check").toggleAttribute("checked", task.checked);
  newItem.setAttribute("id", `task_${task.id}`);
  newItem.querySelector(".title").innerHTML = task.title;
  newItem.querySelector(".description").innerHTML = task.description;

  return newItem;
}