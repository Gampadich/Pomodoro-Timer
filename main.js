document.getElementById('toggleTheme').addEventListener('click', function(){
    document.body.classList.toggle('dark')
})



let isRunning = false
let timerInterval
let timRemaining = 25 * 60
let sessionType = 'work'
let pomodoroCount = 0

const startButton = document.getElementById('startButton')
const resetButton = document.getElementById('resetButton')
const timeDisplay = document.getElementById('timeDisplay')
const sessionTypeDisplay = document.getElementById('sessionType')
const alarmSound = document.getElementById('alarmSound')
const progressBar = document.getElementById('progress')

function updateTime() {
    const minutes = Math.floor(timRemaining / 60)
    const seconds = timRemaining % 60

    let sessionDuration = sessionType === 'work' ? 25 * 60 : 5 * 60
    let progressPercent = ((sessionDuration - timRemaining) / sessionDuration) * 100

    progressBar.style.width = `${progressPercent}%`
    timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
}

function updateCounter() {
    document.getElementById('counter').textContent = `Completed Pomodoros: ${pomodoroCount}`
}

function toggleSession() {
    if (isRunning) {
        clearInterval(timerInterval)
    }

    workDuration = parseInt(workDurationInput.value)
    breakDuration = parseInt(breakDurationInput.value)

    if (sessionType === 'work') {
        pomodoroCount++

        if (pomodoroCount % 4 === 0) {
            timRemaining = 15 * 60
            sessionTypeDisplay.textContent = 'Long Break'
        } else {
            timRemaining = 5 * 60
            sessionTypeDisplay.textContent = 'Short Break'
        }

        sessionType = 'break'
    } else {
        timRemaining = timRemaining * 60
        sessionType = 'work'
        sessionTypeDisplay.textContent = 'Work Session'
    }

    updateCounter()
    updateTime()
    alarmSound.play()

    isRunning = true

    timerInterval = setInterval(() => {
        if (timRemaining > 0) {
            timRemaining--
            updateTime()
        } else {
            toggleSession()
        }
    }, 1000)
}

function startTimer() {
    isRunning = true
    startButton.textContent = 'Pause'
    const interval = setInterval(() => {
        if (!isRunning) {
            clearInterval(interval)
            return
        }

        timRemaining--
        updateTime()

        if (timRemaining <= 0) {
            toggleSession()
        }
    }, 1000)
}

function resetTimer() {
    isRunning = false
    timRemaining = 25 * 60
    sessionType = 'work'
    sessionTypeDisplay.textContent = 'Work Session'
    startButton.textContent = 'Start'
    updateTime()
}

startButton.addEventListener('click', () => {
    if (isRunning) {
        isRunning = false
        startButton.textContent = 'Start'
    } else {
        startTimer()
    }
})

resetButton.addEventListener('click', resetTimer)

updateTime()