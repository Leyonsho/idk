document.getElementById("startBtn").addEventListener("click", function() {
    document.querySelector(".container").classList.add("hidden");
    document.querySelector(".game").classList.remove("hidden");
    startGame();
});

// Handle keyboard controls for desktop
document.addEventListener("keydown", function(event) {
    let basketPos = basket.offsetLeft;
    if (event.key === "ArrowLeft" && basketPos > 0) {
        basket.style.left = (basketPos - 20) + "px";
    } else if (event.key === "ArrowRight" && basketPos < 250) {
        basket.style.left = (basketPos + 20) + "px";
    }
});

// Handle touch controls for mobile
let touchStartX = 0;
document.addEventListener("touchstart", function(event) {
    touchStartX = event.touches[0].clientX;
});

document.addEventListener("touchmove", function(event) {
    let touchEndX = event.touches[0].clientX;
    let basketPos = basket.offsetLeft;

    if (touchEndX < touchStartX && basketPos > 0) {
        basket.style.left = (basketPos - 20) + "px";
    } else if (touchEndX > touchStartX && basketPos < 250) {
        basket.style.left = (basketPos + 20) + "px";
    }
});

let basket = document.getElementById("basket");
let gameArea = document.getElementById("gameArea");
let scoreDisplay = document.getElementById("score");
let score = 0;
let gameInterval;

function createHeart() {
    let heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = Math.random() * 280 + "px";
    heart.style.top = "0px";
    gameArea.appendChild(heart);

    let fallInterval = setInterval(() => {
        heart.style.top = (heart.offsetTop + 5) + "px";

        if (heart.offsetTop >= 370) {
            if (Math.abs(heart.offsetLeft - basket.offsetLeft) < 40) {
                score++;
                scoreDisplay.innerText = score;
                heart.remove();
                clearInterval(fallInterval);
                if (score === 10) {
                    endGame();
                }
            } else {
                heart.remove();
                clearInterval(fallInterval);
            }
        }
    }, 100);
}

function startGame() {
    gameInterval = setInterval(createHeart, 800);
}

function endGame() {
    clearInterval(gameInterval);
    document.querySelector(".game").classList.add("hidden");
    document.querySelector(".final-message").classList.remove("hidden");
}