var buttonE1 = document.querySelector("#save-task")
var taskToDoE1 = document.querySelector("#task-to-do")

var createTaskHandler = function() {
    var listItemE1 = document.createElement("li");
    listItemE1.className = "task-item";
    listItemE1.textContent = "This is a new task."
    taskToDoE1.appendChild(listItemE1);
};

buttonE1.addEventListener("click", createTaskHandler);