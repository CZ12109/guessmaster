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
