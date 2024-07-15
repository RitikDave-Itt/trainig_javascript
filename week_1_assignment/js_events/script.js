document.addEventListener("DOMContentLoaded",()=>{

let onclick = document.getElementById("onclick");
let dblclick = document.getElementById("dblclick");

let hover = document.getElementById("hover");


let scroll = document.getElementById("scroll");

let outmouse = document.getElementById("outmouse");

onclick.addEventListener("click",()=>{
    onclick.style.backgroundColor = onclick.style.backgroundColor=="orange"?"":"orange";
})

dblclick.addEventListener("dblclick",()=>{
    dblclick.style.backgroundColor = dblclick.style.backgroundColor=="orange"?"":"orange";
})

hover.addEventListener("mouseover",()=>{
    hover.style.backgroundColor = hover.style.backgroundColor=="orange"?"":"orange";
})

hover.addEventListener("mouseout",()=>{
    hover.style.backgroundColor = hover.style.backgroundColor=="orange"?"":"orange";
})

mouseout.addEventListener("mouseout",()=>{
    mouseout.style.backgroundColor = mouseout.style.backgroundColor=="orange"?"":"orange";
})




})

