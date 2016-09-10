

//TODO: Create a task element with a remove button
function createTask(task_value) {
  // Create a div 
  var task_text = document.createTextNode(task_value);

  var task_elem = document.createElement("DIV");
  task_elem.setAttribute("class", "task");
  task_elem.appendChild(task_text);

  return task_elem;
}

/**
 * Grab 
 */
function addTask() {

  // Get the task element
  var task = document.getElementById("new_task");

  var task_elem = createTask(task.value);
  // Append task to the task list
  document.getElementsByClassName("task_list")[0].appendChild(task_elem);

  // Clear the text input value
  task.value = "";
}


function removeTask() {

}
