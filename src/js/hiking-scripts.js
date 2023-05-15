"use strict";

// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

// Importing activities from js file
import { hikes } from "./hiking";

// Selecting elements

const hikingCategories = document.querySelector("#hiking-categories");
const hikingDetailsContainer = document.querySelector(".hiking-details__box");
const activityDescriptionBox = document.querySelector(
  ".activity-description__container"
);

// Functions

// When I select a category the activity dropdown will show up

// Populates the dropdown with the selected category.
function populateDropdown() {
  // Looping through the hiking list
  let html = "";
  const hikingLength = hikes.length;
  for (let i = 0; i < hikingLength; i++) {
    const hike = hikes[i];

    html += `<option value='${hike.id}'>${hike.name}</option>`;
  }
  hikingCategories.insertAdjacentHTML("beforeend", html);
}

// Displays card with the activity selection

function showActivityDescription(selectedHike) {
  if (selectedHike === "null") {
    hikingDetailsContainer.classList.add("d-none");
    hikingDetailsContainer.textContent = "";
    return;
  }

  // If activity exists display the activity card with the information

  const hike = hikes.find((hike) => hike.id === selectedHike.id);

  if (!hike) return;

  // removing display none from activity box
  removeDisplayNone(hikingDetailsContainer);
  // Cleaning previous card information
  hikingDetailsContainer.textContent = "";

  // Filling the activity card with the information
  const hikeHtml = `
  <!-- imgs -->
          <div class="col-12 col-lg-5 p-0">
            <!-- img1 -->
            <div class='mx-auto text-xl-left' style="max-width: 25rem; height: 15.5rem">
              <img
                style="width: 25rem; height: 15.5rem"
                src="./assets/${hike.scenicImage}"
                alt=""
              />
            </div>
            <!-- img2 -->
            <div class='mx-auto text-xl-left' style="max-width: 25rem; height: 15.5rem">
            <img
            style="width: 25rem; height: 15.5rem"
            src="./assets/${hike.trailMapImage}"
            alt="${hike.name}"
          />
            </div>
          </div>

          <!-- Text -->
          <div class="col-12 col-lg-7 p-5 gap-2 my-auto text-center text-lg-left">
            <h3 class="text-center display-6 mb-3 fw-bold">${hike.name}</h3>
            <p class="lh-lg fs-6">
              <span class="fw-bold">Description:</span>${hike.description}
            </p>
            <p class="lh-lg fs-6">
              <span class="fw-bold">Length:</span> ${hike.length}
            </p>
            <p class="lh-lg fs-6"><span class="fw-bold">Difficulty: </span>${hike.difficulty}</p>
          </div>
`;
  hikingDetailsContainer.insertAdjacentHTML("afterbegin", hikeHtml);
}

// Removes the d-none from the element dropdown
function removeDisplayNone(element) {
  element.classList.remove("d-none");
}

// Event Listeners

hikingCategories.addEventListener("change", function () {
  const selectedIndex = hikingCategories.selectedIndex;

  if (selectedIndex === 0) {
    hikingDetailsContainer.textContent = "";
    return;
  }
  hikingDetailsContainer.textContent = "";
  showActivityDescription(hikes[selectedIndex - 1]);
});
window.addEventListener("load", () => {
  populateDropdown();
});
