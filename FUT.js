// Variables
const newPlayerBtn = document.getElementById("newPlayerBtn");
const playerFormModal = document.getElementById("playerFormModal");
const playerForm = document.getElementById("playerForm");
const playersList = document.getElementById("playersList");
const closeModalBtn = document.getElementById("closeModalBtn");
const deletePlayerList = document.getElementById("deletePlayerList");
const playersToDelete = document.getElementById("playersToDelete");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

const canceleditBtn = document.getElementById("canceleditBtn");

// Show Modal
newPlayerBtn.addEventListener("click", () => {
  playerFormModal.classList.remove("hidden");
  document.getElementById("addPlayerBtn").classList.remove("hidden");
  document.getElementById("editPlayerB").classList.add("hidden");
});

// Close Modal
closeModalBtn.addEventListener("click", () => {
  playerFormModal.classList.add("hidden");
});


playerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  
  // Validation form Player 
    const name = document.getElementById('name').value.trim();
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!name || !nameRegex.test(name)) {
      alert('Name must not be empty and can only contain letters and spaces.');
      return;
    }
  
    const photoUrl = document.getElementById('photo').value;
    try {
      new URL(photoUrl); 
    } catch (_) {
      alert('Please enter a valid Photo URL.');
      return;
    }
  
    const mainPosition = document.getElementById('mainPosition').value;
    const validPositions = ["GK", "LB", "CB", "RB", "CDM", "CM", "CAM", "LM", "RM", "LW", "RW", "ST"];
    if (!validPositions.includes(mainPosition)) {
      alert('Please select a valid Main Position.');
      return;
    }
  
    // Validate Nationality (not empty)
    const nationality = document.getElementById('nationality').value.trim();
    if (!nationality) {
      alert('Nationality must not be empty.');
      return;
    }
  
    const flagUrl = document.getElementById('flag').value;
    try {
      new URL(flagUrl);
    } catch (_) {
      alert('Please enter a valid Flag URL.');
      return;
    }
  
    const club = document.getElementById('club').value.trim();
    if (!club) {
      alert('Club must not be empty.');
      return;
    }
  
    const logoUrl = document.getElementById('logo').value;
    try {
      new URL(logoUrl);
    } catch (_) {
      alert('Please enter a valid Club Logo URL.');
      return;
    }
  
    const rating = document.getElementById('Rating').value;
    if (rating < 5 || rating > 99) {
      alert('Rating must be between 5 and 99.');
      return;
    }
  
    if (document.getElementById('goalkeeperAttributes').classList.contains('hidden') === false) {
      const goalkeeperAttributes = ['diving', 'handling', 'kicking', 'reflexes', 'speed', 'positioning'];
      for (let id of goalkeeperAttributes) {
        const value = document.getElementById(id).value;
        if (value < 10 || value > 99) {
          alert(`${id.charAt(0).toUpperCase() + id.slice(1)} must be between 10 and 99.`);
          return;
        }
      }
    }
  
    if (document.getElementById('outfieldAttributes').classList.contains('hidden') === false) {
      const playerAttributes = ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'];
      for (let id of playerAttributes) {
        const value = document.getElementById(id).value;
        if (value < 10 || value > 99) {
          alert(`${id.charAt(0).toUpperCase() + id.slice(1)} must be between 10 and 99.`);
          return;
        }
      }
    }  
  

  function generatePlayerId() {
    const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
  
    if (storedPlayers.length === 0) {
      return 1; // First player will have ID 1
    } else {
      // Get the last player's ID and increment it by 1
      const lastPlayer = storedPlayers[storedPlayers.length - 1];
      
      // Ensure the last player's ID is a number
      const lastPlayerId = Number(lastPlayer.id);
      
      // If the ID is a valid number, return incremented ID
      if (!isNaN(lastPlayerId)) {
        return lastPlayerId + 1;
      } else {
        // If the last player's ID is not valid (NaN), start from 1
        return 1;
      }
    }
  }
  
  // Use the function to get the new player ID and store it in the NewId variable
  const NewId = generatePlayerId();
  
  console.log("New player ID is:", NewId);  // This will show a number, not NaN

// Collect all form data manually
const player = {
  id : NewId,
  name: document.getElementById("name").value,
  photo: document.getElementById("photo").value,
  mainPosition: document.getElementById("mainPosition").value,
  nationality: document.getElementById("nationality").value,
  flag: document.getElementById("flag").value,
  club: document.getElementById("club").value,
  logo: document.getElementById("logo").value,
  rating: parseInt(document.getElementById("Rating").value),
};

// Check if mainPosition is GK or not and collect respective attributes
if (player.mainPosition === "GK") {
  player.diving = parseInt(document.getElementById("diving").value);
  player.handling = parseInt(document.getElementById("handling").value);
  player.kicking = parseInt(document.getElementById("kicking").value);
  player.reflexes = parseInt(document.getElementById("reflexes").value);
  player.speed = parseInt(document.getElementById("speed").value);
  player.positioning = parseInt(document.getElementById("positioning").value);
} else {
  player.pace = parseInt(document.getElementById("pace").value);
  player.shooting = parseInt(document.getElementById("shooting").value);
  player.passing = parseInt(document.getElementById("passing").value);
  player.dribbling = parseInt(document.getElementById("dribbling").value);
  player.defending = parseInt(document.getElementById("defending").value);
  player.physical = parseInt(document.getElementById("physical").value);
}

// Save to Local Storage
const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
storedPlayers.push(player);
localStorage.setItem("players", JSON.stringify(storedPlayers));

// Debugging or confirmation
console.log("Player saved to localStorage:", player);


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
function addPlayerToUI(player, index) {
  const playerItem = document.createElement("div");
  playerItem.className = "flex flex-col items-center bg-gray-800 text-white rounded-lg p-4 text-center relative group";

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
  playerRoles.innerHTML = `<span class="text-yellow-500">${player.mainPosition || "N/A"}</span>`;

  // Hover Buttons Container
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2";

  // Edit Button
  const editButton = document.createElement("button");
  editButton.className = "";
  editButton.innerHTML = `
  `;
  editButton.onclick = () => openEditForm(player, index);

  // Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.className = "";
  deleteButton.innerHTML = `
   `;
  deleteButton.onclick = () => deletePlayer(index);

  // Append buttons to container
  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(deleteButton);

  // Append all elements to the player item
  playerItem.appendChild(playerImage);
  playerItem.appendChild(playerName);
  playerItem.appendChild(ratingBox);
  playerItem.appendChild(playerRoles);
  playerItem.appendChild(buttonContainer);

  // Add player card to the Players List
  playersList.appendChild(playerItem);
}

// Formation 

// Handle formation selection
function selectFormation(formation) {
  selectedFormation.textContent = formation; // Update selected text
  formationList.classList.add("hidden"); // Hide dropdown
}

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
      document.getElementById("LBS").textContent = "CB"; 
      document.getElementById("RBS").textContent = "RM";  
      document.getElementById("RWS").textContent = "ST";  
      document.getElementById("STS").textContent = "CF";   
      document.getElementById("CDMS").textContent = "ST";  
      document.getElementById("CMSS").textContent = "CM";  
      document.getElementById("CMS").textContent = "CM"; 
      document.getElementById("LWS").textContent = "LM";  

      break;

      case "4-3-3":
      document.getElementById("CBS").textContent = "CB"; 
      document.getElementById("RBS").textContent = "RB";  
      document.getElementById("LBS").textContent = "LB";  // LB becomes CB
      document.getElementById("CMS").textContent = "CM";  // RB becomes RM
      document.getElementById("RWS").textContent = "RW";  // RW becomes ST
      document.getElementById("LWS").textContent = "LW";
      document.getElementById("CMSS").textContent = "CM";  
      document.getElementById("STS").textContent = "ST";   // ST becomes CF
      document.getElementById("CDMS").textContent = "CDM";  // CDM becomes ST
      break;

    case "4-4-2":
      document.getElementById("CDMS").textContent = "ST";  // CDM becomes ST
      document.getElementById("CBS").textContent = "CB";  // CDM becomes ST
      document.getElementById("CMS").textContent = "CM";  // CDM becomes ST
      document.getElementById("CMSS").textContent = "CM";  // CM becomes CAM
      document.getElementById("LWS").textContent = "LW";  // CDM becomes ST
      document.getElementById("RWS").textContent = "RW";  // CDM becomes ST
      document.getElementById("STS").textContent = "ST";  // CDM becomes ST
      document.getElementById("RBS").textContent = "RB";  // CDM becomes ST
      document.getElementById("LBS").textContent = "LB";  // CDM becomes ST
      break;

      
    case "4-2-3-1":
      document.getElementById("CDMS").textContent = "CAM"; // CDM becomes CAM 
      document.getElementById("CMSS").textContent = "CM";  // CM becomes CAM
      document.getElementById("CMS").textContent = "CM";  // CM becomes CAM
      document.getElementById("RBS").textContent = "RB";  // CDM becomes ST
      document.getElementById("LBS").textContent = "LB";  // CDM becomes ST
      document.getElementById("RWS").textContent = "RW";  // CDM becomes ST
      document.getElementById("LWS").textContent = "LW";  // CDM becomes ST
      document.getElementById("STS").textContent = "ST";  // CDM becomes ST
      break;

    case "4-1-4-1":
      document.getElementById("CMS").textContent = "CAM";  // CM becomes CAM
      document.getElementById("CMSS").textContent = "CAM";  // CM becomes CAM
      document.getElementById("CDMS").textContent = "CM";  // CDM becomes ST
      document.getElementById("LBS").textContent = "LB";  // CDM becomes ST
      document.getElementById("RBS").textContent = "RB";  // CDM becomes ST
      document.getElementById("STS").textContent = "ST";  // CDM becomes ST
      document.getElementById("RWS").textContent = "RW";  // CDM becomes ST
      document.getElementById("LWS").textContent = "LW";  // CDM becomes ST

      break;
  }
}

document.getElementById("formation").addEventListener("change", updateFormation);
document.addEventListener("DOMContentLoaded", updateFormation);

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

 // test 2

 document.getElementById("mainPosition").addEventListener("change", (event) => {
  const isGoalkeeper = event.target.value === "GK";

  document.getElementById("goalkeeperAttributes").classList.toggle("hidden", !isGoalkeeper);
  document.getElementById("outfieldAttributes").classList.toggle("hidden", isGoalkeeper);
});

// test 3

// Function to fetch data from local storage and generate player cards
function loadPlayerCards() {
  // Get stored data from local storage
  const players = JSON.parse(localStorage.getItem("playersData"));

  if (!players || players.length === 0) {
    console.error("No player data found in local storage!");
    return;
  }

  const placeholder = document.getElementById("team-image-placeholder");
  placeholder.innerHTML = ""; // Clear existing content

  players.forEach((player) => {
    // Create the card container
    const card = document.createElement("div");
    card.style.width = "300px";
    card.style.height = "400px";
    card.style.position = "relative";
    card.style.backgroundImage = "url('./path/to/teamow.webp')"; // Update with correct path
    card.style.backgroundSize = "cover";
    card.style.backgroundPosition = "center";
    card.style.borderRadius = "15px";
    card.style.overflow = "hidden";
    card.style.margin = "20px auto";
    card.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";

    // Player position and rating
    const positionRating = document.createElement("div");
    positionRating.style.position = "absolute";
    positionRating.style.top = "10px";
    positionRating.style.left = "10px";
    positionRating.style.color = "#fff";
    positionRating.style.fontFamily = "Arial, sans-serif";
    positionRating.style.fontSize = "16px";
    positionRating.style.textShadow = "1px 1px 2px black";
    positionRating.innerHTML = `
      <div><strong>${player.mainPosition}</strong></div>
      <div style="font-size: 22px; font-weight: bold;">⭐ ${player.rating}</div>
    `;

    // Player image
    const playerImage = document.createElement("img");
    playerImage.src = player.picture || "./path/to/default-picture.jpg"; // Default if no picture
    playerImage.alt = player.name || "Player";
    playerImage.style.width = "150px";
    playerImage.style.height = "150px";
    playerImage.style.borderRadius = "50%";
    playerImage.style.position = "absolute";
    playerImage.style.top = "80px";
    playerImage.style.left = "50%";
    playerImage.style.transform = "translateX(-50%)";
    playerImage.style.border = "4px solid white";

    // Player attributes
    const attributes = document.createElement("div");
    attributes.style.position = "absolute";
    attributes.style.bottom = "20px";
    attributes.style.left = "10px";
    attributes.style.right = "10px";
    attributes.style.color = "#fff";
    attributes.style.fontFamily = "Arial, sans-serif";
    attributes.style.textAlign = "left";
    attributes.style.fontSize = "14px";
    attributes.style.textShadow = "1px 1px 2px black";

    // Check if player is a GK or not
    if (player.mainPosition === "GK") {
      attributes.innerHTML = `
        <div>Diving: ${player.diving}</div>
        <div>Handling: ${player.handling}</div>
        <div>Kicking: ${player.kicking}</div>
        <div>Reflexes: ${player.reflexes}</div>
        <div>Speed: ${player.speed}</div>
        <div>Positioning: ${player.positioning}</div>
      `;
    } else {
      attributes.innerHTML = `
        <div>Pace: ${player.pace}</div>
        <div>Shooting: ${player.shooting}</div>
        <div>Passing: ${player.passing}</div>
        <div>Dribbling: ${player.dribbling}</div>
        <div>Defending: ${player.defending}</div>
        <div>Physical: ${player.physical}</div>
      `;
    }

    // Append all elements to the card
    card.appendChild(positionRating);
    card.appendChild(playerImage);
    card.appendChild(attributes);

    // Append the card to the placeholder
    placeholder.appendChild(card);
  });
}

// Load player cards on page load
document.addEventListener("DOMContentLoaded", loadPlayerCards);


// new test 

// Get references to the elements
const deletePlayerBtn = document.getElementById("deletePlayerBtn");
const deletePlayerModal = document.getElementById("deletePlayerModal");
const playersListToDelete = document.getElementById("playersListToDelete");
const deleteSelectedBtn = document.getElementById("deleteSelectedBtn");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

// Show the delete player modal
deletePlayerBtn.addEventListener("click", () => {
  // Show the modal with animation
  deletePlayerModal.classList.remove("hidden");
  deletePlayerModal.classList.add("scale-100");

  // Load and display the players list
  loadPlayersForDeletion();
});

// Close the modal without deleting
cancelDeleteBtn.addEventListener("click", () => {
  deletePlayerModal.classList.remove("scale-100");
  deletePlayerModal.classList.add("scale-0");
});

// Function to load players into the deletion modal
function loadPlayersForDeletion() {
  // Get players from localStorage
  const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];

  // Clear any existing players from the list
  playersListToDelete.innerHTML = '';

  // Create a checkbox for each player
  storedPlayers.forEach(player => {
    const playerItem = document.createElement("div");
    playerItem.className = "flex items-center gap-2 bg-gray-700 p-3 rounded-md hover:bg-gray-600 transition duration-300";

    // Create the checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `player-${player.id}`;
    checkbox.value = player.id;
    checkbox.className = "accent-red-600";

    // Create the label to show the player info
    const label = document.createElement("label");
    label.setAttribute("for", `player-${player.id}`);
    label.textContent = `${player.name} - Rating: ${player.rating} - Position: ${player.mainPosition}`;
    label.className = "flex-1";

    // Append the checkbox and label to the player item
    playerItem.appendChild(checkbox);
    playerItem.appendChild(label);

    // Add the player item to the modal
    playersListToDelete.appendChild(playerItem);
  });
}

// Function to delete selected players
deleteSelectedBtn.addEventListener("click", () => {
  // Get all checkboxes
  const selectedCheckboxes = playersListToDelete.querySelectorAll('input[type="checkbox"]:checked');

  // Get the IDs of the selected players
  const selectedPlayerIds = Array.from(selectedCheckboxes).map(checkbox => checkbox.value);

  // Get the current list of players from localStorage
  let storedPlayers = JSON.parse(localStorage.getItem("players")) || [];

  // Filter out the selected players by ID
  storedPlayers = storedPlayers.filter(player => !selectedPlayerIds.includes(String(player.id)));

  // Save the updated list of players back to localStorage
  localStorage.setItem("players", JSON.stringify(storedPlayers));

  // Close the modal with animation
  deletePlayerModal.classList.remove("scale-100");
  deletePlayerModal.classList.add("scale-0");

  // Refresh the players list on the UI
  renderPlayers();
});

// Function to render the players on the UI after deletion
function renderPlayers() {
  const playersList = document.getElementById("playersList");
  playersList.innerHTML = ''; // Clear the current list

  const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
  storedPlayers.forEach(player => {
    addPlayerToUI(player); // Assuming you have this function to display players on the page
  });
}

// Initial render of players when the page loads
window.addEventListener("load", () => {
  renderPlayers();
});

// edit test 

const editPlayerBtn = document.getElementById("editPlayerBtn");
const editPlayerModal = document.getElementById("editPlayerModal");
const playersListToEdit = document.getElementById("playersListToEdit");
const confirmEditPlayerBtn = document.getElementById("confirmEditPlayerBtn");
const cancelEditPlayerBtn = document.getElementById("cancelEditPlayerBtn");

editPlayerBtn.addEventListener("click", () => {
  // Show the modal with animation
  editPlayerModal.classList.remove("hidden");
  editPlayerModal.classList.add("scale-100");

  // Load and display the players list
  loadPlayersForEditing();
});

cancelEditPlayerBtn.addEventListener("click", () => {
  editPlayerModal.classList.remove("scale-100");
  editPlayerModal.classList.add("scale-0");
});


// Event listener to allow only one checkbox selection at a time
playersListToEdit.addEventListener("change", (event) => {
  if (event.target.type === "checkbox" && event.target.checked) {
    const checkboxes = playersListToEdit.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      if (checkbox !== event.target) {
        checkbox.checked = false;
      }
    });
  }
});

confirmEditPlayerBtn.addEventListener("click", () => {
  const selectedCheckbox = playersListToEdit.querySelector('input[type="checkbox"]:checked');
  if (selectedCheckbox) {
    const playerId = selectedCheckbox.value;
    openEditForm(playerId);
  } else {
    alert("Please select a player to edit.");
  }
});

function  loadPlayersForEditing() {
  const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
  playersListToEdit.innerHTML = '';

  storedPlayers.forEach(player => {
    const playerItem = document.createElement("div");
    playerItem.className = "flex items-center gap-2 bg-gray-700 p-3 rounded-md hover:bg-gray-600 transition duration-300";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `edit-player-${player.id}`;
    checkbox.value = player.id;
    checkbox.className = "accent-green-600";

    const label = document.createElement("label");
    label.setAttribute("for", `edit-player-${player.id}`);
    label.textContent = `${player.name} - Role: ${player.mainPosition}, Rating: ${player.rating}`;
    label.className = "flex-1";

    playerItem.appendChild(checkbox);
    playerItem.appendChild(label);

    playersListToEdit.appendChild(playerItem);
  });
}

function openEditForm(playerId) {


  const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
  const player = storedPlayers.find(p => p.id === parseInt(playerId));

  if (player) {
    const editButton = document.querySelector("#editPlayerB");
    const addPlayerButton = document.querySelector("#addPlayerBtn");
    const playerFormModal = document.querySelector("#playerFormModal");

    editButton.classList.remove("hidden");
    addPlayerButton.classList.add("hidden");

    document.getElementById("name").value = player.name;
    document.getElementById("photo").value = player.photo;
    document.getElementById("mainPosition").value = player.mainPosition;
    document.getElementById("Rating").value = player.rating;
    editPlayerModal.classList.remove("scale-100");
    editPlayerModal.classList.add("scale-0");
    playerFormModal.classList.remove("hidden");

    const newEditListener = (e) => {
      e.stopPropagation();
      edit(playerId);
    };

    editButton.removeEventListener("click", newEditListener);
    editButton.addEventListener("click", newEditListener);
  }
}

function edit(playerId){

    // Validation form edit
    const name = document.getElementById('name').value.trim();
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!name || !nameRegex.test(name)) {
      alert('Name must not be empty and can only contain letters and spaces.');
      return;
    }
  
    const photoUrl = document.getElementById('photo').value;
    try {
      new URL(photoUrl); 
    } catch (_) {
      alert('Please enter a valid Photo URL.');
      return;
    }
  
    const mainPosition = document.getElementById('mainPosition').value;
    const validPositions = ["GK", "LB", "CB", "RB", "CDM", "CM", "CAM", "LM", "RM", "LW", "RW", "ST"];
    if (!validPositions.includes(mainPosition)) {
      alert('Please select a valid Main Position.');
      return;
    }
  
    // Validate Nationality (not empty)
    const nationality = document.getElementById('nationality').value.trim();
    if (!nationality) {
      alert('Nationality must not be empty.');
      return;
    }
  
    const flagUrl = document.getElementById('flag').value;
    try {
      new URL(flagUrl);
    } catch (_) {
      alert('Please enter a valid Flag URL.');
      return;
    }
  
    const club = document.getElementById('club').value.trim();
    if (!club) {
      alert('Club must not be empty.');
      return;
    }
  
    const logoUrl = document.getElementById('logo').value;
    try {
      new URL(logoUrl);
    } catch (_) {
      alert('Please enter a valid Club Logo URL.');
      return;
    }
  
    const rating = document.getElementById('Rating').value;
    if (rating < 5 || rating > 99) {
      alert('Rating must be between 5 and 99.');
      return;
    }
  
    if (document.getElementById('goalkeeperAttributes').classList.contains('hidden') === false) {
      const goalkeeperAttributes = ['diving', 'handling', 'kicking', 'reflexes', 'speed', 'positioning'];
      for (let id of goalkeeperAttributes) {
        const value = document.getElementById(id).value;
        if (value < 10 || value > 99) {
          alert(`${id.charAt(0).toUpperCase() + id.slice(1)} must be between 10 and 99.`);
          return;
        }
      }
    }
  
    if (document.getElementById('outfieldAttributes').classList.contains('hidden') === false) {
      const playerAttributes = ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'];
      for (let id of playerAttributes) {
        const value = document.getElementById(id).value;
        if (value < 10 || value > 99) {
          alert(`${id.charAt(0).toUpperCase() + id.slice(1)} must be between 10 and 99.`);
          return;
        }
      }
    } 

  const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
  const photo = document.getElementById("photo").value;
  const flag = document.getElementById("flag").value;
  const logo = document.getElementById("logo").value;
  
  const index = storedPlayers.findIndex(p => p.id === parseInt(playerId));
  // Check if mainPosition is GK or not and collect respective attributes
if (document.getElementById("mainPosition").value === "GK") {
  storedPlayers[index].diving = parseInt(document.getElementById("diving").value);
  storedPlayers[index].handling = parseInt(document.getElementById("handling").value);
  storedPlayers[index].kicking = parseInt(document.getElementById("kicking").value);
  storedPlayers[index].reflexes = parseInt(document.getElementById("reflexes").value);
  storedPlayers[index].speed = parseInt(document.getElementById("speed").value);
  storedPlayers[index].positioning = parseInt(document.getElementById("positioning").value);
} else {
  storedPlayers[index].pace = parseInt(document.getElementById("pace").value);
  storedPlayers[index].shooting = parseInt(document.getElementById("shooting").value);
  storedPlayers[index].passing = parseInt(document.getElementById("passing").value);
  storedPlayers[index].dribbling = parseInt(document.getElementById("dribbling").value);
  storedPlayers[index].defending = parseInt(document.getElementById("defending").value);
  storedPlayers[index].physical = parseInt(document.getElementById("physical").value);
}
  storedPlayers[index].name = name;
  storedPlayers[index].mainPosition = mainPosition;
  storedPlayers[index].rating = rating;
  storedPlayers[index].photo = photo;
  storedPlayers[index].nationality = nationality;
  storedPlayers[index].flag = flag;
  storedPlayers[index].club = club;
  storedPlayers[index].logo = logo;


  localStorage.setItem("players", JSON.stringify(storedPlayers));
  closeModalBtn.click();
   
}

// test 

const Lineup = document.getElementById("Lineup");
const addLineup = document.querySelectorAll("#addLineup");

addLineup.forEach(line => {
  line.addEventListener("click", () => {
    const parent = document.getElementById("playersListToAssign");
    parent.innerHTML = '';
    // Show the modal with animation
    Lineup.classList.remove("hidden");
    Lineup.classList.add("scale-100");
  
    const pos = line.parentNode.querySelector(".position").textContent.trim();
    const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
  
    const filtred = storedPlayers.filter(p => p.mainPosition === pos);
    console.log(filtred);
    console.log(line);
    
    filtred.forEach(p => addfiltred(p, line));
  
  
    
  });
});


function addfiltred(player, element) {
  const list = document.getElementById("playersListToAssign");
  const playerItem = document.createElement("div");
  playerItem.setAttribute("onclick", "addPlayerToPitch("+JSON.stringify(player) +",'" + element.parentNode.querySelector("#addLineup div").getAttribute("data-position") + "')");
  playerItem.className = "flex flex-col items-center bg-gray-400 text-white rounded-lg p-4 text-center relative group";

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
  playerRoles.innerHTML = `<span class="text-yellow-500">${player.mainPosition || "N/A"}</span>`;

  // Hover Buttons Container
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2";

  // Append all elements to the player item
  playerItem.appendChild(playerImage);
  playerItem.appendChild(playerName);
  playerItem.appendChild(ratingBox);
  playerItem.appendChild(playerRoles);
  playerItem.appendChild(buttonContainer);

  
  list.appendChild(playerItem);
}

function addPlayerToPitch(player, element){
  console.log("trigger addplayertopitch");
  var todelete = null;
  document.querySelectorAll(".position").forEach(e => {
    
    if(e.parentNode.querySelector("#addLineup div").getAttribute("data-position") === element){
      todelete = e.parentNode.querySelector("#addLineup div");
    }
  })
  todelete.remove();

  const pa = document.createElement("div");
  pa.className = "absolute top-[6%] left-[10%]";
// Create the main container
const container = document.createElement("div");

// Create the first flex container
const flexDiv = document.createElement("div");
flexDiv.className = "flex";

// Add the '84' rating element
const rating = document.createElement("h3");
rating.className = "flex font-semibold text-xs pl-2";
rating.textContent = player.rating;

// Add the player image
const img = document.createElement("img");
img.style.width = "60px";
img.style.height = "60px";
img.style.fontSize = "12px";
img.src = player.photo;
img.alt = "";
img.width = "75";

// Append rating and image to the first flex container
flexDiv.appendChild(rating);
flexDiv.appendChild(img);

// Add player name
const playerName = document.createElement("h3");
playerName.className = "text-xs font-bold relative left-2";
playerName.style.fontSize = "10px";
playerName.style.textAlign = "center";
playerName.textContent = player.name;

// Create the stats container
const statsDiv = document.createElement("div");
statsDiv.className = "flex left-[20%] space-x-2 text-[2%] font-bold relative left-2";
statsDiv.style.fontSize = "3px";

// Define stats
let stats;

if (player.mainPosition === "GK") {
    stats = [
        { label: "div", value: player.diving },
        { label: "han", value: player.handling },
        { label: "kic", value: player.kicking },
        { label: "ref", value: player.reflexes },
        { label: "spe", value: player.speed },
        { label: "pos", value: player.positioning }
    ];
} else {
    stats = [
        { label: "pac", value: player.pace },
        { label: "sho", value: player.shooting },
        { label: "pas", value: player.passing },
        { label: "dri", value: player.dribbling },
        { label: "def", value: player.defending },
        { label: "phy", value: player.physical }
    ];
}

// Debugging: Check for NaN or missing fields
console.log("Player Object:", player);
console.log("Stats Array:", stats);

// Create and append stat elements
stats.forEach(stat => {
    const statElement = document.createElement("h4");
    statElement.innerHTML = `${stat.label}<br>${stat.value}`;
    statsDiv.appendChild(statElement);
});

// Append all elements to the main container
container.appendChild(flexDiv);
container.appendChild(playerName);
container.appendChild(statsDiv);

// Append the container to the body or any other desired parent element
pa.appendChild(container);

  addLineup.forEach(line => {
    console.log(line);
    
    const pos = line.parentNode.querySelector(".position").textContent.trim();
    if(pos === player.mainPosition){
          console.log("pos matched");
          
          line.parentNode.insertBefore(pa, line.parentNode.querySelector(".position"));
            Lineup.classList.remove("scale-100");
            Lineup.classList.add("scale-0");
    }

  })

}



canceleditBtn.addEventListener("click", () => {
  Lineup.classList.remove("scale-100");
  Lineup.classList.add("scale-0");
});



const checkplayers ()