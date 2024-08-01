document.querySelector(".login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const formdata = new FormData(event.target);
    const InputData = Object.fromEntries(formdata.entries());

    
(async()=>{
    try {
        const user = await getUserData(InputData.email);
        if (user) {
            if (user.password !== InputData.password) {
                alert("Wrong Password");
            } 
            else {
                window.localStorage.setItem("authenticated","true");               
                window.location.href="../gallery/index.html";
            }
        } 
        else {
            alert("User not found.");
        }
    } catch (error) {
        console.error("Error user authentication:", error);
    }
})()
});

function getUserData(email) {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open("users", 1);

        request.onerror = (error) => {
            reject(error);
        };

        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction("users", "readonly");
            const objectStore = transaction.objectStore("users");

            const getRequest = objectStore.get(email);

            getRequest.onsuccess = () => {
                if (getRequest.result) {
                    console.log(getRequest.result);
                    resolve(getRequest.result);
                } else {
                    resolve(null); 
                }
            };

            getRequest.onerror = (error) => {
                reject(error);
            };
        };
    });
}
