
document.addEventListener("DOMContentLoaded",async ()=>{

    const leftButton = document.querySelector(".leftButton");
    const rightButton = document.querySelector(".rightButton");

    const employe = document.querySelector(".employe");

    async function fetchEmployees(){
        try{
            const response = await fetch('usersDetails.json');
            if (!response.ok) {
                throw new Error('cant fetch');
            }
            const employes = await response.json();

            return employes;

        }
        catch(Error){

            console.log("cant fetch ========= \n"+Error);
        }
    }

    const employes = await fetchEmployees();

    console.log(employes);
  

    // console.log(test());
    let index = 0;


    function updateEmployeDiv(userData){
        

        const newEmploye = employe.cloneNode(employe);
        document.querySelector(".empImage").querySelector("img").src = `images/${userData.employeeId}.jpg`

        document.querySelector("#name").textContent = userData.name;
        document.querySelector("#designation").textContent = userData.designation;
        document.querySelector("#exp").textContent = new Date().getFullYear()-userData.joiningYear;
        document.querySelector("#tech").textContent =userData.technology;
        document.querySelector("#department").textContent = userData.department;


        return newEmploye;

        
        
    }

    leftButton.addEventListener("click",()=>{

        if(index>0){
            index--

        updateEmployeDiv(employes[index]);
        }
        
    })
    rightButton.addEventListener("click",()=>{
        if(index<employes.length-1){
            index++;

        updateEmployeDiv(employes[index]);
        }
        
    })

    

    

    




})