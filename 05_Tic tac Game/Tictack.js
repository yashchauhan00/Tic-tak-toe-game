const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialise the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box, index) => {
        box.innerHTML = "";
        boxes[index].style.pointerEvents = "all";
        // Initialize box with css properties again
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    // update UI
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        if((gameGrid[position[0]] === "X" && gameGrid[position[1]] === "X" && gameGrid[position[2]] === "X") || (gameGrid[position[0]] === "O" && gameGrid[position[1]] === "O" && gameGrid[position[2]] === "O") ) {
            
            if(gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "O";

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            // To add green background for the winner X/O
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // it means we have a winner now
    if(answer !== ""){
        gameInfo.innerHTML = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // lets check whether there is a TIE
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillCount++;
    });

    // board is fille, game is TIE
    if(fillCount === 9) {
        gameInfo.innerHTML = "Game Tied !";
        newGameBtn.classList.add("active");
    }

}

function handleClick(index) {
    if(gameGrid[index] === "") {
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap the player
        swapTurn();
        // check if a player wins
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

newGameBtn.addEventListener("click", initGame);