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
  localStorage.setItem("taskList", JSON.stringify(TASKS));
}

function loadTasks() {
  var taskList = localStorage.getItem("taskList");
  if (taskList) {

    tasks = JSON.parse(taskList)

    for (var prop in tasks) {
      if (tasks.hasOwnProperty(prop)) {
        var task = new Task(tasks[prop].value, tasks[prop].uuid,
          tasks[prop].createDate, tasks[prop].completed);
        TASKS[task.uuid] = task;

        var taskElem = task.createHTML();
        document.getElementsByClassName("task_list")[0].appendChild(taskElem);
      }
    }
  }
}

function Task(value, id, createDate, completed, completedDate) {
  this.value = value;

  if (id === undefined) {
    this.uuid = uuid()
  } else {
    this.uuid = id
  }

  if (createDate === undefined) {
    var date = new Date();
    this.createDate = date.toUTCString();
  } else {
    this.createDate = createDate;
  }

  if (completed === undefined) {
    this.completed = false;
  } else {
    this.completed = completed;
  }

  if (completedDate === undefined) {
    this.completedDate = undefined;
  } else {
    this.completedDate = completedDate;
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

  // Add metadata for the task
  taskElem.dataset.createDate = this.createDate;
  taskElem.dataset.completed = this.completed;

  // Create a button to complete the task
  var completeBtn = document.createElement("DIV");
  completeBtn.setAttribute("class", "complete_task_btn")
  completeBtn.addEventListener("click", this.completeTask.bind(this, this.uuid));
  var btnTxt = document.createTextNode("%");
  completeBtn.appendChild(btnTxt);
  taskElem.appendChild(completeBtn);

  // Create a div for the task text
  var taskText = document.createElement("DIV");
  taskText.setAttribute("class", "task_text");
  var text = document.createTextNode(this.value);
  taskText.appendChild(text);
  taskElem.appendChild(taskText);

  // Create a button to remove the task
  var rmBtn = document.createElement("DIV");
  rmBtn.setAttribute("class", "rm_task_btn")
  rmBtn.addEventListener("click", removeTask.bind(this, this.uuid));
  var btnTxt = document.createTextNode("-");
  rmBtn.appendChild(btnTxt);
  taskElem.appendChild(rmBtn);

  // If the task is complete add the styling for a completed task
  if (this.completed) {
    taskText.className += " task_complete"
  }

  return taskElem;
}

/**
 * Remove a task from the list of tasks
 * @param  {string} id - The UUID of the task
 */
function removeTask(task_id) {
  var child = document.getElementById(task_id);
  child.parentNode.removeChild(child);

  delete TASKS[task_id];
  saveLocal();
}

Task.prototype.completeTask = function(task_id) {

  if (this.completed) {
    this.completed = false;
  } else {
    this.completed = true;
  }

  var taskElem = document.getElementById(task_id);
  taskElem.dataset.completed = this.completed;

  var children = taskElem.childNodes;
  var i;
  for (i = 0; i < children.length; i++) {
    if (children[i].getAttribute("class").includes("task_text")) {
      if (this.completed) {
        children[i].className = "task_text task_complete"
      } else {
        children[i].className = "task_text"
      }
    }
  }

  saveLocal();
}

/**
 * @return {[type]}
 */
function uuid() {
  var uuid = "", i, random;
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;

    if (i == 8 || i == 12 || i == 16 || i == 20) {
      uuid += "-"
    }
    uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
}
