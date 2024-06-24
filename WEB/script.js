let boxes = document.querySelectorAll(".box");
let res = document.querySelector("#reset");
let newGame = document.querySelector("#newGame");
let winnerMessage = document.querySelector("#winnerMessage");

let currentPlayer = true;
let win = false;
let scoreX = 0;
let scoreO = 0;

const scoreXDisplay = document.querySelector("#scoreX");
const scoreODisplay = document.querySelector("#scoreO");

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (currentPlayer) {
                box.innerText = "X";
            } else {
                box.innerText = "O";
            }
            box.disabled = true;
            currentPlayer = !currentPlayer;

            checkWinner();
        }
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let p1val = boxes[pattern[0]].innerText;
        let p2val = boxes[pattern[1]].innerText;
        let p3val = boxes[pattern[2]].innerText;

        if (p1val !== "" && p1val === p2val && p2val === p3val) {
            win = true;
            winnerMessage.innerText = `Player ${p1val} won!`;
            updateScore(p1val);
            boxes.forEach((box) => {
                box.disabled = true;
            });
            return;
        }
    }

    let draw = [...boxes].every(box => box.innerText !== "");
    if (!win && draw) {
        winnerMessage.innerText = "Game draw!";
    }
};

const updateScore = (winner) => {
    if (winner === "X") {
        scoreX++;
        scoreXDisplay.innerText = scoreX;
    } else if (winner === "O") {
        scoreO++;
        scoreODisplay.innerText = scoreO;
    }
};

res.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
    winnerMessage.innerText = "";
    currentPlayer = true;
    win = false;
});

newGame.addEventListener("click", () => {
    scoreX = 0;
    scoreO = 0;
    scoreXDisplay.innerText = scoreX;
    scoreODisplay.innerText = scoreO;
    res.click();
});
