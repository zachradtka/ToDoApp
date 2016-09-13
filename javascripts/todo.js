
var TASKS = {};

/**
 * Add a task to the list of tasks
 */
function addTask() {
  var newTask = document.getElementById("new_task");

  var task = new Task(newTask.value);
  TASKS[task.uuid] = task;

  var taskElem = task.createHTML();

  document.getElementsByClassName("task_list")[0].appendChild(taskElem);

  // Clear the text input value
  newTask.value = "";
  saveLocal()
}


function saveLocal() {
  console.log(TASKS)
  localStorage.setItem("taskList", JSON.stringify(TASKS));
}

function loadTasks() {
  var taskList = localStorage.getItem("taskList");
  if (taskList) {
    console.log(taskList);

    tasks = JSON.parse(taskList)

    for(var prop in tasks) {
      if(tasks.hasOwnProperty(prop)) {

        var task = new Task(tasks[prop].value, tasks[prop].uuid);
        TASKS[task.uuid] = task;


        var taskElem = task.createHTML();
        document.getElementsByClassName("task_list")[0].appendChild(taskElem);

      }
    }
  }
  console.log(TASKS)

}

function Task(value, id) {
  this.value = value;

  if (id === undefined) {
    this.uuid = uuid()
  } else {
    this.uuid = id
  }
}

/**
 * Create HTML to display the task
 * @return {object} taskElement - The task with a remove button
 */
Task.prototype.createHTML = function() {

  // Construct the outer <div> for the task
  var taskElem = document.createElement("DIV");
  taskElem.setAttribute("class", "task");
  taskElem.setAttribute("id", this.uuid)

  // Create a div for the task text
  var taskText = document.createElement("DIV");
  taskText.setAttribute("class", "task_text");
  var text = document.createTextNode(this.value);
  taskText.appendChild(text);
  taskElem.appendChild(taskText);

  // Create a button to remove the task 
  var rmBtn = document.createElement("DIV");
  rmBtn.setAttribute("class", "rm_task_btn")

  id = this.uuid
  console.log("Remove button " + id)
  rmBtn.addEventListener("click", function() { removeTask(id) });
  var btnTxt = document.createTextNode("-");
  rmBtn.appendChild(btnTxt);

  // Add the remove button to the task
  taskElem.appendChild(rmBtn);

  return taskElem;
}

/**
 * Remove a task from the list of tasks
 * @param  {string} id - The UUID of the task
 */
function removeTask(task_id) {

  console.log("Removing task with id: " + task_id)

  var child = document.getElementById(task_id);

  console.log(child)

  child.parentNode.removeChild(child);
  delete TASKS[task_id];
  console.log(TASKS)
}

/**
 * @return {[type]}
 */
function uuid() {
  var uuid = "",
    i, random;
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;

    if (i == 8 || i == 12 || i == 16 || i == 20) {
      uuid += "-"
    }
    uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
}