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
      },
      monday: {
        img: "https://img.freepik.com/premium-vector/fit-people-doing-exercise_18591-41271.jpg",
        instructor: "Jane Smith",
        duration: "45 minutes",
      },
      tuesday: {
        img: "https://img.freepik.com/premium-vector/fit-people-doing-exercise_18591-41271.jpg",
        instructor: "Smith",
        duration: "20 minutes",
      },
      wednesday: {
        img: "https://img.freepik.com/premium-vector/fit-people-doing-exercise_18591-41271.jpg",
        instructor: "Jane Smith",
        duration: "25 minutes",
      },
      thursday: {
        img: "https://img.freepik.com/premium-vector/fit-people-doing-exercise_18591-41271.jpg",
        instructor: "Jane Smith",
        duration: "45 minutes",
      },
      friday: {
        img: "https://img.freepik.com/premium-vector/fit-people-doing-exercise_18591-41271.jpg",
        instructor: "Jane Smith",
        duration: "45 minutes",
      },
      saturday: {
        img: "https://img.freepik.com/premium-vector/fit-people-doing-exercise_18591-41271.jpg",
        instructor: "Jane Smith",
        duration: "45 minutes",
      },
    };

    const cards = cardData[day];
    cardContainer.innerHTML = "";

    for (let i = 1; i <= 10; i++) {
      const cardHTML = `
                <div class="col">
                    <div class="card">
                        <div class="row">
                            <div class="col-3">
                                <img src="${cards.img}" class="img-fluid rounded" alt="..." />
                            </div>
                            <div class="col card_information">
                                <p class="card-title">Fitness Class Name #${i}</p>
                                <p class="card-text">
                                    <small>By ${cards.instructor}, ${cards.duration}</small>
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
