/**
 * Create a task element.
 * 
 * @param  {string} task_value - The text for the task
 * @return {object} task_element - The task with a remove button
 */
function createTask(task_value) {
  // Get a new UUID for the task
  var task_id = uuid();

  // Construct the outer <div> for the task
  var task_elem = document.createElement("DIV");
  task_elem.setAttribute("class", "task");
  task_elem.setAttribute("id", task_id)

  // Create a div for the task text
  var task_text = document.createElement("DIV");
  task_text.setAttribute("class", "task_text");
  var text = document.createTextNode(task_value);
  task_text.appendChild(text);
  task_elem.appendChild(task_text);

  // Create a button to remove the task 
  var rm_btn = document.createElement("DIV");
  rm_btn.setAttribute("class", "rm_task_btn")
  rm_btn.addEventListener("click", function() { removeTask(task_id) });
  var btn_txt = document.createTextNode("-");
  rm_btn.appendChild(btn_txt);

  // Add the remove button to the task
  task_elem.appendChild(rm_btn);

  return task_elem;
}

/**
 * Add a task to the list of tasks
 */
function addTask() {
  var task = document.getElementById("new_task");

  var task_elem = createTask(task.value);
  document.getElementsByClassName("task_list")[0].appendChild(task_elem);

  // Clear the text input value
  task.value = "";
  save_local()
}

/**
 * Remove a task from the list of tasks
 * @param  {string} task_id - The UUID of the task
 */
function removeTask(task_id) {
  var child = document.getElementById(task_id);
  child.parentNode.removeChild(child);
}


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

function save_local() {
  var tasks = document.getElementsByClassName("task");

  for (var i = 0; i < tasks.length; i++) {
    tasks[i].childNodes

  }

}