let boxes = document.querySelectorAll(".box");
let turn = "X";
let isGameOver = false;
let player1 = "";
let player2 = "";
let winnerList = [];

// Start the game when the start button is clicked
document.getElementById("start-game").addEventListener("click", () => {
    // Get player names
    player1 = document.getElementById("player1").value || "Player 1";
    player2 = document.getElementById("player2").value || "Player 2";

    // Play the start game sound
    document.getElementById("start-game-sound").play();

    // Hide start screen and show game screen
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";

    // Initialize the game board
    boxes.forEach(e => {
        e.innerHTML = "";
        e.addEventListener("click", handleBoxClick);
    });

    // Reset game state
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";
});

function handleBoxClick() {
    if (!isGameOver && this.innerHTML === "") {
        this.innerHTML = turn;
        checkWin();
        checkDraw();
        changeTurn();
    }
}

function changeTurn() {
    turn = (turn === "X") ? "O" : "X";
    document.querySelector(".bg").style.left = (turn === "X") ? "0" : "85px";
}

function checkWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let condition of winConditions) {
        let [a, b, c] = condition;
        if (boxes[a].innerHTML && boxes[a].innerHTML === boxes[b].innerHTML && boxes[a].innerHTML === boxes[c].innerHTML) {
            isGameOver = true;
            let winner = (turn === "X") ? player1 : player2;
            document.querySelector("#results").innerHTML = `${winner} wins`;

            // Add to winner list
            winnerList.push(winner);
            updateWinnerList();

            document.querySelector("#play-again").style.display = "inline";
            [a, b, c].forEach(i => {
                boxes[i].style.backgroundColor = "#08D9D6";
                boxes[i].style.color = "#000";
            });

            document.getElementById("win-sound").play();
            return;
        }
    }
}

function checkDraw() {
    if (!isGameOver) {
        let isDraw = [...boxes].every(box => box.innerHTML !== "");
        if (isDraw) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Draw";
            document.querySelector("#play-again").style.display = "inline";
            document.getElementById("draw-sound").play();
        }
    }
}

function updateWinnerList() {
    const winnerListElement = document.getElementById("winners");
    winnerListElement.innerHTML = ""; // Clear previous list

    winnerList.forEach((winner, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Game ${index + 1}: ${winner}`;
        winnerListElement.appendChild(listItem);
    });
}

// Reset the game when the Play Again button is clicked
document.querySelector("#play-again").addEventListener("click", () => {
    let winSound = document.getElementById("win-sound");
    winSound.pause();
    winSound.currentTime = 0;

    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff";
    });

    document.getElementById("play-again-sound").play();
    
});
// Logout button to reload the page and reset everything
document.getElementById("logout").addEventListener("click", () => {
    location.reload(); // Reloads the page to reset everything
});
