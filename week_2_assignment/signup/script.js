document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("login-button");

  loginButton.addEventListener("click", () => {
    window.location.href = "../login/index.html";
  });

  document.querySelector(".signup-form").addEventListener("submit", (event) => {
    const password = document.getElementById("password");

    const retypePassword = document.getElementById("retype-password");
    const formdata = new FormData(event.target);

    const formDataJsObject = Object.fromEntries(formdata.entries());

    if (formDataJsObject["password"] == formDataJsObject["retype-password"]) {
      delete formDataJsObject["retype-password"];
      formDataJsObject.password = CryptoJS.SHA256(formDataJsObject.password).toString();


      let users = localStorage.getItem("users");

      users = users ? JSON.parse(users) : [];

      formDataJsObject.id = "id" + users.length;

      const emailExists = users.some(
        (user) => user.email === formDataJsObject.email
      );

      if (emailExists) {
        alert("user already Exists");
        event.preventDefault();
      } else {
        users.push(formDataJsObject);

        localStorage.setItem("users", JSON.stringify(users));
      }
    } else {
      alert("getting Blaocked in next 10 mins");
      event.preventDefault();
    }
  });
});
