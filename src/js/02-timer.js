import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const ref = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  span: document.querySelectorAll('.value'),
};

let timerId = null;

ref.button.disabled = true;

flatpickr(ref.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      ref.button.disabled = true;
    } else {
      ref.button.disabled = false;
      Notiflix.Notify.success('Lets go?');
    }
  },
});

ref.button.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
  ref.span.forEach(item => item.classList.toggle('end'));
  ref.button.disabled = true;
  ref.input.disabled = true;
  timerId = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  const choosenDate = new Date(ref.input.value);
  const timeToFinish = choosenDate - Date.now();
  const { days, hours, minutes, seconds } = convertMs(timeToFinish);

  ref.days.textContent = addLeadingZero(days);
  ref.hours.textContent = addLeadingZero(hours);
  ref.minutes.textContent = addLeadingZero(minutes);
  ref.seconds.textContent = addLeadingZero(seconds);

  if (timeToFinish < 1000) {
    ref.span.forEach(item => item.classList.toggle('end'));
    clearInterval(timerId);
    ref.input.disabled = false;
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}
