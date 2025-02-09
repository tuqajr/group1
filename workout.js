document.addEventListener("DOMContentLoaded", () => {
  let fetchedArray;
  fetch("https://api.jsonbin.io/v3/b/67a743fead19ca34f8fc0f96", {
    method: "GET",
    headers: {
      "X-Master-Key":
        "$2a$10$tWShOfqJWmq8xujWwSgV4uquTl/yNufMA.UawWn6He5/.siyRJ2AK",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("Fetched data:", data); // Added
      fetchedArray = data.record.record;
    });

  const weekdays = document.querySelectorAll(".weekdays");
  const cardContainer = document.getElementById("card_container");
  function getLoggedInUser() {
    let users = JSON.parse(localStorage.getItem("user")) || [];
    return users.find((user) => user.logedin === true) || null;
  }
  weekdays.forEach((day) => {
    day.addEventListener("click", function (e) {
      e.preventDefault();

      weekdays.forEach((weekday) => weekday.classList.remove("active"));

      day.classList.add("active");

      updateCards(day.id);
    });
  });
  function updateCards(day) {
    let groupedClasses = fetchedArray.reduce((acc, classItem) => {
      let classDay = classItem.day;

      if (!acc[classDay]) {
        acc[classDay] = [];
      }

      acc[classDay].push(classItem);

      return acc;
    }, {});

    const cardData = groupedClasses;
    const cards = cardData[day] || [];
    cardContainer.innerHTML = "";

    // Check if the user is logged in
    let loggedInUser = getLoggedInUser();
    if (!loggedInUser) return;

    const favorites = loggedInUser.fav || []; // Get the logged-in user's favorites

    for (let i = 0; i < cards.length; i++) {
      const isFavorite = favorites.some(
        (fav) =>
          fav.className === cards[i].className && fav.day === cards[i].day
      );

      const cardHTML = `
        <div class="col">
          <div class="card">
            <div class="row">
              <div class="col-4 col-sm-3 img_container">
                <img
                  src="${cards[i].imageUrl}"
                  class="img-fluid rounded schedule_pic image-ahmed"
                  alt="..."
                />
              </div>
              <div class="col card_information d-flex flex-column align-items-start justify-content-center p-1">
                <p class="card-text">
                  <small>
                    <span class="day">${cards[i].day}</span>
                    <span class="start">${cards[i].time.start}</span> -
                    <span class="end">${cards[i].time.end}</span>
                  </small>
                </p>
                <p class="card-title">${cards[i].className}</p>
                <p class="card-text">
                  <small>By ${cards[i].trainer}, ${cards[i].duration}</small>
                </p>
              </div>
              <div class="col-2 d-flex py-4 px-4 justify-content-end favoriteContainer">
                <i class="fa-regular fa-heart fa-xl favoriteOff" style="display: ${
                  isFavorite ? "none" : "block"
                };" data-index="${i}"></i>
                <i class="fa-solid fa-heart fa-xl favoriteOn" style="display: ${
                  isFavorite ? "block" : "none"
                };" data-index="${i}"></i>
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
      const index = favoriteOff.dataset.index;

      favoriteOff.addEventListener("click", () => {
        favoriteOff.style.display = "none";
        favoriteOn.style.display = "block";
        addToFavorites(cards[index]);
      });

      favoriteOn.addEventListener("click", () => {
        favoriteOn.style.display = "none";
        favoriteOff.style.display = "block";
        removeFromFavorites(cards[index]);
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

  // Initialize favorites display on page load
  document.addEventListener("DOMContentLoaded", () => {
    updateCards("Monday"); // Change this to dynamically load selected day
  });
});
