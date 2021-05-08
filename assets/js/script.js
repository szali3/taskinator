
var taskToDoE1 = document.querySelector("#task-to-do")
var formE1= document.querySelector("#task-form")

var createTaskHandler = function() {

    event.preventDefault();

    var listItemE1 = document.createElement("li");
    listItemE1.className = "task-item";
    listItemE1.textContent = "This is a new task."
    taskToDoE1.appendChild(listItemE1);
};


formE1.addEventListener('submit', createTaskHandler);
