import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  selectedDates: null,

  input: document.querySelector('input[type="text"]'),
  startButton: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.startButton.disabled = true;

// calendar
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Notify.failure('Please choose a date in the future');
    } else {
      refs.startButton.disabled = false;
      //date
      refs.selectedDates = selectedDates[0].getTime();
    }
  },
};
const calendar = flatpickr(refs.input, options);

refs.startButton.addEventListener('click', () => {
  // console.log (click on start);
  // const startTime = Date.now(); (startTime = currentTime)
  const startTime = refs.selectedDates;

  const intervalId = setInterval(() => {
    refs.startButton.disabled = true;
    const currentTime = Date.now();
    const deltaTime = startTime - currentTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    // minimal = 0
    if (deltaTime < 1000) {
      clearInterval(intervalId);
    }

    updateClockFace({ days, hours, minutes, seconds });
    // console.log(`${days}:${hours}:${minutes}:${seconds}`)
  }, 1000);
});

// choose time
function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

// time format: 1 -> 01, 7 -> 07, 14 -> 14
function pad(value) {
  return String(value).padStart(2, '0');
}

// Для подсчета значений используй готовую функцию convertMs, где ms - разница между конечной и текущей датой в миллисекундах.

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
