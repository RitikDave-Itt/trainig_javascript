function onsubmit(){
    let x = document.forms["myform"]["fname"].value;

    if(x==""){
        alert("fname is empty");
    }

}