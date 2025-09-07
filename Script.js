let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerO, playerX
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Reset the game
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.remove("show"); // Hide message box
};

// Disable all boxes
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// Enable all boxes and clear text
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

// Show winner message
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.add("show");
  disableBoxes();
};

// Show draw message
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.add("show");
  disableBoxes();
};

// Check for winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
  return false;
};

// Handle box click events
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return; // Prevent overwriting

    if (turnO) {
      // Player O's turn
      box.innerText = "O";
      turnO = false;
    } else {
      // Player X's turn
      box.innerText = "X";
      turnO = true;
    }

    box.disabled = true; // Disable the box after selection
    count++; // Increment the move count

    let isWinner = checkWinner(); // Check if there's a winner

    if (count === 9 && !isWinner) {
      gameDraw(); // Declare draw if no winner and board is full
    }
  });
});

// Reset button event
resetBtn.addEventListener("click", resetGame);

// New Game button event
newGameBtn.addEventListener("click", resetGame);
