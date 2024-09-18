const correctCar = "Ferrari";
const guessForm = document.getElementById('guessForm');
const guessInput = document.getElementById('guessInput');
const resultMessage = document.getElementById('resultMessage');
const clearSection = document.getElementById('clearSection');
let clearSize = 100;

guessForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const guess = guessInput.value.trim();
  if (guess.toLowerCase() === correctCar.toLowerCase()) {
    resultMessage.textContent = "Correct! It's a Ferrari!";
    document.getElementById('carImage').style.filter = 'none';
  } else {
    resultMessage.textContent = "Incorrect, try again!";
    clearSize += 20;
    clearSection.style.width = clearSize + 'px';
    clearSection.style.height = clearSize + 'px';
    clearSection.style.clipPath = `circle(${clearSize / 2}px at center)`;
  }
  guessInput.value = '';
});

// Function to store the user's guess in Firestore
function saveGuess(userInput) {
    db.collection("guesses").add({
      guess: userInput,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      console.log("Guess saved successfully!");
    })
    .catch((error) => {
      console.error("Error saving guess: ", error);
    });
  }
  
  // Call this function when a user makes a guess
  guessForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const guess = guessInput.value.trim();
  
    saveGuess(guess);  // Save the guess to Firestore
    
    // Additional game logic (e.g., compare guess with correct car)
  });

  // Function to fetch previous guesses for suggestions
function getSuggestions(userInput) {
    db.collection("guesses")
      .where("guess", ">=", userInput)
      .where("guess", "<=", userInput + "\uf8ff") // Range query for partial matches
      .get()
      .then((querySnapshot) => {
        let suggestions = [];
        querySnapshot.forEach((doc) => {
          suggestions.push(doc.data().guess);
        });
        console.log("Suggestions: ", suggestions);
        displaySuggestions(suggestions);  // Show suggestions to the user
      })
      .catch((error) => {
        console.error("Error getting suggestions: ", error);
      });
  }
  
  // Function to display suggestions to the user
  function displaySuggestions(suggestions) {
    const suggestionsList = document.getElementById("suggestionsList");
    suggestionsList.innerHTML = "";  // Clear previous suggestions
    suggestions.forEach((suggestion) => {
      const listItem = document.createElement("li");
      listItem.textContent = suggestion;
      suggestionsList.appendChild(listItem);
    });
  }
  
  // Call this function as the user types in their guess
  guessInput.addEventListener('input', function(event) {
    const input = event.target.value.trim();
    if (input.length >= 2) {  // Fetch suggestions only for 2 or more characters
      getSuggestions(input);
    }
  });
  
  
