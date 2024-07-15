document.addEventListener("DOMContentLoaded",()=>{

let onclick = document.getElementById("onclick");
let dblclick = document.getElementById("dblclick");

let hover = document.getElementById("hover");


let scroll = document.getElementById("scroll");

let outmouse = document.getElementById("outmouse");

onclick.addEventListener("click",()=>{
    onclick.classList.contains("event")?onclick.classList.remove("event"):onclick.classList.add("event");

})

dblclick.addEventListener("dblclick",()=>{
    dblclick.classList.contains("event")?dblclick.classList.remove("event"):dblclick.classList.add("event");
})

hover.addEventListener("mouseover",()=>{
    hover.classList.add("event");
    
})


hover.addEventListener("mouseout",()=>{
    hover.classList.remove("event");
})

mouseout.addEventListener("mouseout",()=>{
    mouseout.classList.contains("event")?mouseout.classList.remove("event"):mouseout.classList.add("event");
})






})
document.addEventListener("keydown",(event)=>{
    let keybtn = document.getElementById("keybtn");
    if(event.key == " ")
        keybtn.innerHTML= "Space"
    else
        keybtn.innerText =event.key;
    setTimeout(()=>{
        keybtn.innerText = "";
    },200);

})

