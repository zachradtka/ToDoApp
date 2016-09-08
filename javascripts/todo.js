/**
 * Grab 
 */
function addTask() {
   // Get the task element
   var task = document.getElementById("new_task")

   // Create a new <li> element
   var node = document.createElement("LI")

   // Create a text node
   var list_item = document.createTextNode(task.value)

   // Add the task to <li>
   node.appendChild(list_item)

   // Append task to the task list
   document.getElementById("task_list").appendChild(node)

   // Clear the text input value
   task.value = ""
}
