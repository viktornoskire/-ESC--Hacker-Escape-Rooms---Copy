// Imports filterfunctions from diffrens JS files.
import { filterByLabel } from "./filterByLabel.js";
import { filterByRating, resetForm } from "./rating_filter.js";
import { filterByText } from "./textFilter.js";
import { filterType } from "./type_filter.js";

export function allFilters() {
  // Declares the object data which includes the filter data which gets called in the different filter functions
  const data = {
    types: [],
    labels: [],
    minRating: 0,
    maxRating: 5,
    text: "",
  };
  // Calls the filterfunctions and send in the data so it can be updated.
  filterType(data);
  filterByLabel(data);
  filterByRating(data);
  filterByText(data);
  resetForm();
}

// Declares the applyFilters with the parameter data which controls which challenges are going to be displayed
export function applyFilters(data) {
  const allChallenges = document.querySelectorAll(".challenges__room");
  const container = document.querySelector("#challenges__container");
  let message = container.querySelector(".filter__message");
  //Created a message which is shown when no challenges are found by the filter.
  if (!message) {
    message = document.createElement("p");
    message.textContent = "No matching challenges";
    message.classList.add("filter__message");
  }

  // Resets the page
  allChallenges.forEach((room) => {
    room.style.display = "none";
  });
  //If no filters are chosen, show all challenges on challenges.html.
  if (
    data.types.length === 0 &&
    data.labels.length === 0 &&
    !data.text &&
    data.minRating === 0 &&
    data.maxRating === 5
  ) {
    allChallenges.forEach((room) => {
      room.style.display = "";
    });
    message.remove();
    return;
  }
  //Filters the challenges based on the users chosen filteers
  const filteredRooms = Array.from(allChallenges).filter((room) => {
    //Getting the rooms type (online or onsite) and its labels.
    const roomType = room.getAttribute("id");
    const roomLabels = room.dataset.labels.split(",");
    // Getting the rooms title and turning it to lowercase to make user experience better
    const title = room
      .querySelector(".room__heading")
      .textContent.toLowerCase();
    // and the rooms info and turning it to lowercase
    const description = room
      .querySelector(".room__info")
      .textContent.toLowerCase();
    // Getting the room rating and storing it in the
    const rating = room.rating;

    //checking if the room matches the type-filter.
    //Returns true if no types are chosen or if the rooms type matches the rooms
    const passesTypeFilter =
      data.types.length === 0 || data.types.includes(roomType);

    //checks if the room matches the label filter.
    //Returns true if no labels are chosen, or if the has all the chosen labels
    const passesLabelFilter =
      data.labels.length === 0 ||
      data.labels.every((label) => roomLabels.includes(label));

    //checks if the room maatchen the text-filter
    //Returns true if the user search text is there in the title or the description.
    const passesTextFilter =
      !data.text ||
      title.includes(data.text) ||
      description.includes(data.text);

    const passesRatingFilter =
      rating >= data.minRating && rating <= data.maxRating;

    //room has to pass both type and label filter
    return (
      passesTypeFilter &&
      passesLabelFilter &&
      passesTextFilter &&
      passesRatingFilter
    );
  });
  //If no challenges are display, show the message.
  if (filteredRooms.length === 0) {
    container.appendChild(message);
    //Else if rooms are displayed, remove the message and show the matching rooms.
  } else {
    message.remove();
    filteredRooms.forEach((room) => {
      room.style.display = "";
    });
  }
}
