document.addEventListener("DOMContentLoaded", function () {
    const duck = document.getElementById("duck");
    const scoreElement = document.getElementById("score");
    const startButton = document.getElementById("startButton");
    const stopButton = document.getElementById("stopButton");
    const gameContainer = document.querySelector(".game-container");
    let score = 0;
    let countdownTimer;
    let gameRunning = false;

    startButton.addEventListener("click", startGame);
    stopButton.addEventListener("click", stopGame);

    duck.addEventListener("click", function () {
        if (gameRunning) {
            score++;
            updateScore();
            playSound("duck hit.mp3"); // Voeg het geluidseffect toe wanneer je op de eend klikt
            resetDuckPosition();
        }
    });

    function updateScore() {
        scoreElement.textContent = score;
    }

    function resetDuckPosition() {
        const maxX = gameContainer.clientWidth - duck.clientWidth;
        const maxY = gameContainer.clientHeight - duck.clientHeight;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        duck.style.left = `${randomX}px`;
        duck.style.top = `${randomY}px`;

        if (gameRunning) {
            duck.style.display = 'block'; // Laat de eend zien als de game aan de gang is
        }
    }

    function handleResize() {
        // Update the position when the window is resized
        resetDuckPosition();
    }

    window.addEventListener("resize", handleResize);

    function startGame() {
        if (!gameRunning) {
            startButton.disabled = true;
            stopButton.disabled = false;
            playSound("quack.mp3"); // Voeg het startgeluidseffect toe
            countdown(7000); // Start een cooldown van 7000 milliseconden (7 seconden) voordat het spel begint
        }
    }

    function stopGame() {
        startButton.disabled = false;
        stopButton.disabled = true;
        clearInterval(countdownTimer);
        gameRunning = false;
        showGameOver(score); // Toon "Game over" met de eindscore
        score = 0; // Reset de score naar nul
        updateScore(); // Update de score op de pagina
    }

    function playSound(soundFile) {
        const audio = new Audio(soundFile);
        audio.play();
    }

    function countdown(milliseconds) {
        setTimeout(function () {
            startCountdown();
        }, milliseconds);
    }

    function startCountdown() {
        gameRunning = true; // Zet gameRunning op true wanneer de game begint
        resetDuckPosition(); // Initiële positie
        updateScore(); // Zorg ervoor dat de score wordt bijgewerkt bij de start van het spel
        countdownTimer = setTimeout(function () {
            stopGame(); // Stop het spel na 10000 milliseconden (10 seconden)
        }, 10000);
    }

    function showGameOver(finalScore) {
        alert(`Game over! Je eindscore: ${finalScore}`);
    }
});
