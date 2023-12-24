document.addEventListener("DOMContentLoaded", function () {
    const targetContainer = document.getElementById("target-container");
    const target = document.getElementById("target");
    const targetSizeInput = document.getElementById("target-size");
    const sliderValue = document.getElementById("slider-value");
    const randomizeButton = document.getElementById("randomize");
    const addPointButton = document.getElementById("add-point");
    const subtractPointButton = document.getElementById("subtract-point");
    const resetGameButton = document.getElementById("reset-game");
    const stopTimerButton = document.getElementById("stop-timer");
    const startTimerButton = document.getElementById("start-timer");
    const adjustTimerButton = document.getElementById("adjust-timer");
    const scoreContainer = document.getElementById("score");
    const timerContainer = document.getElementById("timer");

    let score = 0;
    let timer = 60;
    let timerInterval;

    function updateTargetSize() {
        const newSize = targetSizeInput.value;
        target.style.width = newSize + "px";
        target.style.height = newSize + "px";
        sliderValue.textContent = newSize;
    }

    function randomizeTarget() {
        const containerWidth = targetContainer.clientWidth;
        const containerHeight = targetContainer.clientHeight;

        const randomX = Math.floor(Math.random() * (containerWidth - 50));
        const randomY = Math.floor(Math.random() * (containerHeight - 50));

        target.style.left = randomX + "px";
        target.style.top = randomY + "px";
    }

    function increaseScore() {
        score++;
        scoreContainer.textContent = score;
    }

    function decreaseScore() {
        score = Math.max(0, score - 1);
        scoreContainer.textContent = score;
    }

    function startTimer() {
        timerInterval = setInterval(function () {
            timer--;
            timerContainer.textContent = timer + " seconds";

            if (timer === 0) {
                clearInterval(timerInterval);
                alert("Game Over! Your Score: " + score);
                resetGame();
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function resetGame() {
        score = 0;
        timer = 60;
        scoreContainer.textContent = score;
        timerContainer.textContent = timer + " seconds";
        randomizeTarget();
        startTimer();
    }

    targetSizeInput.addEventListener("input", updateTargetSize);
    randomizeButton.addEventListener("click", function () {
        randomizeTarget();
        increaseScore();
    });
    addPointButton.addEventListener("click", increaseScore);
    subtractPointButton.addEventListener("click", decreaseScore);
    resetGameButton.addEventListener("click", resetGame);
    stopTimerButton.addEventListener("click", stopTimer);
    startTimerButton.addEventListener("click", startTimer);
    adjustTimerButton.addEventListener("click", function () {
        const newTimer = prompt("Enter new timer duration (in seconds):");
        if (newTimer !== null) {
            timer = parseInt(newTimer, 10) || timer;
            timerContainer.textContent = timer + " seconds";
        }
    });

    // Initialize target size and position
    updateTargetSize();
    randomizeTarget();
    startTimer();
});
