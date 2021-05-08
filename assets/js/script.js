
var taskToDoE1 = document.querySelector("#task-to-do")
var formE1= document.querySelector("#task-form")

var createFormHandler = function(event) {

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    createTaskEl(taskDataObj);
    
};

var createTaskEl = function(taskDataObj){
    // create list item
    var listItemE1 = document.createElement("li");
    listItemE1.className = "task-item";

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info"
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    // add HTML content to div
    listItemE1.appendChild(taskInfoEl);

    // add entire list item to list
    taskToDoE1.appendChild(listItemE1);
}

formE1.addEventListener('submit', createFormHandler);
