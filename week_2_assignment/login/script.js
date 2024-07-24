

document.querySelector(".signup-form").addEventListener("submit", (event) => {



    const formdata = new FormData(event.target);

    const InputData = Object.fromEntries(formdata.entries());



    const usersDataString = localStorage.getItem("users");

    const users = JSON.parse(usersDataString);

    let employe = users.find(emp => emp.email === InputData.email)

    if (employe) {
        let password = CryptoJS.SHA256(InputData.password).toString();

        if (password!= employe.password) {
            console.log(InputData.password,employe.password)
            alert("Wrong Password");
            event.preventDefault();

        }
       

    }
    else{
        alert("employe not found");
        event.preventDefault();
    }
}
)