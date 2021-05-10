var pageContentE1 = document.querySelector("#page-content");
var taskToDoEl = document.querySelector("#task-to-do");
var formE1= document.querySelector("#task-form");
var taskIdCounter = 0;
var taskInProgressEl = document.querySelector("#tasks-in-progress")
var taskCompletedEl = document.querySelector("#tasks-completed")

var taskFormHandler = function(event) {

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    formE1.reset();
    //package up data as an object
    var isEdit = formE1.hasAttribute("data-task-id");
    
    //has data attribue so get task id and call function to complete edit process
    if (isEdit){
        var taskId = formE1.getAttribute("data-task-id")
        completedEditTask(taskNameInput, taskTypeInput,taskId)
    }

    else{
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };
  
    createTaskEl(taskDataObj);
    }
}

var createTaskEl = function(taskDataObj){
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //ad tas id as custom attribue
    listItemEl.setAttribute("data-task-id" , taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info"
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    // add entire list item to list
    taskToDoEl.appendChild(listItemEl);

    //incease task counter for next unique id
    taskIdCounter++;
}

var createTaskActions = function(taskID) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions"

    //create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskID);

    actionContainerEl.appendChild(editButtonEl);

    //create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskID);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id",taskID);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do","In Progress","Completed"];
    for (var i=0;i<statusChoices.length;i++){
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId +"']");
    taskSelected.remove();
};

var editTask = function (taskId) {
    console.log("editing tast #" + taskId);
    
    //get task list element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    
    document.querySelector("#save-task").textContent = "Save Task";

    formE1.setAttribute("data-task-id",taskId);
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    
};

var taskButtonHandler = function (event) {
    // get target element from event
    var targetEl = event.target;

    //edit button was clicked
    if (targetEl.matches(".edit-btn")){
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }

    if(targetEl.matches(".delete-btn")){
        // get the element's task id
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var completedEditTask = function(taskName,taskType,taskId){
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    formE1.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";

    alert("Task Updated!");
}

var taskStatusChangeHandler = function (evert) {
    //get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    // get the current selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    //find the parent task item element based on the id
    console.log(taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']"));

    if (statusValue === "to do"){
        taskToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        taskInProgressEl.appendChild(taskSelected);
    } else if (statusValue == "completed") {
        taskCompletedEl.appendChild(taskSelected);
    }
    
};

formE1.addEventListener('submit', taskFormHandler);
pageContentE1.addEventListener("click", taskButtonHandler);
pageContentE1.addEventListener("change",taskStatusChangeHandler);

