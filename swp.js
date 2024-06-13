let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapTimes = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('laps');

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 1000);
        isRunning = true;
        startStopBtn.textContent = 'Pause';
    }
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        const currentLapTime = Date.now() - startTime;
        lapTimes.push(currentLapTime);
        displayLapTimes();
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    startTime = null;
    lapTimes = [];
    display.textContent = '00:00:00';
    lapsList.innerHTML = '';
    startStopBtn.textContent = 'Start';
});

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    const time = new Date(elapsedTime);
    const minutes = String(time.getUTCMinutes()).padStart(2, '0');
    const seconds = String(time.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(time.getUTCMilliseconds()).padStart(3, '0').substring(0, 2);
    display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function displayLapTimes() {
    lapsList.innerHTML = '';
    lapTimes.forEach((lapTime, index) => {
        const lapTimeDate = new Date(lapTime);
        const minutes = String(lapTimeDate.getUTCMinutes()).padStart(2, '0');
        const seconds = String(lapTimeDate.getUTCSeconds()).padStart(2, '0');
        const milliseconds = String(lapTimeDate.getUTCMilliseconds()).padStart(3, '0').substring(0, 2);
        const lapTimeString = `${minutes}:${seconds}:${milliseconds}`;
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lapTimeString}`;
        lapsList.appendChild(li);
    });
}
