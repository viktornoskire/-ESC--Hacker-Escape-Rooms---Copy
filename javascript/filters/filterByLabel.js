//Imports applyFilters function from allFilter.js.
import { applyFilters } from "./allFilter.js";
//Function filterByLabel used to filter the data based of the labels.
export function filterByLabel(data) {
  const filterTag = document.querySelector(".filter__tag");
  if (!filterTag) return; //If there is no filtertags, exit.
  const buttons = filterTag.querySelectorAll("button");
  //Foreach loop that through every button (labelbuttons)
  buttons.forEach((button) => {
    //Eventlistner added that listen for click, and has preventdefault to not reload the site.
    button.addEventListener("click", (e) => {
      e.preventDefault();
      //added class for styling when a button is cliked.
      button.classList.toggle("active");
      //gets the text on the button, make it lowercase.
      const buttonText = button.innerText.toLowerCase();
      //Checks if the buttonText is in the data.labels, a list with labels.
      if (data.labels.includes(buttonText)) {
        //if the labels is already there, find its position in the array.
        const index = data.labels.indexOf(buttonText);
        //If index is larger then -1, remove it from the array.
        if (index > -1) {
          // only splice array when item is found
          data.labels.splice(index, 1); // 2nd parameter means remove one item only
        }
        //If the labels is not in the list, push it to the list.
      } else {
        data.labels.push(buttonText);
      }
      //Calls applyFilters with the updated data. Updates the filtering based on what labels are active.
      applyFilters(data);
    });
  });
}
