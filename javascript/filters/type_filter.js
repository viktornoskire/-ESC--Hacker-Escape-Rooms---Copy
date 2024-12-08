// Imports applyFilters() function from allFilter.js
import { applyFilters } from "./allFilter.js";

// Function to add values to "types" array in the object "data"
export function filterType(data) {
  // Create variables with DOM elements
  const onlineChallenges = document.querySelector("#online-challenges");
  const onsiteChallenges = document.querySelector("#on-site-challenges");

  // Checks if the user is on the challenges page
  if (onlineChallenges) {
    // Add an event listener on the online challenges checkbox
    onlineChallenges.addEventListener("change", () => {
      // If the checkbox is checked
      if (onlineChallenges.checked) {
        // and if the types array in data does not have a value "online"
        if (!data.types.includes("online")) {
          // Insert the value for the online challenges filter choice
          data.types.push("online");
        }
        // If the checkbox is unchecked
      } else {
        // Find the index of "online" in the types array
        const i = data.types.indexOf("online");
        // Only remove an element if the "online" value is found
        if (i > -1) {
          // Remove the element from the array
          data.types.splice(i, 1);
        }
      }
      // Call the function applyFilters with the new values in data
      applyFilters(data);
    });
  }
  // The same function, just in this it's looking at the onsite challenges
  if (onsiteChallenges) {
    onsiteChallenges.addEventListener("change", () => {
      if (onsiteChallenges.checked) {
        if (!data.types.includes("onsite")) {
          data.types.push("onsite");
        }
      } else {
        const i = data.types.indexOf("onsite");
        if (i > -1) {
          data.types.splice(i, 1);
        }
      }
      applyFilters(data);
    });
  }
}
