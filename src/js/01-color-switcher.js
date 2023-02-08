
const startButton = document.querySelector('button[data-start]')

const stopButton = document.querySelector('[data-stop]')
const bodyEl = document.querySelector('body')
let timerId = null

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

stopButton.disabled = true

startButton.addEventListener('click', () => {
    startButton.disabled = true
    stopButton.disabled = false
     timerId = setInterval(() => {
        const randomColorValue = getRandomHexColor()
        bodyEl.style.backgroundColor = randomColorValue
    }, 1000);
});

stopButton.addEventListener('click', () => {
    startButton.disabled = false
    stopButton.disabled = true
    clearInterval(timerId)

})


console.log("dfdf");