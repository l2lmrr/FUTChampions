// Variables
const newPlayerBtn = document.getElementById("newPlayerBtn");
const playerFormModal = document.getElementById("playerFormModal");
const playerForm = document.getElementById("playerForm");
const playersList = document.getElementById("playersList");
const closeModalBtn = document.getElementById("closeModalBtn");

// Show Modal
newPlayerBtn.addEventListener("click", () => {
  playerFormModal.classList.remove("hidden");
});

// Close Modal
closeModalBtn.addEventListener("click", () => {
  playerFormModal.classList.add("hidden");
});

// Add Player and Save All Data to Local Storage
playerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Collect all form data manually
  const player = {
    name: document.getElementById("name").value,
    photo: document.getElementById("photo").value,
    mainPosition: document.getElementById("mainPosition").value,
    secondaryPosition: document.getElementById("secondaryPosition").value,
    nationality: document.getElementById("nationality").value,
    flag: document.getElementById("flag").value,
    club: document.getElementById("club").value,
    logo: document.getElementById("logo").value,
    pace: parseInt(document.getElementById("pace").value),
    shooting: parseInt(document.getElementById("shooting").value),
    passing: parseInt(document.getElementById("passing").value),
    dribbling: parseInt(document.getElementById("dribbling").value),
    defending: parseInt(document.getElementById("defending").value),
    physical: parseInt(document.getElementById("physical").value),
    rating: parseInt(document.getElementById("Rating").value),
  };

  // Save to Local Storage
  const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
  storedPlayers.push(player);
  localStorage.setItem("players", JSON.stringify(storedPlayers));

  // Add the new player to the UI
  addPlayerToUI(player);

  // Reset the form and close the modal
  playerForm.reset();
  playerFormModal.classList.add("hidden");
});

// Load Players from Local Storage on Page Load
window.addEventListener("load", () => {
  const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];

  if (storedPlayers.length > 0) {
    storedPlayers.forEach((player) => {
      addPlayerToUI(player);
    });
  } else {
    console.log("No players found in localStorage.");
  }
});

// Function to Add Player to UI
function addPlayerToUI(player) {
  const playerItem = document.createElement("div");
  playerItem.className = "flex flex-col items-center bg-gray-800 text-white rounded-lg p-4 text-center";

  // Player Image
  const playerImage = document.createElement("img");
  playerImage.src = player.photo || "https://via.placeholder.com/64"; // Default image if no photo is provided
  playerImage.alt = player.name || "Player Image";
  playerImage.className = "w-16 h-16 rounded-full object-cover";

  // Player Name
  const playerName = document.createElement("div");
  playerName.className = "mt-2 text-sm font-bold";
  playerName.textContent = player.name || "Unknown Player";

  // Player Rating
  const ratingBox = document.createElement("div");
  ratingBox.className = "bg-green-500 text-xs font-bold py-1 px-2 rounded mt-2";
  ratingBox.textContent = player.rating || "N/A";

  // Player Roles
  const playerRoles = document.createElement("div");
  playerRoles.className = "mt-2 text-xs";
  playerRoles.innerHTML = ` 
    <span class="text-green-500">${player.mainPosition || "N/A"}</span> /
    <span class="text-yellow-500">${player.secondaryPosition || "N/A"}</span>
  `;

  // Append all elements to the player item
  playerItem.appendChild(playerImage);
  playerItem.appendChild(playerName);
  playerItem.appendChild(ratingBox);
  playerItem.appendChild(playerRoles);

  // Add player card to the Players List
  playersList.appendChild(playerItem);
}

// Formation Data with exact positions (from formation.html)
const formationsData = {
  "4-3-3": {
    GK: { top: "83%", left: "50%" },     // Goalkeeper
    LB: { top: "65%", left: "30%" },     // Left-back
    CB1: { top: "60%", left: "50%" },    // Center-back 1
    CB2: { top: "65%", left: "70%" },    // Center-back 2
    RB: { top: "58%", left: "85%" },     // Right-back
    LM: { top: "25%", left: "20%" },     // Left Midfielder
    CM1: { top: "38%", left: "37%" },    // Central Midfielder 1
    CM2: { top: "38%", left: "63%" },    // Central Midfielder 2
    RM: { top: "25%", left: "80%" },     // Right Midfielder
    ST1: { top: "10%", left: "60%" },    // Striker 1
    ST2: { top: "10%", left: "40%" },    // Striker 2
    ST3: { top: "10%", left: "50%" },    // Striker 3
  },
  "4-4-2": {
    GK: { top: "83%", left: "50%" },     // Goalkeeper
    LB: { top: "65%", left: "30%" },     // Left-back
    CB1: { top: "60%", left: "50%" },    // Center-back 1
    CB2: { top: "65%", left: "70%" },    // Center-back 2
    RB: { top: "58%", left: "85%" },     // Right-back
    LM: { top: "25%", left: "20%" },     // Left Midfielder
    CM1: { top: "38%", left: "37%" },    // Central Midfielder 1
    CM2: { top: "38%", left: "63%" },    // Central Midfielder 2
    RM: { top: "25%", left: "80%" },     // Right Midfielder
    ST1: { top: "10%", left: "60%" },    // Striker 1
    ST2: { top: "10%", left: "40%" },    // Striker 2
  },
  "3-4-3": {
    GK: { top: "83%", left: "50%" },     // Goalkeeper
    LB: { top: "65%", left: "30%" },     // Left-back
    CB1: { top: "60%", left: "50%" },    // Center-back 1
    CB2: { top: "65%", left: "70%" },    // Center-back 2
    RB: { top: "58%", left: "85%" },     // Right-back
    LM: { top: "25%", left: "20%" },     // Left Midfielder
    CM1: { top: "38%", left: "37%" },    // Central Midfielder 1
    CM2: { top: "38%", left: "63%" },    // Central Midfielder 2
    RM: { top: "25%", left: "80%" },     // Right Midfielder
    ST1: { top: "10%", left: "60%" },    // Striker 1
    ST2: { top: "10%", left: "40%" },    // Striker 2
    ST3: { top: "10%", left: "50%" },    // Striker 3
  },
  "4-2-3-1": {
    GK: { top: "83%", left: "50%" },     // Goalkeeper
    LB: { top: "65%", left: "30%" },     // Left-back
    CB1: { top: "60%", left: "50%" },    // Center-back 1
    CB2: { top: "65%", left: "70%" },    // Center-back 2
    RB: { top: "58%", left: "85%" },     // Right-back
    CDM1: { top: "50%", left: "40%" },   // Central Defensive Midfielder 1
    CDM2: { top: "50%", left: "60%" },   // Central Defensive Midfielder 2
    CAM1: { top: "35%", left: "35%" },   // Central Attacking Midfielder 1
    CAM2: { top: "35%", left: "65%" },   // Central Attacking Midfielder 2
    ST: { top: "10%", left: "50%" },     // Striker
  }
  // Add more formations if necessary
};

// Select DOM elements for the dropdown
const formationDropdown = document.getElementById("formationDropdown");
const formationList = document.getElementById("formationList");
const selectedFormation = document.getElementById("selectedFormation");
const formationWrapper = document.getElementById("formationWrapper");

// Populate the dropdown
const formations = Object.keys(formationsData);
formations.forEach((formation) => {
  const option = document.createElement("div");
  option.className = "p-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-center cursor-pointer";
  option.textContent = formation;

  option.addEventListener("click", () => {
    // Set the selected value and close the dropdown
    selectedFormation.textContent = formation;
    formationList.classList.add("hidden");
    updatePlayerPositions(formation); // Update positions based on selected formation
  });

  formationList.appendChild(option);
});

// Toggle dropdown visibility
formationDropdown.addEventListener("click", () => {
  formationList.classList.toggle("hidden");
});

// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
  if (!formationWrapper.contains(event.target)) {
    formationList.classList.add("hidden");
  }
});

// Function to update player positions based on the selected formation
function updatePlayerPositions(formation) {
  const selectedPositions = formationsData[formation];
  if (!selectedPositions) return;

  // Loop through each player role and update their position on the pitch
  Object.keys(selectedPositions).forEach((role) => {
    const position = selectedPositions[role];
    const playerElement = document.getElementById(`${role.toLowerCase()}-button`);
    const roleTextElement = document.getElementById(`${role.toLowerCase()}-role`);

    // Ensure the player exists
    if (playerElement) {
      playerElement.style.transition = "top 0.5s, left 0.5s"; // Add smooth transition
      playerElement.style.top = position.top;
      playerElement.style.left = position.left;
    }

    // Ensure the role text exists and update it if the role is part of the selected formation
    if (roleTextElement) {
      if (formation.includes(role.toUpperCase())) {
        roleTextElement.textContent = role; // Update the role text
      } else {
        roleTextElement.textContent = ""; // Hide the role text if the role is not part of the formation
      }
    }
  });
}
