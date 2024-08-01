// #########################################################################################
// Styling 
// #########################################################################################


const addTaskButton = document.getElementsByClassName("add-task-button")[0];
const inputTodo = document.getElementsByClassName("input-todo")[0];
const closeInput=document.getElementsByClassName("close-input")[0];
const fun = document.getElementsByClassName("fun")[0];
const taskTemplate = document.querySelector("#task-template");



addTaskButton.addEventListener("click",()=>{
    inputTodo.classList.toggle("hide")

    


})
closeInput.addEventListener("click",()=>{
    inputTodo.classList.toggle("hide");


})

function changeColor() {
    const baseR = 123;
    const baseG = 45;
    const baseB = 67;

    document.documentElement.style.setProperty('--base-r', baseR);
    document.documentElement.style.setProperty('--base-g', baseG);
    document.documentElement.style.setProperty('--base-b', baseB);
}

function getRandomValue() {
    return Math.floor(Math.random() * 256);
}

function changeColor() {
    const baseR = getRandomValue();
    const baseG = getRandomValue();
    const baseB = getRandomValue();

    document.documentElement.style.setProperty('--base-r', baseR);
    document.documentElement.style.setProperty('--base-g', baseG);
    document.documentElement.style.setProperty('--base-b', baseB);
}

let isRunning = false;

fun.addEventListener("click",()=>{
    changeColor();
    changeLogoColor();

    
})

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function changeLogoColor() {

    document.querySelector('.rect1').style.backgroundColor = getRandomColor();
    document.querySelector('.rect2').style.backgroundColor = getRandomColor();
    document.querySelector('.rect3').style.backgroundColor = getRandomColor();
    document.querySelector('.rect4').style.backgroundColor = getRandomColor();
}




// #########################################################################################
// Logic 
// #########################################################################################

const formTodo = document.querySelector(".form-todo");
const taskList = document.querySelector(".task-list");
// const taskCard = document.querySelector(".task");

formTodo.addEventListener("submit",(event)=>{
    event.preventDefault();
    let data = new FormData(formTodo);
    let dataObject = Object.fromEntries(data.entries());
    console.log(dataObject)

    let localStorageTodo = window.localStorage.getItem("todo");

    if(localStorageTodo){
        localStorageTodo = JSON.parse(localStorageTodo);
        localStorageTodo.push(dataObject);

    }
    else{
        localStorageTodo = [dataObject];

    }

    window.localStorage.setItem("todo",JSON.stringify(localStorageTodo));
    formTodo.reset();

    inputTodo.classList.toggle("hide");
    const taskCard = createTaskCard(dataObject);
    taskList.appendChild(taskCard);


    



    

})


function createTaskCard(taskData) {
    const taskClone = taskTemplate.content.cloneNode(true);
    const taskText = taskClone.querySelector(".task-text");
    const taskTime = taskClone.querySelector(".task-time");
    const taskRemainingTime = taskClone.querySelector(".task-remaining-time");
    const tickButton = taskClone.querySelector(".task-tick");
    const closeButton = taskClone.querySelector(".task-close");
    const editButton = taskClone.querySelector(".task-edit");

    taskText.textContent = taskData.task;
    taskTime.textContent = taskData.time;
    taskRemainingTime.textContent = calculateRemainingTime(taskData.time);

    tickButton.addEventListener("click", () => {
        tickButton.classList.toggle("completed");
        tickButton.textContent = tickButton.classList.contains("completed") ? "☑️" : "✅";    });

    closeButton.addEventListener("click", () => {
        taskClone.querySelector(".task").remove();
        removeTaskFromLocalStorage(taskData);
    });

    editButton.addEventListener("click", () => {
        editTask(taskData, taskClone.querySelector(".task"));
    });

    return taskClone;
}


function calculateRemainingTime(targetTime) {
    const currentTime = new Date();
    const targetDate = new Date(targetTime);

    const timeDifference = targetDate - currentTime;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return (minutes<0)?"Deadine Passed": `${days}d ${hours}h ${minutes}m`;
}
