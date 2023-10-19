const valgmulighetene = document.querySelectorAll('.valg');
const playerscoreElem = document.querySelector('#playerscore');
const computerscoreElem = document.querySelector('#computerscore');
const spilligjen = document.querySelector('#spilligjen');
const resultatElem = document.querySelector('#resultat');
const nedtellingElem = document.querySelector('#nedtelling');
const computervalgElem = document.querySelector('#computervalg');


const weapons = ['stein', 'saks', 'papir'];
let playerscore = 0;
let computerscore = 0;
let nedtelling = 10;
let timeout;

const PapirKnapp = document.getElementById('papir');
const SaksKnapp = document.getElementById('saks')
const SteinKnapp = document.getElementById('stein')

// Denne funksjonen gjør at computeren velger tilfeldig våpen//
function computervelgervåpen() {
  const weaponIndex = Math.floor(Math.random() * weapons.length);
  return weapons[weaponIndex];
}

function disableOptions() {
  valgmulighetene.forEach((valg) => {
    valg.style.pointerEvents = 'none';
  });
}

function enableOptions() {
  valgmulighetene.forEach((valg) => {
    valg.style.pointerEvents = 'auto';
  });
}

// Her legger jeg til hendelseslytter for hvert valg i valgmulighetene
valgmulighetene.forEach((valg) => valg.addEventListener('click', selectWeapon));

// Her legger jeg til en hendelseslytter på spill-igjen knappen
spilligjen.addEventListener('click', resetGame);

// Start countdown timer when page loads
nedtellingElem.innerHTML = nedtelling; // Henter opprinnelig verdi for nedtellingen
timeout = setTimeout(startTimer, 1000);

//TEST

function sjekkResultat(spillerVåpen, computerVåpen) {
    if (spillerVåpen === computerVåpen) {
      return { vinner: "uavgjort", melding: "Det ble uavgjort!" };
    } else if (
      (spillerVåpen === "stein" && computerVåpen === "saks") ||
      (spillerVåpen === "papir" && computerVåpen === "stein") ||
      (spillerVåpen === "saks" && computerVåpen === "papir")
    ) {
      return { vinner: "spiller", melding: "Du vant!" };
    } else {
      return { vinner: "computer", melding: "Computer vant!" };
    }
  }



// Denne funksjonen oppdaterer scoren og viser resultatet
function oppdaterScoren(spillerVåpen, computerVåpen) {

  clearTimeout(timeout);

  function sjekkResultat(spillerVåpen, computerVåpen) {
    if (spillerVåpen === computerVåpen) {
      return { vinner: "uavgjort", melding: "Det ble uavgjort!" };
    } else if (
      (spillerVåpen === "stein" && computerVåpen === "saks") ||
      (spillerVåpen === "papir" && computerVåpen === "stein") ||
      (spillerVåpen === "saks" && computerVåpen === "papir")
    ) {
      return { vinner: "spiller", melding: "Du vant!" };
    } else {
      return { vinner: "computer", melding: "Computer vant!" };
    }
  }

  if (spillerVåpen) { 
    
    //NY
    const resultat = sjekkResultat(spillerVåpen, computerVåpen);
    const melding = "Computeren valgte " + computerVåpen + ", og du valgte " + spillerVåpen + ". ";

    resultatElem.innerHTML = melding + resultat.melding;
    
    /* Dette betyr at hvis spillerVåpen har en verdi, vil resten kjøre
    computervalgElem.innerHTML = "Computeren valgte " + computerVåpen + ", og du valgte " + spillerVåpen; // Denne viser i nettsiden hva computeren valgte
    
    if (spillerVåpen === computerVåpen) { // Hvis spiller og computer velger det samme
      resultatElem.innerHTML = "Det ble uavgjort!"; //Returneres dette i HTML
    
      
    } else if ( // Hvis derimot:
      (spillerVåpen === 'stein' && computerVåpen === 'saks') || // spilleren velger x og computer y eller spiller....
      (spillerVåpen === 'papir' && computerVåpen === 'stein') ||
      (spillerVåpen === 'saks' && computerVåpen === 'papir')
    ) {
      resultatElem.innerHTML = 'Du vant!'; //Blir dette svaret
      playerscore++; //spillerscoren øker med en
      playerscoreElem.innerHTML = "Spiller:" + playerscore; // og oppdateres i scoreboardet

    } else { // hvis ikke kravene for at spilleren vinner er utført: 
      resultatElem.innerHTML = 'Computer vant!';
      computerscore++; //computer scoren oppdateres
      computerscoreElem.innerHTML = "Computer: " + computerscore;
    } */
    startTimer();

  } else { // hvis ikke spillerVåpen har en verdi
    computervalgElem.innerHTML = `Game Over`;
    resultatElem.innerHTML = 'Du valgte ikke et våpen! Du tapte!';
    resultatElem.style.color = 'red';
    disableOptions();
  }

  if (playerscore === 5) {
    resultatElem.textContent = 'Du vant spillet! Trykk restart for å spille igjen';
    resultatElem.style.color = 'green';
    computervalgElem.innerHTML = 'Game Over';
    disableOptions();
    stopTimer();
  }

  if (computerscore === 5) {
    resultatElem.innerHTML = "GAME OVER" + '<br>' +  "DU TAPTE " + playerscore + " : " + computerscore + "<br>" + "Trykk på spilligjen-knappen for å starte på nytt";

    resultatElem.style.color = 'red';
    computervalgElem.innerHTML = 'Game Over!';
    disableOptions();
    stopTimer();
  }
}

// Funksjon som håndterer det spilleren velger som våpen


PapirKnapp.addEventListener('click', selectWeapon);
SaksKnapp.addEventListener('click', selectWeapon);
SteinKnapp.addEventListener('click', selectWeapon);

function selectWeapon() {
  clearTimeout(timeout);
  nedtellingElem.innerHTML = '10';
  nedtelling = 10;
  const spillerVåpen = event.target.id;
  const computerVåpen = computervelgervåpen();
  oppdaterScoren(spillerVåpen, computerVåpen);
}

// Denne funksjoner starter nedtellingen
function startTimer() {
  nedtelling--;
  nedtellingElem.innerHTML = nedtelling;
  if (nedtelling === 0) {
    const computerVåpen = computervelgervåpen();
    oppdaterScoren(null, computerVåpen);
  } else {
    timeout = setTimeout(startTimer, 1000);
  }
}

function stopTimer() {
  clearInterval(timeout);
  nedtelling = 10;
  nedtellingElem.textContent = nedtelling;
}

// Denne funksjonen restarter spillet
function resetGame() {
  playerscore = 0;
  computerscore = 0;
  nedtelling = 10;
  playerscoreElem.innerHTML = 'Player: 0';
  computerscoreElem.innerHTML = 'Computer: 0';
  resultatElem.innerHTML = 'Velg ditt våpen!';
  nedtellingElem.innerHTML = '10';
  resultatElem.style.color = '#660033';
  computervalgElem.innerHTML = '';
  enableOptions();
  startTimer();
}


