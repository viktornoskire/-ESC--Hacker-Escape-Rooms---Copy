export function generateBookroom2() {
  // We create all elements on top of the other code //
  const body = document.querySelector("body");
  const overlay = document.createElement("div");
  const bookroom_modal = document.createElement("section");
  const book_modal = document.createElement("div");
  const book_form = document.createElement("form");
  const modal__title2 = document.createElement("h2");
  const book_name_label = document.createElement("label");
  const book_name_input = document.createElement("input");
  const book_email_label = document.createElement("label");
  const book_email_input = document.createElement("input");
  const book_time_label = document.createElement("label");
  const book_time_select = document.createElement("select");
  const book_time_option = document.createElement("option");
  const participants_label = document.createElement("label");
  const participants_select = document.createElement("select");
  const participants_number = document.createElement("option");
  const booking_button = document.createElement("button");
  const book_phone_label = document.createElement("label");
  const book_phone_input = document.createElement("input");
  

  // Sets classname and attributes on elements //
  overlay.className = "overlay";
  overlay.setAttribute("id", "hidden");
  bookroom_modal.className = "Bookroom_modal";
  bookroom_modal.setAttribute("id", "hidden");
  book_modal.className = "book_modal";
  book_form.className = "book_form";
  modal__title2.className = "modal__title2";

  book_name_label.className = "book_name";
  book_name_label.setAttribute("for", "name-text");
  book_name_input.type = "text";
  book_name_input.id = "name-text";

  book_email_label.className = "book_email";
  book_email_label.setAttribute("for", "email-text");
  book_email_input.type = "email";
  book_email_input.id = "email-text";

  book_time_label.className = "book_time";
  book_time_label.setAttribute("for", "time_options");
  book_time_select.id = "time_options";

  participants_label.className = "book_participants";
  participants_label.setAttribute("for", "participants_number");
  participants_select.id = "participants_number";

  booking_button.className = "booking_button";

  book_phone_label.className ="phone_number";
  book_phone_label.setAttribute("for","phone-number");
  book_phone_input.type ="tel";
  book_phone_input.id = "phone-number"
  book_phone_input.value = "(+46)";

  // Text on elements //
  modal__title2.textContent = "";
  book_name_label.textContent = "Name";
  book_phone_label.textContent ="Phone number(optional)";
  
  book_email_label.textContent = "Email";
  book_time_label.textContent = "What time?";
  participants_label.textContent = "How many participants?";
  booking_button.textContent = "Submit booking";

  //append all DOM-elements according to previous HTML-structure//
  body.appendChild(overlay);
  body.appendChild(bookroom_modal);
  bookroom_modal.appendChild(book_modal);
  book_modal.appendChild(book_form);
  book_form.appendChild(modal__title2);
  book_form.appendChild(book_name_label);
  book_form.appendChild(book_name_input);
  book_form.appendChild(book_phone_label);
  book_form.appendChild(book_phone_input);
  book_form.appendChild(book_email_label);
  book_form.appendChild(book_email_input);
  book_form.appendChild(book_time_label);
  book_form.appendChild(book_time_select);
  book_time_select.appendChild(book_time_option);
  book_form.appendChild(participants_label);
  book_form.appendChild(participants_select);
  participants_select.appendChild(participants_number);
  book_form.appendChild(booking_button);
 
}
generateBookroom2();

// This is a different value from the one, created in generateBookroom2 function//
const book_form = document.querySelector(".book_form");
const modal__title2 = document.querySelector(".modal__title2");

  
// Declare roomId value that imports the ID from bookroom modal (step 1)
let roomId;

export function getRoomId(id) {
  roomId = id;
  return id;
}

export function changeTitle(title) {
  modal__title2.textContent = `Book room "${title}" (step 2)`;
  return title;
}

// Listen for the custom event
document.addEventListener("arrayEvent", (event) => {
  const { data, id, title } = event.detail; // Extract the message, array and room id

  // console.log(message); // Log the message
  let newTime = data;
  // Return id as roomId and title as modal__title2.textContent
  getRoomId(id);
  changeTitle(title);

  availableTimeNow(newTime);
});

book_form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevents reloading the page when submit

  const userRoomId = parseInt(roomId, 10);
  const userInputName = document.getElementById("name-text").value;
  const userInputPhone = document.getElementById("phone-number").value;
  const userInputEmail = document.getElementById("email-text").value;
  const date = new Date().toISOString();
  const userInputTime = document.getElementById("time_options").value;
  const userInputParticipants = document.getElementById(
    "participants_number"
  ).value;

  const userInput = {
    challenge: userRoomId,
    name: userInputName,
    phone: userInputPhone,
    email: userInputEmail,
    date: date,
    time: userInputTime,
    participants: parseInt(userInputParticipants, 10),
  };

  fetch("https://lernia-sjj-assignments.vercel.app/api/booking/reservations", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInput), // Sending data in JSON format
  })
    .then((response) => {
      if (!response.ok) {
        alert("All fields must be filled!");
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(() => {
    document.querySelector(".modal3").removeAttribute("id");
      let phoneNumberCheck = document.querySelector("#phone-number")?.value;

      let phoneInputAreaCode = document.querySelector("#phone-number");
      phoneInputAreaCode.addEventListener("focus", () => {
        if (!phoneInputAreaCode.value.startsWith("(+46)")) {
          phoneInputAreaCode.value = "(+46)";
        }
      });

      

    if(phoneNumberCheck && phoneNumberCheck.length === 10 && !isNaN(phoneNumberCheck)) {
      console.log(`Phone number provided: ${phoneNumberCheck}`);
      document.querySelector(".modal3").removeAttribute("id");
    } 
    else if (isNaN(phoneNumberCheck) && phoneNumberCheck.length === 15) {
      phoneInputAreaCode = phoneNumberCheck.substring(5, 15);
      console.log(`Phone number provided: ${phoneInputAreaCode}`);
      document.querySelector(".modal3").removeAttribute("id");
    }
    else if (phoneNumberCheck.length !== 0 && phoneNumberCheck.length !== 15 && phoneNumberCheck.length !== 10) {
      console.log("Wrong phone format, try again");
      if (document.querySelector(".modal3")) {
        document.querySelector(".modal3").setAttribute("id", "hidden"); // Hide modal3 if invalid phone number
        
      }
    }
    else {
      document.querySelector("#phone-number").value = "";
      console.log("Phone number not provided, not an requirement");
      document.querySelector(".modal3").removeAttribute("id");
    }
      
    });
  
});
export function availableTimeNow(newTime) {
  // This resets the time select options in every booking //
  const timeSelect = document.querySelector("#time_options");
  timeSelect.innerHTML = "";

  newTime.forEach((newTime) => {
    const option = document.createElement("option");
    option.value = newTime;
    option.textContent = newTime;
    timeSelect.appendChild(option);
  });
}
