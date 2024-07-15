document.addEventListener("DOMContentLoaded",()=>{
    let buttons  = document.getElementsByClassName("button");
    let screen = document.getElementById("screen");
    screen.focus();

    
    let clr = document.getElementById("clr");
    let ans = document.getElementById("ans");
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

    ans.addEventListener("click",()=>{
        try{
        screen.value =  eval(screen.value)??"undefined";
        }
        catch(error){
            screen.value = "Invalid !";
            setTimeout(()=>{
                screen.value = "";

            },500)
        }
        ans.classList.add("blink");

            setTimeout(()=>{
                ans.classList.remove("blink");
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
        else if(event.key==="Backspace"){
            screen.value = screen.value.slice(0,-1);
        }

    })




    


})