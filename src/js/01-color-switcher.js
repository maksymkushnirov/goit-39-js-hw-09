const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

const timer = {
  intervalId: null,
  start() {
    const startTime = Date.now();
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      if (deltaTime) {
        document.body.style.background = getRandomHexColor();
        btnStart.setAttribute('disabled', true);
      }
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
    btnStart.removeAttribute('disabled');
  },
};

btnStart.addEventListener('click', timer.start.bind());
btnStop.addEventListener('click', timer.stop.bind());

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
