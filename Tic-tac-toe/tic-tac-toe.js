// knapp for å vise regler
function skjul_regler() {
  let spill_regler = document.getElementById('spillregler');
  if (spill_regler.style.display === 'none') {
      spill_regler.style.display = 'block';
  } else {
      spill_regler.style.display = 'none';
  }
}


let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
const restartButton = document.getElementById('restart_button');
const squares = document.querySelectorAll('.square');

squares.forEach(square => {                              // legger til event listeners for hver rute
  square.addEventListener('click', () => {
    if (gameBoard[square.id] === '' && !checkWinner()) { // Hvis ruten som er valgt eller funksjonen "winner" ikke kjøres
      gameBoard[square.id] = currentPlayer;              // oppdaterer spillerbrett med det nye symbolet.
      square.innerHTML = currentPlayer;

      
      if (checkWinner() === 'draw') {                    // Sjekker om det finnes en vinner
        alert("Det endte uavgjort!");
      } else if (checkWinner()) {
        alert(`${currentPlayer} vant!`);
      } else {
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

function checkWinner() {                                // Funksjon for å sjekke vinner
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horisontalt
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikalt
      [0, 4, 8], [2, 4, 6] // Diagonalt
    ];
  
    for (let i = 0; i < winningCombinations.length; i++) { // Koden kjører så lenge den er kortere enn lengden på winningCombinations. 
      const [a, b, c] = winningCombinations[i];
      if (
        gameBoard[a] !== "" &&                             // Sjekker at ruten ikke er en tom streng 
        gameBoard[a] === gameBoard[b] &&
        gameBoard[a] === gameBoard[c]                      //Sjekker om a, b og c har samme symbol
      ) {
        return gameBoard[a]; // Returnerer vinner ('X' eller 'O')
      }
    }  
  
    if (!gameBoard.includes('')) {
      return 'draw'; 
    }
      return null; // Ingen vinner enda
  }


  