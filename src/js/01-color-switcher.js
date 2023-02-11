

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBodyColor() {
    const colorResult = getRandomHexColor();
    document.body.style.background = colorResult;
}

stopBtn.disabled = true
startBtn.addEventListener('click', (e) => {
    stopBtn.disabled = false
    startBtn.disabled = true

    changeBodyColor()


    timerId = setInterval(() => {
        changeBodyColor()
    }, 1000);

});

stopBtn.addEventListener('click', (e) => {
    stopBtn.disabled = true
    startBtn.disabled = false

    clearInterval(timerId)
})