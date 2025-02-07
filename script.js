"use strict";
document.addEventListener("DOMContentLoaded", function () {
  const weekdays = document.querySelectorAll(".weekdays");
  const cardContainer = document.querySelector(".card_container");

  weekdays.forEach((day) => {
    day.addEventListener("click", function (e) {
      e.preventDefault();

      weekdays.forEach((weekday) => weekday.classList.remove("active"));

      day.classList.add("active");

      updateCards(day.id);
    });
  });

  function updateCards(day) {
    const cardData = {
      sunday: {
        img: "https://img.freepik.com/premium-vector/fit-people-doing-exercise_18591-41271.jpg",
        instructor: "Justin Daniel",
        duration: "30 minutes",
        start: "7:30am",
        end: "9:00am",
        day: "Sunday",
      },
      monday: {
        img: "https://img.freepik.com/premium-vector/fit-people-doing-exercise_18591-41271.jpg",
        instructor: "Jane Smith",
        duration: "45 minutes",
        start: "8:00am",
        end: "9:45am",
        day: "Monday",
      },
      tuesday: {
        img: "https://img.freepik.com/premium-vector/fit-people-doing-exercise_18591-41271.jpg",
        instructor: "Smith",
        duration: "20 minutes",
        start: "6:00am",
        end: "6:20am",
        day: "Tuesday",
      },
      wednesday: {
        img: "https://img.freepik.com/premium-vector/fit-people-doing-exercise_18591-41271.jpg",
        instructor: "Jane Smith",
        duration: "25 minutes",
        start: "7:00am",
        end: "7:25am",
        day: "Wednesday",
      },
      thursday: {
        img: "https://img.freepik.com/premium-vector/fit-people-doing-exercise_18591-41271.jpg",
        instructor: "Jane Smith",
        duration: "45 minutes",
        start: "8:00am",
        end: "9:45am",
        day: "Thursday",
      },
      friday: {
        img: "https://img.freepik.com/premium-vector/fit-people-doing-exercise_18591-41271.jpg",
        instructor: "Jane Smith",
        duration: "45 minutes",
        start: "8:00am",
        end: "9:45am",
        day: "Friday",
      },
      saturday: {
        img: "https://img.freepik.com/premium-vector/fit-people-doing-exercise_18591-41271.jpg",
        instructor: "Jane Smith",
        duration: "45 minutes",
        start: "8:00am",
        end: "9:45am",
        day: "Saturday",
      },
    };

    const cards = cardData[day];
    cardContainer.innerHTML = "";

    for (let i = 1; i <= 10; i++) {
      const cardHTML = `
        <div class="col">
          <div class="card">
            <div class="row">
              <div class="col-4 col-sm-3 img_container">
                <img
                  src="${cards.img}"
                  class="img-fluid rounded schedule_pic"
                  alt="..."
                />
              </div>
              <div
                class="col card_information d-flex flex-column align-items-start justify-content-center p-1"
              >
                <p class="card-text">
                  <small>
                    <span class="day">${cards.day}</span>
                    <span class="start">${cards.start}</span> -
                    <span class="end">${cards.end}</span>
                  </small>
                </p>
                <p class="card-title className">Fitness Class Name #${i}</p>
                <p class="card-text">
                  <small>
                    By <span class="trainer">${cards.instructor}</span>,
                    <span class="duration">${cards.duration}</span> minutes
                  </small>
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
