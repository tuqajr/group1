const userBar = document.getElementById("user-bar");
const userMenu = document.getElementById("user-menu");

document.addEventListener("DOMContentLoaded", () => {
  const loc = JSON.parse(localStorage.getItem("answer"));
  document.getElementById("name3").placeholder = loc.name || "";
  document.getElementById("email3").placeholder = loc.email || "";
});

userBar.addEventListener("click", function (event) {
  event.stopPropagation();

  if (userMenu.style.display === "none" || userMenu.style.display === "") {
    userMenu.style.display = "block";
  } else {
    userMenu.style.display = "none";
  }
});

document.getElementById("logout").addEventListener("click", function (e) {
  window.location.href = "./index.html";
});

document.addEventListener("click", function (event) {
  if (
    event.target !== userBar &&
    event.target !== userMenu &&
    !userMenu.contains(event.target)
  ) {
    userMenu.style.display = "none";
  }
});

let form3 = document.getElementById("form3");
if (form3) {
  form3.addEventListener("submit", (event) => {
    event.preventDefault();
    const name3 = document.getElementById("name3").value || "";
    const email3 = document.getElementById("email3").value || "";
    const currentPassword =
      document.getElementById("current-password").value || "";
    const newPassword = document.getElementById("new-password").value || "";

    let r = JSON.parse(localStorage.getItem("answer"));

    if (name3.trim().length < 1) {
      document.getElementById("answer3").style.color = "red";
      document.getElementById("answer3").innerHTML = "Name should not be empty";
    }
    if (currentPassword !== r.password) {
      document.getElementById("answer3").style.color = "red";
      document.getElementById("answer3").innerHTML =
        "Incorrect current password";
    }
    if (newPassword.length < 8) {
      document.getElementById("answer3").style.color = "red";
      document.getElementById("answer3").innerHTML =
        "New Password should be at least 8 characters long";
    }
    if (
      currentPassword === r.password &&
      newPassword.length > 8 &&
      name3.trim().length > 1
    ) {
      localStorage.setItem(
        "answer",
        JSON.stringify({ name: name3, email: email3, password: newPassword })
      );
      window.location.href = "./index.html";
    }
  });
}

document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("answer");
  window.location.href = "./index.html";
});
