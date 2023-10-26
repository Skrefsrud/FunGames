
const valgmulighetene = document.querySelectorAll('.valg');
const SpillerScoren = document.querySelector('.spiller-score');
const ComputerScoren = document.querySelector('.computer-score');
const ResultatElementet = document.querySelector('#resultat');
const spilligjenknappen = document.querySelector('#spill-igjen');
const nedtellingElementet = document.querySelector('#nedtelling');
const computerValgElementet = document.querySelector('#computer-valg');

const våpen = ['stein', 'papir', 'saks'];
let spillerScore = 0;
let computerScore = 0;
let nedtelling = 10;
let timeout;

// Funksjonen som gjør at computer velger et tilfeldig våpen
function computerVelgerVåpen() {
  const våpenvalgene = Math.floor(Math.random() * våpen.length);
  return våpen[våpenvalgene];
}

//Vise regler knappen//

function visregler() {
  let reglene = document.getElementById('reglene');
  if (reglene.style.display === 'none') {
    reglene.style.display = 'block';
  }
  else {
    reglene.style.display = 'none';
  }
}

// Funksjonen som oppdaterer scorboardet og timeren
function oppdaterScoreboard(spillerVåpen, computerVåpen) {
  clearTimeout(timeout);
  if (spillerVåpen) {
    computerValgElementet.innerHTML = `Computer valgte: ${computerVåpen}.`;
    if (spillerVåpen === computerVåpen) {
      ResultatElementet.innerHTML = "Uavgjort!";
    } else if (
      (spillerVåpen === 'stein' && computerVåpen === 'saks') ||
      (spillerVåpen === 'papir' && computerVåpen === 'stein') ||
      (spillerVåpen === 'saks' && computerVåpen === 'papir')
    ) {
      ResultatElementet.innerHTML = 'Du vant!';
      spillerScore++;
      SpillerScoren.innerHTML = `Player: ${spillerScore}`;
    } else {
      ResultatElementet.innerHTML = 'Computer vant!';
      computerScore++;
      ComputerScoren.innerHTML = `Computer: ${computerScore}`;
    }
    startTimer();
  } else {
    computerValgElementet.innerHTML = `Game Over`;
    ResultatElementet.innerHTML = 'Du valgte ikke et våpen! Du tapte runden';
    ResultatElementet.style.color = 'red';
    UmuligeValg();
  }

  if (spillerScore === 5) {
    ResultatElementet.textContent = 'Gratulerer. Du vant!';
    ResultatElementet.style.color = 'green';
    computerValgElementet.innerHTML = 'Game Over';
    UmuligeValg();
    stopTimer();
  }

  if (computerScore === 5) {
    ResultatElementet.textContent = 'Du tapte!';
    ResultatElementet.style.color = 'red';
    computerValgElementet.innerHTML = 'Game Over';
    UmuligeValg();
    stopTimer();
  }
}

// Funksjonen som tolker spilleren sitt valg
function velgVåpen() {
  clearTimeout(timeout);
  nedtellingElementet.innerHTML = '10';
  nedtelling = 10;
  const spillerVåpen = this.id;
  const computerVåpen = computerVelgerVåpen();
  oppdaterScoreboard(spillerVåpen, computerVåpen);
}

// Funksjonen som starter nedtellingen, og styrer hva som skjer når den når 0
function startTimer() {
  nedtelling--;
  if (nedtelling >= 0) {
  nedtellingElementet.innerHTML = nedtelling;
  if (nedtelling === 0) {
    const computerVåpen = computerVelgerVåpen();
    oppdaterScoreboard(null, computerVåpen);
  } else {
    timeout = setTimeout(startTimer, 1000);
  }
}
}

function stopTimer() {
  clearInterval(timeout);
  nedtelling = 10;
  nedtellingElementet.textContent = nedtelling;
}

// Funkjsonen som restarter spillet
function resetGame() {
  spillerScore = 0;
  computerScore = 0;
  nedtelling = 10;
  SpillerScoren.innerHTML = 'Player: 0';
  ComputerScoren.innerHTML = 'Computer: 0';
  ResultatElementet.innerHTML = 'Velg våpen!';
  nedtellingElementet.innerHTML = '10';
  ResultatElementet.style.color = '#faf4ed';
  computerValgElementet.innerHTML = ' ';
  muligeValg();
  startTimer();
}

function UmuligeValg() {
  valgmulighetene.forEach((valg) => {
    valg.style.pointerEvents = 'none';
  });
}

function muligeValg() {
  valgmulighetene.forEach((valg) => {
    valg.style.pointerEvents = 'auto';
  });
}

// Lytter etter hva spilleren velger
valgmulighetene.forEach((valg) => valg.addEventListener('click', velgVåpen));
spilligjenknappen.addEventListener('click', resetGame);

// Start nedtelling når siden laster inn
nedtellingElementet.innerHTML = nedtelling; 
timeout = setTimeout(startTimer, 1000); //teller ned fra 10 sekunder

