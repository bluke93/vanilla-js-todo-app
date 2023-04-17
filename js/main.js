document.addEventListener("DOMContentLoaded", initMain);

var tasks = [];
var filteredTasks = []
var taskItemModel = null;

function initMain(){
  if(App.auth.loggedUser()){
    taskItemModel = document.querySelector('.task-item');
    getLoggedUserTasks();
    document.querySelector("#inputFilter").addEventListener("keyup", filterTasks);
    showTasks();
  } 
}

function getLoggedUserTasks(){
  const userId = App.auth.loggedUser().id;
  tasks = App.tasks.getByUser(userId);
}

function filterTasks(event){
  const filter = event.target.value;
  filteredTasks = tasks.filter(task => task.title.includes(filter));
  console.log(filter);
  if(filter != null){
    showTasks(true);
  }
}

function showTasks(showFiltered = false){
  let taskList = showFiltered ? filteredTasks : tasks;
  const taskContainer = document.querySelector("#task-list");
  if(taskList.length > 0){
    taskContainer.innerHTML = "";
    let count = 0;
    taskList.forEach(task => {
      const item = createItemHTML(task, count);
      taskContainer.appendChild(item);
      count++;
    });
  } else {
    taskContainer.innerHTML = "<p style='text-align:center;padding:20px 0;'>Nessun task trovato.</p>";
  }
}

function createItemHTML(task, count){
  const newItem = taskItemModel.cloneNode(true);

  newItem.classList.add(`animate__delay-${count}s`)
  newItem.classList.toggle("completed", task.checked)
  newItem.setAttribute("id", `task_${task.id}`);

  newItem.querySelector(".title").innerHTML = task.title;
  newItem.querySelector(".description").innerHTML = task.description;
  newItem.querySelector(".date").innerHTML = new Date(task.date).toDateString();

  newItem.querySelector(".input-check").toggleAttribute("checked", task.checked);
  newItem.querySelector(".input-check").addEventListener("change", editTask);
  newItem.querySelector(".input-check").setAttribute("task-id", task.id);

  newItem.querySelector(".delete").setAttribute("task-id", task.id);
  newItem.querySelector(".delete").addEventListener("click", deleteTask);

  return newItem;
}

function editTask(event){
  const taskId = event.target.getAttribute("task-id");
  const taskItem = document.querySelector(`#task_${taskId}`);
  const data = {
    checked: event.target.checked,
  }
  const result = App.tasks.edit(taskId, data);
  if(result){
    taskItem.classList.toggle("completed", event.target.checked)
  }
  getLoggedUserTasks();
}

function deleteTask(){
  const taskId = this.getAttribute("task-id");
  const taskItem = document.querySelector(`#task_${taskId}`);
  console.log(taskId);
  console.log(taskItem);
  const result = App.tasks.remove(taskId);
  if(result){
    taskItem.classList.add("animate__fadeOutRight");
    setTimeout(function(){
      taskItem.remove();
    },1000)
  }
  getLoggedUserTasks();
}

function showAddForm(){
  resetForm();
  document.querySelector('.overlay_bg').classList.add('show');
  document.querySelector('.overlay_bg').addEventListener('click', hideAddForm);
}

function resetForm(){
  document.querySelector("#add_task_title").value = '';
  document.querySelector("#add_task_description").value = '';
}

function hideAddForm(event){
  if(this == event.target){
    document.querySelector('.overlay_bg').classList.remove('show');
    resetForm();
  }
}

function createTask(){
  const title = document.querySelector("#add_task_title").value;
  const description = document.querySelector("#add_task_description").value;
  if(title != '' && description != ''){
   const result = App.tasks.add({title, description})
    if(result){
      document.querySelector(".overlay_bg").classList.remove('show');
      resetForm();
      getLoggedUserTasks();
      showTasks()
    } else {
      alert("Invalid input");
    } 
  } else {
    alert("All fields are mandatory");
  }
}