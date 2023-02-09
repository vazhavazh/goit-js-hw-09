// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";

const datetimePickerInput = document.getElementById("datetime-picker")
// console.log(datetimePickerInput);
const btnTimerStart = document.querySelector('button[data-start]')

const dayInSpanEl = document.querySelector('span[data-days]')
// console.log(dayInSpanEl);

const hoursInSpanEl = document.querySelector('span[data-hours]')

const minutesInSpanEl = document.querySelector('span[data-minutes]')

const secondsInSpanEl = document.querySelector('span[data-seconds]')

btnTimerStart.disabled = true

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

function pad(value) {
    return String(value).padStart(2, '0');
}

const fp = flatpickr(datetimePickerInput, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        // console.dir(selectedDates[0])
        const chosenDate = selectedDates[0].getTime()
        const currentTime = Date.now()

        if (chosenDate < currentTime) {
            return alert("Please choose a date in the future")
        }
        btnTimerStart.disabled = false
        const timer = {
            intervalId: null,
            start() {
                btnTimerStart.disabled = true
                this.intervalId = setInterval(() => {

                    const currentTime = Date.now()
                    console.log(currentTime);
                    // console.log(chosenDate);
                    const deltaTime = chosenDate - currentTime
                    // console.log(deltaTime);
                    if (deltaTime < 1000) {
                        this.stop()
                    }

                    const { days, hours, minutes, seconds } = convertMs(deltaTime)
                    dayInSpanEl.textContent = days
                    hoursInSpanEl.textContent = hours
                    minutesInSpanEl.textContent = minutes
                    secondsInSpanEl.textContent = seconds
                }, 1000);
            },
            stop() {
                clearInterval(this.intervalId)

            }
        }

        btnTimerStart.addEventListener('click', () => {
            timer.start()
        })

    }
});







