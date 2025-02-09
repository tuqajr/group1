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
      fetchedArray = data.record;
    });

  const weekdays = document.querySelectorAll(".weekdays");
  const cardContainer = document.getElementById("card_container");

  weekdays.forEach((day) => {
    day.addEventListener("click", function (e) {
      e.preventDefault();

      weekdays.forEach((weekday) => weekday.classList.remove("active"));

      day.classList.add("active");

      updateCards(day.id);
    });
  });

  function updateCards(day) {
    console.log(fetchedArray);
    let groupedClasses = fetchedArray.reduce((acc, classItem) => {
      let classDay = classItem.day; // Get the day (e.g., "Friday")

      if (!acc[classDay]) {
        acc[classDay] = []; // If the day key doesn’t exist, create an empty array
      }

      acc[classDay].push(classItem); // Push the class into the corresponding day

      return acc;
    }, {}); // Initial value is an empty object

    console.log(groupedClasses);

    const cardData = groupedClasses;
    const cards = cardData[day];
    console.log(cards);
    cardContainer.innerHTML = "";

    for (let i = 0; i < cards.length; i++) {
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
              <div
                class="col card_information d-flex flex-column align-items-start justify-content-center p-1"
              >
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
                <i class="fa-regular fa-heart fa-xl favoriteOff"></i>
                <i class="fa-solid fa-heart fa-xl favoriteOn" style="display: none;"></i>
              </div>
            </div>
          </div>
        </div>
      `;
      cardContainer.insertAdjacentHTML("beforeend", cardHTML);
    }

    // Add event listeners to favorite icons
    const favoriteContainers = document.querySelectorAll(".favoriteContainer");
    favoriteContainers.forEach((container) => {
      const favoriteOff = container.querySelector(".favoriteOff");
      const favoriteOn = container.querySelector(".favoriteOn");

      favoriteOff.addEventListener("click", () => {
        favoriteOff.style.display = "none";
        favoriteOn.style.display = "block";
      });

      favoriteOn.addEventListener("click", () => {
        favoriteOn.style.display = "none";
        favoriteOff.style.display = "block";
      });
    });
  }
});
