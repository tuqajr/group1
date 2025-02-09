// document.addEventListener("DOMContentLoaded", () => {
// // fetch("http://localhost:8080/workout/table", {
// //   method: "POST",
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// //   body: JSON.stringify({
// //     fitnessClass: "Triceps and Biceps",
// //     imageUrl: "image.url.com",
// //     Trainer: "Mohammed",
// //     Duration: 60,
// //     date: new Date(2025, 2, 7),
// //   }),
// // })
// //   .then((res) => {
// //     if (!res.ok) {
// //       throw new Error(`HTTP error! Status: ${res.status}`);
// //     }
// //     return res.json();
// //   })
// //   .then((data) => {
// //     console.log("Response:", data);
// //   })
// //   .catch((error) => {
// //     console.error("Error:", error);
// //   });

//   fetch("http://localhost:8080/workout/table", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       console.log(data);
//     });
// });
document.getElementById("signup-btn-1").addEventListener("click", () => {
  // const loc = JSON.parse(localStorage.getItem("answer"));
  const users = JSON.parse(localStorage.getItem("user")) || [];

  // Find the first user who is logged in
  const loggedInUser = users.find((user) => user.logedin === true);

  if (loggedInUser) {
    let menu = document.getElementById("user-menu-main");
    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
  } else {
    document.location.href = "./Auth/index.html";
  }
});

document.getElementById("usersettings").addEventListener("click", () => {
  document.location.href = "./Auth/edit.html";
});

document.getElementById("schedule").addEventListener("click", () => {
  document.location.href = "./workout.html";
});

document.getElementById("logout").addEventListener("click", () => {
  let users = JSON.parse(localStorage.getItem("user")) || [];

  let loggedInUser = users.find((user) => user.logedin === true);
  console.log(loggedInUser);

  if (loggedInUser) {
    loggedInUser.logedin = false;

    localStorage.setItem("user", JSON.stringify(users));
  }

  document.location.href = "./index.html";
});

document.addEventListener("DOMContentLoaded", function () {
  const users = JSON.parse(localStorage.getItem("user")) || [];

  // Find the logged-in user
  const loggedInUser = users.find((user) => user.logedin === true);

  let nameElement = document.getElementById("name-of-user");
  console.log(loggedInUser);

  if (!loggedInUser) {
    nameElement.innerText = "Signup";
  } else {
    nameElement.innerText = loggedInUser.name || "Signin";
  }
});

document.getElementById("hero-button").addEventListener("click", () => {
  document.location.href = "./Auth/index.html";
});
