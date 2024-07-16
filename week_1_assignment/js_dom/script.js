


let input = document.getElementById("input");
let viewText = document.getElementById("viewText");

let boxes = document.getElementsByClassName("box");

let red = document.getElementById("red");
let redValue = document.getElementById("redValue")

let greenValue = document.getElementById("greenValue")
let blueValue = document.getElementById("blueValue")


let green = document.getElementById("green");
let blue = document.getElementById("blue");
let size = document.getElementById("size");
let sizeValue = document.getElementById("sizeValue");
let weight = document.getElementById("weight");
let weightValue = document.getElementById("weightValue");


let innerBox = document.getElementsByClassName("inner-box")[0];

function updateColor(){
    let r = red.value;
    let g = green.value;
    let b = blue.value;
    viewText.style.color = `rgb(${r},${g},${b})`;

    redValue.innerText = r;
    greenValue.innerText = g;
    blueValue.innerText = b;
}





document.addEventListener("DOMContentLoaded",()=>{
    input.addEventListener("input",()=>{
        viewText.innerText  = input.value;
    })

    Array.from(boxes).forEach(box=>{
        box.addEventListener("click",()=>{
            viewText.className = "";
            viewText.classList.add(box.classList[0]);
            1
        })
        box.addEventListener("mouseover",()=>{
            box.firstChild.style.fontSize = "3rem"
           
        })
        box.addEventListener("mouseout",()=>{
            box.firstChild.style.fontSize="";
            
        })
    })

    size.addEventListener("input",()=>{
        viewText.style.fontSize = `${size.value/10}rem`
        sizeValue.innerText = size.value;
    })
    weight.addEventListener("input",()=>{
        viewText.style.fontWeight = `${weight.value}`
        weightValue.innerText = weight.value;
    })

    red.addEventListener("input",updateColor);
    green.addEventListener("input",updateColor);
    blue.addEventListener("input",updateColor);

    

    



})
