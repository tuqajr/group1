const userBar = document.getElementById("user-bar");
const userMenu = document.getElementById("user-menu");

document.addEventListener("DOMContentLoaded", () => {
  function getLoggedInUser() {
    let users = JSON.parse(localStorage.getItem("user")) || [];
    return users.find((user) => user.logedin === true) || null;
  }

  const users = JSON.parse(localStorage.getItem("user")) || [];
  const fetchedArray = users.find((user) => user.logedin === true);

  // Find the logged-in user
  const loggedInUser = users.find((user) => user.logedin === true);
  console.log(loggedInUser);

  if (loggedInUser) {
    document.getElementById("name3").placeholder = loggedInUser.name || "";
    document.getElementById("email3").placeholder = loggedInUser.email || "";
  }

  function updateCards() {
    let cardContainer = document.getElementById("cont-ed");
    cardContainer.innerHTML = "";

    // Check if the user is logged in
    let loggedInUser = getLoggedInUser();
    if (!loggedInUser) return;

    const favorites = loggedInUser.fav || []; // Get the logged-in user's favorites
    console.log(favorites);

    for (let i = 0; i < favorites.length; i++) {
      const card = favorites[i];

      const cardHTML = `
        <div class="col">
          <div class="card">
            <div class="row">
              <div class="col-4 col-sm-3 img_container">
                <img
                  src="${card.imageUrl}"
                  class="img-fluid rounded schedule_pic image-ahmed"
                  alt="..."
                />
              </div>
              <div class="col card_information d-flex flex-column align-items-start justify-content-center p-1">
                <p class="card-text">
                  <small>
                    <span class="day">${card.day}</span>
                    <span class="start">${card.time.start}</span> - 
                    <span class="end">${card.time.end}</span>
                  </small>
                </p>
                <p class="card-title">${card.className}</p>
                <p class="card-text">
                  <small>By ${card.trainer}, ${card.duration}</small>
                </p>
              </div>
              <div class="col-2 d-flex py-4 px-4 justify-content-end favoriteContainer">
                <i class="fa-regular fa-heart fa-xl favoriteOff" style="display: none;" data-index="${i}"></i>
                <i class="fa-solid fa-heart fa-xl favoriteOn" style="display: block;" data-index="${i}"></i>
              </div>
            </div>
          </div>
        </div>
        `;

      cardContainer.insertAdjacentHTML("beforeend", cardHTML);
    }

    // Add event listeners to favorite icons
    document.querySelectorAll(".favoriteContainer").forEach((container) => {
      const favoriteOff = container.querySelector(".favoriteOff");
      const favoriteOn = container.querySelector(".favoriteOn");
      const index = favoriteOn.dataset.index;

      favoriteOff.addEventListener("click", () => {
        favoriteOff.style.display = "none";
        favoriteOn.style.display = "block";
        addToFavorites(favorites[index]);
      });

      favoriteOn.addEventListener("click", () => {
        favoriteOn.style.display = "none";
        favoriteOff.style.display = "block";
        removeFromFavorites(favorites[index]);
      });
    });
  }

  function addToFavorites(card) {
    let users = JSON.parse(localStorage.getItem("user")) || [];
    let userIndex = users.findIndex((user) => user.logedin === true);

    if (userIndex === -1) return;

    let loggedInUser = users[userIndex];

    if (
      !loggedInUser.fav.some(
        (fav) => fav.className === card.className && fav.day === card.day
      )
    ) {
      loggedInUser.fav.push(card);
    }

    users[userIndex] = loggedInUser;
    localStorage.setItem("user", JSON.stringify(users));
  }

  function removeFromFavorites(card) {
    let users = JSON.parse(localStorage.getItem("user")) || [];
    let userIndex = users.findIndex((user) => user.logedin === true);

    if (userIndex === -1) return;

    let loggedInUser = users[userIndex];

    loggedInUser.fav = loggedInUser.fav.filter(
      (fav) => fav.className !== card.className || fav.day !== card.day
    );

    users[userIndex] = loggedInUser;
    localStorage.setItem("user", JSON.stringify(users));
  }
  updateCards();
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

form3.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("user")
  const name3 = document.getElementById("name3").value.trim();
  const email3 = document.getElementById("email3").value.trim();
  const currentPassword = document.getElementById("current-password").value;
  const newPassword = document.getElementById("new-password").value;
  const messageElement = document.getElementById("answer3");

  let users = JSON.parse(localStorage.getItem("user")) || [];

  // Find the index of the logged-in user
  let userIndex = users.findIndex((user) => user.logedin === true);

  if (userIndex === -1) {
    messageElement.style.color = "red";
    messageElement.innerHTML = "No user is logged in.";
    return;
  }

  let loggedInUser = users[userIndex]; // Get the logged-in user object
  console.log(loggedInUser);
  
  // Validation checks
  if (name3.length < 1) {
    messageElement.style.color = "red";
    messageElement.innerHTML = "Name should not be empty";
    return;
  }

  if (currentPassword !== loggedInUser.password) {
    messageElement.style.color = "red";
    messageElement.innerHTML = "Incorrect current password";
    return;
  }

  if (newPassword.length < 8) {
    messageElement.style.color = "red";
    messageElement.innerHTML =
      "New Password should be at least 8 characters long";
    return;
  }

  // Update only the logged-in user's details
  users[userIndex] = {
    ...loggedInUser, // Keep all other properties unchanged
    name: name3,
    email: email3,
    password: newPassword,
  };

  // Save updated users array to localStorage
  localStorage.setItem("user", JSON.stringify(users));

  // Redirect to index page after update
  // window.location.href = "./index.html";
});

document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("answer");
  window.location.href = "./index.html";
});
