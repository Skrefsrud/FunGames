// Initialize game variables
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
const restartButton = document.getElementById('restart_button');
const squares = document.querySelectorAll('.square');

// Adding event listeners for each square
squares.forEach(square => {
  square.addEventListener('click', () => {
    if (gameBoard[square.id] === '' && !checkWinner()) { // if the square clicked on is empty and there's no winner yet...
      // Update the game board and display the current player's symbol
      gameBoard[square.id] = currentPlayer;
      square.innerHTML = currentPlayer;

      // Check if there is a winner
      if (checkWinner()) {
        alert(`${currentPlayer} wins!`);
      } else if (gameBoard.indexOf('') === -1) {
        alert("It's a draw!");
      } else {
        // Switch to the other player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  });
});

restartButton.addEventListener('click', function() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  squares.forEach(square => {
    square.innerHTML = '';
  });
  currentPlayer = 'X';
});

// Function to check for a winner (you need to implement this)
function checkWinner() {
  // Implement the winning logic here (e.g., checking rows, columns, and diagonals)
}

function checkWinner() {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];
  
    for (let i = 0; i < winningCombinations.length; i++) { // the code will countinue executing as long as i is less the length of winningCombinations. 
      const [a, b, c] = winningCombinations[i];
      if (
        gameBoard[a] !== '' && // Checking that cell a is not an empty string 
        gameBoard[a] === gameBoard[b] &&
        gameBoard[a] === gameBoard[c] //checing if a, b, c have the same symbol. 
      ) {
        return gameBoard[a]; // Return the winning player ('X' or 'O')
      }
    }
  
    if (!gameBoard.includes('')) {
      return 'draw'; // It's a draw
    }
  
    return null; // No winner yet
  }

  // Deler av koden er hentet fra ChatGPT.

/*let restart_button = document.getElementById("restart_button")

let squares = Array.from(document.querySelectorAll(".square"));

console.log(squares)
const winning_combinations =
 [[0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], //row
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], //vertical
  [0, 4, 8],
  [2, 4, 6] // diagonal
];


const O = "O";
const X = "X";

let current_player = X;
let spaces = Array(9).fill(null) // making an array with a length of 9 and fills it with "null" values

function test(){
    document.getElementsByClassName("square").innerHTML = current_player;


}

/*
squares.forEach(function(square){
    square.addEventListener('click', function(){})
    square.innetText = current_player;
    current_player = current_player == "X" ? "O" : "X"
}


)*/





/*
function startGame(){
    squares.forEach(squares.addEventListener("click", boxClicked))

}

function boxClicked(e){
    console.log(e.target);

}

startGame()*/