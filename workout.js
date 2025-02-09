document.addEventListener("DOMContentLoaded", () => {
  let fetchedArray;

  fetch("https://api.jsonbin.io/v3/b/67a743fead19ca34f8fc0f96", {
    method: "GET",
    headers: {
      "X-Master-Key":
        "$2a$10$tWShOfqJWmq8xujWwSgV4uquTl/yNufMA.UawWn6He5/.siyRJ2AK",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      fetchedArray = data.record;
    });

  const weekdays = document.querySelectorAll(".weekdays");
  // const cardContainer = document.querySelector(".card_container");
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
    let groupedClasses = fetchedArray.reduce((acc, classItem) => {
      let day = classItem.day; // Get the day (e.g., "Friday")

      if (!acc[day]) {
        acc[day] = []; // If the day key doesn’t exist, create an empty array
      }

      acc[day].push(classItem); // Push the class into the corresponding day

      return acc;
    }, {}); // Initial value is an empty object

    const cardData = groupedClasses;

    const cards = cardData[day];
    console.log(cards);
    cardContainer.innerHTML = "";

    for (let i = 0; i <= 10; i++) {
      const cardHTML = `
                <div class="col">
          <div class="card">
            <div class="row">
              <div class="col-4 col-sm-3 img_container">
                <img
                  src=${cards[i].imageUrl}
                  class="img-fluid rounded schedule_pic"
                  alt="..."
                />
              </div>
              <div
                class="col card_information d-flex flex-column align-items-start justify-content-center p-1"
              >
                <p class="card-text">
                  <small
                    ><span class="day">${cards[i].day}</span>
                    <span class="start">${cards[i].time.start}</span> -
                    <span class="end">${cards[i].time.end}</span></small
                  >
                </p>
                <p class="card-title className">${cards[i].className}</p>
                <p class="card-text">
                  <small
                    >By <span class="trainer">${cards[i].trainer}</span>,
                    <span class="duration">${cards[i].duration}</span> minutes</small
                  >
                </p>
              </div>
            </div>
          </div>
        </div>

            `;
      cardContainer.insertAdjacentHTML("beforeend", cardHTML);
    }
  }
});
