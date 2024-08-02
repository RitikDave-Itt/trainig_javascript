// #########################################################################################
// Styling
// #########################################################################################

const addTaskButton = document.getElementsByClassName("add-task-button")[0];
const inputTodo = document.getElementsByClassName("input-todo")[0];
const closeInput = document.getElementsByClassName("close-input")[0];
const fun = document.getElementsByClassName("fun")[0];
const taskTemplate = document.querySelector(".template");

addTaskButton.addEventListener("click", () => {
  inputTodo.classList.toggle("hide");
});
closeInput.addEventListener("click", () => {
  inputTodo.classList.toggle("hide");
});

function changeColor() {
  const baseR = 123;
  const baseG = 45;
  const baseB = 67;

  document.documentElement.style.setProperty("--base-r", baseR);
  document.documentElement.style.setProperty("--base-g", baseG);
  document.documentElement.style.setProperty("--base-b", baseB);
}

function getRandomValue() {
  return Math.floor(Math.random() * 256);
}

function changeColor() {
  const baseR = getRandomValue();
  const baseG = getRandomValue();
  const baseB = getRandomValue();

  document.documentElement.style.setProperty("--base-r", baseR);
  document.documentElement.style.setProperty("--base-g", baseG);
  document.documentElement.style.setProperty("--base-b", baseB);
}

let isRunning = false;

fun.addEventListener("click", () => {
  changeColor();
  changeLogoColor();
});

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function changeLogoColor() {
  document.querySelector(".rect1").style.backgroundColor = getRandomColor();
  document.querySelector(".rect2").style.backgroundColor = getRandomColor();
  document.querySelector(".rect3").style.backgroundColor = getRandomColor();
  document.querySelector(".rect4").style.backgroundColor = getRandomColor();
}

const openCloseSidebarButton = document.querySelector(".open-close-sidebar-button");
const sidebar = document.querySelector(".sidebar");

openCloseSidebarButton.addEventListener("click", () => {
  sidebar.classList.toggle("hide-sidebar");
});

// #########################################################################################
// localstorage
// #########################################################################################
// Custom event to notify about localStorage changes
const localStorageChangeEvent = new Event('localStorageChange');

const originalSetItem = window.localStorage.setItem;
const originalRemoveItem = window.localStorage.removeItem;

function setItem(key, value) {
    originalSetItem.call(window.localStorage, key, value);
    document.dispatchEvent(localStorageChangeEvent); 
}

function removeItem(key) {
    originalRemoveItem.call(window.localStorage, key);
    document.dispatchEvent(localStorageChangeEvent); 
}

window.localStorage.setItem = setItem;
window.localStorage.removeItem = removeItem;



// #########################################################################################
// localstorage
// #########################################################################################

// #########################################################################################
// Logic
// #########################################################################################



const formTodo = document.querySelector(".form-todo");
const taskList = document.querySelector(".task-list");
// const taskCard = document.querySelector(".task");

document.addEventListener("DOMContentLoaded", (event) => {
  
  document.dispatchEvent(localStorageChangeEvent); 


  let localStorageTodo = JSON.parse(window.localStorage.getItem("todo"));

  localStorageTodo?.map((task) => {
    taskList.appendChild(createTaskCard(task));
  });
});

formTodo.addEventListener("submit", (event) => {
  event.preventDefault();
  let data = new FormData(formTodo);
  let dataObject = Object.fromEntries(data.entries());
  dataObject["id"] = Date.now();
  dataObject["complete"] = false;
  // console.log(dataObject);

  let localStorageTodo = window.localStorage.getItem("todo");

  if (localStorageTodo) {
    localStorageTodo = JSON.parse(localStorageTodo);
    localStorageTodo.push(dataObject);
  } else {
    localStorageTodo = [dataObject];
  }

  window.localStorage.setItem("todo", JSON.stringify(localStorageTodo));
  formTodo.reset();

  inputTodo.classList.toggle("hide");
  const taskCard = createTaskCard(dataObject);
  taskList.appendChild(taskCard);
});

function createTaskCard(taskData) {
  const taskClone = taskTemplate.content.cloneNode(true);
  const taskElement = taskClone.querySelector(".task");
  taskElement.id = taskData.id;
  const statusCheckBox = taskElement.querySelector(".status-check-box");
  const taskText = taskClone.querySelector(".task-text");
  const taskTime = taskClone.querySelector(".task-time");
  const taskRemainingTime = taskClone.querySelector(".task-remaining-time");
  const tickButton = taskClone.querySelector(".task-tick");
  const closeButton = taskClone.querySelector(".task-close");
  // const editButton = taskClone.querySelector(".task-edit");

  taskText.textContent = taskData.task;
  taskTime.textContent = taskData.time;
  taskRemainingTime.textContent = calculateRemainingTime(taskData.time);

  statusCheckBox.checked = taskData.complete;

  statusCheckBox.addEventListener("change", () => {
    handleStatusCheckbox(taskData.id, statusCheckBox.checked);
  });

  closeButton.addEventListener("click", () => {
    taskElement.remove();
    removeTaskFromLocalStorage(taskData);
  });

  // editButton.addEventListener("click", () => {
  //   editTask(taskData, taskClone.querySelector(".task"));
  // });

  return taskClone;
}

function handleStatusCheckbox(taskId, isChecked) {
  let localStorageTodo = JSON.parse(window.localStorage.getItem("todo")) || [];
  localStorageTodo = localStorageTodo.map((task) => {
    if (task.id === taskId) {
      task.complete = isChecked;
    }
    return task;
  });
  window.localStorage.setItem("todo", JSON.stringify(localStorageTodo));
}

function removeTaskFromLocalStorage(taskData) {
  let localStorageTodo = JSON.parse(window.localStorage.getItem("todo"));

  localStorageTodo = localStorageTodo.filter((task) => taskData.id !== task.id);
  window.localStorage.setItem("todo", JSON.stringify(localStorageTodo));
}

function calculateRemainingTime(targetTime) {
  const currentTime = new Date();
  const targetDate = new Date(targetTime);

  const timeDifference = targetDate - currentTime;

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  return minutes < 0 ? "Deadine Passed" : `${days}d ${hours}h ${minutes}m`;
}



const completedTasks =  document.querySelector(".completed-tasks");

completedTasks.addEventListener("click",(event)=>{
  let localStorageTodo = JSON.parse(window.localStorage.getItem("todo"));

    const completedTasksList = localStorageTodo.filter((task)=>task.complete);
    taskList.innerHTML = '';
    completedTasksList.forEach((task) => {
        taskList.appendChild(createTaskCard(task));
    });

})

const remainingTasks =  document.querySelector(".ramaining-tasks");

remainingTasks.addEventListener("click",(event)=>{
  let localStorageTodo = JSON.parse(window.localStorage.getItem("todo"));

    const remainingTasksList = localStorageTodo.filter((task)=>!task.complete);
    taskList.innerHTML = '';
    remainingTasksList.forEach((task) => {
        taskList.appendChild(createTaskCard(task));
    });

})

const allTasks =  document.querySelector(".all-tasks");

allTasks.addEventListener("click",(event)=>{
  let localStorageTodo = JSON.parse(window.localStorage.getItem("todo"));

    taskList.innerHTML = '';
    localStorageTodo.forEach((task) => {
        taskList.appendChild(createTaskCard(task));
    });
    
   
})

document.addEventListener('localStorageChange', function(event) {
  const completedPercentSpan = document.getElementById("completed-percent");
  const remainingPercentSpan = document.getElementById("remaining-percent");


  let localStorageTodo = JSON.parse(window.localStorage.getItem("todo"));
  console.log(localStorageTodo);
  let completedTaskList = localStorageTodo.filter((task)=>!task.complete);
  
  let completedTaskCount = completedTaskList.length;
  let completepercent = Math.floor(((localStorageTodo.length - completedTaskCount)/localStorageTodo.length)*100);
  console.log(completepercent);
  document.documentElement.style.setProperty("--completed-percent", `${completepercent}%`);

  completedPercentSpan.textContent = `${completepercent}%`
  remainingPercentSpan.textContent = `${100-completepercent}%`


})





