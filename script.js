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
  const loc = JSON.parse(localStorage.getItem("answer")) || [];

  if (loc && loc.logedin == true) {
    let menu = document.getElementById("user-menu-main");
    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
    return;
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
  let userData = JSON.parse(localStorage.getItem("answer"));
  userData.logedin = false;
  localStorage.setItem("answer", JSON.stringify(userData));
  document.location.href = "./index.html";
});

document.addEventListener("DOMContentLoaded", function () {
  const loc = JSON.parse(localStorage.getItem("answer")) || "";
  const logedin = loc.logedin;
  if (logedin == false) {
    document.getElementById("name-of-user").innerText = `Signin`;
  }
  if (!loc) {
    document.getElementById("name-of-user").innerText = `Signup`;
  }
  if (logedin == true) {
    document.getElementById("name-of-user").innerText = `${loc.name}`;
  }
});
