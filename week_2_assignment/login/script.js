document.querySelector(".signup-form").addEventListener("submit", async (event) => {
    event.preventDefault(); 

    const formdata = new FormData(event.target);
    const InputData = Object.fromEntries(formdata.entries());

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
                        resolve(getRequest.result);
                    } else {
                        resolve(null); // Resolve with null if no user is found
                    }
                };

                getRequest.onerror = (error) => {
                    reject(error);
                };
            };
        });
    }

    try {
        const user = await getUserData(InputData.email);
        if (user) {
            if (user.password !== InputData.password) {
                alert("Wrong Password");
            } else {
                // Proceed with form submission or any other logic
                console.log("User authenticated:", user);
                event.target.submit(); // Explicitly submit the form if authentication is successful
            }
        } else {
            alert("User not found with this email.");
        }
    } catch (error) {
        console.error("Error during user authentication:", error);
    }
});
