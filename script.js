let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let timeLeft = 15;
let timer;
let moleInterval;
let plantInterval;

window.onload = function() {
    document.getElementById("playButton").addEventListener("click", startGame);
}

function startGame() {
    resetGame();
    setGame();
    startTimer();
    document.getElementById("playButton").disabled = true;
}

function resetGame() {
    score = 0;
    gameOver = false;
    timeLeft = 15;
    clearInterval(timer);
    clearInterval(moleInterval);
    clearInterval(plantInterval);
    document.getElementById("timer").innerText = "Time: " + timeLeft.toString() + "s";
    document.getElementById("score").innerText = score.toString();
    document.getElementById("board").innerHTML = "";
    document.getElementById("timer").classList.remove("countdown");
    document.getElementById("timer").classList.remove("game-over");
}

function setGame() {
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    setMole();
    setPlant();
    moleInterval = setInterval(setMole, 800);
    plantInterval = setInterval(setPlant, 800);
}

function startTimer() {
    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timer").innerText = "Time: " + timeLeft.toString() + "s";

        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        } else if (timeLeft <= 5) {
            document.getElementById("timer").classList.add("countdown");
        } else {
            document.getElementById("timer").classList.remove("countdown");
        }
    }, 1000);
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function endGame() {
    clearInterval(timer);
    document.getElementById("score").innerText = "Game Over, Your Score: " + score.toString();
    gameOver = true;
    document.getElementById("playButton").disabled = false;
    document.getElementById("timer").classList.add("game-over");
}

function setMole() {
    if (gameOver) {
        return;
    }

    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }

    let mole = document.createElement("img");
    mole.src = "./img/pig.png";

    let num = getRandomTile();

    if (currPlantTile && currPlantTile.id == num) {
        return;
    }

    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }

    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = "./img/bulldog.png";

    let num = getRandomTile();

    if (currMoleTile && currMoleTile.id == num) {
        return;
    }

    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = "Your Score: " + score.toString();
    } else if (this == currPlantTile) {
        document.getElementById("score").innerText = "Game Over, Your Score: " + score.toString();
        gameOver = true;
        document.getElementById("playButton").disabled = false;
        clearInterval(timer);
    }
}
