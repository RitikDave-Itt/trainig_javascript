document.addEventListener("DOMContentLoaded",()=>{
    let buttons  = document.getElementsByClassName("button");
    let screen = document.getElementById("screen");
    screen.focus();

    
    let clr = document.getElementById("clr");
    let Enter = document.getElementById("Enter");
    let bkspace = document.getElementById("backspace");
    Array.from(buttons).forEach(button => {
        
        button.addEventListener("click", () => {

            screen.value+= button.innerHTML;
            button.classList.add("blink");

            setTimeout(()=>{
                button.classList.remove("blink");
            },200);

        });
    });


    clr.addEventListener("click",()=>{
        screen.value = "";
        clr.classList.add("blink");

            setTimeout(()=>{
                clr.classList.remove("blink");
            },100);
    })

    Enter.addEventListener("click",()=>{
        try{
        screen.value =  eval(screen.value)??"undefined";
        }
        catch(error){
            screen.value = "Invalid !";
            setTimeout(()=>{
                screen.value = "";

            },500)
        }
        Enter.classList.add("blink");

            setTimeout(()=>{
                Enter.classList.remove("blink");
            },100);
    })
    bkspace.addEventListener("click",()=>{
        screen.value = screen.value.slice(0,-1);
        bkspace.classList.add("blink");

            setTimeout(()=>{
                bkspace.classList.remove("blink");
            },100);
    })

    document.addEventListener("keydown",(event)=>{
        if(event.key==="Enter"){
            try{
            screen.value = eval(screen.value);
            }
            catch{
                screen.value = "Invalid !"
                setTimeout(()=>{
                    screen.value = "";

                },500);
            }

        }
        else if(!isNaN(event.key)||isoperator(event.key)||event.key==="Enter"||event.key==="Backspace"){
            let key = document.getElementById(event.key);

            key.classList.add("blink");

            setTimeout(()=>{key.classList.remove("blink")},100);

        }
        else if(isNaN(event.key)){
            let screen = document.getElementById("screen");
            screen.classList.add("shake");
            setTimeout(()=>{
                screen.classList.remove("shake");


            },30);
        }

    })




    


})

function isoperator(key){
    return ['+','-','/','*'].includes(key);
}