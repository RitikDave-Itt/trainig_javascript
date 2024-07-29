
const form  = document.getElementById("addTodo");
const displayTodo = document.getElementsByClassName("display-todo")[0];
const todoCard = document.getElementsByClassName("todo-card")[0];

window.onload = async ()=>{

    let todos = window.localStorage.getItem("todos");
    todos =await  JSON.parse(todos);

    todos.map((todo)=>{
        const newCard = todoCard.cloneNode(true);
        newCard.classList.remove("heading");
    
        newCard.getElementsByClassName("task-name")[0].innerText = todo.task;
        newCard.getElementsByClassName("task-time")[0].innerText = todo.time;
        newCard.getElementsByClassName("remaining-time")[0].innerText = calculateRemainingTime(todo.time);
        displayTodo.insertBefore(newCard,displayTodo.firstChild);


    })

}


form.addEventListener("submit",(event)=>{
    event.preventDefault();

    const formData = new FormData(event.target);

    const todo  = {};

    formData.forEach((value,key)=>{
        todo[key]=  value;
    })

    let todos = window.localStorage.getItem("todos");
    if(todos){
        todos = JSON.parse(todos);
        todos.push(todo);
    }
    else{
        todos = [todo];
    }

    window.localStorage.setItem("todos",JSON.stringify(todos))
    const newCard = todoCard.cloneNode(true);
        newCard.classList.remove("heading");
    
        newCard.getElementsByClassName("task-name")[0].innerText = todo.task;
        newCard.getElementsByClassName("task-time")[0].innerText = todo.time;
        newCard.getElementsByClassName("remaining-time")[0].innerText = calculateRemainingTime(todo.time);
        displayTodo.insertBefore(newCard,displayTodo.firstChild);

   



})

function calculateRemainingTime(targetTime) {
    const currentTime = new Date();
    const targetDate = new Date(targetTime);

    const timeDifference = targetDate - currentTime;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m`;
}




