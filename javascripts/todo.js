

//TODO: Create a task element with a remove button
function createTask(task_value) {
  // Create a div 
  var elem = document.createElement("DIV");
  elem.setAttribute("class", "task");
  elem.innerHTML = task_value;

  return elem
}

/**
 * Grab 
 */
function addTask() {

  // Get the task element
  var task = document.getElementById("new_task");

  var task_elem = createTask(task.value)
  // Append task to the task list
  document.getElementsByClassName("task_list")[0].appendChild(task_elem);

  // Clear the text input value
  task.value = ""
}


function removeTask() {

}
