//TODO: Create a task element with a remove button
function createTask(task_value) {

  var task_id = uuid();

  // <div class="task"></div>
  var task_elem = document.createElement("DIV");
  task_elem.setAttribute("class", "task");
  task_elem.setAttribute("id", task_id)

  var task_text = document.createTextNode(task_value);
  task_elem.appendChild(task_text);

  // <div class="rm_task_btn" onclick="removeTask()">-</div>
  var rm_btn = document.createElement("DIV");
  rm_btn.setAttribute("class", "rm_task_btn")
  rm_btn.addEventListener("click", function() { removeTask(task_id) });

  var btn_txt = document.createTextNode("-");
  rm_btn.appendChild(btn_txt);

  // Add the remove button to the task
  task_elem.appendChild(rm_btn);

  return task_elem;
}

function addTask() {
  var task = document.getElementById("new_task");

  var task_elem = createTask(task.value);
  document.getElementsByClassName("task_list")[0].appendChild(task_elem);

  // Clear the text input value
  task.value = "";
}


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
