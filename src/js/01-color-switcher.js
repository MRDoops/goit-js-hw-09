const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

startButton.addEventListener('click', onstartButton);
stopButton.addEventListener('click', onStopColor);
let intervalId;
function changeBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function onstartButton() {
  if (!intervalId) {
    intervalId = setInterval(changeBackgroundColor, 1000);
    startButton.disabled = true;
    stopButton.disabled = false;
  }
}

function onStopColor() {
  clearInterval(intervalId);
  intervalId = null;
  startButton.disabled = false;
  stopButton.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
