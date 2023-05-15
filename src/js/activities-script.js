"use strict";

// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";
// Importing activities from js file
import { categories, activities } from "./activities";

// Selecting elements
const forms = document.querySelectorAll(".needs-validation");
const form = document.querySelector("form");
const activityCategories = document.querySelector("#activity-categories");

const activitySelection = document.querySelector("#activity-selection");
const activitySelectionContainer = document.querySelector(
  ".activity-selection__container"
);
const activityDescriptionBox = document.querySelector(
  ".activity-description__container"
);
const cardBody = document.querySelector(".card-body");
const paymentActivityForm = document.querySelector(".payment-activity__form");
const confirmationMessageBox = document.querySelector(".confirmation-message");

// Form elements
const resetBtn = document.querySelector(".reset-button");
const ticketsInput = document.querySelector("#tickets-input");
const creditCardInput = document.querySelector("#credit-card-input");
const emailInput = document.querySelector("#email-input");

// Functions

// When I select a category the activity dropdown will show up
function selectCategory(category) {
  if (category === "null") {
    activityDescriptionBox.classList.add("d-none");
    paymentActivityForm.classList.add("d-none");
    cleanAndCreateDefaultOption();
    return;
  }
  removeDisplayNone(activitySelectionContainer);
  populateDropdown(category, activities);
}

// Populates the dropdown with the selected category.
function populateDropdown(selectedCategory, activitiesList) {
  if (selectedCategory === "null") {
    activityDescriptionBox.classList.add("d-none");
    paymentActivityForm.classList.add("d-none");
    return;
  }

  cleanAndCreateDefaultOption();
  activityDescriptionBox.classList.add("d-none");
  paymentActivityForm.classList.add("d-none");
  // Looping through the activities list
  let html = "";
  const activitiesLength = activitiesList.length;
  for (let i = 0; i < activitiesLength; i++) {
    const activity = activitiesList[i];
    if (selectedCategory === activity.category.toLowerCase()) {
      html += `<option value='${activity.id}'>${activity.name}</option>`;
    }
  }
  activitySelection.insertAdjacentHTML("beforeend", html);
}

function cleanAndCreateDefaultOption() {
  activitySelection.innerHTML = "";
  const defaultOption = new Option("Select One", "null", true);
  activitySelection.appendChild(defaultOption);
}

// Displays card with the activity selection

function showActivityDescription(selectedActivity) {
  if (selectedActivity === "null") {
    activityDescriptionBox.classList.add("d-none");
    paymentActivityForm.classList.add("d-none");
    return;
  }

  confirmationMessageBox.textContent = "";

  // If activity exists display the activity card with the information

  const activity = activities.find(
    (activity) => activity.id === selectedActivity
  );

  if (!activity) return;

  // removing display none from activity box
  removeDisplayNone(activityDescriptionBox);
  // Cleaning previous card information
  cardBody.textContent = "";

  // Filling the activity card with the information
  const activityHtml = `
  <h5 class="card-title activity-name mb-4 text-center display-6 text-primary">
    ${activity.name}
  </h5>
    <div class="card-text">
      <p> <span class='fw-bold'>ID:</span> ${activity.id}</p>
      <p> <span class='fw-bold'>Category:</span> ${activity.category}</p>
      <p>
         <span class='fw-bold'>Description:</span> ${activity.description}
      </p>
      <p><span class='fw-bold'>Location:</span> ${activity.location}</p>
      <p><span class='fw-bold'>Price:</span> $${activity.price}</p>
    </div>
`;
  cardBody.insertAdjacentHTML("afterbegin", activityHtml);

  // Checking if price is more than $0 to display form
  if (activity.price > 0) removeDisplayNone(paymentActivityForm);
  else paymentActivityForm.classList.add("d-none");
}

// Removes the d-none from the element dropdown
function removeDisplayNone(element) {
  element.classList.remove("d-none");
}

// Displays confirmation message
function showConfirmationMessage(
  amount,
  numberOfTickets,
  activityName,
  emailAddress
) {
  if (
    amount === "" ||
    numberOfTickets === undefined ||
    activityName === undefined ||
    emailAddress === ""
  )
    return;
  const messageHtml = `<p class='fw-bold fs-5'>Your credit card has been charged $${amount} for ${numberOfTickets} ticket to ${activityName}. A confirmation email has been sent to ${emailAddress}.</p>`;

  confirmationMessageBox.classList.remove("d-none");
  confirmationMessageBox.insertAdjacentHTML("afterbegin", messageHtml);
}

// Event Listeners

activityCategories.addEventListener("change", () => {
  const categoryIndex = activityCategories.selectedIndex;
  const category = activityCategories[categoryIndex].value;
  selectCategory(category);
});

activitySelection.addEventListener("change", () => {
  const activityIndex = activitySelection.selectedIndex;
  const selectedActivity = activitySelection[activityIndex].value;
  showActivityDescription(selectedActivity);
});

resetBtn.addEventListener("click", () => {
  confirmationMessageBox.textContent = "";
});

// Js form validation snippet from boostrap
// Example starter JavaScript for disabling form submissions if there are invalid fields
// Loop over them and prevent submission
Array.from(forms).forEach((form) => {
  form.addEventListener(
    "submit",
    (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add("was-validated");
      event.preventDefault();

      const activityIndex = activitySelection.selectedIndex;
      const selectedActivityId = activitySelection[activityIndex].value;

      const selectedActivity = activities.find(
        (activity) => activity.id === selectedActivityId
      );
      confirmationMessageBox.textContent = "";

      showConfirmationMessage(
        selectedActivity.price,
        ticketsInput.value,
        selectedActivity.name,
        emailInput.value
      );
    },
    false
  );
});

/*
function FilterActivitiesBasedOnCategory() {
  //Grab selected value from dropdown
  let selectedCategory = document.getElementById("myCategories").value;

  const myFilteredActivity = activities.filter(
    (act) => act.category == selectedCategory
  );

*/
