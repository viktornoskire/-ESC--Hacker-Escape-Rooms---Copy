import { applyFilters } from "./allFilter.js";

// Creates a function that filters the room cards by rating
export async function filterByRating(data) {
  if (document.querySelector("#challenges__container")) {
    // These variables are for identifying and using the stars and their values later
    const firstRating = document.querySelector(".filter__first-rate");
    const secondRating = document.querySelector(".filter__second-rate");
    const firstStars = firstRating.querySelectorAll("i");
    const secondStars = secondRating.querySelectorAll("i");

    // These buttons are made for screen readers and pressing the spacebar key, improved for accessibility
    const firstStarBtns = firstRating.querySelectorAll(".star-button");
    const secondStarBtns = secondRating.querySelectorAll(".star-button");

    // These values make the stars 'disappear' if you double click on them
    // If these values get the same value as the index of the stars, all stars will be removed
    // (it will make sense later)
    let lastFirstStarIdx = -1;
    let lastSecondStarIdx = -1;

    if (firstStars && secondStars) {
      // This executes first star selection
      firstStarBtns.forEach((btn, idx1) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          firstStarSelection(idx1);
          // This code marks the star buttons selected for screen reader
          firstStarBtns.forEach((btn, idx2) => {
            btn.setAttribute(
              "aria-pressed",
              idx1 === idx2 && idx1 === lastFirstStarIdx
            );
          });

          data.minRating =
            btn.getAttribute("aria-pressed") === "true" ? idx1 + 1 : 0;
          applyFilters(data);
        });
      });

      // This executes second star selection
      secondStarBtns.forEach((btn, idx1) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          secondStarSelection(idx1);
          // This code marks the star buttons selected for screen reader
          secondStarBtns.forEach((btn, idx2) => {
            btn.setAttribute(
              "aria-pressed",
              idx1 === idx2 && idx1 === lastSecondStarIdx
            );
          });
          data.maxRating =
            btn.getAttribute("aria-pressed") === "true" ? idx1 + 1 : 5;
          applyFilters(data);
        });
      });

      function firstStarSelection(idx1) {
        if (lastFirstStarIdx === idx1) {
          firstStars.forEach((star) => {
            star.classList.remove("fa-solid");
            star.classList.add("fa-regular");
          });
          // These values resets the firstStar rating
          lastFirstStarIdx = -1;
        } else {
          firstStars.forEach((star, idx2) => {
            if (idx1 >= idx2) {
              star.classList.remove("fa-regular");
              star.classList.add("fa-solid");
            } else {
              star.classList.remove("fa-solid");
              star.classList.add("fa-regular");
            }
          });
          lastFirstStarIdx = idx1;
        }
      }

      function secondStarSelection(idx1) {
        if (lastSecondStarIdx === idx1) {
          secondStars.forEach((star) => {
            star.classList.remove("fa-solid");
            star.classList.add("fa-regular");
          });
          lastSecondStarIdx = -1;
        } else {
          secondStars.forEach((star, idx2) => {
            if (idx1 >= idx2) {
              star.classList.remove("fa-regular");
              star.classList.add("fa-solid");
            } else {
              star.classList.remove("fa-solid");
              star.classList.add("fa-regular");
            }
          });
          lastSecondStarIdx = idx1;
        }
      }
    }
  }
}

// This function resets the checkboxes and radioboxes in probably all browsers
// (I've only seen this 'problem in Firefox')
export function resetForm() {
  const filterForm = document.querySelector(".filter__form");
  filterForm.reset();
}
