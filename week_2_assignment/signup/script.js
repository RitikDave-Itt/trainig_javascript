document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("login-button");

  loginButton.addEventListener("click", () => {
    window.location.href = "../login/index.html";
  });

  document.querySelector(".signup-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const formdata = new FormData(event.target);
    const formObject = {};

    formdata.forEach((value, key) => {
      formObject[key] = value;
    });

    if (formObject["password"] !== formObject["retype-password"]) {
      alert("Passwords do not match");
      return;
    }

    const file = formdata.get("image");
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const base64String = e.target.result;
        formObject.image = base64String;
        saveToIndexedDB(formObject);
      };
      reader.readAsDataURL(file); 
    } else {
      saveToIndexedDB(formObject);
    }
  });
});


function saveToIndexedDB(obj) {
  const request = window.indexedDB.open("users", 1);

  request.onerror = (error) => {
    console.log("Error opening database:", error);
  };

  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.createObjectStore("users", {
      keyPath: "email",
    });
  };

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction("users", "readwrite");
    const objectStore = transaction.objectStore("users");

    const emailCheck = objectStore.get(obj.email);

    emailCheck.onsuccess = () => {
      if (emailCheck.result) {
        alert("Email already exists.");
      } else {
        const addRequest = objectStore.add(obj);

        addRequest.onsuccess = () => {
          console.log("User added successfully.");
          window.location.href = "../login/index.html";
        }

        addRequest.onerror = (error) => {
          console.log("Error adding user:", error);
        };

        transaction.oncomplete = () => {
          console.log("Transaction completed: database modification finished.");
        };

        transaction.onerror = (error) => {
          console.log("Transaction error:", error);
        };
      }
    };

    emailCheck.onerror = (error) => {
      console.log("Error checking email:", error);
    };
  };
}

