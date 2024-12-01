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

// Formation 

// Variables
const formationDropdown = document.getElementById("formationDropdown");
const formationList = document.getElementById("formationList");
const selectedFormation = document.getElementById("selectedFormation");

// Football formations
const formations = ["1", "4-4-2", "4-3-3", "3-5-2", "5-3-2", "4-2-3-1", "4-1-4-1", "3-4-3"];

// Populate dropdown with formations
function populateFormationList() {
  formations.forEach((formation) => {
    const option = document.createElement("div");
    option.className =
      "p-2 bg-gray-700 text-white rounded cursor-pointer hover:bg-gray-600 transition duration-200";
    option.textContent = formation;
    option.onclick = () => selectFormation(formation);
    formationList.appendChild(option);
  });
}

// Show/Hide dropdown options
function toggleFormationList() {
  formationList.classList.toggle("hidden");
}

// Handle formation selection
function selectFormation(formation) {
  selectedFormation.textContent = formation; // Update selected text
  formationList.classList.add("hidden"); // Hide dropdown
}

// Initialize the dropdown on page load
document.addEventListener("DOMContentLoaded", () => {
  populateFormationList();
});


// Test 
// Formation mapping for player positions using existing IDs
const formationMappings = {
  "4-3-3": {
    GK: { top: "80%", left: "50%" },
    LB: { top: "58%", left: "15%" },
    CB1: { top: "65%", left: "35%" },
    CB2: { top: "65%", left: "65%" },
    RB: { top: "58%", left: "85%" },
    CM1: { top: "38%", left: "30%" },
    CDM: { top: "50%", left: "50%" },
    CM2: { top: "38%", left: "70%" },
    LW: { top: "20%", left: "20%" },
    ST: { top: "10%", left: "50%" },
    RW: { top: "20%", left: "80%" },
  },
  "4-4-2": {
    GK: { top: "80%", left: "50%" },
    LB: { top: "58%", left: "15%" },
    CB1: { top: "65%", left: "35%" },
    CB2: { top: "65%", left: "65%" },
    RB: { top: "58%", left: "85%" },
    LW: { top: "25%", left: "20%" },
    CM1: { top: "38%", left: "37%" },
    CM2: { top: "38%", left: "63%" },
    CDM: { top: "10%", left: "40%" },
    RW: { top: "25%", left: "80%" },
    ST: { top: "10%", left: "60%" },
  },
  "4-2-3-1": {
    GK: { top: "80%", left: "50%" },
    LB: { top: "58%", left: "15%" },
    CB1: { top: "65%", left: "35%" },
    CB2: { top: "65%", left: "65%" },
    RB: { top: "58%", left: "85%" },
    CDM: { top: "27%", left: "50%" },
    CM1: { top: "38%", left: "35%" },
    CM2: { top: "38%", left: "65%" },
    LW: { top: "20%", left: "20%" },
    RW: { top: "20%", left: "80%" },
    ST: { top: "5%", left: "50%" },
  },
  "4-1-4-1": {
    GK: { top: "80%", left: "50%" },
    LB: { top: "58%", left: "15%" },
    CB1: { top: "65%", left: "35%" },
    CB2: { top: "65%", left: "65%" },
    RB: { top: "58%", left: "85%" },
    CDM: { top: "45%", left: "50%" },
    CM1: { top: "27%", left: "35%" },
    CM2: { top: "27%", left: "65%" },
    LW: { top: "20%", left: "20%" },
    RW: { top: "20%", left: "80%" },
    ST: { top: "12%", left: "50%" },
  },
  "3-4-3": {
    GK: { top: "83%", left: "50%" },
    CB1: { top: "65%", left: "30%" },
    CB2: { top: "61%", left: "50%" },
    LB: { top: "65%", left: "70%" },
    RB: { top: "32%", left: "80%" },
    CM1: { top: "38%", left: "37%" },
    CM2: { top: "38%", left: "63%" },
    LW: { top: "32%", left: "20%" },
    CDM: { top: "10%", left: "65%" },
    RW: { top: "10%", left: "35%" },
    ST: { top: "15%", left: "50%" },
  },
};

// Function to update player positions based on selected formation
function updateFormation() {
  const selectedFormation = document.getElementById("formation").value;
  const positions = formationMappings[selectedFormation];

  // Iterate over each player ID and update its position with animation
  for (const playerId in positions) {
    const playerDiv = document.getElementById(playerId);
    if (playerDiv) {
      const { top, left } = positions[playerId];
      
      // Add animation transition before making changes
      playerDiv.classList.add('transition-all', 'duration-500', 'ease-out');

      // Update the position (top and left)
      playerDiv.style.top = top;
      playerDiv.style.left = left;

      // Remove transition after animation completes
      setTimeout(() => {
        playerDiv.classList.remove('transition-all', 'duration-500', 'ease-out');
      }, 500); // Duration of the animation
    }
  }

  // Now check for specific formation changes that require element text adjustments
  updatePlayerRoles(selectedFormation);
}

// Function to update player roles based on selected formation
function updatePlayerRoles(selectedFormation) {
  switch (selectedFormation) {
    case "3-4-3":
      // Update text for 3-4-3 formation
      document.getElementById("LBS").textContent = "CB";  // LB becomes CB
      document.getElementById("CBS").textContent = "CB";  // LB becomes CB
      document.getElementById("RBS").textContent = "RM";  // RB becomes RM
      document.getElementById("RWS").textContent = "ST";  // RW becomes ST
      document.getElementById("STS").textContent = "CF";   // ST becomes CF
      document.getElementById("CDMS").textContent = "ST";  // CDM becomes ST
      document.getElementById("CMS").textContent = "CM";  // LB becomes CB
      document.getElementById("LWS").textContent = "LM";  // LB becomes CB

      break;

      case "4-3-3":
      // Update text for 3-4-3 formation
      document.getElementById("CBS").textContent = "CB";  // LB becomes CB
      document.getElementById("RBS").textContent = "RB";  // LB becomes CB
      document.getElementById("LBS").textContent = "LB";  // LB becomes CB
      document.getElementById("CMS").textContent = "CM";  // RB becomes RM
      document.getElementById("RWS").textContent = "RW";  // RW becomes ST
      document.getElementById("LWS").textContent = "LW";
      document.getElementById("STS").textContent = "ST";   // ST becomes CF
      document.getElementById("CDMS").textContent = "CDM";  // CDM becomes ST
      break;

    case "4-4-2":
      // Update text for 4-4-2 formation
      document.getElementById("CDMS").textContent = "ST";  // CDM becomes ST
      document.getElementById("CBS").textContent = "CB";  // CDM becomes ST
      document.getElementById("CMS").textContent = "CM";  // CDM becomes ST
      document.getElementById("LWS").textContent = "LW";  // CDM becomes ST
      document.getElementById("RWS").textContent = "RW";  // CDM becomes ST
      document.getElementById("STS").textContent = "ST";  // CDM becomes ST
      document.getElementById("RBS").textContent = "RB";  // CDM becomes ST
      document.getElementById("LBS").textContent = "LB";  // CDM becomes ST
      break;

      
    case "4-2-3-1":
      // Update text for 4-2-3-1 formation
      document.getElementById("CDMS").textContent = "CAM"; // CDM becomes CAM
      document.getElementById("RBS").textContent = "RB";  // CDM becomes ST
      document.getElementById("LBS").textContent = "LB";  // CDM becomes ST
      document.getElementById("RWS").textContent = "RW";  // CDM becomes ST
      document.getElementById("LWS").textContent = "LW";  // CDM becomes ST
      document.getElementById("STS").textContent = "ST";  // CDM becomes ST
      break;

    case "4-1-4-1":
      // Update text for 4-1-4-1 formation
      document.getElementById("CMS").textContent = "CAM";  // CM becomes CAM
      document.getElementById("CDMS").textContent = "CM";  // CDM becomes ST
      document.getElementById("LBS").textContent = "LB";  // CDM becomes ST
      document.getElementById("RBS").textContent = "RB";  // CDM becomes ST
      document.getElementById("STS").textContent = "ST";  // CDM becomes ST
      document.getElementById("RWS").textContent = "RW";  // CDM becomes ST
      document.getElementById("LWS").textContent = "LW";  // CDM becomes ST

      break;
  }
}

// Attach event listener to formation dropdown
document.getElementById("formation").addEventListener("change", updateFormation);

// Initialize on page load
document.addEventListener("DOMContentLoaded", updateFormation);

// test 

 // Get elements
 const mainPosition = document.getElementById('mainPosition');
 const goalkeeperAttributes = document.getElementById('goalkeeperAttributes');
 const outfieldAttributes = document.getElementById('outfieldAttributes');
 
 // Show or hide attributes based on main position
 mainPosition.addEventListener('change', function() {
   if (mainPosition.value === "GK") {
     goalkeeperAttributes.classList.remove('hidden');
     outfieldAttributes.classList.add('hidden');
   } else {
     outfieldAttributes.classList.remove('hidden');
     goalkeeperAttributes.classList.add('hidden');
   }
 });