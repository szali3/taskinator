
var taskToDoE1 = document.querySelector("#task-to-do")
var formE1= document.querySelector("#task-form")

var createTaskHandler = function() {

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // create list item
    var listItemE1 = document.createElement("li");
    listItemE1.className = "task-item";
    
    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info"
    
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    listItemE1.appendChild(taskInfoEl);

    // add entire list item to list
    taskToDoE1.appendChild(listItemE1);
};


formE1.addEventListener('submit', createTaskHandler);
