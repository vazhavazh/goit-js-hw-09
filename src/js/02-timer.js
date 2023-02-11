import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.getElementById('datetime-picker');
const button = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let selectedDateMs = 0;
button.disabled = true;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        button.disabled = true;
        if (selectedDates[0] < new Date()) {
            Notiflix.Notify.failure('Please choose a date in the future');
            return;
        }
        button.disabled = false;
        selectedDateMs = selectedDates[0].getTime();
    },
};

flatpickr(input, options);

let timerId = 0;
button.addEventListener('click', () => {
    input.disabled = true;
    button.disabled = true;
    let diffMs = selectedDateMs - Date.now();
    timerId = setInterval(() => {
        diffMs = diffMs - 1000;
        if (diffMs <= 0) {
            clearInterval(timerId);

            return;
        }
        const timeLeft = convertMs(diffMs);
        secondsEl.textContent = addLeadingZero(timeLeft.seconds);
        minutesEl.textContent = addLeadingZero(timeLeft.minutes);
        hoursEl.textContent = addLeadingZero(timeLeft.hours);
        daysEl.textContent = addLeadingZero(timeLeft.days);
    }, 1000);
});

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}