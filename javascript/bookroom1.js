// Create HTML Elements
const modalContent = document.createElement("div");
const modalModal = document.createElement("div");
const modalText = document.createElement("p");
const modalDate = document.createElement("p");
const modalSection = document.createElement("section");
const modalTitle = document.createElement("h3");
const modalInput = document.createElement("input");
const modalSpan = document.createElement("span");
const modalButton = document.createElement("button");
const modalButtonClose = document.createElement("button");
let errorText = document.createElement("p");
let challengeTitle = null;

// Set class names on elements
modalModal.className = "modal";
modalContent.className = "modal__content";
modalTitle.className = "modal__title";
modalText.className = "modal__p-text";
modalDate.className = "modal__p-date";
modalInput.className = "modal__input";
modalButton.className = "modal__button";
modalButtonClose.className = "modal__button_close";
errorText.className = "modal__date_error_text"

// Sets text on elements
modalTitle.textContent = "Book room";
modalText.textContent = "What date would you like to come?";
modalDate.textContent = "Date";
modalButton.textContent = "Search available times";
errorText.textContent = ""

// Type and atrributes
modalInput.type = "date";
modalInput.setAttribute("data-date-format", "YYYY MM DD");
modalModal.setAttribute("id", "hidden");
errorText.setAttribute("id", "hidden");

document.body.appendChild(modalSection);
modalSection.appendChild(modalModal);
modalModal.appendChild(modalContent);
modalContent.appendChild(modalSpan);
modalSpan.appendChild(modalTitle);
modalSpan.appendChild(modalText);
modalSpan.appendChild(modalDate);
modalSpan.appendChild(modalInput);
modalSpan.appendChild(modalButton);
modalSpan.appendChild(modalButtonClose);

const roomTitle = document.querySelector(".modal__title");
const room2Title = document.querySelector(".modal__title2");

let inputChallenge = null;

// Book room function
export function bookRoom() {
  const bookRoomButton = document.querySelectorAll(".room__button--onsite");
  bookRoomButton.forEach((button) => {
    button.addEventListener("click", () => {
      const roomChallenge =
        button.closest(".challenges__room") || button.closest(".content__room");
      const roomId = roomChallenge.getAttribute("data-id");
      inputChallenge = roomId; // Set the global variable

      const title = roomChallenge.querySelector(".room__heading").textContent;
      const participantsText = roomChallenge.querySelector(
        ".room__participants"
      ).textContent;
      const participantOption = document.querySelector("#participants_number");
      const minParticipants = parseInt(participantsText);
      const maxParticipants = parseInt(participantsText.split("-")[1]);

      // Update modal
      modalModal.removeAttribute("id");
      modalTitle.textContent = `Book room "${title}" (step 1)`;
      challengeTitle = title;

      if (room2Title) {
        room2Title.className = roomTitle.className;
        room2Title.textContent = roomTitle.textContent;
      }

      // Populate participants dropdown
      participantOption.innerHTML = "";
      for (let i = minParticipants; i <= maxParticipants; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = `${i} participants`;
        participantOption.appendChild(option);
      }
    });
  });
  return challengeTitle;
}

function updateErrorText(errorMsg) {
errorText.textContent=errorMsg;
errorText.style.animation="none";
void errorText.offsetWidth;
errorText.style.animation="";
return errorText;
}

// Function to handle date input and fetch available slots
export function getDate() {
  if (!modalInput.value) {
    modalSpan.appendChild(errorText);
    updateErrorText("No date selected"); // Update error msg with inserted text
    errorText.removeAttribute("id");
    return;
  }

  const apiCall = `https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=${modalInput.value}&challenge=${inputChallenge}`;
  fetch(apiCall)
    .then((response) => {
      if (!response.ok) {
        modalSpan.appendChild(errorText);
        updateErrorText("Invalid date selected"); // Update error msg with inserted text
        errorText.removeAttribute("id");
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const event = new CustomEvent("arrayEvent", {
        detail: {
          message: "Button clicked, sending array!",
          data: data.slots,
          id: inputChallenge,
          title: challengeTitle,
        },
      });
      errorText.remove();
      modalModal.setAttribute("id", "hidden");
      document.dispatchEvent(event);

      // Open the modal
      document.querySelector(".overlay").style.display = "initial";
      document.querySelector(".Bookroom_modal").style.display = "flex";
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

// Add event listener to the modal button
modalButton.addEventListener("click", () => {
  getDate();
});
