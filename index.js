let tasks = [];
const taskPerPage = 5;
let currentPage = 1;

// Retrieve task list from local storage
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}
function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    const startIndex = (currentPage - 1) * taskPerPage;
    const endIndex = taskPerPage + startIndex;
    const tasksToRender = tasks.slice(startIndex, endIndex);
  
    if (tasks.length === 0) {
      const taskList = document.getElementById("taskList");
      const noTasksMessage = document.createElement("h1");
      noTasksMessage.textContent = "You have no tasks.🙄";
      noTasksMessage.classList.add("no-tasks-message");
      taskList.appendChild(noTasksMessage);
    } else {
      tasksToRender.forEach(function (task, index) {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");
  
        const taskText = document.createElement("span");
        taskText.classList.add("task-text");
        taskText.textContent = task.text;
  
        const taskActions = document.createElement("span");
        taskActions.classList.add("task-actions");
  
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("dBtn");
        deleteBtn.addEventListener("click", function () {
          deleteTask(startIndex + index);
        });
  
        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Uncomplete" : "Complete";
        completeBtn.classList.add("cBtn");
        completeBtn.addEventListener("click", function () {
          toggleComplete(startIndex + index);
          taskText.classList.toggle("complete-task");
          completeBtn.textContent = task.completed ? "Uncomplete" : "Complete";
        });
  
        taskActions.appendChild(deleteBtn);
        taskActions.appendChild(completeBtn);
  
        taskItem.appendChild(taskText);
        taskItem.appendChild(taskActions);
  
        if (task.completed) {
          taskText.classList.add("complete-task");
        }
  
        taskList.appendChild(taskItem);
      });
    }
  }
  

//Function to go to Next Page
function goToNext() {
  const totalPage = Math.ceil(tasks.length / taskPerPage);
  if (currentPage < totalPage) {
    currentPage++;
    renderTasks();
  }
}
//Function to go to Previous Page
function goToPrevious() {
  if (currentPage > 1) {
    currentPage--;
    renderTasks();
  }
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
  
    if (taskText !== "") {
      const newTask = {
        text: taskText,
        completed: false,
      };

     
  
      // Retrieve existing tasks from local storage
      const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
      // Add the new task to the existing tasks
      existingTasks.push(newTask);
  
      // Store the updated array back in local storage
      localStorage.setItem("tasks", JSON.stringify(existingTasks));
  
      // Update the tasks variable
      tasks = existingTasks;
  
        
      // Render Task
      renderTasks();
      event.preventDefault();
      taskInput.value = "";
    }
  }
  
// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}
//function when task completes
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  
    const taskText = document.getElementsByClassName("task-text")[index];
    const completeBtn = document.getElementsByClassName("cBtn")[index];
  
    if (tasks[index].completed) {
      taskText.classList.add("complete-task");
      completeBtn.textContent = "Uncomplete";
    } else {
      taskText.classList.remove("complete-task");
      completeBtn.textContent = "Complete";
    }
  }
// Function to search a task
function searchTask() {
  const searchInput = document.getElementById("searchInput");
  const searchItem = searchInput.value.trim().toLowerCase();

  if (searchItem === "") {
    renderTasks(); // Call renderTasks() to show all tasks and pagination
    return;
  }

  const filteredTasks = tasks.filter(function (task) {
    return task.text.toLowerCase().includes(searchItem);
  });

  renderFilteredTasks(filteredTasks);
}


function renderFilteredTasks(filteredTasks) {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  if (filteredTasks.length === 0) {
    const noTasksMessage = document.createElement("h1");
    noTasksMessage.textContent = "Nothing Found 🙂🤔🤨";
    noTasksMessage.classList.add("no-tasks-message");
    taskList.appendChild(noTasksMessage);
    return;
  }

  filteredTasks.forEach(function (task, index) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    const taskText = document.createElement("span");
    taskText.classList.add("task-text");
    taskText.textContent = task.text;

    const taskActions = document.createElement("span");
    taskActions.classList.add("task-actions");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      deleteTask(index);
    });

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.addEventListener("click", function () {
      toggleComplete(index);
      taskText.classList.toggle("complete-task");
    });

    taskActions.appendChild(deleteBtn);
    taskActions.appendChild(completeBtn);

    taskItem.appendChild(taskText);
    taskItem.appendChild(taskActions);

    

    taskList.appendChild(taskItem);
  });
}

document.getElementById("addBtn").addEventListener("click", addTask);
document.getElementById("searchInput").addEventListener("input", searchTask);

renderTasks();
