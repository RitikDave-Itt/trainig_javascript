




class ListNode {
  constructor(task) {
    this.task = task;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  
  addTask(task) {
    const newNode = new ListNode(task);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next !== null) {
      current = current.next;
    }
    current.next = newNode;
  }

  printList() {
    let current = this.head;
    while (current !== null) {
      console.log(current.task); 
      current = current.next;
    }
  }

  
  removeTask(taskId) {
    if (!this.head) return;

    if (this.head.task.id === taskId) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    while (current.next !== null && current.next.task.id !== taskId) {
      current = current.next;
    }

    if (current.next !== null) {
      current.next = current.next.next;
    }
  }

  
  toArray() {
    const tasksArray = [];
    let current = this.head;
    while (current !== null) {
      tasksArray.push(current.task);
      current = current.next;
    }
    return tasksArray;
  }

  
  findTask(taskId) {
    let current = this.head;
    while (current !== null) {
      if (current.task.id === taskId) {
        return current.task;
      }
      current = current.next;
    }
    return null;
  }

  
  updateTaskCompletion(taskId, isComplete) {
    let current = this.head;
    while (current !== null) {
      if (current.task.id === taskId) {
        current.task.complete = isComplete;
        // window.localStorage.setItem("todo", JSON.stringify(this.toArray()));
        return;

      }
      current = current.next;
    }
  }
}

function convertArrayToLinkedList(tasksArray) {
  const linkedList = new LinkedList();
  tasksArray.forEach((task) => {
    linkedList.addTask(task);
  });
  return linkedList;
}


function getCompletedTasksLinkedList() {
  let completedTasksLinkedList = new LinkedList(); 
  let current = taskLinkedList.head; 

  while (current !== null) {
    if (current.task.complete) {
      // console.log(current.data);
      
      completedTasksLinkedList.addTask(current.task); 
    }
    current = current.next; 
  }

  return completedTasksLinkedList;
}
function getRemainingTasksLinkedList() {
  let remainingTasksLinkedList = new LinkedList(); 
  let current = taskLinkedList.head; 

  while (current !== null) {
    if (!current.task.complete) {
      // console.log(current.data);
      
      remainingTasksLinkedList.addTask(current.task); 
    }
    current = current.next; 
  }

  return remainingTasksLinkedList;
}





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









const formTodo = document.querySelector(".form-todo");
let taskList = document.querySelector(".task-list");

let taskLinkedList = new LinkedList();



document.addEventListener("DOMContentLoaded", (event) => {
  
  document.dispatchEvent(localStorageChangeEvent); 


  let localStorageTodo = JSON.parse(window.localStorage.getItem("todo"));
  

  taskLinkedList = convertArrayToLinkedList(localStorageTodo);

  // taskLinkedList.printList();
  


  let current = taskLinkedList.head;

  while(current){

    taskList.appendChild(createTaskCard(current.task));
    console.log(current.task)
    current = current.next;


    
  }
  
});
 taskList = document.querySelector(".task-list");


formTodo.addEventListener("submit", (event) => {
  event.preventDefault();
  let data = new FormData(formTodo);
  let dataObject = Object.fromEntries(data.entries());
  dataObject["id"] = Date.now();
  dataObject["complete"] = false;
  


  taskLinkedList.addTask(dataObject);

  

  window.localStorage.setItem("todo", JSON.stringify(taskLinkedList.toArray()));
  formTodo.reset();

  inputTodo.classList.toggle("hide");
  const taskCard = createTaskCard(dataObject);
  taskList.appendChild(taskCard);
});

function createTaskCard(taskData) {
  const taskClone = taskTemplate.content.cloneNode(true);
  const taskElement = taskClone.querySelector(".task");
  taskClone.id = taskData.id;
  const statusCheckBox = taskElement.querySelector(".status-check-box");
  const taskText = taskClone.querySelector(".task-text");
  const taskTime = taskClone.querySelector(".task-time");
  const taskRemainingTime = taskClone.querySelector(".task-remaining-time");
  const tickButton = taskClone.querySelector(".task-tick");
  const closeButton = taskClone.querySelector(".task-close");
  

  taskText.textContent = taskData.task;
  taskTime.textContent = taskData.time;
  taskRemainingTime.textContent = calculateRemainingTime(taskData.time);

  statusCheckBox.checked = taskData.complete;

  statusCheckBox.addEventListener("change", () => {
    handleStatusCheckbox(taskData.id, statusCheckBox.checked);
    document.dispatchEvent(localStorageChangeEvent); 

  });

  closeButton.addEventListener("click", () => {
    taskElement.remove();
    removeTaskFromLocalStorage(taskData);
  });

  
  
  

  return taskClone;
}

function handleStatusCheckbox(taskId, isChecked) {

  taskLinkedList.updateTaskCompletion(taskId, isChecked);
  window.localStorage.setItem("todo", JSON.stringify(taskLinkedList.toArray()));
  
}

function removeTaskFromLocalStorage(taskData) {
taskLinkedList.removeTask(taskData.id);

window.localStorage.setItem("todo", JSON.stringify(taskLinkedList.toArray()));
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

  const completedTasksList = getCompletedTasksLinkedList(); 
taskList.innerHTML = ''; 


let current = completedTasksList.head; 

while (current !== null) {
  taskList.appendChild(createTaskCard(current.task)); 
  current = current.next; 
}
})

const remainingTasks =  document.querySelector(".ramaining-tasks");

remainingTasks.addEventListener("click",(event)=>{
  
  const remainingTaskLinkedList = getRemainingTasksLinkedList(); 
taskList.innerHTML = ''; 


let current = remainingTaskLinkedList.head; 

while (current !== null) {
  taskList.appendChild(createTaskCard(current.task)); 
  current = current.next; 
}
  
  

})

const allTasks =  document.querySelector(".all-tasks");

allTasks.addEventListener("click",(event)=>{

    taskList.innerHTML = '';
    
    let current = taskLinkedList.head;

    while(current!==null){
      taskList.appendChild(createTaskCard(current.task));
      current = current.next;
    }
    
   
})

document.addEventListener('localStorageChange', function(event) {
  
  const completedPercentSpan = document.getElementById("completed-percent");
  const remainingPercentSpan = document.getElementById("remaining-percent");


  let localStorageTodo = JSON.parse(window.localStorage.getItem("todo"));
  // console.log(localStorageTodo);
  let completedTaskList = localStorageTodo.filter((task)=>!task.complete);
  
  let completedTaskCount = completedTaskList.length;
  let completepercent = Math.floor(((localStorageTodo.length - completedTaskCount)/localStorageTodo.length)*100);
  // console.log(completepercent);
  document.documentElement.style.setProperty("--completed-percent", `${completepercent}%`);

  completedPercentSpan.textContent = `${completepercent}%`
  remainingPercentSpan.textContent = `${100-completepercent}%`


})




const remainingTimeHeader = document.querySelector(".remaining-time-header");

function getRemainingTimeValue(remainingTimeText) {
  if (remainingTimeText === "Deadline Passed") return Number.MAX_SAFE_INTEGER;

  const timeParts = remainingTimeText.split(" ");
  const days = parseInt(timeParts[0]) || 0;
  const hours = parseInt(timeParts[1]) || 0;
  const minutes = parseInt(timeParts[2]) || 0;
  
  return days * 24 * 60 + hours * 60 + minutes; 
}


function sortTaskElementsByRemainingTime(taskElements) {
  return Array.from(taskElements).sort((a, b) => {
    const remainingTimeA = a.querySelector(".task-remaining-time").textContent;
    const remainingTimeB = b.querySelector(".task-remaining-time").textContent;
    return getRemainingTimeValue(remainingTimeA) - getRemainingTimeValue(remainingTimeB);
  });
}

remainingTimeHeader.addEventListener("click", () => {
  let taskList = document.querySelector(".task-list");


  const taskElements = taskList.children;
  const sortedTasks = sortTaskElementsByRemainingTime(taskElements);
  taskList.innerHTML = ''; 
  sortedTasks.forEach(taskElement => taskList.appendChild(taskElement)); 
});





