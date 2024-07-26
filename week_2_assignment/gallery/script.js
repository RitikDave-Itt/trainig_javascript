document.addEventListener("DOMContentLoaded", async (event) => {
    if (window.localStorage.getItem("authenticated") !== "true") {
        window.location.href="../defaultPages/unAuthorised.html"

    }


    else {


        const leftButton = document.querySelector(".leftButton");
        const rightButton = document.querySelector(".rightButton");

        const employe = document.querySelector(".employe");

        const employees  = []

(async ()=>{
    try{
    employees = await fetchEmployees();
    }
    catch{(error)=>{
        console.log(error);
    }

    }

})();
        console.log(employees);


        
        let index = 0;



        updateEmployeDiv(employees[index],employe)

        leftButton.addEventListener("click", () => {

            if (index > 0) {
                index--

                updateEmployeDiv(employees[index]);
            }

        })
        rightButton.addEventListener("click", () => {
            if (index < employees.length - 1) {
                index++;

                updateEmployeDiv(employees[index]);
            }

        })
    }
})














function fetchEmployees() {

    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open("users", 1);


        request.onsuccess = (event) => {

            const db = event.target.result;

            const transaction = db.transaction("users", "readonly");
            const objectStore = transaction.objectStore("users");

            const employeesRequest = objectStore.getAll();

            employeesRequest.onsuccess = () => {
                resolve(employeesRequest.result);
            }
            employeesRequest.onerror = (error) => {
                reject(error);

            }

            transaction.onsuccess = () => {
                console.log("transaction success");
            }
            transaction.onerror = (error) => {
                console.log(`transaction error ${error}`);
            }


        }

    })


}


function updateEmployeDiv(userData ,employe) {



    const newEmploye = employe.cloneNode(employe);
    document.querySelector(".empImage").querySelector("img").src = userData.image

    document.querySelector("#name").textContent = userData.name;
    document.querySelector("#designation").textContent = userData.designation;
    document.querySelector("#exp").textContent = new Date().getFullYear() - userData.joiningYear;
    document.querySelector("#tech").textContent = userData.technology;
    document.querySelector("#department").textContent = userData.department;


    return newEmploye;



}

